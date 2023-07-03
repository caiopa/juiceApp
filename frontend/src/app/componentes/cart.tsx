import { useTotalStore } from "@/store/total";
import { useEffect } from "react";

export const calcularTotal = (tamanho: string, quantidade: number) => {
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
};

export default function CartCard({ item, index }: any) {
  const { state: { cart, total }, actions: { addValue, removeValue, addQuantity, removeQuantity, setCart, setValue } } = useTotalStore();

 /*  useEffect(() => {
    setValue(atualizarValorTotal(cart) as any)
  }, [cart, addValue, setValue]); */

  const atualizarValorTotal = (carrinho: any[]) => {
    const newTotal = carrinho.reduce((acc: number, item: any) => {
      item.quantidade.forEach((qtd: number, tamanhoIndex: number) => {
        acc += calcularTotal(item.tamanho[tamanhoIndex], qtd);
      });

      return acc;
    }, 0);

    setValue(newTotal);
    console.log(newTotal);
    return newTotal; // Retorna o novo total atualizado
  };

  const handleAumentar = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, tamanhoIndex: number) => {
    event.preventDefault();
    const carrinho = [...cart];
    const updatedItem = carrinho[index];

    if (updatedItem.quantidade[tamanhoIndex] >= 0) {
      updatedItem.quantidade[tamanhoIndex] += 1;
      carrinho[index] = updatedItem;
      setCart(carrinho);
      const newTotal = atualizarValorTotal(carrinho); // Obtém o novo total
      setValue(newTotal)
      console.log('+', newTotal);
    }
  };

  const handleDiminuir = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, tamanhoIndex: number) => {
    event.preventDefault();
    const carrinho = [...cart];
    const updatedItem = carrinho[index];

    if (updatedItem.quantidade[tamanhoIndex] > 0) {
      updatedItem.quantidade[tamanhoIndex] -= 1;
      carrinho[index] = updatedItem;
      setCart(carrinho);
      const newTotal = atualizarValorTotal(carrinho); // Obtém o novo total
      setValue(newTotal)
      console.log('-', newTotal);
    }
  };



  
  return (
    <div className="w-screen m-auto">
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
                <button className="py-2 px-4" onClick={(e) => handleDiminuir(e, tamanhoIndex)}>-</button>
                {item.quantidade[tamanhoIndex]}
                <button className="py-2 px-4" onClick={(e) => handleAumentar(e, tamanhoIndex)}>+</button>
              </td>
              <td className="py-2">{calcularTotal(tamanho, item.quantidade[tamanhoIndex])}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
