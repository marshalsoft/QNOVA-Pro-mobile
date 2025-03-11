/* eslint-disable prettier/prettier */
import React, { RefObject, createRef, useEffect } from 'react';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CardStyleInterpolators } from '@react-navigation/stack';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import IntroScreen from './screens/introScreen/splashScreen';
import LoginScreen from './screens/loginScreen';
import SignUpScreen from './screens/signUpScreen';
import { ROUTES } from './includes/constants';
import ForgotPasswordScreen from './screens/forgotPasswordScreen';
import ForgotPasswordOTPScreen from './screens/forgotPasswordOTPScreen';
import UnRegisteredBusinessScreen from './screens/signUpScreen/unRegisteredBusiness';
import RegisteredBusinessScreen from './screens/signUpScreen/registeredBusiness';
import VerifyMobileIndividualAccountScreen from './screens/signUpScreen/unRegisteredBusiness/otp';
import BusinessDetailsScreen from './screens/signUpScreen/businessDetails';
import KeyContactDetailsScreen from './screens/signUpScreen/keyContactDetailsScreen';
import UploadDocumentsScreen from './screens/signUpScreen/uploadDocumentsScreen';
import TypeOfBusinessScreen from './screens/signUpScreen/typeOfBusiness';
import SuccessScreen from './screens/signUpScreen/sucessScreen';
import FormPreviewScreen from './screens/signUpScreen/unRegisteredBusiness/forms/formPreview';
import WelcomeScreen from './screens/loginScreen/welcomeBackScreen';
import MobileScreen from './screens/loginScreen/mobileNumberScreen';
import PolicyScreen from './screens/policy/index';
import HomeScreen from './screens/dashboard/home/index';
import NotificationScreen from './screens/notificationScreen';
import VerificationScreen from './screens/verificationScreen';
import OtpScreen from './screens/verificationScreen/otp';
import CreateAccountScreen from './screens/signUpScreen/createAccount';
import HasBusinessScreen from './screens/signUpScreen/registeredBusiness/hasBusinessScreen';
import CreatePINScreen from './screens/signUpScreen/createPINScreen';
import OpamProtectScreen from './screens/opamProtect';
import NextOfKinScreen from './screens/opamProtect/screens/nextOfKin';
import CreateDistressPINScreen from './screens/opamProtect/screens/createDistressPIN';
import OpamProtectManageScreen from './screens/opamProtect/screens/manage';
import CreateDistressAccountScreen from './screens/opamProtect/onboarding/index';
import RegistrationOptionScreen from './screens/signUpScreen/options';
import settingsScreen from './screens/settings/index';
import notificationSettingsScreen from './screens/notificationScreen/settings';
import UpdateKycScreen from './screens/updateKycScreen';
import linkedAccuntsScreen from './screens/linkedAccunts';
import upgradeAccountScreen from './screens/upgradeAccountScreen';
import CreateTransactionPIN from './screens/createTransactionPIN';
import completeKycScreen from './screens/completeKycScreen';
import ResetTransactinPIN from './screens/resetTransactinPIN';
import ResetPIN from './screens/resetPIN';
import ResetPassword from './screens/resetPassword';
import AccountLimitScreen from './screens/accountLimitScreen';
import CreateNewUserPaswordScreen  from './screens/createNewPassword';
import OpamProtectDistressLogsScreen  from './screens/opamProtect/screens/distressLogs';
import OpamProtectDistressAboutScreen  from './screens/opamProtect/screens/about';
import OpamProtectDistressContactPref  from './screens/opamProtect/screens/distressContactPreference';
import OpamProtectDistressNext  from './screens/opamProtect/screens/distressNextStep';
import OpamProtectIntroScreen  from './screens/opamProtect/screens/intro';
import OpamProtectConfirmPassword  from './screens/opamProtect/screens/createConfirmPassword';
import OpamProtectCreatePassword  from './screens/opamProtect/screens/createPassword';
import OpamProtectSafeWord  from './screens/opamProtect/screens/distressSafeWord';
import ChatScreen  from './screens/chat';

export const navigationRef = createRef() as RefObject<NavigationContainerRef<any>>;
const Stack = createSharedElementStackNavigator();
import { usePushNotificationHook } from './includes/usePushHook';
import { useDispatch } from 'react-redux';
import useBiometricHook from './includes/useBiometricHook';
import updateDistressPIN from './screens/opamProtect/screens/updateDistressPIN';
const AppStack = () => {
  const dispatch = useDispatch();
  const {CheckAvailablity} = useBiometricHook();
  useEffect(()=>{
    CheckAvailablity().then((type)=>{
      dispatch({type:"update",playload:{biometric:type}})
    })
  // OneSignal.Debug.setLogLevel(LogLevel.Verbose);
  // OneSignal.initialize("1eed02fb-c4f9-41cd-b5ab-83cc12700dba");
  // OneSignal.Notifications.canRequestPermission().then((res)=>{
  //   console.log(res)
  //   OneSignal.User.pushSubscription.optIn();
  //   OneSignal.Notifications.requestPermission(res);
  // });

},[])
  return <NavigationContainer
    ref={navigationRef}
  >
    <Stack.Navigator
      initialRouteName={ROUTES.introScreen}
      screenOptions={{
        presentation: 'transparentModal',
      }}
    >
      <Stack.Screen
        component={IntroScreen}
        name={ROUTES.introScreen}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'black',
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />

        <Stack.Screen
        component={WelcomeScreen}
        name={ROUTES.welcomeScreen}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'black',
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        component={VerificationScreen}
        name={ROUTES.verificationScreen}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'black',
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        component={LoginScreen}
        name={ROUTES.loginScreen}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'black',
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        component={SignUpScreen}
        name={ROUTES.signUpScreen}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'black',
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        component={ForgotPasswordScreen}
        name={ROUTES.forgotPassword}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'black',
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        component={ForgotPasswordOTPScreen}
        name={ROUTES.forgotPasswordOTP}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'black',
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        component={UnRegisteredBusinessScreen}
        name={ROUTES.unRegisteredBusiness}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'black',
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        component={RegisteredBusinessScreen}
        name={ROUTES.registeredBusiness}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'black',
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        component={VerifyMobileIndividualAccountScreen}
        name={ROUTES.verifyMobileIndividualAccount}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'black',
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen
        component={BusinessDetailsScreen}
        name={ROUTES.businessDetails}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'black',
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen
        component={KeyContactDetailsScreen}
        name={ROUTES.keyContactsDetails}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'black',
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen
        component={UploadDocumentsScreen}
        name={ROUTES.uploadDocuments}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'black',
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen
        component={TypeOfBusinessScreen}
        name={ROUTES.typOfBusiness}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'black',
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen
        component={SuccessScreen}
        name={ROUTES.successScreen}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'black',
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        component={FormPreviewScreen}
        name={ROUTES.formReviewScreen}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'black',
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />

      <Stack.Screen
        component={MobileScreen}
        name={ROUTES.mobileScreen}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'black',
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        component={HomeScreen}
        name={ROUTES.dashboard}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'black',
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen
        component={NotificationScreen}
        name={ROUTES.notificationScreen}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'black',
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen
        component={OtpScreen}
        name={ROUTES.otpScreen}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'black',
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen
        component={CreateAccountScreen}
        name={ROUTES.createAccount}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'black',
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        component={HasBusinessScreen}
        name={ROUTES.hasBusinessScreen}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'black',
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />

      <Stack.Screen
        component={CreatePINScreen}
        name={ROUTES.createPINScreen}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'black',
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
    
      <Stack.Screen
        component={PolicyScreen}
        name={ROUTES.policyScreen}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'transparent',
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
       <Stack.Screen
        component={CreateDistressPINScreen}
        name={ROUTES.createDistressPIN}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'transparent',
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      /> 
      <Stack.Screen
        component={RegistrationOptionScreen}
        name={ROUTES.registrationOptionScreen}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'transparent',
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      /> 
       <Stack.Screen
        component={NextOfKinScreen}
        name={ROUTES.nextOfKinScreen}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'transparent',
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      /> 
      <Stack.Screen
        component={UpdateKycScreen}
        name={ROUTES.updateKycScreen}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'transparent',
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />  
         <Stack.Screen
        component={OpamProtectManageScreen}
        name={ROUTES.opamProtectManageScreen}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'transparent',
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      /> 
      <Stack.Screen
        component={settingsScreen}
        name={ROUTES.settingsScreen}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'transparent',
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />  
         <Stack.Screen
        component={CreateDistressAccountScreen}
        name={ROUTES.createDistressAccountScreen}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'transparent',
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      /> 
      <Stack.Screen
        component={notificationSettingsScreen}
        name={ROUTES.notificationSettingsScreen}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'transparent',
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />     
       
      <Stack.Screen
        component={linkedAccuntsScreen}
        name={ROUTES.linkedAccountScreen}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'black',
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen
        component={upgradeAccountScreen}
        name={ROUTES.upgradeAccountScreen}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'black',
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen
        component={CreateTransactionPIN}
        name={ROUTES.createTransactionPINScreen}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'black',
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen
        component={completeKycScreen}
        name={ROUTES.completeKYCScreen}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'black',
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen
        component={ResetPIN}
        name={ROUTES.resetLoginPINScreen}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'black',
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen
        component={ResetTransactinPIN}
        name={ROUTES.resetTransacPINScreen}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'black',
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen
        component={ResetPassword}
        name={ROUTES.resetPasswordScreen}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'black',
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
          <Stack.Screen
        component={AccountLimitScreen}
        name={ROUTES.accountLimitScreen}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'black',
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
       <Stack.Screen
        component={OpamProtectScreen}
        name={ROUTES.opamProtectGetStartedScreen}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'transparent',
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      /> 
        <Stack.Screen
        component={CreateNewUserPaswordScreen}
        name={ROUTES.createNewPassword}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'transparent',
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      /> 
        <Stack.Screen
        component={OpamProtectDistressLogsScreen}
        name={ROUTES.protectLogs}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'transparent',
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      /> 
         <Stack.Screen
        component={OpamProtectDistressAboutScreen}
        name={ROUTES.protectAbout}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'transparent',
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      /> 
           <Stack.Screen
        component={OpamProtectDistressContactPref}
        name={ROUTES.distressContactPreference}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'transparent',
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      /> 
               <Stack.Screen
        component={OpamProtectDistressNext}
        name={ROUTES.distressNextOption}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'transparent',
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      /> 
      <Stack.Screen
        component={OpamProtectIntroScreen}
        name={ROUTES.opamProtectIntroScreen}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'transparent',
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
        <Stack.Screen
        component={OpamProtectCreatePassword}
        name={ROUTES.opamProtectCreatePasswordScreen}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'transparent',
          },
        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      /> 
        <Stack.Screen
        component={OpamProtectConfirmPassword}
        name={ROUTES.opamProtectConfirmPasswordScreen}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'transparent',
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      /> 
         <Stack.Screen
        component={OpamProtectSafeWord}
        name={ROUTES.distressSafeWord}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'transparent',
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />  
        <Stack.Screen
        component={ChatScreen}
        name={ROUTES.chatScreen}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'transparent',
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />   
      <Stack.Screen
        component={updateDistressPIN}
        name={ROUTES.updateDistressPIN}
        options={{
          headerShown: false,
          headerTintColor: 'orange',
          headerStyle: {
            backgroundColor: 'transparent',
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />      
    </Stack.Navigator>
  </NavigationContainer>;
};

export default AppStack;
