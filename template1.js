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

    <!-- Fonts & FontAwesome Icons -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Rajdhani:wght@500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <style>
        :root {
            --bg-deep: #02040a;
            --bg-glass: rgba(10, 15, 30, 0.6);
            --bg-card: rgba(13, 20, 38, 0.4);
            --border-glow: rgba(34, 211, 238, 0.3);
            --primary: #22d3ee;
            --primary-glow: rgba(34, 211, 238, 0.5);
            --secondary: #0891b2;
            --accent: #eab308;
            --text-main: #f8fafc;
            --text-muted: #94a3b8;
        }

        .theme-cyan {
            --primary: #22d3ee;
            --primary-glow: rgba(34, 211, 238, 0.5);
            --secondary: #0891b2;
            --border-glow: rgba(34, 211, 238, 0.3);
        }

        .theme-yellow {
            --primary: #facc15;
            --primary-glow: rgba(250, 204, 21, 0.5);
            --secondary: #ca8a04;
            --border-glow: rgba(250, 204, 21, 0.3);
        }

        .theme-ruby {
            --primary: #ef4444;
            --primary-glow: rgba(239, 68, 68, 0.5);
            --secondary: #b91c1c;
            --border-glow: rgba(239, 68, 68, 0.3);
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: var(--bg-deep); }
        ::-webkit-scrollbar-thumb { background: var(--secondary); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--primary); }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
            background-color: var(--bg-deep);
            background-image: 
                linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                radial-gradient(circle at 50% 0%, rgba(34, 211, 238, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 80% 100%, rgba(8, 145, 178, 0.1) 0%, transparent 50%);
            background-size: 40px 40px, 40px 40px, 100% 100%, 100% 100%;
            background-position: center center;
            color: var(--text-main);
            font-family: 'Plus Jakarta Sans', sans-serif;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            padding: 30px 15px;
            overflow-x: hidden;
        }

        /* Main Dashboard Canvas */
        .dashboard-canvas {
            width: 100%;
            max-width: 1280px;
            background: var(--bg-glass);
            backdrop-filter: blur(30px);
            -webkit-backdrop-filter: blur(30px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.9), inset 0 0 20px rgba(255,255,255,0.02);
            border-radius: 32px;
            padding: 40px 25px;
            position: relative;
            z-index: 10;
        }

        header { text-align: center; margin-bottom: 40px; position: relative; }

        h1 {
            font-family: 'Rajdhani', sans-serif;
            color: #ffffff;
            font-size: 38px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 2.5px;
            text-shadow: 0 0 30px var(--primary-glow), 0 0 10px var(--primary);
            margin-bottom: 12px;
        }

        @media (min-width: 768px) {
            h1 { font-size: 46px; }
            .dashboard-canvas { padding: 50px 40px; }
        }

        .system-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            color: #ffffff;
            font-size: 11px;
            font-weight: 800;
            letter-spacing: 2px;
            text-transform: uppercase;
            border: 1px solid var(--accent);
            padding: 6px 18px;
            border-radius: 50px;
            background: rgba(234, 179, 8, 0.15);
            box-shadow: 0 0 20px rgba(234, 179, 8, 0.3), inset 0 0 10px rgba(234, 179, 8, 0.2);
            text-shadow: 0 0 8px rgba(255,255,255,0.5);
        }

        /* Grid Layouts */
        .tools-3x3-grid {
            display: grid;
            grid-template-columns: repeat(1, minmax(0, 1fr));
            gap: 20px;
        }
        @media (min-width: 640px) { .tools-3x3-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (min-width: 1024px) { .tools-3x3-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }

        .tools-list-stack { display: flex; flex-direction: column; gap: 16px; }

        /* Premium Cards */
        .premium-card {
            background: linear-gradient(145deg, var(--bg-card) 0%, rgba(5, 8, 15, 0.8) 100%);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 24px;
            padding: 26px 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            position: relative;
            cursor: pointer;
            overflow: hidden;
            transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .premium-card::before {
            content: '';
            position: absolute;
            top: 0; left: -100%; width: 50%; height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
            transform: skewX(-25deg);
            transition: all 0.5s;
        }

        .premium-card:hover::before { left: 150%; }

        .premium-card:hover {
            transform: translateY(-6px) scale(1.01);
            border-color: var(--primary);
            box-shadow: 0 15px 35px -5px rgba(0, 0, 0, 0.7), 0 0 30px var(--primary-glow);
            background: linear-gradient(145deg, rgba(17, 24, 39, 0.9) 0%, rgba(5, 8, 15, 0.9) 100%);
        }

        .tools-list-stack .premium-card {
            flex-direction: row; justify-content: space-between;
            text-align: left; padding: 18px 24px;
        }

        .icon-sphere {
            width: 58px; height: 58px;
            border-radius: 18px;
            background: rgba(0, 0, 0, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.1);
            display: flex; align-items: center; justify-content: center;
            color: var(--primary);
            font-size: 24px; margin-bottom: 14px;
            box-shadow: inset 0 0 15px rgba(255,255,255,0.02);
            transition: all 0.35s;
        }

        .premium-card:hover .icon-sphere {
            background: var(--primary);
            color: #000;
            border-color: #fff;
            box-shadow: 0 0 25px var(--primary-glow);
            transform: scale(1.08) rotate(4deg);
        }

        .tools-list-stack .icon-sphere { margin-bottom: 0; margin-right: 18px; }

        .card-title {
            font-family: 'Rajdhani', sans-serif;
            font-size: 19px; font-weight: 700;
            color: #ffffff; letter-spacing: 1px;
            margin-bottom: 14px;
        }

        .tools-list-stack .card-title { margin-bottom: 0; flex-grow: 1; font-size: 20px; }

        .glowing-launch-btn {
            background: transparent;
            color: var(--primary);
            border: 1px solid var(--primary);
            padding: 9px 22px;
            border-radius: 12px;
            font-weight: 800; font-size: 11px;
            cursor: pointer; text-transform: uppercase;
            letter-spacing: 1px;
            transition: all 0.3s;
        }

        .glowing-launch-btn:hover {
            background: var(--primary);
            color: #02040a;
            box-shadow: 0 0 20px var(--primary-glow);
        }

        /* -------------------------------------------
           FULL-WINDOW WORKSPACE MODAL
           ------------------------------------------- */
        .modal-portal {
            display: none;
            position: fixed;
            inset: 0;
            width: 100vw;
            height: 100dvh;
            background: rgba(2, 4, 10, 0.88);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            justify-content: center;
            align-items: center;
            z-index: 9999; 
            padding: 12px;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        @media (min-width: 640px) { .modal-portal { padding: 24px; } }

        .modal-portal.active {
            display: flex;
            opacity: 1;
        }

        .modal-card {
            background: linear-gradient(180deg, #090e1a 0%, #03060c 100%);
            border: 1px solid var(--primary);
            box-shadow: 0 0 60px rgba(0,0,0,0.8), 0 0 30px var(--primary-glow);
            width: 100%;
            max-width: 1200px;
            max-height: 90dvh;
            border-radius: 24px;
            display: flex;
            flex-direction: column;
            position: relative;
            overflow-y: auto; /* Internal Scrolling Fix */
            padding: 30px 24px;
        }

        @media (min-width: 768px) { .modal-card { padding: 40px 35px; } }

        .dismiss-portal-btn {
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(239, 68, 68, 0.15);
            border: 1px solid rgba(239, 68, 68, 0.4);
            color: #ef4444; 
            width: 40px;
            height: 40px;
            border-radius: 12px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 20px;
            cursor: pointer;
            transition: all 0.3s;
            z-index: 100;
        }
        
        .dismiss-portal-btn:hover { 
            background: #ef4444;
            color: #fff;
            box-shadow: 0 0 20px rgba(239, 68, 68, 0.6);
            transform: rotate(90deg);
        }

        /* Input Controls Styling Inside Modal */
        .modal-card input, .modal-card textarea, .modal-card select {
            background: rgba(0, 0, 0, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.12);
            color: #fff;
            padding: 12px 16px;
            border-radius: 12px;
            transition: all 0.3s;
        }
        .modal-card input:focus, .modal-card textarea:focus {
            border-color: var(--primary);
            box-shadow: 0 0 15px var(--primary-glow);
            outline: none;
        }
    </style>
</head>
<body class="${themeClass}">

    <div class="dashboard-canvas">
        <header>
            <h1>${title}</h1>
            <div class="system-badge">
                <i class="fa-solid fa-bolt text-amber-400"></i> POWERED BY AZAN TECH LAB
            </div>
        </header>
        
        <div class="${layoutClass}">
            ${dashboardCardsHTML}
        </div>
    </div>

    <!-- Modals area -->
    ${modalViewsHTML}

    <script>
        function openToolModal(toolId) {
            const modal = document.getElementById('modal_' + toolId);
            if(modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; 
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
