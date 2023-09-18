import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface IGiveaway {
  id: number;
  car: string;
  description: string;
  giveaway_date: string;
  creation_date: string;
  status: number;
  winner_id: number;
  tickets: number;
  ticketPrice: number;
}

interface IGiveawayStore {
  giveaway: IGiveaway;
  setGiveaway: (object: IGiveaway) => void;
  reset: () => void;
}

const initialState: IGiveaway = {
    id: null,
    car: null,
    description: null,
    giveaway_date: null,
    creation_date: null,
    status: null,
    winner_id: null,
    tickets: null,
    ticketPrice: null,
}

export const giveawayStore = create<IGiveawayStore>(
  (set) => ({
    giveaway : {...initialState},
    setGiveaway: (data) => set((state) => ({ giveaway: {...data} })),
    reset: () =>
      set((state) => ({
        initialState
      })),
  })
);
