
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View} from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { ScreenComponentType } from '../../includes/types';
import AppContainer from '../../components/appContainer';
import { navigationRef } from '../../App';
import { COLOURS, DEVICE, FONTFAMILY, ROUTES } from '../../includes/constants';
import Svg, { Path } from "react-native-svg";

import useHttp from '../../includes/http.hooks';
import styled from 'styled-components/native';
import BaseCheckBox from '../../components/baseCheckBox';
import BaseSelect from '../../components/baseSelect';
import Card from '../../components/card';
import ArrowRight from '../../components/svgs/arrowRight';
import ArrowUpIcon from '../../components/svgs/arrowUp';
import BaseSwitch from '../../components/baseSwitch';
import useBiometricHook from '../../includes/useBiometricHook';
const SettingsScreen = ({route,Reducer}:ScreenComponentType) => {
  const [toggleValue,setToggleValue] = useState<boolean>(false)
  const [loading,setLoading] = useState<boolean>(false);
   const {UserLogin} = useHttp();
   const {SetUp} = useBiometricHook();

   useEffect(()=>{
   },[])
   const dispath = useDispatch();
   const HandleModeSwitch = (type:"light" | "dark" | "system")=>{
    dispath({type:"update",payload:{theme:type}})
   }
   const HandleLanguage = (type:string)=>{
    // dispath({type:"update",payload:{mode:type}})
   }
    return <AppContainer
    showNavBar
    goBack={()=>{
        navigationRef.current?.goBack();
    }}
    disableScrol
    title="Settings"
    white
    >
    <View style={{backgroundColor:"#F2F2F2",flexDirection:"column",padding:24,height:DEVICE.height,borderTopRightRadius:20,borderTopLeftRadius:20}}>
    <ScrollView
    nestedScrollEnabled
    showsVerticalScrollIndicator={false}
    >
    <View style={{flexDirection:"column",gap:30}}>
    <TitleText style={{}}>Appearance</TitleText>
    <View 
    style={{flexDirection:"row",alignItems:"center"}}
    >
      <BaseCheckBox
      onValueChange={(value)=>{
        HandleModeSwitch("system");
      }}
      value={Reducer?.theme === "system"}
      />
      <View  style={{flex:1,paddingHorizontal:10}}>
        <NormalText >System</NormalText>
      </View>
    </View>
    <View 
    style={{flexDirection:"row",alignItems:"center"}}
    >
      <BaseCheckBox
      onValueChange={(value)=>{
        HandleModeSwitch("light");
      }}
      value={Reducer?.theme === "light"}
      />
      <View  style={{flex:1,paddingHorizontal:10}}>
        <NormalText >Light Mode</NormalText>
      </View>
    </View>
    <View 
    style={{flexDirection:"row",alignItems:"center"}}
    >
      <BaseCheckBox
      onValueChange={(value)=>{
        HandleModeSwitch("dark");
      }}
      value={Reducer?.theme === "dark"}
      />
      <View  style={{flex:1,paddingHorizontal:10}}>
        <NormalText >Dark Mode</NormalText>
      </View>
    </View>
    {/* <Text style={{fontFamily:FONTFAMILY.INTER.normal,fontSize:14}}>Show Kobo</Text> */}
    <TitleText style={{}}>Language</TitleText>
    <View 
      style={{height:50}}
      >
    <BaseSelect 
    label='Select Language'
    placeholder='Select Language'
    list={[
      {title:"UK English",value:"uk-En"},
      {title:"French",value:"fr"},
      {title:"Deutch",value:"de"},
      {title:"US English",value:"us-En"}
    ]}
    onChange={(d)=>{
      HandleLanguage(String(d?.value))
    }}
    value={Reducer?.language}
    type='custom'
    />
    </View>
    <TitleText style={{}}>Notifications</TitleText>
    <Card  
     style={{height:50,borderRadius:10,marginTop:-10,padding:0}}
    >
    <TouchableOpacity 
    onPress={()=>navigationRef.current?.navigate(ROUTES.notificationSettingsScreen)}
    >
    <View 
      style={{height:50,flexDirection:"row",alignItems:"center"}}
      >
        <View style={{flex:1,paddingHorizontal:16}}>
          <NormalText style={{fontFamily:FONTFAMILY.INTER.semiBold}}>Notifications</NormalText>
        </View>
        <View style={{paddingHorizontal:16}}>
        <NextArrow />
        </View>
     </View>
     </TouchableOpacity>
    </Card>
    <TitleText style={{}}>Security</TitleText>
    <View 
      style={{height:40,flexDirection:"row",alignItems:"center",marginTop:-10}}
      >
        <View style={{flex:1,flexDirection:"column"}}>
        <NormalText >Enable {Reducer?.biometric?Reducer?.biometric:"Biometrics"}</NormalText>
        {Reducer?.biometric == null &&<NormalText style={{color:COLOURS.gray64,fontSize:12}} >Sensor not available! </NormalText>}
        </View>
        <View >
        <BaseSwitch
        disabled={Reducer?.biometric !== null}
        onValueChange={(d)=>{
        setToggleValue(d);
        if(d)
        {
          SetUp(`Setup your ${Reducer?.biometric}`).then((res)=>{
            if(res)
            {

            }
          });
        }
        }}
        value={toggleValue}
        />
        </View>
    </View>
    </View>
    </ScrollView>
    </View>
    </AppContainer>
}
const MapStateToProps = (state: any) => {
    return state;
  };
  export default connect(MapStateToProps)(SettingsScreen);

export const TitleText = styled.Text`
color:${COLOURS.purple};
font-family:${FONTFAMILY.INTER.bold};
font-size:14px;
`;
export const NormalText = styled.Text`
color:${COLOURS.black};
font-family:${FONTFAMILY.INTER.normal};
font-size:14px;
`;
export const NextArrow = ()=>{
  return <Svg
      width={9}
      height={16}
      viewBox="0 0 9 16"
      fill="none"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M.455 1.205c.439-.44 1.151-.44 1.59 0l6 6c.44.439.44 1.151 0 1.59l-6 6a1.125 1.125 0 01-1.59-1.59L5.659 8 .455 2.796a1.125 1.125 0 010-1.591z"
        fill="#000"
      />
    </Svg>
}
  