import { StackNavigationProp } from "@react-navigation/stack";
import {SafeAreaView, ScrollView, View, Text, TouchableOpacity, Alert} from "react-native";
import { GlobalContext } from "@/GlobalContext/GlobalContext";
import React, {useContext, useEffect, useState, useRef} from "react";
import styleUsuario from "../../Style/UsuarioStyle";
import styleHome from "../../Style/HomeStyle";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import styleEquipamentosDetalhes from "../../Style/EquipamentosDetalhesStyle";
import { EquipamentoContext } from "@/GlobalContext/GlobalContextEquipamentos";
import ViewShot from "react-native-view-shot";
import QRCode from "react-native-qrcode-svg";
import * as MediaLibrary from "expo-media-library";

type EquipamentoDetalhesProps = { 
    navigation: StackNavigationProp<any, any>;
};

const EquipamentoDetalhes: React.FC<EquipamentoDetalhesProps> = ({ navigation }) => {
    const { modoEscuro, hasMediaLibraryPermission, tipoPermissao} = useContext(GlobalContext);
    const {equipamentoSelecionado, NumeroGlobal, setNumeroGlobal} = useContext(EquipamentoContext)
    const [qrValue, setQrValue] = useState<string>('');
    const viewShotRef = useRef<ViewShot>(null)

    const [numeroEquipamento, setNumeroEquipamento] = useState("")

    useEffect(() => {
        if (equipamentoSelecionado) {
            setNumeroEquipamento(equipamentoSelecionado.Numero_Equipamento || '');
            setQrValue(equipamentoSelecionado.Numero_Equipamento || '');
        }
        }, [equipamentoSelecionado]);

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

    const conditionalNavigation = () => {
        if (tipoPermissao != "Consultor") {
            navigation.navigate('EquipamentoManutencaoIniciada')
        } else {
            Alert.alert("Erro", "voce nao tem permissao para acessar essa pagina")
        }
    }

    return (
    <SafeAreaView style={modoEscuro ? styleUsuario.background_escuro : styleHome.background}>
        <Header />
            <ScrollView contentContainerStyle={[styleHome.information_container, styleEquipamentosDetalhes.detalher_tamanho_maior_detalhes]}>
                <View style={[styleEquipamentosDetalhes.container_datalhes, styleEquipamentosDetalhes.container_datalhes_maior_maior_detalhes]}>
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
                                Selo Imetro :
                            </Text>
                            <View style={styleEquipamentosDetalhes.box_comprida_baixa}>
                                <Text>{equipamentoSelecionado.Selo_Inmetro}</Text>
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
                        <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes}>
                            <Text style={styleEquipamentosDetalhes.text_box_outside}>
                                Proxima Retirada:
                            </Text>
                            <View style={styleEquipamentosDetalhes.box_comprida_baixa}>
                                <Text>{equipamentoSelecionado.Proxima_Retirada}</Text>
                            </View>
                        </View>
                        <View style={styleEquipamentosDetalhes.container_detalhes_information_boxes}>
                            <Text style={styleEquipamentosDetalhes.text_box_outside}>
                                Conformidades:
                            </Text>
                            <View style={styleEquipamentosDetalhes.box_comprida_baixa}>
                                <Text>{equipamentoSelecionado.Nao_Conformidades}</Text>
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
                            <View style={styleEquipamentosDetalhes.container_QrCode}>
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: '500'}}>Qr Code do Equipamento</Text>
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
                                onPress={conditionalNavigation}
                            >
                                <Text style={{fontSize: 20, fontWeight: '700', color: 'white'}}>Iniciar Inspeção</Text>
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
            <NavBar navigation={navigation}/>
        </SafeAreaView>
    )
}

export default EquipamentoDetalhes