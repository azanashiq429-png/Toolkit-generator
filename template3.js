export function generateTemplate3(title, themeClass, dashboardCardsHTML, modalViewsHTML, coreExecutableJS) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - Neo-Minimal</title>
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
        }

        body.light-mode {
            --bg-color: #f1f5f9;
            --bg-gradient: radial-gradient(circle at 50% 0%, #cbd5e1 0%, #f1f5f9 70%, #e2e8f0 100%);
            --text-color: #0f172a;
            --panel-bg: #ffffff;
            --panel-border: rgba(0, 0, 0, 0.1);
            --card-base-bg: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
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
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 0 0 18px #00f2fe;
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
            border-color: #00f2fe;
        }

        .icon-sphere {
            font-size: 1.4rem;
            color: #00f2fe;
            margin-right: 12px;
        }

        .card-title {
            font-size: 0.95rem;
            font-weight: 700;
            flex-grow: 1;
        }

        .glowing-launch-btn {
            background: #00f2fe;
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
            border: 1px solid #00f2fe;
            width: 100%;
            max-width: 500px;
            padding: 25px;
            border-radius: 20px;
            position: relative;
        }

        .dismiss-portal-btn {
            position: absolute;
            top: 15px;
            right: 20px;
            color: #9ca3af;
            font-size: 24px;
            cursor: pointer;
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
