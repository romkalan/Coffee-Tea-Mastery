import classNames from "classnames";
import styles from "./styles.module.scss";

function News() {
    return (
        <div className={classNames(styles.root)}>
            <h1>This is News Page</h1>
        </div>
    );
}

export default News;
