import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity } from "react-native";
import { GlobalContext } from "@/GlobalContext/GlobalContext";
import { useContext } from "react";
import styleUsuario from "../../Style/UsuarioStyle";
import styleHome from "../../Style/HomeStyle";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import styleEquipamentosDetalhes from "../../Style/EquipamentosDetalhesStyle";
import { EquipamentoContext } from "@/GlobalContext/GlobalContextEquipamentos";

type EquipamentoDetalhesProps = { 
    navigation: StackNavigationProp<any, any>;
};

const EquipamentoDetalhes: React.FC<EquipamentoDetalhesProps> = ({ navigation }) => {
    const { modoEscuro } = useContext(GlobalContext);
    const {equipamentoSelecionado, NumeroGlobal, setNumeroGlobal} = useContext(EquipamentoContext)
    return (
        <SafeAreaView style={modoEscuro ? styleUsuario.background_escuro : styleHome.background}>
            <Header />
            <ScrollView contentContainerStyle={styleHome.information_container}>
                <View style={styleEquipamentosDetalhes.container_datalhes}>
                    <View style={styleEquipamentosDetalhes.container_datalhes_title}>
                        <Text style={styleEquipamentosDetalhes.datalhes_title}>Informações do Equipamento</Text>
                    </View>
                    <View style={styleEquipamentosDetalhes.container_detalhes_information}>
                        <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes}>
                            <Text style={styleEquipamentosDetalhes.text_box_outside}>
                                Numero Equipamento:
                            </Text>
                            <View style={styleEquipamentosDetalhes.box_comprida_baixa}>
                                <Text>{equipamentoSelecionado.Numero_Equipamento}</Text>
                            </View>
                        </View>
                        <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes}>
                            <Text style={styleEquipamentosDetalhes.text_box_outside}>
                                Patrimonio:
                            </Text>
                            <View style={styleEquipamentosDetalhes.box_comprida_baixa}>
                                <Text>{equipamentoSelecionado.Patrimonio}</Text>
                            </View>
                        </View>
                        <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes_duas}>
                            <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes_duas_box}>
                                <Text style={styleEquipamentosDetalhes.text_box_outside}>
                                    Capacidade:
                                </Text>
                                <View style={styleEquipamentosDetalhes.box_curta_baixa}>
                                    <Text >
                                        {equipamentoSelecionado.Capacidade}
                                    </Text>
                                </View>
                            </View>
                            <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes_duas_box}>
                                <Text style={styleEquipamentosDetalhes.text_box_outside}>
                                    Fabricante:
                                </Text>
                                <View style={styleEquipamentosDetalhes.box_curta_baixa}>
                                    <Text>
                                        {equipamentoSelecionado.Fabricante}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes_duas}>
                            <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes_duas_box}>
                                <Text style={styleEquipamentosDetalhes.text_box_outside}>
                                    Data de Validade:
                                </Text>
                                <View style={styleEquipamentosDetalhes.box_curta_baixa}>
                                    <Text >
                                    {equipamentoSelecionado.Proxima_Retirada}
                                    </Text>
                                </View>
                            </View>
                            <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes_duas_box}>
                                <Text style={styleEquipamentosDetalhes.text_box_outside}>
                                    Ultima Manutenção:
                                </Text>
                                <View style={styleEquipamentosDetalhes.box_curta_baixa}>
                                    <Text>
                                        {equipamentoSelecionado.Ultima_manutencao}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes}>
                            <Text style={styleEquipamentosDetalhes.text_box_outside}>
                                Localização:
                            </Text>
                            <View style={styleEquipamentosDetalhes.box_comprida_baixa}>
                                <Text>{equipamentoSelecionado.Predio}</Text>
                            </View>
                        </View>
                        <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes}>
                            <Text style={styleEquipamentosDetalhes.text_box_outside}>
                                Observações:
                            </Text>
                            <View style={styleEquipamentosDetalhes.box_comprida_alta}>
                                <Text>{equipamentoSelecionado.Observacao}</Text>
                            </View>
                        </View>
                        <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes}>
                            <TouchableOpacity 
                                style={styleEquipamentosDetalhes.botao_de_iniciar_manutencao} 
                                onPress={() => navigation.navigate('EquipamentoManutencaoIniciada')}
                            >
                                <Text style={{fontSize: 20, fontWeight: '700', color: 'white'}}>Iniciar Inspeção</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <NavBar navigation={navigation}/>
        </SafeAreaView>
    )
}

export default EquipamentoDetalhes