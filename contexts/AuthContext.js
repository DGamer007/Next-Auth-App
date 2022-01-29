import { createContext, useContext, useState } from 'react';
import AuthOverlay from '../components/auth/AuthOverlay';

const AuthContext = createContext();
export const useAuth = function () {
    return useContext(AuthContext);
};

export function AuthProvider({ children }) {
    const [portalState, setPortalState] = useState(false);

    return (
        <AuthContext.Provider value={[portalState, setPortalState]}>
            {children}
            {portalState && <AuthOverlay />}
        </AuthContext.Provider>
    );
}