import type { GetServerSidePropsContext, NextPage } from 'next';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import InfiniteProductList from '../components/InfiniteProductList';
import Header from 'src/components/Header';
import useInfinitePage, { InfiniteData } from 'src/category/Product/hooks/useInfinitePage';

import useLocalStorage from 'use-local-storage';
import { useObserver } from 'src/lib/hooks/useObserver';
import { api } from 'src/lib/http';
import ProductList from 'src/components/ProductList';

import products from '../api/data/products.json';

interface InfiniteScrollProps {
  initialProducts: InfiniteData;
}

const InfiniteScrollPage: NextPage<InfiniteScrollProps> = ({ initialProducts }) => {
  let pageParam = 1;
  const {
    data: productInfo,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfinitePage(pageParam, initialProducts);

  const bottom = useRef(null);
  const [scrollY] = useLocalStorage('products_scroll', 0);

  const onIntersect: IntersectionObserverCallback = ([entry]) =>
    entry.isIntersecting && fetchNextPage();

  useObserver({
    target: bottom,
    onIntersect,
  });

  useEffect(() => {
    if (scrollY !== 0) window.scrollTo(0, Number(scrollY));
  }, []);

  return (
    <>
      <Header />
      <Container>
        {/* <InfiniteProductList products={productInfo?.pages} /> */}
        <ProductList products={products} />
        <div ref={bottom} />
      </Container>
    </>
  );
};

export default InfiniteScrollPage;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const products = await api.get(`http://localhost:3000/products?page=1&size=10`);

    return {
      props: { initialProducts: products },
    };
  } catch (err: any) {
    console.error(err);
    return {
      props: { products: {} },
    };
  }
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;
