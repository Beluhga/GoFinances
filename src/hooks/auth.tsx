import React, { useEffect } from 'react';
import { 
    createContext,
     ReactNode, 
     useContext, 
     useState 
    } from 'react';

import * as AuthSession from 'expo-auth-session';
import AsyncStorage from "@react-native-async-storage/async-storage";

const {CLIENT_ID} = process.env;
const {REDIRECT_URI} = process.env;

const userStorageKey = '@gofinances:user';

interface AuthProviderProps {
    children: ReactNode;
}

interface User{ // objeto q esta interno no hook
    id: string;
    name: string;
    email: string;
    photo?: string;
}

interface IAuthContextData{ // Tipagem do conteudo do hook
    user: User;
    signInWithGoogle(): Promise<void>;
    signOut(): Promise<void>;
    userStorageLoading: boolean;
}

interface AuthorizationResponse { // autorização de retorno
    params:{
        access_token: string;
    };
    type: string;
}

const AuthContext = createContext({} as IAuthContextData);

 function AuthProvider({ children }: AuthProviderProps){
     const [user, setUser] = useState<User>({} as User);
     const [userStorageLoading, setUserStorageLoading] = useState(true);

     async function signInWithGoogle() {
        try{
         const RESPONSE_TYPE = 'token';
         const SCOPE = encodeURI('profile email'); // para poder ser compreensivo na URL

         const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

         const {type, params } = await AuthSession
         .startAsync({ authUrl}) as AuthorizationResponse;

         if (type === 'success') {
             const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
             const userInfo = await response.json();
             console.log(userInfo);
             

            setUser({
                id: userInfo.id,
                email: userInfo.email,
                name: userInfo.given_name,
                photo: userInfo.picture
            });

             
         }


        }catch (error) {
         throw new Error(error);
        }
     }

     async function signOut(){
        setUser({} as User);
        await AsyncStorage.removeItem(userStorageKey);
     }

     useEffect(() => {
        async function loadUserStorageDate(){
            const userStoraged = await AsyncStorage.getItem(userStorageKey);

            if(userStoraged){
                const userLogged = JSON.parse(userStoraged) as User;
                setUser(userLogged);
            }
            setUserStorageLoading(false);

        }

        loadUserStorageDate();
     })

    return(
        <AuthContext.Provider value={{ 
            user, 
            signInWithGoogle,
            signOut,
            userStorageLoading
            }}>
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