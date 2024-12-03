import { View,Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import styleIndex from "@/app/Pages/Style/indexStyle";
import { GlobalContext } from "@/GlobalContext/GlobalContext";
import { useContext } from "react";

type NavBar = {
    navigation: StackNavigationProp<any, any>;
};

const NavBar: React.FC<NavBar> = ({ navigation }) => {
    const { modoEscuro, setModoEscuro } = useContext(GlobalContext);
    return(
        <View style={[styleIndex.nav_bar, modoEscuro ? styleIndex.nav_bar_dark : null]}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                style={styleIndex.button}
            >
                <Image source={modoEscuro ? require('../assets/images/Home_white.png') : require('../assets/images/Home.png')} style={styleIndex.tamanho_foto} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Equipamentos')}
                style={styleIndex.button}
            >
                <Image source={modoEscuro ? require('../assets/images/extintor-de-incendio-white.png') : require('../assets/images/Extintor.png')} style={styleIndex.tamanho_foto} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('QRCode')}
                style={styleIndex.button}
            >   
                
                <Image source={modoEscuro ? require('../assets/images/QR_code_white.png') : require('../assets/images/QR_Code.png')} style={styleIndex.tamanho_foto} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Manutencoes')}
                style={styleIndex.button}
            >
                <Image source={modoEscuro ? require('../assets/images/Ferramentas_white.png') : require('../assets/images/Ferramentas.png')} style={styleIndex.tamanho_foto} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Usuario')}
                style={styleIndex.button}
            >   
                <Image 
                    source={modoEscuro ? require('../assets/images/User_white.png') : require('../assets/images/User.png')} 
                    style={styleIndex.tamanho_foto} 
                />
            </TouchableOpacity>
        </View>
    )
}

export default NavBar