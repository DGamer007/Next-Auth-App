import { createContext, useContext, useState } from 'react';
import AuthOverlay from '../components/auth/AuthOverlay';
import BackDrop from '../components/auth/BackDrop';

const AuthContext = createContext();
export const useAuth = function () {
    return useContext(AuthContext);
};

export function AuthProvider({ children }) {
    const [portalState, setPortalState] = useState(false);

    return (
        <AuthContext.Provider value={[portalState, setPortalState]}>
            {children}
            {
                portalState && (

                    <>
                        <AuthOverlay />
                        <BackDrop setPortalState={setPortalState} />
                    </>
                )
            }
        </AuthContext.Provider>
    );
}