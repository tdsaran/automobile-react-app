import ImageUpload from "components/Input/ImageUpload";
import Input from "components/Input/Input";
import { FC, FormEvent, useEffect, useRef, useState } from "react";
import { AutomobileType } from "../../../types";
import "./DetailForm.scss";

interface FormProps {
  data: AutomobileType;
  updateHandler: (item: { [key: string]: string | number }) => void;
}

const DetailForm: FC<FormProps> = ({ data, updateHandler }) => {
  const { brand, photo, color, location, noOfOwners } = data;
  const [curPhoto, setCurPhoto] = useState("");
  const [savedData, setSavedData] = useState({});
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setCurPhoto(photo);
    setSavedData({});
  }, [photo]);

  const onSubmitHandler = (event?: FormEvent<HTMLFormElement>) => {
    if (formRef.current?.elements) {
      const formControls = formRef.current?.elements;
      const updatedData = Array.from(formControls).reduce((prev, cur) => {
        const curElement = cur as HTMLInputElement;
        return {
          ...prev,
          [curElement.name]: curElement.value,
        };
      }, {});
      setSavedData(updatedData);
      updateHandler({ ...updatedData, photo: curPhoto });
    }
    event?.preventDefault();
  };

  return (
    <>
      <form
        onSubmit={(e) => onSubmitHandler(e)}
        ref={formRef}
        className="form-base-container"
      >
        <Input value={brand} inputId={"brand"} />
        <Input value={location} inputId={"location"} />
        <Input value={color} inputId={"color"} />
        <Input value={noOfOwners} inputId={"noOfOwners"} type={"number"} />
        <ImageUpload value={curPhoto} setValue={setCurPhoto} />
      </form>
      <button type="submit" onClick={() => onSubmitHandler()}>
        Submit
      </button>
      {savedData && <div>{JSON.stringify(savedData)}</div>}
    </>
  );
};

export default DetailForm;
