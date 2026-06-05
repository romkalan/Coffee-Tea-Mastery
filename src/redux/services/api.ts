import { useState, useEffect, useCallback } from "react";
import type {TCourse} from "../../types/course.ts";
import type {TService} from "../../types/service.ts";
import type {TNew} from "../../types/new.ts";
import type {TExpert} from "../../types/expert.ts";
import type {TWinner} from "../../types/winner.ts";
import type {TPartner} from "../../types/partners.ts";
import type {TChampionshipStage} from "../../types/championshipStages.ts";
import {courses} from "../../mocks/courses.ts";
import {services} from "../../mocks/services.ts";
import {news} from "../../mocks/news.ts";
import {experts} from "../../mocks/experts.ts";
import {winners} from "../../mocks/winners.ts";
import {partners} from "../../mocks/partners.ts";
import {championshipStages} from "../../mocks/championshipStages.ts";

type MockState<T> = {
    data: T | undefined;
    isLoading: boolean;
    error: string | null;
};

type MockResult<T> = MockState<T> & {
    isError: boolean;
    isSuccess: boolean;
    status: "pending" | "fulfilled" | "rejected";
    refetch: () => void;
};

function useMockQuery<T>(
    fetcher: () => T | undefined,
    deps: unknown[] = []
): MockResult<T> {
    const [state, setState] = useState<MockState<T>>({
        data: undefined,
        isLoading: true,
        error: null,
    });

    const refetch = useCallback(() => {
        setState({data: undefined, isLoading: true, error: null});
        const id = setTimeout(() => {
            try {
                const result = fetcher();
                setState({data: result, isLoading: false, error: result === undefined ? "Not found" : null});
            } catch (e) {
                setState({data: undefined, isLoading: false, error: String(e)});
            }
        }, 150);
        return () => clearTimeout(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    useEffect(() => {
        const cleanup = refetch();
        return () => cleanup();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    return {
        data: state.data,
        isLoading: state.isLoading,
        error: state.error,
        isError: !!state.error,
        isSuccess: !!(state.data && !state.isLoading && !state.error),
        status: state.isLoading ? "pending" : state.error ? "rejected" : "fulfilled",
        refetch,
    };
}

export const useGetCoursesQuery = (): MockResult<TCourse[]> =>
    useMockQuery(() => courses);

export const useGetCourseByIdQuery = (id: string | undefined): MockResult<TCourse> =>
    useMockQuery(() => id ? courses.find(c => c.id === id) : undefined, [id]);

export const useGetServicesQuery = (): MockResult<TService[]> =>
    useMockQuery(() => services);

export const useGetServiceByIdQuery = (id: string | undefined): MockResult<TService> =>
    useMockQuery(() => id ? services.find(s => s.id === id) : undefined, [id]);

export const useGetNewsQuery = (): MockResult<TNew[]> =>
    useMockQuery(() => news);

export const useGetNewByIdQuery = (id: string | undefined): MockResult<TNew> =>
    useMockQuery(() => id ? news.find(n => n.id === id) : undefined, [id]);

export const useGetExpertsQuery = (): MockResult<TExpert[]> =>
    useMockQuery(() => experts);

export const useGetExpertByIdQuery = (id: string | undefined): MockResult<TExpert> =>
    useMockQuery(() => id ? experts.find(e => e.id === id) : undefined, [id]);

export const useGetWinnersQuery = (): MockResult<TWinner[]> =>
    useMockQuery(() => winners);

export const useGetPartnersQuery = (): MockResult<TPartner[]> =>
    useMockQuery(() => partners);

export const useGetChampionshipStagesQuery = (): MockResult<TChampionshipStage[]> =>
    useMockQuery(() => championshipStages);


