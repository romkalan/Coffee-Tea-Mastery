import classNames from "classnames";
import styles from "./styles.module.scss";

function CompetitiveTask() {
    return (
        <div className={classNames(styles.root)}>
            <h1 className={classNames(styles.title)}>Конкурсное задание чемпионата состоит из работ:</h1>
            <div className={classNames(styles.imagesContainer)}>
                <div className={classNames(styles.images)}>
                    <div className={classNames(styles.imageWrapper)}>
                        <img
                            className={classNames(styles.image)}
                            src={"src/assets/barista.png"}
                            alt="Бариста"
                        />
                        <div className={classNames(styles.imageCaption)}>Бариста</div>
                    </div>
                    <div className={classNames(styles.imageWrapper)}>
                        <img
                            className={classNames(styles.image)}
                            src={"src/assets/teaMaster.jpg"}
                            alt="Чайный мастер"
                        />
                        <div className={classNames(styles.imageCaption)}>Чайный мастер</div>
                    </div>
                    <div className={classNames(styles.imageWrapper)}>
                        <img
                            className={classNames(styles.image)}
                            src={"src/assets/roaster.jpg"}
                            alt="Обжарщик кофе"
                        />
                        <div className={classNames(styles.imageCaption)}>Обжарщик кофе</div>
                    </div>
                </div>
                <img className={classNames(styles.imageOverlay)} src={"src/assets/dividerOverlay.svg"}
                     alt="Рамка для учебного центра"/>
            </div>
        </div>
    );
}

export default CompetitiveTask;
