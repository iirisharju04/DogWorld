const API_URL = 'https://dog.ceo/api';

export async function getAllBreeds() {
    const response = await fetch(`${API_URL}/breeds/list/all`);

    if (!response.ok) {
        throw new Error('Koirarotujen hakeminen epäonnistui.');
    }

    const data = await response.json();

    return data.message;
}