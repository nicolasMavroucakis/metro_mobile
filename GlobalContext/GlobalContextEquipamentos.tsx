import React, { createContext, useState, Dispatch, SetStateAction, ReactNode, useContext, useEffect } from "react";

export interface EquipamentoSelecionadoType {
    [key: string]: string | null; 
}

export interface EquipamentoType {
    [x: string]: any;
    Proxima_Manutencao: string | null;
    Data_da_Inspecao: string | null;
    Numero_equipamento: string | null;
}

interface EquipamentoContextType {
    arrayEquipamentosGlobal: EquipamentoType[];
    setArrayEquipamentosGlobal: Dispatch<SetStateAction<EquipamentoType[]>>;
    equipamentoSelecionado: EquipamentoSelecionadoType;
    setEquipamentoSelecionado: Dispatch<SetStateAction<EquipamentoSelecionadoType>>;
    NumeroGlobal: string;
    setNumeroGlobal: Dispatch<SetStateAction<string>>;
    equipamentosProximaInspecao: EquipamentoType[];
    setEquipamentosProximaInspecao: Dispatch<SetStateAction<EquipamentoType[]>>;
    equipamentosManutencaoRecente: EquipamentoType[];
    setEquipamentosManutencaoRecente: Dispatch<SetStateAction<EquipamentoType[]>>;
}

export const EquipamentoContext = createContext<EquipamentoContextType>({
    arrayEquipamentosGlobal: [],
    setArrayEquipamentosGlobal: () => {},
    equipamentoSelecionado: {},
    setEquipamentoSelecionado: () => {},
    NumeroGlobal: "",
    setNumeroGlobal: () => {},
    equipamentosProximaInspecao: [],
    setEquipamentosProximaInspecao: () => {},
    equipamentosManutencaoRecente: [],
    setEquipamentosManutencaoRecente: () => {},
});

export const EquipamentoContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [arrayEquipamentosGlobal, setArrayEquipamentosGlobal] = useState<EquipamentoType[]>([]);
    const [equipamentoSelecionado, setEquipamentoSelecionado] = useState<EquipamentoSelecionadoType>({});
    const [NumeroGlobal, setNumeroGlobal] = useState<string>("");
    const [equipamentosProximaInspecao, setEquipamentosProximaInspecao] = useState<EquipamentoType[]>([]);
    const [equipamentosManutencaoRecente, setEquipamentosManutencaoRecente] = useState<EquipamentoType[]>([]);

    useEffect(() => {
        console.log("Equipamentos com a próxima inspeção foram atualizados:", equipamentosProximaInspecao);
    }, [equipamentosProximaInspecao]);

    useEffect(() => {
        console.log("Equipamentos com manutenção recente foram atualizados:", equipamentosManutencaoRecente);
    }, [equipamentosManutencaoRecente]);

    return (
        <EquipamentoContext.Provider value={{
            arrayEquipamentosGlobal,
            setArrayEquipamentosGlobal,
            equipamentoSelecionado,
            setEquipamentoSelecionado,
            NumeroGlobal,
            setNumeroGlobal,
            equipamentosProximaInspecao,
            setEquipamentosProximaInspecao,
            equipamentosManutencaoRecente,
            setEquipamentosManutencaoRecente,
        }}>
            {children}
        </EquipamentoContext.Provider>
    );
};

export const useEquipamentoContext = () => useContext(EquipamentoContext);
