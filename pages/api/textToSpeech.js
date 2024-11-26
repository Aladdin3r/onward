import { createClient } from "@deepgram/sdk";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Get the text from the request body (you can also pass any other parameters here)
      const { text } = req.body;

      // Step 1: Create a Deepgram client with your API key
      const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

      // Step 2: Make the request for text-to-speech
      const response = await deepgram.speak.request(
        { text },
        {
          model: "aura-asteria-en",  // Ensure this is a valid model
          encoding: "linear16",      // Audio format, change based on your needs
          container: "wav",          // File container format
        }
      );

      // Step 3: Get the audio stream and headers
      const stream = await response.getStream();
      const headers = await response.getHeaders();

      if (stream) {
        const audioBuffer = await streamToBuffer(stream);
        
        // Step 4: Respond with the audio file (as a base64 string or buffer, depending on how you want to send it)
        res.setHeader("Content-Type", "audio/wav");
        res.status(200).send(audioBuffer);
      } else {
        res.status(500).json({ error: "Error generating audio stream" });
      }

    } catch (error) {
      console.error("Error during Deepgram API request:", error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

// Helper function to convert stream to buffer
const streamToBuffer = async (stream) => {
  const chunks = [];
  const reader = stream.getReader();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }

  return Buffer.concat(chunks);
};
