import React, {useEffect, useState} from 'react';
import jwtDecode from "jwt-decode";

export const LoggedContext = React.createContext([false, () => {
}]);
const AuthContext = ({children}) => {
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        if (localStorage.userToken) {
            let user;
            try {
                user = jwtDecode(localStorage.userToken);
            } catch {
            }
            if (user) setLoggedIn(true);
        }
    }, []);
    return (
        <LoggedContext.Provider value={[loggedIn, setLoggedIn]}>
            {children}
        </LoggedContext.Provider>
    )
}
export default AuthContext;