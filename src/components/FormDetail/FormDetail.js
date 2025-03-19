import React, { useRef, useEffect, useState } from "react";
import "./FormDetail.css";

function FormDetail({
  index,
  page,
  limit,
  data,
  province,
  type,
  examBlock,
  source,
  isToggle,
}) {
  const [toggle, setToggle] = useState(isToggle);
  const [dataCareer, setDataCareer] = useState(data.majors);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    setToggle(isToggle);
  }, [page]);

  const handleWheel = (event) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const atTop = container.scrollTop === 0;
    const atBottom =
      container.scrollTop + container.clientHeight >= container.scrollHeight;

    if (!atTop && !atBottom) {
      event.stopPropagation(); // Ngăn trang web cuộn khi chưa chạm đỉnh/cuối
    }
  };

  return (
    <div className="form-detail">
      <div className="form-detail_data ">
        <div
          className={
            toggle
              ? "form-detail_data_header active"
              : "form-detail_data_header"
          }
          onClick={() => setToggle(!toggle)}
        >
          <p className="form-detail_data_order">
            {index + limit * (page - 1) + 1}
          </p>
          <p className="form-detail_data_name">{data.Ten_Truong}</p>
          <p className="form-detail_data_code">
            {data.Ma_Truong.endsWith("#") ? " " : data.Ma_Truong}
          </p>
          <p className="form-detail_data_type">{type}</p>
          <p className="form-detail_data_address">{province}</p>
          <i class="fa-solid fa-angle-down form-detail_data_icon"></i>
        </div>

        <div
          className={
            toggle
              ? "form-detail_data_detail active"
              : "form-detail_data_detail"
          }
        >
          <div className="form-detail_data_detail_header">
            <div className="form-detail_data_detail_info">
              <p>Địa Chỉ: </p>
              <div className="form-detail_data_detail_info_address">
                {data.Dia_Chi.split("\n").map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </div>
            <div className="form-detail_data_detail_info">
              <p>Website: </p>
              <a href={data.Website} target="_blank" rel="noopener noreferrer">
                {data.Website}
              </a>
            </div>
            <div className="form-detail_data_detail_info">
              <p>Nguồn điểm chuẩn: </p>
              {console.log(source[data.Ma_Truong]?.[0]?.TSA)}
              <a
                href={source[data.Ma_Truong]?.[0]?.TSA}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  source[data.Ma_Truong]?.[0]?.TSA != null &&
                  source[data.Ma_Truong]?.[0]?.TSA == ""
                    ? "form-detail_data_detail_info_link disable"
                    : "form-detail_data_detail_info_link"
                }
              >
                TSA
              </a>
              <a
                href={source[data.Ma_Truong]?.[0]?.DGNL}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  source[data.Ma_Truong]?.[0]?.DGNL != null &&
                  source[data.Ma_Truong]?.[0]?.DGNL == ""
                    ? "form-detail_data_detail_info_link disable"
                    : "form-detail_data_detail_info_link"
                }
              >
                ĐGNL
              </a>
              <a
                href={source[data.Ma_Truong]?.[0]?.TN_THPT}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  source[data.Ma_Truong]?.[0]?.TN_THPT != null &&
                  source[data.Ma_Truong]?.[0]?.TN_THPT == ""
                    ? "form-detail_data_detail_info_link disable"
                    : "form-detail_data_detail_info_link"
                }
              >
                TN THPT
              </a>
            </div>
            <div className="form-detail_data_detail_info">
              <p>Nguồn học phí: </p>
              <a
                href={source[data.Ma_Truong]?.[0]?.Hoc_Phi}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  source[data.Ma_Truong]?.[0]?.Hoc_Phi != null &&
                  source[data.Ma_Truong]?.[0]?.Hoc_Phi == ""
                    ? "form-detail_data_detail_info_link disable"
                    : "form-detail_data_detail_info_link"
                }
              >
                Học phí
              </a>
            </div>
          </div>
          <div className="form-detail_data_detail_body">
            <div className="form-detail_data_detail_body_title">
              <span>Ngành & Điểm chuẩn</span>
            </div>
            <div className="form-detail_data_detail_body_info">
              <div className="form-detail_data_detail_body_info_title">
                <p className="form-detail_data_detail_body_info_title_name">
                  Tên ngành
                </p>
                <p className="form-detail_data_detail_body_info_title_group">
                  Khối thi
                </p>
                <p className="form-detail_data_detail_body_info_title_other">
                  TSA
                </p>
                <p className="form-detail_data_detail_body_info_title_other">
                  ĐGNL
                </p>
                <p className="form-detail_data_detail_body_info_title_other">
                  TN THPT
                </p>
                <p className="form-detail_data_detail_body_info_title_money">
                  Học phí / năm (triệu đồng)
                </p>
              </div>

              <div
                ref={scrollContainerRef}
                onWheel={handleWheel}
                className="form-detail_data_detail_body_info_container"
              >
                {dataCareer.map((item, index) => (
                  <div
                    key={index}
                    className="form-detail_data_detail_body_info_container_data"
                  >
                    <p className="form-detail_data_detail_body_info_container_data_name">
                      {item.Ten_Nganh}
                    </p>
                    <p className="form-detail_data_detail_body_info_container_data_group">
                      {item.Khoi_Thi.split(",")
                        .map((num) => examBlock[parseInt(num.trim())])
                        .join(", ")}
                    </p>
                    <p className="form-detail_data_detail_body_info_container_data_other">
                      {item.TSA === "0" ? "-" : item.TSA}
                    </p>
                    <p
                      className="
				  form-detail_data_detail_body_info_container_data_other"
                    >
                      {item.DGNL === "0" ? "-" : item.DGNL}
                    </p>
                    <p className="form-detail_data_detail_body_info_container_data_other">
                      {item.TN_THPT == "-1"
                        ? "Đang cập nhật"
                        : item.TN_THPT == "0" &&
                          item.DGNL == "0" &&
                          item.TSA == "0"
                        ? "Xét học bạ THPT/ THCS"
                        : item.TN_THPT}
                    </p>
                    <p className="form-detail_data_detail_body_info_container_data_money">
                      {item.Hoc_Phi_Moi_Nam_Den == "-1" &&
                      item.Hoc_Phi_Moi_Nam_Den == "-1"
                        ? "Đang cập nhật"
                        : item.Hoc_Phi_Moi_Nam_Tu !== "0" ||
                          item.Hoc_Phi_Moi_Nam_Tu !== "0"
                        ? item.Hoc_Phi_Moi_Nam_Tu === item.Hoc_Phi_Moi_Nam_Den
                          ? "~ " + item.Hoc_Phi_Moi_Nam_Tu
                          : item.Hoc_Phi_Moi_Nam_Tu +
                            " - " +
                            item.Hoc_Phi_Moi_Nam_Den
                        : "Miễn phí"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormDetail;
