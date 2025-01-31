import React,{} from "react"
import Svg, { Rect, Path } from "react-native-svg"
import { ScrollView, Text, StyleSheet, View, TouchableOpacity, Image, TextInput } from "react-native";
import { ItemProps, ScreenComponentType } from "../../../../../includes/types";
import { COLOURS, DEVICE, FONTFAMILY, ROUTES, ValidateNigerianMobile, ValidateNigerianMobile2 } from "../../../../../includes/constants";
import { RefObject, useEffect, useRef, useState } from "react";
import AppContainer from "../../../../../components/appContainer";
import * as y  from 'yup';
const FormSchema = y.object({
    accountType:y.string().required('Account type is required.'),
    accountNumber:y.string().required('Account Number is required.').min(10,'Account Number must be 10 digits.'),
    accountName:y.string().required('Account Name is required.'),
    amount:y.string().required('Amount is required.').max(12,'Maximum of 12 characters.'),
    narration:y.string().required('Narration is required.')
});
import styled from "styled-components/native";
import PINScreen from "../walletTransfer/pin";
import SuccessScreen from "../walletTransfer/success";
import UserDetailComponent from "./UserDetails";
import NewStaffComponent from "./newStaff";
import useHttp from "../../../../../includes/http.hooks";
import { connect } from "react-redux";
import { BaseModalLoader } from "../../../../../components/baseLoader";
type SectionProp = "User & Staff Management" | "User Details" | "New Staff" | "pin" | "success";
export interface StaffProps {
  fullName?:string;
  email?:string;
  role?:StaffRolProps | string;
  username?:string;
  country?:string;
  activatedAt?:string;
  invitationCode?:string;
  accountStatus?:string;
  createdAt?:string;
  updatedAt?:string;
  organizationId?:string;
  primaryPhoneNumber?:string;
  company?:string;
  id?:string;
  avatar?:string;
}
export type StaffRolProps = "Super Admin" | "Admin" | "Accountant" | "Auditor";
export const tabs:string[] = [
  "All",
  "Admin",
  "Auditor",
  "Accountant",
  "Staff"
];
interface ListOfRolesProps {
  title:StaffRolProps;
}
const UserManagementScreen = ({route,goBack,Reducer,onSuccess}: ScreenComponentType) => {
  const {GetAllStaffs,ShowMessage,CreateStaff,loading} = useHttp();
  const [listOfRoles,setListOfRoles] = useState<ListOfRolesProps[]>([
    {title:"Super Admin"},
    {title:"Admin"},
    {title:"Auditor"},
    {title:"Accountant"}
  ])
  const [message,setMessage] = useState<string>("");
  const [filterText,setFilterText] = useState<string>("");
  const [selected,setSelected] = useState<number>(0)
  const [selectedTab,setSelectedTab] = useState<string>("All");
  const [saveData,setSaveData] = useState<any>();
    const [selectedItem,setSelectedItem] = useState<any>();
    const [section,setSection] = useState<SectionProp>("User & Staff Management");
    const [list,setList] = useState<StaffProps[]>([])
    const placeHolder = Array.from({length:7}).map((a,i)=>{
      return {}
    })
const GetStaffs = ()=>{
  GetAllStaffs({
    data:{},
    profileId:Reducer?.selectedBusiness?.regNumber!
  }).then((res)=>{
if(res.status)
{
  setList(res.data)
}
})
}
var searchText = String(filterText).toLowerCase();
if(searchText === "All")
{
  searchText = "";
}
    useEffect(()=>{
      GetStaffs()
    },[])
   
    if(section === "pin")
      {
      return <View style={{flexDirection:"column",flex:1}}>
        <PINScreen
      goBack={()=>setSection("New Staff")}
      password
      title="Password"
      subTitle="Enter your current password to proceed."
      onValue={(pin)=>{
      CreateStaff({
        profileId:Reducer?.selectedBusiness?.regNumber!,
        data:{...saveData.data,password:pin}
      }).then((res)=>{
        if(res.status)
        {
          GetStaffs();
          setMessage(res.message);
          setSelected(0)
          setSection("success");
        }
      })
       
      }}
      data={{}}
      status="pin"
      />
      {loading && <BaseModalLoader modal />}
      </View>
    }
    if(section === "success")
      {
      return <SuccessScreen 
      message={message}
      goBack={()=>setSection("User & Staff Management")}
      hideShareBtn
      />
      }
     return <AppContainer
    showNavBar
    white
    goBack={()=>{
        if(section === "User & Staff Management")
        {
            if(goBack)
            {
            goBack();
            }
        }else{
            setSection("User & Staff Management")
        }
    }}
    title={section}
    footer={section === "User & Staff Management" ?<TouchableOpacity 
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
{section === "User Details"?<UserDetailComponent
goBack={()=>setSection("User & Staff Management")}
route={{
    params:selectedItem
}}
Reducer={Reducer}
/>:null}

{section === "New Staff"?<NewStaffComponent
goBack={()=>setSection("User & Staff Management")}
route={{
    params:selectedItem
}}
onSuccess={(data)=>{
  setSaveData(data);
  setSection("pin");
}}
/>:null}
{section === "User & Staff Management"?<View style={{backgroundColor:"#F2F2F2",flexDirection:"column",padding:24,height:DEVICE.height,borderTopRightRadius:20,borderTopLeftRadius:20}}>
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
setFilterText(d)

}}
value={filterText}
/>
</SearchContainer>
<TouchableOpacity 
onPress={()=>{
    setSection("New Staff");
}}
>
<PlusIcon />
</TouchableOpacity>
</View>
<View style={{flexDirection:"row",height:50,backgroundColor:"#7B7F991A",borderRadius:16,padding:5,marginTop:20}}>
            <TouchableOpacity 
            onPress={()=>setSelected(0)}
            style={{flex:1,justifyContent:"center",alignItems:"center",borderRadius:12,backgroundColor:selected === 0?COLOURS.white:"transparent"}}
            >
                <Text style={{fontFamily:FONTFAMILY.INTER.normal,color:selected === 0?COLOURS.purple:COLOURS.gray64,fontSize:14}}>Staff</Text>
            </TouchableOpacity>
            <TouchableOpacity 
             onPress={()=>setSelected(1)}
            style={{flex:1,justifyContent:"center",alignItems:"center",borderRadius:12,backgroundColor:selected !== 0?COLOURS.white:"transparent"}}
            >
                <Text style={{fontFamily:FONTFAMILY.INTER.normal,color:selected !== 0?COLOURS.purple:COLOURS.gray64,fontSize:14}}>Roles</Text>
            </TouchableOpacity>
</View>
<View style={{height:50,width:"100%",marginTop:5}}>
<ScrollView 
horizontal
>
<View style={{flexDirection:"row",alignItems:"center"}}>
{tabs.map((item,index)=><TouchableOpacity
onPress={()=>{
  setSelectedTab(item)
  setFilterText(item)
}}
style={{paddingHorizontal:20,paddingVertical:16,borderBottomColor:selectedTab === item?COLOURS.purple:"transparent",borderBottomWidth:2}}
>
 <Text1 style={{color:selectedTab === item?COLOURS.purple:"rgba(123, 127, 153, 0.50)"}}>{item}</Text1>
</TouchableOpacity>)}
</View>
</ScrollView>
</View>
{selected === 0?<View style={{flexDirection:"column",gap:10,marginTop:20}}>
{[...list.filter((item:StaffProps,index)=> String(item.accountStatus).toLowerCase().includes(searchText.toLowerCase()) || String(item.fullName).toLowerCase().includes(searchText.toLowerCase())  || String(item.role).toLowerCase().includes(searchText.toLowerCase())),...placeHolder.filter((a,i)=>i > list.length)].map((item:StaffProps,index)=><ItemView 
onPress={()=>{
  if(item?.email)
  {
    setSelectedItem(item);
    setSection("User Details") 
  }
}}
activeOpacity={item?.email?0:1}
 >
 <View style={{flexDirection:"column",flex:1,justifyContent:"flex-start",alignItems:"flex-start"}}>
 <Text1 style={{fontSize:14,color:COLOURS.black}}>{item?.fullName}</Text1>
 <Text1  style={{fontSize:10,marginTop:8}}>{item?.email}</Text1>
 </View>
 <View style={{flexDirection:"column",justifyContent:"flex-end",alignItems:"flex-end"}}>
 <Text1  style={{fontSize:14,color:COLOURS.black}}>{item?.role}</Text1>
 </View>
 </ItemView>)}
</View>:<View style={{flexDirection:"column",gap:10,marginTop:20}}>
{listOfRoles.map((item:ListOfRolesProps,index)=>{
 const count = list.filter((a,i)=>String(a.role).toLowerCase() === String(item.title).toLowerCase()).length;
 return <ItemView 
onPress={()=>{
  if(count === 0)
  {
  return ShowMessage("top").fail("No result found!")
  }
  setSelectedTab(item.title);
  setSelected(0);
}}

 >
 <View style={{flexDirection:"column",flex:1,justifyContent:"flex-start",alignItems:"flex-start"}}>
 <Text1 style={{fontSize:14,color:COLOURS.black}}>{item?.title}</Text1>
 <Text1  style={{fontSize:10,marginTop:8}}>{count} Staffs</Text1>
 </View>
 </ItemView>})}
</View>} 
</View>:null}
</AppContainer>
}

const MapStateToProps = (state: any) => {
  return state;
};
export default connect(MapStateToProps)(UserManagementScreen);

export const SearchContainer = styled.View`
height: 56px;
align-items: center;
flex: 1 0 0;
border-radius: 12px;
background: #FFF;`


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
export const SearchIcon = ()=>{
    return (
        <Svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
        >
          <Path
            d="M21 21l-4.35-4.35M19 11a8 8 0 11-16 0 8 8 0 0116 0z"
            stroke="#7B7F99"
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