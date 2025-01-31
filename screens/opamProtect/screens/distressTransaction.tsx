import React, { } from "react"
import Svg, { Path } from "react-native-svg"
import { Text, TouchableOpacity, View } from "react-native";
import { COLOURS, DEVICE, FONTFAMILY, ROUTES, ValidateNigerianMobile, ValidateNigerianMobile2 } from "../../../includes/constants";
import { useState } from "react";
import styled from "styled-components/native";
import { connect } from "react-redux";
import AppContainer from "../../../components/appContainer";
import { ItemProps, ScreenComponentType } from "../../../includes/types";
import { navigationRef } from "../../../App";
import BaseButton from "../../../components/baseButton";
import Card from "../../../components/card";
import useHttp from "../../../includes/http.hooks";
import { BaseModalLoader } from "../../../components/baseLoader";
import DeactivateAccountModal from "../modals/deactivateAccount";

interface listOfChannelsProps {
  title: string;
  selected: boolean;
}

const OpamProtectDistressTransactionScreen = ({ route, goBack, Reducer, onSuccess }: ScreenComponentType) => {
  return <AppContainer
    showNavBar
    white
    goBack={() => {
      navigationRef.current?.goBack()
    }}
  >
    <View style={{ backgroundColor: "#F2F2F2", flexDirection: "column", paddingVertical: 24, height: DEVICE.height, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
      <Text style={{ alignSelf: "center", color: COLOURS.black, fontSize: 20, fontFamily: FONTFAMILY.INTER.bold }}>Distress Log</Text>
      <Text style={{ alignSelf: "center", color: "#7B7F99", fontSize: 12, marginTop: 10, marginBottom: 10, textAlign: "center", fontFamily: FONTFAMILY.INTER.normal, paddingHorizontal: 50 }}>All your distress logs are listed below</Text>
      <View style={{ paddingHorizontal: 24, flexDirection: "column" }} >
        
        
      </View>
    </View>
  </AppContainer>
}
const MapStateToProps = (state: any) => {
  return state;
};
export default connect(MapStateToProps)(OpamProtectDistressTransactionScreen);
