import {combineReducers, createStore} from "redux"

// @ts-ignore
interface BankService {
    balance: number,
    loan: number,
    loanPurpose: string,
}

interface CustomerService {
    fullName: string,
    nationalID: string,
    created_at: string,
}


const initialStateAccount: BankService = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
};


type AccountAction =
    | { type: "account/deposit"; payload: number }
    | { type: "account/withdraw"; payload: number }
    | { type: "account/requestLoan"; payload: { amount: number, purpose: string } }
    | { type: "account/payLoan"; }


function accountReducer(state: BankService = initialStateAccount, action: AccountAction) {
    switch (action.type) {
        case "account/deposit":
            return {
                ...state, balance: state.balance + action.payload
            }
        case "account/withdraw":
            return {
                ...state, balance: state.balance - action.payload
            }
        case "account/requestLoan":
            if (state.loan > 0) return

            return {
                ...state, loan: action.payload.amount, balance: state.balance + action.payload.amount,
                loanPurpose: action.payload.purpose
            }

        case "account/payLoan":
            return {
                ...state, loan: 0, balance: state.balance - state.loan
            }

        default:
            return state
    }
}

type CustomerAction =
    | {
    type: "customer/create"; payload: {
        fullName: string,
        nationalID: string,
        created_at: Date
    }
}

const initialStateCustomer: CustomerService = {
    fullName: "",
    nationalID: "",
    created_at: "",
};

function customerReducer(state: CustomerService = initialStateCustomer, action: CustomerAction) {
    switch (action.type) {
        case "customer/create":
            return {
                ...state,
                fullName: action.payload.fullName,
                nationalID: action.payload.nationalID,
                created_at: action.payload.created_at
            }
        default: return state
    }
}


// Create Action Creators
function deposit(amount: number): AccountAction {
    return {
        type: "account/deposit",
        payload: amount
    }
}

function withdraw(amount: number): AccountAction {
    return {
        type: "account/withdraw",
        payload: amount
    }
}

function requestLoan(amount: number, purpose: string): AccountAction {
    return {
        type: "account/requestLoan",
        payload: {
            amount,
            purpose
        }
    }
}

function payLoan(): AccountAction {
    return {type: "account/payLoan"}
}


function created(fullName: string, nationalID: string, created_at: Date): CustomerAction {
    return {
        type: "customer/create", payload: {
            fullName,
            nationalID,
            created_at
        }
    }
}


const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
})

// @ts-ignore
const store = createStore(rootReducer)
// store.dispatch({type: "account/deposit", payload: 500})
// console.log(store.getState())
// store.dispatch({type: "account/withdraw", payload: 300})
// console.log(store.getState())
// store.dispatch({type: "account/requestLoan", payload: {amount: 20000, purpose: "Buy a cellphone"}})
// console.log(store.getState())
// store.dispatch({type: "account/payLoan"})
// console.log(store.getState())


// using action creators
// store.dispatch(deposit(500))
// console.log(store.getState())
// store.dispatch(withdraw(300))
// console.log(store.getState())
// store.dispatch(requestLoan(50000, "Buy a Car"))
// console.log(store.getState())
// store.dispatch(payLoan())
// console.log(store.getState())


// Customer Actions
store.dispatch(created("junaid", "35404", new Date()))
console.log(store.getState())
