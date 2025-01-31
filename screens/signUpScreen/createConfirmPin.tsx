import { DeviceEventEmitter, View } from "react-native";
import { COLOURS, LISTENERS } from "../../includes/constants";
import { CreatePINComponent } from "./createPINScreen";
import { FormProps } from "./businessDetails";
interface CreateNewPINComponentProp {
    onClose:()=>void;
    formData:FormProps;
    onValue:(d:string)=>void;
}
const CreateConfirmPINComponent = (prop:CreateNewPINComponentProp)=>{
  return <View style={{width:"100%",left:0,height:"100%",position:"absolute",zIndex:9999,backgroundColor:COLOURS.white}}>
<CreatePINComponent
count={6}
goBack={prop.onClose}
onValue={(d)=>{
    prop.onValue(d);
}}
status='pin'
title="Confirm your login PIN"
subTitle="Create your login PIN"
/>
</View>
}
export default CreateConfirmPINComponent;