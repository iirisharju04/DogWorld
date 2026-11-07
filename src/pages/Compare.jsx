
import { useEffect, useState } from 'react';
import { getBreedDetails } from '../services/dogImageApi.js';
import { getFinnishBreedName } from '../utils/breedTranslations.js';

function Compare() {
    const [breeds, setBreeds] = useState([]);
    const [firstBreed, setFirstBreed] = useState('');
    const [secondBreed, setSecondBreed] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Haetaan kaikki koirarotujen tiedot APIsta
    useEffect(() => {
        async function fetchBreeds() {
            try {
                const data = await getBreedDetails();
                setBreeds(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchBreeds();
    }, []);

    // Etsitään valittujen rotujen tiedot
    const breed1 = breeds.find(breed => breed.id === firstBreed);
    const breed2 = breeds.find(breed => breed.id === secondBreed);

    // Muodostetaan lukuarvojen esitysmuoto
    function formatRange(range) {
        if (!range || range.min == null || range.max == null) {
            return 'Ei tietoa';
        }

        return `${range.min}–${range.max}`;
    }

    // Näytetään yhden rodun tiedot
    function BreedDetails({ breed }) {
        const attributes = breed.attributes;

        return (
            <div className="col-md-6 mb-4">
                <div className="card h-100">
                    <div className="card-body">
                        <h2>
                            {getFinnishBreedName(attributes.name)}
                        </h2>

                        <p>
                            <strong>Elinikä:</strong>{' '}
                            {formatRange(attributes.life)} vuotta
                        </p>

                        <p>
                            <strong>Uroksen paino:</strong>{' '}
                            {formatRange(attributes.male_weight)} kg
                        </p>

                        <p>
                            <strong>Nartun paino:</strong>{' '}
                            {formatRange(attributes.female_weight)} kg
                        </p>

                        <p>
                            <strong>Uroksen korkeus:</strong>{' '}
                            {formatRange(attributes.male_height)} cm
                        </p>

                        <p>
                            <strong>Nartun korkeus:</strong>{' '}
                            {formatRange(attributes.female_height)} cm
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (loading) {
        return <p>Haetaan koirarotujen tietoja...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Vertaile koirarotuja</h1>
            <p>Valitse kaksi rotua ja tutki niiden ominaisuuksien eroja.</p>

            {/* Rotujen valintavalikot */}
            <div className="row mt-4">
                <div className="col-md-6 mb-3">
                    <label className="form-label">
                        Ensimmäinen koirarotu
                    </label>

                    <select
                        className="form-select"
                        value={firstBreed}
                        onChange={event => setFirstBreed(event.target.value)}
                    >
                        <option value="">Valitse rotu</option>

                        {breeds.map(breed => (
                            <option key={breed.id} value={breed.id}>
                                {getFinnishBreedName(breed.attributes.name)}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="col-md-6 mb-3">
                    <label className="form-label">
                        Toinen koirarotu
                    </label>

                    <select
                        className="form-select"
                        value={secondBreed}
                        onChange={event => setSecondBreed(event.target.value)}
                    >
                        <option value="">Valitse rotu</option>

                        {breeds.map(breed => (
                            <option key={breed.id} value={breed.id}>
                                {getFinnishBreedName(breed.attributes.name)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Ilmoitus, jos sama rotu on valittu kahdesti */}
            {firstBreed && secondBreed && firstBreed === secondBreed && (
                <p>
                    Valitsit saman rodun molempiin valintoihin.
                    Valitse kaksi eri rotua.
                </p>
            )}

            {/* Näytetään vertailu, kun kaksi eri rotua on valittu */}
            {breed1 && breed2 && firstBreed !== secondBreed && (
                <>
                    <h2 className="mt-4">Rotujen ominaisuudet</h2>

                    <div className="row">
                        <BreedDetails breed={breed1} />
                        <BreedDetails breed={breed2} />
                    </div>
                </>
            )}

            {(!firstBreed || !secondBreed) && (
                <p className="mt-3">
                    Valitse kaksi koirarotua nähdäksesi vertailun.
                </p>
            )}
        </div>
    );
}

export default Compare;
