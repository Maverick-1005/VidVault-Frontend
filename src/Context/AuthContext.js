import { createContext , useContext } from "react";

export const AuthContext = createContext({
    authStatus: false,
})

export const AuthProvider = AuthContext.Provider

export default function useAuth(){
    return useContext(AuthContext)
}