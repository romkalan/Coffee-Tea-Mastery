import {useState} from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";
import ProfileSidebar from "../ProfileSidebar/ProfileSidebar.tsx";
import FantasyMap from "../FantasyMap/FantasyMap.tsx";
import type { TUser } from "../../types/user.ts";
import { skillAreas as mockSkillAreas } from "../../mocks/skillAreas.ts";

interface ProfileDashboardProps {
    user: TUser;
    onSettingsOpen: () => void;
    onComplete: (courseId: string, completedAt: string) => void;
    onTerritoryClick: (territoryId: string) => void;
}

function ProfileDashboard({ user, onSettingsOpen, onComplete, onTerritoryClick }: ProfileDashboardProps) {
    const [skillAreas] = useState(mockSkillAreas);

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
