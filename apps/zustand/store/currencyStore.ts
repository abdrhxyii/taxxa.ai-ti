import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

type Currency = "USD" | "LKR" | "GBP" | "EUR";

interface CurrencyStore {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  convertPrice: (priceInUSD: number) => number;
}

const conversionRates = {
  USD: 1,
  LKR: 300,
  GBP: 0.76,
  EUR: 0.90,
};

export const useCurrencyStore = create<CurrencyStore>()(
  devtools(
    persist(
      (set, get) => ({
        currency: "USD",
        setCurrency: (currency) => set({ currency }),
        convertPrice: (priceInUSD) => priceInUSD * conversionRates[get().currency],
      }),
      {
        name: "currency-storage",
      }
    ),
  )
);