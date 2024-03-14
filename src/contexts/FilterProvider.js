import React, { useState } from "react";

export const FilterContext = React.createContext({});

const FilterProvider = ({ children }) => {
  const [filterData, setFilterData] = useState({});

  return (
    <FilterContext.Provider
      value={{
        filterData,
        setFilterData,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
