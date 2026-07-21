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

    <!-- Tailwind CSS (Tools Design ke liye sab se zaroori) -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- Fonts & FontAwesome Icons -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Rajdhani:wght@600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <style>
        :root {
            --bg-deep: #030712;
            --bg-glass: rgba(10, 15, 30, 0.75);
            --bg-card: rgba(13, 20, 38, 0.6);
            --border-glow: rgba(34, 211, 238, 0.2);
            --primary: #22d3ee;
            --primary-glow: rgba(34, 211, 238, 0.4);
            --secondary: #0891b2;
            --accent: #eab308;
        }

        .theme-yellow {
            --primary: #facc15;
            --primary-glow: rgba(250, 204, 21, 0.4);
            --secondary: #ca8a04;
            --border-glow: rgba(250, 204, 21, 0.2);
        }

        .theme-ruby {
            --primary: #ef4444;
            --primary-glow: rgba(239, 68, 68, 0.4);
            --secondary: #b91c1c;
            --border-glow: rgba(239, 68, 68, 0.2);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
            background-color: var(--bg-deep);
            background-image: 
                radial-gradient(circle at 50% 0%, rgba(34, 211, 238, 0.08) 0%, transparent 60%),
                radial-gradient(circle at 80% 80%, rgba(8, 145, 178, 0.05) 0%, transparent 50%);
            color: #f3f4f6;
            font-family: 'Plus Jakarta Sans', sans-serif;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 30px 15px;
        }

        .dashboard-canvas {
            width: 100%;
            max-width: 1080px;
            background: var(--bg-glass);
            backdrop-filter: blur(24px);
            border: 1px solid var(--border-glow);
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8), 0 0 40px var(--primary-glow);
            border-radius: 28px;
            padding: 40px 30px;
            position: relative;
        }

        header { text-align: center; margin-bottom: 35px; }

        h1 {
            font-family: 'Rajdhani', sans-serif;
            color: var(--primary);
            font-size: 38px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 2.5px;
            text-shadow: 0 0 25px var(--primary-glow);
        }

        .system-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            color: var(--accent);
            font-size: 11px;
            font-weight: 800;
            letter-spacing: 2px;
            text-transform: uppercase;
            margin-top: 10px;
            border: 1px solid rgba(234, 179, 8, 0.3);
            padding: 5px 16px;
            border-radius: 50px;
            background: rgba(234, 179, 8, 0.08);
            box-shadow: 0 0 12px rgba(234, 179, 8, 0.15);
        }

        .tools-3x3-grid {
            display: grid;
            grid-template-columns: repeat(1, minmax(0, 1fr));
            gap: 20px;
        }
        @media (min-width: 640px) { .tools-3x3-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (min-width: 1024px) { .tools-3x3-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }

        .tools-list-stack {
            display: flex;
            flex-direction: column;
            gap: 14px;
        }

        .premium-card {
            background: var(--bg-card);
            border: 1px solid rgba(255, 255, 255, 0.06);
            border-radius: 20px;
            padding: 22px 18px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            position: relative;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .tools-list-stack .premium-card {
            flex-direction: row;
            justify-content: space-between;
            text-align: left;
            padding: 16px 22px;
        }

        .premium-card:hover {
            transform: translateY(-5px);
            border-color: var(--primary);
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 0 25px var(--primary-glow);
            background: rgba(17, 24, 39, 0.8);
        }

        .icon-sphere {
            width: 52px;
            height: 52px;
            border-radius: 16px;
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.08);
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--primary);
            font-size: 22px;
            margin-bottom: 14px;
            transition: all 0.3s;
        }

        .premium-card:hover .icon-sphere {
            background: var(--primary);
            color: #030712;
            box-shadow: 0 0 15px var(--primary-glow);
        }

        .tools-list-stack .icon-sphere { margin-bottom: 0; margin-right: 16px; }

        .card-title {
            font-size: 15px;
            font-weight: 700;
            color: #f3f4f6;
            margin-bottom: 14px;
        }

        .tools-list-stack .card-title { margin-bottom: 0; flex-grow: 1; }

        .glowing-launch-btn {
            background: linear-gradient(135deg, var(--secondary) 0%, #0f172a 100%);
            color: #ffffff;
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 9px 18px;
            border-radius: 12px;
            font-weight: 700;
            font-size: 11px;
            cursor: pointer;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            transition: all 0.2s;
        }

        .glowing-launch-btn:hover {
            background: var(--primary);
            color: #030712;
            box-shadow: 0 0 15px var(--primary-glow);
        }

        /* Tool Modal Popup Glassmorphism */
        .modal-portal {
            display: none;
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(3, 7, 18, 0.88);
            backdrop-filter: blur(14px);
            justify-content: center; align-items: center;
            z-index: 1000; padding: 20px;
        }

        .modal-card {
            background: #0b1120;
            border: 1px solid var(--primary);
            box-shadow: 0 0 40px var(--primary-glow);
            width: 100%; max-width: 620px;
            padding: 28px; border-radius: 24px;
            position: relative;
            animation: modalPop 0.25s ease-out;
        }

        @keyframes modalPop {
            from { transform: scale(0.92); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }

        .dismiss-portal-btn {
            position: absolute; top: 16px; right: 20px;
            color: #9ca3af; font-size: 22px; cursor: pointer;
            transition: color 0.2s;
        }
        .dismiss-portal-btn:hover { color: #f3f4f6; }

        /* Auto-Styling for Tool Controls inside Modal */
        .modal-card textarea, .modal-card input[type="text"], .modal-card select {
            color: #f3f4f6;
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

    ${modalViewsHTML}

    <script>
        function openToolModal(toolId) {
            document.getElementById('modal_' + toolId).style.display = 'flex';
        }
        function closeToolModal(toolId) {
            document.getElementById('modal_' + toolId).style.display = 'none';
        }
        window.onclick = function(event) {
            if (event.target.classList.contains('modal-portal')) {
                event.target.style.display = 'none';
            }
        }

        ${coreExecutableJS}
    </script>
</body>
</html>`;
    }
