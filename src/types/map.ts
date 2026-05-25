export type TTerritoryStatus = "locked" | "inProgress" | "completed";

export interface TTerritoryRoute {
    from: string;
    to: string;
}

export interface TTerritory {
    id: string;
    label: string;
    paths: string[];
    labelX: number;
    labelY: number;
    color: string;
    colorDarker: string;
    courseIds: string[];
    description: string;
    routesTo: string[];
}

export interface TUserCourse {
    courseId: string;
    status: string;
}

export interface TTooltipData {
    label: string;
    description: string;
    completedCount: number;
    totalCount: number;
    status: TTerritoryStatus;
    x: number;
    y: number;
}
