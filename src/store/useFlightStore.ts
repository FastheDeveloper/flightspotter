// src/store/useFlightStore.ts
import { create } from 'zustand';

type Airport = {
    title: string;
    subtitle: string;
    skyId: string;
    entityId: string;
};

type Store = {
    from: Airport | null;
    to: Airport | null;
    sessionId: string | null;
    departureDate: Date | null;
    returnDate: Date | null;
    setFrom: (a: Airport) => void;
    setTo: (a: Airport) => void;
    setSessionId: (id: string) => void;
    setDepartureDate: (date: Date | null) => void;
    setReturnDate: (date: Date | null) => void;
    noOfPassengers: string; setNoOfPassengers: (number: string) => void;
    reset: () => void;

};

export const useFlightStore = create<Store>((set) => ({
    from: null,
    to: null,
    sessionId: null,
    departureDate: null,
    returnDate: null,
    setFrom: (from) => set({ from }),
    setTo: (to) => set({ to }),
    setSessionId: (sessionId) => set({ sessionId }),
    setDepartureDate: (departureDate) => set({ departureDate }),
    setReturnDate: (returnDate) => set({ returnDate }),
    noOfPassengers: '1',
    setNoOfPassengers: (noOfPassengers) => set({ noOfPassengers }),
    reset: () =>
        set({
            from: null,
            to: null,
            sessionId: null,
            departureDate: null,
            returnDate: null,
            noOfPassengers: '1',
        }),
}));
