export const fetchNearbyAirports = async (lat: number, lng: number) => {
    try {
        const response = await fetch(
            `https://api.example.com/airports-nearby?lat=${lat}&lng=${lng}`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch airports');
        }

        const data = await response.json();
        return data; // format as needed
    } catch (error) {
        console.error('Error fetching airports:', error);
        throw error;
    }
};

// src/services/airportServices.ts

export const searchAirports = async (query: string) => {
    try {
        const response = await fetch(
            `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=${encodeURIComponent(query)}&locale=en-US`,
            {
                headers: {
                    'X-RapidAPI-Key': process.env.EXPO_PUBLIC_RAPIDAPI_KEY || 'YOUR_KEY',
                    'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com',
                },
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error:', response.status, errorText);
            throw new Error(`API error: ${response.status} ${response.statusText || errorText}`);
        }

        const json = await response.json();

        if (!json || !json.data) {
            throw new Error('No data returned from API');
        }

        return json.data;
    } catch (error: any) {
        console.error('Search Airport Error:', error.message);
        throw new Error(`Failed to fetch airport data: ${error.message}`);
    }
};
