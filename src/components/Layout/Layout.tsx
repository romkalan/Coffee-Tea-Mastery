import {Outlet} from "react-router";
import Header from "../Header/Header.tsx";
import Footer from "../Footer/Footer";
import classNames from "classnames";
import styles from "./styles.module.scss";

function Layout() {
    return (
        <div className={classNames(styles.root)}>
            <Header />
            <Outlet/>
            <Footer />
        </div>
    );
}

export default Layout;
