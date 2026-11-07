import { useEffect, useState} from "react";
import {getAllBreeds} from "../services/dogImageApi.js";
import { Link } from 'react-router-dom';

function Breeds() {
    const [breeds, setBreeds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() =>{
        async function fetchBreeds(){
            try {
                const data = await getAllBreeds();
                setBreeds(Object.keys(data));
            } catch (error) {
                setError(error.message);
            }finally {
                setLoading(false);
            }
        }
        fetchBreeds();
        }, []);

    return(
        <div>
            <h1>Koirarodut</h1>

            {loading && <p>Haetaan koirarotuja...</p>}

            {error && <p>{error}</p>}

            {!loading && !error && (
                <ul>
                    {breeds.map((breed) => (
                        <li key={breed}>
                            <Link to={`/breed/${breed}`}>
                                {breed.charAt(0).toUpperCase() + breed.slice(1)}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Breeds;