import classNames from "classnames";
import styles from "./styles.module.scss";
import FilterMenu from "../../components/FilterMenu/FilterMenu.tsx";
import NewsCard from "../../components/NewsCard/NewsCard.tsx";
import {news} from "../../mocks/news.ts";
import type {TNew} from "../../types/new.ts";
import {sortByDate} from "../../utils/utils.ts";


function News() {
    if (news.length === 0) {
        return null;
    }

    const currentNews = sortByDate(news.slice(0,4));

    return (
        <div className={classNames(styles.root)}>
            <h1 className={classNames(styles.title)}>Новости</h1>
            <FilterMenu/>
            <ul className={classNames(styles.newsList)}>
                {currentNews.map((newInfo: TNew, index) => (
                    <NewsCard key={newInfo.id} newInfo={newInfo} index={index}/>
                ))}
            </ul>
        </div>
    );
}

export default News;
