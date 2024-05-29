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
                            height={"650px"}
                        />
                        <h2>저희 멍친구함은 착해요~ 물지 않아요~</h2>
                    </div>
                    <div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                        </div>
                    </div>
                    <img
                        src="https://petplanet.co/static/images/home/home_background_image_mobile.png"
                        alt="random"
                        width={"100%"}
                        height={"650px"}
                    />
                    <div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <h1>
                                위치 서비스와 필터링을 통해 조건에 맞는 사람을 매칭 가능하도록 구현
                            </h1>
                        </div>
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
                            width={500}
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
                            width={500}
                            height={500}
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
                            width={500}
                            height={500}
                        />
                        <p>
                            <h2>채팅하기 버튼을 누르면 원하는
                                사람과의 <div> 채팅을 시작할 수 있다.</div></h2>
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
                            src="https://cdn.newscan.co.kr/news/photo/202305/300324_204756_130.jpg"
                            alt="random"
                            width={500}
                            height={500}
                        />
                        <p>
                            <h2>반려견이 새로운 친구들을 만들 수 있는 <div> 기회를 제공할 수 있다.</div></h2>
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
                <div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <h1>주의사항</h1>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            width: "screen",
                        }}
                    >
                        <img
                            src="https://cdn.jejusori.net/news/photo/202306/416219_427354_452.jpg"
                            alt="random"
                            width={"80%"}
                            height={"450px"}
                        />
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >

                        <h3>
                            안전한 지역 선택: 강아지를 산책시킬 때는 안전한 지역을 선택해야 합니다. 교통이 많은 길이나 위험한 지역은 피하고, 강아지가 무리에서 벗어나지 못하도록 주의하세요.
                        </h3>
                        <h></h>
                        <h></h>
                        <h></h>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                width: "screen",
                            }}
                        >
                            <img
                                src="https://lh6.googleusercontent.com/proxy/dXswau0c0YDLbniHu_1kiqYYg1Z9Yb_SHdqJg35ZiPIFVgwvm8mX6_zWpTwjmfJZj9Msf1eMLWfM2T589k1Qkcj8ym3k0EWOkz0DyaKwQzjlvfOXKMG81OnrGrc"
                                alt="random"
                                width={"100%"}
                                height={"650px"}
                            />
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <h3>
                                목줄과 목줄 루프: 강아지에게 목줄을 착용하고 목줄 루프를 사용하세요. 목줄은 강아지를 통제할 수 있게 해주며,
                            </h3><h3>목줄 루프는 만약 강아지가 뒤쫓는다거나 놀이에 빠진다면 손쉽게 잡을 수 있도록 도와줍니다.
                        </h3>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                width: "screen",
                            }}
                        >
                            <img
                                src="https://www.fitpetmall.com/wp-content/uploads/2023/10/shutterstock_701063251-1.png"
                                alt="random"
                                width={"100%"}
                                height={"650px"}
                            />
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        > <h3>
                            다른 강아지와의 만남: 다른 강아지와 만날 때는 상황을 주시하고, 강아지들 사이에 갈등이나 충돌이 발생하지 않도록 관찰하고 통제하세요.
                        </h3>
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            width: "screen",
                        }}
                    >
                        <img
                            src="https://image.kmib.co.kr/online_image/2022/1016/2022101116292760455_1665473367_0017561198.jpg"
                            alt="random"
                            width={"90%"}
                            height={"600px"}
                        />
                    </div>
                    <div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <h3>
                                강아지에게 접종을 맞추는 것은 강아지의 건강과 질병 예방에 매우 중요합니다. 여러 이유로 인해 강아지에게 접종을 맞추는 것이 권장됩니다</h3>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <h1>질병 예방</h1>
                            </div>
                            <h>접종은 강아지가 일부 심각한 감염성 질병에 대해 면역을 갖게 해줍니다.
                                대표적으로 병원체에 의한 감염이나 바이러스에 의한 질병인 견병, 파보바이러스, 파라인플루엔자, 광견병 등이 있습니다.</h>
                            <h>이러한 질병들은 치명적일 수 있으며, 접종을 통해 예방할 수 있습니다.</h>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <h1>다른 동물과 사람에 대한 보호</h1>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <h>강아지가 접종을 받으면 다른 동물과 사람에게 전염될 수 있는 질병을 예방할 수 있습니다. 특히 견병과 같은 감염성 질병은 사람에게도 전염될 수 있는 위험이</h>
                                <h>있으므로,강아지에게 접종을 맞추는 것은 동물과 사람 모두에게 안전을 제공합니다.</h>
                            </div>
                            <h1>법적 요구</h1>
                            <h>일부 지역에서는 강아지에 대한 일부 접종을 의무화하고 있습니다. 이는 동물의 복지와 공중보건을 보호하기 위한 조치입니다.</h>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
};

export default Detail;
