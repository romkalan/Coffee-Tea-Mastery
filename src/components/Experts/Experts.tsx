import classNames from "classnames";
import styles from "./styles.module.scss";
import Expert from "../Expert/Expert.tsx";
import {useGetExpertsQuery} from "../../redux/services/api.ts";
import Skeleton from "../Skeleton/Skeleton.tsx";
import ErrorState from "../ErrorState/ErrorState.tsx";
import EmptyState from "../EmptyState/EmptyState.tsx";

function Experts() {
    const {data: experts, isLoading, error, refetch} = useGetExpertsQuery();

    return (
        <div className={classNames(styles.root)}>
            <h2 className={classNames(styles.title)}>Наша команда экспертов</h2>
            {isLoading ? (
                <Skeleton variant="card" count={4} />
            ) : error ? (
                <ErrorState onRetry={refetch} />
            ) : !experts || experts.length === 0 ? (
                <EmptyState message="Эксперты пока не добавлены" />
            ) : (
                <ul className={classNames(styles.expertsList)}>
                    {experts.map((expert) =>
                        <li key={expert.id}>
                            <Expert expert={expert} />
                        </li>)}
                </ul>
            )}
        </div>
    );
}

export default Experts;
