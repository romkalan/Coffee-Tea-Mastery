import {useState, useEffect, useRef} from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";

const stats = [
    {value: "50+", label: "Обслуженных кофеен и ресторанов"},
    {value: "5+", label: "Лет опыта в индустрии"},
    {value: "5", label: "Сертифицированных экспертов"},
    {value: "1000+", label: "Обученных специалистов"},
];

function ServiceStats() {
    const [isAnimated, setIsAnimated] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsAnimated(true);
                    observer.disconnect();
                }
            },
            {threshold: 0.1}
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} className={classNames(styles.root)}>
            <h2 className={classNames(styles.title)}>Цифры доверия</h2>
            <div className={classNames(styles.grid, isAnimated && styles.animate)}>
                {stats.map((stat) => (
                    <div key={stat.label} className={classNames(styles.statItem)}>
                        <span className={classNames(styles.statValue)}>{stat.value}</span>
                        <span className={classNames(styles.statLabel)}>{stat.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ServiceStats;
