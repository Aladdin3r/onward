export default function handler(req, res) {
  console.log('Request method:', req.method);
  
  if (req.method === 'POST') {
    const { transcription } = req.body;

    console.log('Received transcription:', transcription);

    // Set a custom header for logging
    res.setHeader('X-Custom-Header', 'CustomHeaderValue');

    console.log('Custom header set:', res.getHeader('X-Custom-Header'));

    res.status(200).json({ message: 'Transcription received', transcription });
  } else {
    console.log('Setting Allow header');
    res.setHeader('Allow', ['POST']);
    console.log('Allow header set:', res.getHeader('Allow'));
    
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}