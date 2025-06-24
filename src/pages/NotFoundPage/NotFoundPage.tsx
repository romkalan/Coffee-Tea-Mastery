import classNames from "classnames";
import style from "./styles.module.scss";

function NotFoundPage() {
    return (
        <div className={classNames(style.root)}>
            <h1>404 Error</h1>
        </div>
    );
}

export default NotFoundPage;
