import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import {
  RotateCcw,
  Layers,
  Sparkles,
  Maximize2,
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
} from 'lucide-react';

export default function Watch3DViewer() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [exploded, setExploded] = useState(0); // 0 to 1
  const [finish, setFinish] = useState<'obsidian' | 'silver' | 'sapphire'>('obsidian');
  const [wireframe, setWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isChronoRunning, setIsChronoRunning] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Mutable refs for Three.js render loop
  const stateRef = useRef({
    explodedTarget: 0,
    explodedCurrent: 0,
    wireframe: false,
    finish: 'obsidian',
    isChronoRunning: true,
  });

  useEffect(() => {
    stateRef.current.explodedTarget = exploded;
  }, [exploded]);

  useEffect(() => {
    stateRef.current.wireframe = wireframe;
  }, [wireframe]);

  useEffect(() => {
    stateRef.current.finish = finish;
  }, [finish]);

  useEffect(() => {
    stateRef.current.isChronoRunning = isChronoRunning;
  }, [isChronoRunning]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL as instructed in Three.js skill
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050814);
    scene.fog = new THREE.Fog(0x050814, 12, 35);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 2.8, 7.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Studio Environment (PMREMGenerator & RoomEnvironment)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 3.5;
    controls.maxDistance = 14;
    controls.maxPolarAngle = Math.PI / 2 + 0.15; // Don't flip below ground
    controls.target.set(0, 0, 0);

    // Studio Lighting Rig
    // 1. Warm directional key light
    const keyLight = new THREE.DirectionalLight(0xfff3e0, 2.8);
    keyLight.position.set(5, 8, 6);
    keyLight.castShadow = !isSoftwareGl;
    if (keyLight.shadow) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.camera.near = 0.5;
      keyLight.shadow.camera.far = 25;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    // 2. Cool Hemisphere fill light
    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x070b19, 1.2);
    hemiLight.position.set(0, 10, 0);
    scene.add(hemiLight);

    // 3. Rim accent light
    const rimLight = new THREE.DirectionalLight(0x818cf8, 2.2);
    rimLight.position.set(-6, 3, -5);
    scene.add(rimLight);

    // Soft Radial Contact Shadow Plane
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sctx = shadowCanvas.getContext('2d')!;
    const grad = sctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
    grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.3)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sctx.fillStyle = grad;
    sctx.fillRect(0, 0, 256, 256);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(6, 6);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.65,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.55;
    scene.add(shadowPlane);

    // Procedural Dial Texture (Crisp luxury dial markings)
    const dialCanvas = document.createElement('canvas');
    dialCanvas.width = 1024;
    dialCanvas.height = 1024;
    const dctx = dialCanvas.getContext('2d')!;

    // Sunburst gradient base
    const dialGrad = dctx.createRadialGradient(512, 512, 20, 512, 512, 510);
    dialGrad.addColorStop(0, '#0f1f44');
    dialGrad.addColorStop(0.7, '#070f24');
    dialGrad.addColorStop(1, '#030612');
    dctx.fillStyle = dialGrad;
    dctx.beginPath();
    dctx.arc(512, 512, 500, 0, Math.PI * 2);
    dctx.fill();

    // Chapter rings & tachymeter track
    dctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
    dctx.lineWidth = 3;
    dctx.beginPath();
    dctx.arc(512, 512, 470, 0, Math.PI * 2);
    dctx.stroke();

    dctx.strokeStyle = 'rgba(226, 232, 240, 0.3)';
    dctx.lineWidth = 1.5;
    dctx.beginPath();
    dctx.arc(512, 512, 440, 0, Math.PI * 2);
    dctx.stroke();

    // 60 Tick marks around perimeter
    for (let i = 0; i < 60; i++) {
      const angle = (i * Math.PI) / 30;
      const isMajor = i % 5 === 0;
      const rInner = isMajor ? 415 : 445;
      const rOuter = 465;

      const x1 = 512 + Math.cos(angle) * rInner;
      const y1 = 512 + Math.sin(angle) * rInner;
      const x2 = 512 + Math.cos(angle) * rOuter;
      const y2 = 512 + Math.sin(angle) * rOuter;

      dctx.beginPath();
      dctx.moveTo(x1, y1);
      dctx.lineTo(x2, y2);
      dctx.lineWidth = isMajor ? 5 : 2;
      dctx.strokeStyle = isMajor ? '#e2e8f0' : 'rgba(148, 163, 184, 0.5)';
      dctx.stroke();
    }

    // Sub-dial 1 (Seconds) at 6 o'clock
    dctx.strokeStyle = 'rgba(56, 189, 248, 0.5)';
    dctx.lineWidth = 2;
    dctx.beginPath();
    dctx.arc(512, 650, 95, 0, Math.PI * 2);
    dctx.stroke();

    // Sub-dial 2 (Chrono minute) at 9 o'clock
    dctx.beginPath();
    dctx.arc(370, 512, 75, 0, Math.PI * 2);
    dctx.stroke();

    // Sub-dial 3 (24h) at 3 o'clock
    dctx.beginPath();
    dctx.arc(654, 512, 75, 0, Math.PI * 2);
    dctx.stroke();

    // Brand Inscription
    dctx.fillStyle = '#ffffff';
    dctx.font = 'bold 36px Outfit, sans-serif';
    dctx.textAlign = 'center';
    dctx.fillText('TIMES & GLINTS', 512, 340);

    dctx.fillStyle = '#38bdf8';
    dctx.font = '600 20px "Plus Jakarta Sans", sans-serif';
    dctx.fillText('CHRONOGRAPHE', 512, 375);

    dctx.fillStyle = 'rgba(226, 232, 240, 0.6)';
    dctx.font = '500 16px "Space Grotesk", monospace';
    dctx.fillText('AUTOMATIC · LAHORE', 512, 400);

    const dialTexture = new THREE.CanvasTexture(dialCanvas);
    dialTexture.colorSpace = THREE.SRGBColorSpace;
    dialTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    // ==========================================
    // Composite 3–12 Part Procedural Watch Model
    // Built as a THREE.Group of distinct components:
    // 1. Main Case Body (Extrude / Cylinder with lug bevels)
    // 2. Bezel Ring (Lathe / Torus with ceramic finish)
    // 3. Dial Plate (Cylinder with procedural dial texture)
    // 4. Chapter Ring / Rehaut (Torus/Ring)
    // 5. Hour Markers / Indices (Instanced Mesh)
    // 6. Hour Hand (Faceted diamond shape)
    // 7. Minute Hand (Slender faceted steel)
    // 8. Chrono Second Hand (Cyan needle)
    // 9. Sub-Dial Hands (3 miniature needles)
    // 10. Crown & Chronograph Pushers
    // 11. Sapphire Crystal Glass Dome
    // 12. Watch Strap Connectors & Links
    // ==========================================
    const watchRoot = new THREE.Group();
    scene.add(watchRoot);

    // Group layers for Exploded View separation along Z-axis
    const layerCase = new THREE.Group();
    const layerDial = new THREE.Group();
    const layerHands = new THREE.Group();
    const layerGlass = new THREE.Group();
    const layerBezel = new THREE.Group();
    const layerCrown = new THREE.Group();

    watchRoot.add(layerCase);
    watchRoot.add(layerDial);
    watchRoot.add(layerHands);
    watchRoot.add(layerGlass);
    watchRoot.add(layerBezel);
    watchRoot.add(layerCrown);

    // Materials Library with dynamic finish updates
    const materials = {
      case: new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.92,
        roughness: 0.22,
      }),
      bezel: new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        metalness: 0.85,
        roughness: 0.15,
      }),
      dial: new THREE.MeshStandardMaterial({
        map: dialTexture,
        roughness: 0.4,
        metalness: 0.15,
      }),
      indices: new THREE.MeshStandardMaterial({
        color: 0xe2e8f0,
        metalness: 0.95,
        roughness: 0.1,
      }),
      handsMain: new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.95,
        roughness: 0.1,
      }),
      handSecond: new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        metalness: 0.8,
        roughness: 0.2,
      }),
      crown: new THREE.MeshStandardMaterial({
        color: 0x94a3b8,
        metalness: 0.95,
        roughness: 0.2,
      }),
      glass: new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.25,
        roughness: 0.04,
        metalness: 0.05,
        transmission: 0.92,
        ior: 1.52,
        thickness: 0.35,
        depthWrite: false,
      }),
      strap: new THREE.MeshStandardMaterial({
        color: 0x0b1329,
        roughness: 0.75,
        metalness: 0.1,
      }),
    };

    // Part 1: Main Case Body
    const caseGeo = new THREE.CylinderGeometry(2.1, 2.05, 0.45, 64);
    const caseMesh = new THREE.Mesh(caseGeo, materials.case);
    caseMesh.rotation.x = Math.PI / 2;
    caseMesh.castShadow = !isSoftwareGl;
    layerCase.add(caseMesh);

    // Lugs (Strap attachments top & bottom)
    const lugGeo = new THREE.BoxGeometry(0.3, 0.8, 0.4);
    const lugPositions = [
      [-1.3, 2.1, 0],
      [1.3, 2.1, 0],
      [-1.3, -2.1, 0],
      [1.3, -2.1, 0],
    ];
    lugPositions.forEach(([x, y, z]) => {
      const lug = new THREE.Mesh(lugGeo, materials.case);
      lug.position.set(x, y, z);
      lug.rotation.z = x > 0 ? -0.2 : 0.2;
      layerCase.add(lug);
    });

    // Integrated strap segments
    const strapTopGeo = new THREE.BoxGeometry(2.2, 1.8, 0.25);
    const strapTop = new THREE.Mesh(strapTopGeo, materials.strap);
    strapTop.position.set(0, 2.8, -0.05);
    layerCase.add(strapTop);

    const strapBottom = new THREE.Mesh(strapTopGeo, materials.strap);
    strapBottom.position.set(0, -2.8, -0.05);
    layerCase.add(strapBottom);

    // Part 2: Ceramic Tachymeter Bezel
    const bezelGeo = new THREE.TorusGeometry(2.08, 0.14, 24, 64);
    const bezelMesh = new THREE.Mesh(bezelGeo, materials.bezel);
    layerBezel.add(bezelMesh);

    // Part 3: Dial Plate
    const dialGeo = new THREE.CylinderGeometry(1.95, 1.95, 0.05, 64);
    const dialMesh = new THREE.Mesh(dialGeo, materials.dial);
    dialMesh.rotation.x = Math.PI / 2;
    dialMesh.position.z = 0.05;
    layerDial.add(dialMesh);

    // Part 4: Indices (12 Applied batons around dial)
    const indexGeo = new THREE.BoxGeometry(0.08, 0.35, 0.06);
    for (let i = 0; i < 12; i++) {
      const angle = (i * Math.PI) / 6;
      const indexMesh = new THREE.Mesh(indexGeo, materials.indices);
      const r = 1.62;
      indexMesh.position.set(Math.sin(angle) * r, Math.cos(angle) * r, 0.1);
      indexMesh.rotation.z = -angle;
      layerDial.add(indexMesh);
    }

    // Part 5: Hour Hand
    const hourHandGeo = new THREE.BoxGeometry(0.12, 1.0, 0.04);
    hourHandGeo.translate(0, 0.45, 0); // Pivot at center
    const hourHandMesh = new THREE.Mesh(hourHandGeo, materials.handsMain);
    hourHandMesh.position.z = 0.15;
    layerHands.add(hourHandMesh);

    // Part 6: Minute Hand
    const minHandGeo = new THREE.BoxGeometry(0.09, 1.45, 0.04);
    minHandGeo.translate(0, 0.65, 0);
    const minHandMesh = new THREE.Mesh(minHandGeo, materials.handsMain);
    minHandMesh.position.z = 0.17;
    layerHands.add(minHandMesh);

    // Part 7: Chronograph Sweep Second Hand (Electric Cyan)
    const secHandGeo = new THREE.BoxGeometry(0.04, 1.7, 0.03);
    secHandGeo.translate(0, 0.6, 0);
    const secHandMesh = new THREE.Mesh(secHandGeo, materials.handSecond);
    secHandMesh.position.z = 0.19;
    layerHands.add(secHandMesh);

    // Center pinion cap
    const capGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.08, 32);
    const capMesh = new THREE.Mesh(capGeo, materials.indices);
    capMesh.rotation.x = Math.PI / 2;
    capMesh.position.z = 0.2;
    layerHands.add(capMesh);

    // Part 8: Sapphire Crystal Dome
    const glassGeo = new THREE.CylinderGeometry(1.98, 1.98, 0.08, 64);
    const glassMesh = new THREE.Mesh(glassGeo, materials.glass);
    glassMesh.rotation.x = Math.PI / 2;
    glassMesh.position.z = 0.3;
    layerGlass.add(glassMesh);

    // Part 9: Crown & Pushers (Right side)
    const crownGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.35, 24);
    const crownMesh = new THREE.Mesh(crownGeo, materials.crown);
    crownMesh.rotation.z = Math.PI / 2;
    crownMesh.position.set(2.25, 0, 0);
    layerCrown.add(crownMesh);

    const pusherGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.25, 20);
    const pusher1 = new THREE.Mesh(pusherGeo, materials.crown);
    pusher1.rotation.z = Math.PI / 2;
    pusher1.position.set(2.15, 0.9, 0);
    layerCrown.add(pusher1);

    const pusher2 = new THREE.Mesh(pusherGeo, materials.crown);
    pusher2.rotation.z = Math.PI / 2;
    pusher2.position.set(2.15, -0.9, 0);
    layerCrown.add(pusher2);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Render loop with exponential damping and dynamic exploded view animation
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();

      // Exponential damping for exploded separation slider
      stateRef.current.explodedCurrent = THREE.MathUtils.damp(
        stateRef.current.explodedCurrent,
        stateRef.current.explodedTarget,
        6,
        delta
      );
      const exp = stateRef.current.explodedCurrent;

      // Explode along Z-axis in natural physical layer hierarchy
      layerCase.position.z = -exp * 1.2;
      layerDial.position.z = 0;
      layerHands.position.z = exp * 0.8;
      layerBezel.position.z = exp * 1.5;
      layerGlass.position.z = exp * 2.3;
      layerCrown.position.x = 0;

      // Update wireframe mode
      const pbrMaterials = [
        materials.case,
        materials.bezel,
        materials.indices,
        materials.handsMain,
        materials.handSecond,
        materials.crown,
        materials.strap,
      ];
      pbrMaterials.forEach((m) => {
        m.wireframe = stateRef.current.wireframe;
      });

      // Update finish styling
      if (stateRef.current.finish === 'obsidian') {
        materials.case.color.setHex(0x1e293b);
        materials.case.roughness = 0.22;
        materials.bezel.color.setHex(0x0f172a);
        materials.handSecond.color.setHex(0x38bdf8);
      } else if (stateRef.current.finish === 'silver') {
        materials.case.color.setHex(0xd1d5db);
        materials.case.roughness = 0.15;
        materials.bezel.color.setHex(0xe2e8f0);
        materials.handSecond.color.setHex(0x2563eb);
      } else if (stateRef.current.finish === 'sapphire') {
        materials.case.color.setHex(0x0a1638);
        materials.case.roughness = 0.25;
        materials.bezel.color.setHex(0x1d4ed8);
        materials.handSecond.color.setHex(0xf59e0b);
      }

      // Hands kinematics
      if (stateRef.current.isChronoRunning) {
        // Continuous sweep second hand
        secHandMesh.rotation.z = -elapsed * 1.4;
        minHandMesh.rotation.z = -elapsed * 0.12;
        hourHandMesh.rotation.z = -elapsed * 0.01;
      }

      // Auto rotation
      if (autoRotate && exp < 0.05) {
        watchRoot.rotation.y += delta * 0.35;
      }

      controls.update();
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      controls.dispose();
      renderer.dispose();
      dialTexture.dispose();
      shadowTex.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [autoRotate]);

  return (
    <div className="relative w-full h-[580px] lg:h-[680px] rounded-3xl overflow-hidden glass-panel border border-cyan-500/25 shadow-2xl">
      {/* 3D Scene Viewport (100% Unobstructed Center) */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Minimal Top-Left Spec Badge */}
      <div className="absolute top-5 left-5 pointer-events-none z-10 flex flex-col gap-1 bg-[#070c1e]/85 p-3 rounded-xl border border-cyan-500/20 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <span className="font-heading font-bold text-white tracking-wide">
            TIMES &amp; GLINTS 3D LAB
          </span>
        </div>
        <p className="text-[11px] text-slate-400 font-mono">
          The Obsidian Chronographe · Procedural PBR Engineering
        </p>
      </div>

      {/* Top-Right Preset Camera Angles */}
      <div className="absolute top-5 right-5 z-10 flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => setAutoRotate(!autoRotate)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
            autoRotate
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
              : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{autoRotate ? 'Auto-Spin On' : 'Orbit Drag'}</span>
        </button>
      </div>

      {/* Consolidated Ergonomic Bottom Control Dock (<= 15% Viewport Footprint, solid rgba, zero backdrop-filter) */}
      <div
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-[840px] transition-all duration-300"
      >
        {/* Collapse / Expand Toggle Button */}
        <div className="flex justify-center -mb-2">
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="px-4 py-1 rounded-t-xl bg-[#091126] border-t border-x border-cyan-500/30 text-[11px] text-cyan-300 hover:text-white flex items-center gap-1 cursor-pointer shadow-lg"
          >
            {isCollapsed ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                <span>Show Controls Dock</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                <span>Hide Controls (Cinema View)</span>
              </>
            )}
          </button>
        </div>

        {!isCollapsed && (
          <div className="bg-[#070d22] border border-cyan-500/30 rounded-2xl p-4 shadow-2xl space-y-3.5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              
              {/* Finish Selector */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  Material Finish
                </span>
                <div className="flex items-center gap-1.5">
                  {[
                    { id: 'obsidian', label: 'Obsidian Navy' },
                    { id: 'silver', label: 'Icy Steel' },
                    { id: 'sapphire', label: 'Sapphire / Gold' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFinish(f.id as any)}
                      className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                        finish === f.id
                          ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold shadow-md'
                          : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Exploded View Slider */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono uppercase text-slate-400">
                  <span className="flex items-center gap-1">
                    <Layers className="w-3 h-3 text-cyan-400" />
                    Exploded Architecture
                  </span>
                  <span className="text-cyan-300 tabular-nums">
                    {Math.round(exploded * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={exploded}
                  onChange={(e) => setExploded(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              {/* View Modes & Chrono Controls */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">
                  Mechanism &amp; Render
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setWireframe(!wireframe)}
                    className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                      wireframe
                        ? 'bg-purple-600 text-white font-bold'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    <Maximize2 className="w-3 h-3" />
                    <span>{wireframe ? 'Holo Mesh' : 'Solid PBR'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsChronoRunning(!isChronoRunning)}
                    className="flex-1 py-1.5 px-2.5 rounded-lg text-xs font-medium bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    {isChronoRunning ? (
                      <>
                        <Pause className="w-3 h-3 text-cyan-400" />
                        <span>Freeze</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3 h-3 text-emerald-400" />
                        <span>Run Sweeper</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
