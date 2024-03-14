import Input from "components/Input/Input";
import numberSuffix from "helpers/numberSuffix";
import { FC, FormEvent, useMemo, useRef, useState } from "react";
import { AutomobileType } from "../../../types";
import { FilterContext } from "../../../contexts/FilterProvider";
import "../ServiceContainer.scss";

interface FilterViewProps {
  automobileData: AutomobileType[];
}

const FilterView: FC<FilterViewProps> = ({ automobileData }) => {
  const formRef = useRef<HTMLFormElement>(null);

  const [selectedBodyType, setSelectedBodyType] = useState<string[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedOwners, setSelectedOwners] = useState<string>("");
  const [selectedFuelType, setSelectedFuelType] = useState<string>("");
  const [selectedTransmission, setSelectedTransmission] = useState<string>("");

  // Get possible saved options from data
  const { locations, bodyTypes, models, noOfOwners, fuelTypes, transmissions } =
    useMemo(() => {
      const locationSet = new Set<string>("");
      const bodyTypeSet = new Set<string>("");
      const colorSet = new Set<string>("");
      const modelSet = new Set<string>("");
      const ownersSet = new Set<string>("");
      const fuelTypeSet = new Set<string>("");
      const transmissionSet = new Set<string>("");
      automobileData.forEach((item) => {
        locationSet.add(item.location);
        bodyTypeSet.add(item.bodyType);
        colorSet.add(item.color);
        modelSet.add(item.model);
        ownersSet.add(item.noOfOwners.toString());
        fuelTypeSet.add(item.fuelType);
        transmissionSet.add(item.transmission);
      });
      return {
        locations: Array.from(locationSet),
        bodyTypes: Array.from(bodyTypeSet),
        colors: Array.from(colorSet),
        models: Array.from(modelSet),
        noOfOwners: Array.from(ownersSet).map((item) => numberSuffix(item)),
        fuelTypes: Array.from(fuelTypeSet),
        transmissions: Array.from(transmissionSet),
      };
    }, [automobileData]);

  const onSubmitHandler = (
    setValue: (value: any) => void,
    event?: FormEvent<HTMLFormElement>
  ) => {
    if (formRef.current) {
      const formControls = formRef.current?.elements;

      const formData = {
        location: formControls["location"].value,
        ...(selectedBodyType.length > 0 && { bodyType: selectedBodyType }),
        ...(selectedModels.length > 0 && { model: selectedModels }),
        ...(selectedOwners && {
          noOfOwners: +selectedOwners.slice(0, selectedOwners.length - 2),
        }),
        ...(selectedFuelType && { fuelType: selectedFuelType }),
        ...(selectedTransmission && { transmission: selectedTransmission }),
      };
      setValue(formData);
    }
    event?.preventDefault();
  };

  return (
    <div className="filter-view-container">
      <FilterContext.Consumer>
        {({ setFilterData }) => (
          <>
            <form
              className="filter-form-container"
              ref={formRef}
              onSubmit={(e) => onSubmitHandler(setFilterData, e)}
            >
              <Input type="select" inputId="location" options={locations} />
              <Input
                type="select"
                inputId="bodyType"
                options={bodyTypes}
                isMultiSelect
                value={selectedBodyType}
                setValue={setSelectedBodyType}
              />
              <Input
                type="checkbox-group"
                inputId="model"
                options={models}
                isMultiSelect
                value={selectedModels}
                setValue={setSelectedModels}
              />
              <Input
                type="radio-group"
                inputId="noOfOwners"
                options={noOfOwners}
                value={selectedOwners}
                setValue={setSelectedOwners}
              />
              <Input
                type="radio-group"
                inputId="fuelType"
                options={fuelTypes}
                value={selectedFuelType}
                setValue={setSelectedFuelType}
              />
              <Input
                type="radio-group"
                inputId="transmission"
                options={transmissions}
                value={selectedTransmission}
                setValue={setSelectedTransmission}
              />
            </form>
            <button
              type="submit"
              onClick={() => onSubmitHandler(setFilterData)}
            >
              Submit
            </button>
          </>
        )}
      </FilterContext.Consumer>
    </div>
  );
};

export default FilterView;
