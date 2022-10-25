import { useQuery } from '@tanstack/react-query';
import { useFetch } from 'src/lib/hooks';

import { useSetRecoilState } from 'recoil';
import { snackbarState } from 'src/lib/atoms';
import { AxiosError } from 'axios';
import { Product } from 'src/types/product';

export interface ProductData {
  data: {
    products: Product[];
    totalCount: number;
  };
}

const usePagination = (page: number, initialProducts: ProductData) => {
  const { getData } = useFetch<unknown, ProductData>();
  const setSnackBar = useSetRecoilState(snackbarState);

  return useQuery<unknown, AxiosError, ProductData>(
    ['page-products', page],
    async () => await getData(`/products?page=${page}&size=10`),
    {
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
              message: '⛔️ Not Page',
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
            message: `✅ ${page} Page`,
          },
        ]);
      },
      initialData: initialProducts,
      // staleTime: 0,
    }
  );
};
export default usePagination;
