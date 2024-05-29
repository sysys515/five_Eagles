import React from "react";
import { Link } from "react-router-dom";
import kindStyles from "../../css/kind.module.css";

const Kind = ({ kind }) => {
    return (
        <div className={kindStyles.kind}>
            <Link to={`/kind/${kind.id}`}>
                <div className={kindStyles.kind_image}>
                    <img src={kind.image} alt="kind" />
                </div>
            </Link>
            <div className={kindStyles.kind1}>
                <span>{kind.provider}</span>
            </div>
            <div className={kindStyles.kind_name}>
                <span>{kind.name}</span>
            </div>
        </div>
    );
};

export default Kind;
