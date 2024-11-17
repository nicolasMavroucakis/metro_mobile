import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ScrollView, SafeAreaView, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native'; 
import styleHome from "@/app/Pages/Style/HomeStyle";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import styleQRCode from "../../Style/Qr_codeStyle";
import { GlobalContext } from "@/GlobalContext/GlobalContext";
import styleUsuario from "../../Style/UsuarioStyle";
import { CameraView, useCameraPermissions } from 'expo-camera';
import { EquipamentoContext } from "@/GlobalContext/GlobalContextEquipamentos";
import { collection, query, where, getDocs } from 'firebase/firestore';
import StartFirebase from '@/crud/firebaseConfig';

type QR_CodeProps = { 
    navigation: StackNavigationProp<any, any>;
};

const QR_Code: React.FC<QR_CodeProps> = ({ navigation }) => {
    const { modoEscuro } = useContext(GlobalContext);
    const { setEquipamentoSelecionado, setNumeroGlobal } = useContext(EquipamentoContext);
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const db = StartFirebase();

    const fetchEquipamentoDetails = async (numeroEquipamento: string) => {
        try {
            const q = query(
                collection(db, 'Equipamentos'),
                where('Numero_Equipamento', '==', numeroEquipamento)
            );
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const equipamento = querySnapshot.docs[0].data();
                const equipamentoFormatado = {
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

    useFocusEffect(
        React.useCallback(() => {
            const onScreenFocus = () => {};
            const onScreenBlur = () => {
                setScanned(false);
            };
            onScreenFocus();
            return () => onScreenBlur();
        }, [])
    );

    useEffect(() => {
        if (!permission?.granted) {
            requestPermission();
        }
    }, [permission]);

    const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
        setScanned(true);
        fetchEquipamentoDetails(data);
    };

    if (permission === null) {
        return <Text>Solicitando permissão de uso da câmera...</Text>;
    }

    if (!permission.granted) {
        return <Text>Permissão para acessar a câmera foi negada.</Text>;
    }

    return (
        <SafeAreaView style={modoEscuro ? styleUsuario.background_escuro : styleHome.background}>
            <Header />
            <ScrollView contentContainerStyle={[styleHome.information_container, styleQRCode.alinha]}>
                <Text style={styleQRCode.titles}>Escanei o QR Code do Equipamento</Text>
                <View style={[styleQRCode.Qrcode_container, modoEscuro ? styleHome.information_container_dark : null]}>
                    <CameraView
                        style={{ flex: 1 }}
                        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                    />
                </View>
                {scanned && (
                    <Text style={styleQRCode.titles} onPress={() => setScanned(false)}>
                        Toque para escanear novamente
                    </Text>
                )}
                <Text style={styleQRCode.titles}>
                    Direcione a câmera para o QR Code do equipamento localizando ele dentro do quadrado acima
                </Text>
            </ScrollView>
            <NavBar navigation={navigation} />
        </SafeAreaView>
    );
};

export default QR_Code;
