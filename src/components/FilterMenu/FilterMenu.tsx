import SearchField from "../SearchField/SearchField.tsx";
import classNames from "classnames";
import styles from "./styles.module.scss";

interface FilterMenuProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    selectedTag: "coffee" | "tea" | null;
    onTagChange: (tag: "coffee" | "tea" | null) => void;
}

function FilterMenu({searchQuery, onSearchChange, selectedTag, onTagChange}: FilterMenuProps) {
    const handleReset = () => {
        onSearchChange("");
        onTagChange(null);
    };

    const hasFilters = searchQuery || selectedTag;

    return (
        <div className={classNames(styles.root)}>
            <button
                className={classNames(styles.button, selectedTag === "coffee" && styles.buttonActive)}
                onClick={() => onTagChange(selectedTag === "coffee" ? null : "coffee")}
            >
                Кофе
            </button>
            <button
                className={classNames(styles.button, selectedTag === "tea" && styles.buttonActive)}
                onClick={() => onTagChange(selectedTag === "tea" ? null : "tea")}
            >
                Чай
            </button>
            <SearchField searchQuery={searchQuery} onSearchChange={onSearchChange}/>
            <button
                className={classNames(styles.resetButton, !hasFilters && styles.resetButtonDisabled)}
                onClick={handleReset}
                disabled={!hasFilters}
            >
                Сбросить
            </button>
        </div>
    );
}

export default FilterMenu;
