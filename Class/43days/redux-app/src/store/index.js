import { combineReducers } from "redux";
import todo from "./modules/todo";

// store 통합 관리
export default combineReducers({
    todo,
});
