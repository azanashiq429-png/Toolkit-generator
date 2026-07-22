export function generateTemplate9(title, selectedTools, theme) {
    return `
    <div class="p-5 max-w-md mx-auto bg-gradient-to-b from-amber-950/40 to-slate-950 border border-amber-500/40 rounded-2xl">
        <h1 class="text-lg font-black text-amber-400 text-center uppercase tracking-widest font-mono">👑 ${title}</h1>
        <div class="mt-4 space-y-3">
            ${selectedTools.map(t => `<div class="p-3 bg-amber-950/20 border border-amber-500/20 rounded-xl">${t.ui}</div>`).join('')}
        </div>
    </div>`;
}
