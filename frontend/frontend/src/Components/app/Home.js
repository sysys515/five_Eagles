import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../css/main.module.css";
import Kind from "./kind";
import EventBanner from "./EventBanner";

// EventBanner 컴포넌트
export const Home = () => {
    const [kinds, setKinds] = useState([]);

    useEffect(() => {
        axios.get("/data/kind.json").then((response) => {
            setKinds(response.data.kind);
        });
    }, []);

    return (
        <>
            <EventBanner />
            <home className={styles.flex_wrap}>
                {kinds.length > 0 ? (
                    kinds.map((kind) => (
                        <Kind key={`key-${kind.id}`} kind={kind} />
                    ))
                ) : (
                    <p>No kinds available</p>
                )}
            </home>
        </>
    );
};