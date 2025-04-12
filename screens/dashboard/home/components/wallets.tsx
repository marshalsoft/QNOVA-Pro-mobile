import { View,Text, TouchableOpacity, Platform, StatusBar, ScrollView, Alert, StyleSheet, DeviceEventEmitter } from 'react-native';
import { connect } from 'react-redux';
import { ScreenComponentType, WalletProps } from '../../../../includes/types';
import AppContainer from '../../../../components/appContainer';
import AppStyles from '../../../../includes/styles';
import { ReactNode, useState } from 'react';
import { COLOURS, CURRENCIES, DEVICE, FONTFAMILY, LISTENERS, ROUTES } from '../../../../includes/constants';
import LinearGradient from 'react-native-linear-gradient';
import * as React from "react"
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg"
import { CopyText, ReturnComma, ReturnMaskAll, ReturnNumberMask } from '../../../../includes/functions';
import FundWallet from '../../../opamProtect/modals/fundeWallet';
import { navigationRef } from '../../../../App';
import { EyeClosed, EyeOpen } from '../../../../components/svgs/eyeClosed';
interface WalletComponetsProps {
  wallets:WalletProps[]
}
export const WalletComponets = (props:WalletComponetsProps)=>{
  const [showFundWallet,setShowFundWallet] = useState<boolean>(false)
  const [toggle,setToggle] = useState<boolean>(false)
  const [wallets,setWallets] = useState<WalletProps[]>([
      {
        balance:"0.00",
        accountNumber:"",
        createdAt:"",
        currency:"NGN",
        id:"",
        isDisabled:false,
        isDistressWallet:false,
        isLocked:false,
        isMain:true,
        lockExpiration:"",
        name:"Main Wallet",
        type:"",
        updatedAt:"",
        userId:"",
      }
    ]);
    React.useEffect(()=>{
      if(props.wallets && props.wallets.length !== 0)
      {
        setWallets(props.wallets);
      }
    },[props.wallets])
    const handleToggle = ()=>{
      setToggle(!toggle)
    }
    return  <View >
      <ScrollView 
    horizontal
    pagingEnabled
    >
<View style={{padding:16,flexDirection:"row",gap:5}}>
{wallets.map((item,index)=>{
  var balance = "0";
  var sub = "00";
  if(String(item.balance).includes("."))
  {
    const splitBalance = String(item.balance).split(".");
    balance = splitBalance[0];
    sub = splitBalance[1];
  }else{
    balance = item.balance;
  }
  return <View key={index}  style={{width:DEVICE.width-32,justifyContent:"center",alignItems:"center"}} >
<View style={Styles.card}>
<LinearGradient 
colors={['rgba(255, 255, 255, 0.25)', 'rgba(255, 255, 255, 0)']} style={{
width:DEVICE.width - 40,
height:282,
borderRadius:8,
borderColor:"rgba(255, 255, 255, 0.25)",
borderWidth:1,
justifyContent:"center",
alignItems:"center",
flexDirection:"row",
paddingHorizontal:16,
paddingVertical:8,
position:"absolute",
left:-6,
top:0
}}
/>
<View 
style={{
padding:8,
paddingHorizontal:12
}}
>
<Text style={{color:"rgba(255,255,255,1)",fontSize:12,fontFamily:FONTFAMILY.INTER.normal}}>{item.name}</Text>
<View 
style={{
flexDirection:"row",
alignItems:"center",
justifyContent:"center",
marginTop:30
}}
>
<Text style={{color:"rgba(255,255,255,1)",fontSize:12,fontFamily:FONTFAMILY.INTER.normal}}>Total Revenue</Text>
<Text style={{color:"rgba(255,255,255,0.25)",fontSize:12,fontFamily:FONTFAMILY.INTER.normal}}> Account Balance</Text>
</View>
<View 
style={{
flexDirection:"row",
alignItems:"center",
justifyContent:"center",
marginTop:16
}}
>
<Text style={{color:"rgba(255,255,255,1)",fontWeight:"500",fontSize:20,fontFamily:FONTFAMILY.INTER.normal}}>{CURRENCIES.Naira.Symbol}</Text>
<Text style={{color:"rgba(255,255,255,1)",fontWeight:"700",fontSize:35,fontFamily:FONTFAMILY.INTER.normal}}>{toggle?ReturnMaskAll(balance,true):balance}</Text>
<Text style={{color:"rgba(255,255,255,1)",fontWeight:"500",fontSize:20,fontFamily:FONTFAMILY.INTER.normal}}>.{toggle?ReturnMaskAll(sub,true):sub}</Text>
<TouchableOpacity 
style={{paddingLeft:5}}
onPress={handleToggle}
>
  {!toggle?<EyeClosed size={15} color='white' />:<EyeOpen size={15} color='white' />}
</TouchableOpacity>
</View>
<View 
style={{
flexDirection:"row",
alignItems:"center",
justifyContent:"center",
marginTop:16
}}
>
<Wave1 />
<Text style={{color:"#33B469",fontWeight:"700",fontSize:12,fontFamily:FONTFAMILY.INTER.normal,marginRight:16}}>0.00</Text>
<Wave2 />
</View>
<FundWalletBtn
onPress={()=>setShowFundWallet(true)}
/>
<View 
style={{
flexDirection:"row",
alignItems:"center",
justifyContent:"center",
marginTop:16,
gap:10
}}
>
{props.wallets.map((a,i)=><View key={i} style={{width:8,height:8,borderRadius:8,backgroundColor:i === 0?"rgba(222, 173, 0, 1)":"rgba(123, 127, 153, 0.5)"}}></View>)}
</View>
<View 
style={{
flexDirection:"row",
alignItems:"center",
justifyContent:"center",
marginTop:16,
}}
>
<View style={{flex:1}}>
<Text style={{color:"rgba(255,255,255,1)",fontSize:12,fontFamily:FONTFAMILY.INTER.normal}}>Acc. No.:</Text>
</View>
<View style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"flex-end"}}>
<Text style={{color:"rgba(255,255,255,1)",fontSize:12,marginHorizontal:5,fontFamily:FONTFAMILY.INTER.normal}}>{item.accountNumber}</Text>
<TouchableOpacity 
onPress={()=>{
  CopyText(item.accountNumber)
}}
>
<CopyIcon />
</TouchableOpacity>
</View>
</View>
</View>
</View>
</View>})}
</View>
</ScrollView>
<FundWallet 
visible={showFundWallet}
onClose={()=>setShowFundWallet(false)}
gotoFundWallet={()=>{
  DeviceEventEmitter.emit(LISTENERS.fundWallet,{})
  setShowFundWallet(false);
}}
/>
</View>
}
const Wave2 = ()=> {
    return (
      <Svg
        width={53}
        height={13}
        viewBox="0 0 53 13"
        fill="none"
      >
        <Path
          d="M51.5 4.127l-6.341 6.981a1 1 0 01-1.538-.068l-5.97-7.878a1 1 0 00-1.155-.33l-6.322 2.432a1 1 0 01-.263.062l-6.649.639a1 1 0 01-.669-.176L16.117 1.26a1 1 0 00-.815-.15L8.566 2.79a1 1 0 00-.173.06L1.5 6.002"
          stroke="#00A551"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </Svg>
    )
  }
  const Styles = StyleSheet.create({
    avatar:{
      backgroundColor: "rgba(217, 217, 217, 1)",
      borderRadius:36,
      width:36,
      height:36,
      borderColor:"rgba(80, 80, 80, 1)",
      borderWidth:1,
      position:"absolute",
      top:6
    },
    card:{
      flexDirection:"column",
      width:DEVICE.width - 50,
      height:282,
    }
   })
  const CopyIcon = ()=>{
    return (
      <Svg
        width={16}
        height={16}
        viewBox="0 0 16 16"
        fill="none"
      >
        <Path
          d="M5 2h4.733c1.494 0 2.24 0 2.811.29.502.256.91.664 1.165 1.166.291.57.291 1.317.291 2.81V11m-9.867 3h5.4c.747 0 1.12 0 1.406-.145.25-.128.454-.332.582-.583.146-.285.146-.659.146-1.405v-5.4c0-.747 0-1.12-.146-1.406a1.333 1.333 0 00-.582-.582c-.286-.146-.659-.146-1.406-.146h-5.4c-.746 0-1.12 0-1.405.146-.25.127-.455.331-.583.582C2 5.347 2 5.72 2 6.467v5.4c0 .746 0 1.12.145 1.405.128.25.332.455.583.583.285.145.659.145 1.405.145z"
          stroke="#fff"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    )
  }
  const Wave1 = ()=>{
    return (
      <Svg
        width={13}
        height={13}
        viewBox="0 0 13 13"
        fill="none"
      >
        <G clipPath="url(#clip0_2104_14782)">
          <Path
            d="M11.5 4L7.566 7.934c-.198.198-.297.297-.411.334a.5.5 0 01-.31 0c-.114-.037-.213-.136-.41-.334l-1.37-1.368c-.197-.198-.296-.297-.41-.334a.5.5 0 00-.31 0c-.114.037-.213.136-.41.334L1.5 9m10-5H8m3.5 0v3.5"
            stroke="#33B469"
            strokeWidth={1.33}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </G>
        <Defs>
          <ClipPath id="clip0_2104_14782">
            <Path fill="#fff" transform="translate(.5 .5)" d="M0 0H12V12H0z" />
          </ClipPath>
        </Defs>
      </Svg>
    )
  }
  const FundWalletBtn = ({onPress}:{onPress:()=>void;})=>{
    return <TouchableOpacity 
    onPress={onPress}
    style={{height:30,alignSelf:"center",marginVertical:10}}
    >
<LinearGradient 
colors={['rgba(255, 255, 255, 0.25)', 'rgba(255, 255, 255, 0)']} style={{
width:141,
height:40,
borderRadius:20,
borderColor:"rgba(255, 255, 255, 0.25)",
borderWidth:1,
justifyContent:"center",
alignItems:"center",
flexDirection:"row",
paddingHorizontal:12
}}
> 
<PlusIcon />
<Text style={{color:"rgba(255,255,255,1)",flex:1,fontSize:12,fontFamily:FONTFAMILY.INTER.semiBold,textAlign:"center"}}>Fund Account</Text>
</LinearGradient>
    </TouchableOpacity>
  }

  const PlusIcon = ()=>{
    return (
      <Svg
        width={17}
        height={18}
        viewBox="0 0 17 18"
        fill="none"
      >
        <Path
          d="M15.375.75H1.625A1.375 1.375 0 00.25 2.125v13.75a1.375 1.375 0 001.375 1.375h13.75a1.375 1.375 0 001.375-1.375V2.125A1.375 1.375 0 0015.375.75zm-2.063 8.938H9.189v4.124a.687.687 0 01-1.376 0V9.689H3.688a.688.688 0 110-1.376h4.126V4.189a.688.688 0 111.375 0v4.125h4.124a.687.687 0 010 1.374z"
          fill="#fff"
        />
      </Svg>
    )
  }
  
