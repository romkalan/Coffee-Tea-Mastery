import {useState, useEffect} from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";
import ProfileSidebar from "../ProfileSidebar/ProfileSidebar.tsx";
import FantasyMap from "../FantasyMap/FantasyMap.tsx";
import SkillsMap from "../SkillsMap/SkillsMap.tsx";
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
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className={classNames(styles.layout)}>
            <ProfileSidebar
                user={user}
                onSettingsOpen={onSettingsOpen}
                onComplete={onComplete}
            />
            <div className={classNames(styles.mapArea)}>
                {isMobile ? (
                    <SkillsMap
                        skillAreas={skillAreas}
                        userCourses={user.courses}
                    />
                ) : (
                    <FantasyMap
                        skillAreas={skillAreas}
                        userCourses={user.courses}
                        onTerritoryClick={onTerritoryClick}
                    />
                )}
            </div>
        </div>
    );
}

export default ProfileDashboard;
