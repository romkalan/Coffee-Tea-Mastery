import {Outlet, useLocation} from "react-router";
import Header from "../Header/Header.tsx";
import Footer from "../Footer/Footer";
import classNames from "classnames";
import styles from "./styles.module.scss";
import {useEffect} from "react";

function Layout() {
    const {pathname} = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <>
            <div className={classNames(styles.root)}>
                <Header/>
                <Outlet/>
                <Footer/>
            </div>
            <div id={"modal-container"}/>
            <div id={"popup-container"}/>
            <div id={"tooltip-container"}/>
        </>
    );
}

export default Layout;
