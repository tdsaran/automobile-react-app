import classNames from "classnames";
import { FC } from "react";
import { AutomobileType } from "../../types";
import "./DisplayTile.scss";

interface TileProps extends AutomobileType {
  selectedItem?: string;
  setSelectedItem?: (item: string) => void;
}

const DisplayTile: FC<TileProps> = ({
  id,
  brand,
  photo,
  selectedItem = "",
  setSelectedItem,
}) => {
  return (
    <div
      className={classNames("tile-base-container", {
        selected: selectedItem === id,
      })}
      key={id}
      role="none"
      onClick={() => {
        if (setSelectedItem) {
          setSelectedItem(id);
        }
      }}
    >
      {photo && <img width="50" height="50" src={photo} alt="" />}
      <span>{brand}</span>
    </div>
  );
};

export default DisplayTile;
