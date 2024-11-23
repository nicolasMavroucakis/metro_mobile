import React, { createContext, useState, useEffect, Dispatch, SetStateAction, ReactNode, useContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface GlobalContextType {
    modoEscuro: boolean;
    setModoEscuro: Dispatch<SetStateAction<boolean>>;
    usuarioGlobal: string;
    setUsuarioGlobal: Dispatch<SetStateAction<string>>;
    senha: string;
    setSenha: Dispatch<SetStateAction<string>>;
    nome: string;
    setNome: Dispatch<SetStateAction<string>>;
    hasMediaLibraryPermission: boolean;
    setHasMediaLibraryPermission: Dispatch<SetStateAction<boolean>>;
    setTipoPermissao: Dispatch<SetStateAction<string>>;
    tipoPermissao: string;
}


export const GlobalContext = createContext<GlobalContextType>({
    modoEscuro: false,
    setModoEscuro: () => {},
    usuarioGlobal: '',
    setUsuarioGlobal: () => {},
    senha: '',
    setSenha: () => {},
    nome: '',
    setNome: () => {},
    hasMediaLibraryPermission: false,
    setHasMediaLibraryPermission: () => {},
    tipoPermissao: '',
    setTipoPermissao: () => {}
});

export const GlobalContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [modoEscuro, setModoEscuro] = useState<boolean>(false);
    const [usuarioGlobal, setUsuarioGlobal] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [nome, setNome] = useState<string>('');
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<boolean>(false);
    const [tipoPermissao, setTipoPermissao] = useState<string>('')

    useEffect(() => {
        const loadAsyncData = async () => {
            try {
                const savedModoEscuro = await AsyncStorage.getItem('modoEscuro');
                if (savedModoEscuro !== null) {
                    setModoEscuro(JSON.parse(savedModoEscuro));
                }
            } catch (error) {
                console.error('Erro ao carregar dados do AsyncStorage:', error);
            }
        };

        loadAsyncData();
    }, []);

    return (
        <GlobalContext.Provider value={{
            modoEscuro,
            setModoEscuro,
            usuarioGlobal,
            setUsuarioGlobal,
            senha,
            setSenha,
            nome,
            setNome,
            hasMediaLibraryPermission,
            setHasMediaLibraryPermission,
            tipoPermissao,
            setTipoPermissao
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
