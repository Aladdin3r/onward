export default function handler(req, res) {
  if (req.method === 'POST') {
    const { transcription } = req.body;

    console.log('Received transcription:', transcription);

    res.status(200).json({ message: 'Transcription received', transcription });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}