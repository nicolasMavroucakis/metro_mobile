import React, { useState, useContext, useEffect, useRef } from "react";
import {View, Text, ScrollView, TouchableOpacity, TextInput, Alert, Button, Modal, TouchableWithoutFeedback} from "react-native";
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
import QRCode from 'react-native-qrcode-svg';
import * as MediaLibrary from 'expo-media-library'
import ViewShot from 'react-native-view-shot';

type EquipamentosNovos = {
    navigation: StackNavigationProp<any, any>;
};

const EquipamentosNovos: React.FC<EquipamentosNovos> = ({ navigation }) => {
    const [qrValue, setQrValue] = useState<string>('');
    const viewShotRef = useRef<ViewShot>(null)

    const agora = new Date();
    const agoraStringLocal = agora.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
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

            setArea(opcoesEquipamento.Area ? opcoesEquipamento.Area[0] : '')
            setFabricante(opcoesEquipamento.Fabricante ? opcoesEquipamento.Fabricante[0] : '')
            setCapacidade(opcoesEquipamento.Capacidade ? opcoesEquipamento.Capacidade[0] : '')
            setGerencia(opcoesEquipamento.Gerencia ? opcoesEquipamento.Gerencia[0] : '')
            setLocal(opcoesEquipamento.Local ? opcoesEquipamento.Local[0] : '')
            setPredio(opcoesEquipamento.Predio ? opcoesEquipamento.Predio[0] : '')
            setSetor(opcoesEquipamento.Setor ? opcoesEquipamento.Setor[0] : '')
            setTipo(opcoesEquipamento.Tipo ? opcoesEquipamento.Tipo[0] : '')

        } catch (error) {
            console.error("Erro ao buscar as opções do equipamento:", error)
            Alert.alert("Erro", "Ocorreu um erro ao buscar as opções do equipamento.")
        }
    };

    useEffect(() => {
        fetchEquipamentoOptions()
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
    const [seloImetro, setSeloImetro] = useState("")
    const [proximaRetirada, setProximaRetirada] = useState("")
    const [confirmades, setConfirmades] = useState("")

    const [viewHeight, setViewHeight] = useState(50);

    const handleNewEquipamento = async () => {
        if (numeroEquipamento == "" || seloImetro == "" || patrimonio == "" || proximaRetirada == "" || confirmades == "") {
            Alert.alert("Falha", "Os campos Numero do Equipamento, Selo do Imetro, Patrimonio, Proxima Retirada ou Conformidades não podem estar vaizos")
        }   else    {
            try {
                const equipamentoRef = doc(collection(db, 'Equipamentos'));
                const equipamentoFormatado = {
                    "Numero_Equipamento": numeroEquipamento,
                    "Proxima_Manutencao": proxManutencao || anoSeguinteStringLocal,
                    "Data_da_Inspecao": agoraStringLocal,
                    "Area": area,
                    "Capacidade": capacidade,
                    "Local": local,
                    "Nao_Conformidades": confirmades,
                    "Observacao": observacao,
                    "Patrimonio": patrimonio,
                    "Predio": predio,
                    "Proxima_Retirada": proximaRetirada,
                    "Selo_Inmetro": seloImetro,
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
        }
    };

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
                                <TextInput
                                    value={numeroEquipamento}
                                    onChangeText={(value) => setNumeroEquipamento(value)}
                                    style={{ color: modoEscuro ? 'white' : 'black' }}    
                                />
                            </View>
                        </View>
                        <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes}>
                            <Text style={[styleEquipamentosDetalhes.text_box_outside, modoEscuro ? styleEquipamentosDetalhes.color_white : styleEquipamentosDetalhes.color_black]}>Selo do Imetro:</Text>
                            <View style={styleEquipamentosDetalhes.box_comprida_baixa}>
                                <TextInput
                                    value={seloImetro}
                                    onChangeText={(value) => setSeloImetro(value)}
                                    style={{ color: modoEscuro ? 'white' : 'black' }}
                                />
                            </View>
                        </View>
                        <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes}>
                            <Text style={[styleEquipamentosDetalhes.text_box_outside, modoEscuro ? styleEquipamentosDetalhes.color_white : styleEquipamentosDetalhes.color_black]}>Patrimonio:</Text>
                            <TextInput
                                value={patrimonio}
                                onChangeText={(value) => setPatrimonio(value)}
                                style={styleEquipamentosDetalhes.box_comprida_baixa}
                            />
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
                                value={confirmades}
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
                                <View style={styleEquipamentosDetalhes.box_curta_baixa}>
                                    <Text style={styleEquipamentosDetalhes.box_curta_baixa}>
                                        {anoSeguinteStringLocal || ""}
                                    </Text>
                                </View>
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
                                    {Array.isArray(editEquipamento.Tipo) && editEquipamento.Tipo.map((tipo: string | undefined, index: React.Key | null | undefined) => (
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
                                    {Array.isArray(editEquipamento.Capacidade) && editEquipamento.Capacidade.map((capacidade, index) => (
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
                                    {Array.isArray(editEquipamento.Fabricante) && editEquipamento.Fabricante.map((fabricante, index) => (
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
                                    {Array.isArray(editEquipamento.Area) && editEquipamento.Area.map((area, index) => (
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
                                    {Array.isArray(editEquipamento.Gerencia) && editEquipamento.Gerencia.map((gerencia, index) => (
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
                                    {Array.isArray(editEquipamento.Local) && editEquipamento.Local.map((local, index) => (
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
                                    {Array.isArray(editEquipamento.Predio) && editEquipamento.Predio.map((predio, index) => (
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
                                    {Array.isArray(editEquipamento.Setor) && editEquipamento.Setor.map((setor, index) => (
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
                                onPress={handleNewEquipamento}
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

export default EquipamentosNovos;
