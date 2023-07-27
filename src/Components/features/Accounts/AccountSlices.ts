import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export interface BankService {
    balance: number,
    loan: number,
    loanPurpose: string,
    isLoading: boolean
}

type AccountAction =
    | { type: "account/deposit"; payload: number }
    | { type: "account/withdraw"; payload: number }
    | { type: "account/requestLoan"; payload: { amount: number, purpose: string } }
    | { type: "account/payLoan"; }
    | { type: "account/loading" }


const initialStateAccount: BankService = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading: false,
};


const accountSlice = createSlice({
    name: "account",
    initialState: initialStateAccount,
    reducers: {
        deposit(state, action) {
            state.balance += action.payload;
        },
        withdraw(state, action) {
            state.balance -= action.payload
        },
        requestLoan: {
            // @ts-ignore
            prepare(amount: number, purpose: string) {
                return {
                    payload: {amount, purpose}
                };
            },
            reducer(state, action) {
                if (state.loan > 0) return
                state.loan = action.payload.amount
                state.loanPurpose = action.payload.purpose
                state.balance += action.payload.amount
            }
        },
        payLoan(state, action) {
            state.balance -= state.loan
            state.loan = 0
            state.loanPurpose = ""
        }
    }
})

export const { withdraw, requestLoan, payLoan} = accountSlice.actions
export default accountSlice.reducer

export function deposit(amount: number, currency: string): any {
    if (currency === "USD") {
        return {
            type: "account/deposit",
            payload: amount
        }
    }
    return async function (dispatch: (action: AccountAction) => void) {
        dispatch({type: "account/loading"})
        if (!currency) currency = "EUR"
        const response = await axios.get((`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`));
        const data = await response;
        const convertCurrency = data.data.rates.USD
        dispatch({type: "account/deposit", payload: convertCurrency})
    }
}
















// export default function accountReducer(state: BankService = initialStateAccount, action: AccountAction) {
//     switch (action.type) {
//         case "account/deposit":
//             return {
//                 ...state, balance: state.balance + action.payload,
//                 isLoading: false,
//             }
//         case "account/withdraw":
//             return {
//                 ...state, balance: state.balance - action.payload
//             }
//         case "account/requestLoan":
//             if (state.loan > 0) return
//
//             return {
//                 ...state, loan: action.payload.amount, balance: state.balance + action.payload.amount,
//                 loanPurpose: action.payload.purpose
//             }
//
//         case "account/payLoan":
//             return {
//                 ...state, loan: 0, balance: state.balance - state.loan
//             }
//         case "account/loading":
//             return {
//                 ...state, isLoading: true,
//             }
//
//
//         default:
//             return state
//     }
// }
//
// export function deposit(amount: number, currency: string): any {
//     if (currency === "USD") {
//         return {
//             type: "account/deposit",
//             payload: amount
//         }
//     }
//     return async function (dispatch: (action: AccountAction) => void) {
//         dispatch({type: "account/loading"})
//         if (!currency) currency = "EUR"
//         const response = await axios.get((`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`));
//         const data = await response;
//         const convertCurrency = data.data.rates.USD
//         dispatch({type: "account/deposit", payload: convertCurrency})
//     }
// }
//
// export function withdraw(amount: number): AccountAction {
//     return {
//         type: "account/withdraw",
//         payload: amount
//     }
// }
//
// export function requestLoan(amount: number, purpose: string): AccountAction {
//     return {
//         type: "account/requestLoan",
//         payload: {
//             amount,
//             purpose
//         }
//     }
// }
//
// export function payLoan(): AccountAction {
//     return {type: "account/payLoan"}
// }