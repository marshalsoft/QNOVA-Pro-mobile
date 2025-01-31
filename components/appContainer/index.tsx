/* eslint-disable react-native/no-inline-styles */
import React, {ReactNode, useEffect} from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  NativeScrollEvent,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  // useColorScheme,
  View,
} from 'react-native';
import AppStyles from '../../includes/styles';
import {COLOURS, DEVICE, FONTFAMILY} from '../../includes/constants';
import ArrowLeft from '../svgs/arrowLeft';
import Logo from '../svgs/logo';
import PurpleLogo from '../svgs/purpleLogo';
import { navigationRef } from '../../App';
import { BaseModalLoader } from '../baseLoader';
interface AppContainerProps {
  children: ReactNode;
  showNavBar?: boolean;
  goBack?: () => void;
  title?: string | ReactNode;
  footer?: ReactNode;
  backgroundColor?: string;
  header?: ReactNode;
  disableScrol?: boolean;
  white?:boolean;
  loading?:boolean;
  onRefresh?:()=>void;
  onScroll?:(nativeEvent:NativeScrollEvent)=>void;
  threshHold?:number;
  onEndReached?:()=>void;
  isRefresh?:boolean;
}
const AppContainer = (props: AppContainerProps) => {
  // const isDarkMode = useColorScheme() === "dark";
  useEffect(() => {
    // Splashscreen.hide();
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: props.backgroundColor ? props.backgroundColor : '#fff',
      }}>
         <Image
            style={{ width:DEVICE.width,height:DEVICE.height, position: 'absolute', top: 0, left: 0 }}
            source={require("../../images/bck.png")}
            resizeMode="cover"
        />
      <KeyboardAvoidingView
        style={{flex: 1, height: '100%', flexDirection: 'column'}}
        behavior="padding">
        {props?.header ? (
          <View style={{width: '100%', flexDirection: 'column'}}>
            {props.header}
          </View>
        ) : (
          props.showNavBar && (
            <View style={[AppStyles.navBar,{height:60,alignItems:"center"}]}>
              <TouchableOpacity
                onPress={()=>{
                  if(navigationRef.current?.canGoBack && props.goBack)
                  {
                  props.goBack();
                  }
                }}
                style={AppStyles.navBtn}>
                {navigationRef.current?.canGoBack && <ArrowLeft
                  size={20}
                  color={COLOURS.white}
                />}
              </TouchableOpacity>
              <View
                style={{
                  flex: 4,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {props.title?typeof(props.title) == "string"?
                <Text style={[AppStyles.blackText,{color:props.white?"white":"black"}]}>{props.title}</Text>:props.title:<View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
            <Logo size={50} withText={true} />
                 </View>}
              </View>
              <View
                style={AppStyles.navBtn}>
              </View>
            </View>
          )
        )}
        <View style={{flex: 1, flexDirection: 'column', width: '100%'}}>
          {props.disableScrol ? (
            props.children
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
              keyboardShouldPersistTaps="always"
              keyboardDismissMode="interactive"
              style={{width: '100%'}} 
              onScroll={({nativeEvent})=>{
                if(props.onScroll)
                {
                props.onScroll(nativeEvent);
                }
              }}
              onEndReachedThreshold={props.threshHold?props.threshHold:16}
              onEndReached={props.onEndReached}
              data={[""]}
              renderItem={({})=><View
                style={[
                  {
                    width: DEVICE.width,
                    flexDirection: 'column'
                  },
                ]} >
                {props.children}
              </View>}
              refreshControl={props?.onRefresh?<RefreshControl 
              onRefresh={()=>props.onRefresh}
              refreshing={props?.isRefresh!}
              />:<></>}
              />
          )}
        </View>
        {props.footer}
      </KeyboardAvoidingView>
      {props.loading && <BaseModalLoader />}
    </SafeAreaView>
  );
};

export default AppContainer;
