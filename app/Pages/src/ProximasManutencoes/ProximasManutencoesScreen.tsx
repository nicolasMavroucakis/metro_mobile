import React, { useContext, useState } from 'react';
import { SafeAreaView, View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import styleHome from '@/app/Pages/Style/HomeStyle';
import { GlobalContext } from '@/GlobalContext/GlobalContext';
import styleUsuario from '../../Style/UsuarioStyle';
import Header from '@/components/Header';
import NavBar from '@/components/NavBar';
import styleManutencoesUP from '../../Style/ManutencoesUP';
import { EquipamentoContext, EquipamentoSelecionadoType } from '@/GlobalContext/GlobalContextEquipamentos';
import StartFirebase from '@/crud/firebaseConfig';
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';

type ProximasManutencoesScreen = {
    navigation: StackNavigationProp<any, any>;
};

const ProximasManutencoesScreen: React.FC<ProximasManutencoesScreen> = ({ navigation }) => {
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
                const docRef = querySnapshot.docs[0].ref;
                const equipamento = querySnapshot.docs[0].data();

                if (!("Manutencao_Esta_Iniciada" in equipamento)) {
                    await updateDoc(docRef, {
                        "Manutencao_Esta_Iniciada": false
                    });
                    equipamento["Manutencao_Esta_Iniciada"] = false;
                }

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
                    "Manutencao_Esta_Iniciada": equipamento["Manutencao_Esta_Iniciada"],
                    "Gerencia": equipamento["Gerencia"] || "",
                };

                console.log(equipamentoFormatado);
                setEquipamentoSelecionado(equipamentoFormatado);
                setNumeroGlobal(equipamento["Numero_Equipamento"]);
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
            <View style={styleManutencoesUP.information_container_manutencoes_UP}>
                <View style={[styleManutencoesUP.last_updates, modoEscuro ? styleHome.last_updates_dark : null]}>
                    <View style={styleHome.last_upadates_title}>
                        <Text style={[styleHome.title_componets, modoEscuro ? styleHome.title_componets_dark : null]}>
                            Proximas Manutenções
                        </Text>
                    </View>
                    <ScrollView contentContainerStyle={styleHome.last_upadates_equipaments}>
                        {equipamentosProximaInspecao.map((equipamento, index) => (
                            <View
                                key={index}
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
                                            Data: {equipamento.Proxima_Manutencao || "Data não disponível"}
                                        </Text>
                                    </View>
                                </View>
                                <TouchableOpacity onPress={() => fetchEquipamentoDetails(equipamento.Numero_equipamento)}>
                                    <Image source={require('../../../../assets/images/seta.png')} />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </View>
            <NavBar navigation={navigation} />
        </SafeAreaView>
    );
};

export default ProximasManutencoesScreen;
