import classNames from "classnames";
import styles from "./styles.module.scss";
import type {TExpert} from "../../types/expert.ts";

interface ExpertProps {
    expert: TExpert;
}

function Expert({expert}: ExpertProps) {
    return (
        <div className={classNames(styles.root)}>
            <p className={classNames(styles.status)}>{expert.status}</p>
            <div className={classNames(styles.image)}>
                <img className={classNames(styles.photo)} src={expert.photo} alt={expert.name}/>
            </div>
            <div className={classNames(styles.info)}>
            <p className={classNames(styles.name)}>{expert.name}</p>
                <p className={classNames(styles.description)}>{expert.description}</p>
            </div>
        </div>
    );
}

export default Expert;
