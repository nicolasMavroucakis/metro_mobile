import React, { useContext, useState } from 'react';
import { SafeAreaView, Text, Image, TextInput, TouchableOpacity, View, Alert } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import styleLogin from "../Style/LoginStyle";
import styleIndex from '../Style/indexStyle';
import StartFirebase from '@/crud/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { GlobalContext } from '@/GlobalContext/GlobalContext';
import { EquipamentoContext, EquipamentoType, useEquipamentoContext } from '@/GlobalContext/GlobalContextEquipamentos';

type LoginProps = {
    navigation: StackNavigationProp<any, any>
};

const Login: React.FC<LoginProps> = ({ navigation }) => {
    const { setEquipamentosManutencaoRecente, setEquipamentosProximaInspecao } = useEquipamentoContext();
    const db = StartFirebase();
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const { setUsuarioGlobal, setNome, setTipoPermissao } = useContext(GlobalContext);
    const { setArrayEquipamentosGlobal } = useContext(EquipamentoContext);

    const handleLogin = async () => {
        if (senha == '' && usuario == '') {
            navigation.navigate('Home');
        }

        try {
            const q = query(
                collection(db, 'Usuarios'),
                where('Usuario', '==', usuario),
                where('Senha', '==', senha)
            );
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userData = querySnapshot.docs[0].data();
                console.log("Dados do usuário:", userData);

                setUsuarioGlobal(usuario);
                setNome(userData.Nome);
                setTipoPermissao(userData.Permissao);
                handleEquipamentosIfTrue();
                navigation.navigate('Home');
            } else {
                Alert.alert('Erro', 'Usuário ou senha incorretos');
            }
        } catch (error) {
            console.error("Erro ao realizar login:", error);
            Alert.alert('Erro', 'Ocorreu um erro ao realizar o login. Tente novamente.');
        }
    };

    const handleEquipamentosIfTrue = async () => {
        try {
            const equipamentoRef = collection(db, 'Equipamentos');
            const equipamentoSnapshot = await getDocs(equipamentoRef);
            const equipamentoArray = equipamentoSnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    Data_da_Inspecao: data["Data_da_Inspecao"],
                    Proxima_Manutencao: data["Proxima_Manutencao"],
                    Numero_equipamento: data["Numero_Equipamento"],
                };
            });
            console.log("Equipamentos:", equipamentoArray);
            setArrayEquipamentosGlobal(equipamentoArray);

            const equipamentosMaisRecentes = selecionarEquipamentosManutencaoRecente(equipamentoArray);
            const equipamentosProximaManutencao = selecionarEquipamentosProximaManutencao(equipamentoArray);

            setEquipamentosManutencaoRecente(equipamentosMaisRecentes);
            setEquipamentosProximaInspecao(equipamentosProximaManutencao);

            console.log("Equipamentos com Manutenção Mais Recente:", equipamentosMaisRecentes);
            console.log("Equipamentos com Próxima Inspeção Mais Próxima:", equipamentosProximaManutencao);
            
        } catch (error) {
            console.error("Erro ao obter equipamentos:", error);
        }
    };
    
    const selecionarEquipamentosManutencaoRecente = (equipamentos: EquipamentoType[]) => {
        return equipamentos
            .filter((equipamento) => {
                const inspecao = new Date(equipamento.Data_da_Inspecao || "");
                return inspecao <= new Date();
            })
            .sort((a, b) => {
                const inspecaoA = new Date(a.Data_da_Inspecao || "");
                const inspecaoB = new Date(b.Data_da_Inspecao || "");
                return inspecaoB.getTime() - inspecaoA.getTime();
            })
            .slice(0, 10);
    };
    
    const selecionarEquipamentosProximaManutencao = (equipamentos: EquipamentoType[]) => {
        return equipamentos
            .filter((equipamento) => {
                const manutencao = new Date(equipamento.Proxima_Manutencao || "");
                return manutencao >= new Date();
            })
            .sort((a, b) => {
                const manutencaoA = new Date(a.Proxima_Manutencao || "");
                const manutencaoB = new Date(b.Proxima_Manutencao || "");
                return manutencaoA.getTime() - manutencaoB.getTime();
            })
            .slice(0, 10);
    };

    return (
        <SafeAreaView style={[styleLogin.container, styleIndex.app]}>
            <View style={styleLogin.background}>
                <View style={styleLogin.logo_image}>
                    <Image source={require('../../../assets/images/logo-metro.png')} />
                </View>
                <View style={styleLogin.container_informations}>
                    <Text style={styleLogin.text_Login}>LOGIN</Text>
                    <View style={styleLogin.container_input}>
                        <View>
                            <Text style={styleLogin.text_input_type}>Usuario</Text>
                            <TextInput
                                placeholder="Digite o seu Usuario"
                                style={styleLogin.input_user}
                                value={usuario}
                                onChangeText={setUsuario}
                            />
                        </View>
                        <View>
                            <Text style={styleLogin.text_input_type}>Senha</Text>
                            <TextInput
                                placeholder="Digite sua Senha"
                                style={styleLogin.input_user}
                                secureTextEntry
                                value={senha}
                                onChangeText={setSenha}
                            />
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styleLogin.button_login}
                        onPress={handleLogin}
                    >
                        <Text style={{ color: 'white', fontSize: 20 }}>Entrar</Text>
                    </TouchableOpacity>
                </View>
                <View style={styleLogin.container_bottom}>
                    <Image source={require('../../../assets/images/logo-metro-quadrado.png')} style={styleLogin.foto} />
                    <Text>Termo de Uso e Aviso de Privacidade</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Login;
