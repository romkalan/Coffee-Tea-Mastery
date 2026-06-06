import classNames from "classnames";
import styles from "./styles.module.scss";
import ChampionshipStage from "../ChampionshipStage/ChampionshipStage.tsx";
import {useGetChampionshipStagesQuery} from "../../redux/services/api.ts";
import Skeleton from "../Skeleton/Skeleton.tsx";
import ErrorState from "../ErrorState/ErrorState.tsx";
import EmptyState from "../EmptyState/EmptyState.tsx";

function ChampionshipCycle() {
    const {data: stages, isLoading, error, refetch} = useGetChampionshipStagesQuery();

    return (
        <div className={classNames(styles.root)}>
            <h1 className={classNames(styles.title)}>Чемпионатный цикл</h1>
            {isLoading ? (
                <Skeleton variant="card" count={5} />
            ) : error ? (
                <ErrorState onRetry={refetch} />
            ) : !stages || stages.length === 0 ? (
                <EmptyState message="Этапы чемпионата пока не добавлены" />
            ) : (
                <div className={classNames(styles.timeline)}>
                    <div className={classNames(styles.centerLine)}></div>
                    <ul className={classNames(styles.stageList)}>
                        {stages.map((stage, index) => (
                            <li key={stage.id}
                                className={classNames(styles.stageItem, index % 2 === 0 ? styles.left : styles.right)}>
                                <ChampionshipStage stage={stage}/>
                                {index < stages.length - 1 && (
                                    <svg className={classNames(styles.arrow)} width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 5v14M5 12l7 7 7-7" stroke="#D2691E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default ChampionshipCycle;
