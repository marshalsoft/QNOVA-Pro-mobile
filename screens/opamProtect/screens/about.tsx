import React, { } from "react"
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { COLOURS, DEVICE, FONTFAMILY, ROUTES, ValidateNigerianMobile, ValidateNigerianMobile2 } from "../../../includes/constants";
import { useState } from "react";
import Svg, { Path } from "react-native-svg"
import { connect } from "react-redux";
import AppContainer from "../../../components/appContainer";
import { ItemProps, ScreenComponentType } from "../../../includes/types";
import { navigationRef } from "../../../App";
import useHttp from "../../../includes/http.hooks";
import AppStyles from "../../../includes/styles";
import { TitleText } from "../../settings";
import { HorizontaLine } from "../../dashboard/home/components/horiontalline";

interface listFQAProps {
  title: string;
  selected?: boolean;
}

const OpamProtectDistressLogsScreen = ({ route, goBack, Reducer, onSuccess }: ScreenComponentType) => {
  const [list,setList] = useState<listFQAProps[]>([
    {title:"What is OPAM Protect?",selected:false},
    {title:"How do I withdraw to my bank account?",selected:false},
  ])
  const [selectedItem,setSelectedItem] = useState<listFQAProps | null>(null)
  return <AppContainer
    showNavBar
    white
    goBack={() => {
      navigationRef.current?.goBack()
    }}
  >
    <View style={{ backgroundColor: "#F2F2F2", flexDirection: "column", paddingVertical: 24, height: DEVICE.height, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
      <Text style={{ alignSelf: "center", color: COLOURS.black, fontSize: 20, fontFamily: FONTFAMILY.INTER.bold }}>About OPAM Protect</Text>
      <Text style={{ alignSelf: "center", color: "#7B7F99", fontSize: 12, marginTop: 10, marginBottom: 10, textAlign: "center", fontFamily: FONTFAMILY.INTER.normal, paddingHorizontal: 50 }}>All you need to know about OPAM Protect</Text>
      <HorizontaLine />
      <View style={{ paddingHorizontal: 24, flexDirection: "column",paddingVertical:16 }} >
      <TitleText style={{color:"#5D132B" }}>FAQ</TitleText>
      <ScrollView >
      {list.map((a,i)=><View key={i} style={{flexDirection:"column"}}>
      <TouchableOpacity 
      onPress={()=>setSelectedItem(a)}
       style={{alignItems:"center",flexDirection:"row",padding:10}}>
      <View style={{flex:1 }}>
        <Text >{a.title}</Text>
        </View>
        <ArrowDown />
      </TouchableOpacity>
    {selectedItem?.title === a.title?<View style={{height:150,backgroundColor:COLOURS.white}}></View>:null}
    </View>)}
      </ScrollView>
      </View>
    </View>
  </AppContainer>
}
const MapStateToProps = (state: any) => {
  return state;
};
export default connect(MapStateToProps)(OpamProtectDistressLogsScreen);

const ArrowDown =()=> {
  return (
    <Svg
      width={12}
      height={8}
      viewBox="0 0 12 8"
      fill="none"
    >
      <Path
        d="M1 1.5l5 5 5-5"
        stroke="#5D132B"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
