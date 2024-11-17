import { StyleSheet, Dimensions, StatusBar  } from "react-native";

const statusBarHeight = StatusBar.currentHeight || 0;

const styleHome= StyleSheet.create({
    background: {
        backgroundColor: '#001489',
        flex: 1,
        marginTop: statusBarHeight,
    },
    last_updates_dark: {
        backgroundColor: 'black'
    },
    text_name: {
        flexDirection: 'row',
        width: '100%',
        margin: 10,
        alignItems:'flex-end',
        justifyContent: 'flex-start'
    },
    ola: {
        fontWeight: '500', 
        color: 'white',
        fontSize: 20,
        marginBottom: 4
    },
    nome: {
        fontWeight: '700',
        color: 'white',
        fontSize: 30
    },
    qr_code_container: {
        backgroundColor: "#D9D9D9",
        width: "75%",
        height: 250,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    qr_code_container_dark: {
        backgroundColor: "#141515"
    },
    information_container: {
        width: '100%',
        height: '150%',
        alignItems: 'center',
        gap: 20,
        padding: '2%',
        overflow: 'scroll',
        flexGrow: 1
    },
    information_container_dark: {
        backgroundColor: '#404040'
    },
    qr_code_container_information: {
        width: '90%',
        height: '80%',
        backgroundColor: '#C6C6C6',
        borderRadius: 15, 
        marginBottom: '5%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    qr_code_container_information_dark: {
        backgroundColor: "#404040"
    },
    qr_code_container_text_text: {
        fontSize: 17,
        fontWeight: '600'
    },
    qr_code_container_text_text_dark: {
        color: 'white'
    },
    qr_code_container_text:{
        width: '90%',
        height: '10%'
    },
    last_updates: {
        width: '75%',
        flex: 1,
        backgroundColor: '#D9D9D9',
        borderRadius: 20,
        alignItems: 'center',
        paddingBottom: 15
    },
    title_componets: {
        fontSize: 17,
        fontWeight: '600',
        marginTop: 12,
        marginBottom: 5
    },  
    title_componets_dark: {
        color: 'white'
    },
    equipamento_container_information_dark: {
        backgroundColor: '#404040'
    },
    last_upadates_title: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-between'
    },
    button_ver_tudo: {
        width: '100%',
        height: 50,
        textAlign: 'right',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    button_ver_tudo_text:{
        fontWeight: '400',
        color: '#3650E7',
        fontSize: 20
    },
    equipamento_container: {
        width: '90%',
        height: 70,
        backgroundColor: '#C6C6C6',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
    equipamento_container_information: {
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    equipamento_container_information_text:{
        width: '70%',
        height: '70%',
        justifyContent: 'center'
    },
    last_upadates_equipaments: {
        gap: 10,
        overflow: 'scroll',
        width: '100%',
    },
    information_container_manutencoes: {
        width: '100%',
        height: '145%',
        alignItems: 'center',
        gap: 20,
        padding: '2%',
        overflow: 'scroll',
        flexGrow: 1
    }
})

export default styleHome