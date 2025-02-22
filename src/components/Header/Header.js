import React from "react";
import "./Header.css";
import img1 from "../../img/logo_noName_color1.png";

function Header() {
  return (
    <div className="header">
      <a className="header_main-logo" href="">
        <img className="header_main-logo_img" src={img1} alt="" />
        <div className="header_main-logo_text">Career Uni Search</div>
      </a>

      <div className="header_menu">
        {/* <div className="header_menu_text">Menu</div>
        <i class="fa-solid fa-bars header_menu_icon"></i> */}
        <div className="header_menu_container">
          <a
            href="https://careerunisearch.github.io/home"
            className="header_menu_container_item"
          >
            Trang chủ
          </a>
          <a
            href="https://careerunisearch.github.io/intro"
            className="header_menu_container_item"
          >
            Giới thiệu
          </a>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeq1vEHTEzfLg-yXx27UysMJbYVFSVZ2Zv9Eo8xvFPLsCthcg/viewform"
            target="_blank"
            className="header_menu_container_item"
          >
            Góp ý
          </a>
        </div>
      </div>
    </div>
  );
}

export default Header;
