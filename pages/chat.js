import { useState } from 'react';


export default function ChatPage() {
const [messages, setMessages] = useState([]);
const [text, setText] = useState('');


async function send() {
const userMsg = { role: 'user', content: text };
setMessages(m => [...m, userMsg]);
setText('');


const resp = await fetch('/api/openai', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ endpoint: 'chat', payload: {
model: 'gpt-4o-mini',
messages: [...messages, userMsg]
}})
});


const data = await resp.json();
const assistantText = data?.choices?.[0]?.message?.content || 'No response';
setMessages(m => [...m, { role: 'assistant', content: assistantText }]);
}


return (
<div className="min-h-screen p-6 bg-gradient-to-b from-pasiyaBlue/10 to-white">
<div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-6">
<h1 className="text-2xl font-bold mb-4">PASIYA-MD AI SPROT BOT — Chat</h1>
<div className="space-y-3 mb-4">
{messages.map((m,i)=> (
<div key={i} className={m.role==='user'? 'text-right':'text-left'}>
<div className="inline-block p-3 rounded-lg shadow">{m.content}</div>
</div>
))}
</div>
<div className="flex gap-2">
<input value={text} onChange={e=>setText(e.target.value)} className="flex-1 p-3 rounded-lg border" />
<button onClick={send} className="btn">Send</button>
</div>
</div>
</div>
);
}
