import FilterView from "components/ServiceContainer/FilterView/FilterView";
import DisplayTile from "components/DisplayTile/DisplayTile";
import { FC, useCallback } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "stores/store";
import { AutomobileType } from "types";
import FilterProvider, { FilterContext } from "../../contexts/FilterProvider";
import "./ServiceContainer.scss";

const ServiceContainer: FC = () => {
  const automobileData = useSelector(
    (state: IRootState) => state.automobiles.data
  );

  const filteredAutomobiles = useCallback(
    (filteredData: AutomobileType) => {
      if (filteredData && Object.keys(filteredData).length > 0) {
        return automobileData.filter((item) => {
          return Object.entries(filteredData).every(([key, value]) => {
            if (Array.isArray(value)) {
              return value.includes(item[key].toString());
            }
            return (
              item[key].toString().toLowerCase() ===
              value.toString().toLowerCase()
            );
          });
        });
      }
      return [];
    },
    [automobileData]
  );

  return (
    <div className="service-base-container">
      <FilterProvider>
        <FilterView automobileData={automobileData} />
        <FilterContext.Consumer>
          {({ filterData }) => {
            const searchData = filteredAutomobiles(filterData);
            return (
              <>
                <div className="search-result">
                  {searchData.map((automobile) => (
                    <DisplayTile {...automobile} key={automobile.id} />
                  ))}
                </div>
              </>
            );
          }}
        </FilterContext.Consumer>
      </FilterProvider>
    </div>
  );
};

export default ServiceContainer;
