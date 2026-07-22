// --- 1. TOOL DATA IMPORTS ---
import { freeTools } from './free-tools.js';
import { premiumTools } from './premium-tools.js';
import { hackingTools } from './hacking-tools.js';

// --- 2. ALL 10 TEMPLATES IMPORTS ---
import { generateTemplate1 } from './template1.js';
import { generateTemplate2 } from './template2.js';
import { generateTemplate3 } from './template3.js';
import { generateTemplate4 } from './template4.js';
import { generateTemplate5 } from './template5.js';
import { generateTemplate6 } from './template6.js';
import { generateTemplate7 } from './template7.js';
import { generateTemplate8 } from './template8.js';
import { generateTemplate9 } from './template9.js';
import { generateTemplate10 } from './template10.js';

// --- 3. FIREBASE MODULES ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, doc, setDoc, getDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCrx59SOp24r64mV435ddI8F55aPEB1UPA",
    authDomain: "azan-toolkit-pro.firebaseapp.com",
    databaseURL: "https://azan-toolkit-pro-default-rtdb.firebaseio.com",
    projectId: "azan-toolkit-pro",
    storageBucket: "azan-toolkit-pro.firebasestorage.app",
    messagingSenderId: "388424834865",
    appId: "1:388424834865:web:b54ee66bf8ac5f988d1a10"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Global Application States
let linkCount = 1;
let authMode = "login"; 
let currentUser = null;
let isUserPro = false;
let activeToolCategory = "free";

// Secret VIP Keys
const SECRET_VIP_KEYS = ["AZAN_PRO_2026_VIP", "AZAN_VIP_UNLOCK_99", "AZAN_SECRET_KEY_PRO"];

// Template Registry Dynamic Mapping
const templateRegistry = {
    'free_tpl_1': generateTemplate1,
    'free_tpl_2': generateTemplate2,
    'free_tpl_3': generateTemplate3,
    'free_tpl_4': generateTemplate4,
    'free_tpl_5': generateTemplate5,
    'free_tpl_6': generateTemplate6,
    'free_tpl_7': generateTemplate7,
    'free_tpl_8': generateTemplate8,
    'free_tpl_9': generateTemplate9,
    'free_tpl_10': generateTemplate10,
    'pro_tpl_1': generateTemplate5,
    'pro_tpl_2': generateTemplate9,
    'pro_tpl_3': generateTemplate8,
    'pro_tpl_4': generateTemplate4,
    'pro_tpl_5': generateTemplate2,
    'pro_tpl_6': generateTemplate1,
    'pro_tpl_7': generateTemplate7,
    'pro_tpl_8': generateTemplate6,
    'pro_tpl_9': generateTemplate3,
    'pro_tpl_10': generateTemplate10
};

// --- DOM CONTENT LOADED ---
document.addEventListener("DOMContentLoaded", () => {
    setupTemplatesDropdown("free");
    renderToolsCheckboxes("free", false);
    setupNavigation();
    setupDynamicLinkListeners();
    setupAuthSystem();
    setupProKeyAndWhatsApp();
    setupCategoryTabs();
    setupPublishToolkit();
});

// --- AUTH STATE MONITOR ---
onAuthStateChanged(auth, async (user) => {
    const authOverlay = document.getElementById("authOverlay");
    const mainPlatform = document.getElementById("mainPlatform");
    const userDisplayEmail = document.getElementById("userDisplayEmail");

    if (user) {
        currentUser = user;
        authOverlay?.classList.add("hidden");
        mainPlatform?.classList.remove("opacity-30", "pointer-events-none");
        
        if (userDisplayEmail) {
            userDisplayEmail.innerText = `Loading Session...`;
            const q = query(collection(db, "usernames"), where("email", "==", user.email));
            const snap = await getDocs(q);
            if (!snap.empty) {
                const userData = snap.docs[0].data();
                isUserPro = userData.isPro === true;
                userDisplayEmail.innerText = `@${snap.docs[0].id} (${isUserPro ? '👑 VIP PRO' : 'Online'})`;
            } else {
                userDisplayEmail.innerText = `${user.email}`;
            }
        }
        renderToolsCheckboxes(activeToolCategory, isUserPro);
        fetchUserToolkits(user.uid);

    } else {
        currentUser = null;
        isUserPro = false;
        authOverlay?.classList.remove("hidden");
        mainPlatform?.classList.add("opacity-30", "pointer-events-none");
        
        const container = document.getElementById("savedToolkitsContainer");
        if (container) container.innerHTML = "";
    }
});

// --- FETCH SAVED USER TOOLKITS FROM FIRESTORE ---
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
            const toolsList = data.tools && data.tools.length > 0 ? data.tools.join(", ") : "No tools selected";
            
            const card = `
                <div class="bg-[#090e18] p-3.5 rounded-xl border border-cyan-950/40 space-y-2 relative transition hover:border-cyan-800">
                    <div class="flex justify-between items-center">
                        <span class="text-xs font-bold text-gray-200 font-mono">${data.title}</span>
                        <span class="text-[9px] bg-cyan-950/80 text-cyan-400 border border-cyan-900 px-2 py-0.5 rounded font-mono uppercase">${data.theme || 'default'}</span>
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

// --- TEMPLATES DROPDOWN SETUP ---
function setupTemplatesDropdown(mode = "free") {
    const selector = document.getElementById("templateSelector");
    if (!selector) return;
    
    selector.innerHTML = "";
    if (mode === "free") {
        for (let i = 1; i <= 10; i++) {
            selector.innerHTML += `<option value="free_tpl_${i}">Free Template ${i}: Cyber Layout ${i}</option>`;
        }
    } else {
        for (let i = 1; i <= 10; i++) {
            selector.innerHTML += `<option value="pro_tpl_${i}">PRO Template ${i} (VIP 👑)</option>`;
        }
    }
}

// --- CATEGORY TABS SETUP ---
function setupCategoryTabs() {
    document.getElementById("btnSelectFreeTemplates")?.addEventListener("click", () => setupTemplatesDropdown("free"));
    document.getElementById("btnSelectProTemplates")?.addEventListener("click", () => {
        if (!isUserPro) return alert("🔒 Pro Templates unlock karne ke liye Pro key enter karein!");
        setupTemplatesDropdown("pro");
    });

    document.getElementById("tabFreeTools")?.addEventListener("click", () => switchToolCategory("free"));
    document.getElementById("tabProTools")?.addEventListener("click", () => switchToolCategory("pro"));
    document.getElementById("tabHackingTools")?.addEventListener("click", () => switchToolCategory("hacking"));
}

function switchToolCategory(cat) {
    activeToolCategory = cat;
    renderToolsCheckboxes(cat, isUserPro);
}

// --- RENDER TOOLS CHECKBOXES ---
function renderToolsCheckboxes(category = "free", hasProAccess = false) {
    const container = document.getElementById("toolsCheckboxContainer");
    if (!container) return;
    container.innerHTML = "";

    let toolsList = freeTools;
    if (category === "pro") toolsList = premiumTools;
    if (category === "hacking") toolsList = hackingTools;

    toolsList.forEach((tool, idx) => {
        const isProTool = category !== "free";
        const isDisabled = isProTool && !hasProAccess;

        const row = `
            <label class="flex items-center justify-between p-3 rounded-xl border border-gray-900 bg-[#090e18] transition hover:border-gray-700 ${isDisabled ? 'opacity-50' : ''}">
                <div class="flex items-center space-x-2 truncate">
                    <span class="text-xs font-mono text-gray-500">${String(idx + 1).padStart(2, '0')}</span>
                    <i class="fa-solid ${tool.icon} text-xs mx-1"></i>
                    <span class="text-xs tracking-wide truncate">${tool.name}</span>
                </div>
                <input type="checkbox" value="${tool.id}" ${isDisabled ? 'disabled' : ''} class="tool-checkbox accent-cyan-400 h-4 w-4 cursor-pointer rounded">
            </label>
        `;
        container.insertAdjacentHTML('beforeend', row);
    });
}

// --- PUBLISH & DOWNLOAD TOOLKIT LOGIC ---
function setupPublishToolkit() {
    const btnPublish = document.getElementById("btnPublishToolkit");
    btnPublish?.addEventListener("click", async () => {
        const title = document.getElementById("toolkitTitle")?.value.trim() || "My AZAN Toolkit";
        const theme = document.getElementById("toolkitTheme")?.value || "cyan";
        const templateId = document.getElementById("templateSelector")?.value || "free_tpl_1";

        const checkboxes = document.querySelectorAll(".tool-checkbox:checked");
        const selectedIds = Array.from(checkboxes).map(cb => cb.value);

        if (selectedIds.length === 0) {
            return alert("⚠️ Kam se kam 1 Tool zaroor select karein!");
        }

        const allToolsList = [...freeTools, ...premiumTools, ...hackingTools];
        const selectedTools = allToolsList.filter(t => selectedIds.includes(t.id));

        const generatorFn = templateRegistry[templateId] || generateTemplate1;
        const generatedHTML = generatorFn(title, selectedTools, theme);

        try {
            // 1. Save to Firestore
            if (currentUser) {
                await addDoc(collection(db, "user_toolkits"), {
                    userId: currentUser.uid,
                    title,
                    theme,
                    templateId,
                    tools: selectedIds,
                    createdAt: new Date()
                });
            }

            // 2. Download Standalone Local HTML File
            const blob = new Blob([generatedHTML], { type: "text/html" });
            const dynamicTrigger = document.createElement("a");
            dynamicTrigger.href = URL.createObjectURL(blob);
            
            const compiledName = title.toLowerCase().replace(/\s+/g, '_') + "_dashboard.html";
            dynamicTrigger.download = compiledName;
            
            document.body.appendChild(dynamicTrigger);
            dynamicTrigger.click();
            document.body.removeChild(dynamicTrigger);

            alert(`✅ "${title}" Toolkit successfully create aur download ho gayi hai!`);
            
            if (currentUser) fetchUserToolkits(currentUser.uid);
        } catch (error) {
            console.error("Save Error:", error);
            alert("Error publishing toolkit: " + error.message);
        }
    });
}

// --- LINKS MAKER HTML GENERATOR FUNCTION ---
function createLinksLandingPageHTML(title, linksData) {
    let linksButtonsHTML = "";
    
    linksData.forEach(item => {
        linksButtonsHTML += `
            <a href="${item.url}" target="_blank" class="link-btn">
                <span>${item.name}</span>
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>\n`;
    });

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', sans-serif; }
        body {
            background: #04080f;
            color: #ffffff;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 40px 20px;
        }
        .container {
            width: 100%;
            max-width: 480px;
            text-align: center;
        }
        .brand-badge {
            background: rgba(6, 182, 212, 0.1);
            border: 1px solid #06b6d4;
            color: #22d3ee;
            font-size: 10px;
            font-weight: bold;
            letter-spacing: 2px;
            padding: 4px 12px;
            border-radius: 20px;
            text-transform: uppercase;
            display: inline-block;
            margin-bottom: 15px;
        }
        h1 {
            font-size: 24px;
            font-weight: 800;
            color: #ffffff;
            margin-bottom: 30px;
            text-shadow: 0 0 15px rgba(34, 211, 238, 0.5);
        }
        .links-stack {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }
        .link-btn {
            background: linear-gradient(135deg, rgba(13, 19, 33, 0.9) 0%, rgba(9, 14, 24, 0.9) 100%);
            border: 1px solid rgba(6, 182, 212, 0.3);
            border-radius: 14px;
            padding: 16px 20px;
            color: #f3f4f6;
            text-decoration: none;
            font-weight: 700;
            font-size: 14px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }
        .link-btn:hover {
            border-color: #22d3ee;
            transform: translateY(-3px);
            box-shadow: 0 0 20px rgba(34, 211, 238, 0.4);
            color: #22d3ee;
        }
        footer {
            margin-top: 40px;
            font-size: 11px;
            color: #64748b;
            font-weight: 600;
            letter-spacing: 1px;
        }
    </style>
</head>
<body>
    <div class="container">
        <span class="brand-badge">POWERED BY AZAN TECH LAB</span>
        <h1>${title}</h1>
        <div class="links-stack">
            ${linksButtonsHTML}
        </div>
        <footer>© AZAN BRAND ALL RIGHTS RESERVED</footer>
    </div>
</body>
</html>`;
}

// --- DYNAMIC LINKS & LINKS MAKER LISTENER ---
function setupDynamicLinkListeners() {
    const addBtn = document.getElementById("btnAddMoreLinks");
    const container = document.getElementById("dynamicLinksContainer");

    addBtn?.addEventListener("click", () => {
        linkCount++;
        const markup = `
            <div class="bg-[#090e18] p-3 rounded-xl border border-gray-900 space-y-2 relative link-row">
                <div class="flex justify-between items-center">
                    <span class="text-[10px] font-mono font-bold text-cyan-400 uppercase">Resource Link #${linkCount}</span>
                    <button type="button" class="btn-delete-row text-red-500 hover:text-red-400 text-xs font-bold cursor-pointer">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
                <input type="text" placeholder="Tool Display Name" class="link-name w-full bg-[#0d1321] border border-cyan-950 rounded-xl p-2.5 text-xs focus:outline-none">
                <input type="url" placeholder="Target Link URL (https://...)" class="link-url w-full bg-[#0d1321] border border-cyan-950 rounded-xl p-2.5 text-xs focus:outline-none font-mono text-cyan-500">
                <div class="grid grid-cols-2 gap-2 pt-1">
                    <select class="link-icon-select bg-[#0d1321] border border-cyan-950 rounded-xl p-2 text-xs text-gray-300">
                        <option value="fa-arrow-up-right-from-square">Default Arrow</option>
                        <option value="fa-globe">Globe / Web</option>
                        <option value="fa-terminal">Terminal</option>
                        <option value="fa-shield-halved">Shield</option>
                        <option value="fa-bolt">Lightning</option>
                    </select>
                    <input type="file" accept="image/*" class="link-custom-icon bg-[#0d1321] border border-cyan-950 rounded-xl p-1 text-[10px] text-gray-400">
                </div>
            </div>
        `;
        container?.insertAdjacentHTML('beforeend', markup);
    });

    container?.addEventListener("click", (e) => {
        const deleteBtn = e.target.closest(".btn-delete-row");
        if (deleteBtn) deleteBtn.closest(".link-row")?.remove();
    });

    // Links Publisher Button Event Handler
    document.addEventListener("click", (e) => {
        const target = e.target.closest("button");
        if (target && target.innerText && target.innerText.includes("PUBLISH LIVE UNDER AZAN BRAND")) {
            e.preventDefault();
            
            const pageTitleInput = document.querySelector("#tab-links_maker input[type='text']") || document.getElementById("linksPageTitle");
            const pageTitle = pageTitleInput?.value.trim() || "AZAN LAB LINKS";

            const linkRows = document.querySelectorAll("#tab-links_maker .link-row, #dynamicLinksContainer > div");
            const linksData = [];

            linkRows.forEach((row) => {
                const name = row.querySelector(".link-name")?.value.trim() || row.querySelector("input[placeholder*='Display']")?.value.trim();
                const url = row.querySelector(".link-url")?.value.trim() || row.querySelector("input[placeholder*='URL']")?.value.trim();
                if (name && url) linksData.push({ name, url });
            });

            if (linksData.length === 0) {
                return alert("⚠️ Kam az kam 1 Link Name aur Target URL fill karein!");
            }

            const linksPageHTML = createLinksLandingPageHTML(pageTitle, linksData);

            const blob = new Blob([linksPageHTML], { type: "text/html" });
            const trigger = document.createElement("a");
            trigger.href = URL.createObjectURL(blob);
            
            const fileName = pageTitle.toLowerCase().replace(/\s+/g, "_") + "_links.html";
            trigger.download = fileName;
            
            document.body.appendChild(trigger);
            trigger.click();
            document.body.removeChild(trigger);

            alert(`🔥 LINKS PAGE GENERATED SUCCESSFULLY!\nDownloaded file: ${fileName}`);
        }
    });
}

// --- PRO ACTIVATION & WHATSAPP LOGIC ---
function setupProKeyAndWhatsApp() {
    document.getElementById("btnActivateProKey")?.addEventListener("click", async () => {
        const keyInput = document.getElementById("proSecretKeyInput")?.value.trim();
        if (SECRET_VIP_KEYS.includes(keyInput)) {
            isUserPro = true;
            alert("🔥 PRO UNLOCKED SUCCESSFULLY! All Templates & Tools are now active.");
            renderToolsCheckboxes(activeToolCategory, true);
        } else {
            alert("❌ Invalid Secret VIP Key! Please buy a key from Admin via WhatsApp.");
        }
    });

    document.querySelectorAll(".btn-buy-wa").forEach(btn => {
        btn.addEventListener("click", () => {
            const plan = btn.getAttribute("data-plan");
    const price = btn.getAttribute("data-price");
            const waNumber = "923138317139";
            const text = encodeURIComponent(`Assalam-o-Alaikum Admin! Mujhe AZAN Toolkit Generator ka PRO Package buy karna hai.\nPlan: ${plan}\nPrice: ${price}\nKINDLY SEND PAYMENT DETAILS.`);
            window.open(`https://wa.me/${waNumber}?text=${text}`, "_blank");
        });
    });
}

// --- NAVIGATION & TOP MENU LOGIC ---
function setupNavigation() {
    const navButtons = document.querySelectorAll(".nav-btn");
    navButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const tabId = btn.id.replace("nav-", "");
            document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
            document.getElementById(`tab-${tabId}`)?.classList.add("active");
            
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

// --- COMPLETE AUTHENTICATION SYSTEM ---
function setupAuthSystem() {
    const authForm = document.getElementById("authForm");
    const toggleBtn = document.getElementById("btnToggleAuthMode");
    const authTitle = document.getElementById("authTitle");
    const authSubtitle = document.getElementById("authSubtitle");
    const submitBtn = document.getElementById("btnAuthSubmit");
    const usernameContainer = document.getElementById("usernameFieldContainer");
    const emailLabel = document.getElementById("emailFieldLabel");

    toggleBtn?.addEventListener("click", () => {
        authForm?.reset();
        if (authMode === "login") {
            authMode = "signup";
            if(authTitle) authTitle.innerText = "CREATE TERMINAL ID";
            if(authSubtitle) authSubtitle.innerText = "Register your profile into AZAN cloud servers";
            if(submitBtn) submitBtn.innerText = "GENERATE SECURITY ACCOUNT";
            if(toggleBtn) toggleBtn.innerText = "Already have an ID? Authentication Portal";
            usernameContainer?.classList.remove("hidden");
            const authUsername = document.getElementById("authUsername");
            if(authUsername) authUsername.required = true;
            if(emailLabel) emailLabel.innerText = "Secure Email Address";
        } else {
            authMode = "login";
            if(authTitle) authTitle.innerText = "TERMINAL ACCESS LOGIN";
            if(authSubtitle) authSubtitle.innerText = "Provide your credentials to boot AZAN tools gateway";
            if(submitBtn) submitBtn.innerText = "AUTHENTICATE SECURITY GATEWAY";
            if(toggleBtn) toggleBtn.innerText = "Don't have an account? Create Terminal ID";
            usernameContainer?.classList.add("hidden");
            const authUsername = document.getElementById("authUsername");
            if(authUsername) authUsername.required = false;
            if(emailLabel) emailLabel.innerText = "Username or Email Address";
        }
    });

    authForm?.addEventListener("submit", async (e) => {
        e.preventDefault();
        const inputField = document.getElementById("authEmail")?.value.trim().toLowerCase();
        const password = document.getElementById("authPassword")?.value;

        try {
            if (authMode === "signup") {
                const username = document.getElementById("authUsername")?.value.trim().toLowerCase();
                const email = inputField;

                if (!/^[a-zA-Z0-9_]{3,15}$/.test(username)) {
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
                    isPro: false
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
