import { toolNames } from './tools-data.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, doc, setDoc, getDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// ✅ Firebase Cloud Connection Linked Successfully
const firebaseConfig = {
    apiKey: "AIzaSyCrx59SOp24r64mV435ddI8F55aPEB1UPA",
    authDomain: "azan-toolkit-pro.firebaseapp.com",
    databaseURL: "https://azan-toolkit-pro-default-rtdb.firebaseio.com",
    projectId: "azan-toolkit-pro",
    storageBucket: "azan-toolkit-pro.firebasestorage.app",
    messagingSenderId: "388424834865",
    appId: "1:388424834865:web:b54ee66bf8ac5f988d1a10"
};

// Initialize Firebase App Modules
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Global App States
let linkCount = 1;
let authMode = "login"; 
let currentUser = null;

// --- INITIALIZE INTERFACE ---
document.addEventListener("DOMContentLoaded", () => {
    renderToolsCheckboxes();
    setupNavigation();
    setupDynamicLinkListeners();
    setupAuthSystem();
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
        
        // Fetch username from cloud profile mapping to show on header dashboard
        if(userDisplayEmail) {
            userDisplayEmail.innerText = `Loading Session...`;
            const q = query(collection(db, "usernames"), where("email", "==", user.email));
            const snap = await getDocs(q);
            if(!snap.empty) {
                userDisplayEmail.innerText = `@${snap.docs[0].id} (Online)`;
            } else {
                userDisplayEmail.innerText = `${user.email}`;
            }
        }
    } else {
        currentUser = null;
        authOverlay.classList.remove("hidden");
        mainPlatform.classList.add("opacity-30", "pointer-events-none");
    }
});

// --- AUTHENTICATION FLOW CONTROLLER (EMAIL + USERNAME HYBRID) ---
function setupAuthSystem() {
    const authForm = document.getElementById("authForm");
    const toggleBtn = document.getElementById("btnToggleAuthMode");
    const authTitle = document.getElementById("authTitle");
    const authSubtitle = document.getElementById("authSubtitle");
    const submitBtn = document.getElementById("btnAuthSubmit");
    const usernameContainer = document.getElementById("usernameFieldContainer");
    const emailLabel = document.getElementById("emailFieldLabel");

    // Toggle logic between custom Login and Registration states
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

    // Form Processing Architecture
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

                // Check if Username already taken inside Firestore DB
                const nameRef = doc(db, "usernames", username);
                const nameSnap = await getDoc(nameRef);
                if (nameSnap.exists()) {
                    return alert("This username is already claimed! Choose another.");
                }

                // Create Firebase Authentication Account
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                
                // Map username to Email inside database
                await setDoc(doc(db, "usernames", username), {
                    email: email,
                    uid: userCredential.user.uid
                });

                alert("Terminal Profile Registered Successfully!");
            } 
            else {
                // LOGIN STATE LOGIC
                let targetEmail = inputField;

                // Checking if user provided username instead of email address (No '@' sign)
                if (!inputField.includes("@")) {
                    const nameRef = doc(db, "usernames", inputField);
                    const nameSnap = await getDoc(nameRef);
                    
                    if (!nameSnap.exists()) {
                        return alert("Username does not exist in security databases!");
                    }
                    targetEmail = nameSnap.data().email;
                }

                // Execute Native Secure Connection Sign In
                await signInWithEmailAndPassword(auth, targetEmail, password);
                alert("Gateway Access Granted!");
            }
            authForm.reset();
        } catch (error) {
            console.error(error);
            alert(`Authentication Rejected: ${error.message}`);
        }
    });

    // Logout Process Execution
    document.getElementById("btnLogout")?.addEventListener("click", () => {
        signOut(auth).then(() => alert("Terminal Session Disconnected."));
    });
}

// Render Tools checkboxes
function renderToolsCheckboxes() {
    const container = document.getElementById("toolsCheckboxContainer");
    if (!container) return;

    toolNames.forEach((tool, idx) => {
        const isPro = tool.pro;
        const styleClass = isPro ? 'border-yellow-600/30 bg-yellow-950/5 text-yellow-500 font-bold' : 'border-gray-900 bg-[#090e18] text-gray-300';
        const badge = isPro ? '<span class="text-[9px] bg-yellow-950 border border-yellow-700/50 text-yellow-400 px-1.5 py-0.5 rounded font-black">PRO 👑</span>' : '<span class="text-[8px] bg-cyan-950/60 border border-cyan-900/60 text-cyan-400 px-1.5 py-0.5 rounded font-mono">FREE</span>';
        
        const row = `
            <label class="flex items-center justify-between p-3 rounded-xl border ${styleClass} transition hover:border-gray-700">
                <div class="flex items-center space-x-2 truncate">
                    <span class="text-xs font-mono text-gray-500">${String(idx + 1).padStart(2, '0')}</span>
                    <i class="fa-solid ${tool.icon} text-xs mx-1"></i>
                    <span class="text-xs tracking-wide truncate">${tool.name}</span>
                </div>
                <div class="flex items-center space-x-2">
                    ${badge}
                    <input type="checkbox" value="${tool.id}" ${isPro ? 'disabled' : ''} class="tool-checkbox accent-cyan-400 h-4 w-4 cursor-pointer rounded">
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
        } catch (e) {
            alert("Database write rejected.");
        }
    });
}
