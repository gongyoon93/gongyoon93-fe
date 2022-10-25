import { useRouter } from 'next/router';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { Product } from '../types/product';

type ProductItemProps = {
  product: Product;
};

const ProductItem = ({ product: { id, name, thumbnail, price } }: ProductItemProps) => {
  const router = useRouter();
  const onClick = (id: string) => {
    router.push(`/products/${id}`);
  };
  return (
    <Container onClick={() => onClick(id)}>
      <Thumbnail src={thumbnail ? thumbnail : '/defaultThumbnail.jpg'} />
      <Name>{name}</Name>
      <Price>{price.toLocaleString()}원</Price>
    </Container>
  );
};

export default ProductItem;

const Container = styled.a`
  width: 180px;
  margin-left: 20px;
  margin-top: 20px;
  cursor: pointer;
`;

const Thumbnail = styled(LazyLoadImage)`
  width: 100%;
  height: 180px;
  border-radius: 5px;
`;

const Name = styled.div`
  font-weight: 600;
  margin-top: 8px;
  font-size: 16px;
`;

const Price = styled.div`
  margin-top: 4px;
`;
