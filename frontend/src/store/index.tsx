import { create } from 'zustand'


export const useTotalStore = create((set) => ({
  total: 0,
  increaseTotal: (n) => set((state) => ({ total: state.total + n })),
  removeTotal: (n) => set((state) => ({ total: state.total - n }))
}))