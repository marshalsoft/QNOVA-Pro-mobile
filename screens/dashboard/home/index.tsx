import { View, Text, TouchableOpacity, Platform, StatusBar, ScrollView, Alert, StyleSheet, Image, DeviceEventEmitter } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { BusinessProfileProps, ScreenComponentType } from '../../../includes/types';
import AppContainer from '../../../components/appContainer';
import AppStyles from '../../../includes/styles';
import { ReactNode, useState } from 'react';
import { COLOURS, DEVICE, FONTFAMILY, LISTENERS, LOCALSTORAGE, RELOAD } from '../../../includes/constants';
import * as React from "react"
import Svg, { ClipPath, Defs, G, Path, Pattern, Rect, Use } from "react-native-svg"
import { WalletComponets } from './components/wallets';
import { OperationalMetrixComponets } from './components/operationalMetrix';
import { ExpensisMetrixComponets } from './components/expensisMetrix';
import { MenuComponets } from './components/menuComponents';
import WalletTransferScreen from './components/walletTransfer';
import WalletTransferPreviewScreen from './components/walletTransfer/preview';
import SuccessScreen from './components/walletTransfer/success';
import PINScreen from './components/walletTransfer/pin';
import { BaseModalLoader } from '../../../components/baseLoader';
import useHttp from '../../../includes/http.hooks';
import PaymentRequestScreen from './components/PaymentRequest';
import BulkTransferComponent from './components/BulkTransfer';
import PayRollManagementScreen from './components/PayrollManagement';
import UserManagementScreen from './components/userStaffManagement';
import CustomerManagementScreen from './components/CustomerManagement';
import BillPaymentScreen from './components/BillPayment';
import CardsScreen from './components/Cards';
import ProfileScreen from './components/profile';

import LinearGradient from 'react-native-linear-gradient';
import BusinessList from './components/Business';
import TransactionHistoryScreen from './components/TransferHistory';
import BusinessProfileScreen from './components/BusinessProfile';
import PushNotificationPermission from './components/pushNotificationPermission';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigationRef } from '../../../App';
import { NavigatePop } from '../../../includes/useNavigation';
export type RouteProp = "WalletTransfer" | "BulkTransfer" | "preview" | "success" | "pin" | "PaymentRequest" | "BillPayment" | "StaffManagement" | "PayRollManagement" | "CustomerManagement" | "TransactionHistory" | "Profile" | "Cards" | "Settings" | "Business Profile" | "LinkedAccount" | "OpamProtect" | null
const DashboardScreen = ({ route,Reducer }: ScreenComponentType) => {
  const [listOfUsers, setListOfUsers] = useState<string[]>([
    "",
    ""
  ])
  const [formData, setFormData] = useState<any>();
  const [showMenu, setShowMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showBusinesses, setShowBusinesses] = useState(false);
  const [section, setSection] = useState<RouteProp>(null);
  const { loading,GetWallets,GetCurrentUserDetails,FetchBillers,OpamProtectGetUser } = useHttp();
  const dispatch = useDispatch();
  const GetBusinessProfile = ()=>{
    GetCurrentUserDetails().then((res)=>{
      if (res.data) {
        delete res.data?.inDistress;
        var selectedBusiness:BusinessProfileProps | null = null;
        if(res.data?.businessProfile && Array.isArray(res.data?.businessProfile))
        {
          selectedBusiness = res.data?.businessProfile[0];
        }
        dispatch({ type: "update", payload:{...res.data,selectedBusiness:selectedBusiness}});
      }
      console.log("BVN:",Reducer?.isBvnVerified)
    })
  }
  const GotoFundWallet = ()=>{
    // dispatch({type: "update", payload:{
    //   OpamProtectAccountNumber:{
    //     accountNumber:"0900303030",
    //     accountType:"wallet",
    //     bankCode:"044"
    //   }
    // }});
    setSection("WalletTransfer")
  }
  React.useEffect(()=>{
  OpamProtectGetUser().then((response)=>{
  if(response.data)
  {
    dispatch({type: "update", payload:{...response.data}});
  }
  })
  const eventListener = DeviceEventEmitter.addListener(LISTENERS.fundWallet,GotoFundWallet)
  return ()=>{
    eventListener.remove();
  }
},[])
  
  React.useEffect(()=>{
    GetBusinessProfile()
    FetchBillers("airtime").then((res)=>{
      if(res.data)
      {
        dispatch({type:"update",payload:{airtimeProviders:res.data}})
      }
    })
    // OneSignal.Notifications.addEventListener('click', (event) => {
    // });
  },[])
  
  React.useEffect(()=>{
    FetchBillers("databundle").then((res)=>{
      if(res.data)
      {
        dispatch({type:"update",payload:{dataProviders:res.data}})
      }
    })
  },[])

  React.useEffect(()=>{
    FetchBillers("electricity").then((res)=>{
      if(res.data)
      {
        dispatch({type:"update",payload:{utilityProviders:res.data}})
      }
    })
  },[])

  React.useEffect(()=>{
    FetchBillers("cabletv").then((res)=>{
      if(res.data)
      {
        dispatch({type:"update",payload:{tvProviders:res.data}})
      }
    })
  },[])
  
  React.useEffect(()=>{
    GetWallets().then((res)=>{
      // alert (JSON.stringify(res))
      if(res.data)
      {
        dispatch({type:"update",
          payload:{
          Wallets:res.data
          }
        })
      }
    })
    const x = DeviceEventEmitter.addListener(RELOAD.wallet,({accountNumber})=>{
     if(accountNumber)
     {
      dispatch({type: "update", payload:{
        OpamProtectAccountNumber:{
          accountNumber:accountNumber,
          accountType:"wallet",
          bankCode:"",
          bankName:"Opam Protect Wallet"
        }
      }});
      setSection("WalletTransfer")
      return NavigatePop(2);
     }
      GetWallets().then((res)=>{
        if(res.data)
        {
          dispatch({type:"update",payload:{
            Wallets:res.data
          }})
        }
      })
    })
    return ()=>{
      x.remove();
      // DeviceEventEmitter.removeAllListeners(RELOAD.wallet) 
    }
  },[])
  
  return <View style={{ flex: 1, flexDirection: "column" }}>
    {section === "success" ? <SuccessScreen
      goBack={() => setSection(null)}
    /> : null}
    {section === "pin" ? <PINScreen
      goBack={() => setSection("preview")}
      onValue={(d) => {
        // WalletTransfer(d).then((res) => {
        //   setSection("success");
        // });
      }}
      status="pin"
      subTitle='Enter your transaction PIN to confirm this transaction'
    /> : null}
   
    {section === "WalletTransfer" ? <WalletTransferScreen
      goBack={() => setSection(null)}
      onSuccess={({ data }) => {
        setFormData(data);
        setSection("preview")
      }}
      Reducer={Reducer}
    /> : null}
    {section === "PaymentRequest" ? <PaymentRequestScreen
      goBack={() => setSection(null)}
      onSuccess={({ data }) => {
        setFormData(data);
        setSection("preview")
      }}
      route={{
        params: formData
      }}
    /> : null}
    {section === "BulkTransfer" ? <BulkTransferComponent
      goBack={() => setSection(null)}
      route={{
        params: formData
      }}
    /> : null}
    {section === "PayRollManagement" ? <PayRollManagementScreen
      goBack={() => setSection(null)}
      route={{
        params: formData
      }}
    /> : null}
    {section === "StaffManagement" ? <UserManagementScreen
      goBack={() => setSection(null)}
      route={{
        params: formData
      }}
    /> : null}
    {section === "CustomerManagement" ? <CustomerManagementScreen
      goBack={() => setSection(null)}
      route={{
        params: formData
      }}
    /> : null}
    {section === "BillPayment" ? <BillPaymentScreen
      goBack={() => setSection(null)}
      route={{
        params: formData
      }}
    /> : null}
    {section === "TransactionHistory" ? <TransactionHistoryScreen
      goBack={() => setSection(null)}
      route={{
        params: formData
      }}
    /> : null}
    {section === "Cards" ? <CardsScreen
      goBack={() => setSection(null)}
      route={{
        params: formData
      }}
    /> : null}
  {section === "Business Profile" ? <BusinessProfileScreen
      goBack={() => setSection(null)}
      route={{
        params: formData
      }}
    /> : null}
    {section === null ? <AppContainer
      backgroundColor={COLOURS.defaultWhite}
      footer={<TouchableOpacity
        onPress={() => {
          setShowProfile(false);
          setShowMenu(!showMenu)
        }}
        style={{ position: "absolute", bottom: 50, right: 20 }}
      >
        {!showMenu ? <Image
          source={require("../../../images/menubtn.png")}
          style={{ width: 84, height: 84 }}
          resizeMode='contain'
        /> : <Image
          source={require("../../../images/closemenubtn.png")}
          style={{ width: 84, height: 84 }}
          resizeMode='contain'
        />}
      </TouchableOpacity>}
    >
      <View style={{ flexDirection: "column" }}>
        <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: 60, height: 52 }}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.25)', 'rgba(255, 255, 255, 0)']} style={{
              width: 231,
              height: 52,
              borderRadius: 50,
              borderColor: "rgba(255, 255, 255, 0.25)",
              borderWidth: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              paddingHorizontal: 16,
              paddingVertical: 8
            }}
          >
            <View
             style={{ flexDirection: "row", position: "relative", marginTop: 32, height: 82, width: "100%" }}>
              <View style={{ width:35, height: 50, alignItems: "center", justifyContent: "center", paddingTop: 5}}>
              {Reducer?.businessProfile.map((item:BusinessProfileProps, i:number)=><TouchableOpacity 
              activeOpacity={0.4}
              onPress={()=>{
                setShowBusinesses(true);
              }}
              style={[Styles.avatar, { left: i * 20 ,overflow:"hidden"}]} 
              key={i} 
              >
                <Image 
                style={{width:"100%",height:"100%"}}
                source={{uri:item.companyLogo}}
                resizeMode='cover'
                />
              </TouchableOpacity>)}
              </View>
              <View style={{ flex: 1, flexDirection: "column"}}>
                <Text style={{ color: "#FFF", marginTop: 4, fontSize: 12, fontFamily: FONTFAMILY.Baloo.normal,alignSelf:"center"}}>{Reducer?.selectedBusiness?.companyName}</Text>
                <Text style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: 12,alignSelf:"center", fontFamily: FONTFAMILY.Baloo.normal }}>{Reducer?.selectedBusiness?.companyType}</Text>
              </View>
              <TouchableOpacity 
              activeOpacity={0.8}
              onPress={()=>{
                setShowMenu(false);
                setShowProfile(!showProfile)
              }}
              style={{height:50,justifyContent:"center",alignItems:"center",width:10,marginLeft:10,flexDirection:"row",gap:5}}>
                <ArrowDown />
              {Reducer?.inDistress &&<View style={{width:10,height:10,borderRadius:10,backgroundColor:"#FFCD3D"}} ></View>}
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
        {showProfile ?<ProfileScreen 
        Reducer={Reducer}
        />:!showMenu ? <View style={{ flexDirection: "column",justifyContent:"center"}} >
        <WalletComponets
        wallets={Reducer?.wallets!}
        />
        <OperationalMetrixComponets />
        <ExpensisMetrixComponets />
        </View>:<View  style={{flex:1,flexDirection:"column"}}>
          <MenuComponets
          Reducer={Reducer!}
          goTo={(d) => {
            if(d === "Profile")
            {
              return setShowProfile(true)
            }
            if(d === null)
            {
              return setShowMenu(false);
            }
            setSection(d);
          }}
        />
        </View>}
      </View>
    </AppContainer> : null}
    {showBusinesses && <BusinessList
    onClose={()=>{
      setShowBusinesses(false);
    }}
    list={Reducer?.businessProfile!}
    onValue={()=>{}}
    selectedBusiness={Reducer?.selectedBusiness!}
    />}
    {loading && <BaseModalLoader />}
  </View>
}
const MapStateToProps = (state: any) => {
  return state;
};
export default connect(MapStateToProps)(DashboardScreen);

const Styles = StyleSheet.create({
  avatar: {
    backgroundColor: "rgba(217, 217, 217, 1)",
    borderRadius: 36,
    width: 36,
    height: 36,
    borderColor: "rgba(80, 80, 80, 1)",
    borderWidth: 1,
    position: "absolute",
    top: 6
  },
  card: {
    flexDirection: "column",
    width: DEVICE.width - 50,
    height: 242,
  }
})


const ArrowDown = () => {
  return (
    <Svg
      width={11}
      height={6}
      viewBox="0 0 11 6"
      fill="none"
    >
      <Path
        d="M1.5 1l4 4 4-4"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}



