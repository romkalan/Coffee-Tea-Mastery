import classNames from "classnames";
import styles from "./styles.module.scss"

interface ServiceOptionProps {
    options: string[];
    title: string;
}

function ServiceOption({options, title}: ServiceOptionProps) {
    const optionsList = options.map((option, i) => (
            <li key={i} className={classNames(styles.option)}>{option}</li>))

    return (
        <div className={classNames(styles.root)}>
            <h2 className={classNames(styles.subtitle)}>{title}</h2>
            <ul className={classNames(styles.options)}>{optionsList}</ul>
        </div>
    );
}

export default ServiceOption;
