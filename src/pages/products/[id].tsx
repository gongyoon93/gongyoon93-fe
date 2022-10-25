import type { GetServerSidePropsContext, NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';

import { api } from 'src/lib/http';

import { Product } from 'src/types/product';

interface ProductDetailProps {
  item: Product;
}

const ProductDetailPage: NextPage<ProductDetailProps> = ({ item }) => {
  return (
    <>
      <Header />
      <Thumbnail src={item.thumbnail ? item.thumbnail : '/defaultThumbnail.jpg'} />
      <ProductInfoWrapper>
        <Name>{item.name}</Name>
        <Price>{item.price}원</Price>
      </ProductInfoWrapper>
    </>
  );
};

export default ProductDetailPage;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const id = context?.params?.id as string;
    const data = await api.get(`http://localhost:3000//products/${id}`);

    return {
      props: { item: data },
    };
  } catch (err: any) {
    // console.error(err);
    return {
      props: { item: {} },
    };
  }
};

const Thumbnail = styled.img`
  width: 100%;
  height: 420px;
`;

const ProductInfoWrapper = styled.div`
  margin-top: 20px;
  padding: 0 20px;
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Price = styled.div`
  font-size: 18px;
  margin-top: 8px;
`;
