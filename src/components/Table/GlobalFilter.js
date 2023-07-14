import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";
// import { Images } from "../../../Assets/Strings/images";
// import "./styles.scss";

export const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);

  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 200);

  const deleteText = () => {
    setFilter("");
    setValue("");
    // console.log("clicked!!!");
  };

  return (
    <div className="position-relative searchDiv">
      {/* <img src={Images.search} alt="" className="searchIcon" /> */}
      {/* <img
        src={Images.deleteText}
        alt=""
        className="deleteIcon"
        onClick={deleteText}
      /> */}
      <input
        className="searchInput"
        type="text"
        id="search"
        name="search"
        value={value || ""}
        placeholder="Search"
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </div>
  );
};
