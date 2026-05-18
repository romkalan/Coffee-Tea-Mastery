import {useState, useEffect} from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";
import ProfileSidebar from "../ProfileSidebar/ProfileSidebar.tsx";
import SkillsMap from "../SkillsMap/SkillsMap.tsx";
import type { TUser } from "../../types/user.ts";

interface TSkillArea {
    id: string;
    label: string;
    color: string;
    courseIds: string[];
}

interface ProfileDashboardProps {
    user: TUser;
    onSettingsOpen: () => void;
    onComplete: (courseId: string, completedAt: string) => void;
}

function ProfileDashboard({ user, onSettingsOpen, onComplete }: ProfileDashboardProps) {
    const [skillAreas, setSkillAreas] = useState<TSkillArea[]>([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/skillAreas`)
            .then(r => r.json())
            .then(setSkillAreas)
            .catch(() => {});
    }, []);

    return (
        <div className={classNames(styles.layout)}>
            <ProfileSidebar
                user={user}
                onSettingsOpen={onSettingsOpen}
                onComplete={onComplete}
            />
            <div className={classNames(styles.mapArea)}>
                <SkillsMap skillAreas={skillAreas} userCourses={user.courses} />
            </div>
        </div>
    );
}

export default ProfileDashboard;
