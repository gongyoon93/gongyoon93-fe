import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';
import { useSetPageState } from 'src/category/Product/hooks';
import { sliceArrayByLimit } from 'src/utilities/page';
import Router, { useRouter } from 'next/router';

type ProductPageProps = {
  totalPage: number;
};

const Pagination = ({ totalPage = 0 }: ProductPageProps) => {
  const router = useRouter();
  const pagePerPagination = 5;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageArray, setCurrentPageArray] = useState<number[]>([]);
  const [totalPageArray, setTotalPageArray] = useState<number[][]>([]);

  useEffect(() => {
    if (typeof router.query.page === 'string') {
      let pageParam = parseInt(router.query.page);
      if (typeof pageParam === 'number') {
        setCurrentPage(pageParam);
      }
    }
  }, [router.query.page]);

  useEffect(() => {
    const slicedPageArray = sliceArrayByLimit(totalPage, pagePerPagination);
    setTotalPageArray(slicedPageArray);
    setCurrentPageArray(slicedPageArray[0]);
  }, [totalPage]);

  useEffect(() => {
    setCurrentPageArray(totalPageArray[Math.ceil(currentPage / pagePerPagination) - 1]);
  }, [currentPage, currentPageArray, totalPageArray]);

  const onClickPage = (page: number) => {
    router.push(`/pagination?page=${page}`);
  };

  const onPrevPagination = () => {
    router.push(`/pagination?page=${currentPage - ((currentPage - 1) % pagePerPagination) - 1}`);
  };

  const onNextPagination = () => {
    router.push(
      `/pagination?page=${
        currentPage + (pagePerPagination - ((currentPage - 1) % pagePerPagination))
      }`
    );
  };

  return (
    <Container>
      <Button
        onClick={() => onPrevPagination()}
        disabled={totalPageArray.indexOf(currentPageArray) === 0}
      >
        <VscChevronLeft />
      </Button>
      <PageWrapper>
        {currentPageArray?.map((page) => (
          <Page
            key={page}
            selected={page === currentPage}
            disabled={page === currentPage}
            onClick={() => onClickPage(page)}
          >
            {page}
          </Page>
        ))}
      </PageWrapper>
      <Button
        onClick={() => onNextPagination()}
        disabled={totalPageArray.indexOf(currentPageArray) === totalPageArray.length - 1}
      >
        <VscChevronRight />
      </Button>
    </Container>
  );
};

export default Pagination;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin-top: 40px;
  margin-left: -20px;
`;

const Button = styled.button`
  cursor: pointer;
  &:disabled {
    color: #e2e2ea;
    cursor: default;
  }
`;

const PageWrapper = styled.div`
  display: flex;
  margin: 0 16px;
`;

type PageType = {
  selected: boolean;
};

const Page = styled.button<PageType>`
  padding: 4px 6px;
  background-color: ${({ selected }) => (selected ? '#000' : 'transparent')};
  color: ${({ selected }) => (selected ? '#fff' : '#000')};
  font-size: 20px;
  cursor: pointer;
  & + & {
    margin-left: 4px;
  }

  &:disabled {
    cursor: default;
  }
`;
