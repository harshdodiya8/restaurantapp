import { combineReducers } from "redux";
import { authentication } from "./reducer";
const rootreducer = combineReducers({
  authentication,
});
export default rootreducer;
