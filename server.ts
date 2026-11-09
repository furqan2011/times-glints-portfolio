import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '25mb' }));

// Initialize GoogleGenAI SDK with required telemetry User-Agent
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Chat API Route (Multi-Turn with Role-Specific System Instruction)
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, modelSpeed, persona } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    // Model selection based on user requirements:
    // gemini-3.1-flash-lite for fast tasks, gemini-3.8-flash for general/complex
    const model = modelSpeed === 'fast' ? 'gemini-3.1-flash-lite' : 'gemini-3.8-flash';

    const systemInstruction =
      persona === 'marketer'
        ? "You are Furqan Farooq's AI Marketing & Growth Strategist. You embody the expertise of Furqan Farooq—Founder of Times & Glints, an aspiring digital marketer and e-commerce entrepreneur based in Lahore, Pakistan. You excel at Meta Ads Manager, Facebook & Instagram ad creative testing, auction dynamics, campaign planning, audience segmentation, and luxury e-commerce operations in Lahore. Keep your tone confident, ambitious, authentic, and professional. Provide actionable, practical advice for scaling brands with paid social advertising."
        : "You are the Times & Glints Brand Concierge. You assist visitors with luxury watches & jewellery collections (The Obsidian Chronographe, Sapphire & Silver Geometric Cuff, Executive Midnight Curation Set), bespoke gift packaging, and express courier delivery across Lahore, Pakistan. You also share the story of Furqan Farooq's journey founding Times & Glints as his real-world marketing laboratory.";

    // Format conversation history for Gemini contents
    const contents = messages.map((m: { role: 'user' | 'model'; content: string }) => ({
      role: m.role,
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction,
      },
    });

    const reply = response.text || 'I am ready to help with your digital marketing or brand inquiry.';
    return res.json({ reply, modelUsed: model });
  } catch (error: any) {
    console.error('Chat error:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to generate response from Gemini API',
    });
  }
});

// Image Generation & Editing API Route
app.post('/api/generate-image', async (req, res) => {
  try {
    const { prompt, aspectRatio = '1:1', sourceImage, editInstruction } = req.body;

    if (!prompt && !editInstruction) {
      return res.status(400).json({ error: 'A prompt or edit instruction is required' });
    }

    // Use standard image generation model
    const model = 'gemini-3.1-flash-lite-image';

    const parts: any[] = [];

    // If sourceImage is provided, perform an image edit
    if (sourceImage && typeof sourceImage === 'string') {
      const cleanBase64 = sourceImage.replace(/^data:image\/[a-zA-Z]+;base64,/, '');
      parts.push({
        inlineData: {
          mimeType: 'image/png',
          data: cleanBase64,
        },
      });
      parts.push({
        text: editInstruction || prompt || 'Refine and enhance this product image with luxury aesthetic.',
      });
    } else {
      parts.push({
        text: prompt,
      });
    }

    const response = await ai.models.generateContent({
      model,
      contents: { parts },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio as any,
        },
      },
    });

    let generatedImageUrl = '';
    let responseText = '';

    for (const part of response.candidates?.[0]?.content?.parts ?? []) {
      if (part.inlineData?.data) {
        const mime = part.inlineData.mimeType || 'image/png';
        generatedImageUrl = `data:${mime};base64,${part.inlineData.data}`;
      } else if (part.text) {
        responseText = part.text;
      }
    }

    if (generatedImageUrl) {
      return res.json({ imageUrl: generatedImageUrl, text: responseText, modelUsed: model });
    } else {
      return res.json({
        message: responseText || 'Image generated without visual stream.',
        modelUsed: model,
      });
    }
  } catch (error: any) {
    console.error('Image generation error:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to generate image. Please check API quota or try a different prompt.',
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Setup Vite middlewares in development or static serve in production
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
