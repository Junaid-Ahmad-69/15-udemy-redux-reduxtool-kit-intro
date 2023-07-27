import {useSelector} from "react-redux";
// import {connect} from "react-redux";

function formatCurrency(value) {
    return new Intl.NumberFormat("en", {
        style: "currency",
        currency: "USD",
    }).format(value);
}



function BalanceDisplay() {
    const current = useSelector((store) => store.account.balance)
    return <div className="balance">{formatCurrency(current)}</div>;
}



export default BalanceDisplay;





// using old way in class Components


// function BalanceDisplay({balance}) {

    // return <div className="balance">{formatCurrency(balance)}</div>;
// }



// function mapStateToProps(state) {
//     return {
//         balance: state.account.balance
//     }
// }

// export default connect (mapStateToProps)(BalanceDisplay);