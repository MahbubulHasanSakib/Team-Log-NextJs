import React from "react";
import JsonData from "../data.json";
interface dropDownProps {
  setSearchName: (s: string) => void;
}
const DropDown = ({ setSearchName }: dropDownProps) => {
  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSearchName(value);
  };

  return (
    <>
      <select className="dropDown" onChange={selectChange}>
        {JsonData.records.map((d, idx) => {
          return (
            <option key={idx} value={d.PersonName}>
              {d.PersonName}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default DropDown;
