import {useEffect, useMemo} from "react";
import {useSearchParams, useNavigate} from "react-router";
import classNames from "classnames";
import styles from "./styles.module.scss";
import CoursesPreview from "../../components/CoursesPreview/CoursesPreview.tsx";
import Services from "../../components/Services/Services.tsx";
import {useGetCoursesQuery} from "../../redux/services/api.ts";
import {FormatsForDetailInfo} from "../../utils/helpers.ts";
import {territories} from "../../data/mapTerritories.ts";
import Experts from "../../components/Experts/Experts.tsx";
import Skeleton from "../../components/Skeleton/Skeleton.tsx";
import ErrorState from "../../components/ErrorState/ErrorState.tsx";
import EmptyState from "../../components/EmptyState/EmptyState.tsx";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs.tsx";

function Courses() {
    const {data: courses, isLoading, error, refetch} = useGetCoursesQuery();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const skillArea = searchParams.get("skillArea");
    const activeTerritory = skillArea ? territories.find(t => t.id === skillArea) : null;

    useEffect(() => {
        const section = searchParams.get("section");
        if (section === "training-center") {
            setTimeout(() => {
                const element = document.getElementById("training-center");
                if (element) {
                    element.scrollIntoView({behavior: "smooth"});
                }
            }, 100);
        }
    }, [searchParams]);

    const filteredCourses = useMemo(() => {
        if (!courses) return [];
        if (!activeTerritory) return courses;
        return courses.filter(c => activeTerritory.courseIds.includes(c.id));
    }, [courses, activeTerritory]);

    const offlineCourses = useMemo(() => {
        if (!filteredCourses) return [];
        return filteredCourses.filter(c => c.format === FormatsForDetailInfo.offline);
    }, [filteredCourses]);

    const onlineCourses = useMemo(() => {
        if (!filteredCourses) return [];
        return filteredCourses.filter(c => c.format === FormatsForDetailInfo.online);
    }, [filteredCourses]);

    return (
        <div className={classNames(styles.root, "page")}>
            <Breadcrumbs crumbs={[
                { label: "Главная", href: "/" },
                ...(activeTerritory
                    ? [{ label: "Курсы", href: "/courses" }, { label: activeTerritory.label }]
                    : [{ label: "Курсы" }]
                ),
            ]} />
            {!skillArea && <CoursesPreview />}
            {activeTerritory && (
                <div className={classNames(styles.filterHeader)}>
                    <h2 className={classNames(styles.filterTitle)}>
                        Курсы региона: {activeTerritory.label}
                    </h2>
                    <button
                        className={classNames(styles.filterClear)}
                        onClick={() => navigate("/courses")}
                    >
                        Показать все курсы
                    </button>
                </div>
            )}
            {isLoading ? (
                <div id="training-center"><Skeleton variant="card" count={3} /></div>
            ) : error ? (
                <div id="training-center"><ErrorState onRetry={refetch} /></div>
            ) : offlineCourses.length > 0 ? (
                <Services id="training-center" services={offlineCourses}>
                    {activeTerritory ? `Занятия в тренинг-центре` : `Ближайшие занятия в тренинг-центре`}
                </Services>
            ) : !activeTerritory ? (
                <div id="training-center"><EmptyState message="Очные занятия пока не запланированы" /></div>
            ) : null}
            {isLoading ? (
                <Skeleton variant="card" count={2} />
            ) : error ? null : onlineCourses.length > 0 ? (
                <Services services={onlineCourses}>
                    {activeTerritory ? `Онлайн-курсы` : `Ближайшие занятия в онлайн-школе`}
                </Services>
            ) : activeTerritory ? null : null}
            <Experts />
        </div>
    );
}

export default Courses;
