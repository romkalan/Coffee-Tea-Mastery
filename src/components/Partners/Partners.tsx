import {useRef} from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";
import type {TPartner} from "../../types/partners.ts";
import {useGetPartnersQuery} from "../../redux/services/api.ts";
import Skeleton from "../Skeleton/Skeleton.tsx";
import ErrorState from "../ErrorState/ErrorState.tsx";
import EmptyState from "../EmptyState/EmptyState.tsx";

const avatarColors = ["#8B4513", "#D2691E", "#4D0505", "#A0522D", "#6B3A2A"];

function getInitials(name: string): string {
    return name.charAt(0).toUpperCase();
}

function getColor(name: string): string {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return avatarColors[Math.abs(hash) % avatarColors.length];
}

function Partners() {
    const {data: partners, isLoading, error, refetch} = useGetPartnersQuery();
    const currentYear = useRef(new Date().getFullYear().toString());

    return (
        <div className={classNames(styles.root)}>
            <h2 className={classNames(styles.title)}>Партнеры чемпионата {currentYear.current}</h2>
            {isLoading ? (
                <Skeleton variant="card" count={5} />
            ) : error ? (
                <ErrorState onRetry={refetch} />
            ) : !partners || partners.length === 0 ? (
                <EmptyState message="Партнеры пока не добавлены" />
            ) : (
                <ul className={classNames(styles.partnersList)}>
                    {partners.map((partner: TPartner) => (
                        <li key={partner.id}>
                            <div className={classNames(styles.imageContainer)}>
                                {partner.image ? (
                                    <img src={partner.image} alt={partner.name} />
                                ) : (
                                    <div
                                        className={classNames(styles.avatar)}
                                        style={{ backgroundColor: getColor(partner.name) }}
                                        aria-hidden="true"
                                    >
                                        {getInitials(partner.name)}
                                    </div>
                                )}
                            </div>
                            <span className={classNames(styles.partnerName)}>{partner.name}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Partners;
