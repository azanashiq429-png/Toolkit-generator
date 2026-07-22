export function generateTemplate7(title, selectedTools, theme) {
    return `
    <div class="p-4 max-w-md mx-auto space-y-3">
        <div class="bg-indigo-900/30 p-3 rounded-xl border border-indigo-500/30 text-center font-bold text-indigo-300 uppercase">${title}</div>
        ${selectedTools.map(t => `<div class="p-3 bg-slate-900/90 border border-indigo-950 rounded-xl">${t.ui}</div>`).join('')}
    </div>`;
}
