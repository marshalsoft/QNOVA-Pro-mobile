import React,{} from "react"
 
import Svg, { Rect, Path } from "react-native-svg"
import { ScrollView, Text, StyleSheet, View, TouchableOpacity, Image, TextInput, DeviceEventEmitter, BackHandler } from "react-native";
import { COLOURS, DEVICE, FONTFAMILY, ROUTES, ValidateNigerianMobile, ValidateNigerianMobile2 } from "../../../includes/constants";
import { RefObject, useEffect, useRef, useState } from "react";
import * as y  from 'yup';
import styled from "styled-components/native";
import { connect, useDispatch } from "react-redux";
import AppContainer from "../../../components/appContainer";
import { ScreenComponentType } from "../../../includes/types";
import { navigationRef } from "../../../App";
import BaseInput from "../../../components/baseInput";
import { Formik, FormikValues } from "formik";
import BaseInputMobile from "../../../components/baseInputMobile";
import BaseButton from "../../../components/baseButton";
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Card from "../../../components/card";
import PINScreen from "../components/pin";
import useHttp, { OpamProtectAddEmergencyContactProps } from "../../../includes/http.hooks";
import { BaseModalLoader } from "../../../components/baseLoader";
import BaseSelect from "../../../components/baseSelect";
import { NavigatePop } from "../../../includes/useNavigation";
import SafeWordScreen from "../components/safeWord";
const FormSchema = y.object({
    name:y.string().required('Fullname is required.'),
    relationShip:y.string().required('Relationship is required.'),
    phoneNumber:y.string().required('PhoneNumber is required.'),
    email:y.string().required('Email address is required.').email("A valid email is required."),
  });
interface listOfChannelsProps {
title:string;
selected:boolean;
}
const NextOfKinScreen = ({route,goBack,Reducer,onSuccess}: ScreenComponentType) => {
  const {ShowMessage,loading,OpamProtectAddEmergencyContact,OpamProtectGetUser,OpamProtectUpdateEmergencyContact} = useHttp();
  const listOfTitle:string[] = [
    "Distress Contact Info.",
    "Emergency - Preferred Contact Method",
    "Distress Contact Preference",
    "Create Safe word",
  ]
  const listOfSubTitle:string[] = [
    "Safeguarding Your Account: Give us important details for emergency",
    "Safeguarding Your Account: Give us important details for emergency",
    "Choose a preference that serves you best",
    "Choose a safe word to use in time of distress"
  ]
  const [dailCode,setDailCode] = useState<string>("");
    const thisViewContainer = useRef() as RefObject<View>
  const [saveData,setSaveData] = useState<OpamProtectAddEmergencyContactProps>({
    email:"",
    full_name:"",
    phone_number:"",
    preferred_contact_method:"SMS",
    relationship:""
  });
  const [switchPIN,setSwitchPIN] = useState<boolean>(false);
  const [selectedTab,setSelectedTab] = useState<number>(0);
  const position = useSharedValue(0);
  const animateWidth = useSharedValue(0);
  const handleNext = ()=>{
    HandleAnimation(2)
  }
  const HandleAnimation = (index:number)=>{
    setSelectedTab(index)
    position.value = withTiming(-(DEVICE.width * index),{duration:100})
    animateWidth.value = withTiming(((index + 1) * (100/4)),{duration:100})
  } 
  useEffect(()=>{
    HandleAnimation(2)
  },[])
  useEffect(()=>{
    if(route?.params?.goto)
    {
    return HandleAnimation(parseInt(route?.params?.goto))
    }
    if(route?.params?.goto === "emergency")
      {
      HandleAnimation(2)
      OpamProtectGetUser().then((res)=>{
        if(res.data.emergency_contacts.length === 0)
          {
           HandleAnimation(0);
           delete route.params.goto;
          }
        })
      }
  },[route?.params?.goto])
  const dispatch = useDispatch();
  const AnimStyle = useAnimatedStyle(()=>{
    return {
    left:position.value,
    position:"absolute",
    top:0
    }
  })
  const [listOfChannels,setListOfChannel] = useState<listOfChannelsProps[]>([
    {title:"Phone Call",selected:true},
    {title:"Whatsapp",selected:false}
  ])
  const [listOfPreference,setListOfPreference] = useState<listOfChannelsProps[]>([
    {title:"Contact bank to freeze account",selected:true},
    {title:"Contact Emergency Contact",selected:false},
    {title:"Send live location to relevant authorities.",selected:false}
  ])
  const AnimatedProgress =  useAnimatedStyle(()=>{
    return {
        height:2,
        backgroundColor:"#8B1D41",
        width:`${animateWidth.value}%`
    }
})
const HandleUpdateEmergencyPreference = ()=>{
  const preferred = listOfPreference.filter((a,i)=>a.selected).map((a,i)=>a.title).join(", ")
  OpamProtectGetUser().then((res)=>{
  OpamProtectUpdateEmergencyContact({
    preferred_contact_method:"SMS",
    contact_id:res.data.id
  }).then((res)=>{
    if(res.status)
    {
    dispatch({type:"update",payload:{
      creationOfDistressPin:true,
      creationOfNextOfKin:true,
      creationOfEmergencyPreference:true
    }})
    navigationRef.current?.goBack()
  }
  })
})
}

const HandleSubmitForm = ()=>{
  const preferred = listOfPreference.filter((a,i)=>a.selected).map((a,i)=>a.title).join(", ")
  if(route?.params?.goto)
    {
      HandleUpdateEmergencyPreference()
    }else{
  OpamProtectAddEmergencyContact({
    email:String(saveData.email).trim(),
    full_name:saveData.full_name,
    phone_number:String(saveData.phone_number).trim(),
    relationship:saveData.relationship,
    preferred_contact_method:"SMS"
  }).then((res)=>{
    if(res.status)
    {
      dispatch({type:"update",payload:{
      creationOfDistressPin:true,
      creationOfNextOfKin:true,
      creationOfEmergencyPreference:true
    }})
    HandleAnimation(3)
    }
  })
}
}

 return <AppContainer
    showNavBar
    white
    goBack={()=>{
      if(route?.params?.emergency || route?.params?.goto)
      {
        return navigationRef.current?.goBack()
      }
      
        if(switchPIN)
        {
            return setSwitchPIN(false);
        }
        if(selectedTab !== 0)
        {
            HandleAnimation(selectedTab - 1)
        }else{
        navigationRef.current?.goBack()
        }
    }}
    >
<View style={{backgroundColor:"#F2F2F2",flexDirection:"column",paddingVertical:24,height:DEVICE.height,borderTopRightRadius:20,borderTopLeftRadius:20,gap:8}}>
<View >
<View style={{paddingHorizontal:24,flexDirection:"column"}} >
<TitleText  >{listOfTitle[selectedTab]}</TitleText>
<SubTitleText>{listOfSubTitle[selectedTab]}</SubTitleText>
</View>
{!route?.params?.goto?<View style={{marginVertical:15,backgroundColor:"#7B7F991A"}}>
    <Animated.View style={AnimatedProgress} />
</View>:<View style={{height:20}} />}
<View style={{width:DEVICE.width,height:DEVICE.height - 150}}>
<Animated.View 
ref={thisViewContainer}
style={{height:DEVICE.height - 150,...AnimStyle}}>
<View style={{flexDirection:"row",height:DEVICE.height - 150}} >
<View style={{width:DEVICE.width}}>
<Formik
initialValues={{
  name:"",
  relationShip:"",
  phoneNumber:"",
  email:""
}}
onSubmit={(values:FormikValues, actions:any) => {
  if(!ValidateNigerianMobile.test("0"+values.phoneNumber))
    {
    return ShowMessage("top").fail("A valid phone number is require.")
    }
  setSaveData({
    full_name:values.name,
    relationship:values.relationShip,
    phone_number:"+"+dailCode+values.phoneNumber,
    email:values.email,
    preferred_contact_method:"SMS"
  });
 
  if(route?.params?.goto)
  {
    HandleAnimation(1)
  }
  
}}
validationSchema={FormSchema}
>
{({values,handleChange,setFieldValue,handleSubmit,errors,isValid,touched})=>(<View style={{flexDirection:"column",alignItems:"center",paddingHorizontal:24}}>
  <View style={{width:"100%"}}>
<BaseInput 
 max={30}
 placeholder="Enter full name"
 type="default"
 value={values.name}
 onChange={(d)=>{
    setFieldValue("name",d)
     }}
 errorMessage={touched.name && errors.name}
 label="Full Name"
 />
 </View>
 <View style={{width:"100%"}}>
 <BaseInput
 placeholder="e.g brother"
 max={50}
 value={values.relationShip}
 onChange={(d)=>{
    setFieldValue("relationShip",d)
     }}
 errorMessage={touched.relationShip && errors.relationShip}
 label="Nature of Relationships"
 />
 </View>
 <View style={{width:"100%"}}>
 <BaseInputMobile 
 value={values.phoneNumber}
 onCode={(code)=>{
  setDailCode(code)
 }}
 placeholder="08000000000"
 onValueChange={(d)=>{
  setFieldValue("phoneNumber",d)
 }}
 errorMessage={touched.phoneNumber && errors.phoneNumber}
 label="Phone Number"
 />
 </View>
 <View style={{width:"100%"}}>
 <BaseInput 
 max={100}
 placeholder="Enter email address"
 type="email-address"
 value={values.email}
 onChange={(d)=>{
  setFieldValue("email",d)
 }}
 errorMessage={touched.email && errors.email}
 label="Email"
 />
 </View>
 <BaseButton 
 onPress={handleSubmit}
 title="Continue"
 />
 </View>)}
</Formik>
</View>
<View style={{width:DEVICE.width,minHeight:500,paddingHorizontal:24,gap:20}}>
<View 
    >
    <Card style={{borderRadius:10,flexDirection:"row",alignItems:"center"}}>
            <View style={{flex:1}}>
        <Text style={{color:COLOURS.gray64}}>{"SMS"}</Text>
        </View>
        <GreenCheckIcon />
    </Card>
    </View>
    {listOfChannels.map((a,i)=><TouchableOpacity 
    onPress={()=>{
        setListOfChannel(listOfChannels.map((item,o)=>{
            item.selected  = i == o?!item.selected:false;
            return item
        }))
    }}
    key={i}>
    <Card style={{borderRadius:10,flexDirection:"row",alignItems:"center"}}>
            <View style={{flex:1}}>
        <Text style={{color:COLOURS.black}}>{a.title}</Text>
        </View>
        {a.selected ?<GreenCheckIcon />:<UnCheckedIcon />}
    </Card>
    </TouchableOpacity>)}
    <BaseButton 
    onPress={handleNext}
    title="Continue"
    />
</View>
<View style={{width:DEVICE.width,minHeight:500,paddingHorizontal:24,gap:20}}>
    {listOfPreference.map((a,i)=><TouchableOpacity 
    onPress={()=>{
        setListOfPreference(listOfPreference.map((item,o)=>{
            if(o === i)
            {
                item.selected = true
            }else{
                item.selected = false 
            }
            return item
        }))
    }}
    key={i}>
    <Card style={{borderRadius:10,flexDirection:"row",alignItems:"center"}}>
            <View style={{flex:1}}>
        <Text >{a.title}</Text>
        </View>
        {a.selected ?<GreenCheckIcon />:<UnCheckedIcon />}
    </Card>
    </TouchableOpacity>)}
    <BaseButton 
    onPress={()=>{
     HandleSubmitForm()
    }}
    title="Continue"
    />
</View>
<View style={{width:DEVICE.width}}>
  <SafeWordScreen 
  goBack={()=>{}}
  onValue={()=>{

  }}
  />
</View>
</View>
</Animated.View>
</View>
</View>
</View>
{loading && <BaseModalLoader modal />}
</AppContainer>
}
const MapStateToProps = (state: any) => {
  return state;
};
export default connect(MapStateToProps)(NextOfKinScreen);

const SearchContainer = styled.View`
height: 56px;
align-items: center;
flex: 1 0 0;
border-radius: 12px;
background: #FFF;`

export const TitleText = styled.Text`
color: ${COLOURS.black};
text-align: center;
font-family: ${FONTFAMILY.INTER.bold};
font-size: 20px;
font-weight: 600;
`;
export const SubTitleText = styled.Text`
color: #7B7F99;
text-align: center;
font-family: ${FONTFAMILY.INTER.normal};
font-size: 14px;
font-weight: 500;
`;
export const ItemView = styled.TouchableOpacity`
border-radius: 12px;
background: #FFF;
display: flex;
height: 72px;
padding: 16px 12px;
justify-content: space-between;
align-items: center;
flex-direction:row;
`;


export const GreenCheckIcon =() =>{
  return (<View
    style={{width:20,height:20,backgroundColor:COLOURS.green,borderRadius:2,alignItems:"center",justifyContent:"center"}}
      >
      <TickIcon />
      </View>
  )
}

export const UnCheckedIcon =()=> {
    return (<View
    style={{width:20,height:20,borderColor:COLOURS.gray64,borderRadius:2,borderWidth:1}}
      ></View>
    )
  }
  
  const TickIcon =()=> {
    return (
      <Svg
        width="20px"
        height="20px"
        viewBox="0 0 24 24"
        >
        <Path
          d="M7 12l2.89 2.89v0c.061.061.159.061.22 0v0L17 8"
          stroke="#ffffff"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    )
  }
  
  
