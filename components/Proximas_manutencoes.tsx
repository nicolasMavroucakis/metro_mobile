import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import styleHome from "@/app/Pages/Style/HomeStyle";
import { GlobalContext } from "@/GlobalContext/GlobalContext";
import { useContext } from "react";
import { EquipamentoContext, EquipamentoSelecionadoType } from "@/GlobalContext/GlobalContextEquipamentos";
import { collection, query, where, getDocs } from 'firebase/firestore';
import StartFirebase from '@/crud/firebaseConfig';

type ProximasManutencoesProps = {
    navigation: StackNavigationProp<any, any>;
};

const ProximasManutencoes: React.FC<ProximasManutencoesProps> = ({ navigation }) => {
    const { modoEscuro } = useContext(GlobalContext);
    const { equipamentosProximaInspecao } = useContext(EquipamentoContext);
    const { setEquipamentoSelecionado, setNumeroGlobal } = useContext(EquipamentoContext);

    const db = StartFirebase();

    const fetchEquipamentoDetails = async (numeroEquipamento: string | null) => {
        const numeroEquipamentoSelecionado = numeroEquipamento;
    
        try {
            const q = query(
                collection(db, 'Equipamentos'),
                where('Numero_Equipamento', '==', numeroEquipamentoSelecionado)
            );
                
            const querySnapshot = await getDocs(q);
    
            if (!querySnapshot.empty) {
                const equipamento = querySnapshot.docs[0].data(); 
                const equipamentoFormatado: EquipamentoSelecionadoType = {
                    "Numero_Equipamento": equipamento["Numero_Equipamento"] || "", 
                    "Proxima_Manutencao": equipamento["Proxima_Manutencao"] || "", 
                    "Data_da_Inspecao": equipamento["Data_da_Inspecao"] || "", 
                    "Area": equipamento["Area"] || "", 
                    "Capacidade": equipamento["Capacidade"] || "", 
                    "Local": equipamento["Local"] || "", 
                    "Nao_Conformidades": equipamento["Nao_Conformidades"] || "", 
                    "Observacao": equipamento["Observacao"] || "", 
                    "Patrimonio": equipamento["Patrimonio"] || "", 
                    "Predio": equipamento["Predio"] || "", 
                    "Proxima_Retirada": equipamento["Proxima_Retirada"] || "", 
                    "Selo_Inmetro": equipamento["Selo_Inmetro"] || "", 
                    "Setor": equipamento["Setor"] || "", 
                    "Tipo": equipamento["Tipo"] || "", 
                    "Fabricante": equipamento["Fabricante"] || "",
                };
                
                console.log(equipamentoFormatado);
                setEquipamentoSelecionado(equipamentoFormatado);
                setNumeroGlobal(equipamento["Numero Equipamento"]);
                navigation.navigate('EquipamentoDetalhes');
            } else {
                Alert.alert('Equipamento não encontrado', 'Nenhum equipamento correspondente foi encontrado.');
            }
        } catch (error) {
            console.error("Erro ao pegar o equipamento:", error);
            Alert.alert('Erro', 'Ocorreu um erro ao pegar as informações do equipamento');
        }
    };

    return (
        <View style={[styleHome.last_updates, modoEscuro ? styleHome.last_updates_dark : null]}>
            <View style={styleHome.last_upadates_title}>
                <Text style={[styleHome.title_componets, modoEscuro ? styleHome.title_componets_dark : null]}>
                    Proximas Manutenções
                </Text>
                <View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Proxima_manutencao')} // Navega para a tela Home
                        style={styleHome.button_ver_tudo}
                    >
                        <Text style={styleHome.button_ver_tudo_text}>{">"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView contentContainerStyle={styleHome.last_upadates_equipaments}>
                {equipamentosProximaInspecao.map((equipamento, index) => (
                    <View key={index} style={[styleHome.equipamento_container, modoEscuro ? styleHome.equipamento_container_information_dark : null]}>
                        <View style={styleHome.equipamento_container_information}>
                            <Image source={modoEscuro ? require('../assets/images/extintor-de-incendio-white.png') : require('../assets/images/Extintor.png')}/>
                            <View style={styleHome.equipamento_container_information_text}>
                                <Text style={[{ fontWeight: '700', fontSize: 20 }, modoEscuro ? styleHome.title_componets_dark : null]}>
                                    {equipamento.Numero_equipamento}
                                </Text>
                                <Text style={modoEscuro ? { color: '#3650E7' } : { color: '#001489' }}>
                                    Data: {equipamento.Proxima_Manutencao}
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => fetchEquipamentoDetails(equipamento.Numero_equipamento)}>
                                        <Image source={require('../assets/images/seta.png')} />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default ProximasManutencoes;
