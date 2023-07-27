import {applyMiddleware, combineReducers, createStore} from "redux"
import accountReducer, {BankService} from "../Components/features/Accounts/AccountSlices";
import customerReducer, {ICustomerService} from "../Components/features/Customers/CustomerSlices";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
export interface RootState {
    account: BankService;
    customer: ICustomerService;
}


const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
export default store