import {Navigate, useParams} from "react-router";
import {useEffect} from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";
import DetailNewInfo from "../../components/DetailNewInfo/DetailNewInfo.tsx";
import {useGetNewByIdQuery} from "../../redux/services/api.ts";
import Skeleton from "../../components/Skeleton/Skeleton.tsx";
import ErrorState from "../../components/ErrorState/ErrorState.tsx";

function NewsCardDetail() {
    const params = useParams();
    const {data: newCard, isLoading, error, refetch} = useGetNewByIdQuery(params.id!);

    useEffect(() => {
        window.scrollTo({top: 0, behavior: "smooth"});
    }, [params.id]);

    if (isLoading) return <Skeleton variant="card" count={3} />;
    if (error) return <ErrorState onRetry={refetch} />;
    if (!newCard) return <Navigate to="/not-found" replace />;

    return (
        <div className={classNames(styles.root)}>
            <h1 className={classNames(styles.title)}>{newCard.type} / {newCard.title}</h1>
            <div className={classNames(styles.root)}>
                <DetailNewInfo newCard={newCard}/>
            </div>
        </div>
    );
}

export default NewsCardDetail;
