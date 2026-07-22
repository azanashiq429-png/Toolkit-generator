export const premiumTools = [
    {
        id: 'api_tester_pro',
        name: 'Pro API Endpoint Tester',
        icon: 'fa-network-wired',
        pro: true,
        ui: `<div><h3>API Endpoint Tester</h3><input id="apiUrl" type="url" placeholder="https://api.example.com" class="w-full p-2 bg-slate-900 border rounded mb-2"><button id="btnSendApi" class="bg-cyan-500 text-black px-4 py-2 rounded font-bold">SEND REQUEST</button><pre id="apiOutput" class="mt-2 p-2 bg-slate-950 text-green-400 text-xs overflow-x-auto rounded"></pre></div>`,
        js: `document.getElementById('btnSendApi')?.addEventListener('click', async () => { const url = document.getElementById('apiUrl').value; if(!url) return; document.getElementById('apiOutput').innerText = 'Fetching...'; try { const res = await fetch(url); const json = await res.json(); document.getElementById('apiOutput').innerText = JSON.stringify(json, null, 2); } catch(e) { document.getElementById('apiOutput').innerText = 'Error: ' + e.message; } });`
    }
];
