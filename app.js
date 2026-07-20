import { toolNames } from './tools-data.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, doc, setDoc, getDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Firebase Cloud Connection Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCrx59SOp24r64mV435ddI8F55aPEB1UPA",
    authDomain: "azan-toolkit-pro.firebaseapp.com",
    databaseURL: "https://azan-toolkit-pro-default-rtdb.firebaseio.com",
    projectId: "azan-toolkit-pro",
    storageBucket: "azan-toolkit-pro.firebasestorage.app",
    messagingSenderId: "388424834865",
    appId: "1:388424834865:web:b54ee66bf8ac5f988d1a10"
};

// Initialize Modules
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Global App States
let linkCount = 1;
let authMode = "login"; 
let currentUser = null;
let isUserPro = false; // Tracks if current user is VIP PRO

// --- INITIALIZE INTERFACE ---
document.addEventListener("DOMContentLoaded", () => {
    renderToolsCheckboxes();
    setupNavigation();
    setupDynamicLinkListeners();
    setupAuthSystem();
    setupProClickListeners();
});

// Watch Cloud Authentication State
onAuthStateChanged(auth, async (user) => {
    const authOverlay = document.getElementById("authOverlay");
    const mainPlatform = document.getElementById("mainPlatform");
    const userDisplayEmail = document.getElementById("userDisplayEmail");

    if (user) {
        currentUser = user;
        authOverlay.classList.add("hidden");
        mainPlatform.classList.remove("opacity-30", "pointer-events-none");
        
        // Fetch username & PRO status from cloud profile mapping
        if(userDisplayEmail) {
            userDisplayEmail.innerText = `Loading Session...`;
            const q = query(collection(db, "usernames"), where("email", "==", user.email));
            const snap = await getDocs(q);
            if(!snap.empty) {
                const userData = snap.docs[0].data();
                isUserPro = userData.isPro === true; // Check if user has PRO status
                
                // Show badge based on PRO status
                const badge = isUserPro ? "👑 VIP PRO" : "Online";
                userDisplayEmail.innerText = `@${snap.docs[0].id} (${badge})`;
                
                // Trigger UI Unlocker if user is premium
                applyProUnlocking(isUserPro);
            } else {
                userDisplayEmail.innerText = `${user.email}`;
            }
        }
        
        // Live Fetch: Dashboard par saved toolkits load karein
        fetchUserToolkits(user.uid);

    } else {
        currentUser = null;
        isUserPro = false;
        authOverlay.classList.remove("hidden");
        mainPlatform.classList.add("opacity-30", "pointer-events-none");
        
        const container = document.getElementById("savedToolkitsContainer");
        if(container) container.innerHTML = "";
        applyProUnlocking(false); // Reset to locked state on logout
    }
});

// --- DYNAMIC PRO UI UNLOCKER ---
function applyProUnlocking(unlock) {
    // Video aur Download tabs are 100% free. This handles only premium checkboxes logic on dashboard.
    renderToolsCheckboxes(unlock);
}

// --- FETCH AND DISPLAY SAVED TOOLKITS FROM CLOUD ---
async function fetchUserToolkits(userId) {
    const container = document.getElementById("savedToolkitsContainer");
    if (!container) return;
    
    container.innerHTML = `<p class="text-xs text-cyan-500 font-mono animate-pulse">Loading your cloud toolkits...</p>`;
    
    try {
        const q = query(collection(db, "user_toolkits"), where("userId", "==", userId));
        const snap = await getDocs(q);
        
        if (snap.empty) {
            container.innerHTML = `<p class="text-xs text-gray-500 font-mono p-3 bg-[#090e18] rounded-xl border border-gray-900">No saved toolkits found in this session.</p>`;
            return;
        }
        
        container.innerHTML = `<h3 class="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2 font-bold">📂 Your Saved Toolkits</h3>`;
        
        snap.forEach((doc) => {
            const data = doc.data();
            const toolsList = data.selectedTools.length > 0 ? data.selectedTools.join(", ") : "No tools selected";
            
            const card = `
                <div class="bg-[#090e18] p-3.5 rounded-xl border border-cyan-950/40 space-y-2 relative transition hover:border-cyan-800">
                    <div class="flex justify-between items-center">
                        <span class="text-xs font-bold text-gray-200 font-mono">${data.title}</span>
                        <span class="text-[9px] bg-cyan-950/80 text-cyan-400 border border-cyan-900 px-2 py-0.5 rounded font-mono uppercase">${data.theme}</span>
                    </div>
                    <p class="text-[11px] text-gray-400 truncate"><i class="fa-solid fa-cubes text-[10px] text-cyan-600 mr-1"></i> ${toolsList}</p>
                    <div class="text-[8px] text-gray-600 font-mono select-all">Config ID: ${doc.id}</div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', card);
        });
    } catch (error) {
        console.error(error);
        container.innerHTML = `<p class="text-xs text-red-500 font-mono">Failed to fetch security configurations.</p>`;
    }
}

// --- AUTHENTICATION FLOW CONTROLLER (EMAIL + USERNAME HYBRID) ---
function setupAuthSystem() {
    const authForm = document.getElementById("authForm");
    const toggleBtn = document.getElementById("btnToggleAuthMode");
    const authTitle = document.getElementById("authTitle");
    const authSubtitle = document.getElementById("authSubtitle");
    const submitBtn = document.getElementById("btnAuthSubmit");
    const usernameContainer = document.getElementById("usernameFieldContainer");
    const emailLabel = document.getElementById("emailFieldLabel");

    toggleBtn?.addEventListener("click", () => {
        authForm.reset();
        if (authMode === "login") {
            authMode = "signup";
            authTitle.innerText = "CREATE TERMINAL ID";
            authSubtitle.innerText = "Register your profile into AZAN cloud servers";
            submitBtn.innerText = "GENERATE SECURITY ACCOUNT";
            toggleBtn.innerText = "Already have an ID? Authentication Portal";
            usernameContainer.classList.remove("hidden");
            document.getElementById("authUsername").required = true;
            emailLabel.innerText = "Secure Email Address";
        } else {
            authMode = "login";
            authTitle.innerText = "TERMINAL ACCESS LOGIN";
            authSubtitle.innerText = "Provide your credentials to boot AZAN tools gateway";
            submitBtn.innerText = "AUTHENTICATE SECURITY GATEWAY";
            toggleBtn.innerText = "Don't have an account? Create Terminal ID";
            usernameContainer.classList.add("hidden");
            document.getElementById("authUsername").required = false;
            emailLabel.innerText = "Username or Email Address";
        }
    });

    authForm?.addEventListener("submit", async (e) => {
        e.preventDefault();
        const inputField = document.getElementById("authEmail").value.trim().toLowerCase();
        const password = document.getElementById("authPassword").value;

        try {
            if (authMode === "signup") {
                const username = document.getElementById("authUsername").value.trim().toLowerCase();
                const email = inputField;

                if(!/^[a-zA-Z0-9_]{3,15}$/.test(username)) {
                    return alert("Username must be 3-15 chars (letters, numbers, underscore only).");
                }

                const nameRef = doc(db, "usernames", username);
                const nameSnap = await getDoc(nameRef);
                if (nameSnap.exists()) {
                    return alert("This username is already claimed! Choose another.");
                }

                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                
                await setDoc(doc(db, "usernames", username), {
                    email: email,
                    uid: userCredential.user.uid,
                    isPro: false // Default signup accounts are non-premium
                });

                alert("Terminal Profile Registered Successfully!");
            } 
            else {
                let targetEmail = inputField;

                if (!inputField.includes("@")) {
                    const nameRef = doc(db, "usernames", inputField);
                    const nameSnap = await getDoc(nameRef);
                    
                    if (!nameSnap.exists()) {
                        return alert("Username does not exist in security databases!");
                    }
                    targetEmail = nameSnap.data().email;
                }

                await signInWithEmailAndPassword(auth, targetEmail, password);
                alert("Gateway Access Granted!");
            }
            authForm.reset();
        } catch (error) {
            console.error(error);
            alert(`Authentication Rejected: ${error.message}`);
        }
    });

    document.getElementById("btnLogout")?.addEventListener("click", () => {
        signOut(auth).then(() => alert("Terminal Session Disconnected."));
    });
}

// Render Tools checkboxes (Updated to take isPro state)
function renderToolsCheckboxes(hasProAccess = false) {
    const container = document.getElementById("toolsCheckboxContainer");
    if (!container) return;
    
    container.innerHTML = ""; // Clear existing first

    toolNames.forEach((tool, idx) => {
        const isPro = tool.pro;
        const styleClass = isPro ? 'border-yellow-600/30 bg-yellow-950/5 text-yellow-500 font-bold' : 'border-gray-900 bg-[#090e18] text-gray-300';
        const badge = isPro ? '<span class="text-[9px] bg-yellow-950 border border-yellow-700/50 text-yellow-400 px-1.5 py-0.5 rounded font-black">PRO 👑</span>' : '<span class="text-[8px] bg-cyan-950/60 border border-cyan-900/60 text-cyan-400 px-1.5 py-0.5 rounded font-mono">FREE</span>';
        
        // Disable PRO tools if user does not have premium status
        const isDisabled = isPro && !hasProAccess;

        const row = `
            <label class="flex items-center justify-between p-3 rounded-xl border ${styleClass} transition hover:border-gray-700 ${isDisabled ? 'opacity-60' : ''}">
                <div class="flex items-center space-x-2 truncate">
                    <span class="text-xs font-mono text-gray-500">${String(idx + 1).padStart(2, '0')}</span>
                    <i class="fa-solid ${tool.icon} text-xs mx-1"></i>
                    <span class="text-xs tracking-wide truncate">${tool.name}</span>
                </div>
                <div class="flex items-center space-x-2">
                    ${badge}
                    <input type="checkbox" value="${tool.id}" ${isDisabled ? 'disabled' : ''} class="tool-checkbox accent-cyan-400 h-4 w-4 cursor-pointer rounded">
                </div>
            </label>
        `;
        container.insertAdjacentHTML('beforeend', row);
    });
}

// Tab Router Switcher Layout Control
function setupNavigation() {
    const navButtons = document.querySelectorAll(".nav-btn");
    navButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const tabId = btn.id.replace("nav-", "");
            document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
            document.getElementById(`tab-${tabId}`).classList.add("active");
            
            navButtons.forEach(b => b.className = "nav-btn flex flex-col items-center space-y-1 text-gray-500 focus:outline-none");
            btn.className = tabId === 'pro' 
                ? "nav-btn flex flex-col items-center space-y-1 text-yellow-400 font-bold scale-105 transition" 
                : "nav-btn flex flex-col items-center space-y-1 text-cyan-400 font-bold scale-105 transition";
        });
    });

    const menuBtn = document.getElementById("menuBtn");
    const topMenu = document.getElementById("topMenu");
    menuBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        topMenu?.classList.toggle("hidden");
    });
    window.addEventListener("click", () => topMenu?.classList.add("hidden"));
}

// Unlimited Input Row Builders logic & Premium 100% Working 3x3 Grid Compiler
function setupDynamicLinkListeners() {
    const addBtn = document.getElementById("btnAddMoreLinks");
    const container = document.getElementById("dynamicLinksContainer");

    addBtn?.addEventListener("click", () => {
        linkCount++;
        const rowId = `link_row_${linkCount}`;
        const markup = `
            <div class="bg-[#090e18] p-3 rounded-xl border border-gray-900 space-y-2 relative transition duration-300" id="${rowId}">
                <div class="flex justify-between items-center">
                    <span class="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest">Resource Link #${linkCount}</span>
                    <button type="button" class="btn-delete-row text-red-500 hover:text-red-400 text-xs font-bold px-1 focus:outline-none cursor-pointer">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
                <input type="text" placeholder="Tool Display Name" class="link-name w-full bg-[#0d1321] border border-cyan-950 rounded-xl p-2.5 text-xs focus:outline-none">
                <input type="url" placeholder="Target Link URL (https://...)" class="link-url w-full bg-[#0d1321] border border-cyan-950 rounded-xl p-2.5 text-xs focus:outline-none font-mono text-cyan-500">
            </div>
        `;
        container?.insertAdjacentHTML('beforeend', markup);
    });

    container?.addEventListener("click", (e) => {
        const deleteBtn = e.target.closest(".btn-delete-row");
        if (deleteBtn) {
            deleteBtn.closest(".bg-\\[\\#090e18\\]").remove();
        }
    });

    // --- PREMIUM GRID COMPILER LOGIC ---
    document.getElementById("btnPublishToolkit")?.addEventListener("click", async () => {
        if (!currentUser) return alert("Session expired. Please re-authenticate.");
        
        const title = document.getElementById("toolkitTitle").value.trim();
        const theme = document.getElementById("toolkitTheme").value;
        const selectedTools = [];
        
        document.querySelectorAll(".tool-checkbox:checked").forEach(cb => {
            selectedTools.push(cb.value);
        });

        if(!title) return alert("Please enter a Toolkit Title Name!");
        if(selectedTools.length === 0) return alert("Kam az kam aik tool select karein!");

        try {
            // 1. Save reference metadata payload to Firestore
            const docRef = await addDoc(collection(db, "user_toolkits"), {
                userId: currentUser.uid, 
                userEmail: currentUser.email,
                title: title,
                theme: theme,
                selectedTools: selectedTools,
                createdAt: new Date()
            });

            // Theme configurations mapping matching user options
            let themeClass = "theme-cyan";
            if (theme === "yellow") themeClass = "theme-yellow";
            if (theme === "ruby") themeClass = "theme-ruby";

            // 2. Generate Professional Cards and injected executable logic scripts
            let dashboardCardsHTML = "";
            let modalViewsHTML = "";
            let coreExecutableJS = "";

            selectedTools.forEach((toolId) => {
                const toolMeta = toolNames.find(t => t.id === toolId);
                if(toolMeta) {
                    // Premium Card rendering layout optimized for beautiful 3x3 Grid cards
                    dashboardCardsHTML += `
            <!-- Card: ${toolMeta.name} -->
            <div class="premium-card" onclick="openToolModal('${toolId}')">
                <div class="card-glow"></div>
                <div class="icon-sphere">
                    <i class="fa-solid ${toolMeta.icon}"></i>
                </div>
                <h3 class="card-title">${toolMeta.name}</h3>
                <button class="glowing-launch-btn">LAUNCH ENGINE</button>
            </div>\n`;

                    // Generate full-screen/modal interactive container
                    modalViewsHTML += `
            <!-- Modal Portal for ${toolId} -->
            <div id="modal_${toolId}" class="modal-portal">
                <div class="modal-card">
                    <span class="dismiss-portal-btn" onclick="closeToolModal('${toolId}')">&times;</span>
                    ${toolMeta.ui}
                </div>
            </div>\n`;

                    // Inject specific runtime algorithms safely
                    coreExecutableJS += `\n// --- ${toolId} Controller Script ---\n${toolMeta.js}\n`;
                }
            });

            // 3. Complete High-fidelity Cyber-Neon 3x3 Dashboard template
            const compiledApplicationHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <!-- Google Fonts & FontAwesome -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&family=Rajdhani:wght@600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <style>
        /* Cyberpunk Design Tokens */
        :root {
            --bg-deep: #030712;
            --bg-glass: rgba(10, 15, 30, 0.7);
            --bg-card: rgba(13, 20, 38, 0.5);
            --border-glow: rgba(34, 211, 238, 0.15);
            
            /* Theme Defaults: Cyan Cyberpunk */
            --primary: #22d3ee;
            --primary-glow: rgba(34, 211, 238, 0.35);
            --secondary: #0891b2;
            --accent: #eab308;
        }

        /* Yellow Theme Injection Overrides */
        .theme-yellow {
            --primary: #facc15;
            --primary-glow: rgba(250, 204, 21, 0.35);
            --secondary: #ca8a04;
            --border-glow: rgba(250, 204, 21, 0.15);
        }

        /* Ruby Dragon Overrides */
        .theme-ruby {
            --primary: #ef4444;
            --primary-glow: rgba(239, 68, 68, 0.35);
            --secondary: #b91c1c;
            --border-glow: rgba(239, 68, 68, 0.15);
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            background-color: var(--bg-deep);
            background-image: radial-gradient(circle at 50% 50%, rgba(13, 20, 38, 0.6) 0%, transparent 100%);
            color: #f3f4f6;
            font-family: 'Plus Jakarta Sans', sans-serif;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 40px 20px;
        }

        /* Highly Premium Wide Core Dashboard */
        .dashboard-canvas {
            width: 100%;
            max-width: 1024px;
            background: var(--bg-glass);
            backdrop-filter: blur(20px);
            border: 1px solid var(--border-glow);
            box-shadow: 0 0 60px rgba(3, 7, 18, 0.8), 0 0 30px var(--primary-glow);
            border-radius: 32px;
            padding: 50px 40px;
     position: relative;
            overflow: hidden;
        }

        .dashboard-canvas::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: linear-gradient(90deg, transparent, var(--primary), transparent);
        }

        /* Sleek Cyber Headers */
        header {
            text-align: center;
            margin-bottom: 45px;
        }

        h1 {
            font-family: 'Rajdhani', sans-serif;
            color: var(--primary);
            font-size: 36px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 2px;
            text-shadow: 0 0 20px var(--primary-glow);
            line-height: 1.1;
        }

        .system-badge {
            display: inline-block;
            text-align: center;
            color: var(--accent);
            font-size: 11px;
            font-weight: 800;
            letter-spacing: 3px;
            text-transform: uppercase;
            margin-top: 8px;
            border: 1px solid rgba(234, 179, 8, 0.2);
            padding: 4px 14px;
            border-radius: 50px;
            background: rgba(234, 179, 8, 0.05);
        }

        /* Gorgeous Premium 3x3 Dynamic Grid Layout */
        .tools-3x3-grid {
            display: grid;
            grid-template-columns: repeat(1, minmax(0, 1fr));
            gap: 24px;
        }

        @media (min-width: 640px) {
            .tools-3x3-grid {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }
        }

        @media (min-width: 1024px) {
            .tools-3x3-grid {
                grid-template-columns: repeat(3, minmax(0, 1fr)); /* The highly requested desktop 3x3 grid! */
            }
        }

        /* Cyberpunk Card Matrix Elements */
        .premium-card {
            background: var(--bg-card);
            border: 1px solid rgba(255, 255, 255, 0.04);
            border-radius: 20px;
            padding: 30px 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            position: relative;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
            overflow: hidden;
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
        }

        .premium-card:hover {
            transform: translateY(-8px);
            border-color: var(--primary);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4), 0 0 20px var(--primary-glow);
        }

        /* Animated Hover Ring effects */
        .card-glow {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at 50% 10%, var(--primary-glow) 0%, transparent 70%);
            opacity: 0;
            transition: opacity 0.4s;
            pointer-events: none;
        }

        .premium-card:hover .card-glow {
            opacity: 1;
        }

        /* Ambient Icon Sphere glows */
        .icon-sphere {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.05);
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--primary);
            font-size: 22px;
            margin-bottom: 20px;
            transition: all 0.4s;
            text-shadow: 0 0 10px var(--primary-glow);
        }

        .premium-card:hover .icon-sphere {
            background: var(--primary-glow);
            border-color: var(--primary);
            transform: scale(1.1);
        }

        .card-title {
            font-size: 15px;
            font-weight: 700;
            color: #e5e7eb;
            margin-bottom: 24px;
            line-height: 1.4;
            min-height: 44px; /* Ensures dynamic vertically consistent layout alignment */
            display: flex;
            align-items: center;
            justify-content: center;
        }

        /* Cyberpunk Launch Button */
        .glowing-launch-btn {
            width: 100%;
            background: linear-gradient(135deg, var(--secondary) 0%, #111827 100%);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.05);
            padding: 11px;
            border-radius: 12px;
            font-weight: 700;
            font-size: 11px;
            letter-spacing: 1.5px;
            cursor: pointer;
            transition: all 0.3s;
            text-transform: uppercase;
        }

        .premium-card:hover .glowing-launch-btn {
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
            box-shadow: 0 4px 15px var(--primary-glow);
            border-color: transparent;
        }

        /* Full Screen Modal Portal Window Layers */
        .modal-portal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(3, 7, 18, 0.9);
            backdrop-filter: blur(8px);
            justify-content: center;
            align-items: center;
            z-index: 1000;
            padding: 20px;
        }

        .modal-card {
            background: #090e18;
            border: 1px solid var(--primary);
            width: 100%;
            max-width: 420px;
            padding: 30px;
            border-radius: 24px;
            position: relative;
            box-shadow: 0 0 40px var(--primary-glow);
            animation: modalRise 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @keyframes modalRise {
            from { transform: translateY(30px) scale(0.95); opacity: 0; }
            to { transform: translateY(0) scale(1); opacity: 1; }
        }

        .dismiss-portal-btn {
            position: absolute;
            top: 14px;
            right: 20px;
            color: #6b7280;
            font-size: 24px;
            font-weight: bold;
            cursor: pointer;
            transition: color 0.2s;
        }

        .dismiss-portal-btn:hover {
            color: #ef4444;
        }

        /* Generic modal styling components */
        .modal-card h3 {
            color: var(--primary);
            font-size: 17px;
            margin-bottom: 20px;
            text-transform: uppercase;
            font-weight: 700;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            padding-bottom: 10px;
            font-family: 'Rajdhani', sans-serif;
            letter-spacing: 0.5px;
        }
    </style>
</head>
<body class="${themeClass}">

    <div class="dashboard-canvas">
        <header>
            <h1>${title}</h1>
            <div class="system-badge">POWERED BY AZAN TECH LAB</div>
        </header>
        
        <div class="tools-3x3-grid">
            ${dashboardCardsHTML}
        </div>
    </div>

    ${modalViewsHTML}

    <script>
        // Modal State Managers
        function openToolModal(toolId) {
            document.getElementById('modal_' + toolId).style.display = 'flex';
        }
        function closeToolModal(toolId) {
            document.getElementById('modal_' + toolId).style.display = 'none';
        }
        
        // Background overlay click handler
        window.onclick = function(event) {
            if (event.target.classList.contains('modal-portal')) {
                event.target.style.display = 'none';
            }
        }

        ${coreExecutableJS}
    </script>
</body>
</html>`;

            // 4. Blob File Compilation & Local Client Trigger
            const blob = new Blob([compiledApplicationHTML], { type: "text/html" });
            const dynamicTrigger = document.createElement("a");
            dynamicTrigger.href = URL.createObjectURL(blob);
            
            const compiledName = title.toLowerCase().replace(/\s+/g, '_') + "_dashboard.html";
            dynamicTrigger.download = compiledName;
            
            document.body.appendChild(dynamicTrigger);
            dynamicTrigger.click();
            document.body.removeChild(dynamicTrigger);

            alert(`🔥 System Success: 100% working premium toolkit compiled!\nDownloaded local standalone file: ${compiledName}`);
            
            // Instantly refresh list on developer panel
            fetchUserToolkits(currentUser.uid);
        } catch (e) {
            console.error(e);
            alert("SaaS Module Compilator Engine Failed.");
        }
    });
}

// --- VIP PRO PACKAGE CLICK HANDLERS ---
function setupProClickListeners() {
    const proButtons = document.querySelectorAll("#tab-pro button");
    
    proButtons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            let planName = "";
            let price = "";
            
            if (index === 0) { planName = "1 Month Core"; price = "Rs. 300"; }
            else if (index === 1) { planName = "3 Month Cyber Stack"; price = "Rs. 1000"; }
            else if (index === 2) { planName = "1 Year Ultimate Dev"; price = "Rs. 3000"; }
            
            // Custom instructions modal for payment setup
            alert(`📢 AZAN TECH LAB - VIP UPGRADE\n\nPlan: ${planName}\nPrice: ${price}\n\nTo activate, please contact Admin (Azan Ali) via WhatsApp/Telegram to send payment, and provide your Username to get instantly upgraded!`);
        });
    });
}
```eof

Your updated configuration engine script for the toolkit builder is fully updated! The generated local HTML files will now launch into an incredibly beautiful, modern desktop 3x3 layout with clean alignment, interactive icon spheres, and glowing hover animations. Let me know how it looks on your device!
