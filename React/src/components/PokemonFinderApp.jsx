import React, { useEffect, useState } from 'react'

const PokemonFinderApp = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const searchPokemon = async (e) => {
        e.preventDefault();
        if (!searchTerm) return;

        setLoading(true);
        setError("");

        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
            if (!response.ok) throw new Error("Pokemon not found!");

            const data = await response.json();
            setPokemon(data);
        } catch (err) {
            setError(err.message);
            setPokemon(null);
        } finally {
            setLoading(false);
        }
    }

    const typeColors = {
        fire: '#FDDFDF',
        grass: '#DEFDE0',
        electric: '#FCF7DE',
        water: '#DEF3FD',
        ground: '#f4e7da',
    
    };

  return (
    <div>
        <form onSubmit={searchPokemon}>
            <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search name or ID (e.g. bulbasaur or 1)"
            />
            <button type='submit'>Search</button>
        </form>

        {/* Step 4: Conditional Rendering of the Pokemon Card */}
        {loading && <p>Searching the Pokedex...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {pokemon && !loading && (
            <div style={{
                marginTop: '30px',
                padding: '20px',
                borderRadius: '20px',
                width: '300px',
                textAlign: 'center',
                boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                // Dynamic background color based on the first type
                backgroundColor: typeColors[pokemon.types[0].type.name] || '#f4f4f4',
                border: '5px solid #fff'
            }}>
                {/* ID and Name */}
                <p style={{ fontWeight: 'bold', color: 'rgba(0,0,0,0.5)' }}>
                    #{pokemon.id.toString().padStart(3, '0')}
                </p>
                
                <img 
                    src={pokemon.sprites.other["official-artwork"].front_default} 
                    alt={pokemon.name}
                    style={{ width: '180px', height: '180px' }}
                />

                <h2 style={{ textTransform: 'capitalize', margin: '10px 0' }}>
                    {pokemon.name}
                </h2>

                {/* Mapping through Types (e.g., Grass / Poison) */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    {pokemon.types.map((t, index) => (
                        <span key={index} style={{
                            padding: '5px 12px',
                            borderRadius: '20px',
                            backgroundColor: 'rgba(255,255,255,0.5)',
                            fontSize: '0.8rem',
                            fontWeight: 'bold',
                            textTransform: 'uppercase'
                        }}>
                            {t.type.name}
                        </span>
                    ))}
                </div>

                {/* Mapping through Stats */}
                <div style={{ marginTop: '20px', textAlign: 'left' }}>
                    {pokemon.stats.slice(0, 3).map((s, index) => (
                        <div key={index} style={{ marginBottom: '10px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                <span style={{ textTransform: 'capitalize' }}>{s.stat.name}</span>
                                <span>{s.base_stat}</span>
                            </div>
                            {/* Visual Progress Bar */}
                            <div style={{ height: '8px', background: '#eee', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{ 
                                    width: `${(s.base_stat / 150) * 100}%`, 
                                    height: '100%', 
                                    background: '#777',
                                    transition: 'width 1s ease-in-out'
                                }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
    </div>
    )
}

export default PokemonFinderApp