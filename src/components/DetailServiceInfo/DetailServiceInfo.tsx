import classNames from "classnames";
import styles from "./styles.module.scss";
import type {TService} from "../../types/service.ts";

interface DetailServiceInfoProps {
    service: TService;
    onRequestClick?: () => void;
}

function DetailServiceInfo({service, onRequestClick}: DetailServiceInfoProps) {
    return (
        <div>
            <h1 className={classNames(styles.title)}>{service.type} / {service.title}</h1>
            <div className={classNames(styles.previewRoot)}>
                <img className={classNames(styles.previewImage)} src={service.image}
                     alt="Фотография услуги"/>
                <div className={classNames(styles.preview)}>
                    <h2 className={classNames(styles.previewTitle)}>{service.title}</h2>
                    <p className={classNames(styles.previewText)}>{service.description}</p>
                    <div className={classNames(styles.previewInfoDetails)}>
                        <div><p><b>Время:</b></p>{service.time}</div>
                        <div><p><b>Стоимость:</b></p>От {service.price} руб</div>
                        <div><p><b>Формат:</b></p>{service.format}</div>
                        <button className={classNames(styles.previewButton)} onClick={onRequestClick}>Оставить заявку</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailServiceInfo;
