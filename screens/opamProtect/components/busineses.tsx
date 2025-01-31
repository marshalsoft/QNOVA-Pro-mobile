import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { useState } from "react";
import { DEVICE, FONTFAMILY } from "../../../includes/constants";
import Dot from "./dot";
import { ArrowDown } from "../../dashboard/home/components/operationalMetrix";
interface BusinessesProps {
  dotColor?:string;
}
const Businesses = (props:BusinessesProps)=>{
    const [listOfUsers,setListOfUsers] = useState<string[]>([
        "",
        ""
      ])
return  <View style={{flexDirection:"column",justifyContent:"center",alignItems:"center",marginTop:0,height:52}}>
    <LinearGradient 
    colors={['rgba(255, 255, 255, 0.25)', 'rgba(255, 255, 255, 0)']} style={{
     width:231,
     height:52,
     borderRadius:50,
     borderColor:"rgba(255, 255, 255, 0.25)",
     borderWidth:1,
     justifyContent:"center",
     alignItems:"center",
     flexDirection:"row",
     paddingHorizontal:16,
     paddingVertical:8
    }}
    >
 <View style={{flexDirection:"row",position:"relative",marginTop:32,height:82,width:"100%"}}>
 <View style={{width:64,height:82,alignItems:"center",justifyContent:"center",paddingTop:5}}>
   {listOfUsers.map((a,i)=><View style={[Styles.avatar,{left: i * 20}]} key={i} ></View>)}
 </View>
 <View style={{flex:1,flexDirection:"column",width:"80%"}}>
   <Text style={{color:"#FFF",marginTop:4,fontSize:12,fontFamily:FONTFAMILY.Baloo.normal}}>Mosope & Sons Ltd.</Text>
   <Text style={{color:"rgba(255, 255, 255, 0.5)",paddingLeft:30,fontSize:12,fontFamily:FONTFAMILY.Baloo.normal}}>Admin</Text>
 </View>
 <TouchableOpacity style={{position:"absolute",right:0,top:22,flexDirection:"row",alignItems:"center",gap:5}}>
 <ArrowDown />
 <Dot color={props.dotColor} />
 </TouchableOpacity>
 </View>
     </LinearGradient>
    </View>
}
export default Businesses;
const Styles = StyleSheet.create({
    avatar:{
      backgroundColor: "rgba(217, 217, 217, 1)",
      borderRadius:36,
      width:36,
      height:36,
      borderColor:"rgba(80, 80, 80, 1)",
      borderWidth:1,
      position:"absolute",
      top:6
    },
    card:{
      flexDirection:"column",
      width:DEVICE.width - 50,
      height:242,
    }
   })