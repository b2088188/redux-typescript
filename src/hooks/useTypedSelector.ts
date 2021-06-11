import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../slices";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export default useTypedSelector;
