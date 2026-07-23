export function generateTemplate3(title, themeClass, dashboardCardsHTML, modalViewsHTML, coreExecutableJS) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - Neo-Minimal</title>
    <!-- 1. Tailwind CSS CDN (Dynamic Tool Classes Fix) -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
        }

        :root {
            --bg-color: #0b0f19;
            --bg-gradient: radial-gradient(circle at 50% 0%, #17243c 0%, #070c14 65%, #030509 100%);
            --text-color: #ffffff;
            --panel-bg: #05080f;
            --panel-border: rgba(0, 242, 254, 0.25);
            --card-base-bg: linear-gradient(180deg, #0e1626 0%, #060a12 100%);
            --neon-color: #00f2fe;
        }

        body.light-mode {
            --bg-color: #f1f5f9;
            --bg-gradient: radial-gradient(circle at 50% 0%, #cbd5e1 0%, #f1f5f9 70%, #e2e8f0 100%);
            --text-color: #0f172a;
            --panel-bg: #ffffff;
            --panel-border: rgba(0, 0, 0, 0.1);
            --card-base-bg: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
            --neon-color: #0284c7;
        }

        body {
            background-color: var(--bg-color);
            background-image: var(--bg-gradient);
            color: var(--text-color);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 0 16px 40px 16px;
            overflow-x: hidden;
            transition: background 0.3s, color 0.3s;
        }

        .header {
            text-align: center;
            margin-top: 35px;
            margin-bottom: 25px;
            width: 100%;
            max-width: 440px;
            position: relative;
        }

        .logo {
            font-size: 2.2rem;
            font-weight: 900;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #ffffff;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 0 0 18px var(--neon-color);
            margin: 0;
        }

        .subtitle {
            color: #8fa0dd;
            font-size: 0.75rem;
            margin-top: 6px;
            letter-spacing: 1.5px;
            font-weight: 600;
            text-transform: uppercase;
        }

        .nav-buttons {
            position: absolute;
            top: 0;
            right: 0;
        }

        .top-btn {
            background: var(--panel-bg);
            border: 1px solid rgba(0, 242, 254, 0.4);
            color: var(--text-color);
            padding: 6px 12px;
            border-radius: 10px;
            cursor: pointer;
            font-size: 0.75rem;
            font-weight: bold;
        }

        .search-box {
            width: 100%;
            max-width: 440px;
            margin-bottom: 20px;
        }

        .search-input {
            width: 100%;
            padding: 12px 18px;
            background: var(--card-base-bg);
            border: 1px solid rgba(0, 242, 254, 0.3);
            border-radius: 14px;
            color: var(--text-color);
            font-size: 0.9rem;
            outline: none;
        }

        .tools-grid {
            width: 100%;
            max-width: 440px;
            display: flex;
            flex-direction: column;
            gap: 14px;
        }

        .premium-card {
            background: var(--card-base-bg);
            border: 1px solid var(--panel-border);
            border-radius: 16px;
            padding: 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: var(--text-color);
            cursor: pointer;
            transition: all 0.3s;
        }

        .premium-card:hover {
            transform: translateY(-2px);
            border-color: var(--neon-color);
        }

        .icon-sphere {
            font-size: 1.4rem;
            color: var(--neon-color);
            margin-right: 12px;
        }

        .card-title {
            font-size: 0.95rem;
            font-weight: 700;
            flex-grow: 1;
        }

        .glowing-launch-btn {
            background: var(--neon-color);
            color: #04080f;
            border: none;
            padding: 8px 14px;
            border-radius: 10px;
            font-weight: 800;
            font-size: 10px;
            cursor: pointer;
            text-transform: uppercase;
        }

        .modal-portal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(3, 7, 18, 0.85);
            backdrop-filter: blur(10px);
            justify-content: center;
            align-items: center;
            z-index: 1000;
            padding: 20px;
        }

        .modal-card {
            background: #090e18;
            border: 1px solid var(--neon-color);
            box-shadow: 0 0 25px rgba(0, 242, 254, 0.25);
            width: 100%;
            max-width: 500px;
            padding: 25px;
            border-radius: 20px;
            position: relative;
            color: #ffffff;
        }

        .dismiss-portal-btn {
            position: absolute;
            top: 15px;
            right: 20px;
            color: #9ca3af;
            font-size: 22px;
            cursor: pointer;
            background: transparent;
            border: none;
        }

        .dismiss-portal-btn:hover {
            color: #ff4444;
        }

        /* --- 2. MODAL INNER ELEMENTS STYLING FIX --- */
        .modal-card input:not(.search-input), 
        .modal-card textarea {
            width: 100% !important;
            background: #030712 !important;
            border: 1px solid rgba(0, 242, 254, 0.3) !important;
            color: #22d3ee !important;
            border-radius: 10px !important;
            padding: 10px 14px !important;
            font-family: monospace !important;
            font-size: 13px !important;
            outline: none !important;
            margin-top: 6px !important;
            margin-bottom: 12px !important;
            box-sizing: border-box !important;
        }

        .modal-card input:focus, 
        .modal-card textarea:focus {
            border-color: var(--neon-color) !important;
            box-shadow: 0 0 10px rgba(0, 242, 254, 0.4) !important;
        }

        .modal-card button:not(.dismiss-portal-btn) {
            width: 100% !important;
            background: var(--neon-color) !important;
            color: #04080f !important;
            font-weight: 800 !important;
            text-transform: uppercase !important;
            letter-spacing: 0.5px !important;
            border: none !important;
            border-radius: 10px !important;
            padding: 12px !important;
            cursor: pointer !important;
            transition: all 0.2s ease !important;
            font-size: 12px !important;
            margin-top: 8px !important;
        }

        .modal-card button:not(.dismiss-portal-btn):hover {
            box-shadow: 0 0 15px var(--neon-color) !important;
            transform: scale(1.01);
        }

        .modal-card label {
            font-size: 11px !important;
            font-family: monospace !important;
            color: var(--neon-color) !important;
            text-transform: uppercase !important;
            letter-spacing: 0.5px !important;
            display: block !important;
        }

        .modal-card h2 {
            font-size: 1.25rem !important;
            font-weight: 700 !important;
            color: var(--neon-color) !important;
            margin-bottom: 8px !important;
        }

        .modal-card p {
            font-size: 0.8rem !important;
            color: #94a3b8 !important;
            margin-bottom: 12px !important;
        }
    </style>
</head>
<body class="${themeClass}">

    <div class="header">
        <h1 class="logo">${title}</h1>
        <div class="subtitle">NEO-MINIMAL COMPACT DASHBOARD</div>
        <div class="nav-buttons">
            <button class="top-btn" id="themeBtn">🌓 Theme</button>
        </div>
    </div>

    <div class="search-box">
        <input type="text" id="searchInput" class="search-input" placeholder="🔍 Search your tools...">
    </div>

    <div class="tools-grid" id="toolsGrid">
        ${dashboardCardsHTML}
    </div>

    ${modalViewsHTML}

    <script>
        document.getElementById('themeBtn')?.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
        });

        document.getElementById('searchInput')?.addEventListener('keyup', (e) => {
            const query = e.target.value.toLowerCase();
            const cards = document.querySelectorAll('.premium-card');
            cards.forEach(card => {
                const title = card.innerText.toLowerCase();
                card.style.display = title.includes(query) ? "flex" : "none";
            });
        });

        function openToolModal(toolId) {
            const m = document.getElementById('modal_' + toolId);
            if (m) m.style.display = 'flex';
        }

        function closeToolModal(toolId) {
            const m = document.getElementById('modal_' + toolId);
            if (m) m.style.display = 'none';
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
