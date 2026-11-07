import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>Etusivu</h1>
            <p>Tervetuloa Dog Worldiin!</p>

            <h2>Tutustu sovelluksen toimintoihin</h2>

            <div>
                <h3>Koirarodut</h3>
                <p>Selaa koirarotuja ja tutustu niiden kuviin.</p>
                <Link to="/breeds">Tutustu koirarotuihin</Link>
            </div>

            <div>
                <h3>Omat suosikit</h3>
                <p>Tarkastele tallentamiasi koirarotuja.</p>
                <Link to="/favorites">Omat suosikit</Link>
            </div>

            <div>
                <h3>Rotujen vertailu</h3>
                <p>Vertaile kahden koirarodun ominaisuuksia.</p>
                <Link to="/compare">Vertaile rotuja</Link>
            </div>
        </div>
    );
}

export default Home;