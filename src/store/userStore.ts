import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
    id: number,
    phone: number,
    name: string,
    email: string,
    token: string,
    adress: string,
    setId: (id: number) => void,
    setEmail: (email: string) => void,
    setToken: (token: string) => void,
    reset: () => void,
}

export const userStore = create<User>(
  persist(
    (set, get) => ({
        id: null,
        email: null,
        token: null,
        setId: (id: number) => set((state) => ({id})),
        setEmail: (email: string) => set((state) => ({email})),
        setToken: (token: string) => set((state) => ({token})),
        reset: () => set((state) => ({
          id: null,
          email: null,
          token: null,
        }))
    }),
    {
      name: 'admin-storage', // unique name
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
)
