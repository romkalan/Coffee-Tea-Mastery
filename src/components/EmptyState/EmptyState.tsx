import classNames from "classnames";
import styles from "./styles.module.scss";

interface EmptyStateProps {
    message?: string;
}

function EmptyState({ message = "Нет данных" }: EmptyStateProps) {
    return (
        <div className={classNames(styles.root)}>
            <svg className={classNames(styles.icon)} width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M3 9h18" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M9 21V9" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            <p className={classNames(styles.message)}>{message}</p>
        </div>
    );
}

export default EmptyState;
