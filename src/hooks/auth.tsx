import React from 'react';
import { createContext, ReactNode, useContext } from 'react';


interface AuthProviderProps {
    children: ReactNode;
}

interface User{ // objeto q esta interno no hook
    ide: string;
    name: string;
    email: string;
    photo?: string;
}

interface IAuthContextData{ // Tipagem do conteudo do hook
    user: User;
}

const AuthContext = createContext({} as IAuthContextData);

 function AuthProvider({ children }: AuthProviderProps){
     const user ={
         ide: '123456',
         name: ' Fernando',
         email: 'fernando@exemplo.com',
     };

    return(
        <AuthContext.Provider value={{ user }}>
            { children }
        </AuthContext.Provider>

    )
}

function useAuth(){
    const context = useContext(AuthContext);

    return context;
}

export{ AuthProvider, useAuth}


/* Forma de criar um hook */