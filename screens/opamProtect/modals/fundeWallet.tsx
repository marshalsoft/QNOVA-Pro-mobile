import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLOURS, FONTFAMILY, ROUTES } from "../../../includes/constants";
import styled from 'styled-components/native';
import { navigationRef } from "../../../App";
interface FundWalletProps {
    visible?:boolean;
    onClose?:()=>void;
    gotoFundWallet:()=>void;
}
const FundWallet = (props:FundWalletProps)=>{
    if(!props.visible)
    {
        return <></>
    }
return <Modal 
visible={props.visible}
transparent={true}
>
<View 
style={{flex:1,backgroundColor:COLOURS.modalBackground,justifyContent:"center",alignItems:"center",top:0,left:0}}
>
 <TouchableOpacity 
 activeOpacity={0.8}
 onPress={props.onClose}
 style={{position:"absolute",width:"100%",height:"100%",top:0,left:0}} ></TouchableOpacity>
<Card>
<View style={{flex:1,flexDirection:"column",padding:16,alignItems:"center",justifyContent:"center",gap:5}} >
<Text style={{color:"black",fontSize:16,fontWeight:"bold",fontFamily:FONTFAMILY.INTER.bold}}>Fund Account</Text>
<Text style={{color:"black",fontSize:13,fontFamily:FONTFAMILY.INTER.medium,textAlign:"center"}}>Fund your account to fully signup on OPAM Protect</Text>
</View>
<TouchableOpacity
onPress={props.gotoFundWallet}
style={{backgroundColor:"#8B1D41",padding:15,justifyContent:"center",alignItems:"center"}}>
<Text style={{color:"white",fontSize:16,fontWeight:"bold",fontFamily:FONTFAMILY.INTER.bold}}>Fund Account</Text>
</TouchableOpacity>
</Card>
</View>
</Modal>
}
export default FundWallet;

const Card = styled.View`
background: #B3B3B3;
width: 270px;
height: 136px;
gap: 2px;
border-radius: 14px ;
overflow:hidden;
`