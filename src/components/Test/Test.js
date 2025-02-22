import React, { useState } from "react";
// import "./Test.css";

const universities = [
  { Ten_Truong: "Trường Đại học Bách khoa Hà Nội", Ma_Truong: "BKA" },
  { Ten_Truong: "Đại học Bách Khoa - ĐHQG TP.HCM", Ma_Truong: "HCMUT" },
  {
    Ten_Truong: "Phân hiệu Đại học Quốc gia TP Hồ Chí Minh tại tỉnh Bến Tre",
    Ma_Truong: "VNUBT",
  },
  { Ten_Truong: "Đại học Bách khoa - Đại học Đà Nẵng", Ma_Truong: "DUT" },
  { Ten_Truong: "Học viện Công nghệ Bưu chính Viễn thông", Ma_Truong: "PTIT" },
  { Ten_Truong: "Đại học Y Dược Thái Bình", Ma_Truong: "TUMP" },
  { Ten_Truong: "Học viện Cán bộ Thành phố Hồ Chí Minh", Ma_Truong: "HCCT" },
];

const Test = () => {
  const [query, setQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim() === "") {
      setFilteredResults([]);
      setShowDropdown(false);
      return;
    }

    const results = universities.filter(
      (uni) =>
        uni.Ten_Truong.toLowerCase().includes(value.toLowerCase()) ||
        uni.Ma_Truong.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredResults(results);
    setShowDropdown(results.length > 0);
  };

  const handleSelect = (name) => {
    setQuery(name);
    setShowDropdown(false);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Tìm kiếm trường..."
        value={query}
        onChange={handleSearch}
        onFocus={() => setShowDropdown(filteredResults.length > 0)}
      />
      <i className="fa-solid fa-search search-icon"></i>
      {showDropdown && (
        <ul className="search-dropdown">
          {filteredResults.map((uni, index) => (
            <li key={index} onClick={() => handleSelect(uni.Ten_Truong)}>
              {uni.Ten_Truong}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Test;
