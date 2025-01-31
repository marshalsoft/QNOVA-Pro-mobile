import { Image, Text, StyleSheet, View } from "react-native";
import { ScreenComponentType } from "../../../includes/types";
import { COLOURS, DEVICE, FONTFAMILY, LOCALSTORAGE, ROUTES } from "../../../includes/constants";
import Logo from "../../../components/svgs/logo";
import Carousel from 'react-native-reanimated-carousel';
import { useEffect, useState } from "react";
import BaseButton from "../../../components/baseButton";
import Splash from "react-native-splash-screen";
import { navigationRef } from "../../../App";
import WelcomeBackScreen from "../../loginScreen/welcomeBackScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from "../../loginScreen";
import { NavigateReplace } from "../../../includes/useNavigation";
interface SlideItemProp {
    title: string;
    img: number;
    description: string;
}
const OpamProtectIntroScreen = ({ }: ScreenComponentType) => {
 const list: SlideItemProp[] = [
{title:"Distress \"Fake\" Pin",img:require("../../../images/opamProtect/s1.png"),description:"Activate a secondary pin that accesses a secure wallet with limited funds, protecting you during forced transactions."},
{title:"Personalized Distress Dashboard",img:require("../../../images/opamProtect/s2.png"),description:"You gain access to a dedicated dashboard separate from your regular account interface"},
{title:"Incognito Transfers",img:require("../../../images/opamProtect/s3.png"),description:" Send money anonymously while ensuring full compliance with all regulatory standards."}
    ];
const [switchScreen,setSwitchScreen] = useState<"welcome"|"get-started" | null>(null);
    const [selectedItem,setSelectedItem] = useState<SlideItemProp>(list[0])
    return <View
        style={{ flex: 1, ...DEVICE }}
        onLayout={()=>{
            Splash.hide();
        }}
    >
        <View 
        style={{position: 'absolute', top: 0, left: 0,width:DEVICE.width,height:DEVICE.height}}
        >
        <Image
            style={{ width:DEVICE.width,height:DEVICE.height}}
            source={require("../../../images/bck.png")}
            resizeMode="cover"
        />
        </View>
        <View style={{ flex: 1,marginTop:60,justifyContent:"center",alignItems:"center" }}>
            <Carousel
            style={{
                borderRadius:12,
                overflow:"hidden"
            }}
                loop
                width={DEVICE.width - 40}
                height={DEVICE.height - 385}
                autoPlay={true}
                data={list}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => setSelectedItem(list[index])}
                
                renderItem={({item, index }) => (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            borderRadius:12,
                            overflow:"hidden"
                        }}
                    >
            <Image
            style={{width:"100%",height:"100%"}}
            source={item.img}
            resizeMode="contain"
        />
       </View>
                )}
            />
          
        </View>
        <View style={{ padding: 10,paddingHorizontal:20,paddingBottom:40,flexDirection:"column",height:230,alignItems:"center" }}>
        <View 
        style={{flexDirection:"row",gap:5,justifyContent:"center",alignItems:"center"}}
        >
        {list.map((a,i)=><View style={[Style.dot,{backgroundColor:a.title === selectedItem.title?COLOURS.orange:COLOURS.gray64}]} key={i} ></View>)}
        </View>
        <View 
        style={{flexDirection:"column",flex:1,gap:5,justifyContent:"center",alignItems:"center"}}
        >
        <Text style={{color:COLOURS.white,fontFamily:FONTFAMILY.INTER.semiBold,fontSize:24,marginTop:5,textAlign:"center"}}>{selectedItem.title}</Text>
        <Text style={{color:COLOURS.white,fontFamily:FONTFAMILY.INTER.normal,fontSize:14,marginBottom:15,textAlign:"center"}}>{selectedItem.description}</Text>
        </View>
        <BaseButton
        title="Continue"
        onPress={()=>{
          NavigateReplace(ROUTES.opamProtectGetStartedScreen,{})  
        }}
        />
        </View>
    </View>
    
}
export default OpamProtectIntroScreen;

const Style = StyleSheet.create({
    dot:{
        width:8,
        height:8,
        borderRadius:10,
        backgroundColor:COLOURS.gray64
    }
})