import { React, useState, useEffect } from "react";
import "./FilterSearch.css";
import MultiSelect from "../MultiSelect/MultiSelect";
import SingerSelect from "../SingerSelect/SingerSelect";
import RangeSelect from "../RangeSelect/RangeSelect";

function FilterSearch({
  appHandleProvinceChange,
  appHandleTypeChange,
  appHandleMajorChange,
  appHandleExamBlockChange,
  appHandleYearChange,
  appHandleMethodChange,
  appHandleTuitionChange,
  appHandleScoreChange,
  appHandleCodeChange,
}) {
  const [selectedProvinces, setSelectedProvinces] = useState(["1"]);
  const [selectedType, SetSelectedType] = useState([]);
  const [selectedMajor, SetSelectedMajor] = useState([]);
  const [selectedExamBlock, SetSelectedExamBlock] = useState([]);
  const [selectedYear, SetSelectedYear] = useState(["1"]);
  const [selectedMethod, SetSelectedMethod] = useState([]);
  const [selectedTuition, SetSelectedTuition] = useState([]);
  const [selectedScore, SetSelectedScore] = useState([]);

  const [universities, setUniversities] = useState([]);

  const [province, setProvince] = useState([]);
  const [type, setType] = useState([]);
  const [major, setMajor] = useState([]);
  const [examBlock, setExamBlock] = useState([]);
  const [year, setYear] = useState([]);
  const [method, setMethod] = useState([]);
  const [tuition, setTuition] = useState([]);
  const [score, setScore] = useState([]);

  const [filteredUniversities, setFilteredUniversities] = useState([]);
  const [search, setSearch] = useState("");
  const [toggle, setToggle] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetch("/data/Truong.json") // Đúng đường dẫn tới file JSON
      .then((response) => response.json())
      .then((json) => {
        setUniversities(
          json.reduce((acc, uni) => {
            if (uni.Ma_Truong && uni.Ten_Truong) {
              acc[uni.Ma_Truong] = uni.Ten_Truong;
            }
            return acc;
          }, {})
        );
      })
      .catch((error) => console.error("Lỗi khi tải JSON:", error));
    fetch("/data/Tinh_Thanh.json") // Đúng đường dẫn tới file JSON
      .then((response) => response.json())
      .then((json) => {
        setProvince(json);
      })
      .catch((error) => console.error("Lỗi khi tải JSON:", error));
    fetch("/data/Loai_Hinh.json") // Đúng đường dẫn tới file JSON
      .then((response) => response.json())
      .then((json) => {
        setType(json);
      })
      .catch((error) => console.error("Lỗi khi tải JSON:", error));
    fetch("/data/Nhom_Nganh.json") // Đúng đường dẫn tới file JSON
      .then((response) => response.json())
      .then((json) => {
        setMajor(json);
      })
      .catch((error) => console.error("Lỗi khi tải JSON:", error));
    fetch("/data/Khoi_Thi.json") // Đúng đường dẫn tới file JSON
      .then((response) => response.json())
      .then((json) => {
        setExamBlock(json);
      })
      .catch((error) => console.error("Lỗi khi tải JSON:", error));
    fetch("/data/Nam.json") // Đúng đường dẫn tới file JSON
      .then((response) => response.json())
      .then((json) => {
        setYear(json);
      })
      .catch((error) => console.error("Lỗi khi tải JSON:", error));
    fetch("/data/Phuong_Thuc.json") // Đúng đường dẫn tới file JSON
      .then((response) => response.json())
      .then((json) => {
        setMethod(json);
      })
      .catch((error) => console.error("Lỗi khi tải JSON:", error));
  }, []);

  const handleProvinceChange = (selectedValues) => {
    setSelectedProvinces(selectedValues); // Cập nhật state
    appHandleProvinceChange(selectedValues);
  };
  const handleTypeChange = (selectedValues) => {
    SetSelectedType(selectedValues); // Cập nhật state
    appHandleTypeChange(selectedValues);
  };
  const handleMajorChange = (selectedValues) => {
    SetSelectedMajor(selectedValues); // Cập nhật state
    appHandleMajorChange(selectedValues);
  };
  const handleExamBlockChange = (selectedValues) => {
    SetSelectedExamBlock(selectedValues); // Cập nhật state
    appHandleExamBlockChange(selectedValues);
  };
  const handleYearChange = (selectedValues) => {
    SetSelectedYear(selectedValues); // Cập nhật state
    appHandleYearChange(selectedValues);
  };
  const handleMethodChange = (selectedValues) => {
    SetSelectedMethod(selectedValues); // Cập nhật state
    appHandleMethodChange(selectedValues);
  };
  const handleTuitionChange = (selectedValues) => {
    SetSelectedTuition(selectedValues); // Cập nhật state
    appHandleTuitionChange(selectedValues);
  };
  const handleScoreChange = (selectedValues) => {
    SetSelectedScore(selectedValues); // Cập nhật state
    appHandleScoreChange(selectedValues);
  };

  const handleChange = (selectedValues) => {
    setSearch(selectedValues);
    if (selectedValues.trim() === "") {
      setFilteredUniversities([]);
      setShowDropdown(false);
      return;
    }

    const list = Object.entries(universities);

    const results = list.filter(
      ([key, value]) =>
        key.toLowerCase().includes(search.toLowerCase()) ||
        value.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredUniversities(results);
    setShowDropdown(filteredUniversities.length > 0);
  };

  const handleSelect = ([key, value]) => {
    setSearch(value);
    setShowDropdown(false);
    appHandleCodeChange(key);
  };

  console.log(filteredUniversities);
  return (
    <div className="filter-search">
      <div className="filter-search_header">
        <div className="filter-search_header_title">
          <div
            className={
              !toggle
                ? "filter-search_header_title_filter active"
                : "filter-search_header_title_filter"
            }
            onClick={() => setToggle(false)}
          >
            <i class="fa-solid fa-filter"></i>
            <span>Bộ lọc</span>
          </div>
          <div
            className={
              toggle
                ? "filter-search_header_title_filter active"
                : "filter-search_header_title_filter"
            }
            onClick={() => setToggle(true)}
          >
            <i class="fa-solid fa-search"></i>
            <span>Tìm theo tên</span>
          </div>
        </div>
        {/* <div className="filter-search_filterUniverity_header-title">
          Tìm theo tên<nav></nav>
        </div> */}
      </div>
      <div className="filter-search_body">
        <div
          className={
            !toggle
              ? "filter-search_body_filter-univerity active"
              : "filter-search_body_filter-univerity"
          }
        >
          <div className="filter-search_body_filter-univerity_row">
            <MultiSelect
              options={province}
              label="Thành phố / Tỉnh"
              value={selectedProvinces}
              onChange={handleProvinceChange}
            />
            <MultiSelect
              options={type}
              label="Loại hình"
              value={selectedType}
              onChange={handleTypeChange}
            />
            <MultiSelect
              options={major}
              label="Ngành học"
              value={selectedMajor}
              onChange={handleMajorChange}
            />
            <MultiSelect
              options={examBlock}
              label="Khối thi"
              value={selectedExamBlock}
              onChange={handleExamBlockChange}
            />
          </div>
          <div className="filter-search_body_filter-univerity_row">
            <SingerSelect
              options={year}
              label="Năm"
              value={selectedYear}
              onChange={handleYearChange}
            />
            <SingerSelect
              options={method}
              label="Phương thức xét"
              value={selectedMethod}
              onChange={handleMethodChange}
            />
            <RangeSelect
              options={tuition}
              label="Học phí"
              value={selectedTuition}
              //   check = (selectedMethod. === "0") ?
              onChange={handleTuitionChange}
            />
            <RangeSelect
              options={score}
              label="Điểm chuẩn"
              check={selectedMethod}
              value=""
              onChange={handleScoreChange}
            />
          </div>

          {/* <div className="filter-search_body_filter-univerity_button">
            Tìm kiếm
          </div> */}
        </div>

        <div
          className={
            toggle
              ? "filter-search_body_search-name active"
              : "filter-search_body_search-name"
          }
        >
          <div
            onClick={() => handleSelect(["X", search])}
            className="filter-search_body_search-name_btn"
          >
            <input
              type="text"
              placeholder="Nhập tên hoặc mã trường"
              value={search}
              onChange={(e) => handleChange(e.target.value)}
            />
            <i className="fa-solid fa-search"></i>
          </div>
          <div
            className={
              showDropdown
                ? "filter-search_body_search-name_drop-table active"
                : "filter-search_body_search-name_drop-table"
            }
          >
            {filteredUniversities.map(([key, value]) => (
              <div
                className="filter-search_body_search-name_drop-table_item"
                key={key}
                onClick={() => handleSelect([key, value])}
              >
                {value}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterSearch;
