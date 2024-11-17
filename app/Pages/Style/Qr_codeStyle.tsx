import { StyleSheet, Dimensions, StatusBar  } from "react-native";

const statusBarHeight = StatusBar.currentHeight || 0;

const styleQRCode= StyleSheet.create({
    titles: {
        color: 'white', 
        width: '90%', 
        fontWeight: '700', 
        fontSize: 20, 
        textAlign: 'center'
    },
    Qrcode_container: {
        width: '80%',
        height: 400, 
        backgroundColor: '#D9D9D9',
        borderRadius: 20
    },
    alinha: {
        height: '105%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    camera: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraOverlay: {
        // Se você quiser adicionar uma sobreposição visual, defina aqui
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
})

export default styleQRCode