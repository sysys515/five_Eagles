import React, { useContext, useEffect, useRef, useState } from "react";

import { HttpHeadersContext } from "../context/HttpHeadersProvider";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";
import styles from "../../css/main.module.css";

function Footer() {
  const { headers } = useContext(HttpHeadersContext);
  const { auth } = useContext(AuthContext);

  const [location, setLocation] = useState({ latitude: null, longitude: null, error: false });
  const updateIntervalRef = useRef(null);  // useRef를 사용하여 interval ID를 저장

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude, error: false });
      },
      () => {
        setLocation(prev => ({ ...prev, error: true }));
      }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (!auth || location.error || location.latitude === null || location.longitude === null) return;

    const updateLocation = async () => {
      try {
        const response = await axios.post("http://localhost:8080/location", {
          latitude: location.latitude,
          longitude: location.longitude
        }, { headers });
        localStorage.setItem("myLocation", {"lat": location.latitude, "lng":location.longitude});

        if (response.status === 200) {
          clearInterval(updateIntervalRef.current);
        }
      } catch (error) {
        console.error("Failed to update location:", error);
        alert("위치 정보 업데이트에 실패했습니다.");
      }
    };

    updateIntervalRef.current = setInterval(updateLocation, 3000);
    return () => clearInterval(updateIntervalRef.current);  // 정리 로직에서도 useRef의 현재 값을 사용
  }, [location, headers, auth]);

  return (
      <footer className={styles.footer}>
        <p>멍친구함</p>
        <div className="container text-center">
          {/* 추가적인 내용을 여기에 넣으세요 */}

</div>
</footer>
)
  ;
}

export default Footer;
