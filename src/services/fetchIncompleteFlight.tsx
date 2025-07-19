// src/services/fetchIncompleteSearch.ts

export const fetchIncompleteSearch = async (sessionId: string) => {
  const url = `https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchIncomplete?sessionId=${sessionId}&currency=USD`;

  const response = await fetch(url, {
    headers: {
      'X-RapidAPI-Key': process.env.EXPO_PUBLIC_RAPIDAPI_KEY || 'YOUR_KEY',
      'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com',
    },
  });

  if (!response.ok) {
    console.log('Fetch failed:', await response.text());
    throw new Error('Failed to fetch flight results');
  }

  const json = await response.json();
  return json?.data?.itineraries || [];
};
