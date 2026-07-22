export const freeTools = [
    {
        id: 'word_counter',
        name: 'Word Counter',
        icon: 'fa-calculator',
        ui: `<div><h3>Word Counter Tool</h3><textarea id="wordInput" class="w-full p-2 bg-slate-900 border rounded" placeholder="Type text here..."></textarea><div id="wordCountResult" class="mt-2 text-cyan-400 font-bold">Words: 0 | Chars: 0</div></div>`,
        js: `document.getElementById('wordInput')?.addEventListener('input', (e) => { const text = e.target.value.trim(); const words = text ? text.split(/\\s+/).length : 0; document.getElementById('wordCountResult').innerText = 'Words: ' + words + ' | Chars: ' + text.length; });`
    },
    {
        id: 'regex_tester',
        name: 'Regex Tester',
        icon: 'fa-vial',
        ui: `<div><h3>Regex Tester</h3><input id="regexPattern" type="text" placeholder="Regex Pattern" class="w-full p-2 mb-2 bg-slate-900 border rounded"><textarea id="regexText" placeholder="Test Text" class="w-full p-2 bg-slate-900 border rounded"></textarea><div id="regexResult" class="mt-2 text-cyan-400 font-bold"></div></div>`,
        js: `const testRegex = () => { try { const pat = new RegExp(document.getElementById('regexPattern').value); const txt = document.getElementById('regexText').value; document.getElementById('regexResult').innerText = pat.test(txt) ? 'Match Found!' : 'No Match'; } catch(e) { document.getElementById('regexResult').innerText = 'Invalid Regex'; } }; document.getElementById('regexPattern')?.addEventListener('input', testRegex); document.getElementById('regexText')?.addEventListener('input', testRegex);`
    }
];
