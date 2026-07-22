export function generateTemplate4(title, selectedTools, theme) {
    return `
    <div class="p-4 bg-black text-green-400 font-mono min-h-screen">
        <div class="border-b border-green-500 pb-2 mb-4">
            <p class="text-xs">root@azan-terminal:~# ./run_${title.toLowerCase().replace(/\s+/g, '_')}.sh</p>
        </div>
        <div class="space-y-4">
            ${selectedTools.map(t => `<div class="border border-green-800 p-3 rounded bg-green-950/20">${t.ui}</div>`).join('')}
        </div>
    </div>`;
}
