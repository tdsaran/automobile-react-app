import { FC, useEffect, useMemo, useState } from "react";
import "./Input.scss";

type inputType = string | number;

interface InputProps {
  inputId: string;
  value?: any;
  type?: string;
  options?: string[];
  isMultiSelect?: boolean;
  setValue?: (value: any) => void;
}

const Input: FC<InputProps> = ({
  inputId,
  value = "",
  type = "text",
  options = [],
  isMultiSelect = false,
  setValue,
}) => {
  const [curValue, setCurValue] = useState<inputType>("");
  const [checkList, setCheckList] = useState<string[]>([]);

  useEffect(() => {
    setCurValue(value);
    if (value && isMultiSelect) {
      setCheckList(value);
    }
  }, [value, isMultiSelect]);

  const inputElement = useMemo(() => {
    if (type === "select") {
      return (
        <select
          name={inputId}
          id={inputId}
          multiple={isMultiSelect}
          onChange={(e) => {
            if (setValue) {
              setValue(
                Array.from(e.target.options)
                  .filter((item) => item.selected)
                  .map((item) => item.value)
              );
            }
          }}
        >
          {options.map((option) => (
            <option
              key={`select-${option}`}
              value={option}
              defaultValue={value}
            >
              {option}
            </option>
          ))}
        </select>
      );
    } else if (type === "checkbox-group" || type === "radio-group") {
      const inputType = type.split("-")[0];
      let selectedOptions = [curValue];
      if (isMultiSelect) {
        selectedOptions = checkList;
      }
      return (
        <div className="input-group-option">
          {options.map((option) => (
            <div key={`group-${option}`} className="group-item">
              <input
                type={inputType}
                value={option}
                name={inputId}
                id={inputId}
                key={`check-${option}`}
                checked={selectedOptions.includes(option)}
                onChange={(e) => {
                  if (isMultiSelect) {
                    //enable multi select
                    let options: string[] = [];
                    if (selectedOptions.includes(option)) {
                      options = checkList.filter(
                        (item) => item !== e.target.value
                      );
                    } else {
                      options = [...checkList, e.target.value];
                    }
                    setCheckList(options);
                    if (setValue) {
                      setValue(options);
                    }
                  } else {
                    setCurValue(e.target.value);
                    if (setValue) {
                      setValue(e.target.value);
                    }
                  }
                }}
              />
              <label htmlFor={inputId}>{option}</label>
            </div>
          ))}
        </div>
      );
    }
    return (
      <input
        type={type}
        id={inputId}
        name={inputId}
        value={curValue}
        onChange={(e) => {
          setCurValue(e.target.value);
          if (setValue) {
            setValue(e.target.value);
          }
        }}
      />
    );
  }, [
    curValue,
    inputId,
    type,
    value,
    checkList,
    options,
    isMultiSelect,
    setValue,
  ]);

  return (
    <div className="input-base-container">
      <label htmlFor={inputId}>
        {inputId.charAt(0).toUpperCase() + inputId.slice(1)}
      </label>
      {inputElement}
    </div>
  );
};

export default Input;
