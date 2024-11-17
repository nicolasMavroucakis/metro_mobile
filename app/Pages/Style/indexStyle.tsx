import { StyleSheet, Dimensions, StatusBar  } from "react-native";

const statusBarHeight = StatusBar.currentHeight || 0;

const styleIndex= StyleSheet.create({
    app:{
        marginTop:statusBarHeight,
        backgroundColor: '#001489',
        width: '100%',
        height: '100%',
        alignItems: "center"
    },
    header: {
        height: "10%",
        width: '100%',
        backgroundColor: '#D9D9D9',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    barra_header: {
        width:3,
        height: '80%',
        backgroundColor: 'black'
    },
    item_header: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text_header: {
        textAlign:'center',
        width: '60%'
    },
    item_header_barra: {
        width: '5%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    nav_bar: {
        width: '95%',
        height: '10%',
        backgroundColor: '#D9D9D9',
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 1,
        margin: 'auto'
    },
    tamanho_foto: {
        width: 60,
        height: 60,
    },
    button: {
        marginHorizontal: 10, // Adiciona espaçamento horizontal entre os botões
    },
    scrollContainer: {
        flexGrow: 1, 
    },
    header_dark: {
        backgroundColor: '#000000'
    },
    text_header_dark: {
        color: 'white'
    },
    barra_header_dark: {
        backgroundColor: 'white'
    }, 
    nav_bar_dark: {
        backgroundColor: "#000000"
    }
})

export default styleIndex