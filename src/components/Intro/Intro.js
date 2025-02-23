import React, { useEffect, useRef, useState } from "react";
import "./Intro.css";
import Nguyen_Duc from "../../img/Nguyen_Duc.jpg";
import Duong_Minh from "../../img/Duong_Minh.jpg";
import Tran_Duc from "../../img/Tran_Duc.jpg";
import Ngo_Vu from "../../img/Ngo_Vu.jpg";
import Nguyen_Vu from "../../img/Nguyen_Vu.jpg";
import Xuan_Cong from "../../img/Xuan_Cong.jpg";
import Nguyen_Vuong from "../../img/Nguyen_Vuong.jpg";
import Dinh_Dung from "../../img/Dinh_Dung.jpg";

const LazyBackground = ({ className, image, children }) => {
  const [loaded, setLoaded] = useState(false);
  const divRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLoaded(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (divRef.current) {
      observer.observe(divRef.current);
    }

    return () => observer.disconnect();
  }, []);

  console.log(image);
  return (
    <div
      ref={divRef}
      className={`lazy-bg ${className} ${loaded ? "loaded" : ""}`}
      style={
        loaded
          ? {
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0) 40%, #000), url(${image})`,
            }
          : {}
      }
    >
      {children}
    </div>
  );
};

function Intro() {
  return (
    <div className="intro">
      <div className="intro_info">
        <div className="intro_info_name">Team BrotherHood</div>
        <div className="intro_info_slogan">"One Team, One Vision"</div>
        <div className="intro_info_text">
          <p>
            Career Uni Search là một dự án nhỏ của Team Brotherhood với mục đích
            mang đến những thông tin hữu ích về các trường đại học và cao đẳng
            cho các bạn học sinh, phụ huynh cũng như sinh viên.
          </p>
          <p>
            Chúng tôi mong muốn giúp người dùng dễ dàng tra cứu thông tin tuyển
            sinh, ngành học, học phí và nhiều yếu tố quan trọng khác, từ đó đưa
            ra lựa chọn phù hợp nhất trong việc lựa chọn ngành nghề trong tương
            lai.
          </p>
        </div>
      </div>

      <div className="intro_team">
        <div className="col-3">
          <LazyBackground
            className="intro_team_member Nguyen-Duc"
            image={Nguyen_Duc}
          >
            <div className="intro_team_member_container">
              <div className="intro_team_member_container_role">
                Leader - Developer
              </div>
              <div className="intro_team_member_container_name">
                Nguyễn Minh Đức
              </div>
            </div>
          </LazyBackground>
          <LazyBackground
            className="intro_team_member Duong-Minh"
            image={Duong_Minh}
          >
            <div className="intro_team_member_container">
              <div className="intro_team_member_container_role">Sub Leader</div>
              <div className="intro_team_member_container_name">
                Dương Tự Minh
              </div>
            </div>
          </LazyBackground>
          <LazyBackground className="intro_team_member Ngo-Vu" image={Ngo_Vu}>
            <div className="intro_team_member_container">
              <div className="intro_team_member_container_role">Designer</div>
              <div className="intro_team_member_container_name">
                Ngô Quang Vũ
              </div>
            </div>
          </LazyBackground>
        </div>
        <div className="col-3">
          <LazyBackground
            className="intro_team_member Tran-Duc"
            image={Tran_Duc}
          >
            <div className="intro_team_member_container">
              <div className="intro_team_member_container_role">
                Social media
              </div>
              <div className="intro_team_member_container_name">
                Trần Lưu Đức
              </div>
            </div>
          </LazyBackground>
          <LazyBackground
            className="intro_team_member Nguyen-Vu"
            image={Nguyen_Vu}
          >
            <div className="intro_team_member_container">
              <div className="intro_team_member_container_role">Designer</div>
              <div className="intro_team_member_container_name">
                Nguyễn Trần Vũ
              </div>
            </div>
          </LazyBackground>
          <LazyBackground
            className="intro_team_member Xuan-Cong"
            image={Xuan_Cong}
          >
            <div className="intro_team_member_container">
              <div className="intro_team_member_container_role">Content</div>
              <div className="intro_team_member_container_name">
                Trần Chí Công
              </div>
            </div>
          </LazyBackground>
        </div>
        <div className="col-3">
          <LazyBackground
            className="intro_team_member Nguyen-Vuong"
            image={Nguyen_Vuong}
          >
            <div className="intro_team_member_container">
              <div className="intro_team_member_container_role">Content</div>
              <div className="intro_team_member_container_name">
                Nguyễn Đình Vương
              </div>
            </div>
          </LazyBackground>
          <LazyBackground
            className="intro_team_member Dinh-Dung"
            image={Dinh_Dung}
          >
            <div className="intro_team_member_container">
              <div className="intro_team_member_container_role">Content</div>
              <div className="intro_team_member_container_name">
                Đinh Đại Dũng
              </div>
            </div>
          </LazyBackground>
        </div>
      </div>
    </div>
  );
}

export default Intro;
