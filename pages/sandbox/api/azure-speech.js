// pages/api/speech-to-text.js
export default function handler(req, res) {
    if (req.method === 'POST') {
      const { transcription } = req.body; // Get the transcription from the request body
  
      // Log the transcription or do further processing
      console.log('Received transcription:', transcription);
  
      // Respond with a success message or processed data
      res.status(200).json({ message: 'Transcription received', transcription });
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  