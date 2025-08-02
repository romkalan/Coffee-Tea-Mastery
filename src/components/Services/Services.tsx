import classNames from "classnames";
import styles from "./styles.module.scss";
import Service from "../Service/Service.tsx";

function Services() {
    return (
        <div className={classNames(styles.root)}>
            <h2 className={classNames(styles.title)}>
                Услуги для бизнеса
            </h2>
            <ul className={classNames(styles.list)}>
                <Service />
                <Service />
                <Service />
                <Service />
                <Service />
            </ul>
        </div>
    );
}

export default Services;
