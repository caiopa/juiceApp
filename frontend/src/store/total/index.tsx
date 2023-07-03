import { create } from "zustand";
import {calcularTotal} from '../../app/componentes/cart'
type Cart = {
  quantidade: number[];
  total: number;
  tamanho: string[];
  sabor: string;
};

type ActionsProps = {
  addValue: (value: number) => void;
  removeValue: (value: number) => void;
  setValue: (value: number) => void;
  addItemCart: (item: Cart) => void;
  removeItemCart: (index: number) => void;
  setCart: (cart: Cart[]) => void;
  removeQuantity: (itemIndex: any) => void;
  addQuantity: (itemIndex: any) => void;
};

type StoreProps = {
  state: {
    total: number;
    cart: Cart[];
  };
  actions: ActionsProps;
};

export const useTotalStore = create<StoreProps>((set) => ({
  state: {
    total: 0,
    cart: [],
  },
  actions: {
    addValue: (value) => set((state) => ({ state: { ...state.state, total: state.state.total + value } })),
    removeValue: (value) => set((state) => ({ state: { ...state.state, total: state.state.total - value } })),
    setValue: (value) => set((state) => ({ state: { ...state.state, total: value } })),
    addItemCart: (item) => set((state) => ({ state: { ...state.state, cart: [...state.state.cart, item] } })),
    removeItemCart: (index) => set((state) => ({ state: { ...state.state, cart: state.state.cart.filter((_, i) => i !== index) } })),
    setCart: (cart) => set((state) => ({ state: { ...state.state, cart } })),
    removeQuantity: (itemIndex) => set((state) => {
      const updatedCart = [...state.state.cart];
      const selectedItem = updatedCart[itemIndex];
    
      if (selectedItem) {
        const quantidadeIndex = selectedItem.quantidade.findIndex((qtd) => qtd > 0);
        if (quantidadeIndex >= 0) {
          selectedItem.quantidade[quantidadeIndex] -= 1;
          state.state.total -= calcularTotal(selectedItem.tamanho[quantidadeIndex], 1);
        }
      }
    
      return { state: { ...state.state, cart: updatedCart } };
    }),
    addQuantity: (itemIndex) => set((state) => {
      const updatedCart = [...state.state.cart];
      const selectedItem = updatedCart[itemIndex];
    
      if (selectedItem) {
        const quantidadeIndex = selectedItem.quantidade.findIndex((qtd) => qtd >= 0);
        if (quantidadeIndex >= 0) {
          selectedItem.quantidade[quantidadeIndex] += 1;
          state.state.total += calcularTotal(selectedItem.tamanho[quantidadeIndex], 1);
        }
      }
    
      return { state: { ...state.state, cart: updatedCart } };
    }),
  },
}));
