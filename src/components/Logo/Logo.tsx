import classNames from "classnames";
import styles from "../Logo/styles.module.scss";
import {Link} from "react-router-dom";

function Logo() {
    return (
        <Link className={classNames(styles.logo, styles.link)} to={"/"}>
            <img className={classNames(styles.logoImage)} src={"/logo.png"} alt="Bee Barista Logo"/>
            <div className={classNames(styles.logoText)}>
                <h2 className={classNames(styles.logoTitle)}>Bee Barista</h2>
                <h3 className={classNames(styles.logoSubTitle)}>Sip Learn Repeat</h3>
            </div>
        </Link>
    );
}

export default Logo;
