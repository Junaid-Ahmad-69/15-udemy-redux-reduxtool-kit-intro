import CreateCustomer from "./Components/features/Customers/CreateCustomer/CreateCustomer";
import Customer from "./Components/features/Customers/Customer/Customer";
import AccountOperations from "./Components/features/Accounts/AccountOperation/AccountOperations";
import BalanceDisplay from "./Components/features/Accounts/BalanceDisplay/BalanceDisplay";
import {useSelector} from "react-redux";
import {RootState} from "./redux/store";



function App() {
    const {fullName} = useSelector( (store: RootState) => store.customer)
    return (
        <div>
            <h1>🏦 The React-Redux Bank ⚛️</h1>
            {fullName === "" ?
                <CreateCustomer/> :
                <>
                    <Customer/>
                    <AccountOperations/>
                    <BalanceDisplay/>
                </>}
        </div>
    );
}

export default App;