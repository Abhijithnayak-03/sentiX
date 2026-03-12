// ═══════════════════════════════════════════════
//  SentiMarket — app.js  v3.0
//  Modular SaaS-grade trading platform frontend
// ═══════════════════════════════════════════════

// ─── ASSET DATA MAP ──────────────────────────────
const ASSETS = {
    DOGE: {
        sym: 'DOGE', name: 'Dogecoin', emoji: '🐶',
        price: 0.1465, change: +3.93, basePrice: 0.13,
        sentiment: 'STRONGLY BULLISH', phase: 'MOMENTUM PHASE',
        hype: 82, mentions: '+41%', engagement: '+27%', sentStr: '+0.65', volume: '+18%',
        rsi: 'Bullish Range', ema: 'Above 20 EMA', volSpike: 'Detected',
        ai: {
            conservative: 'DOGE exhibits moderate bullish signals. Confidence at 82% — within cautious entry threshold. Recommend small position sizing. Risk is managed.',
            aggressive: 'STRONG BUY SIGNAL on DOGE! 41% mention spike + price above EMA = prime momentum entry. High conviction. Size up. Strike fast.',
            quant: 'DOGE/USD: Hype correlation coefficient 0.78 (short-term). RSI bullish range. Volume +18%. Model confidence: 82%. Entry probability: HIGH.',
            meme: 'DOGE IS MOONING 🚀🚀 Twitter exploding +41% mentions. Reddit apes loading up. Sentiment 65% bullish. MEME SEASON ACTIVATED. LFG!',
            institutional: 'DOGE shows social-driven price action. Current hype cycle suggests temporary momentum. Macro bias neutral. Position within risk parameters.',
        },
        corr: [0.78, 0.61, 0.54], confidence: 82,
    },
    PEPE: {
        sym: 'PEPE', name: 'Pepe Coin', emoji: '🐸',
        price: 0.0000156, change: +12.4, basePrice: 0.000012,
        sentiment: 'EXTREME BULLISH', phase: 'HYPE EXPLOSION',
        hype: 94, mentions: '+76%', engagement: '+55%', sentStr: '+0.81', volume: '+62%',
        rsi: 'Overbought Zone', ema: 'Above 20 EMA', volSpike: 'Extreme',
        ai: {
            conservative: 'PEPE is in extreme hype territory. Score 94/100 — high risk of reversal. Proceed with extreme caution. Small speculative positions only.',
            aggressive: 'PEPE is going parabolic. +76% mentions, +62% volume. This is a momentum play. Ride the wave but set trailing stops.',
            quant: 'PEPE: Hype-price correlation 0.91. RSI overbought at 78. Mean reversion risk elevated. Position size accordingly.',
            meme: 'PEPE TO THE MOON 🐸🚀 MEME SEASON AT PEAK. 76% mentions spike. FROG ARMY LOADING. DO NOT MISS THIS.',
            institutional: 'PEPE exhibits extreme speculative behavior. No fundamental basis. Avoid or hedge heavily. Treat as binary event.',
        },
        corr: [0.91, 0.72, 0.48], confidence: 76,
    },
    SOL: {
        sym: 'SOL', name: 'Solana', emoji: '◎',
        price: 143.90, change: +4.89, basePrice: 130,
        sentiment: 'BULLISH', phase: 'ACCUMULATION',
        hype: 68, mentions: '+22%', engagement: '+18%', sentStr: '+0.54', volume: '+11%',
        rsi: 'Neutral-Bullish', ema: 'Above 20 EMA', volSpike: 'Moderate',
        ai: {
            conservative: 'SOL shows steady accumulation with moderate hype (68/100). RSI neutral-bullish. Risk-adjusted entry reasonable at current levels.',
            aggressive: 'SOL breakout incoming. Above EMA with increasing volume. Ecosystem narrative strong. Add on dips.',
            quant: 'SOL/USD: Volume regression +11%. Price momentum score 0.64. Correlation with BTC at 0.61. Moderate conviction buy.',
            meme: 'SOL still got legs 🔮 Accumulation phase means smart money is in. Low-key bullish. DeFi szn loading.',
            institutional: 'SOL demonstrates healthy accumulation patterns. Ecosystem fundamentals strong. Suitable for medium-term position.',
        },
        corr: [0.64, 0.61, 0.55], confidence: 71,
    },
    AVAX: {
        sym: 'AVAX', name: 'Avalanche', emoji: 'A',
        price: 39.71, change: -7.13, basePrice: 42,
        sentiment: 'BEARISH', phase: 'CORRECTION',
        hype: 34, mentions: '-12%', engagement: '-8%', sentStr: '-0.28', volume: '-15%',
        rsi: 'Bearish Range', ema: 'Below 20 EMA', volSpike: 'Declining',
        ai: {
            conservative: 'AVAX is in correction territory. Sentiment declined. Below 20 EMA with weakening hype. Wait for reversal confirmation before entry.',
            aggressive: 'AVAX oversold dip. -7% one-day move might attract buyers. Contrarian play with tight stop-loss.',
            quant: 'AVAX/USD: Negative momentum confirmed. Hype correlation -0.28. Wait for volume reversal signal.',
            meme: 'AVAX down bad 📉 Sentiment shifted negative. Not the time to ape in. Wait for bounce signal.',
            institutional: 'AVAX correction appears healthy. Support at $36 region. Accumulate in tranches on further weakness.',
        },
        corr: [0.48, 0.42, 0.61], confidence: 55,
    },
    BTC: {
        sym: 'BTC', name: 'Bitcoin', emoji: '₿',
        price: 67420, change: +1.82, basePrice: 65000,
        sentiment: 'BULLISH', phase: 'STEADY UPTREND',
        hype: 71, mentions: '+15%', engagement: '+12%', sentStr: '+0.61', volume: '+9%',
        rsi: 'Bullish Range', ema: 'Above 20 EMA', volSpike: 'Moderate',
        ai: {
            conservative: 'BTC shows steady bullish momentum. 71/100 hype with controlled volume. Safe accumulation zone for long-term positioning.',
            aggressive: 'BTC institutional flows detected. +15% mention surge with price above key EMA. Strong buy signal.',
            quant: 'BTC/USD: Hype-price correlation 0.71. Volume baseline +9%. On-chain support confirmed. Confidence: HIGH.',
            meme: 'BTC steady as usual 👑 ETF inflows confirmed. Digital gold narrative strong. HODL mode activated.',
            institutional: 'BTC maintains macro bullish structure. ETF inflow data supports medium-term upside. Core holding confirmed.',
        },
        corr: [0.71, 0.65, 0.80], confidence: 80,
    },
    ETH: {
        sym: 'ETH', name: 'Ethereum', emoji: 'Ξ',
        price: 3280, change: +2.44, basePrice: 3100,
        sentiment: 'BULLISH', phase: 'RECOVERY',
        hype: 62, mentions: '+18%', engagement: '+14%', sentStr: '+0.52', volume: '+13%',
        rsi: 'Neutral-Bullish', ema: 'At 20 EMA', volSpike: 'Moderate',
        ai: {
            conservative: 'ETH in recovery phase. Hype at 62/100, trading at 20 EMA. Neutral-bullish setup with good risk-reward on breakout.',
            aggressive: 'ETH is coiling at EMA — breakout imminent. DeFi TVL recovering. Strong entry opportunity.',
            quant: 'ETH/USD: RSI neutral. Hype score 62. Gas fee trends normalizing. Upgrade narrative active. Moderate long.',
            meme: 'ETH recovery szn starting 🌀 Devs building, DeFi recovering. Layer-2 meta trending. Bullish.',
            institutional: 'ETH staking yield stable. Deflationary pressure from burns. Fundamental case strong for medium-term hold.',
        },
        corr: [0.68, 0.74, 0.78], confidence: 68,
    },
};

// ─── CURRENT STATE ───────────────────────────────
let currentAssetSym = 'DOGE';
let mainChart, candleSeries, volumeSeries;
let currentBar = null;
let bookmarked = false;
let notifCount = 3;
let searchFocusIdx = -1;
let currentSearchResults = [];

// ─── INIT ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initMainChart();
    initVolumeChart();
    initMiniHypeChart();
    initChatbot();
    startLiveFeed();
    initTickerTape();
    initKeyboardShortcuts();
    loadUserInfo();
    renderSearchResults('');

    setInterval(updateLiveCandle, 1000);
    setInterval(updateMarketStatusTime, 60000);
});

// ─── USER INFO ────────────────────────────────────
function loadUserInfo() {
    try {
        const u = JSON.parse(localStorage.getItem('smUser') || '{}');
        const name = u.name || u.username || u.email?.split('@')[0] || 'Trader';
        const initials = name.slice(0, 1).toUpperCase();
        const el = document.getElementById('userDisplayName');
        const ci = document.getElementById('userAvatarInitial');
        if (el) el.textContent = name;
        if (ci) ci.textContent = initials;
    } catch (e) { }
}

// ─── MARKET STATUS ────────────────────────────────
function updateMarketStatusTime() {
    const h = new Date().getHours();
    const isOpen = h >= 9 && h < 17;
    const pill = document.querySelector('.market-status-pill');
    if (pill) {
        pill.innerHTML = `<span class="status-dot"></span> LIVE &bull; ${isOpen ? 'MARKET OPEN' : 'AFTER HOURS'}`;
        pill.style.color = isOpen ? 'var(--green)' : 'var(--orange)';
        pill.style.borderColor = isOpen ? 'rgba(34,197,94,.3)' : 'rgba(249,115,22,.3)';
        pill.style.background = isOpen ? 'rgba(34,197,94,.1)' : 'rgba(249,115,22,.1)';
    }
}

// ─── TICKER TAPE ─────────────────────────────────
function initTickerTape() {
    const tape = document.getElementById('tickerTape');
    if (!tape) return;

    const items = Object.values(ASSETS);
    let html = '';
    // Build two copies for seamless looping
    for (let pass = 0; pass < 2; pass++) {
        items.forEach(a => {
            const upDown = a.change >= 0 ? 'up' : 'down';
            const sign = a.change >= 0 ? '+' : '';
            const priceStr = a.price < 0.01 ? a.price.toExponential(2) : (a.price < 10 ? '$' + a.price.toFixed(4) : '$' + a.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
            html += `<div class="ticker-item-tape" onclick="switchAsset('${a.sym}')">
                <span class="t-sym">${a.sym}</span>
                <span class="t-price">${priceStr}</span>
                <span class="t-chg ${upDown}">${sign}${a.change.toFixed(2)}%</span>
            </div>`;
        });
    }
    tape.innerHTML = html;
}

// ─── ASSET SWITCHING ─────────────────────────────
function switchAsset(sym) {
    const a = ASSETS[sym];
    if (!a) return;
    currentAssetSym = sym;

    // Close search modal
    closeSearchModal();

    // Update search box label
    const lbl = document.getElementById('searchBoxLabel');
    if (lbl) lbl.textContent = a.name;

    // Update KPI cards
    updateKPICards(a);

    // Update charts with new data
    if (candleSeries) {
        const data = generateCandleData(a.basePrice, 200);
        candleSeries.setData(data);
        const ma = computeMA(data, 20);
        if (mainChart) {
            const series = mainChart.series();
            if (series[1]) series[1].setData(ma);
        }
        currentBar = { ...data[data.length - 1] };
    }
    if (volumeSeries) {
        volumeSeries.setData(generateVolumeData(200));
    }

    // Update chart header label
    const sectionLbl = document.querySelector('.section-label');
    if (sectionLbl) sectionLbl.textContent = `${sym} PRICE & HYPE BREAKDOWN`;

    // Update AI panel
    updateAIPanel(a);

    // Update bottom cards
    updateBottomCards(a);

    // Update hype panel
    updateHypePanel(a);

    // Update momentum phase
    const mph = document.getElementById('momentumPhaseLabel');
    if (mph) mph.textContent = a.phase;

    // Toast notification
    showToast(`Switched to ${a.name}`, `Hype: ${a.hype}/100 · ${a.sentiment}`, a.change >= 0 ? 'success' : 'warning');
}

function updateKPICards(a) {
    // Asset card
    const kpiBig = document.querySelector('.kpi-card:first-child .kpi-big');
    const kpiSub = document.querySelector('.kpi-card:first-child .kpi-sub');
    if (kpiBig) kpiBig.textContent = a.sym;
    if (kpiSub) kpiSub.textContent = a.name;

    // Price card
    const priceEl = document.getElementById('priceDisplay');
    if (priceEl) {
        const sign = a.change >= 0 ? '+' : '';
        const cls = a.change >= 0 ? 'green-sm' : 'red-sm';
        const priceStr = a.price < 0.01 ? '$' + a.price.toExponential(4) : (a.price < 10 ? '$' + a.price.toFixed(4) : '$' + a.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        priceEl.innerHTML = `${priceStr} <span class="${cls}">${sign}${a.change.toFixed(2)}%</span>`;
    }

    // Sentiment card
    const sentBig = document.querySelectorAll('.kpi-card')[2]?.querySelector('.kpi-big');
    const sentBadge = document.querySelector('.badge-orange');
    if (sentBig) {
        sentBig.textContent = a.sentiment;
        sentBig.className = 'kpi-big ' + (a.change >= 0 ? 'green' : 'red');
    }
    if (sentBadge) {
        sentBadge.innerHTML = `⬤ ${a.phase}`;
        sentBadge.style.color = a.change >= 0 ? 'var(--orange)' : 'var(--red)';
        sentBadge.style.background = a.change >= 0 ? 'rgba(249,115,22,.15)' : 'rgba(239,68,68,.12)';
    }

    // Hype score number in panel
    document.querySelectorAll('.hype-num').forEach(el => el.textContent = a.hype);
    document.querySelectorAll('.hype-bar-fill').forEach(el => el.style.width = a.hype + '%');
    const extremeBadge = document.querySelector('.extreme-badge');
    if (extremeBadge) extremeBadge.textContent = a.hype >= 80 ? 'EXTREME HYPE' : a.hype >= 60 ? 'HIGH HYPE' : 'MODERATE HYPE';
}

function updateAIPanel(a) {
    const cfg = JSON.parse(localStorage.getItem('smSettings') || '{}');
    const personality = cfg.aiPersonality || 'conservative';
    const body = document.getElementById('aiExplBody');
    if (!body) return;
    body.style.opacity = '0';
    setTimeout(() => {
        body.innerHTML = a.ai[personality] || a.ai.conservative;
        body.style.opacity = '1';
        body.style.transition = 'opacity .4s';
    }, 250);
}

function updateBottomCards(a) {
    // Hype score breakdown
    const h2score = document.querySelector('.hype2-score');
    if (h2score) h2score.innerHTML = `Hype Score: <span class="orange">${a.hype}</span> <span class="muted">/100</span>`;

    const hstats = document.querySelectorAll('.bot-card:nth-child(2) .hstat');
    const vals = [a.mentions, a.engagement, a.sentStr, a.volume];
    hstats.forEach((hs, i) => {
        const valSpan = hs.querySelector('span:last-child');
        if (valSpan && vals[i]) {
            valSpan.textContent = vals[i];
            const isPos = !vals[i].startsWith('-');
            valSpan.className = isPos ? 'orange' : 'red';
        }
    });

    // Technical confirmation
    const techStatus = document.querySelector('.tech-status');
    const techList = document.querySelectorAll('.tech-list li');
    const confPct = document.getElementById('aiConfidencePct');
    if (techStatus) {
        techStatus.textContent = a.change >= 0 ? 'BULLISH CONFIRMED' : 'BEARISH SIGNAL';
        techStatus.style.color = a.change >= 0 ? 'var(--green)' : 'var(--red)';
    }
    if (confPct) confPct.textContent = a.confidence + '%';
    if (techList[0]) techList[0].innerHTML = `<span class="${a.change >= 0 ? 'green' : 'red'}">${a.change >= 0 ? '✓' : '✗'}</span> Price ${a.ema}`;
    if (techList[1]) techList[1].innerHTML = `<span class="${a.change >= 0 ? 'green' : 'red'}">${a.change >= 0 ? '✓' : '✗'}</span> Volume ${a.volSpike}`;
    if (techList[2]) techList[2].innerHTML = `<span class="${a.change >= 0 ? 'green' : 'red'}">${a.change >= 0 ? '✓' : '✗'}</span> RSI: ${a.rsi}`;

    // Correlation matrix
    updateCorrelationMatrix(a);
}

function updateHypePanel(a) {
    const hStats = document.querySelector('.hype-panel .hype-stats');
    if (!hStats) return;
    const labels = ['Mention Growth', 'Engagement Spike', 'Sentiment Strength', 'Volume Spike'];
    const vals = [a.mentions, a.engagement, a.sentStr, a.volume];
    hStats.querySelectorAll('.hstat').forEach((hs, i) => {
        if (i < labels.length) {
            const valSpan = hs.querySelector('span:last-child');
            const isPos = vals[i] && !vals[i].startsWith('-');
            hs.querySelector('span:first-child').textContent = labels[i];
            if (valSpan) { valSpan.textContent = vals[i]; valSpan.className = isPos ? 'green' : 'red'; }
        }
    });
    // Tickers row
    const tickItems = document.querySelectorAll('.ticker-item');
    if (tickItems[0]) {
        const corr = (ASSETS[currentAssetSym]?.corr || [0.78, 0.61, 0.54]);
        tickItems[0].querySelector('.tick-coin').textContent = currentAssetSym;
        tickItems[0].querySelector('.tick-v1').textContent = corr[0].toFixed(2) + '%';
        tickItems[0].querySelector('.tick-v2').textContent = '● ' + corr[0].toFixed(2);
        tickItems[1]?.querySelector('.tick-coin') && (tickItems[1].querySelector('.tick-coin').textContent = currentAssetSym);
        tickItems[1]?.querySelector('.tick-v1') && (tickItems[1].querySelector('.tick-v1').textContent = corr[1].toFixed(2));
    }
}

function updateCorrelationMatrix(a) {
    const corr = a.corr || [0.78, 0.61, 0.54];
    const matrixRows = document.querySelectorAll('.matrix-r');
    const clsMap = v => v >= 0.65 ? 'green' : 'orange';
    matrixRows.forEach((row, i) => {
        const spans = row.querySelectorAll('.orange, .green, .mrow-hi');
        spans.forEach(s => {
            if (corr[i] !== undefined) {
                s.textContent = s.classList.contains('mrow-hi') ? `⊕ ${corr[i].toFixed(2)}` : corr[i].toFixed(2);
                s.className = s.classList.contains('mrow-hi') ? `mrow-hi ${clsMap(corr[i])}` : clsMap(corr[i]);
            }
        });
    });
}

// ─── MAIN CANDLESTICK CHART ───────────────────────
function initMainChart() {
    const container = document.getElementById('mainChartContainer');
    if (!container) return;

    mainChart = LightweightCharts.createChart(container, {
        width: container.clientWidth || 500,
        height: container.clientHeight || 220,
        layout: {
            background: { type: 'solid', color: '#161b27' },
            textColor: '#6b7280',
        },
        grid: {
            vertLines: { color: 'rgba(255,255,255,0.04)' },
            horzLines: { color: 'rgba(255,255,255,0.04)' },
        },
        rightPriceScale: {
            borderColor: '#21293a',
            scaleMarksCount: 4,
        },
        timeScale: {
            borderColor: '#21293a',
            timeVisible: true,
            secondsVisible: false,
        },
        crosshair: {
            mode: 0,
            vertLine: { color: '#374151', width: 1, style: 1 },
            horzLine: { color: '#374151', width: 1, style: 1 },
        },
        handleScroll: true,
        handleScale: true,
    });

    candleSeries = mainChart.addCandlestickSeries({
        upColor: '#22c55e',
        downColor: '#ef4444',
        borderUpColor: '#22c55e',
        borderDownColor: '#ef4444',
        wickUpColor: '#22c55e',
        wickDownColor: '#ef4444',
    });

    const maSeries = mainChart.addLineSeries({
        color: '#eab308',
        lineWidth: 1.5,
        lineStyle: 0,
        priceLineVisible: false,
    });

    const candles = generateCandleData(ASSETS[currentAssetSym].basePrice, 200);
    candleSeries.setData(candles);
    const ma = computeMA(candles, 20);
    maSeries.setData(ma);
    currentBar = { ...candles[candles.length - 1] };

    // Wire timeframe tabs
    document.querySelectorAll('.ttab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.ttab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const tf = tab.textContent.trim();
            const count = tf === '1H' ? 60 : tf === '7D' ? 1440 : 200;
            const newCandles = generateCandleData(ASSETS[currentAssetSym].basePrice, count);
            candleSeries.setData(newCandles);
            const newMA = computeMA(newCandles, 20);
            maSeries.setData(newMA);
            currentBar = { ...newCandles[newCandles.length - 1] };
        });
    });

    const ro = new ResizeObserver(() => {
        if (mainChart && container.clientWidth > 0 && container.clientHeight > 0) {
            mainChart.applyOptions({
                width: container.clientWidth,
                height: container.clientHeight,
            });
        }
    });
    ro.observe(container);
}

// ─── VOLUME BAR CHART ─────────────────────────────
function initVolumeChart() {
    const container = document.getElementById('volumeContainer');
    if (!container) return;

    const volumeChart = LightweightCharts.createChart(container, {
        width: container.clientWidth || 500,
        height: container.clientHeight || 54,
        layout: { background: { color: '#161b27' }, textColor: '#6b7280' },
        grid: { vertLines: { visible: false }, horzLines: { visible: false } },
        rightPriceScale: { visible: false },
        leftPriceScale: { visible: false },
        timeScale: { visible: false },
        crosshair: { vertLine: { visible: false }, horzLine: { visible: false } },
        handleScroll: false,
        handleScale: false,
    });

    volumeSeries = volumeChart.addHistogramSeries({
        priceFormat: { type: 'volume' },
        priceScaleId: '',
    });

    const volData = generateVolumeData(200);
    volumeSeries.setData(volData);

    const ro = new ResizeObserver(() => {
        if (container.clientWidth > 0 && container.clientHeight > 0) {
            volumeChart.applyOptions({
                width: container.clientWidth,
                height: container.clientHeight,
            });
        }
    });
    ro.observe(container);
}

// ─── MINI HYPE CHART ──────────────────────────────
function initMiniHypeChart() {
    const ctx = document.getElementById('miniHypeChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
            datasets: [{
                data: [30, 42, 38, 55, 48, 65, 58, 70, 65, 78, 72, 85, 80, 82],
                borderColor: '#f97316',
                borderWidth: 1.5,
                pointRadius: 0,
                fill: false,
                tension: 0.4,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false }, tooltip: { enabled: false } },
            scales: { x: { display: false }, y: { display: false } },
            animation: false,
        }
    });
}

// ─── LIVE CANDLE UPDATE ───────────────────────────
function updateLiveCandle() {
    if (!candleSeries || !currentBar) return;

    const a = ASSETS[currentAssetSym];
    const volatility = a.price < 0.01 ? 0.0001 : a.price < 10 ? 0.002 : a.price * 0.0005;
    const change = (Math.random() - 0.48) * volatility;
    const newClose = Math.max(0.000001, currentBar.close + change);

    currentBar.high = Math.max(currentBar.high, newClose);
    currentBar.low = Math.min(currentBar.low, newClose);
    currentBar.close = newClose;
    candleSeries.update(currentBar);

    if (Math.random() < 0.017) {
        const nowSec = Math.floor(Date.now() / 1000);
        const isGreen = Math.random() > 0.4;
        const open = currentBar.close;
        const closeVal = open * (1 + (Math.random() - 0.48) * 0.02);
        currentBar = {
            time: nowSec,
            open: open,
            high: Math.max(open, closeVal) * (1 + Math.random() * 0.005),
            low: Math.min(open, closeVal) * (1 - Math.random() * 0.005),
            close: closeVal,
        };
        candleSeries.update(currentBar);

        if (volumeSeries) {
            volumeSeries.update({
                time: nowSec,
                value: Math.random() * 800 + 100,
                color: isGreen ? 'rgba(34,197,94,0.5)' : 'rgba(239,68,68,0.5)',
            });
        }
    }

    // Update price display
    const priceEl = document.getElementById('priceDisplay');
    if (priceEl) {
        const basePx = a.price;
        const pct = ((currentBar.close - basePx) / basePx * 100 + a.change).toFixed(2);
        const sign = pct >= 0 ? '+' : '';
        const priceStr = currentBar.close < 0.01 ? '$' + currentBar.close.toExponential(4) : (currentBar.close < 10 ? '$' + currentBar.close.toFixed(4) : '$' + currentBar.close.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        priceEl.innerHTML = `${priceStr} <span class="${pct >= 0 ? 'green-sm' : 'red-sm'}">${sign}${pct}%</span>`;
    }
}

// ─── DATA GENERATORS ──────────────────────────────
function generateCandleData(basePrice, count) {
    const data = [];
    const nowSec = Math.floor(Date.now() / 1000);
    const startTime = nowSec - count * 60;
    let price = basePrice;

    for (let i = 0; i < count; i++) {
        const open = price;
        const close = open * (1 + (Math.random() - 0.48) * 0.015);
        const high = Math.max(open, close) * (1 + Math.random() * 0.005);
        const low = Math.min(open, close) * (1 - Math.random() * 0.005);
        data.push({ time: startTime + i * 60, open, high, low, close });
        price = close;
    }
    return data;
}

function generateVolumeData(count) {
    const data = [];
    const nowSec = Math.floor(Date.now() / 1000);
    const startTime = nowSec - count * 60;

    for (let i = 0; i < count; i++) {
        const isGreen = Math.random() > 0.4;
        data.push({
            time: startTime + i * 60,
            value: Math.random() * 800 + 100,
            color: isGreen ? 'rgba(34,197,94,0.5)' : 'rgba(239,68,68,0.5)',
        });
    }
    return data;
}

function computeMA(candles, period) {
    const ma = [];
    for (let i = period - 1; i < candles.length; i++) {
        const sum = candles.slice(i - period + 1, i + 1).reduce((s, c) => s + c.close, 0);
        ma.push({ time: candles[i].time, value: sum / period });
    }
    return ma;
}

// ─── SEARCH MODAL ────────────────────────────────
function openSearchModal() {
    const overlay = document.getElementById('searchOverlay');
    const input = document.getElementById('searchMainInput');
    if (overlay) {
        overlay.classList.add('open');
        document.addEventListener('keydown', searchModalKeyHandler);
        setTimeout(() => { if (input) input.focus(); }, 50);
        renderSearchResults('');
    }
}

function closeSearchModal() {
    const overlay = document.getElementById('searchOverlay');
    if (overlay) {
        overlay.classList.remove('open');
        document.removeEventListener('keydown', searchModalKeyHandler);
        searchFocusIdx = -1;
        const input = document.getElementById('searchMainInput');
        if (input) input.value = '';
    }
}

function handleSearchOverlayClick(e) {
    if (e.target.id === 'searchOverlay') closeSearchModal();
}

function filterSearchAssets(query) {
    searchFocusIdx = -1;
    renderSearchResults(query);
}

function renderSearchResults(query) {
    const container = document.getElementById('searchResults');
    if (!container) return;

    const q = query.toLowerCase().trim();
    const all = Object.values(ASSETS);
    const filtered = q ? all.filter(a =>
        a.sym.toLowerCase().includes(q) ||
        a.name.toLowerCase().includes(q) ||
        a.sentiment.toLowerCase().includes(q)
    ) : all;

    currentSearchResults = filtered;

    if (!filtered.length) {
        container.innerHTML = `<div style="padding:20px;text-align:center;color:var(--muted);font-size:12px">No assets found for "${query}"</div>`;
        return;
    }

    let html = `<div class="search-section-label">Assets ${q ? '— Search Results' : '— All Markets'}</div>`;
    filtered.forEach((a, i) => {
        const sign = a.change >= 0 ? '+' : '';
        const dir = a.change >= 0 ? 'up' : 'down';
        const priceStr = a.price < 0.01 ? '$' + a.price.toExponential(2) : (a.price < 10 ? '$' + a.price.toFixed(4) : '$' + a.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        html += `<div class="search-asset-row" onclick="switchAsset('${a.sym}')" data-idx="${i}">
            <div class="search-asset-icon">${a.emoji}</div>
            <div class="search-asset-info">
                <div class="search-asset-sym">${a.sym} ${a.sym === currentAssetSym ? '<span class="badge-new">ACTIVE</span>' : ''}</div>
                <div class="search-asset-name">${a.name} · Hype ${a.hype}/100</div>
            </div>
            <div class="search-asset-right">
                <div class="search-asset-price">${priceStr}</div>
                <div class="search-asset-chg ${dir}">${sign}${a.change.toFixed(2)}%</div>
            </div>
        </div>`;
    });

    container.innerHTML = html;
}

function searchModalKeyHandler(e) {
    const rows = document.querySelectorAll('.search-asset-row');
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        searchFocusIdx = Math.min(searchFocusIdx + 1, rows.length - 1);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        searchFocusIdx = Math.max(searchFocusIdx - 1, 0);
    } else if (e.key === 'Enter' && searchFocusIdx >= 0) {
        const asset = currentSearchResults[searchFocusIdx];
        if (asset) switchAsset(asset.sym);
        return;
    } else if (e.key === 'Escape') {
        closeSearchModal();
        return;
    }
    rows.forEach((r, i) => r.classList.toggle('focused', i === searchFocusIdx));
    if (searchFocusIdx >= 0 && rows[searchFocusIdx]) {
        rows[searchFocusIdx].scrollIntoView({ block: 'nearest' });
    }
}

// ─── ALERTS HANDLER ───────────────────────────────
function handleAlertsClick() {
    if (notifCount > 0) {
        notifCount--;
        const b = document.getElementById('alertCount');
        const n = document.getElementById('alertCountNav');
        if (b) { b.textContent = notifCount; if (notifCount === 0) b.style.display = 'none'; }
        if (n) { n.textContent = notifCount; if (notifCount === 0) n.style.display = 'none'; }
    }
    const msgs = [
        ['⚠ Price Alert', 'AVAX crossed below $40.00 support'],
        ['🔥 Hype Alert', 'PEPE hype score surged to 94/100'],
        ['📡 Sentiment Alert', 'DOGE sentiment shifted strongly bullish'],
    ];
    const msg = msgs[Math.max(0, 2 - notifCount)] || msgs[0];
    showToast(msg[0], msg[1], 'warning');
}

// ─── NAV TAB SWITCHER ─────────────────────────────
function switchTab(e, tab) {
    e.preventDefault();
    document.querySelectorAll('.snav-link').forEach(l => l.classList.remove('active'));
    e.target.classList.add('active');
    if (tab === 'analysis') {
        showToast('📊 Analysis Mode', 'Advanced signal analysis view (coming soon)', 'info');
    }
}

// ─── TOAST SYSTEM ─────────────────────────────────
function showToast(title, msg, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const icons = { success: '✓', warning: '⚠', error: '✗', info: 'ℹ' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="toast-icon">${icons[type] || 'ℹ'}</div>
        <div class="toast-body">
            <div class="toast-title">${title}</div>
            ${msg ? `<div class="toast-msg">${msg}</div>` : ''}
        </div>
        <button class="toast-close" onclick="dismissToast(this.parentElement)">×</button>`;

    container.appendChild(toast);

    setTimeout(() => dismissToast(toast), 4000);
}

function dismissToast(el) {
    if (!el || !el.parentElement) return;
    el.classList.add('toast-exit');
    setTimeout(() => el.remove(), 280);
}

// ─── BOOKMARK ─────────────────────────────────────
function toggleBookmark(btn) {
    bookmarked = !bookmarked;
    const icon = document.getElementById('bookmarkIcon');
    if (bookmarked) {
        btn.style.color = '#22c55e';
        if (icon) { icon.setAttribute('fill', '#22c55e'); icon.setAttribute('stroke', '#22c55e'); }
        showToast('🔖 Bookmarked', `${ASSETS[currentAssetSym].name} saved to watchlist`, 'success');
    } else {
        btn.style.color = '';
        if (icon) { icon.setAttribute('fill', 'none'); icon.setAttribute('stroke', 'currentColor'); }
        showToast('Bookmark removed', `${ASSETS[currentAssetSym].name} removed from watchlist`, 'info');
    }
}

// ─── CHATBOT ──────────────────────────────────────
function initChatbot() {
    const input = document.getElementById('chatInput');
    const sendBtn = document.getElementById('chatSend');
    const messages = document.getElementById('chatWindow');

    if (!input || !sendBtn || !messages) return;

    function getAssetResponse(text) {
        const t = text.toLowerCase();
        const a = ASSETS[currentAssetSym];
        if (t.includes('buy') || t.includes('long') || t.includes('bullish')) {
            return a.change >= 0
                ? `${a.sym} looks ${a.sentiment.toLowerCase()}. Hype ${a.hype}/100 with ${a.mentions} mention growth. Consider entry with stop below 20 EMA.`
                : `${a.sym} is currently ${a.sentiment.toLowerCase()}. Caution advised — wait for sentiment reversal before buying.`;
        }
        if (t.includes('sell') || t.includes('short') || t.includes('bearish')) {
            return a.change < 0
                ? `${a.sym} showing bearish signals. RSI: ${a.rsi}. Consider taking profits or reducing exposure.`
                : `${a.sym} is bullish. No sell signal yet. Monitor if hype drops below 50/100.`;
        }
        if (t.includes('hype') || t.includes('sentiment') || t.includes('social')) {
            return `${a.sym} hype score: ${a.hype}/100. Mentions: ${a.mentions} · Engagement: ${a.engagement} · Sentiment: ${a.sentStr}. Phase: ${a.phase}.`;
        }
        if (t.includes('price') || t.includes('prediction') || t.includes('target')) {
            const conf = a.confidence;
            return `${a.sym} AI confidence: ${conf}%. Current trend: ${a.sentiment}. Volume spike: ${a.volume}. Correlation accuracy: ${a.corr?.[0]?.toFixed(2) || 'N/A'}.`;
        }
        const responses = [
            `${a.sym} is showing ${a.sentiment.toLowerCase()} signals with hype at ${a.hype}/100 and ${a.mentions} mention growth.`,
            `Based on ${a.name} data: sentiment confidence ${a.confidence}%, social momentum ${a.engagement}, volume ${a.volume}.`,
            `${a.sym} phase: ${a.phase}. Key levels based on 20 EMA. Monitor RSI: currently ${a.rsi}.`,
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    function sendMessage() {
        const text = input.value.trim();
        if (!text) return;

        // User message
        const userDiv = document.createElement('div');
        userDiv.style.cssText = 'text-align:right;margin-bottom:6px';
        userDiv.innerHTML = `<span style="background:var(--accent,#22c55e);color:#000;padding:4px 10px;border-radius:12px 12px 0 12px;font-size:11px;font-weight:600;display:inline-block">${text}</span>`;
        messages.appendChild(userDiv);
        input.value = '';
        messages.scrollTop = messages.scrollHeight;

        // Typing indicator
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.innerHTML = '<span></span><span></span><span></span>';
        messages.appendChild(typingDiv);
        messages.scrollTop = messages.scrollHeight;

        setTimeout(() => {
            typingDiv.remove();
            const botDiv = document.createElement('div');
            botDiv.style.cssText = 'margin-bottom:6px';
            const reply = getAssetResponse(text);
            botDiv.innerHTML = `<span style="font-size:11px;color:#94a3b8;display:block;background:rgba(34,197,94,.06);padding:6px 10px;border-radius:6px 12px 12px 6px">🤖 ${reply}</span>`;
            messages.appendChild(botDiv);
            messages.scrollTop = messages.scrollHeight;
        }, 1000 + Math.random() * 400);
    }

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(); });
}

// ─── LIVE FEED ────────────────────────────────────
function startLiveFeed() {
    const items = [
        { icon: '🐦', text: () => `Twitter: ${ASSETS[currentAssetSym].name} whale movement detected`, type: 'green' },
        { icon: '📰', text: () => `News: ${ASSETS[currentAssetSym].name} adoption trends rising`, type: 'orange' },
        { icon: '🔔', text: () => `Alert: ${ASSETS[currentAssetSym].sym} hype score at ${ASSETS[currentAssetSym].hype}/100`, type: 'orange' },
        { icon: '💬', text: () => `Reddit: r/${ASSETS[currentAssetSym].name.toLowerCase()} trending posts spike`, type: 'green' },
        { icon: '📊', text: () => `Analysis: ${ASSETS[currentAssetSym].sym} ${ASSETS[currentAssetSym].sentiment.toLowerCase()} setup confirmed`, type: 'green' },
        { icon: '📰', text: () => `News: Institutional interest in ${ASSETS[currentAssetSym].sym} growing`, type: 'orange' },
    ];

    setInterval(() => {
        const fl = document.getElementById('feedList');
        if (!fl) return;

        const item = items[Math.floor(Math.random() * items.length)];
        const mins = Math.floor(Math.random() * 15) + 1;
        const timeStr = mins === 1 ? 'just now' : `${mins} min ago`;

        const div = document.createElement('div');
        div.className = 'feed-item feed-new';
        div.innerHTML = `
            <span class="feed-icon ${item.type}">${item.icon}</span>
            <div class="feed-body">
                <div class="feed-text">${item.text()}</div>
                <div class="feed-time">${timeStr}</div>
            </div>`;

        fl.insertBefore(div, fl.firstChild);
        while (fl.children.length > 6) fl.removeChild(fl.lastChild);
    }, 7000);
}

// ─── USER GUIDE MODAL ─────────────────────────────
function openGuide(e) {
    if (e) e.preventDefault();
    const overlay = document.getElementById('guideOverlay');
    if (overlay) {
        overlay.classList.add('open');
        document.addEventListener('keydown', guideEsc);
    }
}

function closeGuide(e) {
    if (e && e.target && e.target.id !== 'guideOverlay') return;
    const overlay = document.getElementById('guideOverlay');
    if (overlay) {
        overlay.classList.remove('open');
        document.removeEventListener('keydown', guideEsc);
    }
}

function guideEsc(e) {
    if (e.key === 'Escape') closeGuide();
}

// ─── KEYBOARD SHORTCUTS ───────────────────────────
function initKeyboardShortcuts() {
    document.addEventListener('keydown', e => {
        // Skip if inside input/textarea
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        if (e.key === 'k' || e.key === 'K') {
            e.preventDefault();
            openSearchModal();
        } else if (e.key === 'b' || e.key === 'B') {
            const btn = document.getElementById('bookmarkBtn');
            if (btn) toggleBookmark(btn);
        } else if (e.key === 'Escape') {
            closeSearchModal();
            closeGuide();
        } else if (e.key === '?' || e.key === '/') {
            showToast('⌨ Keyboard Shortcuts', 'K=Search  B=Bookmark  Esc=Close  ?=Help', 'info');
        }
    });
}

// ─── ASSET ROW CLICK (right panel) ────────────────
document.addEventListener('DOMContentLoaded', () => {
    const assetMap = {
        'ar-doge': 'DOGE',
    };
    document.querySelectorAll('.asset-row').forEach(row => {
        row.addEventListener('click', (e) => {
            if (e.target.closest('.wl-arrow-btn')) return;
            const sym = assetMap[row.id] ||
                row.querySelector('.asset-name')?.textContent?.trim()?.split(' ')[0];
            if (sym && ASSETS[sym]) switchAsset(sym);
        });
    });

    // Wire PEPE, SOL, AVAX rows
    const rows = document.querySelectorAll('.asset-row');
    const syms = ['DOGE', 'PEPE', 'SOL', 'AVAX'];
    rows.forEach((row, i) => {
        if (syms[i]) {
            row.addEventListener('click', (e) => {
                if (!e.target.closest('.wl-arrow-btn')) switchAsset(syms[i]);
            });
        }
    });
});
