import classNames from "classnames";
import styles from "./styles.module.scss";

interface HamburgerProps {
    isOpen: boolean;
    onClick: () => void;
}

function Hamburger({isOpen, onClick}: HamburgerProps) {
    return (
        <button
            className={classNames(styles.root, isOpen && styles.open)}
            onClick={onClick}
            aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={isOpen}
        >
            <span className={classNames(styles.line)} />
            <span className={classNames(styles.line)} />
            <span className={classNames(styles.line)} />
        </button>
    );
}

export default Hamburger;
