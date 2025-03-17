import React from "react";
import "./Footer.css";
import img1 from "../../img/logo_noName_color1.png";

function Footer() {
  return (
    <div className="footer">
      <a href="/" className="footer_logo">
        <img src={img1} alt="" />
        <span>
          Career <span className="hightlight">Uni</span> Search
        </span>
      </a>
      <div className="footer_text">
        Career Uni Search – Công cụ hỗ trợ học sinh THPT tra cứu thông tin về
        các ngành nghề của các trường đại học và cao đẳng, một cách dễ dàng và
        chính xác.
      </div>
      <div className="footer_contact">
        <a
          target="blank"
          className="footer_contact_link"
          href="https://www.facebook.com/profile.php?id=61572989224233"
        >
          <i class="fa-brands fa-facebook"></i>
        </a>
        {/* <a
          target="blank"
          className="footer_contact_link"
          href=""
        >
          {" "}
          <i class="fa-brands fa-github"></i>
        </a> */}
        <a
          target="blank"
          className="footer_contact_link"
          href="mailto:brotherhoodplus8@gmail.com"
        >
          {" "}
          <i class="fa-solid fa-envelope"></i>
        </a>
      </div>
      <div className="footer_copyright">Copyright © Team BrotherHood 2025</div>
    </div>
  );
}

export default Footer;
