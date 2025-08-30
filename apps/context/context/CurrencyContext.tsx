"use client";

import { createContext, useContext , useState, ReactNode } from 'react'

type Currency = "USD" | "LKR" | "GBP" | "EUR";

type CurrencyContextType = {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  convertPrice: (priceInUSD: number) => number;
};

const CurrencyContext = createContext<CurrencyContextType>({
    currency: "USD",
    setCurrency: () => {},
    convertPrice: (price) => price,
});

const conversionasRates= {
  USD: 1,
  LKR: 300,
  GBP: 0.76,
  EUR: 0.90,
};

export function CurrencyContextProvider({ children }: {children: ReactNode}) {
    const [currency, setCurrency] = useState<Currency>("USD");
    const convertPrice = (priceInUSD: number) => {
        return priceInUSD * conversionasRates[currency]
    }
  return (
    <CurrencyContext.Provider value={{
        currency,
        setCurrency,
        convertPrice
    }}>
        {children}
    </CurrencyContext.Provider>
  )
}

export const useCurrency = () => useContext(CurrencyContext)