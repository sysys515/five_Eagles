import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";



function Join() {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [pwd, setPwd] = useState("");
	const [checkPwd, setCheckPwd] = useState("");
	const [nickname, setNickname] = useState("");
	const [age, setAge] = useState("");
	const [gender, setGender] = useState("");
	const [dogBreed, setDogBreed] = useState("");
	const [profile, setProfile] = useState(null);
	const [oneLineIntro, setOneLineIntro] = useState("");

	const navigate = useNavigate();
	const handleChange = (setter) => (event) => {
		setter(event.target.value);
	};

	const handleFileChange = (event) => {
		setProfile(event.target.files[0]);
	};

	const checkEmailDuplicate = async () => {
		try {
			const response = await axios.get("http://localhost:8080/user/checkId", { params: { email: email } });
			console.log("[Join.js] checkEmailDuplicate() success :D");
			console.log(response.data);
			alert("사용 가능한 아이디입니다.");
		} catch (error) {
			console.log("[Join.js] checkEmailDuplicate() error :<");
			console.log(error);
			if (error.response.status === 400) {
				alert(error.response.data);
			}
		}
	};

	const join = async () => {
		const formData = new FormData();
		formData.append('email', email);
		formData.append('password', pwd);
		formData.append('passwordCheck', checkPwd);
		formData.append('username', name);
		formData.append('nickname', nickname);
		formData.append('age', age);
		formData.append('gender', gender);
		formData.append('dogBreed', dogBreed);
		formData.append('profile', profile);
		formData.append('oneLineIntro', oneLineIntro);

		try {
			const response = await axios.post("http://localhost:8080/user/register", formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});
			console.log("[Join.js] join() success :D");
			console.log(response.data);
			alert(response.data.username + "님 회원가입을 축하드립니다 🎊");
			navigate("/login");
		} catch (error) {
			console.log("[Join.js] join() error :<");
			console.log(error);
			if (error.response.status === 400) {
				alert(error.response.data);
			}
		}
	};

	return (
		<div>
			<table className="table">
				<tbody>
				<tr>
					<th className="col-2">아이디</th>
					<td>
						<input type="text" value={email} onChange={handleChange(setEmail)} size="50px"/>
						<button className="btn btn-outline-danger" onClick={checkEmailDuplicate}>
							<i className="fas fa-check"></i> 아이디 중복 확인
						</button>
					</td>
				</tr>
				<tr>
					<th>이름</th>
					<td><input type="text" value={name} onChange={handleChange(setName)} size="50px"/></td>
				</tr>
				<tr>
					<th>닉네임</th>
					<td><input type="text" value={nickname} onChange={handleChange(setNickname)} size="50px"/></td>
				</tr>
				<tr>
					<th>나이</th>
					<td><input type="number" value={age} onChange={handleChange(setAge)} size="50px"/></td>
				</tr>
				<tr>
					<th>성별</th>
					<td>
						<select value={gender} onChange={handleChange(setGender)}>
							<option value="">선택해주세요</option>
							<option value="male">남성</option>
							<option value="female">여성</option>
						</select>
					</td>
				</tr>
				<tr>
					<th>견종</th>
					<td><input type="text" value={dogBreed} onChange={handleChange(setDogBreed)} size="50px"/></td>
				</tr>
				<tr>
					<th>프로필 사진</th>
					<td>
						<input type="file" onChange={handleFileChange} accept="image/*"/>
					</td>
				</tr>
				<tr>
					<th>한 줄 소개</th>
					<td><input type="text" value={oneLineIntro} onChange={handleChange(setOneLineIntro)} size="50px"/>
					</td>
				</tr>
				<tr>
					<th>비밀번호</th>
					<td><input type="password" value={pwd} onChange={handleChange(setPwd)} size="50px"/></td>
				</tr>
				<tr>
					<th>비밀번호 확인</th>
					<td><input type="password" value={checkPwd} onChange={handleChange(setCheckPwd)} size="50px"/></td>
				</tr>
				</tbody>
			</table>
			<br/>

			<div className="my-3 d-flex justify-content-center">
				<button className="btn btn-outline-secondary" onClick={join}><i className="fas fa-user-plus"></i> 회원가입
				</button>
			</div>
		</div>
	);
}

export default Join;
