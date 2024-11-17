import { StyleSheet, Dimensions, Platform } from "react-native";

const styleLogin = StyleSheet.create({
    background: {
        backgroundColor: '#001489',
        width: '100%',
        height: '100%'
    },
    text_Login: {
        fontSize: 35,
        fontWeight: '400',
        color: 'black',
        marginTop: 10
    },
    logo_image: {
        width:'100%',
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container_informations: {
        width: '80%',
        height: '50%',
        backgroundColor: '#FFF',
        margin: 'auto',
        marginTop:'10%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: "space-around"
    },
    container_bottom: {
        height:'5%',
        width:'100%',
        backgroundColor: '#D9D9D9',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        marginBottom: Platform.OS === 'ios' ? 0 : 50
    },
    input_user: {
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 5,
        width: '90%',
        margin: "auto",
        height: 40,
        paddingLeft: 5
    },
    button_login:{
        backgroundColor: '#3650E7',
        width: '50%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    container_input:{
        width: '90%',
        gap: 10
    },
    text_input_type: {
        fontSize: 18,
        marginLeft: 15,
        marginBottom: 5
    },
    container_button_login: {
        width: '40%',
        height: 40,
        alignItems: 'center'
    },
    container: {
        backgroundColor: "#1C1C1E",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%"
    },
    foto: {
        width: 21,
        height: 21,
    },
    container_bottom_Image:{
        width: "30%",
        height: '100%',
        justifyContent: 'center',
        marginLeft: 30
    },
    container_bottom_Text:{
        width: "70%",
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginRight: 30
    }
})

export default styleLogin