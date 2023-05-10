import { useState, useEffect } from "react";

export default function CartCard({ setTotal, total }: any) {
  const [cart, setCart] = useState<any>([]);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(cartData);
    setTotal(total + cartData.map((cart: any) => (cart.total)).reduce((a: number, b: number) => a + b, 0));

  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const calcularTotal = (tamanho: string, quantidade: number) => {
    switch (tamanho) {
      case '300ml':
        return quantidade * 10;
      case '400ml':
        return quantidade * 15;
      case '500ml':
        return quantidade * 17;
      default:
        return 0;
    }
  }

  const handleAumentar = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, itemIndex: number, tamanhoIndex: number) => {
    event.preventDefault();
    const updatedCart = [...cart];
    if (updatedCart[itemIndex].quantidade[tamanhoIndex] !== -1) {
      updatedCart[itemIndex].quantidade[tamanhoIndex] += 1;
      updatedCart[itemIndex].total = updatedCart[itemIndex].tamanho.reduce((acc: number, tamanho: string, index: number) => {
        return acc + calcularTotal(tamanho, updatedCart[itemIndex].quantidade[index]);
      }, 0);
      setCart(updatedCart);
      setTotal(cart.reduce((acc: number, item: any) => {
        return acc + item.total;
      }, 0));
    }
  };
  

  const handleDiminuir = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, itemIndex: number, tamanhoIndex: number) => {
    event.preventDefault();
    const updatedCart = [...cart];
    if (updatedCart[itemIndex].quantidade[tamanhoIndex] > 0) {
      updatedCart[itemIndex].quantidade[tamanhoIndex] -= 1;
      updatedCart[itemIndex].total = updatedCart[itemIndex].tamanho.reduce((acc: number, tamanho: string, index: number) => {
        return acc + calcularTotal(tamanho, updatedCart[itemIndex].quantidade[index]);
      }, 0);
      setCart(updatedCart);
      setTotal(cart.reduce((acc: number, item: any) => {
        return acc + item.total;
      }, 0));
    }
  };


  return (
    <>
  {cart.length > 0 && cart.map((item: any, itemIndex: number) => (
    <div key={itemIndex} className="w-screen m-auto">
      <p className="text-lg">Sabor: {item.sabor}</p>
      <table className="w-[350px]">
        <thead className="text-center">
          <tr>
            <th>Tamanho</th>
            <th className="">Qnt</th>
            <th>Sub Total</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {item.tamanho.map((tamanho: string, tamanhoIndex: number) => (
            <tr key={tamanhoIndex}>
              <td className="py-2">{tamanho}</td>
              <td className="py-2">
                <button className="py-2 px-4" onClick={(e) => handleDiminuir(e, itemIndex, tamanhoIndex)}>-</button>
                {item.quantidade[tamanhoIndex]}
                <button className="py-2 px-4" onClick={(e) => handleAumentar(e, itemIndex, tamanhoIndex)}>+</button>
              </td>
              <td className="py-2">{calcularTotal(tamanho, item.quantidade[tamanhoIndex])}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ))}
</>

  );
}
