import { useDispatch as reactUseDispatch, useSelector as reactUseSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './index';

export const useAppDispatch = () => reactUseDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = reactUseSelector;
