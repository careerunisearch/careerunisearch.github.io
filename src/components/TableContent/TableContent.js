import React, { use, useEffect, useState } from "react";
import "./TableContent.css";
import FormDetail from "../FormDetail";
import img1 from "../../img/not_found.svg";

function TableContent({
  filterProvinces,
  filterType,
  filterMajor,
  filterExamBlock,
  filterYear,
  filterMethod,
  filterTuition,
  filterScore,
  filterCode,
}) {
  const [universities, setUniversities] = useState([]);
  const [lastData, setLastData] = useState([]);
  const [lastDataDisplay, setLastDataDisplay] = useState([]);

  const [totalItems, setTotalItems] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;

  const [province, setProvince] = useState([]);
  const [type, setType] = useState([]);
  const [method, setMethod] = useState([]);
  const [major, setMajor] = useState([]);
  const [examBlock, setExamBlock] = useState([]);

  const [listCarrer, setListCarrer] = useState([]);
  const [listSource, setListSource] = useState([]);
  const [trigger, setTrigger] = useState(true);
  const [loading, setLoading] = useState(false);

  //   console.log("selectedName: " + filterName);
  // lấy kí hiệu
  useEffect(() => {
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
    fetch("/data/Phuong_Thuc.json") // Đúng đường dẫn tới file JSON
      .then((response) => response.json())
      .then((json) => {
        setMethod(json);
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
  }, []);

  // lấy thông tin truòng
  useEffect(() => {
    fetch("/data/Truong.json") // Đúng đường dẫn tới file JSON
      .then((response) => response.json())
      .then((json) => {
        setUniversities(json);
      })
      .catch((error) => console.error("Lỗi khi tải JSON:", error));
  }, []);

  // lấy thông tin ngành các năm
  useEffect(() => {
    if (filterYear == "1") {
      fetch("/data/Danh_Sach_Nganh_2024.json") // Đúng đường dẫn tới file JSON
        .then((response) => response.json())
        .then((json) => {
          setListCarrer(json);
        })
        .catch((error) => console.error("Lỗi khi tải JSON:", error));

      fetch("/data/Source_2024.json") // Đúng đường dẫn tới file JSON
        .then((response) => response.json())
        .then((json) => {
          setListSource(json);
        })
        .catch((error) => console.error("Lỗi khi tải JSON:", error));
    } else if (filterYear == "2") {
      fetch("/data/Danh_Sach_Nganh_2023.json") // Đúng đường dẫn tới file JSON
        .then((response) => response.json())
        .then((json) => {
          setListCarrer(json);
        })
        .catch((error) => console.error("Lỗi khi tải JSON:", error));
      fetch("/data/Source_2023.json") // Đúng đường dẫn tới file JSON
        .then((response) => response.json())
        .then((json) => {
          setListSource(json);
        });
    } else if (filterYear == "3") {
      fetch("/data/Danh_Sach_Nganh_2022.json") // Đúng đường dẫn tới file JSON
        .then((response) => response.json())
        .then((json) => {
          setListCarrer(json);
        })
        .catch((error) => console.error("Lỗi khi tải JSON:", error));
      fetch("/data/Source_2022.json") // Đúng đường dẫn tới file JSON
        .then((response) => response.json())
        .then((json) => {
          setListSource(json);
        });
    }
  }, [filterYear]);

  //   console.log("selectedMethod: " + listCarrer);

  // lọc bằng tìm kiếm
  useEffect(() => {
    setLoading(true);

    const startTime = Date.now(); // Lưu thời điểm bắt đầu
    const filteredUniversities = universities.filter((uni) => {
      return filterCode.includes(uni.Ma_Truong);
    });

    const filteredData = filteredUniversities
      .map((uni) => {
        const universityCode = uni.Ma_Truong;
        const majorList = listCarrer[universityCode] || [];
        const filteredMajors = majorList.filter((major) => {
          return 1;
        });
        return {
          ...uni,
          majors: filteredMajors,
        };
      })
      .filter((uni) => uni.majors.length > 0); // Chỉ giữ lại trường có ngành phù hợp

    setLastDataDisplay(filteredData);
    setTrigger(filteredData.length > 0);
    setLastData(filteredData);
    setTotalItems(filteredData.length);
    setPage(1);
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(100 - elapsedTime, 0);
    setTimeout(() => {
      setLoading(false);
    }, 100);
    //  setIsToggle(true);
  }, [listCarrer, filterCode]);

  // Hàm lọc danh sách trường theo 8 tiêu chí
  useEffect(() => {
    setLoading(true);

    const startTime = Date.now(); // Lưu thời điểm bắt đầu
    const filteredUniversities = universities.filter((uni) => {
      // console.log(filterProvinces + "uni Ma Tinh_Thanh: " + uni.Ma_Tinh_Thanh);
      // console.log(typeof uni.Ma_Tinh_Thanh, `"${uni.Ma_Tinh_Thanh}"`);

      return (
        (filterProvinces[0] === "0" ||
          Object.values(filterProvinces).includes(String(uni.Ma_Tinh_Thanh))) &&
        (filterType[0] === "0" ||
          Object.values(filterType).includes(String(uni.Ma_Loai_Hinh)))
      );
    });

    //  console.log(filteredUniversities.length);

    const filteredData = filteredUniversities
      .map((uni) => {
        const universityCode = uni.Ma_Truong;
        const majorList = listCarrer[universityCode] || [];
        const filteredMajors = majorList.filter((major) => {
          //  console.log("Nhom Nganh 11: " + (filterMethod === "1"));
          return (
            (filterMethod[0] === "0" ||
              (filterMethod[0] === "1" && parseFloat(major.TN_THPT) >= 0) ||
              (filterMethod[0] === "2" && parseFloat(major.DGNL) > 0) ||
              (filterMethod[0] === "3" && parseFloat(major.TSA) > 0)) &&
            (filterMajor.length === 0 ||
              (filterMajor[0] === "0" && filterMajor.length === 1) ||
              major.Nhom_Nganh.split(", ")
                .map((n) => n.trim()) // Đảm bảo loại bỏ khoảng trắng dư thừa
                .some((nganh) => {
                  console.log("Dung hay sai: " + filterMajor.includes(nganh));
                  return filterMajor.includes(nganh);
                })) &&
            ((filterExamBlock[0] === "0" && filterExamBlock.length === 1) ||
              major.Khoi_Thi.split(", ")
                .map((n) => n.trim()) // Đảm bảo loại bỏ khoảng trắng dư thừa
                .some((khoiThi) => {
                  console.log(
                    "Dung hay sai: " + filterExamBlock.includes(khoiThi)
                  );
                  return filterExamBlock.includes(khoiThi);
                })) &&
            (filterTuition.length === 0 ||
              (parseFloat(major.Hoc_Phi_Moi_Nam_Tu) >= filterTuition[0] &&
                parseFloat(major.Hoc_Phi_Moi_Nam_Den) <= filterTuition[1])) &&
            (filterScore.length === 0 ||
              filterMethod[0] === "0" ||
              (parseFloat(major.TN_THPT) >= filterScore[0] &&
                parseFloat(major.TN_THPT) <= filterScore[1]))
          );
        });
        return {
          ...uni,
          majors: filteredMajors,
        };
      })
      .filter((uni) => uni.majors.length > 0); // Chỉ giữ lại trường có ngành phù hợp
    // console.log(filteredData);
    setTotalItems(filteredData.length);
    const start = (page - 1) * limit;
    const end = start + limit;
    setLastDataDisplay(filteredData.slice(start, end));
    setTrigger(filteredData.length > 0);
    setLastData(filteredData);
    setTotalItems(filteredData.length);
    setPage(1);
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(100 - elapsedTime, 0);
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, [
    universities,
    listCarrer,
    filterProvinces,
    filterType,
    filterMethod,
    filterMajor,
    filterExamBlock,
    filterYear,
    filterTuition,
    filterScore,
  ]);

  useEffect(() => {
    const start = (page - 1) * limit;
    const end = start + limit;
    setLastDataDisplay(lastData.slice(start, end));
  }, [page]);
  //   console.log(filterCode);

  const totalPages = Math.ceil(totalItems / limit);

  const handleTriggerChange = (selectedValues) => {
    setTrigger(selectedValues);
  };

  return (
    <div className="table-content">
      <div
        className={
          loading ? "table-content_reload active" : "table-content_reload"
        }
      >
        <i class="fa-solid fa-rotate spin"></i>
      </div>
      <div
        className={
          trigger ? "table-content_body_info active" : "table-content_body_info"
        }
      >
        <div className="table-content_info_container">
          <div className="table-content_info_header_title">
            <p className="table-content_info_header_title_order">STT</p>
            <p className="table-content_info_header_title_name">Tên trường</p>
            <p className="table-content_info_header_title_code">Mã trường</p>
            <p className="table-content_info_header_title_type">Loại hình</p>
            <p className="table-content_info_header_title_address">
              Tỉnh thành
            </p>
            <i class="fa-solid fa-angle-down table-content_info_header_title_icon"></i>
          </div>
        </div>
        <div
          key={JSON.stringify(lastDataDisplay)}
          className="table-content_info_body"
        >
          {lastDataDisplay.map((item, index) => {
            return (
              <FormDetail
                key={index}
                index={index}
                page={page}
                limit={limit}
                data={item}
                province={province[item.Ma_Tinh_Thanh]}
                type={type[item.Ma_Loai_Hinh]}
                examBlock={examBlock}
                source={listSource}
                isToggle={lastDataDisplay.length === 1}
                onChange={handleTriggerChange}
              />
            );
          })}
        </div>

        <div
          className={
            totalPages > 1
              ? "table-content_info_footer active"
              : "table-content_info_footer"
          }
        >
          <button
            className="table-content_info_footer_icon"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            <i class="fa-solid fa-angle-left table-content_info_foote_icon"></i>
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <div
              className={
                page != i + 1
                  ? "table-content_info_footer_page"
                  : "table-content_info_footer_page active"
              }
              onClick={() => setPage(i + 1)}
            >
              <span>{i + 1}</span>
            </div>
          ))}
          <button
            className="table-content_info_footer_icon"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            <i class="fa-solid fa-angle-right table-content_info_footer_icon"></i>
          </button>
        </div>
      </div>

      <div
        className={
          !trigger
            ? "table-content_body_no-info active"
            : "table-content_body_no-info"
        }
      >
        <div className="table-content_body_no-info_text">
          <div className="table-content_body_no-info_text_title">
            <h1>Không tìm thấy kết quả nào</h1>
            <span>
              Không có trường nào phù hợp với tiêu chí mà bạn tìm kiếm
            </span>
          </div>

          <div className="table-content_body_no-info_text_hint">
            <span>Gợi ý: </span>
            <li>Hãy thử lọc theo những tiêu chí khác</li>
            <li>Hãy thử những tiêu chí chung hơn</li>
            <li>Giảm số lượng tiêu chí lọc</li>
          </div>
        </div>
        <div className="table-content_body_no-info_img">
          <img src={img1} alt="Không tìm thấy" />
        </div>
      </div>
    </div>
  );
}

export default TableContent;
