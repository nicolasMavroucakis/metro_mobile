import React, {useState, useContext, useEffect, useRef} from "react";
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
import {useEquipamento} from "@/GlobalContext/GlobalOptionsContext";
import {Picker} from "@react-native-picker/picker";
import QRCode from "react-native-qrcode-svg";
import * as MediaLibrary from "expo-media-library";
import ViewShot from 'react-native-view-shot';

type EquipamentoManutencaoIniciada = {
    navigation: StackNavigationProp<any, any>;
};

const EquipamentoManutencaoIniciada: React.FC<EquipamentoManutencaoIniciada> = ({ navigation }) => {
    const { equipamentoOptions, fetchEquipamentoOptions } = useEquipamento()
    const viewShotRef = useRef<ViewShot>(null)
    const [qrValue, setQrValue] = useState<string>('');

    const agora = new Date();
    const agoraUtc = new Date(agora.getTime() - (agora.getTimezoneOffset() * 60000));
    const agoraStringLocal = agoraUtc.toLocaleString("pt-BR");
    console.log(agoraStringLocal);

    const anoSeguinte = new Date(agora);
    anoSeguinte.setFullYear(anoSeguinte.getFullYear() + 1);

    const anoSeguinteStringLocal = anoSeguinte.toLocaleDateString("pt-BR"); 
    console.log(anoSeguinteStringLocal);

    const { modoEscuro, hasMediaLibraryPermission, setHasMediaLibraryPermission } = useContext(GlobalContext);
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
            const q = query(equipamentosRef, where('Numero_Equipamento', '==', numeroEquipamento));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                Alert.alert("Erro", "Equipamento não encontrado.");
                return;
            }

            const docSnap = querySnapshot.docs[0];
            const equipamentoRef = doc(db, 'Equipamentos', docSnap.id);

            const equipamentoFormatado = {
                Numero_Equipamento: numeroEquipamento,
                Proxima_Manutencao: proxManutencao,
                Data_da_Inspecao: ultManutencao,
                Area: area,
                Capacidade: capacidade,
                Local: local,
                Nao_Conformidades: conformidades,
                Observacao: observacao,
                Patrimonio: patrimonio,
                Predio: predio,
                Proxima_Retirada: proximaRetirada,
                Selo_Inmetro: seloImetro,
                Setor: setor,
                Tipo: tipo,
                Fabricante: fabricante
            };

            await updateDoc(equipamentoRef, equipamentoFormatado);

            Alert.alert("Sucesso", "Equipamento atualizado com sucesso.");
            navigation.navigate('Home');

        } catch (error) {
            console.error("Erro ao atualizar o equipamento:", error);
            Alert.alert("Erro", "Ocorreu um erro ao atualizar o equipamento.");
        }
    };


    const [numeroEquipamento, setNumeroEquipamento] = useState(editEquipamento.Numero_Equipamento || "")
    const [tipo, setTipo] = useState(editEquipamento.Tipo || "")
    const [patrimonio, setPatrimonio] = useState(editEquipamento.Patrimonio || "")
    const [capacidade, setCapacidade] = useState(editEquipamento.Capacidade || "")
    const [fabricante, setFabricante] = useState(editEquipamento.Fabricante || "")
    const [ultManutencao, setUltManutencao] = useState(agoraStringLocal || "")
    const [proxManutencao, setProxManutecao] = useState(anoSeguinteStringLocal || "")
    const [area, setArea] = useState(editEquipamento.Area || "")
    const [gerencia, setGerencia] = useState(editEquipamento.Gerencia || "")
    const [local, setLocal] = useState(editEquipamento.Local || "")
    const [predio, setPredio] = useState(editEquipamento.Predio || "")
    const [setor, setSetor] = useState(editEquipamento.Setor || "")
    const [observacao, setObservacao] = useState(editEquipamento.Observacao || "")
    const [seloImetro, setSeloImetro] = useState(editEquipamento.Selo_Inmetro || "")
    const [proximaRetirada, setProximaRetirada] = useState(editEquipamento.Proxima_Retirada || "")
    const [conformidades, setConfirmades] = useState(editEquipamento.Conformidades || "")

    useEffect(() => { setQrValue(numeroEquipamento || '');  }, [numeroEquipamento]);

    const handleCapture = async () => {
        if (!hasMediaLibraryPermission) {
            Alert.alert('Permissão negada', 'Não foi possível salvar a imagem na galeria.');
            return;
        }

        const captureFunction = viewShotRef.current?.capture;
        if (captureFunction) {
            try {
                const uri = await captureFunction();
                console.log('QR Code capturado:', uri);

                if (uri) {
                    const asset = await MediaLibrary.createAssetAsync(uri);
                    await MediaLibrary.createAlbumAsync('QRCode', asset, false);
                    Alert.alert('Sucesso', 'QR Code salvo na galeria!');
                } else {
                    throw new Error('Falha ao capturar a imagem do QR Code');
                }
            } catch (error) {
                console.error('Erro ao capturar e salvar a imagem:', error);
                Alert.alert('Erro', 'Ocorreu um erro ao tentar salvar a imagem.');
            }
        } else {
            Alert.alert('Erro', 'Ocorreu um erro ao tentar capturar a imagem.');
        }
    };

    return (
        <SafeAreaView style={modoEscuro ? styleUsuario.background_escuro : styleHome.background}>
            <Header />
            <ScrollView contentContainerStyle={[styleHome.information_container, styleEquipamentosDetalhes.detalher_tamanho_maior]}>
            <View style={[styleEquipamentosDetalhes.container_datalhes, styleEquipamentosDetalhes.container_datalhes_maior_maior_detalhes, modoEscuro ? styleEquipamentosDetalhes.container_black : styleEquipamentosDetalhes.container_white]}>
                    <View style={styleEquipamentosDetalhes.container_datalhes_title}>
                        <Text style={modoEscuro ? styleEquipamentosDetalhes.datalhes_title_dark : styleEquipamentosDetalhes.datalhes_title}>Informações do Equipamento</Text>
                    </View>
                    <View style={styleEquipamentosDetalhes.container_detalhes_information}>
                        <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes}>
                            <Text style={[styleEquipamentosDetalhes.text_box_outside, modoEscuro ? styleEquipamentosDetalhes.color_white : styleEquipamentosDetalhes.color_black]}>Número do Equipamento:</Text>
                            <View style={styleEquipamentosDetalhes.box_comprida_baixa}>
                                <Text>{numeroEquipamento}</Text>
                            </View>
                        </View>
                        <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes}>
                            <Text style={[styleEquipamentosDetalhes.text_box_outside, modoEscuro ? styleEquipamentosDetalhes.color_white : styleEquipamentosDetalhes.color_black]}>Selo do Imetro:</Text>
                            <View style={styleEquipamentosDetalhes.box_comprida_baixa}>
                                <Text>
                                    {seloImetro}
                                </Text>
                            </View>
                        </View>
                        <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes}>
                            <Text style={[styleEquipamentosDetalhes.text_box_outside, modoEscuro ? styleEquipamentosDetalhes.color_white : styleEquipamentosDetalhes.color_black]}>Patrimonio:</Text>
                            <View style={styleEquipamentosDetalhes.box_comprida_baixa}>
                                <Text>
                                    {patrimonio}
                                </Text>
                            </View>
                        </View>
                        <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes}>
                            <Text style={[styleEquipamentosDetalhes.text_box_outside, modoEscuro ? styleEquipamentosDetalhes.color_white : styleEquipamentosDetalhes.color_black]}>Proxima Retirada:</Text>
                            <TextInput
                                value={proximaRetirada}
                                onChangeText={(value) => setProximaRetirada(value)}
                                style={styleEquipamentosDetalhes.box_comprida_baixa}
                            />
                        </View>
                        <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes}>
                            <Text style={[styleEquipamentosDetalhes.text_box_outside, modoEscuro ? styleEquipamentosDetalhes.color_white : styleEquipamentosDetalhes.color_black]}>Confirmades:</Text>
                            <TextInput
                                value={conformidades}
                                onChangeText={(value) => setConfirmades(value)}
                                style={styleEquipamentosDetalhes.box_comprida_baixa}
                            />
                        </View>
                        <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes_duas}>
                            <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes_duas_box}>
                                <Text style={[styleEquipamentosDetalhes.text_box_outside, modoEscuro ? styleEquipamentosDetalhes.color_white : styleEquipamentosDetalhes.color_black]}>Ult Manutenção:</Text>
                                <Text style={styleEquipamentosDetalhes.box_curta_baixa}>
                                    {agoraStringLocal}
                                </Text>
                            </View>
                            <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes_duas_box}>
                                <Text style={[styleEquipamentosDetalhes.text_box_outside, modoEscuro ? styleEquipamentosDetalhes.color_white : styleEquipamentosDetalhes.color_black]}>Prox Manutenção:</Text>
                                    <Text style={styleEquipamentosDetalhes.box_curta_baixa}>
                                        {anoSeguinteStringLocal || ""}
                                    </Text>
                            </View>
                        </View>
                        <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes}>
                            <Text style={[styleEquipamentosDetalhes.text_box_outside, modoEscuro ? styleEquipamentosDetalhes.color_white : styleEquipamentosDetalhes.color_black]}>Tipo de Equipamento:</Text>
                            <View style={[styleEquipamentosDetalhes.box_comprida_baixa, { overflow: 'hidden' }]}>
                                <Picker
                                    selectedValue={tipo}
                                    onValueChange={(itemValue) => setTipo(itemValue)}
                                    itemStyle={{ height: "100%", width: "100%", color: modoEscuro ? 'white' : 'black' }}
                                    mode="dropdown"
                                >
                                    {Array.isArray(equipamentoOptions.Tipo) && equipamentoOptions.Tipo.map((tipo: string | undefined, index: React.Key | null | undefined) => (
                                        <Picker.Item key={index} label={tipo} value={tipo} />
                                    ))}
                                </Picker>
                            </View>
                        </View>
                        <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes}>
                            <Text style={[styleEquipamentosDetalhes.text_box_outside, modoEscuro ? styleEquipamentosDetalhes.color_white : styleEquipamentosDetalhes.color_black]}>Capacidade:</Text>
                            <View style={[styleEquipamentosDetalhes.box_comprida_baixa, { overflow: 'hidden' }]}>
                                <Picker
                                    selectedValue={capacidade}
                                    onValueChange={(itemValue) => setCapacidade(itemValue)}
                                    itemStyle={{ height: "100%", width: "100%", color: modoEscuro ? 'white' : 'black' }}
                                    mode="dropdown"
                                >
                                    {Array.isArray(equipamentoOptions.Capacidade) && equipamentoOptions.Capacidade.map((capacidade, index) => (
                                        <Picker.Item key={index} label={capacidade} value={capacidade} />
                                    ))}
                                </Picker>
                            </View>
                        </View>
                        <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes}>
                            <Text style={[styleEquipamentosDetalhes.text_box_outside, modoEscuro ? styleEquipamentosDetalhes.color_white : styleEquipamentosDetalhes.color_black]}>Fabricante:</Text>
                            <View style={styleEquipamentosDetalhes.box_comprida_baixa}>
                                <Picker
                                    selectedValue={fabricante}
                                    onValueChange={(itemValue) => setFabricante(itemValue)}
                                    itemStyle={{ height: "100%", width: "100%", color: modoEscuro ? 'white' : 'black' }}
                                    mode="dropdown"
                                >
                                    {Array.isArray(equipamentoOptions.Fabricante) && equipamentoOptions.Fabricante.map((fabricante, index) => (
                                        <Picker.Item key={index} label={fabricante} value={fabricante} />
                                    ))}
                                </Picker>
                            </View>
                        </View>
                        <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes}>
                            <Text style={[styleEquipamentosDetalhes.text_box_outside, modoEscuro ? styleEquipamentosDetalhes.color_white : styleEquipamentosDetalhes.color_black]}>Área:</Text>
                            <View style={styleEquipamentosDetalhes.box_comprida_baixa}>
                                <Picker
                                    selectedValue={area}
                                    onValueChange={(itemValue) => setArea(itemValue)}
                                    itemStyle={{ height: "100%", width: "100%", color: modoEscuro ? 'white' : 'black' }}
                                    mode="dropdown"
                                >
                                    {Array.isArray(equipamentoOptions.Area) && equipamentoOptions.Area.map((area, index) => (
                                        <Picker.Item key={index} label={area} value={area} />
                                    ))}
                                </Picker>
                            </View>
                        </View>
                        <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes}>
                            <Text style={[styleEquipamentosDetalhes.text_box_outside, modoEscuro ? styleEquipamentosDetalhes.color_white : styleEquipamentosDetalhes.color_black]}>Gerência:</Text>
                            <View style={styleEquipamentosDetalhes.box_comprida_baixa}>
                                <Picker
                                    selectedValue={gerencia}
                                    onValueChange={(itemValue) => setGerencia(itemValue)}
                                    itemStyle={{ height: "100%", width: "100%", color: modoEscuro ? 'white' : 'black' }}
                                    mode="dropdown"
                                >
                                    {Array.isArray(equipamentoOptions.Gerencia) && equipamentoOptions.Gerencia.map((gerencia, index) => (
                                        <Picker.Item key={index} label={gerencia} value={gerencia} />
                                    ))}
                                </Picker>
                            </View>
                        </View>
                        <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes}>
                            <Text style={[styleEquipamentosDetalhes.text_box_outside, modoEscuro ? styleEquipamentosDetalhes.color_white : styleEquipamentosDetalhes.color_black]}>Local:</Text>
                            <View style={styleEquipamentosDetalhes.box_comprida_baixa}>
                                <Picker
                                    selectedValue={local}
                                    onValueChange={(itemValue) => setLocal(itemValue)}
                                    itemStyle={{ height: "100%", width: "100%", color: modoEscuro ? 'white' : 'black' }}
                                    mode="dropdown"
                                >
                                    {Array.isArray(equipamentoOptions.Local) && equipamentoOptions.Local.map((local, index) => (
                                        <Picker.Item key={index} label={local} value={local} />
                                    ))}
                                </Picker>
                            </View>
                        </View>
                        <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes}>
                            <Text style={[styleEquipamentosDetalhes.text_box_outside, modoEscuro ? styleEquipamentosDetalhes.color_white : styleEquipamentosDetalhes.color_black]}>Prédio:</Text>
                            <View style={styleEquipamentosDetalhes.box_comprida_baixa}>
                                <Picker
                                    selectedValue={predio}
                                    onValueChange={(itemValue) => setPredio(itemValue)}
                                    itemStyle={{ height: "100%", width: "100%", color: modoEscuro ? 'white' : 'black' }}
                                    mode="dropdown"
                                >
                                    {Array.isArray(equipamentoOptions.Predio) && equipamentoOptions.Predio.map((predio, index) => (
                                        <Picker.Item key={index} label={predio} value={predio} />
                                    ))}
                                </Picker>
                            </View>
                        </View>
                        <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes}>
                            <Text style={[styleEquipamentosDetalhes.text_box_outside, modoEscuro ? styleEquipamentosDetalhes.color_white : styleEquipamentosDetalhes.color_black]}>Setor:</Text>
                            <View style={styleEquipamentosDetalhes.box_comprida_baixa}>
                                <Picker
                                    selectedValue={setor}
                                    onValueChange={(itemValue) => setSetor(itemValue)}
                                    itemStyle={{ height: "100%", width: "100%", color: modoEscuro ? 'white' : 'black' }}
                                    mode="dropdown"
                                >
                                    {Array.isArray(equipamentoOptions.Setor) && equipamentoOptions.Setor.map((setor, index) => (
                                        <Picker.Item key={index} label={setor} value={setor} />
                                    ))}
                                </Picker>
                            </View>
                        </View>
                        <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes}>
                            <Text style={[styleEquipamentosDetalhes.text_box_outside, modoEscuro ? styleEquipamentosDetalhes.color_white : styleEquipamentosDetalhes.color_black]}>Observações:</Text>
                            <TextInput
                                value={observacao}
                                onChangeText={(value) => setObservacao(value)}
                                multiline
                                style={styleEquipamentosDetalhes.box_comprida_alta}
                            />
                        </View>
                        <View style={styleEquipamentosDetalhes.container_QrCode}>
                            <View>
                                <Text style={[styleEquipamentosDetalhes.text_box_outside, modoEscuro ? styleEquipamentosDetalhes.color_white : styleEquipamentosDetalhes.color_black]}>Qr Code do Equipamento</Text>
                            </View>
                            <View style={styleEquipamentosDetalhes.just_margin_top_and_background}>
                                {qrValue ? (
                                    <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 1.0 }}>
                                        <QRCode value={qrValue} size={200} />
                                    </ViewShot>
                                ) : (
                                    <Text>Insira o número do equipamento para gerar o QR Code</Text>
                                )}
                            </View>
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
                        <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes}>
                            <TouchableOpacity
                                style={styleEquipamentosDetalhes.botao_dowload}
                                onPress={handleCapture}
                            >
                                <Text style={{ fontSize: 18, fontWeight: '700', color: 'white' }}>
                                    Baixar QrCode
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
