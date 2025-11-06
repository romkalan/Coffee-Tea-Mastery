import classNames from "classnames";
import style from "./styles.module.scss";

function Experience() {
    return (
        <div className={classNames(style.root)}>
            <img className={classNames(style.image)} src={"/images/expertsImage.jpg"} alt="Эксперты фото" />
            <div className={classNames(style.info)}>
                <h3 className={classNames(style.infoYears)}>5</h3>
                <p className={classNames(style.infoAddText)}>Лет опыта работы</p>
            </div>
        </div>
    );
}

export default Experience;
