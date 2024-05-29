import React, { useContext, useState } from "react";
import styles from "../../css/topNavigationBar.module.css"
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
      <header className={styles.header}>
        <div className={styles.inner}>
          <Link to="/">
            <h1 className={styles.logo}>
              <img src="/images/leaf.svg" alt="logo" />
            </h1>
          </Link>
        </div>

        <nav className={styles.navigation}>
          <Link to="/">Home</Link>
          <div className={styles.dropdown}>
              <Link to ="/bbslist" className={styles.dropbtn} onClick={toggleDropdown}>Community</Link>
            {isDropdownOpen && (
                <div className={styles.dropdownContent}>
                  <Link to="/bbslist">글목록</Link>
                  <Link to="/bbswrite">글추가</Link>
                </div>
            )}
          </div>
          <Link to="/map">Matching</Link>
            <Link to="/myChat">Chatting</Link>
        </nav>

        <div className={styles.menu}>
          {auth ? (
              <>
                <Link to="/checkpwd">
                    <div className={styles.mypage}>
                        <img src="/images/user.svg" alt="user"/>
                        <span>마이페이지</span>
                    </div>
                </Link>
                  <Link to="/logout">
                      <div className={styles.mypage}>
                          <div><img src="/images/user.svg" alt="logout"/></div>
                          <span>로그아웃</span>
                      </div>
                  </Link>
              </>
          ) : (
              <>
                <Link to="/login">
                    <div className={styles.mypage}>
                        <img src="/images/user.svg" alt="login"/>
                        <span>로그인</span>
                    </div>
                </Link>
                  <Link to="/join">
                    <div className={styles.mypage}>
                        <img src="/images/user.svg" alt="signup"/>
                        <span>회원가입</span>
                    </div>
                </Link>
              </>
          )}
        </div>
      </header>
  );
}

export default Header;
