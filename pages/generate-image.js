import { useState } from 'react';
export default function ImageGen() {
const [prompt, setPrompt] = useState('');
const [imgUrl, setImgUrl] = useState(null);


async function generate() {
const resp = await fetch('/api/openai', {
method: 'POST',
headers: {'Content-Type':'application/json'},
body: JSON.stringify({ endpoint: 'images', payload: { prompt, n:1, size:'1024x1024' } })
});
const data = await resp.json();
setImgUrl(data?.data?.[0]?.url || null);
}


return (
<div className="p-6">
<h2>Generate Image</h2>
<textarea value={prompt} onChange={e=>setPrompt(e.target.value)} className="w-full h-32" />
<button onClick={generate} className="mt-2">Generate</button>
{imgUrl && <img src={imgUrl} alt="gen" className="mt-4 max-w-full rounded" />}
</div>
);
}
