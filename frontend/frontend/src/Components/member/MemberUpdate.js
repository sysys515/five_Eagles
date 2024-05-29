/* 회원 정보 수정 컴포넌트 */
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import { HttpHeadersContext } from "../context/HttpHeadersProvider";

function MemberUpdate(props) {
    const { headers } = useContext(HttpHeadersContext);
    const [name, setName] = useState("");
    const [pwd, setPwd] = useState("");
    const [checkPwd, setCheckPwd] = useState("");
    const [nickname, setNickname] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [dogBreed, setDogBreed] = useState("");
    const [oneLineIntro, setOneLineIntro] = useState("");
    const [profileImage, setProfileImage] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        setName(props.name);
		setPwd(props.pwd);
		setCheckPwd(props.checkPwd);
		setNickname(props.nickname);
		setAge(props.age);
		setGender(props.gender);
		setDogBreed(props.dogBreed);
		setOneLineIntro(props.oneLineIntro);
		setProfileImage(props.profileImage);
    }, [props.name, props.pwd, props.checkPwd, props.nickname, props.age, props.gender, props.dogBreed, props.oneLineIntro, props.profileImage]);

    const handleFileChange = (event) => {
        setProfileImage(event.target.files[0]);
    };

    /* 회원 정보 수정 */
    const update = async () => {
        const formData = new FormData();
        formData.append('password', pwd);
        formData.append('passwordCheck', checkPwd);
        formData.append('username', name);
        formData.append('nickname', nickname);
        formData.append('age', age);
        formData.append('gender', gender);
        formData.append('dogBreed', dogBreed);
        if(profileImage !== undefined) {
            formData.append('profile', profileImage);
        }
        
        formData.append('oneLineIntro', oneLineIntro);

        await axios.put("http://localhost:8080/user/update", formData, {
            headers: { ...headers, 'Content-Type': 'multipart/form-data' }
        }).then((resp) => {
            console.log("[MemberUpdate.js] update() success :D");
            console.log(resp.data);

            alert(resp.data.username + "님의 회원 정보를 수정했습니다");
            navigate("/");

        }).catch((err) => {
            console.log("[MemberUpdate.js] update() error :<");
            console.log(err);

            if (err.response.status === 400) {
                alert(err.response.data);
            }
        });
    };

	return (
        <div>
            <table className="table">
                <tbody>
                    <tr>
                        <th>이메일</th>
                        <td>
                            <input type="text" className="form-control" value={props.email} size="50px" readOnly />
                        </td>
                    </tr>
                    <tr>
                        <th>이름</th>
                        <td><input type="text" value={name} onChange={(e) => setName(e.target.value)} size="50px" /></td>
                    </tr>
                    <tr>
                        <th>닉네임</th>
                        <td><input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} size="50px" /></td>
                    </tr>
                    <tr>
                        <th>나이</th>
                        <td><input type="number" value={age} onChange={(e) => setAge(e.target.value)} size="50px" /></td>
                    </tr>
                    <tr>
                        <th>성별</th>
                        <td>
                            <select value={gender} onChange={(e) => setGender(e.target.value)}>
                                <option value="">선택</option>
                                <option value="male">남성</option>
                                <option value="female">여성</option>
                                <option value="other">기타</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>개의 품종</th>
                        <td><input type="text" value={dogBreed} onChange={(e) => setDogBreed(e.target.value)} size="50px" /></td>
                    </tr>
                    <tr>
                        <th>한 줄 소개</th>
                        <td><input type="text" value={oneLineIntro} onChange={(e) => setOneLineIntro(e.target.value)} size="50px" /></td>
                    </tr>
                    <tr>
                        <th>프로필 사진</th>
                        <td><input type="file" onChange={handleFileChange} accept="image/*" /></td>
                    </tr>
                    <tr>
                        <th>비밀번호</th>
                        <td><input type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} size="50px" /></td>
                    </tr>
                    <tr>
                        <th>비밀번호 확인</th>
                        <td><input type="password" value={checkPwd} onChange={(e) => setCheckPwd(e.target.value)} size="50px" /></td>
                    </tr>
                </tbody>
            </table>
            <div className="my-3 d-flex justify-content-center">
                <button className="btn btn-outline-secondary" onClick={update}>정보 수정</button>
            </div>
        </div>
    );
}

export default MemberUpdate;
