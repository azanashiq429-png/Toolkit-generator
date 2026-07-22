export function generateTemplate8(title, selectedTools, theme) {
    return `
    <div class="p-4 max-w-lg mx-auto bg-cyan-950/20 border-2 border-cyan-500/50 rounded-tl-3xl rounded-br-3xl">
        <div class="bg-cyan-500 text-slate-950 font-black text-xs px-3 py-1 rounded w-fit mb-3 uppercase">SYSTEM HUD // ${title}</div>
        <div class="space-y-3">
            ${selectedTools.map(t => `<div class="p-3 bg-slate-900 border border-cyan-800/40 rounded-lg">${t.ui}</div>`).join('')}
        </div>
    </div>`;
}
