import {combineReducers, configureStore} from "@reduxjs/toolkit";
import accountReducer, {BankService} from "../Components/features/Accounts/AccountSlices";
import customerReducer, {ICustomerService} from "../Components/features/Customers/CustomerSlices";

export interface RootState {
    account: BankService;
    customer: ICustomerService;
}

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer
})
const store = configureStore({reducer: rootReducer})

export default store