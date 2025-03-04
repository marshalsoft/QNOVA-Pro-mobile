import React,{ memo } from "react"
import Svg, { Rect, Path } from "react-native-svg"
import { ScrollView, Text, StyleSheet, View, TouchableOpacity, Image, TextInput, FlatList } from "react-native";
import { ItemProps, ScreenComponentType, UserDataModel } from "../../../../../includes/types";
import { COLOURS, DEVICE, FONTFAMILY, ROUTES, ValidateNigerianMobile, ValidateNigerianMobile2 } from "../../../../../includes/constants";
import { RefObject, useEffect, useRef, useState } from "react";
import AppContainer from "../../../../../components/appContainer";
import styled from "styled-components/native";
import PINScreen from "../walletTransfer/pin";
import SuccessScreen from "../walletTransfer/success";
import AirtimeComponent from "./airtime";
import DataComponent from "./data";
import ElectricityComponent from "./electricity";
import TvComponent from "./tv";
import { connect, useDispatch } from "react-redux";
import useHttp from "../../../../../includes/http.hooks";
import BaseInnerLoader,{ BaseModalLoader } from "../../../../../components/baseLoader";
import AsyncStorage from "@react-native-async-storage/async-storage";
type SectionProp = "Bill Payments" | "Airtime" | "Data" | "Tv" | "Electricity" | "pin" | "success";
export interface BillersPropItemProp {
  createdAt:string;
  id:string;
  imageUrl:string;
  provider:string;
  serviceCategory:string;
  serviceEnabled:boolean;
  serviceName:string;
  serviceType:string;
  updatedAt:string;
}
const BillPaymentScreen = ({Reducer,goBack,onSuccess}: ScreenComponentType) => {
  const [saveFormData,setSaveFormData] = useState<any>();
    const [selectedBill,setSelectedBill] = useState<BillersPropItemProp | null>(null);
    const [section,setSection] = useState<SectionProp>("Bill Payments");
    const [showPIN,setShowPIN] = useState<boolean>(false);
    const [message,setMessage] = useState<string>("");
    const {BillPurchase,loading} = useHttp();
    const handleSubmit = (pin:string)=>{
      const data = {
        ...saveFormData,
        transactionPin:pin
      }
      
      BillPurchase(data).then((res)=>{
    if(res.data)
    {
      if(res.data?.data?.amountOfPower)
      {
        setMessage(`${res.data?.data?.transactionMessage}\nTOKEN: ${res.data?.data?.tokenCode}\n`);
      }else{
        setMessage(res.message);
      }
      setSection("success")
    }
   })
    }
    
    if(section === "success")
      {
      return <SuccessScreen 
      message={message}
      goBack={()=>{
        setShowPIN(false);
        setSaveFormData(null)
        setSection("Bill Payments")
      }}
      hideShareBtn
      />
      }
     return <AppContainer
    showNavBar
    white
    goBack={()=>{
      if(showPIN)
        {
         return setShowPIN(false);
        }
        if(selectedBill)
          {
           return setSelectedBill(null);
          }
        if(section === "Bill Payments")
        {
            if(goBack)
            {
            goBack();
            }
        }else{
            setSection("Bill Payments")
        }
    }}
    title={selectedBill?String(selectedBill.serviceCategory).replace('databundle','Data'):section}
    disableScrol
    footer={section === "Bill Payments" && !showPIN?<TouchableOpacity 
        onPress={()=>{
            if(goBack)
            {
            goBack();
            }
        }}
      style={{position:"absolute",bottom:50,right:20}}
      >
        <Image 
        source={require("../../../../../images/menubtn.png")}
        style={{width:84,height:84}}
        resizeMode='contain'
        />
      </TouchableOpacity>:<></>}
    >

{String(selectedBill?.serviceCategory).toLowerCase() === "airtime"?<AirtimeComponent
 userData={Reducer!}
 network={selectedBill!}
 onValue={(data:any)=>{
  setSaveFormData(data);
  setShowPIN(true);
 }}
 />:null}
 {String(selectedBill?.serviceCategory).toLowerCase() === "databundle"?<DataComponent
  userData={Reducer!}
  network={selectedBill!}
  onValue={(data:any)=>{
   setSaveFormData(data);
   setShowPIN(true);
  }}
 />:null}
  {String(selectedBill?.serviceCategory).toLowerCase() === "electricity"?<ElectricityComponent
 userData={Reducer!}
 network={selectedBill!}
 onValue={(data:any)=>{
  setSaveFormData(data);
  setShowPIN(true);
 }}
 />:null}
{String(selectedBill?.serviceCategory).toLowerCase() === "cabletv"?<TvComponent
userData={Reducer!}
network={selectedBill!}
onValue={(data:any)=>{
 setSaveFormData(data);
 setShowPIN(true);
}}
 />:null} 
{section === "Bill Payments"?<View style={{backgroundColor:"#F2F2F2",justifyContent:"flex-start",flexDirection:"column",padding:24,height:DEVICE.height - 80,borderTopRightRadius:20,borderTopLeftRadius:20}}>
<ScrollView 
showsVerticalScrollIndicator={false}
>
<View style={{flexDirection:"column"}} >
<AirtimeListComponent 
list={Reducer?.airtimeProviders!}
onPress={(d)=>{
  setSelectedBill(d);
}} 
/>
<DataListComponent 
list={Reducer?.dataProviders!}
onPress={(d)=>{
  setSelectedBill(d);
}} 
/> 
<ElectricityListComponent 
list={Reducer?.utilityProviders!} 
onPress={(d)=>{
  setSelectedBill(d);
}} 
/> 
<TvListComponent
list={Reducer?.tvProviders!} 
onPress={(d)=>{
  setSelectedBill(d);
}} 
/> 
</View>
<View  style={{height:200}} />
</ScrollView>
</View>:null}
{showPIN?<View 
 style={{backgroundColor:"#F2F2F2",justifyContent:"flex-start",flexDirection:"column",padding:24,borderTopRightRadius:20,borderTopLeftRadius:20,position:"absolute",top:0,left:0,height:DEVICE.height}}
>
 <PINScreen
      subTitle="Enter your transaction PIN to confirm this transaction"
      onValue={(d)=>{
        handleSubmit(d)
      }}
      data={{}}
      status="pin"
      />
 </View>:null}
 {loading && <BaseModalLoader modal/>}
</AppContainer>
}
interface ItemContainerProp {
list:BillersPropItemProp[];
title:string;
onPress:(d:BillersPropItemProp)=>void
}
interface ListComponentProp {
  onPress:(data:BillersPropItemProp)=>void;
  list:BillersPropItemProp[]
  }
const AirtimeListComponent = memo((prop:ListComponentProp)=>{
  const {loading,FetchBillers} = useHttp();
  const [airtimeList,setAirtimeList] = useState<BillersPropItemProp[]>([])
  const [fetching,setFetching] = useState<boolean>(true);
  useEffect(()=>{
    AsyncStorage.getItem("airtime").then((data)=>{
    if(data !== null)
      {
        setAirtimeList(JSON.parse(data));
        setFetching(false);
      }else{
        setFetching(false);
    FetchBillers("airtime").then((res)=>{
      if(res.data)
      {
        setAirtimeList(res.data)
        AsyncStorage.setItem("airtime",JSON.stringify(res.data))
      }
    })
  }
})
  },[])

  return <View style={{flexDirection:"column"}}>
    {loading || fetching?<View style={{marginBottom:-10,marginTop:10}}>
  <BaseInnerLoader text="Fetching..." />
  </View>:null}
<ItemContainer 
onPress={(d)=>{
prop.onPress(d);
}}  
list={airtimeList} 
title="Airtime" />
  </View>
})
  const DataListComponent = memo((prop:ListComponentProp)=>{
    return <View style={{flexDirection:"column"}}>
    {prop.list.length === 0?<View style={{marginBottom:-10,marginTop:10}}>
  <BaseInnerLoader text="Fetching..." />
  </View>:null}
    <ItemContainer onPress={(d)=>{
    prop.onPress(d)
    }}  
    list={prop.list} 
    title="Data" />
      </View>
  })
  const TvListComponent = memo((prop:ListComponentProp)=>{
    const [tvList,setTVList] = useState<BillersPropItemProp[]>([])
   const [fetching,setFetching] = useState<boolean>(true);
   useEffect(()=>{
    setTVList(prop.list)
    setFetching(prop.list.length === 0)
  },[prop.list])
    return <View style={{flexDirection:"column"}}>
    {fetching? <View style={{marginBottom:-10,marginTop:10}}>
  <BaseInnerLoader text="Fetching..." />
  </View>:null}
    <ItemContainer onPress={(d)=>{
   prop.onPress(d)
    }}  
    list={tvList} 
    title="TV" />
      </View>
  })
  const ElectricityListComponent = memo((prop:ListComponentProp)=>{
    const [electricityList,setElectricityList] = useState<BillersPropItemProp[]>([])
   const [fetching,setFetching] = useState<boolean>(true);
  useEffect(()=>{
    setElectricityList(prop.list)
    setFetching(prop.list.length === 0)
  },[prop.list])
    return <View style={{flexDirection:"column"}}>
 {fetching ?<View style={{marginBottom:-10,marginTop:10}}>
  <BaseInnerLoader text="Fetching..." />
  </View>:null}
<ItemContainer onPress={(d)=>{
prop.onPress(d)
}}  
list={electricityList} 
title="Electricity" />
  </View>
  })
const ItemContainer = (props:ItemContainerProp)=>{
 const ItemViem = memo(({item,index}:{item:BillersPropItemProp,index:number})=>(<View style={{paddingHorizontal:5}}>
  <ItemView
key={index}
onPress={()=>{
  props.onPress(item);
}}
style={{justifyContent:"flex-start",gap:8}}
>
<Image 
  style={{
    borderRadius: 2,
    backgroundColor:"rgba(123, 127, 153, 0.25)",
    width: 28,
    height: 28,
    alignSelf:"flex-start"
  }}
  source={{uri:item.imageUrl}}
  resizeMode="cover"
/>
 <Text1 numberOfLines={1} >{String(item.serviceName).replace("Telecommunication ","")}</Text1>
</ItemView>
</View>),(prevProps, nextProps) => {
    return prevProps.item === nextProps.item;
  })
 return <View style={{flexDirection:"column"}}>
 <Text1 style={{color:"#000",textAlign:"left",marginTop:20}} >{props.title}</Text1>
<View style={{width:"100%",marginTop:12,flexDirection:"row"}}>
<FlatList 
horizontal
data={props.list}
initialNumToRender={10}
windowSize={10}
renderItem={({item,index})=><ItemViem item={item} index={index} />}
/>
</View>
  </View>
}
const MapStateToProps = (state: any) => {
  return state;
};
export default connect(MapStateToProps)(BillPaymentScreen);


const Text1 = styled.Text`
color: #000;
font-family: ${FONTFAMILY.INTER.semiBold};
font-size: 12px;
font-weight: 600;
`;
export const ItemView = styled.TouchableOpacity`
border-radius: 12px;
background: #FFF;
display: flex;
height: 84px;
width:100px;
padding: 10px 8px;
flex-direction:column;
`;