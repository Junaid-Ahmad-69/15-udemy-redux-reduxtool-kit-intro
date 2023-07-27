import {useState} from "react";
import {useDispatch} from "react-redux";
import {created} from "../CustomerSlices";

function Customer() {
    const dispatch = useDispatch();
    const [fullName, setFullName] = useState("");
    const [nationalId, setNationalId] = useState("");

    function handleClick() {
        if (!fullName || !nationalId) return null
        dispatch(created(fullName, nationalId, new Date().toISOString()))
    }

    return (
        <div>
            <h2>Create new customer</h2>
            <div className="inputs">
                <div>
                    <label>Customer full name</label>
                    <input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>
                <div>
                    <label>National ID</label>
                    <input
                        value={nationalId}
                        onChange={(e) => setNationalId(e.target.value)}
                    />
                </div>
                <button onClick={handleClick}>Create new customer</button>
            </div>
        </div>
    );
}

export default Customer;
