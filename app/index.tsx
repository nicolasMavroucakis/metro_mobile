import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./Pages/Login/Login";
import Home from './Pages/src/Home/Home'; // Certifique-se de ter o componente Home
import Manutencoes from './Pages/src/Manutencoes/Manutencoes';
import Equipamentos from './Pages/src/Equipamentos/Equipamentos';
import Usuario from './Pages/src/Usuario/Usuarios';
import QR_Code from './Pages/src/QRCode/QRCode';
import ProximasManutencoesScreen from './Pages/src/ProximasManutencoes/ProximasManutencoesScreen';
import UltimasManutencoes from './Pages/src/UltimasManutencoes/UltimasManutencoesScreen';
import EquipamentoDetalhes from './Pages/src/EquipamentoDetalhes.tsx/EquipamentoDetalhes';
import EquipamentoManutencaoIniciada from './Pages/src/EquipmanetoManutencaoIniciada/EquipamentManutencaoIniciada';
import EquipamentosNovos from './Pages/src/EquipamentosNovos/EquipamentosNovos';
import 'regenerator-runtime/runtime';

import { GlobalContextProvider } from '@/GlobalContext/GlobalContext';
import { EquipamentoContextProvider } from '@/GlobalContext/GlobalContextEquipamentos';
import { EquipamentoProvider} from "@/GlobalContext/GlobalOptionsContext";

const Stack = createNativeStackNavigator();

export default function Index() {
  return (
    <GlobalContextProvider>
      <EquipamentoContextProvider>
        <EquipamentoProvider>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
            <Stack.Screen name="Manutencoes" component={Manutencoes} options={{ headerShown: false }}/>
            <Stack.Screen name="Equipamentos" component={Equipamentos} options={{ headerShown: false }}/>
            <Stack.Screen name="Usuario" component={Usuario} options={{ headerShown: false }}/>
            <Stack.Screen name="QRCode" component={QR_Code} options={{ headerShown: false }}/>
            <Stack.Screen name="Proxima_manutencao" component={ProximasManutencoesScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Ultima_manutencao" component={UltimasManutencoes} options={{ headerShown: false }}/>
            <Stack.Screen name="EquipamentoDetalhes" component={EquipamentoDetalhes} options={{ headerShown: false }}/>
            <Stack.Screen name="EquipamentoManutencaoIniciada" component={EquipamentoManutencaoIniciada} options={{ headerShown: false }}/>
            <Stack.Screen name="EquipamentosNovos" component={EquipamentosNovos} options={{ headerShown: false }}/>
          </Stack.Navigator>
        </EquipamentoProvider>
      </EquipamentoContextProvider>
    </GlobalContextProvider>
  );
}
