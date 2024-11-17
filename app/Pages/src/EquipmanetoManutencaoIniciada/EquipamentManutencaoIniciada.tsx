import React, { useState, useContext, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import styleHome from "@/app/Pages/Style/HomeStyle";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import { SafeAreaView } from "react-native-safe-area-context";
import styleUsuario from "../../Style/UsuarioStyle";
import { EquipamentoContext } from "@/GlobalContext/GlobalContextEquipamentos";
import StartFirebase from '@/crud/firebaseConfig';
import { doc, updateDoc, getDocs, collection, query, where } from 'firebase/firestore';
import styleEquipamentosDetalhes from "../../Style/EquipamentosDetalhesStyle";
import { GlobalContext } from "@/GlobalContext/GlobalContext";
import { deleteDoc } from 'firebase/firestore';

type EquipamentoManutencaoIniciada = {
    navigation: StackNavigationProp<any, any>;
};

const EquipamentoManutencaoIniciada: React.FC<EquipamentoManutencaoIniciada> = ({ navigation }) => {
    const agora = new Date();
    const agoraUtc = new Date(agora.getTime() - (agora.getTimezoneOffset() * 60000));
    const agoraStringLocal = agoraUtc.toLocaleString("pt-BR");
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
    const handleSave = async () => {
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
            const equipamentoFormatado = {
                "Numero_Equipamento": editEquipamento["Numero_Equipamento"] || "", 
                "Proxima_Manutencao": anoSeguinteStringLocal || "", 
                "Data_da_Inspecao": agoraStringLocal || "", 
                "Area": editEquipamento["Area"] || "", 
                "Capacidade": editEquipamento["Capacidade"] || "", 
                "Local": editEquipamento["Local"] || "", 
                "Nao_Conformidades": editEquipamento["Nao_Conformidades"] || "", 
                "Observacao": editEquipamento["Observacao"] || "", 
                "Patrimonio": editEquipamento["Patrimonio"] || "", 
                "Predio": editEquipamento["Predio"] || "", 
                "Proxima_Retirada": editEquipamento["Proxima_Retirada"] || "", 
                "Selo_Inmetro": editEquipamento["Selo_Inmetro"] || "", 
                "Setor": editEquipamento["Setor"] || "", 
                "Tipo": editEquipamento["Tipo"] || "", 
                "Fabricante": editEquipamento["Fabricante"] || "",
            };

            await updateDoc(equipamentoRef, equipamentoFormatado);

            Alert.alert("Sucesso", "Equipamento atualizado com sucesso.");
            navigation.navigate('Home');

        } catch (error) {
            console.error("Erro ao atualizar o equipamento:", error);
            Alert.alert("Erro", "Ocorreu um erro ao atualizar o equipamento.");
        }
    };

    return (
        <SafeAreaView style={modoEscuro ? styleUsuario.background_escuro : styleHome.background}>
            <Header />
            <ScrollView contentContainerStyle={[styleHome.information_container, styleEquipamentosDetalhes.detalher_tamanho]}>
                <View style={[styleEquipamentosDetalhes.container_datalhes, styleEquipamentosDetalhes.container_datalhes_maior]}>
                    <View style={styleEquipamentosDetalhes.container_datalhes_title}>
                        <Text style={styleEquipamentosDetalhes.datalhes_title}>Informações do Equipamento</Text>
                    </View>
                    <View style={styleEquipamentosDetalhes.container_detalhes_information}>
                        <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes}>
                            <Text style={styleEquipamentosDetalhes.text_box_outside}>Número do Equipamento:</Text>
                            <View style={styleEquipamentosDetalhes.box_comprida_baixa}>
                                <Text style={{ color: modoEscuro ? 'white' : 'black' }}>
                                    {editEquipamento.Numero_Equipamento}
                                </Text>
                            </View>
                        </View>
                        <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes}>
                            <Text style={styleEquipamentosDetalhes.text_box_outside}>Tipo de Equipamento:</Text>
                            <View style={styleEquipamentosDetalhes.box_comprida_baixa}>
                                <TextInput
                                    value={editEquipamento.Tipo || ''}
                                    onChangeText={(value) => handleInputChange('Tipo', value)}
                                    style={{ color: modoEscuro ? 'white' : 'black' }}
                                />
                            </View>
                        </View>
                        <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes}>
                            <Text style={styleEquipamentosDetalhes.text_box_outside}>Patrimonio:</Text>
                            <TextInput
                                value={editEquipamento.Patrimonio || ''}
                                onChangeText={(value) => handleInputChange('Patrimonio', value)}
                                style={styleEquipamentosDetalhes.box_comprida_baixa}
                            />
                        </View>
                        <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes_duas}>
                            <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes_duas_box}>
                                <Text style={styleEquipamentosDetalhes.text_box_outside}>Capacidade:</Text>
                                <TextInput
                                    value={editEquipamento.Capacidade || ''}
                                    onChangeText={(value) => handleInputChange('Capacidade', value)}
                                    style={styleEquipamentosDetalhes.box_curta_baixa}
                                />
                            </View>
                            <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes_duas_box}>
                                <Text style={styleEquipamentosDetalhes.text_box_outside}>Fabricado em:</Text>
                                <TextInput
                                    value={editEquipamento.Fabricante || ''}
                                    onChangeText={(value) => handleInputChange('Fabricante', value)}
                                    style={styleEquipamentosDetalhes.box_curta_baixa}
                                />
                            </View>
                        </View>
                        <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes_duas}>
                            <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes_duas_box}>
                                <Text style={styleEquipamentosDetalhes.text_box_outside}>Data de Validade:</Text>
                                <Text style={styleEquipamentosDetalhes.box_curta_baixa}>
                                    {agoraStringLocal}
                                </Text>
                            </View>
                            <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes_duas_box}>
                                <Text style={styleEquipamentosDetalhes.text_box_outside}>Prox Manutenção:</Text>
                                <View style={styleEquipamentosDetalhes.box_curta_baixa}>
                                    <Text style={{ color: modoEscuro ? 'white' : 'black' }}>
                                        {anoSeguinteStringLocal || ""}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes}>
                            <Text style={styleEquipamentosDetalhes.text_box_outside}>Localização:</Text>
                            <TextInput
                                value={editEquipamento.Local || ''}
                                onChangeText={(value) => handleInputChange('Local', value)}
                                style={styleEquipamentosDetalhes.box_comprida_baixa}
                            />
                        </View>
                        <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes}>
                            <Text style={styleEquipamentosDetalhes.text_box_outside}>Observações:</Text>
                            <TextInput
                                value={editEquipamento.Observacao || ''}
                                onChangeText={(value) => handleInputChange('Observacao', value)}
                                multiline
                                style={styleEquipamentosDetalhes.box_comprida_alta}
                            />
                        </View>
                        <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes}>
                        <TouchableOpacity 
                            style={[styleEquipamentosDetalhes.botao_de_iniciar_manutencao, styleEquipamentosDetalhes.botao_de_iniciar_manutencao_vermelho]} 
                            onPress={handleDelete}
                        >
                            <Text style={{ fontSize: 18, fontWeight: '700', color: 'white' }}>
                                Excluir Equipamento
                            </Text>
                        </TouchableOpacity>
                        </View>
                        <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes}>
                            <TouchableOpacity 
                                style={styleEquipamentosDetalhes.botao_de_iniciar_manutencao} 
                                onPress={handleSave}
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

export default EquipamentoManutencaoIniciada;
