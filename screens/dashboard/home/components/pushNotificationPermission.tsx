import { Modal, Text, View } from "react-native";
import styled from "styled-components/native";
import BaseButton from "../../../../components/baseButton";
import { COLOURS, FONTFAMILY } from "../../../../includes/constants";
import { usePushNotificationHook } from "../../../../includes/usePushHook";

interface PushNotificationPermission {
    show:boolean;
    onClose:()=>void;
    onDone:()=>void;
}
const PushNotificationPermission = (prop:PushNotificationPermission) => {
  const {GetPermission} = usePushNotificationHook()
   return (<Modal 
   transparent={true}
   visible={prop.show}
  >
  <View style={{width:"100%",paddingHorizontal:48,justifyContent:"center",alignItems:"center",backgroundColor:COLOURS.modalBackground,height:"100%",flexDirection:"column"}}>
   <CardView style={{gap:10}}>
    <Text style={{color:"#000",fontSize:16,fontFamily:FONTFAMILY.Baloo.medium,textAlign:"center"}}>Allow Notifications?</Text>
    <Text style={{color:"#6F7174",fontSize:14,fontFamily:FONTFAMILY.Baloo.normal,textAlign:"center"}}>Qnova-Pro will like to send you important updates and alerts. Enabling notifications ensures you never miss out on critical information.</Text>
    <View style={{flexDirection:"row",alignItems:"flex-start",justifyContent:"flex-start",flexWrap:"wrap",paddingLeft:5}}>
    <View style={{width:8,backgroundColor:"black",height:8,marginRight:5,borderRadius:8,marginTop:7}} />
    <Text style={{color:"#6F7174",fontSize:14,fontFamily:FONTFAMILY.Baloo.normal,textAlign:"left"}}>
        <Text style={{fontFamily:FONTFAMILY.Baloo.bold,marginLeft:0}}>Stay informed </Text>
        with real-time updates.</Text>
    </View>
    <View style={{flexDirection:"row",alignItems:"flex-start",justifyContent:"flex-start",flexWrap:"wrap",paddingLeft:5}}>
    <View style={{width:8,backgroundColor:"black",height:8,marginRight:5,borderRadius:8,marginTop:7}} />
    <Text style={{color:"#6F7174",fontSize:14,fontFamily:FONTFAMILY.Baloo.normal,textAlign:"left"}}><Text style={{fontFamily:FONTFAMILY.Baloo.bold}}>Get important</Text> reminders and notifications instantly.</Text>
    </View>
    <Text style={{color:"#6F7174",fontSize:14,fontFamily:FONTFAMILY.Baloo.normal,textAlign:"left"}}>You can manage your preferences at any time.</Text>
   <View 
   style={{flexDirection:"row",gap:10}}
   >
   <View style={{flex:1}}>
    <BaseButton 
    type='gray'
   onPress={prop.onClose}
   title="No now"
   />
   </View>
   <View style={{flex:1}}>
   <BaseButton 
   onPress={()=>{
    GetPermission().then((res)=>{
        // alert(JSON.stringify(res));
        if(res !== null){
         prop.onDone()   
        }
    })
   }}
   title="Allow"
   />
   </View>
   </View>
   </CardView>
    </View>
    </Modal>)
}

export default PushNotificationPermission;
const CardView = styled.View`
background-color:white;
border-radius:20px;
padding:16px;
flex-direction:column;
`;