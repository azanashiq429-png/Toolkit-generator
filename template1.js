export function generateDashboardHTML(title, themeClass, dashboardCardsHTML, modalViewsHTML, coreExecutableJS, templateStyle = "grid") {
    const isList = templateStyle === "list";
    const layoutClass = isList ? "tools-list-stack" : "tools-3x3-grid";

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&family=Rajdhani:wght@600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <style>
        :root {
            --bg-deep: #030712;
            --bg-glass: rgba(10, 15, 30, 0.7);
            --bg-card: rgba(13, 20, 38, 0.5);
            --border-glow: rgba(34, 211, 238, 0.15);
            --primary: #22d3ee;
            --primary-glow: rgba(34, 211, 238, 0.35);
            --secondary: #0891b2;
            --accent: #eab308;
        }

        .theme-yellow {
            --primary: #facc15;
            --primary-glow: rgba(250, 204, 21, 0.35);
            --secondary: #ca8a04;
            --border-glow: rgba(250, 204, 21, 0.15);
        }

        .theme-ruby {
            --primary: #ef4444;
            --primary-glow: rgba(239, 68, 68, 0.35);
            --secondary: #b91c1c;
            --border-glow: rgba(239, 68, 68, 0.15);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

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
        }

        header { text-align: center; margin-bottom: 45px; }

        h1 {
            font-family: 'Rajdhani', sans-serif;
            color: var(--primary);
            font-size: 36px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 2px;
            text-shadow: 0 0 20px var(--primary-glow);
        }

        .system-badge {
            display: inline-block;
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

        .tools-3x3-grid {
            display: grid;
            grid-template-columns: repeat(1, minmax(0, 1fr));
            gap: 24px;
        }
        @media (min-width: 640px) { .tools-3x3-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (min-width: 1024px) { .tools-3x3-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }

        .tools-list-stack {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        .premium-card {
            background: var(--bg-card);
            border: 1px solid rgba(255, 255, 255, 0.04);
            border-radius: 20px;
            padding: 24px 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            position: relative;
            cursor: pointer;
            transition: all 0.3s;
        }

        .tools-list-stack .premium-card {
            flex-direction: row;
            justify-content: space-between;
            text-align: left;
            padding: 18px 24px;
        }

        .premium-card:hover {
            transform: translateY(-4px);
            border-color: var(--primary);
            box-shadow: 0 0 20px var(--primary-glow);
        }

        .icon-sphere {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.03);
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--primary);
            font-size: 20px;
            margin-bottom: 12px;
        }

        .tools-list-stack .icon-sphere { margin-bottom: 0; margin-right: 16px; }

        .card-title {
            font-size: 15px;
            font-weight: 700;
            color: #e5e7eb;
            margin-bottom: 16px;
        }

        .tools-list-stack .card-title { margin-bottom: 0; flex-grow: 1; }

        .glowing-launch-btn {
            background: linear-gradient(135deg, var(--secondary) 0%, #111827 100%);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.05);
            padding: 10px 18px;
            border-radius: 12px;
            font-weight: 700;
            font-size: 11px;
            cursor: pointer;
            text-transform: uppercase;
        }

        .modal-portal {
            display: none;
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(3, 7, 18, 0.85);
            backdrop-filter: blur(12px);
            justify-content: center; align-items: center;
            z-index: 1000; padding: 20px;
        }

        .modal-card {
            background: #090e18;
            border: 1px solid var(--primary);
            width: 100%; max-width: 680px;
            padding: 30px; border-radius: 28px;
            position: relative;
        }

        .dismiss-portal-btn {
            position: absolute; top: 18px; right: 24px;
            color: #9ca3af; font-size: 26px; cursor: pointer;
        }
    </style>
</head>
<body class="${themeClass}">

    <div class="dashboard-canvas">
        <header>
            <h1>${title}</h1>
            <div class="system-badge">POWERED BY AZAN TECH LAB</div>
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
