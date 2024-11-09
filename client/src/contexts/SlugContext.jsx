import { createContext, useContext, useState } from "react";

const SlugContext = createContext();

export const SlugProvider = ({ children }) => {
  const [brandSlug, setBrandSlug] = useState(undefined);

  return (
    <SlugContext.Provider value={{ brandSlug, setBrandSlug }}>
      {children}
    </SlugContext.Provider>
  );
};

export const useBrandSlug = () => useContext(SlugContext);
