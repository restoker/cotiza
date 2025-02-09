import { create } from 'zustand'

export const menuStore = create((set) => ({
    sidebarOpen: false,
    setSidebarOpen: (value) => set((state) => ({ sidebarOpen: value })),
    // removeAllBears: () => set({ bears: 0 }),
    // updateBears: (newBears) => set({ bears: newBears }),
}))