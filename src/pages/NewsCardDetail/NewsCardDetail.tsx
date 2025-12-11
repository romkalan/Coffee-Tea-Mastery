import {useParams} from "react-router";
import {useEffect} from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";
import type {TNew} from "../../types/new.ts";
import DetailNewInfo from "../../components/DetailNewInfo/DetailNewInfo.tsx";

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
            <div className={classNames(styles.root)}>
                <DetailNewInfo newCard={newCard}/>
                {/*<ServiceRequestFrom/>*/}
                {/*<Services services={anotherNews}>Другие услуги</Services>*/}
            </div>
        </div>
    );
}

export default NewsCardDetail;
