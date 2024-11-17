import { View,Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import styleHome from "@/app/Pages/Style/HomeStyle";
import Ultimamanutencao from "@/components/Ultima_manutencao";
import ProximasManutencoes from "@/components/Proximas_manutencoes";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalContext } from "@/GlobalContext/GlobalContext";
import { useContext } from "react";
import styleUsuario from "../../Style/UsuarioStyle";

type Manutencoes = {
    navigation: StackNavigationProp<any, any>;
};

const Manutencoes: React.FC<Manutencoes> = ({ navigation }) => {
    const { modoEscuro, setModoEscuro } = useContext(GlobalContext);
    return (
        <SafeAreaView style={modoEscuro ?  styleUsuario.background_escuro: styleHome.background}>
            <Header/>
            <ScrollView 
                contentContainerStyle={styleHome.information_container_manutencoes}
            >
                <ProximasManutencoes navigation={navigation}/>
                <Ultimamanutencao navigation={navigation}/>
            </ScrollView>
            <NavBar navigation={navigation}/>
        </SafeAreaView>
    )
}
export default Manutencoes