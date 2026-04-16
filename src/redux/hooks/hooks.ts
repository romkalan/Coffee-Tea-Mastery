import {useDispatch, useSelector } from 'react-redux';
import type {TypedUseSelectorHook} from 'react-redux';
import type {State, Dispatch} from "../index.ts";

export const useAppDispatch = () => useDispatch<Dispatch>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
