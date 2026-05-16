import classNames from "classnames";
import styles from "./styles.module.scss";
import {NavLink} from "react-router";

function CoursesPreview() {
    return (
        <div>
            <div className={classNames(styles.root)}>
                <div className={classNames(styles.info)}>
                    <h3 className={classNames(styles.title)}>Образование у нас</h3>
                    <p className={classNames(styles.description)}>
                        Учись с нами: в тренинг‑центре в Москве или онлайн с экспертами компетенции
                    </p>
                    <p className={classNames(styles.description)}>
                        С нами ты приобретешь все необходимые навыки для успешной работы в индустрии кофе и чая
                    </p>
                    <NavLink to="/courses?section=training-center" className={classNames(styles.button)}>Подобрать курс</NavLink>
                </div>
                <div className={classNames(styles.imageContainer)}>
                    <img className={classNames(styles.image)} src={"/images/trainingCenter.jpg"}
                         alt="Фото учебного центра" loading="lazy"/>
                    <img className={classNames(styles.imageOverlay)} src={"/images/dividerOverlay.svg"}
                         alt=""/>
                </div>
            </div>
        </div>
    );
}

export default CoursesPreview;
