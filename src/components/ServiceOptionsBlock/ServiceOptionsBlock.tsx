import ServiceOption from "../ServiceOption/ServiceOption.tsx";
import classNames from "classnames";
import styles from "../ServiceOptionsBlock/styles.module.scss";

interface ServiceOptionsBlockProps {
    options: string[];
}

function ServiceOptionsBlock({options}: ServiceOptionsBlockProps) {
    if (!options.length) {
        return null;
    }

    return (
        <div className={classNames(styles.root)}>
            <h2 className={classNames(styles.subtitle)}>Все выполним на высшем уровне</h2>
            <ul>
                {options.map((option, i) => (
                    <ServiceOption key={i} option={option}/>
                ))}
            </ul>
        </div>
    );
}

export default ServiceOptionsBlock;
