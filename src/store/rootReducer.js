import authReducer from "./reducers/authReducer";
import  homeReducer  from "./reducers/homeReducer";

const rootReducer = {
 
  user: authReducer,
  home : homeReducer
 
};

export default rootReducer;
