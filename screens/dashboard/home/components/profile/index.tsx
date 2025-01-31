import React, { } from "react"
import Svg, { Rect, Path } from "react-native-svg"
import { ScrollView, Text, StyleSheet, View, TouchableOpacity, Image, TextInput } from "react-native";
import { ItemProps, ScreenComponentType } from "../../../../../includes/types";
import { COLOURS, DEVICE, FONTFAMILY, LOCALSTORAGE, NigerianFlag, ROUTES, ValidateNigerianMobile, ValidateNigerianMobile2 } from "../../../../../includes/constants";
import { RefObject, useEffect, useRef, useState } from "react";
import * as y from 'yup';
import styled from "styled-components/native";
import LinearGradient from 'react-native-linear-gradient';
import { navigationRef } from "../../../../../App";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = ({ route, goBack, onSuccess,Reducer }: ScreenComponentType) => {
    useEffect(() => {
    }, [])

    return <View style={{ flexDirection: "column" }}>
        <View style={{ flexDirection: "column", padding: 20, paddingTop: 8 }}>
            <LinearGradient
                colors={['rgba(255, 255, 255, 0.25)', 'rgba(255, 255, 255, 0)']} style={{
                    width: "100%",
                    height: 187,
                    borderRadius: 8,
                    borderColor: "rgba(255, 255, 255, 0.25)",
                    borderWidth: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    paddingHorizontal: 16,
                    paddingVertical: 8
                }}
            >
                <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <Image
                        source={{uri: Reducer?.avatar?Reducer?.avatar:NigerianFlag}}
                        style={{ width: 61, height: 61, borderRadius: 61 }}
                    />
                    <TitleText style={{ marginTop: 20 }}>{Reducer?.firstName} {Reducer?.lastName}</TitleText>
                    <SubTitleText style={{ marginTop: 10, color: "rgba(255, 255, 255, 0.50)" }}>Admin</SubTitleText>
                    <View style={{ marginTop: 4, flexDirection: "row", gap: 8, justifyContent: "center", alignItems: "center" }}>
                        <SubTitleText style={{ fontSize: 12 }}>{Reducer?.email}</SubTitleText>
                        {Reducer?.email ?<View style={{ width: 5, height: 5, borderRadius: 10, backgroundColor: COLOURS.white }} />:null}
                        <SubTitleText style={{ fontSize: 12 }} >+{Reducer?.phone}</SubTitleText>
                    </View>
                </View>
            </LinearGradient>
        </View>
        <Card >
            <Card2 
            onPress={()=>navigationRef.current?.navigate(ROUTES.accountLimitScreen)}
            >
                <TitleText style={{ color: COLOURS.black, fontSize: 14, fontWeight: "100" }}>Account Limits</TitleText>
            </Card2>
            <Card2 
            onPress={()=>navigationRef.current?.navigate(ROUTES.upgradeAccountScreen)}
            >
                <TitleText style={{ color: COLOURS.black, fontSize: 14, fontWeight: "100" }}>Upgrade Account</TitleText>
            </Card2>
            <Card2 
            onPress={()=>navigationRef.current?.navigate(ROUTES.resetPasswordScreen)}
            
            >
                <TitleText style={{ color: COLOURS.black, fontSize: 14, fontWeight: "100" }}>Reset Password</TitleText>
            </Card2>
            <Card2 
             onPress={()=>navigationRef.current?.navigate(ROUTES.resetTransacPINScreen)}
            >
                <TitleText style={{ color: COLOURS.black, fontSize: 14, fontWeight: "100" }}>Reset Transaction PIN</TitleText>
            </Card2>
            <Card2 
            >
                <TitleText style={{ color: COLOURS.black, fontSize: 14, fontWeight: "100" }}>Help & Support</TitleText>
            </Card2>
            <Card2
                onPress={() => {
                    AsyncStorage.removeItem(LOCALSTORAGE.userData);
                    AsyncStorage.removeItem(LOCALSTORAGE.refreshToken);
                    navigationRef.current?.reset({
                    index: 0,
                    routes: [
                        { name: ROUTES.loginScreen }
                    ]
                })}}
            >
                <TitleText style={{ color: COLOURS.red, fontSize: 14, fontWeight: "100" }}>Logout</TitleText>
            </Card2>
        </Card>
    </View>
}

export default ProfileScreen;

const Card = styled.View`
padding: 24px;
flex-direction: column;
gap: 20px;
background:${COLOURS.defaultWhite};
min-height:500px;
border-radius:8px 8px 0px 0px;
`;
export const Card2 = styled.TouchableOpacity`
padding: 10px;
background:rgba(255, 255, 255, 1);
border-radius:8px;
height: 72px;
padding: 16px 12px;
justify-content:center;
`;
const TitleText = styled.Text`
color: #FFF;
font-family: ${FONTFAMILY.INTER.medium};
font-size: 20px;
font-weight: 700;
color:rgba(255, 255, 255, 1);
`;
const SubTitleText = styled.Text`
color: #FFF;
font-family: ${FONTFAMILY.INTER.normal};
font-size: 14px;
color:rgba(255, 255, 255, 1);
`;