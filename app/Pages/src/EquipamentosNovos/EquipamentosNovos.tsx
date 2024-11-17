import React, { useState, useContext, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert} from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { Picker } from '@react-native-picker/picker';
import styleHome from "@/app/Pages/Style/HomeStyle";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import { SafeAreaView } from "react-native-safe-area-context";
import styleUsuario from "../../Style/UsuarioStyle";
import { EquipamentoContext } from "@/GlobalContext/GlobalContextEquipamentos";
import StartFirebase from '@/crud/firebaseConfig';
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import styleEquipamentosDetalhes from "../../Style/EquipamentosDetalhesStyle";
import { GlobalContext } from "@/GlobalContext/GlobalContext";
import { deleteDoc } from 'firebase/firestore';

type EquipamentosNovos = {
    navigation: StackNavigationProp<any, any>;
};

const EquipamentosNovos: React.FC<EquipamentosNovos> = ({ navigation }) => {
    const agora = new Date();
    const agoraStringLocal = agora.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
    console.log(agoraStringLocal);
    
    const anoSeguinte = new Date(agora);
    anoSeguinte.setFullYear(anoSeguinte.getFullYear() + 1);
    
    const anoSeguinteStringLocal = anoSeguinte.toLocaleDateString("pt-BR"); 
    console.log(anoSeguinteStringLocal);
    
    const { modoEscuro } = useContext(GlobalContext);
    const { equipamentoSelecionado, setEquipamentoSelecionado, NumeroGlobal } = useContext(EquipamentoContext);
    
    const [editEquipamento, setEditEquipamento] = useState({ ...equipamentoSelecionado });
    
    useEffect(() => {
        setEditEquipamento({ ...equipamentoSelecionado });
    }, [equipamentoSelecionado]);
    
    const db = StartFirebase();
    
    const handleInputChange = (field: string, value: string) => {
        setEditEquipamento(prev => ({
            ...prev,
            [field]: value
        }));
    };
    
    const handleDelete = async () => {
        try {
            const equipamentosRef = collection(db, 'Equipamentos');
            const q = query(equipamentosRef, where('Numero_Equipamento', '==', editEquipamento.Numero_Equipamento));
            const querySnapshot = await getDocs(q);
    
            if (querySnapshot.empty) {
                Alert.alert("Erro", "Equipamento não encontrado.");
                return;
            }
    
            const docSnap = querySnapshot.docs[0];
            const equipamentoRef = doc(db, 'Equipamentos', docSnap.id);
    
            await deleteDoc(equipamentoRef);
    
            Alert.alert("Sucesso", "Equipamento excluído com sucesso.");
            navigation.navigate('Home');
        } catch (error) {
            console.error("Erro ao excluir o equipamento:", error);
            Alert.alert("Erro", "Ocorreu um erro ao excluir o equipamento.");
        }
    };
    
    const fetchEquipamentoOptions = async () => {
        try {
            const equipamentosRef = collection(db, 'Opcoes');
            const extintorDocRef = doc(equipamentosRef, 'Extintor');
            const querySnapshot = await getDoc(extintorDocRef);
    
            if (!querySnapshot.exists()) {
                Alert.alert("Erro", "Opções do equipamento não encontradas.");
                return;
            }
    
            const opcoesEquipamento = querySnapshot.data();
            console.log("Opções do Equipamento:", opcoesEquipamento);
            setEditEquipamento(prev => ({
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
            Alert.alert("Erro", "Ocorreu um erro ao buscar as opções do equipamento.");
        }
    };
    
    useEffect(() => {
        fetchEquipamentoOptions();
    }, []);
    
    const [numeroEquipamento, setNumeroEquipamento] = useState("")
    const [tipoEquipamento, setTipoEquipamento] = useState("")
    const [patrimonio, setPatrimonio] = useState("")
    const [capacidade, setCapacidade] = useState("")
    const [fabricante, setFabricante] = useState("")
    const [ultManutencao, setUltManutencao] = useState("")
    const [proxManutencao, setProxManutecao] = useState("")
    const [area, setArea] = useState("")
    const [gerencia, setGerencia] = useState("")
    const [local, setLocal] = useState("")
    const [predio, setPredio] = useState("")
    const [setor, setSetor] = useState("")
    const [tipo, setTipo] = useState("")
    const [observacao, setObservacao] = useState("")

    const handleNewEquipamento = async () => {
        try {
            const equipamentoRef = doc(collection(db, 'Equipamentos'));
            const equipamentoFormatado = {
                "Numero_Equipamento": numeroEquipamento, 
                "Proxima_Manutencao": proxManutencao || anoSeguinteStringLocal, 
                "Data_da_Inspecao": agoraStringLocal, 
                "Area": area, 
                "Capacidade": capacidade, 
                "Local": local, 
                "Nao_Conformidades": "", 
                "Observacao": observacao, 
                "Patrimonio": patrimonio, 
                "Predio": predio, 
                "Proxima_Retirada": "", 
                "Selo_Inmetro": "", 
                "Setor": setor, 
                "Tipo": tipo, 
                "Fabricante": fabricante,
            };

            await setDoc(equipamentoRef, equipamentoFormatado);

            Alert.alert("Sucesso", "Equipamento adicionado com sucesso.");
            navigation.navigate('Home');

        } catch (error) {
            console.error("Erro ao adicionar o equipamento:", error);
            Alert.alert("Erro", "Ocorreu um erro ao adicionar o equipamento.");
        }
    };  

    return (
        <SafeAreaView style={modoEscuro ? styleUsuario.background_escuro : styleHome.background}>
            <Header />
            <ScrollView contentContainerStyle={[styleHome.information_container, styleEquipamentosDetalhes.detalher_tamanho_maior]}>
                <View style={[styleEquipamentosDetalhes.container_datalhes, styleEquipamentosDetalhes.container_datalhes_maior_maior]}>
                    <View style={styleEquipamentosDetalhes.container_datalhes_title}>
                        <Text style={styleEquipamentosDetalhes.datalhes_title}>Informações do Equipamento</Text>
                    </View>
                    <View style={styleEquipamentosDetalhes.container_detalhes_information}>
                        <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes}>
                            <Text style={styleEquipamentosDetalhes.text_box_outside}>Número do Equipamento:</Text>
                            <View style={styleEquipamentosDetalhes.box_comprida_baixa}>
                                <TextInput
                                    value={numeroEquipamento}
                                    onChangeText={(value) => setNumeroEquipamento(value)}
                                    style={{ color: modoEscuro ? 'white' : 'black' }}    
                                />
                            </View>
                        </View>
                        <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes}>
                            <Text style={styleEquipamentosDetalhes.text_box_outside}>Tipo de Equipamento:</Text>
                            <View style={styleEquipamentosDetalhes.box_comprida_baixa}>
                            <Picker
                                selectedValue={tipo}
                                onValueChange={(itemValue) => setTipo(itemValue)} 
                                style={{ color: modoEscuro ? 'white' : 'black' }}
                            >
                                {editEquipamento.Tipo && editEquipamento.Tipo.map((tipo: string | undefined, index: React.Key | null | undefined) => (
                                    <Picker.Item key={index} label={tipo} value={tipo} />
                                ))}
                            </Picker>
                            </View>
                        </View>
                        <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes}>
                            <Text style={styleEquipamentosDetalhes.text_box_outside}>Patrimonio:</Text>
                            <TextInput
                                value={patrimonio}
                                onChangeText={(value) => setPatrimonio(value)}
                                style={styleEquipamentosDetalhes.box_comprida_baixa}
                            />
                        </View>
                        <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes_duas}>
                            <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes_duas_box}>
                                <Text style={styleEquipamentosDetalhes.text_box_outside}>Capacidade:</Text>
                                <TextInput
                                    value={capacidade}
                                    onChangeText={(value) => setCapacidade(value)}
                                    style={styleEquipamentosDetalhes.box_curta_baixa}
                                />
                            </View>
                            <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes_duas_box}>
                                <Text style={styleEquipamentosDetalhes.text_box_outside}>Fabricante:</Text>
                                <TextInput
                                    value={fabricante}
                                    onChangeText={(value) => setFabricante(value)}
                                    style={styleEquipamentosDetalhes.box_curta_baixa}
                                />
                            </View>
                        </View>
                        <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes_duas}>
                            <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes_duas_box}>
                                <Text style={styleEquipamentosDetalhes.text_box_outside}>Ult Manutenção:</Text>
                                <Text style={styleEquipamentosDetalhes.box_curta_baixa}>
                                    {agoraStringLocal}
                                </Text>
                            </View>
                            <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes_duas_box}>
                                <Text style={styleEquipamentosDetalhes.text_box_outside}>Prox Manutenção:</Text>
                                <View style={styleEquipamentosDetalhes.box_curta_baixa}>
                                    <Text style={{ color: modoEscuro ? 'white' : 'black'}}>
                                        {anoSeguinteStringLocal || ""}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes}>
                            <Text style={styleEquipamentosDetalhes.text_box_outside}>Area:</Text>
                            <TextInput
                                value={area}
                                onChangeText={(value) => setArea(value)}
                                style={styleEquipamentosDetalhes.box_comprida_baixa}
                            />
                        </View>
                        <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes}>
                            <Text style={styleEquipamentosDetalhes.text_box_outside}>Gerencia:</Text>
                            <TextInput
                                value={gerencia}
                                onChangeText={(value) => setGerencia(value)}
                                style={styleEquipamentosDetalhes.box_comprida_baixa}
                            />
                        </View>
                        <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes}>
                            <Text style={styleEquipamentosDetalhes.text_box_outside}>Local:</Text>
                            <TextInput
                                value={local}
                                onChangeText={(value) => setLocal(value)}
                                style={styleEquipamentosDetalhes.box_comprida_baixa}
                            />
                        </View>
                        <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes}>
                            <Text style={styleEquipamentosDetalhes.text_box_outside}>Predio:</Text>
                            <TextInput
                                value={predio}
                                onChangeText={(value) => setPredio(value)}
                                style={styleEquipamentosDetalhes.box_comprida_baixa}
                            />
                        </View>
                        <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes}>
                            <Text style={styleEquipamentosDetalhes.text_box_outside}>Setor:</Text>
                            <TextInput
                                value={setor}
                                onChangeText={(value) => setSetor(value)}
                                style={styleEquipamentosDetalhes.box_comprida_baixa}
                            />
                        </View>
                        <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes}>
                            <Text style={styleEquipamentosDetalhes.text_box_outside}>Tipo:</Text>
                            <TextInput
                                value={tipo}
                                onChangeText={(value) => setTipo}
                                style={styleEquipamentosDetalhes.box_comprida_baixa}
                            />
                        </View>
                        <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes}>
                            <Text style={styleEquipamentosDetalhes.text_box_outside}>Observações:</Text>
                            <TextInput
                                value={observacao}
                                onChangeText={(value) => setObservacao(value)}
                                multiline
                                style={styleEquipamentosDetalhes.box_comprida_alta}
                            />
                        </View>
                        <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes}>
                            <TouchableOpacity 
                                style={styleEquipamentosDetalhes.botao_de_iniciar_manutencao} 
                                onPress={fetchEquipamentoOptions}
                            >
                                <Text style={{ fontSize: 18, fontWeight: '700', color: 'white' }}>
                                    Finalizar Inspeção
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <NavBar navigation={navigation} />
        </SafeAreaView>
    );
};

export default EquipamentosNovos;