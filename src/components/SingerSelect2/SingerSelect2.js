import React, { useState, useEffect, useRef } from "react";
import "./SingerSelect2.css";

function SingerSelect2({ options, label, value, onChange }) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(value);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const list = Object.entries(options); // Chuyển object thành array [key, value]

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

  const toggleSelect = (key, value) => {
    setSelected([key]); // Cập nhật state với giá trị được chọn
    if (onChange) {
      onChange(key); // Trả về key thay vì index
    }
  };

  const filteredOptions = list.filter(([key, option]) =>
    option.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="singer-select-2" ref={dropdownRef}>
      <div
        className="singer-select-2_filter-label"
        onClick={() => setOpen(!open)}
      >
        {selected.length > 0 ? (
          <span className="singer-select-2_filter-label_info">
            {options[selected]}
          </span>
        ) : (
          <span>{label}</span>
        )}
        <i className="fa-solid fa-chevron-down"></i>
      </div>
      <div
        className={
          open
            ? "singer-select-2_filter-drop active"
            : "singer-select-2_filter-drop"
        }
      >
        <div className="singer-select-2_filter-drop_search">
          <input
            type="text"
            placeholder="Tìm kiếm ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <i className="fa-solid fa-search"></i>
        </div>
        <div className="singer-select-2_filter-drop_table">
          {filteredOptions.map(([key, value]) => (
            <div
              key={key}
              onClick={() => toggleSelect(key, value)}
              className={
                selected.includes(key)
                  ? "singer-select-2_filter-drop_table_item active"
                  : "singer-select-2_filter-drop_table_item"
              }
            >
              <span>{value}</span>
              <div className="singer-select-2_filter-drop_table_item_btn">
                <i className="fa-solid fa-check"></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SingerSelect2;
