import { ScrollView, Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { ScreenComponentType } from "../../includes/types";
import { COLOURS, DEVICE, FONTFAMILY, ROUTES, ValidateNigerianMobile, ValidateNigerianMobile2 } from "../../includes/constants";
import { useState } from "react";
import AppContainer from "../../components/appContainer";
import AppStyles from "../../includes/styles";
import BaseInput from "../../components/baseInput";
import { Formik, FormikValues } from 'formik';
import * as y  from 'yup';
import CaretDownIcon from "../../components/svgs/caretDown";
import BaseButton from "../../components/baseButton";
import { ReturnMobile } from "../../includes/functions";
import BaseInputMobile from "../../components/baseInputMobile";
import useHttp from "../../includes/http.hooks";
import { navigationRef } from "../../App";

import * as React from "react"
import Svg, { Path } from "react-native-svg"
import useShowToastMsg from "../../includes/useShowToastMsg";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CreatePINScreen = ({ }: ScreenComponentType) => {
    const [selected,setSelected] = useState<number | null>(null);
    const [pin,setPIN] = useState<string>("");
    const [success,setSuccess] = useState<boolean>(false);
    const [confirmPin,setComfirmPIN] = useState<string>("");
    const {error} = useShowToastMsg();
    const {CreateAccount,loading} = useHttp();
    if(selected === 1 || selected === 2)
    {
        return <CreatePINComponent 
        count={6}
        goBack={()=>setSelected(null)}
        status={selected === 1?"pin":"confirm"}
        onValue={(d)=>{
            if(selected === 1)
            {
                setPIN(d);
            }else[
                setComfirmPIN(d)
            ]
        }}
        />
    }
   if(success)
   {
return <AppContainer
showNavBar
goBack={()=>{
navigationRef.current?.goBack()
}}
disableScrol
>
<View style={{backgroundColor:"#F2F2F2",flexDirection:"column",paddingVertical:30,height:DEVICE.height,borderTopRightRadius:20,borderTopLeftRadius:20}}>
<View style={{flexDirection:"column"}}>
 <Text style={{alignSelf:"center",color:COLOURS.black,fontSize:20,fontFamily:FONTFAMILY.INTER.bold}}>Account created!</Text>
 <Text style={{alignSelf:"center",color:COLOURS.black,fontSize:12,marginTop:10,marginBottom:20,textAlign:"center",fontFamily:FONTFAMILY.INTER.bold,paddingHorizontal:50}}>Please insert your body copy here. </Text>
 <View style={{paddingHorizontal:20,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
 <BaseButton 
  onPress={()=>{
  navigationRef.current?.reset({
    index:0,
    routes:[
        {name:ROUTES.loginScreen}
    ]
  })
  }}
  title="Login"
       />
 </View>
 </View>
 </View>
 </AppContainer>
   }
   return <AppContainer
    showNavBar
    goBack={()=>{
        navigationRef.current?.goBack()
    }}
    disableScrol
    >
    <View style={{backgroundColor:"#F2F2F2",flexDirection:"column",paddingVertical:30,height:DEVICE.height,borderTopRightRadius:20,borderTopLeftRadius:20}}>
    <ScrollView >
    <View style={{flexDirection:"column"}}>
     <Text style={{alignSelf:"center",color:COLOURS.black,fontSize:20,fontFamily:FONTFAMILY.INTER.bold}}>Create your account</Text>
     <Text style={{alignSelf:"center",color:COLOURS.black,fontSize:12,marginTop:10,marginBottom:20,textAlign:"center",fontFamily:FONTFAMILY.INTER.bold,paddingHorizontal:50}}>Please insert your body copy here. </Text>
     <View style={{height:1,backgroundColor:COLOURS.gray100,marginVertical:20}} ></View>
    <View style={{paddingHorizontal:20,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
    <TouchableOpacity 
    onPress={()=>{
        setSelected(1)
    }}
    style={{flexDirection:"row",alignItems:"center",marginBottom:20}}
    >
        <PadlockIcon />
        <View style={{flex:1,flexDirection:"column",paddingHorizontal:10}}>
        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
        <Text style={{fontFamily:FONTFAMILY.INTER.normal,fontSize:14,fontWeight:"bold",color:COLOURS.black}}>Create your login PIN</Text>
          </View> 
         <Text  style={{fontFamily:FONTFAMILY.INTER.normal,fontSize:14}}>Please insert your body copy here. </Text>
        </View>
    </TouchableOpacity>
    <TouchableOpacity 
    onPress={()=>{
        if(pin !== "")
        {
        setSelected(2)
        }else{
            error("Please enter your PIN first.","top");
        }
    }}
    style={{flexDirection:"row",alignItems:"center",marginBottom:40}}
    >
        <SheildIcon />
        <View style={{flex:1,flexDirection:"column",paddingHorizontal:10}}>
        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
        <Text style={{fontFamily:FONTFAMILY.INTER.normal,fontSize:14,fontWeight:"bold",color:COLOURS.black}}>Confirm your login PIN</Text>
          </View> 
         <Text  style={{fontFamily:FONTFAMILY.INTER.normal,fontSize:14}}>Please insert your body copy here.</Text>
        </View>
    </TouchableOpacity>
       <BaseButton 
       loading={loading}
       onPress={()=>{
        CreateAccount({}).then((res)=>{
        setSuccess(true)
        });
       }}
       title="Continue"
       />
    </View>
     </View>
     </ScrollView>
     </View>
    </AppContainer>
}
export default CreatePINScreen;

const Style = StyleSheet.create({
    dot:{
        width:8,
        height:8,
        borderRadius:10,
        backgroundColor:COLOURS.gray64
    }
})

export const PadlockIcon = ()=> {
  return (
    <Svg
      width={16}
      height={20}
      viewBox="0 0 16 20"
      fill="none"
    >
      <Path d="M6.5 14a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" fill="#8B1D41" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.621 8.597l-.315-2.839a4.96 4.96 0 010-1.095l.022-.205a4.7 4.7 0 019.342 0l.023.205c.04.364.04.731 0 1.095l-.315 2.84.686.054c1.083.086 1.967.9 2.143 1.972a20.89 20.89 0 010 6.752 2.361 2.361 0 01-2.143 1.972l-1.496.12c-2.375.19-4.762.19-7.137 0l-1.497-.12a2.361 2.361 0 01-2.142-1.972 20.891 20.891 0 010-6.752 2.361 2.361 0 012.142-1.972l.687-.055zM7.625 1.8a3.2 3.2 0 013.555 2.825l.022.205c.028.253.028.51 0 .764l-.32 2.89a44.845 44.845 0 00-5.764 0l-.322-2.89a3.46 3.46 0 010-.764l.023-.205a3.2 3.2 0 012.806-2.825zm3.824 8.229a43.335 43.335 0 00-6.899 0l-1.496.12a.861.861 0 00-.782.719 19.39 19.39 0 000 6.266.861.861 0 00.782.72l1.496.12c2.296.183 4.603.183 6.899 0l1.496-.12a.861.861 0 00.781-.72 19.39 19.39 0 000-6.266.861.861 0 00-.781-.72l-1.496-.12z"
        fill="#8B1D41"
      />
    </Svg>
  )
}

export const SheildIcon = ()=> {
    return (
      <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.645 5.264a1.25 1.25 0 00-1.29 0l-.516.31a10.75 10.75 0 01-4.537 1.494l-.325.03a.25.25 0 00-.227.25V8.99a9.25 9.25 0 002.82 6.65l3.256 3.148a.25.25 0 00.348 0l3.255-3.147a9.25 9.25 0 002.821-6.65V7.346a.25.25 0 00-.227-.248l-.325-.031a10.75 10.75 0 01-4.537-1.493l-.516-.311zM10.58 3.979a2.75 2.75 0 012.838 0l.516.31a9.25 9.25 0 003.904 1.286l.325.03a1.75 1.75 0 011.586 1.742v1.644a10.75 10.75 0 01-3.278 7.73l-3.256 3.146a1.75 1.75 0 01-2.432 0L7.528 16.72A10.75 10.75 0 014.25 8.991V7.347a1.75 1.75 0 011.586-1.742l.325-.03a9.25 9.25 0 003.904-1.285l.516-.311z"
          fill="#8B1D41"
        />
      </Svg>
    )
}

export const CreatePINComponent = ({onValue,status,goBack,title,subTitle,count}:{onValue:(otp:string)=>void;status:"pin"|"confirm",goBack:()=>void;subTitle?:string;title?:string;count:number;})=>{
    const [kKeys,setKkeys] = useState<string[]>([])
    const handleKeyTap = (d:string)=>{
        var x = [d];
        if (d == 'x')
        {
            var tx = kKeys.map((a,i,self)=>{
                if (self.filter((k,o)=>k !== '').length - 1 == i)
                {
                    a = '';
                }
                return a;
            });
            setKkeys(tx);
        } else {
          var tx = kKeys.map((a,i,self)=>{
            const val = self.filter((k,o)=>k === '');
            if (self.length - val.length == i)
            {
                a = d;
            }
            return a;
        });
        setKkeys(tx);
        if(title)
        {
          const f = tx.filter((a,i)=>a !== "");
          if(f.length === count)
          {
          onValue(f.join(""));
          }
        }
        }

}
React.useEffect(()=>{
setKkeys(Array.from({length:count}).map((a,i)=>""))
},[count])
    return <AppContainer
    showNavBar
    goBack={goBack}
    disableScrol
    footer={<View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",width:"100%",padding:10}}>
    <TouchableOpacity 
    onPress={()=>{
      navigationRef.current?.navigate(ROUTES.forgotPassword)
    }}
    style={{flex:1,alignItems:"center",justifyContent:"center",padding:10}}
    >
      <Text style={[AppStyles.blackText,{color:COLOURS.purple,fontSize:14}]}>Forgot PIN?</Text>
    </TouchableOpacity>
    <TouchableOpacity
    onPress={()=>{
      AsyncStorage.clear();
      navigationRef.current?.reset({
        index:0,
        routes:[
          {name:ROUTES.introScreen}
        ]
      })
    }} 
    style={{flex:1,alignItems:"center",justifyContent:"center",padding:10}}
    >
      <Text style={[AppStyles.blackText,{color:COLOURS.purple,fontSize:14}]}>Logout</Text>
    </TouchableOpacity>
    </View>}
    >
    <View style={{backgroundColor:"#F2F2F2",flexDirection:"column",paddingVertical:30,height:DEVICE.height,borderTopRightRadius:20,borderTopLeftRadius:20}}>
    <View style={{flexDirection:"column"}}>
    {status === "confirm"?<Text style={{alignSelf:"center",color:COLOURS.black,fontSize:20,fontFamily:FONTFAMILY.INTER.bold}}>Confirm your login PIN</Text>
    :<Text style={{alignSelf:"center",color:COLOURS.black,fontSize:20,fontFamily:FONTFAMILY.INTER.medium}}>{title?title:"Create your login PIN"}</Text>}
     <Text style={{alignSelf:"center",color:"#7B7F99",fontSize:12,marginTop:10,marginBottom:20,textAlign:"center",fontFamily:FONTFAMILY.INTER.normal,paddingHorizontal:50}}>{subTitle?subTitle:"Please insert your body copy here."}</Text>
     <View style={{height:1,backgroundColor:COLOURS.gray100,marginVertical:20}} ></View>
    <View style={{paddingHorizontal:20,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
    <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",marginVertical:10,gap:10}}>
    {kKeys.map((a,i)=>{
     return <View key={i} style={{width:40,height:40,justifyContent:"center",alignItems:"center"}} >
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        {a !== "" &&<View style={{width:8,height:8,borderRadius:8,backgroundColor:COLOURS.purple}} />}
        </View>
        <View style={{height:5,backgroundColor:COLOURS.gray100,width:"70%"}} />
     </View>
    })}
    </View>
    <View 
    style={{flexDirection:"row",flexWrap:"wrap",justifyContent:"center",alignItems:"center"}}
    >
    {[
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "",
        "0",
        "x",
    ].map((a,i)=>{
     if(a === "")
    {
     return <View 
         style={{height:90,width:(DEVICE.width /3) - 30,justifyContent:"center",alignItems:"center"}}
        />
    }
     return <TouchableOpacity 
     disabled={kKeys.filter((a,i)=>a !== "").length == count && a !== "x"}
     onPress={()=>handleKeyTap(a)}
     style={{height:90,width:(DEVICE.width /3) - 30,justifyContent:"center",alignItems:"center"}}>
     {a === "x"?<XIcon />:<Text style={{fontSize:24,fontWeight:"bold",fontFamily:FONTFAMILY.INTER.medium}}>{a}</Text>}
     </TouchableOpacity>   
    })}
    </View>
    {!title?<BaseButton
    disabled={kKeys.filter((a,i)=>a !== "").length !== count}
    onPress={()=>{
       onValue(kKeys.join(""));
       goBack();
    }}
    title="Continue"
    />:null}
    </View>
     </View>
    
     </View>
    </AppContainer>
}
  
const XIcon = ()=> {
    return (
      <Svg
        width={37}
        height={37}
        viewBox="0 0 37 37"
        fill="none"
      >
        <Path
          d="M16.372 13.455c.439-.44 1.151-.44 1.59 0l3.705 3.704 3.704-3.704a1.125 1.125 0 111.591 1.59l-3.704 3.705 3.704 3.705a1.125 1.125 0 01-1.59 1.59l-3.705-3.704-3.705 3.705a1.125 1.125 0 01-1.59-1.591l3.704-3.705-3.704-3.704a1.125 1.125 0 010-1.591z"
          fill="#000"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.276 8.175a5.625 5.625 0 00-4.424 2.151L3.51 17.13a2.625 2.625 0 000 3.242l5.342 6.803a5.625 5.625 0 004.424 2.151h15.97A4.125 4.125 0 0033.37 25.2V12.3a4.125 4.125 0 00-4.125-4.125h-15.97zm-2.655 3.54a3.375 3.375 0 012.655-1.29h15.97c1.036 0 1.875.84 1.875 1.875v12.9c0 1.036-.84 1.875-1.875 1.875h-15.97a3.375 3.375 0 01-2.655-1.29L5.28 18.982a.375.375 0 010-.463l5.342-6.803z"
          fill="#000"
        />
      </Svg>
    )
  }