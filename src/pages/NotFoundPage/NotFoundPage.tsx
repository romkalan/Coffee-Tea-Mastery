import classNames from "classnames";
import styles from "./styles.module.scss";
import {Link} from "react-router-dom";

function NotFoundPage() {
    return (
        <div className={classNames(styles.root)}>
            <h1>404 Error</h1>
            <h1>Page Not Found</h1>
            <Link to="/" className={classNames(styles.link)}>Go to main page</Link>
        </div>
    );
}

export default NotFoundPage;
