import React, { useState } from "react";
import "./Header.css";
import BellIcon from "../../assets/Bell.png";
import ProfileImgHeader from "../../assets/profileImage.png";

const Header = ({
  fname,
  lname,
  options,
  filteredData,
  setFilteredData,
  wordEntered,
  setWordEntered,
}) => {
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = options.filter((value) => {
      return (
        value.title
          .toString()
          .toLowerCase()
          .includes(searchWord.toString().toLowerCase()) ||
        value.author
          .toString()
          .toLowerCase()
          .includes(searchWord.toString().toLowerCase())
      );
    });
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };
  const name = "Ishaan Jain";
  return (
    <div className="headerWrapper">
      <div className="searchbar">
        <input
          type="text"
          placeholder="Enter name or artist"
          value={wordEntered}
          onChange={handleFilter}
          className="searchbarHeader"
        />
      </div>
      <div className="userDetailsHeader">
        <div className="userDetailHeader">
          <img src={BellIcon} alt="/" />
        </div>
        <div className="userDetailHeader">{name}</div>
        <div className="userDetailHeader">
          <img src={ProfileImgHeader} alt="/" />
        </div>
      </div>
    </div>
  );
};

export default Header;
