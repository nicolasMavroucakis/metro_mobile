import { SafeAreaView, View, Text, ScrollView, Image } from "react-native";
import styleHome from "../../Style/HomeStyle";
import styleUsuario from "../../Style/UsuarioStyle";
import { useContext } from "react";
import { GlobalContext } from "@/GlobalContext/GlobalContext";
import { StackNavigationProp } from "@react-navigation/stack";
import NavBar from "@/components/NavBar";
import Header from "@/components/Header";
import styleManutencoesUP from "../../Style/ManutencoesUP";
import { EquipamentoContext } from "@/GlobalContext/GlobalContextEquipamentos";

type UltimasManutencoesProps = {
    navigation: StackNavigationProp<any, any>;
};

const UltimasManutencoes: React.FC<UltimasManutencoesProps> = ({ navigation }) => {
    const { modoEscuro } = useContext(GlobalContext);
    const { equipamentosManutencaoRecente } = useContext(EquipamentoContext);

    return (
        <SafeAreaView style={modoEscuro ? styleUsuario.background_escuro : styleHome.background}>
            <Header />
            <View style={styleManutencoesUP.information_container_manutencoes_UP}>
                <View style={[styleManutencoesUP.last_updates, modoEscuro ? styleHome.last_updates_dark : null]}>
                    <View style={styleHome.last_upadates_title}>
                        <Text style={[styleHome.title_componets, modoEscuro ? styleHome.title_componets_dark : null]}>
                            Ultimas Manutenções
                        </Text>
                    </View>
                    <ScrollView contentContainerStyle={styleHome.last_upadates_equipaments}>
                        {equipamentosManutencaoRecente.map((equipamento) => (
                            <View
                                key={equipamento.Numero_equipamento}
                                style={[styleHome.equipamento_container, modoEscuro ? styleHome.equipamento_container_information_dark : null]}
                            >
                                <View style={styleHome.equipamento_container_information}>
                                    <Image
                                        source={modoEscuro ? require('../../../../assets/images/extintor-de-incendio-white.png') : require('../../../../assets/images/Extintor.png')}
                                    />
                                    <View style={styleHome.equipamento_container_information_text}>
                                        <Text style={[{ fontWeight: '700', fontSize: 20 }, modoEscuro ? styleHome.title_componets_dark : null]}>
                                            {equipamento.Numero_equipamento}
                                        </Text>
                                        <Text style={modoEscuro ? { color: '#3650E7' } : { color: '#001489' }}>
                                            Data: {equipamento.Data_da_Inspecao}
                                        </Text>
                                    </View>
                                </View>
                                <View>
                                    <Image source={require('../../../../assets/images/seta.png')} />
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </View>
            <NavBar navigation={navigation} />
        </SafeAreaView>
    );
};

export default UltimasManutencoes;
