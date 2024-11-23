import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Alert } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import styleHome from "@/app/Pages/Style/HomeStyle";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import styleEquipamentos from "../../Style/EquipamentosStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useState, useEffect } from "react";
import styleUsuario from "../../Style/UsuarioStyle";
import { GlobalContext } from "@/GlobalContext/GlobalContext";
import { EquipamentoContext, EquipamentoSelecionadoType, EquipamentoType } from "@/GlobalContext/GlobalContextEquipamentos";
import StartFirebase from '@/crud/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

type Equipamentos = {
    navigation: StackNavigationProp<any, any>;
};

const Equipamentos: React.FC<Equipamentos> = ({ navigation }) => {
    const { modoEscuro, setModoEscuro, tipoPermissao} = useContext(GlobalContext);
    const { arrayEquipamentosGlobal } = useContext(EquipamentoContext);
    const { setEquipamentoSelecionado, NumeroGlobal, setNumeroGlobal } = useContext(EquipamentoContext);
    const equipamentosPesquisa = arrayEquipamentosGlobal;

    const [proximaManutencaoValueInput, setProximaManutencaoValueinput] = useState('');
    const [ultimaManutencaoValueInput, setUltimaManutencaoValueInput] = useState('');
    const [numeroEquipamentoValueInput, setNumeroEquipamentoValueInput] = useState('');

    const [pequisaIsExpanded, setPesquisaIsExpanded] = useState(false);

    const conditionalNavigation = () => {
        if (tipoPermissao != "Consultor") {
            navigation.navigate('EquipamentoManutencaoIniciada')
        } else {
            Alert.alert("Erro", "voce nao tem permissao para acessar essa pagina")
        }
    }

    const handleClickInput = () => {
        setPesquisaIsExpanded(prev => !prev);
    };

    const [arrayAchado, setArrayAchado] = useState<EquipamentoType[]>([]);
    
    useEffect(() => {
        console.log("arrayAchado mudou:", arrayAchado);
    }, [arrayAchado]); 

    const handlePesquisa = () => {

        const filteredEquipamentos = equipamentosPesquisa.filter(equipamento => {
            const isProximaManutencaoMatch = proximaManutencaoValueInput 
                ? equipamento.Proxima_Manutencao && equipamento['Proxima_Manutencao'].includes(proximaManutencaoValueInput)
                : true;
    
            const isUltimaManutencaoMatch = ultimaManutencaoValueInput 
                ? equipamento.Ultima_manutencao && equipamento['Ultima_manutencao'].includes(ultimaManutencaoValueInput)
                : true;
    
            const isNumeroEquipamentoMatch = numeroEquipamentoValueInput 
                ? equipamento.Numero_equipamento && equipamento.Numero_equipamento.toString().includes(numeroEquipamentoValueInput)
                : true;
    
            return isProximaManutencaoMatch && isUltimaManutencaoMatch && isNumeroEquipamentoMatch;
        });
    
        console.log("Valores de entrada:", { numeroEquipamentoValueInput, proximaManutencaoValueInput, ultimaManutencaoValueInput });
        console.log("Equipamentos filtrados:", filteredEquipamentos);
    
        return filteredEquipamentos;
    }
   

    const handleBothActions = () => {
        const resultados = handlePesquisa();
        setArrayAchado(resultados);
        handleClickInput();
    };

    const db = StartFirebase();
    const navigateToEquipamentoDetalhes = async (numeroEquipamento: number) => {
        const equipamentoSelecionadoComClick = arrayAchado[numeroEquipamento];
        const numeroEquipamentoSelecionado = equipamentoSelecionadoComClick.Numero_equipamento;
        const numeroEquipamentoString = String(numeroEquipamento);
    
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
                setNumeroGlobal(numeroEquipamentoString);
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
        <SafeAreaView style={modoEscuro ? styleUsuario.background_escuro : styleHome.background}>
            <Header />
            <ScrollView contentContainerStyle={styleHome.information_container_manutencoes}>   
                { pequisaIsExpanded ? (
                        <View style={{width: '90%', margin: 'auto', alignItems: 'center'}}>
                            <View style={{width: '90%', alignItems: 'flex-start'}}>
                                <Text style={{ color: 'white', marginTop: 5 }}>Próxima Manutenção</Text>
                            </View>
                            <TouchableOpacity style={[styleEquipamentos.busca_isNotExpanded, modoEscuro ? styleEquipamentos.busca_dark : null]} >
                                <TextInput
                                    value={proximaManutencaoValueInput}
                                    textContentType="name"
                                    placeholder="Digite a próxima manutenção"
                                    style={modoEscuro ? null : { color: 'black' }}
                                    onChangeText={setProximaManutencaoValueinput}
                                    placeholderTextColor={modoEscuro ? 'white' : 'black'}
                                />
                            </TouchableOpacity>
                            <View style={{width: '90%', alignItems: 'flex-start'}}>
                                <Text style={{ color: 'white', marginTop: 5 }}>Última Manutenção</Text>
                            </View>
                            <TouchableOpacity style={[styleEquipamentos.busca, modoEscuro ? styleEquipamentos.busca_dark : null]} >
                                <TextInput
                                    textContentType="name"
                                    value={ultimaManutencaoValueInput}
                                    placeholder="Digite a última manutenção"
                                    style={modoEscuro ? null : { color: 'black' }}
                                    onChangeText={setUltimaManutencaoValueInput}
                                    placeholderTextColor={'black'}
                                />
                            </TouchableOpacity>
                            <View style={{width: '90%', alignItems: 'flex-start'}}>
                                <Text style={{ color: 'white', marginTop: 5 }}>Número Equipamento</Text>
                            </View>
                            <TouchableOpacity style={[styleEquipamentos.busca, modoEscuro ? styleEquipamentos.busca_dark : null]}>
                                <TextInput
                                    textContentType="name"
                                    value={numeroEquipamentoValueInput}
                                    placeholder="Digite o número do equipamento"
                                    style={modoEscuro ? null : { color: 'black' }}
                                    onChangeText={setNumeroEquipamentoValueInput}
                                    placeholderTextColor={'black'}
                                />
                            </TouchableOpacity>
                            <View style={{width: '90%'}}>
                                <TouchableOpacity style={styleEquipamentos.equipamentos_button_pesquisa} onPress={handleBothActions}>
                                    <Text style={{ color: 'white' }}>Pesquisar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : (
                        <TouchableOpacity style={[pequisaIsExpanded ?  styleEquipamentos.busca_menor  : styleEquipamentos.busca, modoEscuro ? styleEquipamentos.busca_dark : null]} onPress={handleClickInput}>
                            <View style={{width: '100%', height: '100%', alignItems: 'flex-end', marginTop: 10}}>
                                <Image source={modoEscuro ? require('../../../../assets/images/Lupa_dark.png') : require('../../../../assets/images/Lupa.png')} style={styleEquipamentos.image}/>
                            </View>
                        </TouchableOpacity>
                    )
                }
                <ScrollView contentContainerStyle={{ alignItems: 'center', gap: 10 }}  style={[styleEquipamentos.equipamentos, modoEscuro ? styleEquipamentos.equipamentos_dark : null]}>
                    <Text style={[styleEquipamentos.equipamentos_text, modoEscuro ? styleEquipamentos.equipamentos_text_dark : null]}>Equipamentos</Text>
                    {arrayAchado.length > 0 ? (
                        arrayAchado.map((equipamento, index) => (
                            <View key={index} style={[styleEquipamentos.equipamento, modoEscuro ? styleEquipamentos.equipamento_dark : null]}>
                                <View style={styleEquipamentos.equipamentos_informacoes}>
                                    <Image source={modoEscuro ? require('../../../../assets/images/extintor-de-incendio-white.png') : require('../../../../assets/images/Extintor.png')} />
                                    <Text style={[styleEquipamentos.equipamentos_informacoes_text, modoEscuro ? styleEquipamentos.equipamentos_informacoes_text_dark : null]}>
                                        {equipamento.Numero_equipamento}
                                    </Text>
                                </View>
                                <View>
                                    <TouchableOpacity onPress={() => navigateToEquipamentoDetalhes(index)}>
                                        <Image source={require('../../../../assets/images/seta.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
                    ) : (
                        <Text style={modoEscuro ? {color: 'white'} : { color: 'black' }}>Nenhum equipamento encontrado.</Text>
                    )}
                </ScrollView>
                <View style={styleEquipamentos.button_Add_Equipament_Container}>
                    <TouchableOpacity style={styleEquipamentos.button_Add_Equipament} onPress={conditionalNavigation}>
                        <Text style={{color: "white", fontSize: 20}}>Adicionar Equipamento</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <NavBar navigation={navigation} />
        </SafeAreaView>
    );
};

export default Equipamentos;
