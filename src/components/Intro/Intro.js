import React from "react";
import "./Intro.css";

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
          <div className="intro_team_member Nguyen-Duc">
            <div className="intro_team_member_container">
              <div className="intro_team_member_container_role">
                Leader - Developer
              </div>
              <div className="intro_team_member_container_name">
                Nguyễn Minh Đức
              </div>
            </div>
          </div>
          <div className="intro_team_member Duong-Minh">
            <div className="intro_team_member_container">
              <div className="intro_team_member_container_role">Sub Leader</div>
              <div className="intro_team_member_container_name">
                Dương Tự Minh
              </div>
            </div>
          </div>
          <div className="intro_team_member Ngo-Vu">
            <div className="intro_team_member_container">
              <div className="intro_team_member_container_role">Designer</div>
              <div className="intro_team_member_container_name">
                Ngô Quang Vũ
              </div>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="intro_team_member Tran-Duc">
            <div className="intro_team_member_container">
              <div className="intro_team_member_container_role">
                Social media
              </div>
              <div className="intro_team_member_container_name">
                Trần Lưu Đức
              </div>
            </div>
          </div>
          <div className="intro_team_member Nguyen-Vu">
            <div className="intro_team_member_container">
              <div className="intro_team_member_container_role">Designer</div>
              <div className="intro_team_member_container_name">
                Nguyễn Trần Vũ
              </div>
            </div>
          </div>
          <div className="intro_team_member Xuan-Cong">
            <div className="intro_team_member_container">
              <div className="intro_team_member_container_role">Content</div>
              <div className="intro_team_member_container_name">
                Trần Chí Công
              </div>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="intro_team_member Nguyen-Vuong">
            <div className="intro_team_member_container">
              <div className="intro_team_member_container_role">Content</div>
              <div className="intro_team_member_container_name">
                Nguyễn Đình Vương
              </div>
            </div>
          </div>
          <div className="intro_team_member Dinh-Dung">
            <div className="intro_team_member_container">
              <div className="intro_team_member_container_role">Content</div>
              <div className="intro_team_member_container_name">
                Đinh Đại Dũng
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Intro;
