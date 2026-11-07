const API_URL = 'https://dog.ceo/api';

//Haetaan kaikki koirarodut
export async function getAllBreeds() {
    const response = await fetch(`${API_URL}/breeds/list/all`);

    if (!response.ok) {
        throw new Error('Koirarotujen hakeminen epäonnistui.');
    }

    const data = await response.json();

    return data.message;
}

//Haetaan satunnainen kuva jokaiselle koirarodulle
export async function getRandomBreedImage(breedName) {
    const response = await fetch(
        `${API_URL}/breed/${breedName}/images/random`
    );

    if (!response.ok) {
        throw new Error('Koiran kuvan hakeminen epäonnistui.');
    }

    const data = await response.json();

    return data.message;
}

// Haetaan kaikki kuvat yksittäisen koirarodun profiiliin
export async function getBreedImages(breedName) {
    const response = await fetch(`${API_URL}/breed/${breedName}/images`);

    if (!response.ok) {
        throw new Error('Koirarodun kuvien hakeminen epäonnistui.');
    }

    const data = await response.json();

    return data.message;
}

//Haetaan rotutiedot
export async function getBreedDetails() {
    const response = await fetch(
        'https://dogapi.dog/api/v2/breeds'
    );

    if (!response.ok) {
        throw new Error('Rotutietojen hakeminen epäonnistui.');
    }

    const data = await response.json();

    return data.data;
}