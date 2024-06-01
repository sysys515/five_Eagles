import "../../css/detail.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const Detail = () => {
    const { id } = useParams();
    const [kind, setKind] = useState({
        title: "",
        food: [],
        image: [],
        provider: [],
        Vaccination: [],
        information: [],
        // other properties
    });

    useEffect(() => {
        axios.get("/data/kind.json").then((data) => {
            const kindObject = data.data.kind.find((kind) => kind.id === parseInt(id));

            if (kindObject) {
                setKind(kindObject);
            } else {
                console.error(`Cannot find kind corresponding to ${id}.`);
            }
        });
    }, [id]);

    const [data, setData] = useState({
        name: "",
        ovog: "",
        number: "",
        asuult: "",
    });

    return (
        <div>
            {id === "1" && (
                <div
                    style={{
                        display: "flex",
                        padding: 20,
                        gap: 20,
                        flexDirection: "column",
                        alignItems: "center",
                        width: "screen",
                    }}
                >
                    <h1>소개</h1>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 100,
                        }}
                    >
                        <img
                            src="https://www.kbgoldenlifex.com/senior/img/upload/20211007130152906.jpg"
                            alt="random"
                            width={"100%"}
                            height={"auto"}
                        />
                    </div>
                    <div>
                        <h3>저희 멍친구함은 오픈 API를 사용하여 만든 반려견 산책 매칭 웹서비스입니다.
                            <br />요즘은 1인 가구가 늘어나면서 외로움을 느끼고 반려견을 키우는 사람, 동네친구를 찾는 사람들이 점점 늘어나고 있습니다.
                            <br />이에 저희는 반려견이라는 공통된 주제를 이야기할 수 있는 사람을 찾고 반려견에게도 친구를 만들어주면 좋겠다는 생각에서 이러한 웹사이트를 만들게 되었습니다.</h3>
                    </div>
                    <p></p>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 100,
                        }}
                    >
                        <img
                            src="https://petplanet.co/static/images/home/home_background_image_mobile.png"
                            alt="random"
                            width={"80%"}
                            height={"auto"}
                        />
                    </div>
                    <div>
                        <h3>저희 멍친구함의 장점은 다음과 같습니다.
                            <br />1. 반려견 주인의 사회적 연결 강화
                            <br />2. 반려견 사회화
                            <br />3. 반려견의 건강과 행복 증진</h3>
                    </div>
                </div>
            )}
            {id === "2" && (
                <div
                    style={{
                        display: "flex",
                        padding: 20,
                        gap: 20,
                        flexDirection: "column",
                        alignItems: "center",
                        width: "screen",
                    }}
                >
                    <h1>사용방법</h1>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 100,
                        }}
                    >
                        <img
                            src="https://devtalk.kakao.com/uploads/default/original/2X/f/f1e2ce7790f5ebb2bd005833931b7e50c4a038d9.png"
                            alt="random"
                            width={"50%"}
                            height={"auto"}

                        />
                        <p>

                            <h2> 지도에서 원하는 상대를 클릭해주세요.</h2>
                        </p>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 100,
                        }}
                    >
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/3281/3281293.png"
                            alt="random"
                            width={"50%"}
                            height={"auto"}
                        />
                        <p>
                            <h2>원하는 상대와 대화로 약속을 잡으세요.</h2>
                        </p>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 100,
                        }}
                    >
                        <img
                            src="https://img1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/doOX/image/kqxGmukKohGfqr-cHjIxnSfyFa8.png"
                            alt="random"
                            width={"50%"}
                            height={"auto"}
                        />
                        <p>
                            <h2>채팅하기 버튼을 누르면 원하는
                                사람과의 채팅을 시작할 수 있습니다.</h2>
                        </p>
                    </div>
                    <p></p>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 100,
                        }}
                    >
                        <img
                            src="https://cdn.newscan.co.kr/news/photo/202305/300324_204756_130.jpg"
                            alt="random"
                            width={"50%"}
                            height={"auto"}
                        />
                        <p>
                            <h2>커뮤니티 게시판을 통해 다양한 정보를 얻을 수 있습니다.</h2>
                        </p>
                    </div>
                </div>
            )}
            {id === "4" && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "20px",
                    }}
                >
                    <h1>문의사항</h1>
                    <form
                        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
                    >
                        <div style={{ display: "flex", gap: "20px" }}>
                            <input
                                type="text"
                                name="name"
                                placeholder="성"
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        name: e.target.value,
                                    });
                                }}
                            />
                            <input
                                type="text"
                                name="name"
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        ovog: e.target.value,
                                    });
                                }}
                                placeholder="명"
                            ></input>
                        </div>
                        <div style={{ display: "flex", gap: "20px" }}>
                            <input type="text" name="email" placeholder="이메일" />
                            <input
                                type="number"
                                name="number"
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        number: e.target.value,
                                    });
                                }}
                                placeholder="전화번호"
                            />
                        </div>
                        <div>
                            <p>문의내용</p>
                            <textarea
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        asuult: e.target.value,
                                    });
                                }}
                                name="asuult"
                                cols="36"
                                rows="10"
                                placeholder=""
                            ></textarea>
                        </div>
                    </form>
                    <div>
                        <button
                        >
                            확인
                        </button>
                    </div>
                </div>


            )}
            {id === "3" && (
                <div
                    style={{
                        display: "flex",
                        padding: 20,
                        gap: 20,
                        flexDirection: "column",
                        alignItems: "center",
                        width: "screen",
                    }}
                >
                    <h1>주의사항</h1>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 100,
                        }}
                    >
                        <img
                            src="https://cdn.jejusori.net/news/photo/202306/416219_427354_452.jpg"
                            alt="random"
                            width={"120%"}
                            height={"auto"}
                        />
                    </div>
                    <div>
                        <p>
                            <h2>안전한 지역 선택</h2>
                            <h3> 강아지를 산책시킬 때는 안전한 지역을 선택해야 합니다.
                                <br/>교통이 많은 길이나 위험한 지역은 피하고, 강아지가 무리에서 벗어나지 못하도록 주의하세요.</h3>
                        </p>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 100,
                        }}
                    >
                        <img
                            src="https://lh6.googleusercontent.com/proxy/dXswau0c0YDLbniHu_1kiqYYg1Z9Yb_SHdqJg35ZiPIFVgwvm8mX6_zWpTwjmfJZj9Msf1eMLWfM2T589k1Qkcj8ym3k0EWOkz0DyaKwQzjlvfOXKMG81OnrGrc"
                            alt="random"
                            width={"100%"}
                            height={"auto"}
                        />
                    </div>
                    <div>
                        <h2>목줄과 루프 착용</h2>
                        <h3>강아지에게 목줄을 착용하고 목줄 루프를 사용하세요.
                            <br />목줄은 강아지를 통제할 수 있게 해주며, 루프는 강아지를 놓치지 않도록 도와줍니다.
                        </h3>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 100,
                        }}
                    >
                        <img
                            src="https://www.fitpetmall.com/wp-content/uploads/2023/10/shutterstock_701063251-1.png"
                            alt="random"
                            width={"80%"}
                            height={"auto"}
                        />
                    </div>
                    <div>
                        <h2>다른 강아지와의 만남</h2>
                        <h3>다른 강아지와 만날 때는 상황을 주시하고, 강아지들 사이에 갈등이나 충돌이 발생하지 않도록 관찰하고 통제하세요.
                        </h3>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 100,
                        }}
                    >
                        <img
                            src="https://image.kmib.co.kr/online_image/2022/1016/2022101116292760455_1665473367_0017561198.jpg"
                            alt="random"
                            width={"100%"}
                            height={"auto"}
                        />
                    </div>
                    <div>
                        <div>
                            <h2>예방접종</h2>
                            <h3>
                                강아지에게 접종을 맞추는 것은 강아지의 건강과 질병 예방에 매우 중요합니다. 여러 이유로 인해 강아지에게 접종을 맞추는 것이 권장됩니다</h3>
                            <br /><h5>1. 질병 예방</h5>
                            <h>접종은 강아지가 일부 심각한 감염성 질병에 대해 면역을 갖게 해줍니다.
                                <br />    대표적으로 병원체에 의한 감염이나 바이러스에 의한 질병인 견병, 파보바이러스, 파라인플루엔자, 광견병 등이 있습니다.
                                <br />이러한 질병들은 치명적일 수 있으며, 접종을 통해 예방할 수 있습니다.</h>
                            <br />
                            <br /><h5>2. 다른 동물과 사람에 대한 보호</h5>
                            <h>강아지가 접종을 받으면 다른 동물과 사람에게 전염될 수 있는 질병을 예방할 수 있습니다. <br />특히 견병과 같은 감염성 질병은 사람에게도 전염될 수 있는
                                위험이 있으므로,강아지에게 접종을 맞추는 것은 동물과 사람 모두에게 안전을 제공합니다.</h>
                            <br /><br /><h5>3. 법적 요구</h5>
                            <h>일부 지역에서는 강아지에 대한 일부 접종을 의무화하고 있습니다. 이는 동물의 복지와 공중보건을 보호하기 위한 조치입니다.</h>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
};

export default Detail;