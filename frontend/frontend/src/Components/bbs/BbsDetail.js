import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import CommentWrite from "../comment/CommentWrite";
import CommentList from "../comment/CommentList";
import { AuthContext } from "../context/AuthProvider";
import { HttpHeadersContext } from "../context/HttpHeadersProvider";

import "../../css/bbsdetail.css"; // 추가: 스타일 파일 import
import FileDisplay from "../file/FileDisplay";

function BbsDetail() {
  const { headers, setHeaders } = useContext(HttpHeadersContext);
  const { auth, setAuth } = useContext(AuthContext);
  const [bbs, setBbs] = useState({});
  const { boardId } = useParams(); // 파라미터 가져오기
  const navigate = useNavigate();
  const [previewImages, setPreviewImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const getBbsDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/board/${boardId}`, { headers: headers });
      const bbsData = response.data;


      // myInfo 데이터를 받아옴
      const myInfoResponse = await axios.get("http://localhost:8080/user/myInfo", { headers: headers });
      const myInfoData = myInfoResponse.data;

      // 이미지 파일 미리보기 설정
      const imageFiles = bbsData.files.filter(file => file.fileType.startsWith('image/'));
      const imageUrls = imageFiles.map(file => `http://localhost:8080/board/${boardId}/file/download?fileId=${file.fileId}`);
      setPreviewImages(imageUrls);

      // 받아온 데이터를 합쳐서 setBbs에 넣어줌
      setBbs({ ...bbsData, myInfo: myInfoData });
    } catch (error) {
      console.log("[BbsDetail.js] getBbsDetail() error :<");
      console.error(error);
    }
  };

  const deleteBbs = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/board/${boardId}/delete`, { headers: headers });

      if (response.status === 200) {
        alert("게시글을 성공적으로 삭제했습니다 :D");
        navigate("/bbslist");
      }
    } catch (error) {
      console.log("[BbsDetail.js] deleteBbs() error :<");
      console.error(error);
    }
  };

  useEffect(() => {
    // 컴포넌트가 렌더링될 때마다 localStorage의 토큰 값으로 headers를 업데이트
    setHeaders({
      "Authorization": `Bearer ${localStorage.getItem("bbs_access_token")}`
    });
    getBbsDetail();
  }, []);

  const updateBbs = {
    boardId: bbs.boardId,
    writerName: bbs.writerName,
    title: bbs.title,
    content: bbs.content,
    files: bbs.files,
    boardType: bbs.boardType,
  };

  const startChat = () => {
    // 게시글 작성자와 채팅 시작
    navigate(`/chat`, { state: { "senderId": bbs.myInfo.id, "receiverId": bbs.createMemberId } });
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % previewImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + previewImages.length) % previewImages.length);
  };

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - slideRef.current.offsetLeft;
    scrollLeft.current = slideRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - slideRef.current.offsetLeft;
    const walk = (x - startX.current) * 3; //scroll-fast
    slideRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
      <div className="bbs-detail-container">
        <div>

          <div className="my-3 d-flex justify-content-end">
            <Link className="btn btn-outline-secondary" to="/bbslist"><i className="fas fa-list"></i> 글목록</Link> &nbsp;

            {
              /* 자신이 작성한 게시글인 경우에만 수정, 삭제 가능 */
              (localStorage.getItem("id") === bbs.writerName) ?
                  <>
                    <Link className="btn btn-outline-secondary" to="/bbsupdate" state={{ bbs: updateBbs }}><i className="fas fa-edit"></i> 수정</Link> &nbsp;
                    <button className="btn btn-outline-danger" onClick={deleteBbs}><i className="fas fa-trash-alt"></i> 삭제</button>
                  </>
                  :
                  <>{bbs.boardType === "나눔" ? <button className="btn btn-outline-secondary" onClick={startChat}><i className="fas fa-edit"></i> 채팅하기</button> : null} &nbsp;</>
            }
          </div>

          {previewImages.length > 0 && (
              <div className="image-slider" ref={slideRef}
                   onMouseDown={handleMouseDown}
                   onMouseLeave={handleMouseLeave}
                   onMouseUp={handleMouseUp}
                   onMouseMove={handleMouseMove}>
                <button className="slide-button left" onClick={prevSlide}>{"<"}</button>
                <div className="image-preview">
                  {previewImages.map((img, index) => (
                      <img
                          key={index}
                          src={img}
                          alt={`미리보기 이미지 ${index + 1}`}
                          className={`slide ${index === currentIndex ? "active" : ""}`}
                      />
                  ))}
                </div>
                <button className="slide-button right" onClick={nextSlide}>{">"}</button>
              </div>
          )}

          <table className="table table-striped">
            <tbody>
            <tr>
              <th className="col-3">작성자</th>
              <td>
                <span>{bbs.writerName}</span>
              </td>
            </tr>

            <tr>
              <th>게시글 타입</th>
              <td>
                <span>{bbs.boardType}</span>
              </td>
            </tr>

            <tr>
              <th>{bbs.boardType === "나눔" ? "물품명" : "제목"}</th>
              <td>
                <span>{bbs.title}</span>
              </td>
            </tr>

            <tr>
              <th>작성일</th>
              <td>
                <span>{bbs.createdDate}</span>
              </td>
            </tr>

            <tr>
              <th>조회수</th>
              <td>
                <span>{bbs.viewCount}</span>
              </td>
            </tr>

            <tr>
              <th>{bbs.boardType === "나눔" ? "물품 설명 상세글" : "내용"}</th>
              <td></td>
            </tr>
            </tbody>
          </table>

          <div className="content-box">{bbs.content}</div>
          <div>
            <FileDisplay files={bbs.files} boardId={boardId} />
          </div>

          {/* 댓글 리스트 컴포넌트 */}
          <CommentList boardId={boardId} />

          {/* 댓글 작성 컴포넌트 */}
          {
            (auth) ? // 로그인한 사용자만 댓글 작성 가능
                <CommentWrite boardId={boardId} writerName={bbs.writerName} />
                :
                null
          }
        </div>
      </div>
  );
}

export default BbsDetail;