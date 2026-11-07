
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRandomBreedImage } from '../services/dogImageApi.js';

function Home() {
    const [dogImage, setDogImage] = useState('');

    useEffect(() => {
        async function fetchDogImage() {
            try {
                const image = await getRandomBreedImage('retriever/golden');
                setDogImage(image);
            } catch (error) {
                console.error('Koirakuvan hakeminen epäonnistui:', error);
            }
        }

        fetchDogImage();
    }, []);

    return (
        <main className="home-container">
            <section className="home-hero">
                <div className="home-intro">
                    <p className="home-subtitle">TERVETULOA KOIRIEN MAAILMAAN</p>
                    <h1>Welcome to Dog World</h1>
                    <p>
                        Tutustu erilaisiin koirarotuihin, löydä omat suosikkisi
                        ja vertaile koirien ominaisuuksia.
                    </p>

                    <Link to="/breeds" className="home-button">
                        Tutustu koirarotuihin
                    </Link>
                </div>

                {dogImage && (
                    <img
                        src={dogImage}
                        alt="Kultainennoutaja"
                        className="home-dog-image"
                    />
                )}
            </section>

            <section className="home-features">
                <h2>Tutustu Dog Worldin toimintoihin</h2>

                <div className="home-card-container">
                    <div className="home-card">
                        <h3>Koirarodut</h3>
                        <p>
                            Selaa erilaisia koirarotuja ja tutustu niiden
                            kuviin ja ominaisuuksiin.
                        </p>
                        <Link to="/breeds">Selaa rotuja →</Link>
                    </div>

                    <div className="home-card">
                        <h3>Omat suosikit</h3>
                        <p>
                            Tallenna kiinnostavimmat koirarodut ja löydä
                            ne helposti uudelleen.
                        </p>
                        <Link to="/favorites">Katso suosikit →</Link>
                    </div>

                    <div className="home-card">
                        <h3>Rotujen vertailu</h3>
                        <p>
                            Vertaile kahden koirarodun kokoa ja muita
                            ominaisuuksia.
                        </p>
                        <Link to="/compare">Vertaile rotuja →</Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Home;
