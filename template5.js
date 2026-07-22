export function generateTemplate5(title, selectedTools, theme) {
    return `
    <div class="p-5 max-w-md mx-auto bg-slate-950 border border-red-500/40 rounded-3xl shadow-[0_0_30px_rgba(239,68,68,0.2)]">
        <h1 class="text-xl font-black text-red-500 tracking-widest text-center">${title} PRO</h1>
        <div class="mt-4 space-y-3">
            ${selectedTools.map(t => `<div class="p-4 bg-slate-900 border border-red-900/50 rounded-2xl">${t.ui}</div>`).join('')}
        </div>
    </div>`;
}
