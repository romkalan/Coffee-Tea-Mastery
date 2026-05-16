import ServiceOption from "../ServiceOption/ServiceOption.tsx";
import classNames from "classnames";
import styles from "./styles.module.scss";

interface ServiceOptionsBlockProps {
    actions: string[];
    results: string[];
}

function ServiceOptionsBlock({actions, results}: ServiceOptionsBlockProps) {
    if (!actions.length && !results.length) {
        return null;
    }

    return (
        <div className={classNames(styles.root)}>
            <h2 className={classNames(styles.subtitle)}>Все выполним на высшем уровне</h2>
            <div className={classNames(styles.options)}>
                <ServiceOption options={actions} children={"Что мы предлагаем?"}/>
                <ServiceOption options={results} children={"Что Вы получаете?"}/>
            </div>
        </div>
    );
}

export default ServiceOptionsBlock;
