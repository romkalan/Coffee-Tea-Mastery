import classNames from "classnames";
import styles from "./styles.module.scss";
import FilterMenu from "../../components/FilterMenu/FilterMenu.tsx";
import NewsCard from "../../components/NewsCard/NewsCard.tsx";
import {useGetNewsQuery} from "../../redux/services/api.ts";
import type {TNew} from "../../types/new.ts";
import {sortByDate} from "../../utils/utils.ts";
import {useState} from "react";
import Skeleton from "../../components/Skeleton/Skeleton.tsx";
import ErrorState from "../../components/ErrorState/ErrorState.tsx";

function News() {
    const {data: news, isLoading, error, refetch} = useGetNewsQuery();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTag, setSelectedTag] = useState<"coffee" | "tea" | null>(null);
    const [visibleCount, setVisibleCount] = useState(4);

    const filteredNews = (news || []).filter((item) => {
        const matchesSearch = searchQuery
            ? item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.text.toLowerCase().includes(searchQuery.toLowerCase())
            : true;

        const matchesTag = selectedTag ? item.tag === selectedTag : true;

        return matchesSearch && matchesTag;
    });

    return (
        <div className={classNames(styles.root)}>
            <h1 className={classNames(styles.title)}>Новости</h1>
            <FilterMenu
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedTag={selectedTag}
                onTagChange={setSelectedTag}
            />
            {isLoading ? (
                <Skeleton variant="card" count={4} />
            ) : error ? (
                <ErrorState onRetry={refetch} />
            ) : !news || news.length === 0 ? (
                <p className={classNames(styles.noResults)}>Новости пока не добавлены</p>
            ) : filteredNews.length === 0 ? (
                <p className={classNames(styles.noResults)}>Ничего не найдено</p>
            ) : (
                <>
                    <ul className={classNames(styles.newsList)}>
                        {sortByDate(filteredNews).slice(0, visibleCount).map((newInfo: TNew, index) => (
                            <NewsCard key={newInfo.id} newInfo={newInfo} index={index}/>
                        ))}
                    </ul>
                    {visibleCount < filteredNews.length && (
                        <div className={classNames(styles.loadMoreContainer)}>
                            <button className={classNames(styles.loadMoreButton)} onClick={() => setVisibleCount(prev => prev + 4)}>
                                Показать еще
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default News;
