import axios from 'axios';


export default async function handler(req, res) {
const key = process.env.OPENAI_API_KEY;
if (!key) return res.status(500).json({ error: 'Missing API key' });


try {
const { endpoint, payload } = req.body;
// endpoint: 'chat' | 'images' | 'code'
// map endpoint to real OpenAI call
if (endpoint === 'chat') {
const r = await axios.post('https://api.openai.com/v1/chat/completions', payload, {
headers: { Authorization: `Bearer ${key}` }
});
return res.status(200).json(r.data);
}


if (endpoint === 'images') {
const r = await axios.post('https://api.openai.com/v1/images/generations', payload, {
headers: { Authorization: `Bearer ${key}` }
});
return res.status(200).json(r.data);
}


return res.status(400).json({ error: 'unknown endpoint' });
} catch (err) {
console.error(err.response?.data || err.message);
return res.status(500).json({ error: 'openai call failed', details: err.response?.data });
}
}
