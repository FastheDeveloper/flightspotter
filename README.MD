# ✈️ AirSpotter App (React Native + Expo)

This is a React Native app built with Expo that allows users to search for flights, select trip types (one-way or round-trip), view upcoming flights, and more. The app integrates with Supabase for authentication and data, as well as the RapidAPI SkyScraper API for airport and flight information.

---

## 🚀 Features

- 🔍 Search flights by city or airport
- 📍 Get current location
- 🗖️ Select trip type and travel dates
- ✈️ View upcoming booked flights
- 🢁 Authenticated user sessions via Supabase

---

## ⚙️ Tech Stack

- **React Native** with **Expo**
- **TypeScript**
- **TailwindCSS (NativeWind)**
- **Supabase** (Auth + DB)
- **SkyScraper API via RapidAPI**
- **Zustand** for state management
- **Custom SVG icons** and modular UI components

---

## 📦 Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/flight-booker-app.git
```

### 2. Install Dependencies

```bash
yarn
```

### 3. Create `.env` File

Create a `.env` file in the root directory and add the following variables:

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
EXPO_PUBLIC_RAPIDAPI_KEY=your_rapidapi_key
```

> ❗ Make sure your Supabase project is set up and you’ve enabled authentication.

---

## 🧪 Run the App

To create a **development build** for Android:

```bash
npx expo run:android
```

For iOS (requires macOS + Xcode):

```bash
npx expo run:ios
```

To run in Expo Go (for development/testing):

```bash
npx expo start
```

---

## 🙌 Credits

- Supabase ([https://supabase.com/](https://supabase.com/))
- SkyScraper API ([https://rapidapi.com/apiheya/api/sky-scrapper](https://rapidapi.com/apiheya/api/sky-scrapper))
- Expo ([https://expo.dev/](https://expo.dev/))
- NativeWind ([https://www.nativewind.dev/](https://www.nativewind.dev/))

---

## 🚡 Troubleshooting

- Make sure Android Studio and device/emulator are properly set up.
- Double-check `.env` variables and restart the dev server after changes.
- If Tailwind classes don’t apply, try restarting Metro bundler and clearing cache:

```bash
npx expo start --clear
```

---

## 📜 License

MIT License – feel free to fork and build on it!
