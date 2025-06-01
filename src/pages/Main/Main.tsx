import classNames from "classnames";
import styles from "./styles.module.scss";

function Main() {
    return (
        <div className={classNames(styles.root)}>
            <h1>This is Main Page</h1>
        </div>
    );
}

export default Main;
