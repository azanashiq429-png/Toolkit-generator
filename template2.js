export function generateTemplate2(title, selectedTools, theme) {
    return `
    <div class="p-5 max-w-lg mx-auto backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-2xl">
        <h2 class="text-lg font-bold text-emerald-400 tracking-wider text-center">${title}</h2>
        <div class="grid grid-cols-1 gap-4 mt-4">
            ${selectedTools.map(t => `<div class="p-4 bg-black/40 rounded-xl border border-emerald-500/20">${t.ui}</div>`).join('')}
        </div>
    </div>`;
}
