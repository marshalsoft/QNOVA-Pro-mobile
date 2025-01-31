import React,{} from "react"
import Svg, { Rect, Path } from "react-native-svg"
import { ScrollView, Text, StyleSheet, View, TouchableOpacity, Image, TextInput, Keyboard, DeviceEventEmitter, RefreshControl } from "react-native";
import { ItemProps, ScreenComponentType } from "../../../../../includes/types";
import { COLOURS, DEVICE, FONTFAMILY, ROUTES, ValidateNigerianMobile, ValidateNigerianMobile2 } from "../../../../../includes/constants";
import { RefObject, useEffect, useRef, useState } from "react";
import AppContainer from "../../../../../components/appContainer";
import { Formik, FormikProps, FormikValues } from 'formik';
import * as y  from 'yup';
const FormSchema = y.object({
    accountType:y.string().required('Account type is required.'),
    cardType:y.string().required('Card type is required.'),
    cardBrand:y.string().required('Card brand is required.'),
    deliveryMethod:y.string().required('Delivery method is required.').optional(),
    deliveryAddress:y.string().required('Delivery method is required.').optional(),
});

import styled from "styled-components/native";
import PINScreen from "../walletTransfer/pin";
import SuccessScreen from "../walletTransfer/success";
import BaseSelect from "../../../../../components/baseSelect";
import { MockInput } from "../walletTransfer/preview";
import BaseButton from "../../../../../components/baseButton";
import useHttp from "../../../../../includes/http.hooks";
import CardInstanceComponent from "./cardInstance";
import CardTopUpScreen from "./cardTopUp";
import { connect } from "react-redux";
import BaseInput from "../../../../../components/baseInput";
import { CreateCardPayloadProps } from "./createNewCard";
import BaseInnerLoader, { BaseModalLoader } from "../../../../../components/baseLoader";
import CardWithdrawalScreen from "./cardWithdrawal";
import BaseAddressInput from "../../../../../components/baseAddressInput";
export interface CardsProps {
  action?:string;
  accountType?:string;
  cardType?:string;
  cardBrand?:string;
  cardCVV?:string;
  cardExpiry?:string;
  cardNumber?:string;
  cardId?:string;
  deliveryMethod?:string;
  deliveryAddress?:string;
  issuanceFee?:number; 
  logo?:string; 
  name?:string;
  accountId?:string;
  cardHash?:string;
  cardholderEmail?:string;
  cardholderName?:string;
  cardholderPhone?:string;
  currencyCode?:string;
  issuedAt?:string;
  last4Digits?:string;
  status?:string;
  statusLastUpdatedAt?:string;
  type?: "VIRTUAL" | "PHYSICAL";
  balance?:string;
  transactions?: any[]
}
type SectionProp = "Cards" | "Card Instance" | "New Card" | "Top Up Card" | "Card Withdrawal" | "pin" | "success";
const CardsScreen = ({route,Reducer,goBack,onSuccess}: ScreenComponentType) => {
  const [selectedCard,setSelectedCard] = useState<CardsProps>({})
  const [fetching,setFetching] = useState<boolean>(false)
  const [selected,setSelected] = useState<number>(0)
  const [sucessObject,setSucessObject] = useState<{
    message:string;
    raiseIssueBtnText:string;
    shareBtnText:string;
  }>({
    message:"",
    raiseIssueBtnText:"",
    shareBtnText:""
  })
    const [section,setSection] = useState<SectionProp>("Cards");
    const [hideBtn,setHideBtn] = useState<boolean>(false);
    const [listOfVirtualCards,setListOfVirtualCards] = useState<CardsProps[]>([
        {},
        {}
    ])
    const [listOfPhysicalCards,setListOfPhysicalCards] = useState<CardsProps[]>([
      {},
      {}
  ])
  const [processing,setProcessing] = useState<boolean>(false);
  const {GetAllPHYSICALCards,CardWithdrawal,CardTopUp,CardFreezeUnfreeze,CardDelete,GetAllVIRTUALCards,loading,ResquestCard,FetchCardBrands} = useHttp();
  const FetchCards = ()=>{
    GetAllPHYSICALCards().then((res)=>{
if(res.status && res.data.length !== 0)
{
  setListOfPhysicalCards(res.data)
}
    })
    GetAllVIRTUALCards().then((res)=>{
      if(res.status && res.data.length !== 0)
        {
          setListOfVirtualCards(res.data)
        }
    })
  }
const [listOfCardBrands,setListOfCardBrands] = useState<CardsProps[]>([])
const handleGetBrands = ()=>{
    FetchCardBrands().then((res)=>{
        if(res.status)
        {
          setListOfCardBrands(res.data)
        }
    })
}
    useEffect(()=>{
      handleGetBrands();
      FetchCards();
      DeviceEventEmitter.addListener(ROUTES.cardScreen,()=>{
        FetchCards();
      })
    },[])
    useEffect(()=>{
      if(listOfPhysicalCards.length === 0)
      {
        setListOfPhysicalCards([
          {},
          {}
      ])
      }
      if(listOfVirtualCards.length === 0)
        {
          setListOfVirtualCards([
            {},
            {}
        ])
        }
    },[listOfPhysicalCards,listOfVirtualCards])
    const thisForm = useRef<FormikProps<FormikValues>>(null)
    const HandleKeyboardShow = ()=>{
      setHideBtn(true)
    }
    const HandleKeyboardHide = ()=>{
      setHideBtn(false)
    }
    useEffect(()=>{
      const kh = Keyboard.addListener("keyboardDidHide",HandleKeyboardHide);
      const ks = Keyboard.addListener("keyboardDidShow",HandleKeyboardShow);
      return ()=>{
        kh.remove();
        ks.remove();
      }
    },[hideBtn])
    if(section === "pin")
      {
      return <View style={{flexDirection:"column",flex:1}}>
        <PINScreen
      goBack={()=>setSection("Card Instance")}
      subTitle="Enter your transaction PIN to confirm this transaction"
      onValue={(pin)=>{
        if(selectedCard.action === "delete")
          {
          setProcessing(true);
          CardDelete(String(selectedCard?.accountId)).then((res)=>{
            setProcessing(false);
            if(res.status)
            {
        if(selectedCard.type === "VIRTUAL")
        {
          setListOfVirtualCards(listOfVirtualCards.filter((a,i)=>a.accountId != selectedCard.accountId));
        }
        if(selectedCard.type === "PHYSICAL")
          {
            setListOfPhysicalCards(listOfPhysicalCards.filter((a,i)=>a.accountId != selectedCard.accountId));
          }
          setSucessObject({
            ...sucessObject,
            message:res.message
          })
        setSection("success");
        }
          })
        }else if(selectedCard.action === "freeze")
          {
          setProcessing(true);
          CardFreezeUnfreeze({
            cardId: selectedCard.accountId,
            cardType:selectedCard.type,
            status: "Inactive"
          }).then((res)=>{
            setProcessing(false);
            if(res.status)
            {
        setSucessObject({
          ...sucessObject,
          message:res.message
        })
        setSection("success");
        }
          })
        }else if(selectedCard.action === "Top Up"){
          setProcessing(true); 
          CardTopUp({
              cardId:selectedCard.accountId,
              amount:parseInt(String(selectedCard.balance).replace(/[, ]/g,'')),
              cardPin: "1231",
              transactionPin: pin
            }).then((res)=>{
              setProcessing(false);
              if(res.status)
              {
                setSucessObject({
                  ...sucessObject,
                  message:res.message
                })
                setSection("success");
              }
            })
        }else if(selectedCard.action === "withdrawal")
        {
          setProcessing(true);
            CardWithdrawal({
              cardId:selectedCard.accountId,
              amount:parseInt(String(selectedCard.balance).replace(/[, ]/g,'')),
              cardPin: "1231",
              transactionPin: pin
            }).then((res)=>{
              setProcessing(false);
              if(res.status)
              {
                setSucessObject({
                  ...sucessObject,
                  message:res.message
                })
                setSection("success");
              }
            })
        }
      }}
      data={{}}
      status="pin"
      />
      {processing && <BaseModalLoader />}
      </View>
    }
    if(section === "success")
      {
      return <SuccessScreen 
      message={sucessObject.message}
      raiseIssueBtnText={sucessObject.raiseIssueBtnText}
      shareBtnText={sucessObject.shareBtnText}
      goBack={()=>{
        setSection("Cards");
      }}
      hideShareBtn
      />
      }
     return <AppContainer
    showNavBar
    white
    goBack={()=>{
        if(section === "Cards")
        {
            if(goBack)
            {
            goBack();
            }
        }else{
          if(section === "Card Withdrawal" || section === "Top Up Card")
          {
           return setSection("Card Instance") 
          }
            setSection("Cards")
        }
    }}
    title={section}
    footer={<View >
      {section === "Cards" || section === "New Card" ?!hideBtn?<TouchableOpacity 
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
      </TouchableOpacity>:null:null}
      {fetching && <BaseModalLoader 
      modal
      />}
      </View>}
      disableScrol
    >
<View style={{backgroundColor:"#F2F2F2",flexDirection:"column",padding:24,height:DEVICE.height,borderTopRightRadius:20,borderTopLeftRadius:20}}>
{section === "Card Instance"?
<CardInstanceComponent
cardDetails={selectedCard}
userData={Reducer}
onValue={(data:any)=>{
  setSelectedCard({...selectedCard,action:data.value})
  setSection("pin");
}}
onTopUp={()=>{
setSection("Top Up Card")
}}
onWithdrawal={()=>{
  setSection("Card Withdrawal")
  }}
/>:null}
{section === "Cards"?<ScrollView
showsVerticalScrollIndicator={false}
refreshControl={
  <RefreshControl
  progressViewOffset={40}
    refreshing={loading}
    onRefresh={()=>FetchCards()}
  />}
>
  <View style={{flexDirection:"column"}}>
<View style={{flexDirection:"row",height:50,alignItems:"center",gap:10}}>
<View style={{flexDirection:"row",height:"100%",padding:4,backgroundColor:"#7B7F991A",borderRadius:16,flex:1}}>
            <TouchableOpacity 
            onPress={()=>setSelected(0)}
            style={{flex:1,justifyContent:"center",alignItems:"center",borderRadius:12,backgroundColor:selected === 0?COLOURS.white:"transparent"}}
            >
                <Text style={{fontFamily:FONTFAMILY.INTER.normal,color:selected === 0?COLOURS.purple:COLOURS.gray64,fontSize:14}}>Physical</Text>
            </TouchableOpacity>
            <TouchableOpacity 
             onPress={()=>setSelected(1)}
            style={{flex:1,justifyContent:"center",alignItems:"center",borderRadius:12,backgroundColor:selected !== 0?COLOURS.white:"transparent"}}
            >
                <Text style={{fontFamily:FONTFAMILY.INTER.normal,color:selected !== 0?COLOURS.purple:COLOURS.gray64,fontSize:14}}>Virtual</Text>
            </TouchableOpacity>
</View>
<TouchableOpacity 
onPress={()=>{
    setSection("New Card");
}}
>
<PlusIcon />
</TouchableOpacity>
</View>
{selected === 0?<View style={{flexDirection:"column",gap:20,marginTop:20,marginBottom:150}}>
{listOfPhysicalCards.map((a,i)=><CardContainer 
activeOpacity={a?.last4Digits?0:9}
onPress={()=>{
  if(a?.last4Digits)
  {
  setSelectedCard(a);
  setSection("Card Instance")
  }
}}
style={{overflow:"hidden"}}
>
<Image 
source={require("../../../../../images/b-card.png")}
style={{width:"100%",height:"100%"}}
resizeMode="stretch"
/>
<View 
style={{width:"100%",height:"100%",position:"absolute",top:0,left:0,justifyContent:"center",flexDirection:"column",paddingHorizontal:20,backgroundColor:i / 3 == 0?"rgba(139,29,88,0.5)":"transparent"}}
>
<Text style={{color:"white",fontFamily:FONTFAMILY.INTER.semiBold,fontSize:12,opacity:0.4}}>Card Number</Text>
<Text style={{color:"white",fontFamily:FONTFAMILY.INTER.semiBold,fontSize:12,marginTop:5}}>{a?.last4Digits?"XXXX XXXX XXXX "+a?.last4Digits:"XXXX XXXX XXXX XXX"}</Text>
</View>
{String(a?.cardBrand).toLowerCase().includes("visa")?<Image 
source={require("../../../../../images/cardLogos/visa.png")}
style={{position:"absolute",bottom:20,right:20,width:60}}
resizeMode="contain"
/>:null}
{String(a?.cardBrand).toLowerCase().includes("master")?<Image 
source={require("../../../../../images/cardLogos/master.png")}
style={{position:"absolute",bottom:20,right:20,width:60}}
resizeMode="contain"
/>:null}
{String(a?.cardBrand).toLowerCase().includes("express")?<Image 
source={require("../../../../../images/cardLogos/express.png")}
style={{position:"absolute",bottom:20,right:20,width:60}}
resizeMode="contain"
/>:null} 
{String(a?.cardBrand).toLowerCase().includes("verve")?<Image 
source={require("../../../../../images/cardLogos/verve.png")}
style={{position:"absolute",bottom:20,right:20,width:60}}
resizeMode="contain"
/>:null}

</CardContainer>)}
</View>:<View style={{flexDirection:"column",gap:20,marginTop:20,marginBottom:150}}>
{listOfVirtualCards.map((a,i)=><CardContainer 
activeOpacity={a?.accountId?0:9}
onPress={()=>{
  if(a?.accountId)
  {
  setSelectedCard(a);
  setSection("Card Instance")
  }
}}
style={{overflow:"hidden"}}
>
<Image 
source={require("../../../../../images/b-card.png")}
style={{width:"100%",height:"100%"}}
resizeMode="stretch"
/>
<View 
style={{width:"100%",height:"100%",position:"absolute",top:0,left:0,justifyContent:"center",flexDirection:"column",paddingHorizontal:20,backgroundColor:i / 3 == 0?"rgba(139,29,88,0.5)":"transparent"}}
>
<Text style={{color:"white",fontFamily:FONTFAMILY.INTER.semiBold,fontSize:12,opacity:0.4}}>Card Number</Text>
<Text style={{color:"white",fontFamily:FONTFAMILY.INTER.semiBold,fontSize:12,marginTop:5}}>{a?.last4Digits?"XXXX XXXX XXXX "+a?.last4Digits:"XXXX XXXX XXXX XXX"}</Text>
</View>
{String(a?.cardBrand).toLowerCase().includes("master")?<Image 
source={require("../../../../../images/cardLogos/master.png")}
style={{position:"absolute",bottom:20,right:20,width:60}}
resizeMode="contain"
/>:null}
{String(a?.cardBrand).toLowerCase().includes("express")?<Image 
source={require("../../../../../images/cardLogos/express.png")}
style={{position:"absolute",bottom:20,right:20,width:60}}
resizeMode="contain"
/>:null} 
{String(a?.cardBrand).toLowerCase().includes("verve")?<Image 
source={require("../../../../../images/cardLogos/verve.png")}
style={{position:"absolute",bottom:20,right:20,width:60}}
resizeMode="contain"
/>:null}
</CardContainer>)}
</View>}
</View>
</ScrollView>:null}
{section === "New Card"?<Formik
initialValues={{
  accountType:"",
  cardType:"",
  cardBrand:"",
  deliveryMethod:"",
  deliveryAddress:""
}}
innerRef={thisForm}
onSubmit={(values:CardsProps, actions:any) => {
var data:CreateCardPayloadProps = values as CreateCardPayloadProps;
 if(values.cardType === "PHYSICAL")
 {
  if(values.deliveryMethod === "")
  {
    return thisForm.current?.setFieldError("deliveryMethod","Delivery method is required.")
  }
  if(values.deliveryAddress === "")
  {
    return thisForm.current?.setFieldError("deliveryAddress","Delivery address is required.")
  }
  data.meta = {
    deliveryAddress:values.deliveryAddress!,
    deliveryMethod:values.deliveryMethod === "Delivery"?"door_delivery":"pickup"
  }
 }
 setFetching(true);
ResquestCard(data).then((res)=>{
  setFetching(false);
    if(res.status)
    {
      FetchCards();
      setSucessObject({
        ...sucessObject,
        message:res.message
      })
      setSection("success");
    }
  })
  // 
}}
validationSchema={FormSchema}
>
{({values,handleChange,setFieldValue,handleSubmit,errors,isValid,touched})=>(
<View style={{flexDirection:"column"}}>
<BaseSelect 
type="custom"
list={[
  {title:"Wallet",value:"wallet"}
]}
label="Select Account"
placeholder="Select Account"
onChange={(d)=>{
setFieldValue("accountType",d.title);
}}
value={values.accountType}
errorMessage={touched.accountType && errors.accountType}
/>
<BaseSelect 
type="custom"
list={[
  {title:"Physical",value:"physical"},
  {title:"Virtual",value:"virtual"}
]}
label="Card Type"
placeholder="Select Card Type"
onChange={(d)=>{
  setFieldValue("cardType",String(d.value).toUpperCase());
  }}
  value={values.cardType}
  errorMessage={touched.cardType && errors.cardType}
  
/>
<BaseSelect 
type="custom"
list={listOfCardBrands.map((a,i)=>{
  return {
    title:a.name,
    icon:a.logo,
    value:a.name
  }
})}
label="Card Brand"
placeholder="Select Card Brand"
onChange={(d)=>{
  setFieldValue("cardBrand",d.value);
  }}
  value={values.cardBrand}
  errorMessage={touched.cardBrand && errors.cardBrand}
/>
{values.cardType === "PHYSICAL"?<BaseSelect 
type="custom"
list={[
  {title:"Pick-Up",value:"Pick-Up"},
  {title:"Delivery",value:"Delivery"}
]}
label="Delivery Method"
placeholder="Select Delivery Method"
onChange={(d)=>{
  setFieldValue("deliveryMethod",d.value);
  setFieldValue("deliveryAddress"," ");
  }}
  value={values.deliveryMethod}
  errorMessage={touched.deliveryMethod && errors.deliveryMethod}
/>:null}
{values.cardType === "PHYSICAL" && values.deliveryMethod === "Delivery"?<BaseAddressInput
label="Delivery address"
placeholder="123 Main Str. Lagos"
value={values.deliveryAddress!}
onValueChange={(d)=>{
  setFieldValue("deliveryAddress",d);
  }}
errorMessage={touched.deliveryAddress && errors.deliveryAddress}
/>:null}
<BaseButton 
disabled={!isValid}
title="Request Card"
onPress={handleSubmit}
/>
</View>)}
</Formik>:null}

</View>
{section === "Top Up Card"?<CardTopUpScreen
dataDetails={selectedCard}
onClose={()=>setSection("Card Instance")}
onSuccess={(data)=>{
  setSelectedCard({
    ...selectedCard,
    balance:data.amount,
    action:"Top Up",
    accountType:data.accountType
  })
  setSection("pin");
}}
/>:null}
{section === "Card Withdrawal"?<CardWithdrawalScreen
dataDetails={selectedCard}
onClose={()=>setSection("Card Instance")}
onSuccess={(data)=>{
  setSelectedCard({
    ...selectedCard,
    balance:data.amount,
    action:"withdrawal",
    accountType:data.accountType
  })
  setSection("pin");
}}

/>:null}

</AppContainer>
}
const MapStateToProps = (state: any) => {
  return state;
};
export default connect(MapStateToProps)(CardsScreen);


const PlusIcon=()=>{
  return (
    <Svg
      width={56}
      height={56}
      viewBox="0 0 56 56"
      fill="none"
    >
      <Rect width={56} height={56} rx={12} fill="#8B1D41" />
      <Path
        d="M28 24v8m-4-4h8m6 0c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10 10 4.477 10 10z"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}


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
export const CardContainer = styled.TouchableOpacity`
border-radius: 12px;
background: #000;
height: 199px;
`;