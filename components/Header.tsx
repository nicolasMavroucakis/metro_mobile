import { View, Image, Text } from "react-native";
import styleIndex from "@/app/Pages/Style/indexStyle";
import { useContext } from "react";
import { GlobalContext } from "@/GlobalContext/GlobalContext";

export default function Header () {
    const { modoEscuro, setModoEscuro } = useContext(GlobalContext);

    return(
        <View style={[styleIndex.header, modoEscuro ? styleIndex.header_dark : null]}>
            <View style={styleIndex.item_header}>
                <Image source={require('../assets/images/metro-sp-logo-3.png')}/>
            </View>
            <View style={ styleIndex.item_header_barra}>
                <View style={[styleIndex.barra_header, modoEscuro ? styleIndex.barra_header_dark : null]}/>
            </View>  
            <View style={styleIndex.item_header}>
                <Text style={[styleIndex.text_header, modoEscuro ? styleIndex.text_header_dark : null]}>Controle de euipamento de Incendio</Text>
            </View>
        </View>
    )
}