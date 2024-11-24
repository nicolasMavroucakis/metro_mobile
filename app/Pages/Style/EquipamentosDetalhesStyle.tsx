import { StyleSheet, Dimensions, StatusBar  } from "react-native";

const statusBarHeight = StatusBar.currentHeight || 0;

const styleEquipamentosDetalhes= StyleSheet.create({
    container_datalhes: {
        width: "80%",
        height: 840,
        borderRadius: 20,
        backgroundColor: '#D9D9D9',
        marginTop: '10%',
        alignItems: 'center'
    },
    datalhes_title: {
        fontSize: 20,
        fontWeight: '700'
    },
    container_datalhes_title: {
        alignItems: 'center',
        width: '90%',
        height: '8%',
        justifyContent: 'center'
    },
    container_detalhes_information: {
        height: '90%',
        width: "90%",
        alignItems: 'center',
        gap: 10
    },
    box_comprida_baixa: {
        width: '90%',
        height: 50,
        backgroundColor: '#909090',
        borderRadius: 10,
        justifyContent: 'center',
        paddingLeft: 10
    },
    text_box_outside: {
        fontSize: 15,
        fontWeight: '500'
    },
    container_detalhes_information_boxes: {
        width: '100%',
        alignItems: 'center',
        gap: 5
    },
    container_detalhes_information_boxes_duas: {
        width: '100%',
        alignItems: 'center',
        gap: 5,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    box_curta_baixa: {
        width:'90%',
        height: 50,
        backgroundColor: '#909090',
        borderRadius: 10,
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        textAlignVertical: 'center'
    },
    container_detalhes_information_boxes_duas_box: {
        width: '45%',
        alignItems: 'center'
    },
    container_black: {
        backgroundColor: "#141515",
        height: 2060
    },
    container_white: {
        backgroundColor: "#D9D9D9",
        height: 2060
    },
    box_comprida_alta: {
        width:'90%',
        height: 200,
        backgroundColor: '#909090',
        borderRadius: 10,
        textAlign: 'center',
        padding: 10
    },
    botao_de_iniciar_manutencao: {
        width:'90%',
        height: 60,
        backgroundColor: '#1C5CA2',
        borderRadius: 10,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    botao_dowload: {
        width:'90%',
        height: 60,
        backgroundColor: '#177a14',
        borderRadius: 10,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    container_datalhes_maior: {
        height: 1030
    }, 
    botao_de_iniciar_manutencao_vermelho: {
        backgroundColor:  "#ff3333",
        marginTop: 10
    },
    detalher_tamanho: {
        height: '200%'
    },
    container_datalhes_maior_maior: {
        height: 2060
    },
    container_datalhes_maior_maior_detalhes: {
        height: 1490
    },
    detalher_tamanho_maior: {
        height: 2200
    },
    detalher_tamanho_maior_detalhes: {
        height: 1600
    },
    container_QrCode: {
        width: "90%",
        alignItems: 'center',
        justifyContent: "center"
    },
    just_margin_top_and_background: {
        marginTop: 10,
        width: "100%",
        height: 210,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "#909090",
        borderRadius: 10,
    },
    color_white: {
        color: "#FFFFFF",
    },
    color_black: {
        color: "black",
    }
})

export default styleEquipamentosDetalhes