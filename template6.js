export function generateTemplate6(title, selectedTools, theme) {
    return `
    <div class="flex flex-col md:flex-row min-h-screen bg-slate-950">
        <aside class="w-full md:w-64 p-4 border-b md:border-r border-slate-800">
            <h2 class="font-bold text-cyan-400">${title}</h2>
        </aside>
        <main class="flex-1 p-4 space-y-4">
            ${selectedTools.map(t => `<div class="p-4 bg-slate-900 rounded-xl border border-slate-800">${t.ui}</div>`).join('')}
        </main>
    </div>`;
}
