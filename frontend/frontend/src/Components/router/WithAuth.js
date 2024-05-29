import React from 'react';
import { Navigate } from 'react-router-dom';

// 로그인 상태를 체크하고, 로그인하지 않은 경우 로그인 페이지로 리다이렉트하는 HOC
function WithAuth(WrappedComponent) {
  return function ProtectedComponent(props) {
    const isLoggedIn = localStorage.getItem("bbs_access_token") != null;
    
    if (!isLoggedIn) {
      // 로그인되지 않았다면 로그인 페이지로 리다이렉트
      return <Navigate to="/login" replace />;
    }
    
    // 로그인 되었다면 원래 컴포넌트 렌더링
    return <WrappedComponent {...props} />;
  };
}

export default WithAuth;
