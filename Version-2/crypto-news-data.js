/* SentiMarket shared cryptocurrency.cv news/sentiment client */
(function () {
    'use strict';

    const BASE_URL = 'https://cryptocurrency.cv';
    const SYMBOL_TOPICS = {
        BTC: 'bitcoin',
        ETH: 'ethereum',
        SOL: 'solana',
        DOGE: 'dogecoin',
        PEPE: 'pepe',
        AVAX: 'avalanche',
    };

    function getConfig() {
        const runtime = window.SENTI_API_CONFIG || {};
        const news = runtime.cryptoNews || {};
        return {
            baseUrl: String(news.baseUrl || BASE_URL).replace(/\/$/, ''),
            timeoutMs: Number(news.timeoutMs || runtime.timeoutMs || 8000),
        };
    }

    async function fetchJson(path, params = {}) {
        const cfg = getConfig();
        const url = new URL(cfg.baseUrl + path);
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') url.searchParams.set(key, value);
        });

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), cfg.timeoutMs);
        try {
            const response = await fetch(url.toString(), {
                headers: { Accept: 'application/json' },
                signal: controller.signal,
            });
            if (!response.ok) throw new Error(`cryptocurrency.cv HTTP ${response.status}`);
            return await response.json();
        } finally {
            clearTimeout(timeoutId);
        }
    }

    function asArray(payload) {
        if (Array.isArray(payload)) return payload;
        return payload?.articles || payload?.news || payload?.items || payload?.data || payload?.results || [];
    }

    function getSentiment(item) {
        return String(item.sentiment || item.tone || item.label || item.analysis?.sentiment || 'neutral').toLowerCase();
    }

    function normalizeArticle(item) {
        const title = item.title || item.headline || item.name || '';
        const source = item.source?.name || item.source || item.publisher || item.site || 'cryptocurrency.cv';
        const url = item.url || item.link || item.href || '';
        const publishedAt = item.publishedAt || item.published_at || item.date || item.createdAt || item.time || '';
        return {
            title,
            source: typeof source === 'string' ? source : 'cryptocurrency.cv',
            url,
            publishedAt,
            sentiment: getSentiment(item),
            summary: item.summary || item.description || item.excerpt || '',
        };
    }

    async function getNews(options = {}) {
        const limit = options.limit || 10;
        const query = options.query || '';
        const payload = query
            ? await fetchJson('/api/search', { q: query, limit })
            : await fetchJson('/api/news', { limit });
        return asArray(payload).map(normalizeArticle).filter(item => item.title);
    }

    async function getAssetNews(symbol, limit = 12) {
        const topic = SYMBOL_TOPICS[String(symbol || '').toUpperCase()] || symbol;
        return getNews({ query: topic, limit });
    }

    function deriveSignal(articles) {
        const total = articles.length;
        const positive = articles.filter(item => item.sentiment.includes('positive') || item.sentiment.includes('bull')).length;
        const negative = articles.filter(item => item.sentiment.includes('negative') || item.sentiment.includes('bear')).length;
        const neutral = Math.max(0, total - positive - negative);
        const score = total ? (positive - negative) / total : 0;
        const hype = Math.max(10, Math.min(95, Math.round(35 + total * 4 + Math.abs(score) * 25)));

        return {
            total,
            positive,
            negative,
            neutral,
            score,
            hype,
            sentiment: score > 0.2 ? 'BULLISH' : score < -0.2 ? 'BEARISH' : 'NEUTRAL',
        };
    }

    window.SentiNewsData = {
        providerName: 'cryptocurrency.cv',
        getNews,
        getAssetNews,
        deriveSignal,
    };
})();
