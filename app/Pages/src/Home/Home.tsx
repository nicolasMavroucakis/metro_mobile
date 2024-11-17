import { View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import styleIndex from "../../Style/indexStyle";
import styleHome from "../../Style/HomeStyle";
import Header from "@/components/Header";
import UltimaAtualizacao from "@/components/Ultima_manutencao";
import ProximasManutencoes from "@/components/Proximas_manutencoes";
import NavBar from "@/components/NavBar";
import { SafeAreaView } from "react-native-safe-area-context";
import styleUsuario from "../../Style/UsuarioStyle";
import { useContext } from "react";
import { GlobalContext } from "@/GlobalContext/GlobalContext";
import { EquipamentoContext } from "@/GlobalContext/GlobalContextEquipamentos";

type HomeProps = {
    navigation: StackNavigationProp<any, any>;
};

const Home: React.FC<HomeProps> = ({ navigation }) => {
    const { modoEscuro, setModoEscuro, nome } = useContext(GlobalContext);
    const {equipamentosProximaInspecao, equipamentosManutencaoRecente} = useContext(EquipamentoContext)
    return (
        <SafeAreaView style={modoEscuro ?  styleUsuario.background_escuro: styleHome.background}>
            <Header/>
            <ScrollView 
                contentContainerStyle={styleHome.information_container}
            >
                <View style={styleHome.text_name}>
                    <Text style={styleHome.ola}>Olá, </Text>
                    <Text style={styleHome.nome}>{nome}</Text>
                </View>
                <View style={[styleHome.qr_code_container,modoEscuro ? styleHome.qr_code_container_dark : null]}>
                    <View style={styleHome.qr_code_container_text}>
                        <Text style={[styleHome.qr_code_container_text_text, modoEscuro ? styleHome.qr_code_container_text_text_dark : null]}>
                            Leitura de QR Code
                        </Text>
                    </View>
                    <TouchableOpacity style={[styleHome.qr_code_container_information, modoEscuro ? styleHome.qr_code_container_information_dark : null]}
                        onPress={() => navigation.navigate('QRCode')}
                    >
                        <Image source={require('../../../../assets/images/QR_Code.png')} />
                    </TouchableOpacity>
                </View>
                <UltimaAtualizacao navigation={navigation}/>
                <ProximasManutencoes navigation={navigation}/>
            </ScrollView>
            <NavBar navigation={navigation}/>
        </SafeAreaView>
    )
}

export default Home