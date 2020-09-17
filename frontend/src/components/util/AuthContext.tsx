import React, { createContext, useState } from 'react';

export type Auth = {
    name: string;
    setName: (name: string) => void;
};

export const DefaultAuth = {
    name: "",
    setName: (name:string) => {} 
}

export const AuthContext = createContext(DefaultAuth);

export const AuthProvider: React.FC = ({children}) => {
    const localName = localStorage.getItem("user");
    const [name, setRawName] = useState(localName ? localName : "")

    const setName = (name:string) => {
        localStorage.setItem("user", name);
        setRawName(name)
    }
    return (
        <AuthContext.Provider value={{name, setName}}>
            {children}
        </AuthContext.Provider>
    );
}