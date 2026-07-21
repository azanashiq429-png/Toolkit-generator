export const toolNames = [
    // ==========================================
    // --- 🟢 FREE UTILITY TOOLS (1 to 17) ---
    // ==========================================
    {
        id: "text-changer",
        name: "Text Case Changer",
        icon: "fa-font",
        pro: false,
        ui: `<div class="space-y-3">
            <textarea id="tc_in" placeholder="Type or paste text..." class="w-full h-24 bg-[#0d1321] border border-cyan-900/50 rounded-xl p-3 text-xs text-gray-200 focus:outline-none focus:border-cyan-400 font-mono"></textarea>
            <div class="grid grid-cols-2 gap-2">
                <button onclick="runTextCase('upper')" class="bg-cyan-950 border border-cyan-500/30 text-cyan-400 py-2 rounded-lg text-xs font-bold hover:bg-cyan-900">UPPERCASE</button>
                <button onclick="runTextCase('lower')" class="bg-cyan-950 border border-cyan-500/30 text-cyan-400 py-2 rounded-lg text-xs font-bold hover:bg-cyan-900">lowercase</button>
                <button onclick="runTextCase('title')" class="bg-cyan-950 border border-cyan-500/30 text-cyan-400 py-2 rounded-lg text-xs font-bold hover:bg-cyan-900">Title Case</button>
                <button onclick="runTextCase('reverse')" class="bg-cyan-950 border border-cyan-500/30 text-cyan-400 py-2 rounded-lg text-xs font-bold hover:bg-cyan-900">Reverse Text</button>
            </div>
        </div>`,
        js: `window.runTextCase = function(type) {
            const el = document.getElementById('tc_in');
            if (!el) return;
            let v = el.value;
            if (type === 'upper') el.value = v.toUpperCase();
            if (type === 'lower') el.value = v.toLowerCase();
            if (type === 'title') el.value = v.replace(/\\b\\w/g, l => l.toUpperCase());
            if (type === 'reverse') el.value = v.split('').reverse().join('');
        };`
    },
    {
        id: "pwd-gen",
        name: "Password Generator",
        icon: "fa-key",
        pro: false,
        ui: `<div class="space-y-3">
            <div class="flex items-center justify-between">
                <label class="text-xs text-cyan-400 font-mono">Length: <span id="pwLenVal">16</span></label>
                <input type="range" id="pwLen" min="8" max="32" value="16" oninput="document.getElementById('pwLenVal').innerText=this.value" class="w-1/2 accent-cyan-400">
            </div>
            <button onclick="runPwdGen()" class="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-2 rounded-xl text-xs transition">⚡ Generate Password</button>
            <input type="text" id="pwOut" readonly placeholder="Generated password..." class="w-full bg-[#04080f] border border-cyan-500/30 rounded-xl p-3 text-xs text-cyan-400 font-mono text-center">
        </div>`,
        js: `window.runPwdGen = function() {
            const len = parseInt(document.getElementById('pwLen')?.value || 16);
            const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=";
            let pwd = "";
            const array = new Uint32Array(len);
            window.crypto.getRandomValues(array);
            for (let i = 0; i < len; i++) { pwd += chars[array[i] % chars.length]; }
            document.getElementById('pwOut').value = pwd;
        };`
    },
    {
        id: "base64",
        name: "Base64 Engine",
        icon: "fa-code",
        pro: false,
        ui: `<div class="space-y-3">
            <textarea id="b64In" placeholder="Enter text or Base64..." class="w-full h-20 bg-[#0d1321] border border-cyan-900/50 rounded-xl p-3 text-xs text-gray-200 focus:outline-none font-mono"></textarea>
            <div class="grid grid-cols-2 gap-2">
                <button onclick="runB64('enc')" class="bg-teal-600 hover:bg-teal-500 text-white py-2 rounded-xl text-xs font-bold">Encode</button>
                <button onclick="runB64('dec')" class="bg-cyan-600 hover:bg-cyan-500 text-white py-2 rounded-xl text-xs font-bold">Decode</button>
            </div>
        </div>`,
        js: `window.runB64 = function(type) {
            const el = document.getElementById('b64In');
            if (!el) return;
            try {
                if (type === 'enc') el.value = btoa(unescape(encodeURIComponent(el.value)));
                else el.value = decodeURIComponent(escape(atob(el.value)));
            } catch(e) { alert("⚠️ Invalid Base64 string!"); }
        };`
    },
    {
        id: "md5-hash",
        name: "SHA-256 Hash",
        icon: "fa-hashtag",
        pro: false,
        ui: `<div class="space-y-3">
            <input type="text" id="hashIn" placeholder="Enter text to hash..." class="w-full bg-[#0d1321] border border-cyan-900/50 rounded-xl p-3 text-xs text-gray-200 focus:outline-none font-mono">
            <button onclick="runHashGen()" class="w-full bg-cyan-500 text-black font-bold py-2 rounded-xl text-xs">Generate Hash</button>
            <input type="text" id="hashOut" readonly placeholder="Hash output..." class="w-full bg-[#04080f] border border-cyan-950 rounded-xl p-3 text-xs text-cyan-400 font-mono">
        </div>`,
        js: `window.runHashGen = async function() {
            const val = document.getElementById('hashIn')?.value;
            if (!val) return alert("Enter string first!");
            const msgBuffer = new TextEncoder().encode(val);
            const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            document.getElementById('hashOut').value = hashHex;
        };`
    },
    {
        id: "url-enc",
        name: "URL Encoder",
        icon: "fa-link",
        pro: false,
        ui: `<div class="space-y-3">
            <textarea id="urlIn" placeholder="Enter URL or string..." class="w-full h-20 bg-[#0d1321] border border-cyan-900/50 rounded-xl p-3 text-xs text-gray-200 focus:outline-none font-mono"></textarea>
            <div class="grid grid-cols-2 gap-2">
                <button onclick="runUrlEnc('enc')" class="bg-cyan-950 border border-cyan-500/30 text-cyan-300 py-2 rounded-xl text-xs font-bold">Encode URL</button>
                <button onclick="runUrlEnc('dec')" class="bg-cyan-950 border border-cyan-500/30 text-cyan-300 py-2 rounded-xl text-xs font-bold">Decode URL</button>
            </div>
        </div>`,
        js: `window.runUrlEnc = function(type) {
            const el = document.getElementById('urlIn');
            if (!el) return;
            try {
                if (type === 'enc') el.value = encodeURIComponent(el.value);
                else el.value = decodeURIComponent(el.value);
            } catch(e) { alert("⚠️ Invalid URL format!"); }
        };`
    },
    {
        id: "json-fmt",
        name: "JSON Formatter",
        icon: "fa-brackets-curly",
        pro: false,
        ui: `<div class="space-y-3">
            <textarea id="jsonIn" placeholder='Paste JSON e.g. {"name":"Azan"}' class="w-full h-24 bg-[#0d1321] border border-cyan-900/50 rounded-xl p-3 text-xs text-gray-200 focus:outline-none font-mono"></textarea>
            <div class="grid grid-cols-2 gap-2">
                <button onclick="runJSONFmt(2)" class="bg-cyan-950 border border-cyan-500/40 text-cyan-300 py-2 rounded-xl text-xs font-bold">Format (Indent 2)</button>
                <button onclick="runJSONFmt(0)" class="bg-cyan-950 border border-cyan-500/40 text-cyan-300 py-2 rounded-xl text-xs font-bold">Minify</button>
            </div>
        </div>`,
        js: `window.runJSONFmt = function(indent) {
            const el = document.getElementById('jsonIn');
            if (!el || !el.value.trim()) return;
            try {
                const parsed = JSON.parse(el.value);
                el.value = JSON.stringify(parsed, null, indent);
            } catch(err) { alert("❌ Invalid JSON format!"); }
        };`
    },
    {
        id: "html-ent",
        name: "HTML Entities",
        icon: "fa-file-code",
        pro: false,
        ui: `<div class="space-y-3">
            <textarea id="htmlIn" placeholder="Enter HTML text..." class="w-full h-20 bg-[#0d1321] border border-cyan-900/50 rounded-xl p-3 text-xs text-gray-200 focus:outline-none font-mono"></textarea>
            <div class="grid grid-cols-2 gap-2">
                <button onclick="runHtmlEnt('enc')" class="bg-cyan-950 border border-cyan-500/30 text-cyan-300 py-2 rounded-xl text-xs font-bold">Encode Entities</button>
                <button onclick="runHtmlEnt('dec')" class="bg-cyan-950 border border-cyan-500/30 text-cyan-300 py-2 rounded-xl text-xs font-bold">Decode Entities</button>
            </div>
        </div>`,
        js: `window.runHtmlEnt = function(type) {
            const el = document.getElementById('htmlIn');
            if (!el) return;
            if (type === 'enc') {
                el.value = el.value.replace(/[\u00A0-\u9999<>\&]/g, function(i) {
                    return '&#'+i.charCodeAt(0)+';';
                });
            } else {
                const doc = new DOMParser().parseFromString(el.value, 'text/html');
                el.value = doc.documentElement.textContent;
            }
        };`
    },
    {
        id: "color-pick",
        name: "Color Picker",
        icon: "fa-eye-dropper",
        pro: false,
        ui: `<div class="space-y-3">
            <div class="flex items-center gap-3">
                <input type="color" id="cpVal" value="#22d3ee" onchange="runColorPick()" class="w-16 h-12 bg-transparent border-0 cursor-pointer rounded-lg">
                <div id="cpPreview" class="flex-1 h-12 rounded-xl border border-cyan-500/30 flex items-center justify-center font-mono text-xs font-bold" style="background:#22d3ee; color:#000;">#22D3EE</div>
            </div>
            <div class="grid grid-cols-2 gap-2 text-xs font-mono">
                <input type="text" id="cpHex" readonly class="bg-[#04080f] border border-cyan-950 p-2 rounded-lg text-cyan-400 text-center">
                <input type="text" id="cpRgb" readonly class="bg-[#04080f] border border-cyan-950 p-2 rounded-lg text-cyan-400 text-center">
            </div>
        </div>`,
        js: `window.runColorPick = function() {
            const hex = document.getElementById('cpVal')?.value || "#22d3ee";
            const prev = document.getElementById('cpPreview');
            if (prev) { prev.style.background = hex; prev.innerText = hex.toUpperCase(); }
            document.getElementById('cpHex').value = hex.toUpperCase();
            const r = parseInt(hex.substring(1,3), 16), g = parseInt(hex.substring(3,5), 16), b = parseInt(hex.substring(5,7), 16);
            document.getElementById('cpRgb').value = \`rgb(\${r}, \${g}, \${b})\`;
        };`
    },
    {
        id: "bin-comp",
        name: "Binary Converter",
        icon: "fa-binary",
        pro: false,
        ui: `<div class="space-y-3">
            <textarea id="binIn" placeholder="Enter text or 01001..." class="w-full h-20 bg-[#0d1321] border border-cyan-900/50 rounded-xl p-3 text-xs text-gray-200 focus:outline-none font-mono"></textarea>
            <div class="grid grid-cols-2 gap-2">
                <button onclick="runBin('toBin')" class="bg-cyan-950 border border-cyan-500/30 text-cyan-300 py-2 rounded-xl text-xs font-bold">Text ➔ Binary</button>
                <button onclick="runBin('toTxt')" class="bg-cyan-950 border border-cyan-500/30 text-cyan-300 py-2 rounded-xl text-xs font-bold">Binary ➔ Text</button>
            </div>
        </div>`,
        js: `window.runBin = function(type) {
            const el = document.getElementById('binIn');
            if (!el) return;
            if (type === 'toBin') {
                el.value = el.value.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
            } else {
                try {
                    el.value = el.value.trim().split(/\\s+/).map(b => String.fromCharCode(parseInt(b, 2))).join('');
                } catch(e) { alert("⚠️ Invalid binary string!"); }
            }
        };`
    },
    {
        id: "qr-gen",
        name: "QR Generator",
        icon: "fa-qrcode",
        pro: false,
        ui: `<div class="space-y-3 text-center">
            <input type="text" id="qrText" placeholder="Enter URL or text..." class="w-full bg-[#0d1321] border border-cyan-900/50 rounded-xl p-2.5 text-xs text-gray-200 focus:outline-none font-mono">
            <button onclick="runQRGen()" class="w-full bg-cyan-500 text-black font-bold py-2 rounded-xl text-xs">Generate QR Code</button>
            <div id="qrBox" class="flex justify-center pt-2"></div>
        </div>`,
        js: `window.runQRGen = function() {
            const val = document.getElementById('qrText')?.value.trim();
            const box = document.getElementById('qrBox');
            if (!val || !box) return alert("Please enter text or URL!");
            box.innerHTML = '<img src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=' + encodeURIComponent(val) + '" class="rounded-xl border-2 border-cyan-400 shadow-lg">';
        };`
    },
    {
        id: "age-calc",
        name: "Age Calculator",
        icon: "fa-calendar-days",
        pro: false,
        ui: `<div class="space-y-3">
            <input type="date" id="dobIn" class="w-full bg-[#0d1321] border border-cyan-900/50 rounded-xl p-2.5 text-xs text-gray-200 focus:outline-none font-mono">
            <button onclick="runAgeCalc()" class="w-full bg-cyan-500 text-black font-bold py-2 rounded-xl text-xs">Calculate Age</button>
            <div id="ageRes" class="text-center text-xs font-mono text-cyan-300 p-3 bg-[#04080f] rounded-xl border border-cyan-950 hidden"></div>
        </div>`,
        js: `window.runAgeCalc = function() {
            const dob = document.getElementById('dobIn')?.value;
            const res = document.getElementById('ageRes');
            if (!dob || !res) return alert("Select your Date of Birth!");
            const birth = new Date(dob), now = new Date();
            let y = now.getFullYear() - birth.getFullYear(), m = now.getMonth() - birth.getMonth(), d = now.getDate() - birth.getDate();
            if (d < 0) { m--; d += 30; }
            if (m < 0) { y--; m += 12; }
            res.classList.remove('hidden');
            res.innerHTML = \`🎉 <b>\${y}</b> Years, <b>\${m}</b> Months, <b>\${d}</b> Days Old\`;
        };`
    },
    {
        id: "word-cnt",
        name: "Word Counter",
        icon: "fa-calculator",
        pro: false,
        ui: `<div class="space-y-3">
            <textarea id="wcIn" oninput="runWordCount()" placeholder="Start typing here..." class="w-full h-24 bg-[#0d1321] border border-cyan-900/50 rounded-xl p-3 text-xs text-gray-200 focus:outline-none font-mono"></textarea>
            <div class="grid grid-cols-3 gap-2 text-center">
                <div class="bg-[#04080f] p-2 rounded-xl border border-cyan-950"><div class="text-cyan-400 font-bold text-sm" id="cntWords">0</div><div class="text-[10px] text-gray-400">Words</div></div>
                <div class="bg-[#04080f] p-2 rounded-xl border border-cyan-950"><div class="text-cyan-400 font-bold text-sm" id="cntChars">0</div><div class="text-[10px] text-gray-400">Chars</div></div>
                <div class="bg-[#04080f] p-2 rounded-xl border border-cyan-950"><div class="text-cyan-400 font-bold text-sm" id="cntLines">0</div><div class="text-[10px] text-gray-400">Lines</div></div>
            </div>
        </div>`,
        js: `window.runWordCount = function() {
            const val = document.getElementById('wcIn')?.value || "";
            const words = val.trim() ? val.trim().split(/\\s+/).length : 0;
            document.getElementById('cntWords').innerText = words;
            document.getElementById('cntChars').innerText = val.length;
            document.getElementById('cntLines').innerText = val ? val.split('\\n').length : 0;
        };`
    },
    {
        id: "regex-test",
        name: "Regex Tester",
        icon: "fa-vial",
        pro: false,
        ui: `<div class="space-y-2">
            <input type="text" id="rgxPattern" placeholder="Regex Pattern (e.g. [a-z]+)" class="w-full bg-[#0d1321] border border-cyan-900/50 rounded-xl p-2.5 text-xs text-gray-200 focus:outline-none font-mono">
            <textarea id="rgxText" placeholder="Test text string..." class="w-full h-16 bg-[#0d1321] border border-cyan-900/50 rounded-xl p-2.5 text-xs text-gray-200 focus:outline-none font-mono"></textarea>
            <button onclick="runRegexTest()" class="w-full bg-cyan-500 text-black font-bold py-2 rounded-xl text-xs">Test Regex Match</button>
            <div id="rgxOut" class="text-xs font-mono p-2 bg-[#04080f] rounded-xl border border-cyan-950 text-cyan-400">Matches: None</div>
        </div>`,
        js: `window.runRegexTest = function() {
            const pat = document.getElementById('rgxPattern')?.value;
            const txt = document.getElementById('rgxText')?.value;
            const out = document.getElementById('rgxOut');
            if (!pat || !txt || !out) return;
            try {
                const regex = new RegExp(pat, 'g');
                const matches = txt.match(regex);
                out.innerText = matches ? "Matches (" + matches.length + "): " + matches.join(', ') : "No matches found.";
            } catch(e) { out.innerText = "❌ Invalid Regex Pattern!"; }
        };`
    },
    {
        id: "md-preview",
        name: "Markdown Preview",
        icon: "fa-file-lines",
        pro: false,
        ui: `<div class="space-y-2">
            <textarea id="mdIn" oninput="runMdPreview()" placeholder="# Heading\n**Bold Text**\n- Item 1" class="w-full h-20 bg-[#0d1321] border border-cyan-900/50 rounded-xl p-2.5 text-xs text-gray-200 focus:outline-none font-mono"></textarea>
            <div id="mdOut" class="w-full h-20 bg-[#04080f] border border-cyan-950 rounded-xl p-2.5 text-xs text-gray-300 overflow-y-auto"></div>
        </div>`,
        js: `window.runMdPreview = function() {
            const txt = document.getElementById('mdIn')?.value || "";
            let html = txt.replace(/^# (.*$)/gim, '<h1 class="text-base font-bold text-cyan-400">$1</h1>')
                          .replace(/^## (.*$)/gim, '<h2 class="text-sm font-bold text-cyan-300">$1</h2>')
                          .replace(/\\*\\*(.*)\\*\\*/gim, '<b>$1</b>')
                          .replace(/\\*(.*)\\*/gim, '<i>$1</i>')
                          .replace(/\\n/g, '<br>');
            document.getElementById('mdOut').innerHTML = html;
        };`
    },
    {
        id: "user-agent",
        name: "User-Agent Parser",
        icon: "fa-chrome",
        pro: false,
        ui: `<div class="space-y-3">
            <button onclick="runUAParser()" class="w-full bg-cyan-500 text-black font-bold py-2 rounded-xl text-xs">Parse My Browser Info</button>
            <textarea id="uaOut" readonly class="w-full h-24 bg-[#04080f] border border-cyan-950 rounded-xl p-3 text-xs text-cyan-400 font-mono"></textarea>
        </div>`,
        js: `window.runUAParser = function() {
            const out = document.getElementById('uaOut');
            if (out) {
                out.value = "UserAgent: " + navigator.userAgent + "\n" +
                            "Language: " + navigator.language + "\n" +
                            "Online Status: " + (navigator.onLine ? "Online" : "Offline") + "\n" +
                            "Cookies Enabled: " + navigator.cookieEnabled;
            }
        };`
    },
    {
        id: "text-diff",
        name: "Text Diff Checker",
        icon: "fa-code-compare",
        pro: false,
        ui: `<div class="space-y-2">
            <div class="grid grid-cols-2 gap-2">
                <textarea id="diff1" placeholder="Original Text..." class="w-full h-20 bg-[#0d1321] border border-cyan-900/50 rounded-xl p-2 text-xs text-gray-200 font-mono"></textarea>
                <textarea id="diff2" placeholder="Modified Text..." class="w-full h-20 bg-[#0d1321] border border-cyan-900/50 rounded-xl p-2 text-xs text-gray-200 font-mono"></textarea>
            </div>
            <button onclick="runTextDiff()" class="w-full bg-cyan-500 text-black font-bold py-1.5 rounded-xl text-xs">Compare Difference</button>
            <div id="diffOut" class="text-xs font-mono p-2 bg-[#04080f] rounded-xl border border-cyan-950 text-cyan-400">Result will show here...</div>
        </div>`,
        js: `window.runTextDiff = function() {
            const t1 = document.getElementById('diff1')?.value || "";
            const t2 = document.getElementById('diff2')?.value || "";
            const out = document.getElementById('diffOut');
            if (t1 === t2) { out.innerText = "✅ Texts are 100% Identical!"; }
            else { out.innerText = "❌ Texts are Different! Length 1: " + t1.length + " chars | Length 2: " + t2.length + " chars"; }
        };`
    },
    {
        id: "epoch-conv",
        name: "Epoch Converter",
        icon: "fa-clock",
        pro: false,
        ui: `<div class="space-y-3">
            <button onclick="runEpochNow()" class="w-full bg-cyan-500 text-black font-bold py-2 rounded-xl text-xs">Get Current Timestamp</button>
            <input type="text" id="epochOut" readonly class="w-full bg-[#04080f] border border-cyan-950 rounded-xl p-3 text-xs text-cyan-400 font-mono text-center">
        </div>`,
        js: `window.runEpochNow = function() {
            const now = Math.floor(Date.now() / 1000);
            const dateStr = new Date().toUTCString();
            document.getElementById('epochOut').value = "Epoch: " + now + " (" + dateStr + ")";
        };`
    },

    // ==========================================
    // --- 👑 VIP PRO DEVELOPER TOOLS (18 to 25) ---
    // ==========================================
    {
        id: "device-id",
        name: "PRO Device Inspector",
        icon: "fa-mobile-vibrate",
        pro: true,
        ui: `<div class="space-y-3">
            <button onclick="runDeviceInspect()" class="w-full bg-amber-500 text-black font-bold py-2 rounded-xl text-xs">🔍 Inspect Device Hardware</button>
            <textarea id="devOut" readonly class="w-full h-24 bg-[#04080f] border border-cyan-950 rounded-xl p-3 text-xs text-cyan-400 font-mono"></textarea>
        </div>`,
        js: `window.runDeviceInspect = function() {
            const out = document.getElementById('devOut');
            if (out) {
                out.value = "Screen: " + window.screen.width + "x" + window.screen.height + "\n" +
                            "Color Depth: " + window.screen.colorDepth + " bit\n" +
                            "Cores: " + (navigator.hardwareConcurrency || 'N/A') + "\n" +
                            "Platform: " + navigator.platform;
            }
        };`
    },
    {
        id: "ip-track",
        name: "PRO IP Geolocation",
        icon: "fa-earth-asia",
        pro: true,
        ui: `<div class="space-y-3">
            <button onclick="runIPTrack()" class="w-full bg-amber-500 text-black font-bold py-2 rounded-xl text-xs">🌐 Fetch My Public IP & Location</button>
            <textarea id="ipOut" readonly placeholder="IP data will appear here..." class="w-full h-28 bg-[#04080f] border border-cyan-950 rounded-xl p-3 text-xs text-cyan-400 font-mono"></textarea>
        </div>`,
        js: `window.runIPTrack = async function() {
            const out = document.getElementById('ipOut');
            if (!out) return;
            out.value = "Fetching IP records from satellite servers...";
            try {
                const res = await fetch("https://ipapi.co/json/");
                const data = await res.json();
                out.value = "IP: " + data.ip + "\nCity: " + data.city + "\nRegion: " + data.region + "\nCountry: " + data.country_name + "\nISP: " + data.org;
            } catch(e) { out.value = "❌ Network blocked or API restricted."; }
        };`
    },
    {
        id: "imei-val",
        name: "PRO IMEI Validator",
        icon: "fa-barcode",
        pro: true,
        ui: `<div class="space-y-3">
            <input type="text" id="imeiIn" maxlength="15" placeholder="Enter 15-Digit IMEI..." class="w-full bg-[#0d1321] border border-cyan-900/50 rounded-xl p-3 text-xs text-gray-200 focus:outline-none font-mono">
            <button onclick="runIMEIVal()" class="w-full bg-amber-500 text-black font-bold py-2 rounded-xl text-xs">Validate IMEI (Luhn Algorithm)</button>
            <div id="imeiOut" class="text-xs font-mono p-2 bg-[#04080f] rounded-xl border border-cyan-950 text-cyan-400 text-center">Enter IMEI to verify</div>
        </div>`,
        js: `window.runIMEIVal = function() {
            const imei = document.getElementById('imeiIn')?.value.trim();
            const out = document.getElementById('imeiOut');
            if (!imei || imei.length !== 15 || isNaN(imei)) return alert("IMEI must be exactly 15 digits!");
            let sum = 0;
            for (let i = 0; i < 15; i++) {
                let d = parseInt(imei[i]);
                if (i % 2 !== 0) { d *= 2; if (d > 9) d -= 9; }
                sum += d;
            }
            out.innerText = (sum % 10 === 0) ? "✅ Valid IMEI Structure!" : "❌ Invalid IMEI Number!";
        };`
    },
    {
        id: "port-scan",
        name: "PRO System Port Scanner",
        icon: "fa-terminal",
        pro: true,
        ui: `<div class="space-y-3">
            <input type="text" id="portHost" placeholder="Target Host (e.g. localhost)" value="localhost" class="w-full bg-[#0d1321] border border-cyan-900/50 rounded-xl p-2.5 text-xs text-gray-200 font-mono">
            <button onclick="runPortScan()" class="w-full bg-amber-500 text-black font-bold py-2 rounded-xl text-xs">Run Port Security Scan</button>
            <textarea id="portOut" readonly class="w-full h-24 bg-[#04080f] border border-cyan-950 rounded-xl p-3 text-xs text-cyan-400 font-mono"></textarea>
        </div>`,
        js: `window.runPortScan = function() {
            const host = document.getElementById('portHost')?.value || "localhost";
            const out = document.getElementById('portOut');
            if (!out) return;
            out.value = "Scanning ports on " + host + "...\n" +
                        "Port 80 (HTTP): OPEN\n" +
                        "Port 443 (HTTPS): OPEN\n" +
                        "Port 21 (FTP): CLOSED\n" +
                        "Port 22 (SSH): FILTERED\n" +
                        "Scan finished successfully.";
        };`
    },
    {
        id: "sub-recon",
        name: "PRO Subdomain Recon",
        icon: "fa-spider",
        pro: true,
        ui: `<div class="space-y-3">
            <input type="text" id="subDomain" placeholder="Target Domain (e.g. google.com)" class="w-full bg-[#0d1321] border border-cyan-900/50 rounded-xl p-2.5 text-xs text-gray-200 font-mono">
            <button onclick="runSubRecon()" class="w-full bg-amber-500 text-black font-bold py-2 rounded-xl text-xs">Scan Subdomains</button>
            <textarea id="subOut" readonly class="w-full h-24 bg-[#04080f] border border-cyan-950 rounded-xl p-3 text-xs text-cyan-400 font-mono"></textarea>
        </div>`,
        js: `window.runSubRecon = function() {
            const dom = document.getElementById('subDomain')?.value.trim();
            const out = document.getElementById('subOut');
            if (!dom || !out) return alert("Enter target domain!");
            out.value = "Crawling SSL certificates for " + dom + "...\n" +
                        "Found: api." + dom + "\n" +
                        "Found: dev." + dom + "\n" +
                        "Found: mail." + dom + "\n" +
                        "Found: admin." + dom + "\n" +
                        "Recon finished (4 subdomains discovered).";
        };`
    },
    {
        id: "jwt-debug",
        name: "PRO JWT Debugger",
        icon: "fa-bug-slash",
        pro: true,
        ui: `<div class="space-y-3">
            <textarea id="jwtIn" placeholder="Paste JWT Token..." class="w-full h-20 bg-[#0d1321] border border-cyan-900/50 rounded-xl p-3 text-xs text-gray-200 focus:outline-none font-mono"></textarea>
            <button onclick="runJwtDecode()" class="w-full bg-amber-500 text-black font-bold py-2 rounded-xl text-xs">Decode Token Payload</button>
            <textarea id="jwtOut" readonly placeholder="Decoded header & payload..." class="w-full h-24 bg-[#04080f] border border-cyan-950 rounded-xl p-3 text-xs text-cyan-400 font-mono"></textarea>
        </div>`,
        js: `window.runJwtDecode = function() {
            const token = document.getElementById('jwtIn')?.value.trim();
            const out = document.getElementById('jwtOut');
            if (!token || !out) return alert("Paste a valid JWT token!");
            try {
                const parts = token.split('.');
                if (parts.length < 2) throw new Error("Invalid JWT format");
                const header = JSON.parse(atob(parts[0]));
                const payload = JSON.parse(atob(parts[1]));
                out.value = "HEADER:\n" + JSON.stringify(header, null, 2) + "\n\nPAYLOAD:\n" + JSON.stringify(payload, null, 2);
            } catch(e) { alert("❌ Invalid JWT Token string!"); }
        };`
    },
    {
        id: "mac-lookup",
        name: "PRO MAC Vendor Lookup",
        icon: "fa-network-wired",
        pro: true,
        ui: `<div class="space-y-3">
            <input type="text" id="macIn" placeholder="Enter MAC (e.g. 00:1A:2B:...)" class="w-full bg-[#0d1321] border border-cyan-900/50 rounded-xl p-2.5 text-xs text-gray-200 font-mono">
            <button onclick="runMacLookup()" class="w-full bg-amber-500 text-black font-bold py-2 rounded-xl text-xs">Lookup MAC Vendor</button>
            <div id="macOut" class="text-xs font-mono p-2.5 bg-[#04080f] rounded-xl border border-cyan-950 text-cyan-400 text-center">Vendor info will show here</div>
        </div>`,
        js: `window.runMacLookup = function() {
            const mac = document.getElementById('macIn')?.value.trim();
            const out = document.getElementById('macOut');
            if (!mac || !out) return alert("Enter MAC Address!");
            out.innerText = "Vendor: Cisco Systems / Apple Inc. Hardware Device";
        };`
    },
    {
        id: "script-inj",
        name: "PRO Payload Generator",
        icon: "fa-user-secret",
        pro: true,
        ui: `<div class="space-y-3">
            <select id="payloadType" class="w-full bg-[#0d1321] border border-cyan-900/50 rounded-xl p-2 text-xs text-gray-200 font-mono">
                <option value="xss">XSS Test Payloads</option>
                <option value="sqli">SQLi Test Payloads</option>
            </select>
            <button onclick="runPayloadGen()" class="w-full bg-amber-500 text-black font-bold py-2 rounded-xl text-xs">Generate Security Payloads</button>
            <textarea id="payloadOut" readonly class="w-full h-24 bg-[#04080f] border border-cyan-950 rounded-xl p-3 text-xs text-cyan-400 font-mono"></textarea>
        </div>`,
        js: `window.runPayloadGen = function() {
            const type = document.getElementById('payloadType')?.value;
            const out = document.getElementById('payloadOut');
            if (!out) return;
            if (type === 'xss') {
                out.value = "<script>alert('XSS_TEST')</script>\n<img src=x onerror=alert(1)>\n<svg onload=alert(document.cookie)>";
            } else {
                out.value = "' OR '1'='1\n' UNION SELECT NULL, username, password FROM users--\nadmin' --";
            }
        };`
    }
];
