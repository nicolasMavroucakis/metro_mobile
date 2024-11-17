import { StyleSheet, Dimensions, StatusBar  } from "react-native";

const statusBarHeight = StatusBar.currentHeight || 0;

const styleUsuario= StyleSheet.create({
    information_container: {
        backgroundColor: '#D9D9D9',
        width: '90%',
        height: 500,
        marginTop: 20,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    user_image: {
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center'
    },
    user_information: {
        width: '90%',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 10
    },
    user_text_font: {
        fontSize: 20
    },
    user_text_information_container: {
        width: '100%',
        height: 28,
        backgroundColor: '#C6C6C6',
        justifyContent: 'center',
        paddingLeft: 5,
        borderRadius: 5
    },
    user_infromation_box: {
        width: '100%'
    },
    button_user_change: {
        width: '100%',
        height: 38,
        backgroundColor: '#1C5CA2',
        alignItems:'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    configuracoes: {
        width: '90%'
    },
    configuracoes_title: {
        width: '100%',
        alignItems: "center"
    },
    tema_button: {
        width: 100,
        height: 50,
        backgroundColor: '#A6A6A6',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 5
    },
    tema_button_button: {
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    tema_button_button_ativo_claro: {
        backgroundColor: 'white'
    },
    tema_button_button_ativo_escuro: {
        backgroundColor: '#504F4F'
    },
    background_escuro: { 
        backgroundColor: '#212C47',
        flex: 1,
        marginTop: statusBarHeight,
    }, 
    information_container_dark: {
        backgroundColor: '#141515'
    }, 
    input_color_dark: {
        backgroundColor: '#404040'
    }, 
    user_text_font_dark: {
        color: 'white'
    }
})

export default styleUsuario