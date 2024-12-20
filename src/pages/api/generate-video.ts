import Replicate from "replicate";
import { NextApiRequest, NextApiResponse } from "next";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { prompt, duration = 1, quality = 0.5 } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    // Usando o modelo Zeroscope XL para geração de vídeo
    const output = await replicate.run(
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      {
        input: {
          prompt: prompt,
          num_frames: duration * 24, // converte duração em segundos para frames (24fps)
          fps: 24,
          num_inference_steps: Math.floor(50 * quality), // ajusta a qualidade
          guidance_scale: 17.5,
        },
      }
    );

    // O output será um URL do vídeo gerado
    return res.status(200).json({ videoUrl: output });
  } catch (error) {
    console.error("Error generating video:", error);
    return res.status(500).json({ message: "Error generating video" });
  }
}
