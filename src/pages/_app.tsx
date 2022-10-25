import type { AppProps } from 'next/app';
import styled from 'styled-components';

import setupMSW from '../api/setup';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';
import Auth from 'src/components/hoc/Auth';
import { GlobalStyle, style } from 'src/lib/styled';
import { useState } from 'react';

setupMSW();

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 0,
            staleTime: 600 * 1000,
          },
        },
      })
  );
  return (
    <>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={style}>
            <GlobalStyle />
            <Background />
            <Content>
              <Auth>
                <Component {...pageProps} />
              </Auth>
            </Content>
          </ThemeProvider>
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
}

export default MyApp;

const Background = styled.div`
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: #f0f0f5;
`;

const Content = styled.div`
  width: 420px;
  min-height: 100%;
  margin: 0 auto;
  background-color: #fff;
`;
