import type {TNew} from "../../types/new.ts";
import classNames from "classnames";
import styles from "./styles.module.scss";
import {formatDate} from "../../utils/utils.ts";
import {Link} from "react-router-dom";

interface NewsCardProps {
    newInfo: TNew;
    index: number;
}

function NewsCard({newInfo, index}: NewsCardProps) {
    const isEven = index % 2 !== 0;

    return (
        <Link to={`/news/${newInfo.id}`}>
            <div className={classNames(styles.root, {[styles.even]: isEven})}>
                <div className={classNames(styles.image)}>
                    <img src={newInfo.image} alt={newInfo.title}/>
                </div>
                <div className={classNames(styles.content)}>
                    <div className={classNames(styles.date)}>{formatDate(newInfo.date)}</div>
                    <h3 className={classNames(styles.title)}>{newInfo.title}</h3>
                    <div className={classNames(styles.description)}>{newInfo.description}</div>
                </div>
            </div>
        </Link>
    )
}

export default NewsCard;
