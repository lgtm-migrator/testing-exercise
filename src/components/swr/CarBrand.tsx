import React from 'react';
import useSWR from 'swr';

export interface CarProps {
  country: 'Germany' | 'France' | 'Italy';
}

export interface APIError {
  message: string;
}

export const CarBrand: React.FC<CarProps> = ({ country }) => {
  const { isValidating, data, error } = useSWR<string[], APIError>(
    `/api/cars/${country}`
  );

  return (
    <>
      <h5>Car Brands from {country}</h5>
      {isValidating && !error ? <div>Loading...</div> : null}
      {error ? <div>{error.message}</div> : null}

      {!data?.length && !isValidating && !error ? (
        <div>No Data to Show</div>
      ) : (
        <ul>
          {data?.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </>
  );
};
