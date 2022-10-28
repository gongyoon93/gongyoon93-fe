import styled from 'styled-components';

import { Product } from '../types/product';
import ProductItem from './ProductItem';

export type InfiniteProductListProps = {
  // pages: {
  data: {
    products: Product[];
    totalCount: number;
  };
  // };
};

const ProductList = ({ data }: InfiniteProductListProps) => (
  <Container>
    {data?.products?.map((product) => (
      <ProductItem key={product.id} product={product} />
    ))}
  </Container>
);

export default ProductList;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 400px;
  margin-left: -20px;
`;
