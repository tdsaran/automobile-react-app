import { FC, useCallback, useMemo, useRef } from "react";
import "./Input.scss";

interface InputProps {
  value: string;
  setValue: (item: string) => void;
}

const ImageUpload: FC<InputProps> = ({ value, setValue }) => {
  const fileUploadRef = useRef<HTMLInputElement>(null);

  const onUploadHandler = useCallback(() => {
    var reader = new FileReader();
    reader.onloadend = function () {
      setValue(reader.result as string);
    };
    if (fileUploadRef.current?.files) {
      reader.readAsDataURL(fileUploadRef.current.files[0]);
    }
  }, [setValue]);

  const fileUploadElement = useMemo(() => {
    return (
      <div className="file-upload">
        {value && <img width="30" height="30" src={value} alt="" />}
        <input
          type="file"
          id="files"
          name="photo"
          ref={fileUploadRef}
          className="hide-field"
          onChange={onUploadHandler}
        />
        <label className="upload-file-label" htmlFor="files">
          Browse file
        </label>
      </div>
    );
  }, [value, onUploadHandler]);

  return fileUploadElement;
};

export default ImageUpload;
