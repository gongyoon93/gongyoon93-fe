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

import { useInView } from 'react-intersection-observer';
import ProductItem from 'src/components/ProductItem';

interface InfiniteScrollProps {
  initialProducts: InfiniteData;
}

const InfiniteScrollPage: NextPage<InfiniteScrollProps> = ({ initialProducts }) => {
  let pageParam = 1;
  const {
    data: getProduct,
    fetchNextPage: getNextPage,
    isSuccess: getProductIsSuccess,
    hasNextPage: getNextPageIsPossible,
  } = useInfinitePage(pageParam, initialProducts);

  const [ref, isView] = useInView();

  useEffect(() => {
    // 맨 마지막 요소를 보고있고 더이상 페이지가 존재하면
    // 다음 페이지 데이터를 가져옴
    if (isView && getNextPageIsPossible) {
      getNextPage();
    }
  }, [isView, getProduct]);

  // const bottom = useRef(null);
  // const [scrollY] = useLocalStorage('products_scroll', 0);

  // const onIntersect: IntersectionObserverCallback = ([entry]) =>
  //   entry.isIntersecting && getNextPage();

  // useObserver({
  //   target: bottom,
  //   onIntersect,
  // });

  // useEffect(() => {
  //   if (scrollY !== 0) window.scrollTo(0, Number(scrollY));
  // }, []);

  return (
    <>
      <Header />
      <Container>
        <ProductItemContainer>
          {getProductIsSuccess && getProduct.pages
            ? getProduct.pages.map((page_data, page_num) => {
                const product_page = page_data.data.products;
                return product_page.map((item, index) => {
                  if (
                    getProduct.pages.length - 1 === page_num &&
                    product_page.length - 1 === index
                  ) {
                    return (
                      <div ref={ref} key={item.id}>
                        <ProductItem product={item} />
                      </div>
                    );
                  } else {
                    return <ProductItem product={item} key={item.id} />;
                  }
                });
              })
            : null}
        </ProductItemContainer>
      </Container>
    </>
  );
};

export default InfiniteScrollPage;

// export const getServerSideProps = async (context: GetServerSidePropsContext) => {
//   try {
//     const products = await api.get(`http://localhost:3000/products?page=1&size=10`);

//     return {
//       props: { initialProducts: products },
//     };
//   } catch (err: any) {
//     console.error(err);
//     return {
//       props: { products: {} },
//     };
//   }
// };

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;

const ProductItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 400px;
  margin-left: -20px;
`;
