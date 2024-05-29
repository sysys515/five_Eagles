
import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import Home2 from "../app/Home2";
import BbsList from "../bbs/BbsList";
import BbsWrite from "../bbs/BbsWrite";
import BbsDetail from "../bbs/BbsDetail";
import BbsUpdate from "../bbs/BbsUpdate";
import BbsAnswer from "../bbs/BbsAnswer";
import Join from "../member/Join";
import Login from "../member/Login";
import Logout from "../member/Logout";
import MemberUpdate from "../member/MemberUpdate";
import CheckPwd from "../member/CheckPwd";
import Chat from "../chat/Chat";
import { AuthContext } from "../context/AuthProvider";
import MyChatRooms from "../chat/MyChatRooms";
import Map from "../chat/Map";
import DetailUserInfo from "../member/DetailUserInfo";
import Kind2 from "../app/kind2";

function Router() {
  const { auth, setAuth } = useContext(AuthContext);
  const [kinds, setKinds] = useState([]);

  return (
    <Routes>
      <Route path="/" element={auth ? <Home2 /> : <Navigate to="/login" />} />
        <Route
            path="/"
            element={<Home2 kinds={kinds} setKinds={setKinds} />}
        />
        <Route path="/" element={auth ? <Kind2 /> : <Navigate to="/login" />} />
        <Route path="/kind/:id" element={<Kind2 />} />
      <Route path="/bbslist" element={auth ? <BbsList /> : <Navigate to="/login" />} />
      <Route path="/bbswrite" element={auth ? <BbsWrite /> : <Navigate to="/login" />} />
      <Route path="/bbsdetail/:boardId" element={auth ? <BbsDetail /> : <Navigate to="/login" />} />
      <Route path="/bbsupdate" element={auth ? <BbsUpdate /> : <Navigate to="/login" />} />
      <Route path="/bbsanswer/:parentSeq" element={auth ? <BbsAnswer /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<Join />} />
      <Route path="/checkpwd" element={auth ? <CheckPwd /> : <Navigate to="/login" />} />
      <Route path="/update" element={auth ? <MemberUpdate /> : <Navigate to="/login" />} />
      <Route path="/logout" element={auth ? <Logout /> : <Navigate to="/login" />} />
      <Route path="/chat" element={auth ? <Chat /> : <Navigate to="/login" />} />
      <Route path="/myChat" element={auth ? <MyChatRooms /> : <Navigate to="/login" />} />
      <Route path="/map" element={auth ? <Map /> : <Navigate to="/login" />} />
      <Route path="/user/:userId" element={auth ? <DetailUserInfo /> : <Navigate to="/login" />} />
    </Routes>
  );
}

export default Router;
