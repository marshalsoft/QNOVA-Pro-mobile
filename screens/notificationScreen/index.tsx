
import React from 'react';
import { View,Text, TouchableOpacity, Platform, StatusBar, ScrollView, Alert } from 'react-native';
import { Formik, FormikValues } from 'formik';
import * as y  from 'yup';
import { connect } from 'react-redux';
import { ScreenComponentType, UserLoginProps } from '../../includes/types';
import AppContainer from '../../components/appContainer';
import { navigationRef } from '../../App';
import BaseInput from '../../components/baseInput';
import TopSection from '../../components/topSection';
import Card from '../../components/card';
import { COLOURS, FONTFAMILY, ROUTES } from '../../includes/constants';
import BaseButton from '../../components/baseButton';
import useHttp from '../../includes/http.hooks';

  const NotificationScreen = ({route}:ScreenComponentType) => {
    return <AppContainer 
    showNavBar={true}
    goBack={()=>{
    navigationRef.current?.goBack() 
    }}
    backgroundColor={COLOURS.defaultWhite}
    >
      <View >
        <Text>Notification Screen</Text>
      </View>
    </AppContainer>
}
const MapStateToProps = (state: any) => {
    return state;
  };
  export default connect(MapStateToProps)(NotificationScreen);
  