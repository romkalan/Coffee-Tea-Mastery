import {useRef} from "react";
import classNames from "classnames";
import style from "./styles.module.scss";
import type {TPartner} from "../../types/partners.ts";
import {partners} from "../../mocks/partners.ts";

function Partners() {
    const currentYear = useRef(new Date().getFullYear().toString());

    return (
        <div className={classNames(style.title)}>
            <h2 className={classNames(style.title)}>Партнеры чемпионата {currentYear.current}</h2>
            <ul className={classNames(style.partnersList)}>
                {partners.map((partner: TPartner) => (
                    <li key={partner.id}>
                        <div className={classNames(style.imageContainer)}>
                            <img src={"/images/submarine.png"} alt={partner.name}/>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Partners;
