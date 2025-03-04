import { View, Text, TouchableOpacity, ScrollView, Modal, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CardContainer, CardsProps, ItemView } from '.';
import styled from 'styled-components/native';
import Svg, { Path, Mask } from "react-native-svg"
import { COLOURS, FONTFAMILY } from '../../../../../includes/constants';
import BaseSelect from '../../../../../components/baseSelect';
import { UserDataModel } from '../../../../../includes/types';
import { ReturnComma } from '../../../../../includes/functions';
import useHttp from '../../../../../includes/http.hooks';
import Animated,{ Extrapolation, interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
interface CardInstanceComponentProps {
    onValue:(data?:any)=>void;
    onTopUp:()=>void;
    onWithdrawal:()=>void;
    cardDetails:CardsProps;
    userData?:UserDataModel
}
const CardInstanceComponent = (props:CardInstanceComponentProps) => {
  const [selectedTab,setSelectedTab] = useState<string>("All");
  const [showDetails,setShowDetails] = useState<boolean>(false);
  const [cardInfo,setCardInfo] = useState<CardsProps>({
    balance:"0.00"
  });
  const {CardInfo,CardTransactions,ShowMessage,loading} = useHttp();
    const tabs:string[] = [
        "All",
        "Topup",
        "Withdrawal",
        "Outflow"
    ];
    const [list,setList] = useState<any[]>([
        {
        title:"Today",
        divider:true
        },
        {},
        {},
        {
          title:"Yesterday",
          divider:true
        },
        {},
        {}
    ]);
    const GetCardInfo = ()=>{
      if(props?.cardDetails?.cardHash)
        {
        CardInfo(String(props?.cardDetails.accountId)).then((res)=>{
          if(res.data)
          {
            setCardInfo(res.data);
          }
        })
      }
    }
    useEffect(()=>{
      console.log(props.cardDetails);
      GetCardInfo();
    },[props.cardDetails.accountId])
    useEffect(()=>{
      if(props.cardDetails.accountId)
      {
      CardTransactions(String(props.cardDetails.accountId))
      }
    },[props.cardDetails.accountId])
const isInactive = false;// props.cardDetails?.status === "Inactive" || props.cardDetails?.status === "PreActive";
const AnimatText1 = useSharedValue(30);
const AnimatTextOpacity = useSharedValue(0);
const AnimatStyle = useAnimatedStyle(()=>{
  return {
    transform:[
      {translateX:AnimatText1.value}
    ],
    opacity: AnimatTextOpacity.value,
  }
})
useEffect(()=>{
  AnimatText1.value = withSpring(showDetails?0:20,{duration:2000})
  AnimatTextOpacity.value = withTiming(showDetails?1:0,{duration:100})
},[showDetails])
 var cardOptions = [
  // {icon:<CardIcon />,title:"About Card",value:"info"},
  // {icon:<CardIcon />,title:"Card Limits",value:"limits"},
  // {icon:<CardIcon />,title:"Reset PIN",value:"pin"},
  {icon:<FreezeIcon />,title:!isInactive?"Freeze Card":"Unfreeze Card",value:"freeze"},
  {icon:<TrashIcon />,title:"Delete Card",value:"delete"}
];
if(isInactive)
{
  cardOptions = cardOptions.filter((a,i)=>a.title !== "Reset PIN" && a.title !== "Card Limits")
}
var balanceInNaira:string = "0";
var balanceInKobo:string = "0";
if(cardInfo?.balance)
{
  if(String(cardInfo?.balance).includes("."))
  {
    const splitDot = String(cardInfo?.balance).split(".")
    balanceInNaira = splitDot[0];
    balanceInKobo = splitDot[1];
  }else{
    balanceInNaira = String(cardInfo?.balance);
  }
}
 return (<ScrollView
  showsVerticalScrollIndicator={false}
  refreshControl={
    <RefreshControl
      refreshing={loading}
      onRefresh={()=>GetCardInfo()}
    />}
  >
 <View style={{flexDirection:"column",gap:20}}>
     <View 
     style={{height:200}}
     >
 <Image 
source={require("../../../../../images/b-card.png")}
style={{width:"100%",height:"100%"}}
resizeMode="stretch"
/>
<View 
style={{width:"100%",height:"100%",position:"absolute",top:0,left:0,justifyContent:"center",flexDirection:"column",paddingHorizontal:20}}
>
<Text style={{color:"white",fontFamily:FONTFAMILY.INTER.semiBold,fontSize:12,opacity:0.4}}>Card holder Name</Text>
<Text style={{color:"white",fontFamily:FONTFAMILY.INTER.semiBold,fontSize:12,marginTop:5}}>{props.userData?.firstName} {props.userData?.lastName}</Text>
<Text style={{color:"white",fontFamily:FONTFAMILY.INTER.semiBold,fontSize:12,opacity:0.4,marginTop:8}}>Card Number</Text>
{showDetails?<Animated.Text style={[{color:"white",fontFamily:FONTFAMILY.INTER.semiBold,fontSize:12,marginTop:5},AnimatStyle]}>{props.cardDetails?.accountId}</Animated.Text>:
<Text style={{color:"white",fontFamily:FONTFAMILY.INTER.semiBold,fontSize:12,marginTop:5}}>{"*** **** **** "+props.cardDetails?.last4Digits}</Text>}
<View style={{flexDirection:"row"}}>
  <View style={{paddingRight:20}}>
<Text style={{color:"white",fontFamily:FONTFAMILY.INTER.semiBold,fontSize:12,opacity:0.4,marginTop:8}}>Expiry Date</Text>
{showDetails?<Animated.Text style={[{color:"white",fontFamily:FONTFAMILY.INTER.semiBold,fontSize:12,marginTop:5},AnimatStyle]}>{props.cardDetails.cardExpiry}</Animated.Text>:
<Text style={{color:"white",fontFamily:FONTFAMILY.INTER.semiBold,fontSize:12,marginTop:5}}>{"***"}</Text>}
</View>
<View style={{flex:1}}>
<Text style={{color:"white",fontFamily:FONTFAMILY.INTER.semiBold,fontSize:12,opacity:0.4,marginTop:8}}>Cvv</Text>
{showDetails?<Animated.Text style={[{color:"white",fontFamily:FONTFAMILY.INTER.semiBold,fontSize:12,marginTop:5},AnimatStyle]}>{props.cardDetails.cardCVV}</Animated.Text>:
<Text style={{color:"white",fontFamily:FONTFAMILY.INTER.semiBold,fontSize:12,marginTop:5}}>{"***"}</Text>}
</View>
</View>
</View>
{isInactive && <Text style={{fontFamily:FONTFAMILY.INTER.bold,color:"red",position:"absolute",top:20,right:20}}>{String(props.cardDetails.status).replace("PreActive","Pre Activated")}</Text>}
{String(props.cardDetails?.cardBrand).toLowerCase().includes("master")?<Image 
source={require("../../../../../images/cardLogos/master.png")}
style={{position:"absolute",bottom:20,right:20,width:60}}
resizeMode="contain"
/>:null}
{String(props.cardDetails?.cardBrand).toLowerCase().includes("express")?<Image 
source={require("../../../../../images/cardLogos/express.png")}
style={{position:"absolute",bottom:20,right:20,width:60}}
resizeMode="contain"
/>:null} 
{String(props.cardDetails?.cardBrand).toLowerCase().includes("verve")?<Image 
source={require("../../../../../images/cardLogos/verve.png")}
style={{position:"absolute",bottom:20,right:20,width:60}}
resizeMode="contain"
/>:null}
{String(props.cardDetails?.cardBrand).toLowerCase().includes("visa")?<Image 
source={require("../../../../../images/cardLogos/visa.png")}
style={{position:"absolute",bottom:20,right:20,width:60}}
resizeMode="contain"
/>:null}
     </View>
 <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
<Text style={{color:"gray",fontFamily:FONTFAMILY.INTER.medium,fontSize:20,opacity:0.4,marginTop:8}}>{"₦"}</Text>
<Text style={{color:"black",fontFamily:FONTFAMILY.INTER.bold,fontSize:36,marginTop:5,marginHorizontal:2}}>{balanceInNaira == "0"?balanceInNaira:ReturnComma(String(balanceInNaira))}</Text>
<Text style={{color:"gray",fontFamily:FONTFAMILY.INTER.medium,fontSize:20,marginTop:5}}>.{balanceInKobo}</Text>
</View>
 <View style={{flexDirection:"row"}}>
<TouchableOpacity 
onPress={()=>setShowDetails(!showDetails)}
style={{flexDirection:"column",justifyContent:"center",alignItems:"center",flex:1}}
>
    <EyeIcon />
    <SubTitleText>Show/Hide</SubTitleText>
</TouchableOpacity>
<TouchableOpacity 
onPress={()=>{
  if(isInactive)
  {
    return ShowMessage("top").fail("Card is not active")
  }
  props.onTopUp();
}}
style={{flexDirection:"column",justifyContent:"center",alignItems:"center",flex:1}}
>
    <TopUpIcon />
    <SubTitleText>Top Up</SubTitleText>
</TouchableOpacity>
<TouchableOpacity 
onPress={()=>{
  if(isInactive)
  {
    return ShowMessage("top").fail("Card is not active")
  }
  props.onWithdrawal()
}}
style={{flexDirection:"column",justifyContent:"center",alignItems:"center",flex:1}}
>
    <WithdrawIcon />
    <SubTitleText>Withdraw</SubTitleText>
</TouchableOpacity>
<BaseSelect 
list={cardOptions}
onChange={(data)=>{
if(data.value === "delete" || data.value === "freeze")
{
  if(data.value === "delete")
  {
    Alert.alert("Note","Deleting this card will move your card balance to main wallet.",[
      {text:"Yes",onPress:()=>{
        props.onValue(data);
      }},
      {text:"No",onPress:()=>{
       
      }}
    ])
  }else{
    props.onValue(data);
  }
}
}}
type='component'
containerStyle={{flex:1}}
title={<Text1 style={{color:COLOURS.black,fontSize:20}}>More</Text1>}
>
<View 
style={{flexDirection:"column",justifyContent:"center",alignItems:"center",flex:1}}
>
    <MoreIcon />
    <SubTitleText>More</SubTitleText>
</View>
</BaseSelect>
</View>
<View style={{height:40,width:"100%"}}>
<ScrollView 
horizontal
nestedScrollEnabled
>
<View style={{flexDirection:"row",alignItems:"center",gap:0}}>
{tabs.map((item,index)=><TouchableOpacity
onPress={()=>setSelectedTab(item)}
style={{paddingHorizontal:20,paddingVertical:8,borderBottomColor:selectedTab === item?COLOURS.purple:"transparent",borderBottomWidth:2}}
>
 <Text1 style={{color:selectedTab === item?COLOURS.purple:"rgba(123, 127, 153, 0.50)"}}>{item}</Text1>
</TouchableOpacity>)}
</View>
</ScrollView>
</View>
{cardInfo?.transactions?.filter((a,i)=>String(a).includes(selectedTab))?.map((a,i)=>{
    if(a.divider)
    {
        return <Text1 style={{color:COLOURS.purple,textAlign:"left"}}>{a.title}</Text1>
    }
    return <ItemView 
    style={{flexDirection:"row"}}
    >
<View style={{width:5,height:5,backgroundColor:"green",borderRadius:5}} />
<View style={{flex:1,justifyContent:"flex-start",paddingLeft:5}}>
<Text1 style={{color:COLOURS.black,textAlign:"left",fontSize:14}}>Top Up</Text1>
</View>
<View style={{flexDirection:"column"}}>
<Text1 style={{color:COLOURS.black,textAlign:"right",fontSize:14}}>+ ₦12,345.67</Text1>
<Text1 style={{textAlign:"right",fontSize:10}}>12:24PM</Text1>
</View>
</ItemView>})}
 </View>
 </ScrollView>)
}

export default CardInstanceComponent;
const SubTitleText = styled.Text`
color: #7B7F99;
text-align: center;
font-family: Inter;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 22px; /* 157.143% */
letter-spacing: -0.28px;
`;
const EyeIcon = ()=>{
    return (
      <Svg
        width={25}
        height={24}
        viewBox="0 0 25 24"
        fill="none"
      >
        <Path
          d="M2.92 12.713c-.136-.215-.204-.323-.242-.49a1.173 1.173 0 010-.446c.038-.167.106-.274.242-.49C4.046 9.505 7.395 5 12.5 5s8.455 4.505 9.58 6.287c.137.215.205.323.243.49.029.125.029.322 0 .446-.038.167-.106.274-.242.49C20.955 14.495 17.605 19 12.5 19c-5.106 0-8.455-4.505-9.58-6.287z"
          stroke="#8B1D41"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M12.5 15a3 3 0 100-6 3 3 0 000 6z"
          stroke="#8B1D41"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    )
  }
const TopUpIcon = ()=>{
    return (
        <Svg
          width={25}
          height={24}
          viewBox="0 0 25 24"
          fill="none"
        >
          <Path
            d="M8.5 12l4 4m0 0l4-4m-4 4V8m10 4c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10 10 4.477 10 10z"
            stroke="#8B1D41"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      )
}
const WithdrawIcon = ()=>{
    return (
        <Svg
          width={25}
          height={24}
          viewBox="0 0 25 24"
          fill="none"
        >
          <Path
            d="M16.5 12l-4-4m0 0l-4 4m4-4v8m10-4c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10 10 4.477 10 10z"
            stroke="#8B1D41"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      )
}
const MoreIcon = ()=>{
    return (
        <Svg
          width={25}
          height={24}
          viewBox="0 0 25 24"
          fill="none"
        >
          <Path
            d="M12.5 13a1 1 0 100-2 1 1 0 000 2zM12.5 6a1 1 0 100-2 1 1 0 000 2zM12.5 20a1 1 0 100-2 1 1 0 000 2z"
            stroke="#000"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      )
}
const Text1 = styled.Text`
color: rgba(123, 127, 153, 0.50);
text-align: center;
font-family: ${FONTFAMILY.INTER.semiBold};
font-size: 12px;
font-style: normal;
font-weight: 600;
`;
const CardIcon = ()=>{
    return (<Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
  <Path d="M22 10H2M2 8.2L2 15.8C2 16.9201 2 17.4802 2.21799 17.908C2.40973 18.2843 2.71569 18.5903 3.09202 18.782C3.51984 19 4.07989 19 5.2 19L18.8 19C19.9201 19 20.4802 19 20.908 18.782C21.2843 18.5903 21.5903 18.2843 21.782 17.908C22 17.4802 22 16.9201 22 15.8V8.2C22 7.0799 22 6.51984 21.782 6.09202C21.5903 5.7157 21.2843 5.40974 20.908 5.21799C20.4802 5 19.9201 5 18.8 5L5.2 5C4.0799 5 3.51984 5 3.09202 5.21799C2.7157 5.40973 2.40973 5.71569 2.21799 6.09202C2 6.51984 2 7.07989 2 8.2Z" stroke="#8B1D41" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</Svg>
      )
}

const FreezeIcon = ()=>{
    return <Svg  width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M18.0623 8.5L5.93792 15.5M18.0623 8.5L19.1604 4.40192M18.0623 8.5L22.1604 9.59808M5.93792 15.5L1.83984 14.4019M5.93792 15.5L4.83984 19.5981M18.0622 15.4999L5.93784 8.49986M18.0622 15.4999L22.1604 14.4018M18.0622 15.4999L19.1604 19.598M5.93784 8.49986L4.83999 4.40203M5.93784 8.49986L1.83999 9.59819M12.0001 5L12.0001 19M12.0001 5L9.0001 2M12.0001 5L15.0001 2M12.0001 19L9.0001 22M12.0001 19L15.0001 22" stroke="#8B1D41" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
}
const TrashIcon = ()=>{
    return <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M16 6V5.2C16 4.0799 16 3.51984 15.782 3.09202C15.5903 2.71569 15.2843 2.40973 14.908 2.21799C14.4802 2 13.9201 2 12.8 2H11.2C10.0799 2 9.51984 2 9.09202 2.21799C8.71569 2.40973 8.40973 2.71569 8.21799 3.09202C8 3.51984 8 4.0799 8 5.2V6M10 11.5V16.5M14 11.5V16.5M3 6H21M19 6V17.2C19 18.8802 19 19.7202 18.673 20.362C18.3854 20.9265 17.9265 21.3854 17.362 21.673C16.7202 22 15.8802 22 14.2 22H9.8C8.11984 22 7.27976 22 6.63803 21.673C6.07354 21.3854 5.6146 20.9265 5.32698 20.362C5 19.7202 5 18.8802 5 17.2V6" stroke="#8B1D41" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
}