import React, { useState, useRef, useEffect } from "react";
import "./RangeSelect.css";

function RangeSelect({ label, check, value, onChange, reset }) {
  const [range, setRange] = useState(value || { from: "", to: "" });
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

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
    if (reset === true) setRange(value || { from: "", to: "" });
  }, [reset]);

  useEffect(() => {
    if (label === "Điểm chuẩn") {
      setRange({ from: "", to: "" });
    }
  }, [check]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let numericValue = value.replace(/[^0-9.]/g, ""); // Chỉ cho phép số và dấu chấm

    // Chỉ cho phép một dấu chấm duy nhất
    const dotCount = (numericValue.match(/\./g) || []).length;
    if (dotCount > 1) {
      numericValue = numericValue.slice(0, -1);
    }

    setRange((prev) => {
      const updated = { ...prev, [name]: numericValue };
      console.log(updated);
      if (onChange) onChange([updated.from, updated.to]);
      return updated;
    });
  };

  return (
    <div className="range-select" ref={dropdownRef}>
      <div
        className={
          (!check || Object.keys(check).length === 0 || check[0] === "0") &&
          label === "Điểm chuẩn"
            ? "range-select_filter-label disable"
            : "range-select_filter-label"
        }
        onClick={() => setOpen(!open)}
      >
        <span className={range.from && range.to ? "active" : ""}>
          {range.from && range.to
            ? label === "Điểm chuẩn"
              ? `Từ: ${range.from} - ${range.to}`
              : `Từ: ${range.from}M - ${range.to}M`
            : label}
        </span>
        <i className="fa-solid fa-chevron-down"></i>
      </div>
      {open && (
        <div className="range-select_filter-drop active">
          <div className="range-select_container">
            <label>Từ</label>
            <input
              type="text"
              name="from"
              placeholder={
                label === "Điểm chuẩn" ? "Nhập số điểm" : "Nhập số tiền"
              }
              value={range.from}
              onChange={handleChange}
            />
          </div>
          <div className="range-select_container">
            <label>Đến</label>
            <input
              type="text"
              name="to"
              placeholder={
                label === "Điểm chuẩn" ? "Nhập số điểm" : "Nhập số tiền"
              }
              value={range.to}
              onChange={handleChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default RangeSelect;
