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
    // Video aur Download tabs ab sab ke liye 100% FREE hain, unka restriction logic yahan se uda diya hai!
    // Yeh function ab sirf Engine Configuration ke premium PRO checkboxes ko handle karega.
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
                    isPro: false // By default naya user free hoga
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
        
        // Agar tool PRO hai aur user ke paas PRO access NAI hai, toh disabled rakhein. Warna unlock kar dein.
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

// Unlimited Input Row Builders logic
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

    // --- SAVE TOOLKIT CONFIG TO USER UID ACCOUNT ---
    document.getElementById("btnPublishToolkit")?.addEventListener("click", async () => {
        if (!currentUser) return alert("Session expired. Please re-authenticate.");
        
        const title = document.getElementById("toolkitTitle").value;
        const theme = document.getElementById("toolkitTheme").value;
        const selectedTools = [];
        
        document.querySelectorAll(".tool-checkbox:checked").forEach(cb => {
            selectedTools.push(cb.value);
        });

        if(!title) return alert("Please enter a Toolkit Title Name!");

        try {
            const docRef = await addDoc(collection(db, "user_toolkits"), {
                userId: currentUser.uid, 
                userEmail: currentUser.email,
                title: title,
                theme: theme,
                selectedTools: selectedTools,
                createdAt: new Date()
            });
            alert(`🔥 Toolkit Saved in Cloud Account! ID: ${docRef.id}`);
            
            // Naya toolkit save hote hi wapas load karein taake list refresh ho jaye
            fetchUserToolkits(currentUser.uid);
        } catch (e) {
            alert("Database write rejected.");
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
            
            // Yahan hum user ko instruction alert dikha sakte hain (Custom Pakistani setup ke liye)
            alert(`📢 AZAN TECH LAB - VIP UPGRADE\n\nPlan: ${planName}\nPrice: ${price}\n\nTo activate, please contact Admin (Azan Ali) via WhatsApp/Telegram to send payment, and provide your Username to get instantly upgraded!`);
        });
    });
    }
                     
