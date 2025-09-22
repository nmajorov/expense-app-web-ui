import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import Cookies from 'js-cookie';

// Define the shape of the context data
interface SecurityContextType {
    isAuthenticated: boolean;
    session: string | undefined;
    checkSession: () => void; // Function to re-check the cookie
}

// Create the context with a default value
const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

// Create a provider component
interface SecurityProviderProps {
    children: ReactNode;
}

export const SecurityProvider: React.FC<SecurityProviderProps> = ({ children }) => {
    const [session, setSession] = useState<string | undefined>(Cookies.get('session'));

    // A function to explicitly re-read the cookie and update the state.
    // useCallback ensures the function identity is stable.
    const checkSession = useCallback(() => {
        const sessionCookie = Cookies.get('session');
        setSession(sessionCookie);
    }, []);

    const isAuthenticated = !!session;

    const value = { isAuthenticated, session, checkSession };

    return (
        <SecurityContext.Provider value={value}>
            {children}
        </SecurityContext.Provider>
    );
};

// Create a custom hook for easy access to the context
export const useSecurity = (): SecurityContextType => {
    const context = useContext(SecurityContext);
    if (context === undefined) {
        throw new Error('useSecurity must be used within a SecurityProvider');
    }
    return context;
};
