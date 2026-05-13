import styles from "./styles.module.scss";
import classNames from "classnames";

interface SearchFieldProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

function SearchField({searchQuery, onSearchChange}: SearchFieldProps) {
    return (
        <div className={classNames(styles.root)}>
            <input
                className={classNames(styles.searchField)}
                type="text"
                placeholder="Что ищем?"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
            />
        </div>
    );
}

export default SearchField;
