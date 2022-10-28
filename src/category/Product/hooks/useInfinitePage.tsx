import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useFetch } from 'src/lib/hooks';

import { useSetRecoilState } from 'recoil';
import { snackbarState } from 'src/lib/atoms';
import { AxiosError } from 'axios';
import { Product } from 'src/types/product';

export interface InfiniteData {
  data: {
    products: Product[];
    totalCount: number;
    current_page: number;
  };
}

const useInfinitePage = (pageParam: number, pages: InfiniteData) => {
  const { getData } = useFetch<unknown, InfiniteData>();
  const setSnackBar = useSetRecoilState(snackbarState);

  return useInfiniteQuery<InfiniteData, AxiosError>(
    ['infinite-products', pageParam],
    async ({ pageParam = 1 }) => {
      const data = await getData(`/products?page=${pageParam}&size=16`);
      return {
        data: {
          products: data.data.products,
          totalCount: data.data.totalCount,
          current_page: pageParam,
        },
      };
    },
    {
      // initialData: () => {
      //   const data = pages;
      //   if (data) {
      //     return {
      //       pageParams: [1],
      //       pages: [data],
      //     };
      //   }
      // },
      getNextPageParam: (lastPage, pages) => {
        // lastPage와 pages는 콜백함수에서 리턴한 값을 의미한다!!
        // lastPage: 직전에 반환된 리턴값, pages: 여태 받아온 전체 페이지
        console.log(
          lastPage.data.totalCount / 16 === lastPage.data.current_page,
          lastPage.data.current_page
        );
        console.log(lastPage, pages);
        if (!(lastPage.data.totalCount / 16 === lastPage.data.current_page))
          return lastPage.data.current_page + 1;
        // 마지막 페이지면 undefined가 리턴되어서 hasNextPage는 false가 됨!
        return undefined;
      },
      useErrorBoundary: (error) => {
        return error.response ? error.response.status >= 500 : false;
      },
      onError: (error) => {
        if (error.response?.status === 404) {
          setSnackBar((pre) => [
            ...pre,
            {
              id: Date.now().toString(),
              type: 'warning',
              message: '⛔️ No More Page',
            },
          ]);
        }
      },
      onSuccess: (data) => {
        const { pages } = data;
        setSnackBar((pre) => [
          ...pre,
          {
            id: Date.now().toString(),
            type: 'notice',
            message: `✅ ${pages[pages.length - 1].data.current_page} Page`,
          },
        ]);
      },
    }
  );
};
export default useInfinitePage;
