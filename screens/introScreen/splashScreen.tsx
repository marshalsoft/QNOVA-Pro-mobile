import { Image, Text, StyleSheet, View } from "react-native";
import { ScreenComponentType } from "../../includes/types";
import { COLOURS, DEVICE, FONTFAMILY, LOCALSTORAGE, ROUTES } from "../../includes/constants";
import Logo from "../../components/svgs/logo";
import Carousel from 'react-native-reanimated-carousel';
import { useEffect, useState } from "react";
import BaseButton from "../../components/baseButton";
import Splash from "react-native-splash-screen";
import { navigationRef } from "../../App";
import WelcomeBackScreen from "../loginScreen/welcomeBackScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from "../loginScreen";
interface SlideItemProp {
    title: string;
    img: number;
    description: string;
}
const SplashScreen = ({ }: ScreenComponentType) => {
    const list: SlideItemProp[] = [
{title:"Quick, Easy, Secure",img:require("../../images/slide1.png"),description:"Please insert your body copy here. "},
{title:"Banking made Easy",img:require("../../images/slide2.png"),description:"Please insert your body copy here. "},
{title:"Where Finance meets Ease",img:require("../../images/slide3.png"),description:"Please insert your body copy here. "}
    ];
const [switchScreen,setSwitchScreen] = useState<"welcome"|"get-started" | null>(null);
    const [selectedItem,setSelectedItem] = useState<SlideItemProp>(list[0])
    useEffect(()=>{
        // AsyncStorage.clear();
        // check if user has first time login
        AsyncStorage.getItem(LOCALSTORAGE.welcome).then((res)=>{
          if(res)
          {
            setSwitchScreen("welcome");
          }else{
            setSwitchScreen("get-started");
          }
        })
    },[])
    if(switchScreen === "welcome")
    {
    return <LoginScreen />
    }
    if(switchScreen === "get-started")
        {
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
            source={require("../../images/bck.png")}
            resizeMode="cover"
        />
        </View>
        <View style={{ padding: 10, marginTop: 10, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        <Logo size={50} withText />
        </View>
        <View style={{ flex: 1,justifyContent:"center",alignItems:"center" }}>
            <Carousel
            style={{
                borderRadius:12,
                overflow:"hidden"
            }}
                loop
                width={DEVICE.width - 40}
                height={DEVICE.height - 335}
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
            resizeMode="cover"
        />
       </View>
                )}
            />
          
        </View>
        <View style={{ padding: 10,paddingHorizontal:20,paddingBottom:40,flexDirection:"column",alignItems:"center" }}>
        <View 
        style={{flexDirection:"row",gap:5,justifyContent:"center",alignItems:"center"}}
        >
            {list.map((a,i)=><View style={[Style.dot,{backgroundColor:a.title === selectedItem.title?COLOURS.orange:COLOURS.gray64}]} key={i} ></View>)}
        </View>
        <Text style={{color:COLOURS.white,fontFamily:FONTFAMILY.INTER.semiBold,fontSize:24,marginTop:5}}>{selectedItem.title}</Text>
        <Text style={{color:COLOURS.white,fontFamily:FONTFAMILY.INTER.normal,fontSize:14,marginBottom:15}}>{selectedItem.description}</Text>
        <BaseButton
        title="Get Started"
        onPress={()=>{
            AsyncStorage.setItem(LOCALSTORAGE.welcome,"x");
            navigationRef.current?.reset({
            index:0,
            routes:[
                {name:ROUTES.verificationScreen}
            ]
        })
    }}
        />
        </View>
    </View>
        }
    return <View ></View>
}
export default SplashScreen;

const Style = StyleSheet.create({
    dot:{
        width:8,
        height:8,
        borderRadius:10,
        backgroundColor:COLOURS.gray64
    }
})