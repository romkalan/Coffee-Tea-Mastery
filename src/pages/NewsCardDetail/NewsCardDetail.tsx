import {useParams} from "react-router";
import {useEffect} from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";
import type {TNew} from "../../types/new.ts";

interface NewsProps {
    news: TNew[];
}

function NewsCardDetail({news}: NewsProps) {
    const params = useParams();
    const newCard = news.find((newsCard) => newsCard.id === params.id);
    // const anotherNews = news.sort((() => Math.random() - 0.5)).slice(0, 3);

    useEffect(() => {
        window.scrollTo({top: 0, behavior: "smooth"});
    }, [params.id]);

    if (!newCard) {
        return null;
    }

    return (
        <div className={classNames(styles.root)}>
            <h1 className={classNames(styles.title)}>{newCard.type} / {newCard.title}</h1>
            <div>
                <img src={newCard.image} alt={newCard.title}/>
            </div>
            Я детальная инфа о новости
        </div>
    );
}

export default NewsCardDetail;
