import { View,Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import styleHome from "@/app/Pages/Style/HomeStyle";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import styleUsuario from "../../Style/UsuarioStyle";
import { GlobalContext } from "@/GlobalContext/GlobalContext";
import { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

type Usuario = {
    navigation: StackNavigationProp<any, any>;
};

const Usuario: React.FC<Usuario> = ({ navigation }) => {
    const { modoEscuro, setModoEscuro, nome } = useContext(GlobalContext);

    const palavras: string[] = nome.split(" ")
    const primeiraPalavra: string = palavras[0]
    const segundaPalavra: string = palavras[1]

    const Transforma_claro = () => {
        setModoEscuro(false); 
    };

    const Transforma_escuro = () => {
        setModoEscuro(true); 
    };

    return (
        <SafeAreaView style={ modoEscuro ?  styleUsuario.background_escuro: styleHome.background}>
            <Header/>
            <ScrollView contentContainerStyle={styleHome.information_container}>
                <View style={[styleUsuario.information_container, modoEscuro ? styleUsuario.information_container_dark : null]}>
                    <View style={styleUsuario.user_image}>
                        <Image source={require('../../../../assets/images/logo-metro-quadrado.png')} style={{width: 150, height: 150}}/>
                    </View>
                    <View style={styleUsuario.user_information}>
                        <View style={styleUsuario.user_infromation_box}>
                            <Text style={[styleUsuario.user_text_font, modoEscuro ? styleUsuario.user_text_font_dark : null]}>Nome:</Text>
                            <View style={[styleUsuario.user_text_information_container, modoEscuro ? styleUsuario.input_color_dark : null]} >
                                <Text style={[styleUsuario.user_text_font, modoEscuro ? styleUsuario.user_text_font_dark : null]}>{primeiraPalavra}</Text>
                            </View>
                        </View>
                        <View style={styleUsuario.user_infromation_box}>
                            <Text style={[styleUsuario.user_text_font, modoEscuro ? styleUsuario.user_text_font_dark : null]}>Sobrenome:</Text>
                            <View style={[styleUsuario.user_text_information_container, modoEscuro ? styleUsuario.input_color_dark : null]}>
                                <Text style={[styleUsuario.user_text_font, modoEscuro ? styleUsuario.user_text_font_dark : null]}>{segundaPalavra}</Text>
                            </View>
                        </View>
                        <View style={styleUsuario.user_infromation_box}>
                            <Text style={[styleUsuario.user_text_font, modoEscuro ? styleUsuario.user_text_font_dark : null]}>Funcional:</Text>
                            <View style={[styleUsuario.user_text_information_container, modoEscuro ? styleUsuario.input_color_dark : null]}>
                                <Text style={[styleUsuario.user_text_font, modoEscuro ? styleUsuario.user_text_font_dark : null]}>NACTUSZ</Text>
                            </View>
                        </View>
                        <View style={styleUsuario.user_infromation_box}>
                            <TouchableOpacity
                                style={styleUsuario.button_user_change}
                                onPress={() => navigation.navigate('Login')}
                            >
                                <Text style={styleUsuario.user_text_font}>Mudar de Usuario</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styleUsuario.configuracoes}>
                    <View style={styleUsuario.configuracoes_title}>
                        <Text style={{color: 'white', fontSize: 20, fontWeight: '700'}}>Configurações</Text>
                    </View>
                    <View >
                        <Text style={{color: 'white', fontSize: 17, fontWeight: '700'}}>Tema:</Text>
                        <View style={styleUsuario.tema_button}>
                            <TouchableOpacity 
                                style={[
                                    styleUsuario.tema_button_button, 
                                    modoEscuro ? null : styleUsuario.tema_button_button_ativo_claro
                                ]} 
                                onPress={Transforma_claro}
                            >
                                <Image source={require('../../../../assets/images/Sol.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[
                                    styleUsuario.tema_button_button, 
                                    modoEscuro ? styleUsuario.tema_button_button_ativo_escuro : null
                                ]} 
                                onPress={Transforma_escuro}
                            >
                                <Image source={require('../../../../assets/images/Lua.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <NavBar navigation={navigation}/>
        </SafeAreaView>
    )   
}

export default Usuario