
import InterCom from "@intercom/intercom-react-native";
import { ChatIcon } from "../svgs/chatIcon";
import { TouchableOpacity } from "react-native";
import { COLOURS, LOCALSTORAGE, ROUTES } from "../../includes/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserDataModel } from "../../includes/types";
import { navigationRef } from "../../App";
export const ChatButton = ()=>{
return  <TouchableOpacity 
onPress={()=>{
  return navigationRef.current?.navigate(ROUTES.chatScreen)
AsyncStorage.getItem(LOCALSTORAGE.userData).then((u)=>{
          if(u)
          {
            const user = JSON.parse(u).user as UserDataModel;
            InterCom.loginUserWithUserAttributes({
            email:user.email!,
            name:user.firstName,
            phone:user.phone!
            });
            InterCom.present();
          }else{
            InterCom.loginUnidentifiedUser();
            InterCom.present();
          }
        })
}}
style={{position:"absolute",bottom:20,right:20,zIndex:999,width:60,justifyContent:"center",alignItems:"center",height:60,backgroundColor:COLOURS.purple,borderRadius:100}}
>
 <ChatIcon />
</TouchableOpacity>
}