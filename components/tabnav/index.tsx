import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View,Pressable,Text, Platform } from 'react-native';
import { navigationRef } from '../../App';
import TabNavHomeIcon from '../svgs/tabNavHomeIcon';
import TabNavWalletIcon from '../svgs/tabNavWalletIcon';
import TabNavLoanIcon from '../svgs/tabNavLoanIcon';
import TabNavCardIcon from '../svgs/tabNavCardIcon';
import TabNavProfileIcon from '../svgs/tabNavProfileIcon';
import { COLOURS, FONTFAMILY } from '../../includes/constants';

const TabNavBar = ({ state, descriptors, navigation }:BottomTabBarProps)=> {
    return (
      <View style={{ flexDirection: "row",width:"100%",borderTopColor:"rgba(0,0,0,0.2)",borderTopWidth:0.5}}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label:any =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;
          const color =  isFocused ? COLOURS.purple : '#8A8A8A';
          const onPress = () => {
            // const event = navigation.emit({
            //   type: 'tabPress',
            //   target: route.key,
            //   canPreventDefault: true,
            // });
            // && !event.defaultPrevented
            if (!isFocused) {
              navigationRef.current?.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
          return (
            <Pressable
            android_ripple={{color:'#3770C1'}}
            key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1,justifyContent:'center',alignItems:'center',backgroundColor:'white',paddingVertical:10,flexDirection:"column",paddingBottom:Platform.OS === "ios"?28:20}}
            >
            <View style={{flex:1,justifyContent:'center',alignItems:'center',padding:15}} >
              {index === 0 &&<TabNavHomeIcon color={color} size={20} />}  
              {index === 1 &&<TabNavWalletIcon color={color} size={20} />}  
              {index === 2 &&<TabNavLoanIcon color={color} size={20} />}  
              {index === 3 &&<TabNavCardIcon color={color} size={20} />}  
              {index === 4 &&<TabNavProfileIcon color={color} size={20} />}  
            </View>
              <Text style={{color,fontFamily:FONTFAMILY.Baloo.medium,fontSize:10,fontWeight:isFocused ? 'bold' : 'normal' }}>
              {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    );
  };
  export default TabNavBar;
