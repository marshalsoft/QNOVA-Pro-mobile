import React, { RefObject, useEffect, useRef, useState } from 'react';
import { View,Text, TouchableOpacity, Platform, StatusBar, ScrollView, Alert } from 'react-native';
import { Formik, FormikValues } from 'formik';
import * as y  from 'yup';
import { connect } from 'react-redux';
import { BusinessRegFormProps, ScreenComponentType, SignUpFormProps, UserLoginProps } from '../../../includes/types';
import AppContainer from '../../../components/appContainer';
import { navigationRef } from '../../../App';
import BaseInput from '../../../components/baseInput';
import TopSection from '../../../components/topSection';
import Card from '../../../components/card';
import { COLOURS, DEVICE, FONTFAMILY, ROUTES, ValidateNigerianMobile } from '../../../includes/constants';
import BaseButton from '../../../components/baseButton';
import useHttp from '../../../includes/http.hooks';
import { ReturnAllNumbers, ReturnDOB, ReturnMobile } from '../../../includes/functions';
import BaseInputDate from '../../../components/baseInputDate';
import AppStyles from '../../../includes/styles';
import BlockedIcon from '../../../components/svgs/blockedIcon';
import CorporateInfoForm from './forms/corporateInforForm';
import CheckedIcon, { CheckedIconAlt } from '../../../components/svgs/checkedIcon';
import DirectorsForm from './forms/directorsForm';
import ShareHolderForm from './forms/shareHolderForm';
export interface FormsProp {
  status:boolean;
  focus:boolean;
  index:number;
}

  const RegisteredBusinessScreen = ({route}:ScreenComponentType) => {
  const thisScrolView = useRef(null) as RefObject<ScrollView>
  const {VerifyMobileNumber,loading} = useHttp();
  const [forms,setForms] = useState<FormsProp[]>([
    {status:false,focus:true,index:0},
    {status:false,focus:false,index:1},
    {status:false,focus:false,index:2}
  ])
  const [formData,setFormData] = useState<BusinessRegFormProps>();
    useEffect(()=>{
      const focused = forms.find((a,i)=>a.focus);
      if(focused)
      {
      thisScrolView.current?.scrollTo({x:DEVICE.width * focused.index,y:0,animated:true})
      }

    },[forms])
    return <AppContainer 
    disableScrol
    showNavBar={true}
    goBack={()=>{
    navigationRef.current?.goBack() 
    }}
    title={<Text style={[AppStyles.topSectionSubTitleText]}>Business Registration</Text>}
    backgroundColor={COLOURS.defaultWhite}
    
    >
      <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",marginBottom:10,width:"80%",alignSelf:"center",height:50}}>
      <View style={{height:1,backgroundColor:COLOURS.purple,width:"100%",position:"absolute",left:0}}></View>
        {forms.map((a,i)=>{
          return <View 
          style={[{backgroundColor:COLOURS.defaultWhite,width:50,height:50,justifyContent:"center",alignItems:"center"},i == 0?{left:0,position:"absolute"}:i === forms.length-1?{right:0,position:"absolute"}:null]}
          >
          <TouchableOpacity 
          onPress={()=>{
            const formlist = forms.map((item,index)=>{
              if(i == index)
              {
                item.focus = true;
              }else{
                item.focus = false; 
              }
              return item;
            })
            if(formlist[i].status)
            {
            setForms(formlist);
            thisScrolView.current?.scrollTo({x:DEVICE.width * i,y:0,animated:true});
            }
          }}
          key={i} 
          style={[AppStyles.indicatorWrapper,a.status?{borderColor:COLOURS.purple,borderWidth:2,backgroundColor:COLOURS.purple}:{borderWidth:0,backgroundColor:a.focus?COLOURS.purple:COLOURS.inActive}]}>
        <View style={[AppStyles.activeIndicator,a.status?{borderColor:COLOURS.white}:{backgroundColor:a.focus?COLOURS.purple:COLOURS.inActive,borderColor:a.focus?COLOURS.purple:COLOURS.inActive}]}>
          {a.status?<CheckedIconAlt color={COLOURS.white} size={25} />:<Text style={[AppStyles.whiteText,{fontSize:12,color:a.focus?COLOURS.white:COLOURS.purple}]}>{i+1}</Text>}
          </View> 
        </TouchableOpacity>
        </View>
      })}
      </View>
      <ScrollView 
      horizontal
      style={{width:"100%",height:"100%"}}
      ref={thisScrolView}
      pagingEnabled={true}
      >
    <CorporateInfoForm
    businessName={route?.params.businessName}
    onValue={(data:BusinessRegFormProps)=>{
      setFormData({...formData,...data});
      setForms(forms.map((a,i)=>{
        if(i == 0)
        {
          a.status = true;
        }
        if(i == 1)
          {
            a.focus = true;
          }else{
            a.focus = false;
          }
        return a
      }))
    }}
    resetStatus={()=>{
      setForms(forms.map((a,i)=>{
        if(i == 0)
        {
          a.status = true;
        }
        return a
      }))
    }}
    />
    <DirectorsForm
    businessName={route?.params.businessName}
    onValue={(data:BusinessRegFormProps)=>{
      setFormData({...formData,...data});
      setForms(forms.map((a,i)=>{
        if(i !== 2)
        {
          a.status = true;
        }
        if(i == 2)
          {
            a.focus = true;
          }else{
            a.focus = false;
          }
        return a
      }))
    }}
    resetStatus={()=>{
      setForms(forms.map((a,i)=>{
        if(i == 0)
        {
          a.status = true;
        }
        return a
      }))
    }}
    />
    <ShareHolderForm
    businessName={route?.params.businessName}
    onValue={(data:BusinessRegFormProps)=>{
      setFormData({...formData,...data});
      setForms(forms.map((a,i)=>{
        if(i !== 2)
        {
          a.status = true;
        }
        if(i == 2)
          {
            a.focus = true;
          }else{
            a.focus = false;
          }
        return a
      }))
    }}
    resetStatus={()=>{
      setForms(forms.map((a,i)=>{
        if(i == 0)
        {
          a.status = true;
        }
        return a
      }))
    }}
    />
    </ScrollView>
    </AppContainer>
}
const MapStateToProps = (state: any) => {
    return state;
  };
  export default connect(MapStateToProps)(RegisteredBusinessScreen);
  