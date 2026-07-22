// template1.js
export function generateDashboardHTML(title, themeClass, dashboardCardsHTML, modalViewsHTML, coreExecutableJS, templateStyle = "grid") {
    const isList = templateStyle === "list";
    const layoutClass = isList ? "tools-list-stack" : "tools-3x3-grid";

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>

    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- Fonts & FontAwesome -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Rajdhani:wght@500;600;700;800&family=Share+Tech+Mono&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <style>
        :root {
            --bg-deep: #010205;
            --bg-glass: rgba(5, 8, 15, 0.7);
            --bg-card: rgba(8, 12, 22, 0.6);
            --primary: #00ffcc;
            --primary-glow: rgba(0, 255, 204, 0.6);
            --secondary: #0088ff;
            --accent: #ff0055;
            --text-main: #e2e8f0;
        }

        .theme-yellow {
            --primary: #ffd700; --primary-glow: rgba(255, 215, 0, 0.6);
            --secondary: #ff8c00; --accent: #ff003c;
        }

        .theme-ruby {
            --primary: #ff003c; --primary-glow: rgba(255, 0, 60, 0.6);
            --secondary: #990000; --accent: #00ffcc;
        }

        /* Heavy Custom Scrollbar */
        ::-webkit-scrollbar { width: 10px; height: 10px; }
        ::-webkit-scrollbar-track { background: #000; border-left: 1px solid rgba(255,255,255,0.05); }
        ::-webkit-scrollbar-thumb { background: var(--secondary); border: 1px solid var(--primary); box-shadow: 0 0 10px var(--primary-glow); }
        ::-webkit-scrollbar-thumb:hover { background: var(--primary); }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        /* Moving Cyber Grid Background */
        body {
            background-color: var(--bg-deep);
            background-image: 
                linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
                radial-gradient(circle at 50% 50%, rgba(0, 255, 204, 0.08) 0%, transparent 60%);
            background-size: 50px 50px, 50px 50px, 100vw 100vh;
            color: var(--text-main);
            font-family: 'Plus Jakarta Sans', sans-serif;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            padding: 60px 20px;
            overflow-x: hidden;
            animation: moveGrid 15s linear infinite;
        }

        @keyframes moveGrid {
            0% { background-position: 0 0, 0 0, 0 0; }
            100% { background-position: 50px 50px, 50px 50px, 0 0; }
        }

        /* CRT TV Scanline Overlay */
        body::after {
            content: "";
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%);
            background-size: 100% 4px;
            z-index: 99999;
            pointer-events: none;
            opacity: 0.4;
        }

        /* Main Dashboard Canvas with HUD Corners */
        .dashboard-canvas {
            width: 100%; max-width: 1300px;
            background: var(--bg-glass); backdrop-filter: blur(40px); -webkit-backdrop-filter: blur(40px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 30px 80px rgba(0, 0, 0, 0.95), inset 0 0 40px rgba(0, 255, 204, 0.05);
            padding: 60px 50px; position: relative; z-index: 10;
        }

        .dashboard-canvas::before, .dashboard-canvas::after {
            content: ''; position: absolute; width: 40px; height: 40px;
            border: 2px solid var(--primary); pointer-events: none;
            animation: pulseGlow 2s infinite alternate;
        }
        .dashboard-canvas::before { top: -2px; left: -2px; border-right: none; border-bottom: none; }
        .dashboard-canvas::after { bottom: -2px; right: -2px; border-left: none; border-top: none; }

        @keyframes pulseGlow {
            0% { box-shadow: 0 0 5px var(--primary-glow); border-color: var(--secondary); }
            100% { box-shadow: 0 0 20px var(--primary-glow), inset 0 0 10px var(--primary-glow); border-color: var(--primary); }
        }

        header { text-align: center; margin-bottom: 60px; position: relative; }

        /* Glitch Title Effect */
        .glitch-title {
            font-family: 'Rajdhani', sans-serif; color: #fff;
            font-size: 55px; font-weight: 800; text-transform: uppercase;
            letter-spacing: 5px; position: relative; display: inline-block;
            text-shadow: 0 0 20px var(--primary-glow);
        }
        
        .glitch-title::before, .glitch-title::after {
            content: attr(data-text);
            position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0.8;
        }
        .glitch-title::before { left: 3px; text-shadow: -2px 0 var(--accent); animation: glitch-anim 2s infinite linear alternate-reverse; }
        .glitch-title::after { left: -3px; text-shadow: -2px 0 var(--secondary); animation: glitch-anim 3s infinite linear alternate-reverse; }

        @keyframes glitch-anim {
            0% { clip-path: inset(10% 0 80% 0); }
            20% { clip-path: inset(80% 0 1% 0); }
            40% { clip-path: inset(30% 0 50% 0); }
            60% { clip-path: inset(100% 0 1% 0); }
            80% { clip-path: inset(5% 0 70% 0); }
            100% { clip-path: inset(40% 0 30% 0); }
        }

        .system-badge {
            display: inline-flex; align-items: center; gap: 10px;
            color: #fff; font-size: 13px; font-weight: 800; letter-spacing: 4px;
            font-family: 'Share Tech Mono', monospace; text-transform: uppercase;
            border: 1px solid var(--accent); padding: 8px 25px;
            background: rgba(255, 0, 85, 0.15); margin-top: 15px;
            box-shadow: 0 0 20px rgba(255, 0, 85, 0.4);
            border-left: 4px solid var(--accent); border-right: 4px solid var(--accent);
        }

        .tools-3x3-grid { display: grid; grid-template-columns: repeat(1, minmax(0, 1fr)); gap: 30px; }
        @media (min-width: 768px) { .tools-3x3-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (min-width: 1024px) { .tools-3x3-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
        .tools-list-stack { display: flex; flex-direction: column; gap: 20px; }

        .premium-card {
            background: linear-gradient(135deg, rgba(15, 20, 30, 0.8) 0%, rgba(2, 4, 10, 0.9) 100%);
            border: 1px solid rgba(255, 255, 255, 0.05); border-top: 1px solid rgba(255, 255, 255, 0.15);
            padding: 35px 25px; display: flex; flex-direction: column; align-items: center; text-align: center;
            position: relative; cursor: pointer; transition: all 0.3s ease-out;
            clip-path: polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%);
        }

        .premium-card::after {
            content: ''; position: absolute; bottom: 0; right: 0; width: 15px; height: 15px; background: var(--primary);
        }

        .premium-card:hover {
            transform: translateY(-10px) scale(1.03); border-color: var(--primary);
            box-shadow: 0 20px 40px rgba(0,0,0,0.8), 0 0 40px var(--primary-glow);
            background: linear-gradient(135deg, rgba(20, 30, 50, 0.9) 0%, rgba(2, 4, 10, 0.95) 100%);
        }

        .tools-list-stack .premium-card { flex-direction: row; justify-content: space-between; text-align: left; padding: 25px 35px; }

        .icon-sphere {
            width: 70px; height: 70px; background: radial-gradient(circle, rgba(0,255,204,0.1) 0%, rgba(0,0,0,0.5) 100%);
            border: 1px solid rgba(0,255,204,0.3); display: flex; align-items: center; justify-content: center;
            color: var(--primary); font-size: 30px; margin-bottom: 20px;
            box-shadow: 0 0 15px rgba(0,255,204,0.2); transition: all 0.3s;
            clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }

        .premium-card:hover .icon-sphere {
            background: var(--primary); color: #000; box-shadow: 0 0 30px var(--primary-glow); transform: rotate(360deg);
        }

        .tools-list-stack .icon-sphere { margin-bottom: 0; margin-right: 25px; }

        .card-title {
            font-family: 'Rajdhani', sans-serif; font-size: 22px; font-weight: 800;
            color: #fff; letter-spacing: 2px; margin-bottom: 20px; text-transform: uppercase;
        }

        .tools-list-stack .card-title { margin-bottom: 0; flex-grow: 1; font-size: 24px; }

        .glowing-launch-btn {
            background: transparent; color: var(--primary); border: 2px solid var(--primary); padding: 12px 30px;
            font-family: 'Share Tech Mono', monospace; font-weight: 800; font-size: 13px;
            cursor: pointer; text-transform: uppercase; letter-spacing: 2px; transition: all 0.2s; position: relative; overflow: hidden;
        }

        .glowing-launch-btn:hover { background: var(--primary); color: #000; box-shadow: 0 0 25px var(--primary-glow); text-shadow: none; }

        /* HEAVY FULL-WINDOW MODAL WORKSPACE */
        .modal-portal {
            display: none; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(1, 2, 5, 0.95); backdrop-filter: blur(30px); -webkit-backdrop-filter: blur(30px);
            justify-content: center; align-items: center; z-index: 9999; padding: 2vh 2vw; opacity: 0;
        }

        .modal-portal.active { display: flex; animation: systemBoot 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        @keyframes systemBoot {
            0% { opacity: 0; filter: brightness(3) contrast(3); }
            50% { opacity: 1; filter: brightness(1.5) contrast(1.5); transform: scale(1.02); }
            100% { opacity: 1; filter: brightness(1) contrast(1); transform: scale(1); }
        }

        .modal-card {
            background: linear-gradient(180deg, #050a12 0%, #000000 100%);
            border: 1px solid var(--primary); box-shadow: 0 0 80px rgba(0,255,204,0.1), inset 0 0 50px rgba(0,255,204,0.05);
            width: 100%; height: 100%; max-width: 1800px; display: flex; flex-direction: column; position: relative; overflow: hidden;
        }

        .modal-card::before {
            content: 'SECURE_WORKSPACE_INITIALIZED... [OK]';
            position: absolute; top: 0; left: 0; width: 100%; height: 25px;
            background: var(--primary); color: #000; font-family: 'Share Tech Mono', monospace; font-size: 12px; font-weight: 800;
            display: flex; align-items: center; padding-left: 15px; letter-spacing: 2px; z-index: 20;
        }

        .modal-content-wrapper { flex-grow: 1; padding: 60px 40px 40px; overflow-y: auto; position: relative; z-index: 1; opacity: 0; transform: scale(0.95); }

        .dismiss-portal-btn {
            position: absolute; top: 40px; right: 30px; background: transparent; border: 2px solid var(--accent);
            color: var(--accent); width: 50px; height: 50px; display: flex; justify-content: center; align-items: center;
            font-size: 24px; cursor: pointer; transition: all 0.3s; z-index: 100;
            clip-path: polygon(20% 0%, 100% 0, 100% 80%, 80% 100%, 0 100%, 0% 20%);
        }
        
        .dismiss-portal-btn:hover { 
            background: var(--accent); color: #000; box-shadow: 0 0 30px rgba(255,0,85,0.6); transform: scale(1.1);
        }

        /* -------------------------------------------
           CYBERPUNK LOADER CSS
           ------------------------------------------- */
        .cyber-loader-overlay {
            position: absolute; top: 25px; left: 0; width: 100%; height: calc(100% - 25px);
            background: #02040a; display: flex; flex-direction: column; justify-content: center; align-items: center;
            z-index: 50; transition: opacity 0.4s ease;
        }
        .cyber-spinner {
            width: 80px; height: 80px; border: 4px solid rgba(0, 255, 204, 0.1); border-top: 4px solid var(--primary);
            border-radius: 50%; animation: spin 1s linear infinite, pulseGlowSpinner 2s infinite alternate;
        }
        .loading-text {
            margin-top: 25px; color: var(--primary); font-family: 'Share Tech Mono', monospace;
            font-size: 18px; font-weight: 800; letter-spacing: 5px; text-shadow: 0 0 10px var(--primary-glow);
            animation: blink 1.5s infinite;
        }
        .progress-bar-container {
            width: 300px; height: 6px; background: rgba(255,255,255,0.05); margin-top: 15px;
            border: 1px solid rgba(0,255,204,0.3); position: relative; overflow: hidden;
        }
        .progress-bar-fill {
            height: 100%; background: var(--primary); width: 0%;
            box-shadow: 0 0 15px var(--primary-glow); animation: fillProgress 1.4s ease-out forwards;
        }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes pulseGlowSpinner { 100% { box-shadow: 0 0 30px var(--primary-glow); } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes fillProgress { 0% { width: 0%; } 40% { width: 60%; } 100% { width: 100%; } }

        /* Tool Inputs Styling */
        .modal-card input, .modal-card textarea, .modal-card select {
            background: rgba(0, 0, 0, 0.7); border: 1px solid rgba(0, 255, 204, 0.3); color: var(--primary);
            padding: 15px 20px; font-family: 'Share Tech Mono', monospace; font-size: 16px; transition: all 0.3s;
            border-left: 4px solid var(--primary); width: 100%;
        }
        .modal-card input:focus, .modal-card textarea:focus {
            border-color: var(--primary); box-shadow: 0 0 20px var(--primary-glow); outline: none; background: rgba(0, 255, 204, 0.05);
        }
    </style>
</head>
<body class="${themeClass}">

    <div class="dashboard-canvas">
        <header>
            <h1 class="glitch-title" data-text="${title}">${title}</h1>
            <br>
            <div class="system-badge">
                <i class="fa-solid fa-microchip text-rose-500"></i> SYSTEM ACTIVE // AZAN TECH LAB
            </div>
        </header>
        
        <div class="${layoutClass}">
            ${dashboardCardsHTML}
        </div>
    </div>

    ${modalViewsHTML}

    <script>
        function openToolModal(toolId) {
            const modal = document.getElementById('modal_' + toolId);
            if(modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; 
                
                // Content Animation Setup
                let contentWrapper = modal.querySelector('.modal-content-wrapper');
                
                // Loading Animation Injector
                let loader = modal.querySelector('.cyber-loader-overlay');
                if(!loader) {
                    loader = document.createElement('div');
                    loader.className = 'cyber-loader-overlay';
                    loader.innerHTML = \`
                        <div class="cyber-spinner"></div>
                        <div class="loading-text">DECRYPTING MODULE...</div>
                        <div class="progress-bar-container">
                            <div class="progress-bar-fill"></div>
                        </div>
                    \`;
                    modal.querySelector('.modal-card').appendChild(loader);
                }
                
                // Reset states for animation replay
                loader.style.display = 'flex';
                loader.style.opacity = '1';
                
                if(contentWrapper) {
                    contentWrapper.style.opacity = '0';
                    contentWrapper.style.transform = 'scale(0.95)';
                    contentWrapper.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
                    
                    // Simulate processing time
                    setTimeout(() => {
                        loader.style.opacity = '0';
                        contentWrapper.style.opacity = '1';
                        contentWrapper.style.transform = 'scale(1)';
                        
                        setTimeout(() => { loader.style.display = 'none'; }, 400);
                    }, 1400); // 1.4 seconds delay for full cyberpunk feel
                }
            }
        }

        function closeToolModal(toolId) {
            const modal = document.getElementById('modal_' + toolId);
            if(modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }

        window.onclick = function(event) {
            if (event.target.classList.contains('modal-portal')) {
                event.target.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }

        ${coreExecutableJS}
    </script>
</body>
</html>`;
}
