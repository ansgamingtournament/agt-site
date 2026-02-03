'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const AdminContext = createContext({ isAdmin: false });

export function AdminProvider({ children }) {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        async function checkAdmin() {
            const res = await fetch('/api/admin/me');
            setIsAdmin(res.ok);
        }

        checkAdmin();
    }, []);

    return (
        <AdminContext.Provider value={{ isAdmin }}>
            {children}
        </AdminContext.Provider>
    );
}

export function useAdmin() {
    return useContext(AdminContext);
}
