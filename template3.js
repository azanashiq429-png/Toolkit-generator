<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AZAN TOOLS - Advanced Web Toolkit</title>
    <style>
        /* Base Styling & Background Theme */
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
            --panel-border: rgba(255, 255, 255, 0.05);
            --card-base-bg: linear-gradient(180deg, #0e1626 0%, #060a12 100%);
        }

        /* Light Mode Variables */
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

        /* Top Header & Logo Style */
        .header {
            text-align: center;
            margin-top: 35px;
            margin-bottom: 25px;
            width: 100%;
            max-width: 440px;
            position: relative;
        }

        .logo {
            font-size: 2.8rem;
            font-weight: 900;
            letter-spacing: 3px;
            text-transform: uppercase;
            color: #ffffff;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 0 0 18px #00f2fe, 0 0 35px #0072ff;
            margin: 0;
            cursor: pointer;
        }

        body.light-mode .logo {
            color: #1e293b;
            text-shadow: 0 0 10px rgba(0, 114, 255, 0.2), 0 0 18px #0072ff;
        }

        .subtitle {
            color: #8fa0dd;
            font-size: 0.85rem;
            margin-top: 6px;
            letter-spacing: 1.5px;
            font-weight: 600;
            text-transform: uppercase;
            text-shadow: 0 0 5px rgba(0, 242, 254, 0.3);
        }
        body.light-mode .subtitle { color: #475569; }

        /* Theme Toggle Button */
        .nav-buttons {
            position: absolute;
            top: 5px;
            right: 0;
            display: flex;
            gap: 6px;
        }

        .top-btn {
            background: var(--panel-bg);
            border: 1.5px solid rgba(0, 242, 254, 0.4);
            color: var(--text-color);
            padding: 6px 12px;
            border-radius: 10px;
            cursor: pointer;
            font-size: 0.75rem;
            font-weight: bold;
            box-shadow: 0 4px 10px rgba(0,0,0,0.2);
            transition: all 0.3s;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }

        .top-btn:hover {
            border-color: #00f2fe;
            box-shadow: 0 0 10px rgba(0, 242, 254, 0.4);
        }

        /* Search Box */
        .search-box {
            width: 100%;
            max-width: 440px;
            margin-bottom: 20px;
        }

        .search-input {
            width: 100%;
            padding: 12px 18px;
            background: var(--card-base-bg);
            border: 1.5px solid rgba(0, 242, 254, 0.3);
            border-radius: 14px;
            color: var(--text-color);
            font-size: 0.95rem;
            outline: none;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            transition: all 0.3s;
        }

        .search-input:focus {
            border-color: #00f2fe;
            box-shadow: 0 0 12px rgba(0, 242, 254, 0.4);
        }

        /* Tools Grid Container for Your Cards */
        .tools-grid {
            width: 100%;
            max-width: 440px;
            display: flex;
            flex-direction: column;
            gap: 14px;
        }

        /* Individual Tool Card Style Template */
        .tool-card {
            background: var(--card-base-bg);
            border: 1.5px solid rgba(0, 242, 254, 0.25);
            border-radius: 16px;
            padding: 18px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            text-decoration: none;
            color: var(--text-color);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
            transition: all 0.3s ease;
        }

        .tool-card:hover {
            transform: translateY(-3px);
            border-color: #00f2fe;
            box-shadow: 0 8px 25px rgba(0, 242, 254, 0.3);
        }

        .tool-info {
            display: flex;
            align-items: center;
            gap: 14px;
        }

        .tool-icon {
            font-size: 1.6rem;
            background: var(--panel-bg);
            padding: 10px;
            border-radius: 12px;
            border: 1px solid rgba(0, 242, 254, 0.2);
        }

        .tool-title {
            font-size: 1rem;
            font-weight: 700;
            letter-spacing: 0.5px;
            color: var(--text-color);
        }

        .tool-desc {
            font-size: 0.75rem;
            color: #8fa0dd;
            margin-top: 3px;
        }
        body.light-mode .tool-desc { color: #475569; }

        .arrow-icon {
            color: #00f2fe;
            font-weight: bold;
            font-size: 1.1rem;
        }
    </style>
</head>
<body>

    <div class="header">
        <h1 class="logo">AZAN TOOLS</h1>
        <div class="subtitle">Web Toolkit Dashboard</div>
        <div class="nav-buttons">
            <button class="top-btn" id="themeBtn">🌓 Theme</button>
        </div>
    </div>

    <!-- Search Bar -->
    <div class="search-box">
        <input type="text" id="searchInput" class="search-input" placeholder="🔍 Search your tools...">
    </div>

    <!-- 🚀 Yahan aapke apne add kiye hue cards aayenge -->
    <div class="tools-grid" id="toolsGrid">
        
        <!-- Sample Card 1 (Aap isko copy karke apne baki tools add kar sakte hain) -->
        <a href="tool1.html" class="tool-card">
            <div class="tool-info">
                <div class="tool-icon">⚡</div>
                <div>
                    <div class="tool-title">Tool Name 1</div>
                    <div class="tool-desc">Short description of your tool</div>
                </div>
            </div>
            <div class="arrow-icon">➔</div>
        </a>

        <!-- Sample Card 2 -->
        <a href="tool2.html" class="tool-card">
            <div class="tool-info">
                <div class="tool-icon">🛠️</div>
                <div>
                    <div class="tool-title">Tool Name 2</div>
                    <div class="tool-desc">Short description of your tool</div>
                </div>
            </div>
            <div class="arrow-icon">➔</div>
        </a>

    </div>

    <script>
        // Theme Toggle Functionality
        const themeBtn = document.getElementById('themeBtn');
        if(themeBtn) {
            themeBtn.addEventListener('click', () => {
                document.body.classList.toggle('light-mode');
            });
        }

        // Simple Search Filter Functionality
        const searchInput = document.getElementById('searchInput');
        const toolsGrid = document.getElementById('toolsGrid');
        const cards = toolsGrid.getElementsByClassName('tool-card');

        searchInput.addEventListener('keyup', (e) => {
            const query = e.target.value.toLowerCase();
            Array.from(cards).forEach(card => {
                const title = card.querySelector('.tool-title').innerText.toLowerCase();
                const desc = card.querySelector('.tool-desc').innerText.toLowerCase();
                if(title.includes(query) || desc.includes(query)) {
                    card.style.display = "flex";
                } else {
                    card.style.display = "none";
                }
            });
        });
    </script>
</body>
</html>
  
