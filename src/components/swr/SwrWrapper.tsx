import React, { ReactNode } from 'react';
import { SWRConfig, Cache } from 'swr';
import { Fetcher, PublicConfiguration } from 'swr/dist/types';

type Provider = {
  // eslint-disable-next-line
  provider?: (cache: Readonly<Cache<any>>) => Cache<any>;
};

interface SWRProps {
  children: ReactNode;
  // eslint-disable-next-line
  swrConfig?: Partial<PublicConfiguration<any, any, Fetcher<any>>> & Provider;
}

export const SwrWrapper: React.FC<SWRProps> = ({ children, swrConfig }) => {
  return (
    <SWRConfig
      value={{
        fetcher: customFetcher,
        ...swrConfig,
      }}
    >
      {children}
    </SWRConfig>
  );
};

export async function customFetcher(url: string) {
  const res = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const json = (await res.json()) as { message: string };
    throw new Error(json.message);
  }

  return res.json();
}
