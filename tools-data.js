export const toolNames = [
    // --- FREE TOOLS ---
    { id: "text-changer", name: "Text Case Multi-Changer", icon: "fa-font", pro: false, ui: `<h3>🅰️ Text Case Changer</h3><textarea id="textInput" placeholder="Enter text..." style="width:100%; background:#0d1321; border:1px solid #164e63; color:white; padding:10px; border-radius:8px;"></textarea><button onclick="runTextCase('upper')" style="margin-top:5px; width:48%; background:#0891b2; color:white; border:none; padding:8px;">UPPER</button><button onclick="runTextCase('lower')" style="margin-left:4%; width:48%; background:#0891b2; color:white; border:none; padding:8px;">lower</button>`, js: `function runTextCase(type) { const t = document.getElementById('textInput'); t.value = (type === 'upper') ? t.value.toUpperCase() : t.value.toLowerCase(); }` },
    { id: "pwd-gen", name: "Secure Random Password Generator", icon: "fa-key", pro: false, ui: `<h3>🔑 Password Generator</h3><input type="number" id="pwLen" value="12" style="width:100%; background:#0d1321; color:white; padding:5px;"><button onclick="runPwdGen()" style="width:100%; background:#22d3ee; color:#04080f; margin-top:5px;">GENERATE</button><input type="text" id="pwOut" readonly style="width:100%; margin-top:5px; background:#04080f; color:#22d3ee;">`, js: `function runPwdGen() { const len = document.getElementById('pwLen').value; const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; let p = ""; for(let i=0; i<len; i++) p += chars.charAt(Math.floor(Math.random() * chars.length)); document.getElementById('pwOut').value = p; }` },
    { id: "base64", name: "Base64 Encoder / Decoder Engine", icon: "fa-code", pro: false, ui: `<h3></> Base64 Engine</h3><input type="text" id="b64In" placeholder="Data..." style="width:100%; background:#0d1321; color:white;"><button onclick="runB64('enc')" style="width:48%; background:#0d9488;">ENCODE</button><button onclick="runB64('dec')" style="width:48%; background:#0d9488;">DECODE</button>`, js: `function runB64(type) { const v = document.getElementById('b64In').value; document.getElementById('b64In').value = (type === 'enc') ? btoa(v) : atob(v); }` },
    { id: "md5-hash", name: "MD5 Data Hash Generator", icon: "fa-hashtag", pro: false, ui: `<h3># MD5 Hash</h3><p style="font-size:12px;">Tool under construction</p>`, js: "" },
    { id: "url-enc", name: "URL Component Encryptor", icon: "fa-link", pro: false, ui: `<h3>🔗 URL Encoder</h3><p style="font-size:12px;">Tool under construction</p>`, js: "" },
    { id: "json-fmt", name: "JSON Structure Formatter", icon: "fa-brackets-curly", pro: false, ui: `<h3>{} JSON Formatter</h3><p style="font-size:12px;">Tool under construction</p>`, js: "" },
    { id: "html-ent", name: "HTML Entity Code Converter", icon: "fa-file-code", pro: false, ui: `<h3>&lt; HTML Entity</h3><p style="font-size:12px;">Tool under construction</p>`, js: "" },
    { id: "color-pick", name: "HEX / RGB Neon Color Picker", icon: "fa-eye-dropper", pro: false, ui: `<h3>🎨 Color Picker</h3><input type="color" id="colorPicker" style="width:100%;">`, js: "" },
    { id: "bin-comp", name: "Binary Code to Text Compiler", icon: "fa-binary", pro: false, ui: `<h3>01 Binary Converter</h3><p style="font-size:12px;">Tool under construction</p>`, js: "" },
    { id: "qr-gen", name: "Custom Graphic QR Code Generator", icon: "fa-qrcode", pro: false, ui: `<h3>🖼️ QR Generator</h3><input type="text" id="qrIn" style="width:100%;"><button onclick="runQR()" style="width:100%;">GENERATE</button>`, js: `function runQR() { alert("QR Code generation logic here"); }` },
    { id: "age-calc", name: "Chronological Age Calculator", icon: "fa-calendar-days", pro: false, ui: `<h3>🎂 Age Calculator</h3><input type="date" id="dob">`, js: "" },
    { id: "word-cnt", name: "Word & Structural Counter", icon: "fa-calculator", pro: false, ui: `<h3>🧮 Word Counter</h3>`, js: "" },
    { id: "regex-test", name: "Regex Pattern Matching Tester", icon: "fa-vial", pro: false, ui: `<h3>🧪 Regex Tester</h3>`, js: "" },
    { id: "md-preview", name: "Live Markdown Preview Renderer", icon: "fa-file-lines", pro: false, ui: `<h3>📝 MD Preview</h3>`, js: "" },
    { id: "user-agent", name: "User-Agent Header Parser", icon: "fa-chrome", pro: false, ui: `<h3>🌐 UA Parser</h3>`, js: "" },
    { id: "text-diff", name: "Text Diff Comparison Engine", icon: "fa-code-compare", pro: false, ui: `<h3>⟿ Diff Tool</h3>`, js: "" },
    { id: "epoch-conv", name: "Unix Epoch Timestamp Converter", icon: "fa-clock", pro: false, ui: `<h3>⏰ Epoch Time</h3>`, js: "" },

    // --- VIP PRO TOOLS ---
    { id: "device-id", name: "VIP Dynamic Device ID Finder", icon: "fa-mobile-vibrate", pro: true, ui: "<h3>🔐 VIP Access Required</h3>", js: "" },
    { id: "ip-track", name: "VIP IP Geolocation Tracker", icon: "fa-earth-asia", pro: true, ui: "<h3>🔐 VIP Access Required</h3>", js: "" },
    { id: "imei-val", name: "VIP IMEI Terminal Validator", icon: "fa-barcode", pro: true, ui: "<h3>🔐 VIP Access Required</h3>", js: "" },
    { id: "port-scan", name: "VIP Advanced System Port Scanner", icon: "fa-terminal", pro: true, ui: "<h3>🔐 VIP Access Required</h3>", js: "" },
    { id: "sub-recon", name: "VIP Subdomain Recon Crawler", icon: "fa-spider", pro: true, ui: "<h3>🔐 VIP Access Required</h3>", js: "" },
    { id: "jwt-debug", name: "VIP JWT Token Debugger System", icon: "fa-bug-slash", pro: true, ui: "<h3>🔐 VIP Access Required</h3>", js: "" },
    { id: "mac-lookup", name: "VIP MAC Address Vendor Lookup", icon: "fa-network-wired", pro: true, ui: "<h3>🔐 VIP Access Required</h3>", js: "" },
    { id: "script-inj", name: "VIP Custom payload Script Injector", icon: "fa-user-secret", pro: true, ui: "<h3>🔐 VIP Access Required</h3>", js: "" }
];
     
