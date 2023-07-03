'use client'
import Header from "@/app/componentes/header";
import { useEffect, useState } from "react";
import { getProducts } from "../api/products/router";
import ProductCard from "./productCard/page";
import Carrousel from "../componentes/Carrousel";

import { useTotalStore } from '../../store/total';

export default function Home() {
  const [products, setProducts] = useState(null);
  const { 
    state: { 
      total,
    }, 
 } = useTotalStore();
 
  const getProduct = async (token: any) => {
    const produtos = await getProducts(token);
    return produtos;
  };

  useEffect(() => {
    let user;
    try {
      user = JSON.parse(localStorage.getItem("user") || "[]");
      const token = user?.token;
      fetchProducts(token);
    } catch (e) {
      console.error(`Error parsing user from localStorage: ${e}`);
      user = null;
    }

    async function fetchProducts(token: string) {
      try {
        const produtos = await getProduct(token);
        setProducts(produtos);
      } catch (error) {
        console.error(error);
      }
    }
  }, [setProducts]);

  return (
    <>
      <Header />
      <Carrousel/>
      {products && <ProductCard products={products} />}
      {total}
      
    </>
  );
}
