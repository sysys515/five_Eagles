import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { HttpHeadersContext } from "../context/HttpHeadersProvider";

function DetailUserInfo() {
    const { headers } = useContext(HttpHeadersContext);
    const { userId } = useParams();
    const navigate = useNavigate();

    const [loginUser, setLoginUser] = useState(null);
    const [userInfo, setUserInfo] = useState({
        email: "",
        username: "",
        nickname: "",
        age: "",
        gender: "",
        dogBreed: "",
        oneLineIntro: "",
        profileImage: ""
    });

    useEffect(() => {
        const fetchUserDetail = async () => {
            const response = await axios.get(`http://localhost:8080/user/${userId}`, { headers });
            const data = response.data;
            data.profileImage = `http://localhost:8080/profile/${data.profileImage}`;
            setUserInfo(data);

            //내 정보 가져오기
            const myInfoResponse = await axios.get("http://localhost:8080/user/myInfo", { headers: headers });
            setLoginUser(myInfoResponse.data);
        };
        fetchUserDetail();
    }, [userId, headers]);

    const startChat = () => {
        // 게시글 작성자와 채팅 시작
        //navigate(`/chat`, { state: { chatRoomId:`${loginUser.id}_${userInfo.id}` } });
        console.log(loginUser.id);
        console.log(userInfo);
        navigate(`/chat`, { state: { "senderId":loginUser.id, "receiverId":userInfo.id } });
    };

    return (
        <div>
            <div
                className="profile-header mb-3"
            align={"center"}>
                {userInfo.profileImage && (
                    <img src={userInfo.profileImage} alt="프로필 이미지" className="profile-image" style={{width: "720px"}} />
                )}
            </div>
            <table className="table">
                <tbody>
                <tr>
                    <th>이메일</th>
                    <td><input type="text" className="form-control" value={userInfo.email} readOnly /></td>
                </tr>
                <tr>
                    <th>이름</th>
                    <td><input type="text" className="form-control" value={userInfo.username} readOnly /></td>
                </tr>
                <tr>
                    <th>닉네임</th>
                    <td><input type="text" className="form-control" value={userInfo.nickname} readOnly /></td>
                </tr>
                <tr>
                    <th>나이</th>
                    <td><input type="number" className="form-control" value={userInfo.age} readOnly /></td>
                </tr>
                <tr>
                    <th>성별</th>
                    <td><input type="text" className="form-control" value={userInfo.gender === "male" ? "남" : "여"} readOnly /></td>
                </tr>
                <tr>
                    <th>견종</th>
                    <td><input type="text" className="form-control" value={userInfo.dogBreed} readOnly /></td>
                </tr>
                <tr>
                    <th>한 줄 소개</th>
                    <td><input type="text" className="form-control" value={userInfo.oneLineIntro} readOnly /></td>
                </tr>
                </tbody>
            </table>
            <div style={{float:"right", margin:"10px 0px 20px 0px"}}>
                {loginUser && userInfo?.email !== loginUser?.email ? <button className="btn btn-outline-secondary" onClick={startChat} ><i className="fas fa-edit"></i> 채팅하기</button> : null}
            </div>
        </div>
    );
}

export default DetailUserInfo;

