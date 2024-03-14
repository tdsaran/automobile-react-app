import { useMemo, useState } from "react";
import { AutomobileType } from "types";
import "./HomeContainer.scss";
import DetailForm from "./DetailForm/DetailForm";
import DisplayTile from "../DisplayTile/DisplayTile";
import { useSelector, useDispatch } from "react-redux";
import { updateData } from "../../slices/automobileSlice";
import { IRootState } from "stores/store";

function HomeContainer() {
  const [selectedItem, setSelectedItem] = useState("");
  const automobiles = useSelector(
    (state: IRootState) => state.automobiles.data
  );
  const dispatch = useDispatch();

  const selectedData = useMemo(() => {
    return automobiles.find((automobile) => automobile.id === selectedItem);
  }, [selectedItem, automobiles]);

  return (
    <div className="home-container">
      <div className="tile-list-container">
        {automobiles.map((item) => (
          <DisplayTile
            key={item.id}
            {...item}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        ))}
      </div>
      {selectedData && (
        <DetailForm
          data={selectedData}
          updateHandler={(updatedData) => {
            const data = automobiles.reduce<AutomobileType[]>(
              (prev, curData) => {
                if (curData.id === selectedData.id) {
                  return [
                    ...prev,
                    {
                      ...curData,
                      ...updatedData,
                    },
                  ];
                }
                return [...prev, curData];
              },
              []
            );
            dispatch(updateData(data));
          }}
        />
      )}
    </div>
  );
}

export default HomeContainer;
