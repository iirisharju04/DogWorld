import { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {

    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('favorites');

        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    return (
        <FavoritesContext.Provider value={{ favorites, setFavorites }}>
            {children}
        </FavoritesContext.Provider>
    );
}