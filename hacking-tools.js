export const hackingTools = [
    {
        id: 'header_analyzer',
        name: 'HTTP Header Security Inspector',
        icon: 'fa-shield-halved',
        pro: true,
        ui: `<div><h3>Header Security Inspector</h3><input id="targetDomain" type="text" placeholder="example.com" class="w-full p-2 bg-slate-900 border rounded mb-2"><button id="btnScanHeaders" class="bg-red-500 text-white px-4 py-2 rounded font-bold">INSPECT HEADERS</button><div id="headerResults" class="mt-2 text-xs font-mono"></div></div>`,
        js: `document.getElementById('btnScanHeaders')?.addEventListener('click', () => { document.getElementById('headerResults').innerText = 'Analyzing security response headers for target...'; });`
    }
];
