import classNames from "classnames";
import styles from "./styles.module.scss";
import type {TCourse} from "../../types/course.ts";

interface DetailCourseInfoProps {
    course: TCourse;
}

function DetailCourseInfo({course}: DetailCourseInfoProps) {
    return (
        <div>
            <h1 className={classNames(styles.title)}>{course.type} / {course.title}</h1>
            <div className={classNames(styles.previewRoot)}>
                <img className={classNames(styles.previewImage)} src={"/images/courseImage.png"}
                     alt="Фотография курса"/>
                <div className={classNames(styles.preview)}>
                    <h2 className={classNames(styles.previewTitle)}>{course.title}</h2>
                    <p className={classNames(styles.previewText)}>{course.description}</p>
                    <div className={classNames(styles.previewInfoDetails)}>
                        <div><p><b>Время:</b></p>{course.time}</div>
                        <div><p><b>Стоимость:</b></p>От {course.price} руб</div>
                        <div><p><b>Формат обучения:</b></p>{course.format}</div>
                        <button className={classNames(styles.previewButton)}>Оставить заявку</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailCourseInfo;
