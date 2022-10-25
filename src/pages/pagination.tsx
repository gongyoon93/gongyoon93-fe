import type { GetServerSidePropsContext, NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';

import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';
import usePagination, { ProductData } from 'src/category/Product/hooks/usePagination';
import { api } from 'src/lib/http';
import { useRouter } from 'next/router';

interface PaginationProps {
  initialProducts: ProductData;
}

const PaginationPage: NextPage<PaginationProps> = ({ initialProducts }) => {
  const router = useRouter();
  const { page } = router.query;
  const currentPage =
    typeof page === 'string' ? (typeof parseInt(page) === 'number' ? parseInt(page) : 0) : 0;

  const itemPerPage = 10;
  const { data: productInfo, isError } = usePagination(currentPage, initialProducts);

  return (
    <>
      <Header />
      <Container>
        {isError ? (
          <ErrorPage>존재하지 않는 페이지입니다.</ErrorPage>
        ) : (
          <>
            <ProductList products={productInfo?.data?.products} />
            <Pagination
              totalPage={
                productInfo?.data?.totalCount
                  ? Math.ceil(productInfo.data.totalCount / itemPerPage)
                  : 0
              }
            />
          </>
        )}
      </Container>
    </>
  );
};

export default PaginationPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
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
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;

const ErrorPage = styled.div`
  width: 400px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;
