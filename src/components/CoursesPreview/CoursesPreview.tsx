import classNames from "classnames";
import styles from "./styles.module.scss";

function CoursesPreview() {
    return (
        <div className={classNames(styles.root)}>
            <h3 className={classNames(styles.title)}>Образование у нас</h3>
            <p className={classNames(styles.description)}>
                Учись с нами: в тренинг‑центре в Москве
                или онлайн с экспертами компетенции
            </p>
            <button className={classNames(styles.button)}>Подобрать курс</button>
        </div>
    );
}

export default CoursesPreview;
