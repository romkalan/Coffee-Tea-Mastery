import { Link } from "react-router-dom";
import classNames from "classnames";
import styles from "./styles.module.scss";

interface Crumb {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    crumbs: Crumb[];
}

function Breadcrumbs({ crumbs }: BreadcrumbsProps) {
    if (crumbs.length === 0) return null;

    return (
        <nav aria-label="Breadcrumb" className={classNames(styles.root)}>
            {crumbs.map((crumb, i) => (
                <span key={i} className={classNames(styles.item)}>
                    {i > 0 && (
                        <span className={classNames(styles.separator)} aria-hidden="true">
                            <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
                                <path d="M1 1L6 6L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </span>
                    )}
                    {crumb.href ? (
                        <Link to={crumb.href} className={classNames(styles.link)}>
                            {crumb.label}
                        </Link>
                    ) : (
                        <span className={classNames(styles.current)} aria-current="page">
                            {crumb.label}
                        </span>
                    )}
                </span>
            ))}
        </nav>
    );
}

export default Breadcrumbs;
