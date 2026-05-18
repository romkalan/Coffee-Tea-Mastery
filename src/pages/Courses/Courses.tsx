import classNames from "classnames";
import styles from "./styles.module.scss";
import CoursesPreview from "../../components/CoursesPreview/CoursesPreview.tsx";
import Services from "../../components/Services/Services.tsx";
import {useGetCoursesQuery} from "../../redux/services/api.ts";
import {FormatsForDetailInfo} from "../../utils/helpers.ts";
import Experts from "../../components/Experts/Experts.tsx";
import {useEffect} from "react";
import {useSearchParams} from "react-router";
import Skeleton from "../../components/Skeleton/Skeleton.tsx";
import ErrorState from "../../components/ErrorState/ErrorState.tsx";
import EmptyState from "../../components/EmptyState/EmptyState.tsx";

function Courses() {
    const {data: courses, isLoading, error, refetch} = useGetCoursesQuery();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const section = searchParams.get("section");
        if (section === "training-center") {
            const element = document.getElementById("training-center");
            if (element) {
                element.scrollIntoView({behavior: "smooth"});
            }
        }
    }, [searchParams]);

    return (
        <div className={classNames(styles.root)}>
            <CoursesPreview/>
            <Experts />
            <div id="training-center">
                {isLoading ? (
                    <Skeleton variant="card" count={3} />
                ) : error ? (
                    <ErrorState onRetry={refetch} />
                ) : courses && courses.filter(c => c.format === FormatsForDetailInfo.offline).length > 0 ? (
                    <Services services={courses.filter((course) => course.format === FormatsForDetailInfo.offline)}>Ближайшие занятия в тренинг-центре</Services>
                ) : (
                    <EmptyState message="Очные занятия пока не запланированы" />
                )}
            </div>
            {isLoading ? (
                <Skeleton variant="card" count={2} />
            ) : error ? null : courses && courses.filter(c => c.format === FormatsForDetailInfo.online).length > 0 ? (
                <Services services={courses.filter((course) => course.format === FormatsForDetailInfo.online)}>Ближайшие занятия в онлайн-школе</Services>
            ) : null}
        </div>
    );
}

export default Courses;
