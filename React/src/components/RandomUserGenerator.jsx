import React, { useEffect, useState } from 'react'

const RandomUserGenerator = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchUser = async () => {
        setLoading(true);
        const response = await fetch('https://randomuser.me/api/');
        const data = await response.json();

        setUser(data.results[0]);
        setLoading(false);
    }

    useEffect(() => {
        fetchUser();
    }, [])

    return (
    <div>
        {/* If loading is true OR user hasn't arrived yet, show Loading */}
        {loading || !user ? (
            <p>Loading...</p>
        ) : (
            <div>
                <img src={user.picture.large} alt="User" />
                <h2>{user.name.first} {user.name.last}</h2>
                <p>{user.email}</p>
                <button onClick={fetchUser}>Generate New User</button>
            </div>
        )}
    </div>
    )
}

export default RandomUserGenerator