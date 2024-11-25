import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { collection, doc, getDoc } from 'firebase/firestore';
import StartFirebase from '@/crud/firebaseConfig';
import { Alert } from 'react-native';

const defaultEquipamentoState = {
    Area: [],
    Fabricante: [],
    Capacidade: [],
    Gerencia: [],
    Local: [],
    Predio: [],
    Setor: [],
    Tipo: []
};

interface OptionsContextType {
    equipamentoOptions: typeof defaultEquipamentoState;
    fetchEquipamentoOptions: () => void;
}

const OptionsContext = createContext<OptionsContextType>({
    equipamentoOptions: defaultEquipamentoState,
    fetchEquipamentoOptions: () => {}
});

interface EquipamentoProviderProps {
    children: ReactNode;
}

export const EquipamentoProvider: React.FC<EquipamentoProviderProps> = ({ children }) => {
    const [equipamentoOptions, setEquipamentoOptions] = useState(defaultEquipamentoState);

    const fetchEquipamentoOptions = async () => {
        try {
            const db = StartFirebase();
            const equipamentosRef = collection(db, 'Opcoes');
            const extintorDocRef = doc(equipamentosRef, 'Extintor');
            const querySnapshot = await getDoc(extintorDocRef);

            if (!querySnapshot.exists()) {
                Alert.alert("Erro", "Opções do equipamento não encontradas.");
                return;
            }

            const opcoesEquipamento = querySnapshot.data();
            console.log("Opções do Equipamento:", opcoesEquipamento);

            setEquipamentoOptions(prev => ({
                ...prev,
                Area: opcoesEquipamento.Area || [],
                Fabricante: opcoesEquipamento.Fabricante || [],
                Capacidade: opcoesEquipamento.Capacidade || [],
                Gerencia: opcoesEquipamento.Gerencia || [],
                Local: opcoesEquipamento.Local || [],
                Predio: opcoesEquipamento.Predio || [],
                Setor: opcoesEquipamento.Setor || [],
                Tipo: opcoesEquipamento.Tipo || []
            }));
        } catch (error) {
            console.error("Erro ao buscar as opções do equipamento:", error);
        }
    };

    useEffect(() => {
        fetchEquipamentoOptions();
    }, []);

    return (
        <OptionsContext.Provider value={{ equipamentoOptions, fetchEquipamentoOptions }}>
            {children}
        </OptionsContext.Provider>
    );
};

export const useEquipamento = () => useContext(OptionsContext);
