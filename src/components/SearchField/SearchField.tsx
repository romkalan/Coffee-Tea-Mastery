import styles from "./styles.module.scss";
import classNames from "classnames";

function SearchField() {
    return (
        <div className={classNames(styles.root)}>
            <input className={classNames(styles.searchField)} type="text" placeholder="Что ищем?"/>
            <button className={classNames(styles.button)}>Найти</button>
        </div>
    );
}

export default SearchField;
