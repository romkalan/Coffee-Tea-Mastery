import {useState, useEffect} from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";
import ProfileSidebar from "../ProfileSidebar/ProfileSidebar.tsx";
import FantasyMap from "../FantasyMap/FantasyMap.tsx";
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
    onTerritoryClick: (territoryId: string) => void;
}

function ProfileDashboard({ user, onSettingsOpen, onComplete, onTerritoryClick }: ProfileDashboardProps) {
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
                <FantasyMap
                    skillAreas={skillAreas}
                    userCourses={user.courses}
                    onTerritoryClick={onTerritoryClick}
                />
            </div>
        </div>
    );
}

export default ProfileDashboard;
