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
