import classNames from "classnames";
import styles from "./styles.module.scss";

interface ErrorStateProps {
    onRetry?: () => void;
    message?: string;
}

function ErrorState({ onRetry, message = "Не удалось загрузить данные" }: ErrorStateProps) {
    return (
        <div className={classNames(styles.root)} role="alert">
            <svg className={classNames(styles.icon)} width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M12 8v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="12" cy="16" r="0.75" fill="currentColor"/>
            </svg>
            <p className={classNames(styles.message)}>{message}</p>
            {onRetry && (
                <button className={classNames(styles.retryButton)} onClick={onRetry}>
                    Попробовать снова
                </button>
            )}
        </div>
    );
}

export default ErrorState;
