// In soullink-mental-wellness-platform/hooks/useUser.tsx

import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { supabase } from '../components/supabaseClient'; // <--- ADD THIS LINE

interface User {
  name: string;
  email: string;
  pronouns: string;
  major: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUser: (updatedInfo: Partial<User>) => void;
  isLoading: boolean; // <--- ADD THIS LINE
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true); // <--- ADD THIS LINE

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user: supabaseUser } } = await supabase.auth.getUser();
            if (supabaseUser) {
                setUser({
                    name: supabaseUser.user_metadata.full_name || 'User',
                    email: supabaseUser.email || '',
                    pronouns: '',
                    major: '',
                });
            }
            setIsLoading(false);
        };

        fetchUser();

        // Listen for auth changes (login, logout, etc.)
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
                setUser({
                    name: session.user.user_metadata.full_name || 'User',
                    email: session.user.email || '',
                    pronouns: '',
                    major: '',
                });
            } else {
                setUser(null);
            }
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    const updateUser = (updatedInfo: Partial<User>) => {
        setUser(currentUser => currentUser ? { ...currentUser, ...updatedInfo } : null);
    };

    const value = { user, setUser, updateUser, isLoading }; // <--- UPDATE THIS LINE
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};