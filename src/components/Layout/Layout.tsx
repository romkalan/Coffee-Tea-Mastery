import type {ReactNode} from "react";
import Header from "../Header/Header.tsx";
import Footer from "../Footer/Footer";
import classNames from "classnames";
import styles from "./styles.module.scss";

function Layout({ children }: { children: ReactNode }) {
    return (
        <div className={classNames(styles.root)}>
            <Header />
            {children}
            <Footer />
        </div>
    );
}

export default Layout;
