'use client'
import { createContext, useContext } from "react";
import { useGuitarRefs } from "@/hooks/useGuitarRefs";
import type { ReactNode } from "react";

type GuitarContextType = {
  refs: ReturnType<typeof useGuitarRefs>;
};

const GuitarContext = createContext<GuitarContextType | null>(null);

export function GuitarProvider({ children }: { children: ReactNode }) {
  const refs = useGuitarRefs();

  return (
    <GuitarContext.Provider
      value={{
        refs,
      }}
    >
      {children}
    </GuitarContext.Provider>
  );
}

export function useGuitar() {
  const context = useContext(GuitarContext);
  if (!context) {
    throw new Error("useGuitar must be used within a GuitarProvider");
  }
  return context;
}
