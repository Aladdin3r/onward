import pdf from 'pdf-parse';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { file } = req.body; 
        const buffer = Buffer.from(file.data);
        try {
            const data = await pdf(buffer); 
            res.status(200).json({ text: data.text });
        } catch (error) {
            res.status(500).json({ error: 'Error parsing PDF' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
