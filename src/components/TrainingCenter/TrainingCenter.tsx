import styles from "./styles.module.scss";
import classNames from "classnames";

function TrainingCenter() {
    return (
        <div className={classNames(styles.root)}>
            <div className={classNames(styles.imageContainer)}>
                <h2 className={classNames(styles.title)}>
                    Наш тренинг центр
                </h2>
                <img className={classNames(styles.image)} src={"/images/trainingCenter.jpg"}
                     alt="Фото учебного центра"/>
                <img className={classNames(styles.imageOverlay)} src={"/images/dividerOverlay.svg"}
                     alt=""/>
            </div>
            <div className={classNames(styles.text)}>
                <p>
                    Наш тренинг центр - одна из самых технологичных
                    <br/>
                    и оборудованных площадок для обучения работе с кофе и чаем в России.
                    <br/>
                    Мы сотрудничаем с ведущими производителями профессионального оборудования.
                    <br/>
                    <br/>
                    Наша команда - сертифицированные бариста-тренеры,
                    <br/>
                    которые работают по международным стандартам.
                </p>
            </div>
        </div>
    );
}

export default TrainingCenter;
