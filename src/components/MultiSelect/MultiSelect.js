import React, { useState, useEffect, useRef } from "react";
import "./MultiSelect.css";

function MultiSelect({ options, label, value, onChange, reset }) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(value); // Chỉ lưu key
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const list = Object.entries(options); // Convert object thành mảng key-value

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (reset === true) setSelected(value);
  }, [reset]);

  const toggleSelect = (key) => {
    let newSelected;

    if (key === "0") {
      // Chọn tất cả
      if (selected.length !== list.length - 1) {
        newSelected = list.filter(([k]) => k !== "0").map(([k]) => k);
      } else {
        newSelected = [];
      }
    } else {
      if (selected.includes(key)) {
        newSelected = selected.filter((item) => item !== key); // Bỏ chọn
      } else {
        newSelected = [...selected, key]; // Thêm vào nếu chưa chọn
      }
    }

    setSelected(newSelected);
    if (onChange) {
      if (newSelected.length !== list.length - 1) {
        onChange(newSelected);
      } else onChange(["0"]);
    }
  };

  const filteredOptions = list.filter(([key, value]) =>
    value.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="multi-select" ref={dropdownRef}>
      <div className="multi-select_filter-label" onClick={() => setOpen(!open)}>
        {selected.length > 0 ? (
          <span className="multi-select_filter-label_info">
            {selected.map((key, index) => (
              <React.Fragment key={key}>
                {index > 0 ? ", " : ""}
                {options[key]}
              </React.Fragment>
            ))}
          </span>
        ) : (
          <span>{label}</span>
        )}
        <i className="fa-solid fa-chevron-down"></i>
      </div>
      <div
        className={
          open ? "multi-select_filter-drop active" : "multi-select_filter-drop"
        }
      >
        <div className="multi-select_filter-drop_search">
          <input
            type="text"
            placeholder="Tìm kiếm ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <i className="fa-solid fa-search"></i>
        </div>
        <div className="multi-select_filter-drop_table">
          {filteredOptions.map(([key, value]) => (
            <div
              key={key}
              onClick={() => toggleSelect(key)}
              className={
                selected.includes(key) || selected.length === list.length - 1
                  ? "multi-select_filter-drop_table_item active"
                  : "multi-select_filter-drop_table_item"
              }
            >
              <span>{value}</span>
              <div className="multi-select_filter-drop_table_item_btn">
                <i className="fa-solid fa-check"></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MultiSelect;
