// store 에 reducer가 여러개 있을 수있음 이걸 combineReducers로 root 리듀서에서 합치는것

import { combineReducers } from "redux";
import user from './user_reducer';

const rootReducer =combineReducers({
    user
})

export default rootReducer;