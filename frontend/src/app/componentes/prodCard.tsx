import { useTotalStore } from '@/store';
import { useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow'

interface ProductProps {
  sabor: string;
  description: string;
}

interface ProductCardProps {
  product: ProductProps;
  setTotal: (value: number | ((prevTotal: number) => number)) => void;
  total: any
}

export default function ProductCard({ product,/*  setTotal, total  */}: ProductCardProps) {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedQuantities, setSelectedQuantities] = useState<number[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const {increaseTotal, removeTotal} = useTotalStore((state) => ({
    increaseTotal: state.increaseTotal,
    removeTotal: state.removeTotal
  }), shallow);
 
  const priceBySize: {[key: string]: number} = {
    '300ml': 10,
    '400ml': 15,
    '500ml': 17
  };

 
  const calculateTotalPrice = () => {
    const total = selectedQuantities.reduce((acc, quantity, index) => {
      const price = priceBySize[selectedSizes[index]];
      return acc + (price * quantity);
    }, 0);
    setTotalPrice(total)
    return total;
  };

  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
    // setTotal(total);
  }, [selectedSizes, selectedQuantities, calculateTotalPrice]);

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
  
    if (selectedSizes.includes(value)) {
      const index = selectedSizes.indexOf(value);
      const newSelectedSizes = selectedSizes.filter(size => size !== value);
      setSelectedSizes(newSelectedSizes);
  
      const newSelectedQuantities = [...selectedQuantities];
      newSelectedQuantities.splice(index, 1);
      setSelectedQuantities(newSelectedQuantities);
    } else {
      setSelectedSizes([...selectedSizes, value]);
      setSelectedQuantities([...selectedQuantities, 0]);
    }
  };

  const total = useTotalStore((state) => state.total);
  console.log('Novo total:', total);
  
  const handleAddQuantity = (index: number) => {
    const newSelectedQuantities = [...selectedQuantities];
    newSelectedQuantities[index] = (newSelectedQuantities[index] || 0) + 1;
    setSelectedQuantities(newSelectedQuantities);
    const itemPrice = priceBySize[selectedSizes[index]];
    const newTotalPrice = totalPrice + itemPrice;
    console.log(increaseTotal(itemPrice))
    // setTotal(prevTotal => prevTotal + itemPrice);
    setTotalPrice(newTotalPrice);
  };
    
  const handleRemoveQuantity = (index: number) => {
    const newSelectedQuantities = [...selectedQuantities];
    const priceToRemove = priceBySize[selectedSizes[index]];
    if (newSelectedQuantities[index] > 0) {
      newSelectedQuantities[index] -= 1;
      const newTotalPrice = totalPrice - priceToRemove;
      console.log(removeTotal(priceToRemove))
      // setTotal(prevTotal => prevTotal - priceToRemove);
      setTotalPrice(newTotalPrice);
      setSelectedQuantities(newSelectedQuantities); 
    }
  }; 
 
 
  const handleAddToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartItem = {
      sabor: product.sabor,
      tamanho: selectedSizes,
      quantidade: selectedQuantities,
      total: totalPrice
    };
    cartItems.push(cartItem);
    
    // Salvar o array atualizado no localStorage
    localStorage.setItem('cart', JSON.stringify([...cartItems, cartItem]));
    
    // Calcular o novo valor total e atualizar o estado total
    const newTotal = cartItems.reduce((acc: number, item: any) => acc + item.total, 0);
    // setTotal(newTotal);
    
    // Limpar os estados para uma nova seleção
    setSelectedSizes([]);
    setSelectedQuantities([]);
    // setTotalPrice(0);
  };
  
  

 
  return (
    <div className='flex flex-col w-[350px] m-auto '>
      <p className='mt-5'>Sabor: {product.sabor}</p>
      <div className='grid grid-cols-2 w-[350px] m-auto h-[200px]'>
        <div className='flex flex-col justify-evenly '>
          <label >
            <input
              type="checkbox"
              value="300ml"
              checked={selectedSizes.includes('300ml')}
              onChange={handleSizeChange}
              />
            300ml - R$ {priceBySize['300ml']}
          </label>
          <label>
            <input
              type="checkbox"
              value="400ml"
              checked={selectedSizes.includes('400ml')}
              onChange={handleSizeChange}
             />
            400ml - R$ {priceBySize['400ml']}
          </label>
          <label>
            <input
              type="checkbox"
              value="500ml"
              checked={selectedSizes.includes('500ml')}
              onChange={handleSizeChange}
              />
            500ml - R$ {priceBySize['500ml']}
          </label>
        </div>

        <div className='flex flex-col items-center justify-center'>
         {selectedSizes.sort((a, b) => parseInt(a) - parseInt(b)).map((size, index) => (
          <p key={size}>
            Quantidade {size}:
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l" onClick={() => handleAddQuantity(index)}>+</button>
            <span className="bg-gray-100 py-2 px-4">{selectedQuantities[index] || 0}</span>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r" onClick={() => handleRemoveQuantity(index)}>-</button>
          </p>
          ))}
        </div>
      </div>

      <p>
        Total:
        R$ {totalPrice || 0}
      </p>
      <button className='bg-blue-500 my-7 text-white font-bold py-2 px-4 rounded disabled:bg-gray-300' onClick={handleAddToCart}
      disabled={totalPrice === 0}>Adicionar ao carrinho</button>

    </div>
  );
}
