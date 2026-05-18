import React, { useEffect, useState } from 'react'

const CryptoTrackerApp = () => {

    const [coins, setCoins] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
    const fetchCoins = async () => {
        try {
            setLoading(true);
            setError("");
            
            const apiKey = "CG-9M3SvXyfPx1rR5H5yvyU6VEt"; 
            
            const response = await fetch(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&x_cg_demo_api_key=${apiKey}`
            );
            
            if (!response.ok) throw new Error("Unable to load market data. Please try again later.");

            const data = await response.json();
            setCoins(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    fetchCoins();
    }, []);

    const filteredCoins = coins.filter(coin => {
        return coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    })
  return (
        <div style={{ padding: '30px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '10px', color: '#111' }}>Crypto Dashboard</h1>
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>Live tracking of top 50 cryptocurrencies</p>
            
            {/* Search Component */}
            <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'center' }}>
                <input 
                    type="text"
                    placeholder="Search by name or symbol (e.g., btc, eth, sol)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: '100%',
                        maxWidth: '500px',
                        padding: '12px 20px',
                        borderRadius: '25px',
                        border: '1px solid #ddd',
                        fontSize: '1rem',
                        outline: 'none',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.03)'
                    }}
                />
            </div>

            {/* Status Messages */}
            {loading && <p style={{ textAlign: 'center', color: '#555' }}>Fetching real-time asset data...</p>}
            {error && <p style={{ textAlign: 'center', color: '#e71d36', fontWeight: 'bold' }}>{error}</p>}

            {/* Dashboard Data Grid */}
            {!loading && !error && (
                <div style={{ overflowX: 'auto', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', backgroundColor: '#fff' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #eee' }}>
                                <th style={{ padding: '16px' }}>Rank</th>
                                <th style={{ padding: '16px' }}>Asset</th>
                                <th style={{ padding: '16px' }}>Ticker</th>
                                <th style={{ padding: '16px' }}>Price</th>
                                <th style={{ padding: '16px' }}>24h Volatility</th>
                                <th style={{ padding: '16px' }}>Market Cap</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCoins.map((coin) => {
                                // Dynamic UI check: determines color token based on market trend
                                const isPositive = coin.price_change_percentage_24h >= 0;
                                
                                return (
                                    <tr key={coin.id} style={{ borderBottom: '1px solid #f0f0f0', transition: 'background 0.2s' }}>
                                        <td style={{ padding: '16px', color: '#888' }}>{coin.market_cap_rank}</td>
                                        
                                        {/* Coin Logo & Clean Typography Alignment */}
                                        <td style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '600', color: '#222' }}>
                                            <img src={coin.image} alt={coin.name} style={{ width: '24px', height: '24px' }} />
                                            {coin.name}
                                        </td>
                                        
                                        <td style={{ padding: '16px', textTransform: 'uppercase', color: '#666', fontSize: '0.9rem' }}>
                                            {coin.symbol}
                                        </td>
                                        
                                        {/* Standardized Currency Output formatting */}
                                        <td style={{ padding: '16px', fontWeight: '600', color: '#222' }}>
                                            ${coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </td>
                                        
                                        {/* Dynamic UI execution */}
                                        <td style={{ 
                                            padding: '16px', 
                                            fontWeight: 'bold', 
                                            color: isPositive ? '#2ec4b6' : '#e71d36' 
                                        }}>
                                            {isPositive ? '▲ +' : '▼ '}{(coin.price_change_percentage_24h ?? 0).toFixed(2)}%
                                        </td>
                                        
                                        <td style={{ padding: '16px', color: '#444' }}>
                                            ${coin.market_cap.toLocaleString()}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    
                    {/* Empty Search Guard State */}
                    {filteredCoins.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '30px', color: '#777' }}>
                            No market assets match your search criteria.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default CryptoTrackerApp;