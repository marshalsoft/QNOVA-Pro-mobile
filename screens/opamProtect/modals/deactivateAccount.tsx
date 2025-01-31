import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLOURS, DEVICE, FONTFAMILY, ROUTES } from "../../../includes/constants";
import styled from 'styled-components/native';
import Svg, { Circle,Path } from "react-native-svg"
import { navigationRef } from "../../../App";
import BaseButton from "../../../components/baseButton";
import { useEffect, useState } from "react";
interface DeactivateAccountModalProps {
    onClose:(value?:"Yes"|"No")=>void;
}
const DeactivateAccountModal = (props:DeactivateAccountModalProps)=>{
const [selected,setSelected] = useState<"Yes"|"No">("Yes");
return <View 
style={{...StyleSheet.absoluteFillObject,backgroundColor:COLOURS.modalBackground,justifyContent:"center",alignItems:"center",top:0,left:0}}
>
 <TouchableOpacity 
 activeOpacity={0.8}
 onPress={()=>props.onClose(selected)}
 style={{position:"absolute",width:"100%",height:"100%",top:0,left:0}} ></TouchableOpacity>
<Card
style={{padding:30}}
>
<Text style={{color:"black",fontSize:16,fontWeight:"bold",fontFamily:FONTFAMILY.INTER.bold}}>Deactivate Account</Text>
<View style={{flexDirection:"row",gap:10,marginVertical:10}}>
    <ToggleView 
    onPress={(value)=>setSelected(value?"Yes":"No")}
    value={selected === "Yes"}
    />
    <View >
        <Text >Yes</Text>
    </View>
</View>
<View style={{flexDirection:"row",gap:10,marginVertical:10,marginBottom:40}}>
    <ToggleView 
    onPress={(value)=>{
     setSelected(value?"No":"Yes")
    }}
    value={selected === "No"}
    />
    <View >
        <Text >No</Text>
    </View>
</View>
<BaseButton 
 onPress={()=>props.onClose(selected)}
 title="Continue"
 />
</Card>
</View>
}
export default DeactivateAccountModal;

const Card = styled.View`
background: #FFF;
width: ${DEVICE.width}px;
min-height: ${DEVICE.width}px;
border-radius: 20px 20px 0px 0px ;
overflow:hidden;
position:absolute;
bottom:0px;
`;
const ToggleBtn = ({selected}:{selected:boolean})=>{
    useEffect(()=>{},[])
    return selected? <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
  >
    <Path
      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      fill="#fff"
      stroke="#FFCD3D"
      strokeWidth={6}
    />
  </Svg>:<Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
  >
    <Circle cx={12} cy={12} r={11.5} stroke="#7B7F99" strokeOpacity={0.5} />
  </Svg>
}
const ToggleView = ({onPress,value}:{onPress:(value:boolean)=>void;value:boolean})=>{
    const [selected,setSelected] = useState(false);
    useEffect(()=>{
        setSelected(value)
    },[value])
    return <TouchableOpacity 
    onPress={()=>{
        setSelected(!selected)
        onPress(!selected);
    }}
    >
    <ToggleBtn selected={selected} />
</TouchableOpacity>
}