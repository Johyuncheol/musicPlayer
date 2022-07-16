
import { startSession } from "mongoose";
import { LOGIN_USER } from "../action/types";

export default function(state={},action){
    //타입이 기준
    switch (action.type) {
        case LOGIN_USER:
            return{...state, loginSuccess:action.payload}
            
            break;
    
        default:
            return state;
    }
}