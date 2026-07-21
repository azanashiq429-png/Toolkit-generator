export function generateDashboardHTML(title, themeClass, dashboardCardsHTML, modalViewsHTML, coreExecutableJS) {
    return `<!DOCTYPE html>
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
                grid-template-columns: repeat(3, minmax(0, 1fr));
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
            min-height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

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

        /* Spacious & Modern Full-Size Modal Portal Window Layers */
        .modal-portal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(3, 7, 18, 0.85);
            backdrop-filter: blur(12px);
            justify-content: center;
            align-items: center;
            z-index: 1000;
            padding: 20px;
        }

        .modal-card {
            background: #090e18;
            border: 1px solid var(--primary);
            width: 100%;
            max-width: 680px; /* Barhi aur khuli window */
            min-height: 320px;
            max-height: 85vh;
            overflow-y: auto;
            padding: 40px 30px;
            border-radius: 28px;
            position: relative;
            box-shadow: 0 0 50px var(--primary-glow), 0 20px 40px rgba(0,0,0,0.6);
            animation: modalRise 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @keyframes modalRise {
            from { transform: translateY(40px) scale(0.92); opacity: 0; }
            to { transform: translateY(0) scale(1); opacity: 1; }
        }

        .dismiss-portal-btn {
            position: absolute;
            top: 18px;
            right: 24px;
            color: #9ca3af;
            font-size: 26px;
            font-weight: bold;
            cursor: pointer;
            transition: color 0.2s;
        }

        .dismiss-portal-btn:hover {
            color: #ef4444;
        }

        .modal-card h3 {
            color: var(--primary);
            font-size: 20px;
            margin-bottom: 25px;
            text-transform: uppercase;
            font-weight: 700;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            padding-bottom: 12px;
            font-family: 'Rajdhani', sans-serif;
            letter-spacing: 1px;
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
                  
