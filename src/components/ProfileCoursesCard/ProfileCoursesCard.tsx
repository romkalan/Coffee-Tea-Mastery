import {useState} from "react";
import {useNavigate} from "react-router";
import classNames from "classnames";
import styles from "./styles.module.scss";
import type {TEnrollment} from "../../types/enrollment.ts";
import {courses} from "../../mocks/courses.ts";

interface ProfileCoursesCardProps {
    enrollments: TEnrollment[];
    onComplete: (id: string, completedAt: string) => void;
}

function ProfileCoursesCard({ enrollments, onComplete }: ProfileCoursesCardProps) {
    const navigate = useNavigate();
    const [filter, setFilter] = useState<"enrolled" | "completed">("enrolled");

    const filteredEnrollments = enrollments.filter(
        (e: TEnrollment) => e.status === filter
    );

    const getCourseTitle = (courseId: string) => {
        return courses.find(c => c.id === courseId)?.title ?? courseId;
    };

    return (
        <section className={classNames(styles.root)}>
            <h2>Мои курсы</h2>
            <div className={classNames(styles.toggle)}>
                <button
                    className={classNames(styles.toggleBtn, filter === "enrolled" && styles.toggleActive)}
                    onClick={() => setFilter("enrolled")}
                >
                    Текущие
                </button>
                <button
                    className={classNames(styles.toggleBtn, filter === "completed" && styles.toggleActive)}
                    onClick={() => setFilter("completed")}
                >
                    Пройденные
                </button>
            </div>

            {filteredEnrollments.length === 0 && filter === "enrolled" && (
                <div className={classNames(styles.emptyBlock)}>
                    <p className={classNames(styles.emptyText)}>В данный момент Вы не записаны ни на один из курсов</p>
                    <button className={classNames(styles.toCoursesBtn)} onClick={() => navigate("/courses")}>
                        Выбрать курс
                    </button>
                </div>
            )}

            {filteredEnrollments.length === 0 && filter === "completed" && (
                <p className={classNames(styles.emptyText)}>Нет пройденных курсов</p>
            )}

            {filteredEnrollments.length > 0 && (
                <ul className={classNames(styles.courseList)}>
                    {filteredEnrollments.map((enrollment: TEnrollment) => (
                        <li key={enrollment.id} className={classNames(styles.courseItem)}>
                            <div className={classNames(styles.courseInfo)}>
                                <strong>{getCourseTitle(enrollment.courseId)}</strong>
                                <span className={classNames(styles.badge, enrollment.status === "completed" ? styles.completed : styles.enrolled)}>
                                    {enrollment.status === "completed" ? "Пройден" : "Записан"}
                                </span>
                            </div>
                            {enrollment.status === "enrolled" && (
                                <button
                                    className={classNames(styles.completeBtn)}
                                    onClick={() => onComplete(enrollment.id, new Date().toISOString())}
                                >
                                    Отметить пройденным
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

export default ProfileCoursesCard;
