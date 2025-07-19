export const searchFlights = async ({
    originSkyId,
    destinationSkyId,
    originEntityId,
    destinationEntityId,
    adults,
    date,
    returnDate,
}: {
    originSkyId: string;
    destinationSkyId: string;
    originEntityId: string;
    destinationEntityId: string;
    adults: number;
    date: string;
    returnDate?: string;
}) => {
    const params = new URLSearchParams({
        originSkyId,
        destinationSkyId,
        originEntityId,
        destinationEntityId,
        adults: adults.toString(),
        sortBy: 'price_high',
        currency: 'USD',
        market: 'en-US',
        date,
        countryCode: 'US',
    });

    if (returnDate) {
        params.append('returnDate', returnDate);
    }

    // ✅ Log the final query string
    console.log('🔍 Flight Search Params:', params.toString());

    try {
        const response = await fetch(
            `https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights?${params}`,
            {
                headers: {
                    'X-RapidAPI-Key': process.env.EXPO_PUBLIC_RAPIDAPI_KEY || 'YOUR_KEY',
                    'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com',
                },
            }
        );

        const text = await response.text(); // read as plain text
        console.log('====================================');
        console.log(text);
        console.log('====================================');
        let json;

        try {
            json = JSON.parse(text); // parse only if valid
        } catch (parseErr) {
            console.error('❌ JSON Parse Error:', parseErr);
            console.error('❌ Response text:', text);
            throw new Error('Invalid server response. Try again later.');
        }

        if (!response.ok) {
            console.error('❌ HTTP Error:', response.status, response.statusText);
            console.error('❌ Error Response:', json);
            throw new Error(json?.message || 'Flight search failed. Try again.');
        }

        return json?.data?.context?.sessionId || null;
    } catch (err) {
        console.error('🚨 Exception during searchFlights:', err);
        throw new Error('Something went wrong. Please try again.');
    }
};
