import { ActivityIndicator, View,Text, Modal } from "react-native";
import AppStyles from "../../includes/styles";
import { COLOURS } from "../../includes/constants";
import Svg, { Rect, Path, Defs, Pattern, Use, Image } from "react-native-svg"
import Logo from "../svgs/logo";
import LottieView from 'lottie-react-native';
interface BaseLoaderProps {
    text?:string;
    modal?:boolean;
}
const BaseInnerLoader = (props:BaseLoaderProps)=>{
    return <View style={{flexDirection:"row",justifyContent:"flex-start", alignItems:"center"}}>
        <ActivityIndicator color={COLOURS.lightPurple}/>
        <Text style={{fontSize:12,marginHorizontal:5,color:COLOURS.black}}>{props.text}</Text>
    </View>
}

export default BaseInnerLoader;
interface BaseActivityLoaderProps {
message?:string;
modal?:boolean;

}
export const BaseModalLoader = (props:BaseActivityLoaderProps)=>{
    if(props.modal)
    {
    return <Modal 
    visible={true}
    transparent={true}
    >
 <View style={[AppStyles.modalContainer,{alignItems:"center",justifyContent:"center"}]} >
 <LottieView
      source={require('../../assets/json/qnova_loading_json.json')}
      style={{
        height:60,
        width:60
      }}
      loop={true}
      autoPlay={true}
    />
   <Text style={{color:COLOURS.white}}>{props.message}</Text>
 </View>
 </Modal>
    }
    return  <View style={[AppStyles.modalContainer,{alignItems:"center",justifyContent:"center",position:"absolute",top:0,width:"100%",height:"100%",left:0,zIndex:9999}]} >
     <LottieView
      source={require('../../assets/json/qnova_loading_json.json')}
      style={{
        height:60,
        width:60
      }}
      loop={true}
      autoPlay={true}
    />
    
    <Text style={{color:COLOURS.white}}>{props.message}</Text>
  </View>
}
