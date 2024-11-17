import { StyleSheet, Dimensions, StatusBar  } from "react-native";

const statusBarHeight = StatusBar.currentHeight || 0;

const styleEquipamentosNovos= StyleSheet.create({
    titulo: {
        width: "100%",
        height: 70,
        alignItems: 'center',
        justifyContent: "center"
    },
    container_input: {
        width: '100%',
        height: '90%',
        alignItems: 'center',
        gap: 10
    },
    inputGrande: {
        width: '90%',
        height: 50,
        borderRadius: 10,
        backgroundColor: '#909090'
    },
    input_grande_container: {
        width: '100%',
        height: 80,
        alignItems: 'center'
    }, 
    cor_texto_claro: {
        fontSize: 18, 
        color: 'black',
        fontWeight: '500',
        marginBottom: 5
    },
    input_pequeno_container: {
        width: '45%',
        height: 80,
        alignItems: 'center'
    },
    container_de_dois:{
        width: '90%',
        height: 80,
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    input_grande_container_alto: {
        width: '100%',
        height: 230,
        alignItems: 'center'
    },
    inputGrandeAlto: {
        width: '90%',
        height: 200,
        borderRadius: 10,
        backgroundColor: '#909090'
    }
})

export default styleEquipamentosNovos