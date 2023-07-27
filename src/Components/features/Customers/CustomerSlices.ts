import {createSlice} from "@reduxjs/toolkit";

export interface ICustomerService {
    fullName: string,
    nationalID: string,
    created_at: string,
}

type CustomerAction =
    | { type: "customer/create"; payload: {
        fullName: string,
        nationalID: string,
        created_at: Date,
    } }
    | { type: "customer/update"; payload: string, }

const initialStateCustomer: ICustomerService = {
    fullName: "",
    nationalID: "",
    created_at: "",
};

const customerSlice = createSlice({
    name: "customer",
    initialState: initialStateCustomer,
    reducers: {
        created(state, action) {
            state.fullName = action.payload
            state.nationalID = action.payload
            state.created_at = new Date().toISOString()
        },
        updateName(state, action) {
            state.fullName = action.payload
        }
    }
})

export const {created, updateName} = customerSlice.actions
export default customerSlice.reducer


// export default function customerReducer(state: ICustomerService = initialStateCustomer, action: CustomerAction) {
//     switch (action.type) {
//         case "customer/create":
//             return {
//                 ...state,
//                 fullName: action.payload.fullName,
//                 nationalID: action.payload.nationalID,
//                 created_at: action.payload.created_at
//             }
//         case "customer/update":
//             return {
//                 ...state, fullName: action.payload
//             }
//         default:
//             return state
//     }
// }
//
// export function created(fullName: string, nationalID: string, created_at: Date): CustomerAction {
//     return {
//         type: "customer/create", payload: {
//             fullName,
//             nationalID,
//             created_at
//         }
//     }
// }
//
// export function updated(fullName: string): CustomerAction {
//     return {
//         type: "customer/update", payload: fullName
//     }
// }