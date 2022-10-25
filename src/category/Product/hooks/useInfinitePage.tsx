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
  };
}

const useInfinitePage = (pageParam: number, pages: InfiniteData) => {
  const { getData } = useFetch<unknown, InfiniteData>();
  const setSnackBar = useSetRecoilState(snackbarState);

  return useInfiniteQuery<InfiniteData, AxiosError>(
    ['infinite-products', pageParam],
    async ({ pageParam }) => await getData(`/products?page=${pageParam}&size=16`),
    {
      initialData: () => {
        const data = pages;
        if (data) {
          return {
            pageParams: [1],
            pages: [data],
          };
        }
      },
      getNextPageParam: (lastPage) => {
        const { next }: any = lastPage;
        if (!next) return false;

        const page = new URL(next).searchParams.get('page');
        return Number(page);
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
      onSuccess: () => {
        setSnackBar((pre) => [
          ...pre,
          {
            id: Date.now().toString(),
            type: 'notice',
            message: `✅ ${pageParam} Page`,
          },
        ]);
      },
    }
  );
};
export default useInfinitePage;
