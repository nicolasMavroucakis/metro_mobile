import { StyleSheet, Dimensions, StatusBar  } from "react-native";

const statusBarHeight = StatusBar.currentHeight || 0;

const styleEquipamentos= StyleSheet.create({
    busca: {
        width: '90%',
        height: 50,
        backgroundColor: '#D9D9D9',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 10,
        marginTop: 10
    },
    busca_isNotExpanded: {
        minWidth: 150,
        width: '90%',
        height: 50,
        backgroundColor: '#D9D9D9',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 10,
        marginTop: 10
    },
    busca_menor: {
        width: '90%',
        height: 50,
        backgroundColor: '#D9D9D9',
        alignItems: 'flex-start',
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 10,
        marginTop: 10
    },
    busca_menor_view: {
        width: '100%', 
        height: '100%', 
        alignItems: 'flex-end', 
        marginTop: 10
    },
    busca_isExpanded: {
        width: '90%',
        height: 50,
        backgroundColor: '#D9D9D9',
        alignItems: 'flex-end',
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 10,
        marginTop: 10
    },
    busca_dark: {
        backgroundColor: "#404040"
    },
    equipamentos: {
        width: '90%',
        height: 610,
        backgroundColor: '#D9D9D9',
        borderRadius: 20,
        overflow: 'scroll'
    },
    equipamentos_dark : {
        backgroundColor: '#141515'
    },
    equipamento: {
        width: '90%',
        height: 80,
        backgroundColor: '#C6C6C6',
        flexDirection: 'row',
        borderRadius: 15, 
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10, 
    },
    equipamento_dark: {
        backgroundColor: '#404040'
    },
    equipamentos_text: {
        fontSize: 30,
        marginTop: 10,
    },
    equipamentos_text_dark: {
        color: 'white'
    },
    equipamentos_informacoes: {
        flexDirection: 'row',
        width: '70%',
        height: '90%',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    equipamentos_informacoes_text: {
        fontSize: 25,
        fontWeight: '600'
    },
    equipamentos_informacoes_text_dark: {
        color: 'white'
    },
    equipamentos_button_pesquisa: {
        width: 100,
        height: 50,
        backgroundColor: '#1C5CA2',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginTop: 10
    },
    texto: {
        width: '90%'
    },
    image: {
        width: 40,
        height: 40
    },
    button_Add_Equipament_Container: { 
        width: '100%'
    },
    button_Add_Equipament: { 
        width: '70%',
        height: 50,
        backgroundColor: '#1C5CA2',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto'
    }
})

export default styleEquipamentos