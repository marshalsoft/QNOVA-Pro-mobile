import React, { } from "react"
import Svg, { Path } from "react-native-svg"
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
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
import AppStyles from "../../../includes/styles";
import { HorizontaLine } from "../../dashboard/home/components/horiontalline";
import { TitleText } from "../../settings";
import { SearchContainer } from "../../dashboard/home/components/userStaffManagement";
import SearchIcon from "../../../components/svgs/searchIcon";

interface listOfChannelsProps {
  title: string;
  selected: boolean;
}

const OpamProtectDistressLogsScreen = ({ route, goBack, Reducer, onSuccess }: ScreenComponentType) => {
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
      <HorizontaLine />
      <View style={{ paddingHorizontal: 16, paddingVertical: 10 }} >
        <TitleText style={{ color: "#5D132B", fontSize: 20 }} >Recents</TitleText>
        <Text style={{ fontSize: 14, color: "#425161" }}>Get all the help you need</Text>
        <View style={{ backgroundColor: "#F8F8F8", padding: 5, gap: 10, flexDirection: "row", alignItems: "center" }} >
          <SearchContainer style={{ flex: 1, justifyContent: "center" }}>
            <View
              style={{ position: "absolute", left: 12 }}
            >
              <SearchIcon size={20} />
            </View>
            <TextInput
              style={{ width: "100%", paddingHorizontal: 44, }}
              placeholder="Search distress call log..."
              onChangeText={(d) => {
                // setSearchText(d);
              }}
              placeholderTextColor={COLOURS.gray64}
            />
          </SearchContainer>
          <View >
            <TouchableOpacity style={{ padding: 12, backgroundColor: COLOURS.white }}>
              <FiterIcon />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{ paddingHorizontal: 24, flexDirection: "column", alignItems: "center" }} >
        <Image
          style={{ width: DEVICE.width - 100 }}
          resizeMode="contain"
          source={require("../../../images/opamProtect/empty.png")}
        />
        <Text style={{ fontSize: 14, textAlign: "center", color: "#425161", paddingHorizontal: 60 }}>You currently have no distress logs available to display</Text>
      </View>
    </View>
  </AppContainer>
}
const MapStateToProps = (state: any) => {
  return state;
};
export default connect(MapStateToProps)(OpamProtectDistressLogsScreen);



const FiterIcon = () => {
  return (
    <Svg
      width={25}
      height={24}
      viewBox="0 0 25 24"
      fill="none"
    >
      <Path
        d="M22.5 6.5h-6M6.5 6.5h-4M10.5 10a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM22.5 17.5h-4M8.5 17.5h-6M14.5 21a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"
        stroke="#55687D"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

