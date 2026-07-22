export function generateTemplate10(title, selectedTools, theme) {
    return `
    <div class="p-4 max-w-xl mx-auto space-y-4">
        <header class="text-center py-2 bg-slate-900 border border-blue-500/30 rounded-xl">
            <h1 class="text-base font-bold text-blue-400 uppercase tracking-wide">${title}</h1>
        </header>
        <div class="space-y-3">
            ${selectedTools.map(t => `<div class="p-4 bg-slate-900 border border-slate-800 rounded-xl shadow-lg">${t.ui}</div>`).join('')}
        </div>
    </div>`;
}
