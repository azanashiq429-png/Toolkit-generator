export const freeTools = [
    {
        id: 'word_counter',
        name: 'Word Counter Pro',
        icon: 'fa-calculator',
        ui: `<div>
            <label>Enter or Paste Your Text:</label>
            <textarea id="wordInput" rows="5" placeholder="Type or paste text here..."></textarea>
            
            <div class="grid grid-cols-2 gap-2 my-2 text-xs">
                <div class="p-2 bg-slate-900/80 rounded border border-cyan-500/30">Words: <span id="wCount" class="font-bold text-cyan-400">0</span></div>
                <div class="p-2 bg-slate-900/80 rounded border border-cyan-500/30">Chars (All): <span id="cCount" class="font-bold text-cyan-400">0</span></div>
                <div class="p-2 bg-slate-900/80 rounded border border-cyan-500/30">Chars (No Space): <span id="cNoSpaceCount" class="font-bold text-cyan-400">0</span></div>
                <div class="p-2 bg-slate-900/80 rounded border border-cyan-500/30">Sentences: <span id="sCount" class="font-bold text-cyan-400">0</span></div>
                <div class="p-2 bg-slate-900/80 rounded border border-cyan-500/30">Paragraphs: <span id="pCount" class="font-bold text-cyan-400">0</span></div>
                <div class="p-2 bg-slate-900/80 rounded border border-cyan-500/30">Reading Time: <span id="rTime" class="font-bold text-cyan-400">0s</span></div>
            </div>
        </div>`,
        js: `document.getElementById('wordInput')?.addEventListener('input', (e) => {
            const text = e.target.value;
            const trimmed = text.trim();
            
            const words = trimmed ? trimmed.split(/\\s+/).filter(Boolean).length : 0;
            const chars = text.length;
            const charsNoSpace = text.replace(/\\s+/g, '').length;
            const sentences = trimmed ? trimmed.split(/[.!?]+/).filter(Boolean).length : 0;
            const paragraphs = trimmed ? trimmed.split(/\\n+/).filter(Boolean).length : 0;
            
            // Average reading speed: 200 words per minute
            const readSecs = Math.ceil((words / 200) * 60);
            const readTimeStr = readSecs >= 60 ? Math.floor(readSecs/60) + 'm ' + (readSecs%60) + 's' : readSecs + 's';

            document.getElementById('wCount').innerText = words;
            document.getElementById('cCount').innerText = chars;
            document.getElementById('cNoSpaceCount').innerText = charsNoSpace;
            document.getElementById('sCount').innerText = sentences;
            document.getElementById('pCount').innerText = paragraphs;
            document.getElementById('rTime').innerText = readTimeStr;
        });`
    },
    {
        id: 'regex_tester',
        name: 'Regex Tester Pro',
        icon: 'fa-vial',
        ui: `<div>
            <label>Regex Pattern & Flags:</label>
            <div style="display: flex; gap: 8px;">
                <input id="regexPattern" type="text" placeholder="e.g. ([a-zA-Z0-9]+)" style="flex: 1;">
                <input id="regexFlags" type="text" placeholder="flags" value="g" style="width: 80px !important; text-align: center;">
            </div>

            <label class="mt-2">Test String:</label>
            <textarea id="regexText" rows="4" placeholder="Enter test text here..."></textarea>

            <div class="mt-2">
                <div id="regexMatchCount" class="font-bold text-cyan-400 text-xs mb-1">Matches Found: 0</div>
                <div id="regexResultList" class="p-3 bg-slate-950 rounded border border-cyan-500/30 text-xs font-mono max-h-36 overflow-y-auto text-emerald-400 break-all">
                    Waiting for pattern and text input...
                </div>
            </div>
        </div>`,
        js: `const runRegexHeavy = () => {
            const patternVal = document.getElementById('regexPattern').value;
            const flagsVal = document.getElementById('regexFlags').value;
            const textVal = document.getElementById('regexText').value;
            const countBox = document.getElementById('regexMatchCount');
            const resultBox = document.getElementById('regexResultList');

            if (!patternVal || !textVal) {
                countBox.innerText = 'Matches Found: 0';
                resultBox.innerHTML = '<span class="text-gray-500">Waiting for pattern and text input...</span>';
                return;
            }

            try {
                const regex = new RegExp(patternVal, flagsVal);
                const matches = textVal.match(regex);

                if (matches) {
                    countBox.innerText = 'Matches Found: ' + matches.length;
                    let listHTML = '<ol class="list-decimal pl-4 space-y-1">';
                    matches.forEach((m, idx) => {
                        listHTML += '<li><mark class="bg-cyan-500/20 text-cyan-300 px-1 rounded">' + m.replace(/</g, "&lt;").replace(/>/g, "&gt;") + '</mark></li>';
                    });
                    listHTML += '</ol>';
                    resultBox.innerHTML = listHTML;
                } else {
                    countBox.innerText = 'Matches Found: 0';
                    resultBox.innerHTML = '<span class="text-rose-400">No match found.</span>';
                }
            } catch(err) {
                countBox.innerText = 'Syntax Error';
                resultBox.innerHTML = '<span class="text-amber-400">Invalid Regex Pattern or Flags!</span>';
            }
        };

        document.getElementById('regexPattern')?.addEventListener('input', runRegexHeavy);
        document.getElementById('regexFlags')?.addEventListener('input', runRegexHeavy);
        document.getElementById('regexText')?.addEventListener('input', runRegexHeavy);`
    }
];
