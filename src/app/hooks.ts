import { TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import {RootState, AppDispatch} from './store';

//we're aliasing these functions by adding types
export const useAppDispatch = ( ) => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;