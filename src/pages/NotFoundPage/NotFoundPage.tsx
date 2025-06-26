import classNames from "classnames";
import style from "./styles.module.scss";
import {Link} from "react-router-dom";

function NotFoundPage() {
    return (
        <div className={classNames(style.root)}>
            <h1>404 Error</h1>
            <h1>Page Not Found</h1>
            <Link to="/">
                <h2 className={classNames(style.link)}>Go to main page</h2>
            </Link>
        </div>
    );
}

export default NotFoundPage;
