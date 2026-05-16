import classNames from "classnames";
import styles from "./styles.module.scss";

function Experience() {
    return (
        <div className={classNames(styles.root)}>
            <img className={classNames(styles.image)} src={"/images/expertsImage.jpg"} alt="Эксперты фото" />
            <div className={classNames(styles.info)}>
                <h3 className={classNames(styles.infoYears)}>5</h3>
                <p className={classNames(styles.infoAddText)}>Лет опыта работы</p>
            </div>
        </div>
    );
}

export default Experience;
