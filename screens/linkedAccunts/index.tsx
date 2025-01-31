
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { ScreenComponentType } from '../../includes/types';
import AppContainer from '../../components/appContainer';
import { navigationRef } from '../../App';
import { COLOURS, DEVICE, FONTFAMILY, ROUTES } from '../../includes/constants';
import useHttp from '../../includes/http.hooks';
import styled from 'styled-components/native';
import BaseCheckBox from '../../components/baseCheckBox';
import BaseSelect from '../../components/baseSelect';
import Card from '../../components/card';
import ArrowRight from '../../components/svgs/arrowRight';
import ArrowUpIcon from '../../components/svgs/arrowUp';
import BaseSwitch from '../../components/baseSwitch';
import { useSharedValue } from 'react-native-reanimated';
import { SearchContainer, SearchIcon } from '../dashboard/home/components/userStaffManagement';
import Svg, { Rect, Path } from "react-native-svg"
import { ReturnComma } from '../../includes/functions';
import NewAccountComponent from './newAccount';
import PINScreen from '../dashboard/home/components/walletTransfer/pin';
type SectionProp = "Linked Accounts" | "New Linked Account" | "Enter your Transaction PIN" | "success";

const LinkedAccountsScreen = ({route,Reducer}:ScreenComponentType) => {
  const {loading,GetLinkedAccounts} = useHttp();
  const position = useSharedValue(0);
  const [selectedItem,setSelectedItem] = useState<any>();
  const [searchText,setSearchText] = useState<string>("");
  const [sending,setSending] = useState<boolean>(false);
  const [formData,setFormData] = useState<any>(
  );
    const [section,setSection] = useState<SectionProp>("Linked Accounts");
    const [list,setList] = useState<any[]>([
    ])
    const [placeHolder,setPlaceHolderList] = useState<any[]>(Array.from({length:7}).map((a,i)=>{
      return {}
}))
const GetAllAccounts = ()=>{
  GetLinkedAccounts();
}
useEffect(()=>{
  GetAllAccounts();
},[])
  if(section === "success")
  {
    return null;
  }
    return <AppContainer
    showNavBar
    goBack={()=>{
        navigationRef.current?.goBack();
    }}
    disableScrol
    title={section}
    white
    isRefresh={loading}
    onRefresh={()=>{
      GetAllAccounts();
    }}
    >
    <View style={{backgroundColor:"#F2F2F2",flexDirection:"column",padding:24,height:DEVICE.height,borderTopRightRadius:20,borderTopLeftRadius:20}}>
    <ScrollView
    nestedScrollEnabled
    showsVerticalScrollIndicator={false}
    >
    {section === "Linked Accounts"?<View style={{flexDirection:"column"}}>
    <View style={{flexDirection:"row",alignItems:"center",gap:20}}>
<SearchContainer style={{flex:1,justifyContent:"center"}}>
    <View 
    style={{position:"absolute",left:12}}
    >
    <SearchIcon />
    </View>
<TextInput 
style={{width:"100%",paddingHorizontal:44}}
placeholder="Search"
onChangeText={(d)=>{
  setSearchText(d);
}}
/>
</SearchContainer>
<TouchableOpacity 
onPress={()=>{
    setSection("New Linked Account");
}}
>
<PlusIcon
/>
</TouchableOpacity>
</View>
<View style={{flexDirection:"column",gap:10,marginTop:20}}>
{[...list.filter((a,i)=>a.groupName?.includes(searchText)),...placeHolder.filter((a,i)=>list.length < i)].map((item,index)=><ItemView 
onPress={()=>{
  if(item.groupName)
  {
    // setSection("Confirm Details");
  }
}}
 >
 <View style={{flexDirection:"column",flex:1,justifyContent:"flex-start",alignItems:"flex-start"}}>
 <Text1 numberOfLines={1} style={{fontSize:14,color:COLOURS.black}}>{item.groupName?item.groupName:""}</Text1>
 <Text1  style={{fontSize:10,marginTop:8}}>{item.groupName?`${item.beneficiaries?.length} Beneficiaries`:""}</Text1>
 </View>
 <View style={{flexDirection:"column",justifyContent:"flex-end",alignItems:"flex-end"}}>
 <Text1  style={{fontSize:14,color:COLOURS.black}}>{item.groupName?`₦${ReturnComma(String(item.totalAmount))}`:""}</Text1>
 </View>
 </ItemView>)}
 </View>
    </View>:null}
    {section === "New Linked Account"?<NewAccountComponent 
    onSuccess={()=>{
      GetAllAccounts();
      setSection("Linked Accounts");
    }}
    />:null}
    {section === "Enter your Transaction PIN"?<View style={{flexDirection:"column"}}>
      <PINScreen 
      goBack={()=>setSection("New Linked Account")}
      onValue={()=>{}}
      status='pin'
      subTitle='Enter your transaction PIN to confirm this transaction'
      />
    </View>:null}
    </ScrollView>
    </View>
    </AppContainer>
}
const MapStateToProps = (state: any) => {
    return state;
  };
  export default connect(MapStateToProps)(LinkedAccountsScreen);

const Text1 = styled.Text`
color: rgba(123, 127, 153, 0.50);
text-align: center;
font-family: ${FONTFAMILY.INTER.semiBold};
font-size: 12px;
font-style: normal;
font-weight: 600;
`;
const ItemView = styled.TouchableOpacity`
border-radius: 12px;
background: #FFF;
display: flex;
height: 72px;
padding: 16px 12px;
justify-content: space-between;
align-items: center;
flex-direction:row;
`;
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