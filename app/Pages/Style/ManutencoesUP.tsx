import { StyleSheet, Dimensions, StatusBar  } from "react-native";

const statusBarHeight = StatusBar.currentHeight || 0;

const styleManutencoesUP = StyleSheet.create({
    information_container_manutencoes_UP: {
        width: '100%',
        justifyContent: 'center',
        height: '75%',
        alignItems: 'center',
        gap: 20,
        padding: '2%',
        overflow: 'scroll',
        flexGrow: 1, 
    },
    last_upadates_equipaments_UP: {
        gap: 10,
        overflow: 'scroll',
        width: '100%',
        backgroundColor: '#D9D9D9'
    },
    last_updates: {
        width: '75%',
        height: '70%',
        backgroundColor: '#D9D9D9',
        borderRadius: 20,
        alignItems: 'center',
        paddingBottom: 15
    }
})

export default styleManutencoesUP