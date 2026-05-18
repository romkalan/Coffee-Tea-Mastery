import classNames from "classnames";
import styles from "./styles.module.scss";

interface SkeletonProps {
    variant?: 'card' | 'text' | 'image' | 'title';
    count?: number;
}

function Skeleton({ variant = 'text', count = 1 }: SkeletonProps) {
    return (
        <div className={classNames(styles.root)} role="status" aria-label="Загрузка">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className={classNames(styles.block, styles[variant])}>
                    <div className={classNames(styles.shimmer)} />
                </div>
            ))}
        </div>
    );
}

export default Skeleton;
