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
            const patternVal = document.getElementById('regexPattern')?.value;
            const flagsVal = document.getElementById('regexFlags')?.value;
            const textVal = document.getElementById('regexText')?.value;
            const countBox = document.getElementById('regexMatchCount');
            const resultBox = document.getElementById('regexResultList');

            if (!patternVal || !textVal) {
                if(countBox) countBox.innerText = 'Matches Found: 0';
                if(resultBox) resultBox.innerHTML = '<span class="text-gray-500">Waiting for pattern and text input...</span>';
                return;
            }

            try {
                const regex = new RegExp(patternVal, flagsVal);
                const matches = textVal.match(regex);

                if (matches) {
                    if(countBox) countBox.innerText = 'Matches Found: ' + matches.length;
                    let listHTML = '<ol class="list-decimal pl-4 space-y-1">';
                    matches.forEach((m) => {
                        listHTML += '<li><mark class="bg-cyan-500/20 text-cyan-300 px-1 rounded">' + m.replace(/</g, "&lt;").replace(/>/g, "&gt;") + '</mark></li>';
                    });
                    listHTML += '</ol>';
                    if(resultBox) resultBox.innerHTML = listHTML;
                } else {
                    if(countBox) countBox.innerText = 'Matches Found: 0';
                    if(resultBox) resultBox.innerHTML = '<span class="text-rose-400">No match found.</span>';
                }
            } catch(err) {
                if(countBox) countBox.innerText = 'Syntax Error';
                if(resultBox) resultBox.innerHTML = '<span class="text-amber-400">Invalid Regex Pattern or Flags!</span>';
            }
        };

        document.getElementById('regexPattern')?.addEventListener('input', runRegexHeavy);
        document.getElementById('regexFlags')?.addEventListener('input', runRegexHeavy);
        document.getElementById('regexText')?.addEventListener('input', runRegexHeavy);`
    },
    {
        id: 'base64_tool',
        name: 'Base64 Convertor',
        icon: 'fa-code',
        ui: `<div>
            <label>Mode:</label>
            <select id="b64Mode" class="mb-2">
                <option value="encode">Encode (Text to Base64)</option>
                <option value="decode">Decode (Base64 to Text)</option>
            </select>

            <label class="mt-2">Input:</label>
            <textarea id="b64Input" rows="3" placeholder="Enter text here..."></textarea>

            <label class="mt-2">Output:</label>
            <textarea id="b64Output" rows="3" readonly placeholder="Output will appear here..."></textarea>
        </div>`,
        js: `const runBase64 = () => {
            const mode = document.getElementById('b64Mode')?.value;
            const input = document.getElementById('b64Input')?.value || '';
            const output = document.getElementById('b64Output');
            if (!output) return;

            if (!input) { output.value = ''; return; }

            try {
                if (mode === 'encode') {
                    output.value = btoa(unescape(encodeURIComponent(input)));
                } else {
                    output.value = decodeURIComponent(escape(atob(input)));
                }
            } catch(e) {
                output.value = 'Error: Invalid Input for ' + mode;
            }
        };

        document.getElementById('b64Mode')?.addEventListener('change', runBase64);
        document.getElementById('b64Input')?.addEventListener('input', runBase64);`
    },
    {
        id: 'password_generator',
        name: 'Password Generator Pro',
        icon: 'fa-key',
        ui: `<div>
            <label>Length: <span id="passLenVal" class="text-cyan-400 font-bold">16</span></label>
            <input id="passLength" type="range" min="8" max="64" value="16" style="width:100%; margin:8px 0;">

            <div class="grid grid-cols-2 gap-2 my-2 text-xs">
                <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" id="chkUpper" checked> ABC Uppercase</label>
                <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" id="chkLower" checked> abc Lowercase</label>
                <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" id="chkNum" checked> 123 Numbers</label>
                <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" id="chkSym" checked> !@# Symbols</label>
            </div>

            <button type="button" id="btnGenPass">Generate New Key</button>

            <label class="mt-3">Result Key:</label>
            <input id="passOutput" type="text" readonly placeholder="Click generate button...">
        </div>`,
        js: `const genPass = () => {
            const len = parseInt(document.getElementById('passLength')?.value || '16');
            const upper = document.getElementById('chkUpper')?.checked;
            const lower = document.getElementById('chkLower')?.checked;
            const num = document.getElementById('chkNum')?.checked;
            const sym = document.getElementById('chkSym')?.checked;

            let chars = '';
            if (upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            if (lower) chars += 'abcdefghijklmnopqrstuvwxyz';
            if (num) chars += '0123456789';
            if (sym) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

            const out = document.getElementById('passOutput');
            if (!chars) { if(out) out.value = 'Select at least one character set!'; return; }

            let res = '';
            for (let i = 0; i < len; i++) {
                res += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            if(out) out.value = res;
        };

        document.getElementById('passLength')?.addEventListener('input', (e) => {
            const span = document.getElementById('passLenVal');
            if (span) span.innerText = e.target.value;
            genPass();
        });

        document.getElementById('btnGenPass')?.addEventListener('click', genPass);
        document.getElementById('chkUpper')?.addEventListener('change', genPass);
        document.getElementById('chkLower')?.addEventListener('change', genPass);
        document.getElementById('chkNum')?.addEventListener('change', genPass);
        document.getElementById('chkSym')?.addEventListener('change', genPass);
        genPass();`
    },
    {
        id: 'json_validator',
        name: 'JSON Formatter & Validator',
        icon: 'fa-file-code',
        ui: `<div>
            <label>Paste Raw JSON Code:</label>
            <textarea id="jsonInput" rows="4" placeholder='{"key": "value"}'></textarea>

            <button type="button" id="btnFormatJson">Format & Validate</button>

            <div id="jsonStatus" class="mt-2 text-xs font-bold font-mono"></div>
            <textarea id="jsonOutput" rows="4" readonly placeholder="Formatted output will appear here..."></textarea>
        </div>`,
        js: `document.getElementById('btnFormatJson')?.addEventListener('click', () => {
            const input = document.getElementById('jsonInput')?.value.trim();
            const status = document.getElementById('jsonStatus');
            const output = document.getElementById('jsonOutput');

            if (!input) {
                if (status) { status.innerText = '⚠️ Please enter JSON text!'; status.className = 'mt-2 text-xs font-bold text-amber-400'; }
                if (output) output.value = '';
                return;
            }

            try {
                const parsed = JSON.parse(input);
                if (output) output.value = JSON.stringify(parsed, null, 4);
                if (status) { status.innerText = '✅ Valid JSON Code!'; status.className = 'mt-2 text-xs font-bold text-emerald-400'; }
            } catch(e) {
                if (status) { status.innerText = '❌ Invalid JSON: ' + e.message; status.className = 'mt-2 text-xs font-bold text-rose-400'; }
                if (output) output.value = '';
            }
        });`
    }
];
        
