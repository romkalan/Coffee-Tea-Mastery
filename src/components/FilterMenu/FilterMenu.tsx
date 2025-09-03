import SearchField from "../SearchField/SearchField.tsx";
import classNames from "classnames";
import styles from "./styles.module.scss";


function FilterMenu() {
    return (
        <div className={classNames(styles.root)}>
            <button className={classNames(styles.button)}>Кофе</button>
            <button className={classNames(styles.button)}>Чай</button>
            <button className={classNames(styles.button)}>Чемпионаты</button>
            <SearchField/>
        </div>
    );
}

export default FilterMenu;
