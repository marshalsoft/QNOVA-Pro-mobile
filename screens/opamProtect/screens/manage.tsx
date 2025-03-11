import React, { } from "react"
import Svg, { Path,Rect } from "react-native-svg"
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
import TitleComponent from "../../../components/svgs/titleComponent";

interface listOfChannelsProps {
  title: string;
  selected: boolean;
}

const OpamProtectManageScreen = ({ route, goBack, Reducer, onSuccess }: ScreenComponentType) => {
  const { ShowMessage, loading } = useHttp();
  const [showModal, setShowModal] = useState<boolean>(false);
  const HandleDeactiveAccount = () => {

  }
  const buttons: ItemProps[] = [
    {
      title: "Distress Contact Preference", value: "0", route: ROUTES.distressContactPreference,
      description: "Update emergency contact information.",
      icon: <ContactIcon />
    },
    {
      title: "Distress Next Steps", value: 2, route: ROUTES.distressContactPreference, description: "Update distress preferences.",
      icon: <NextIcon />
    },
    {
      title: "Distress Log", value: "log", route: ROUTES.protectLogs, description: "View and filter distress logs.",
      icon: <LogIcon />
    }
    ,
    {
      title: "Distress Password", value: "password", route: ROUTES.updateDistressPIN, description: "Update your distress PIN.",
      icon: <PasswordIcon />
    },
    // {
    //   title: "Customer Support", value: "support", route: ROUTES.protectAbout, description: "All your distress transactions",
    //   icon: <SupportIcon />
    // },
    {
      title: "About OPAM Protect", value: "about", route: ROUTES.protectAbout, description: "All you need to know about OPAM Protect",
      icon: <AboutIcon />
    },
    // {
    //   title: "Settings", value: "settings", route: ROUTES.protectAbout, description: "More settings",
    //   icon: <SettingsIcon />
    // }
  ];
  return <AppContainer
    showNavBar
    white
    goBack={() => {
      navigationRef.current?.goBack()
    }}
    disableScrol
  >
    <View style={{ backgroundColor: "#F2F2F2", flexDirection: "column", paddingVertical: 24, height: DEVICE.height, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
      {/* <Text style={{ alignSelf: "center", color: COLOURS.black, fontSize: 20, fontFamily: FONTFAMILY.INTER.bold }}>Opam Protect Features</Text> */}
      <View style={{alignItems:"center",flexDirection:"column"}}>
      <TitleComponent />
      <Text style={{ alignSelf: "center", color: "#7B7F99", fontSize: 12, marginTop: 0, marginBottom: 10, textAlign: "center", fontFamily: FONTFAMILY.INTER.normal, paddingHorizontal: 50 }}>All the tools you need in one place</Text>
      </View>
      <View style={{ paddingHorizontal: 24, flexDirection: "column" }} >
        <View style={{ marginVertical: 10, paddingVertical: 10, marginBottom: 20, gap: 20 }}>
          {buttons.map((a, i) => <TouchableOpacity
            onPress={() => {
              navigationRef.current?.navigate(String(a.route), { goto: a.value,title:a.title })
            }}
            key={i}
            style={{ alignItems: "center", flexDirection: "row", paddingHorizontal: 16,gap:10}}
          >
           <View style={{width:30,alignItems: "center",justifyContent:"flex-start"}}>{a.icon}</View> 
            <View style={{ flex: 1, flexDirection: "column" }}>
              <Text style={{ fontSize: 14, color: COLOURS.black, fontWeight: "bold" }}>{a.title}</Text>
              <Text style={{ fontSize: 14, color: COLOURS.gray64 }}>{a.description}</Text>
            </View>
          </TouchableOpacity>)}
        </View>
        <BaseButton
          onPress={() => setShowModal(true)}
          title="Deactivate Account"
        />
      </View>
    </View>
    {showModal && <DeactivateAccountModal
      onClose={(value) => {
        if (value === "Yes") {
          HandleDeactiveAccount()
        }
        setShowModal(false);
      }}
    />}
    {loading && <BaseModalLoader
      modal
    />}
  </AppContainer>
}
const MapStateToProps = (state: any) => {
  return state;
};
export default connect(MapStateToProps)(OpamProtectManageScreen);

const DownloadIcon = ({ size }: { size?: number }) => {
  return <Svg
    width={size ? size : 20}
    height={size ? size : 20}
      viewBox="0 0 23 23"
      fill="none"
    >
      <Path
        d="M22.5 14.953c.008.016.012.129.012.34 0 .21.004.48.011.809.008.328.008.707 0 1.136-.007.43-.007.864 0 1.301.008.438.004.883-.011 1.336-.016.453-.016.852 0 1.195.015.344.011.653-.012.926-.023.274-.023.442 0 .504H0v-1.418c0-.367-.004-.77-.012-1.207a37.41 37.41 0 010-1.324 24.36 24.36 0 00-.011-1.313c-.016-.43-.016-.804 0-1.125a7.13 7.13 0 000-.82c-.016-.227-.008-.34.023-.34L4.488 1.5H9V3H5.566L1.57 15H6.47l1.5 3h6.562l1.5-3h4.899L16.934 3H13.5V1.5h4.512L22.5 14.953zM21 16.5h-4.031l-1.5 3H7.03l-1.5-3H1.5V21H21v-4.5zm-10.5-5.566V0H12v10.934L15.445 7.5 16.5 8.555l-5.25 5.25L6 8.555 7.055 7.5l3.445 3.434z"
        fill="#8B1D41"
      />
    </Svg>
}
const ContactIcon = ({ size }: { size?: number }) => {
  return <Svg
    width={size ? size : 24}
    height={size ? size : 24}
      fill="none"
      viewBox="0 0 24 24"
    >
       <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.75 4.5a4.25 4.25 0 118.5 0 4.25 4.25 0 01-8.5 0zM8 1.75a2.75 2.75 0 100 5.5 2.75 2.75 0 000-5.5zM4 11.75A2.25 2.25 0 001.75 14v1.188c0 .018.013.034.031.037 4.119.672 8.32.672 12.438 0a.037.037 0 00.031-.037V14A2.25 2.25 0 0012 11.75h-.34a.253.253 0 00-.079.012l-.865.283a8.751 8.751 0 01-5.432 0l-.866-.283a.252.252 0 00-.077-.012H4zM.25 14A3.75 3.75 0 014 10.25h.34c.185 0 .369.03.544.086l.866.283a7.251 7.251 0 004.5 0l.866-.283c.175-.057.359-.086.543-.086H12A3.75 3.75 0 0115.75 14v1.188c0 .753-.546 1.396-1.29 1.517a40.095 40.095 0 01-12.92 0 1.537 1.537 0 01-1.29-1.517V14z"
        fill="#8B1D41"
      />
    </Svg>
}
const NextIcon = ({ size }: { size?: number }) => {
  return <Svg
    width={size ? size : 24}
    height={size ? size : 16}
      fill="none"
       viewBox="0 0 24 16"
    >
      <Path
        d="M17.558 7.693h.884v-1.93l1.667.965.443-.761L18.884 5l1.668-.965-.443-.762-1.667.966V2.309h-.884v1.93l-1.668-.965-.442.762L17.115 5l-1.667.966.442.76 1.668-.964v1.93zM2.616 15.617c-.46 0-.845-.155-1.153-.463A1.57 1.57 0 011 14V2c0-.46.154-.845.463-1.153A1.564 1.564 0 012.615.385h18.77c.46 0 .844.154 1.153.463.309.308.463.693.462 1.153v12c0 .46-.154.844-.462 1.153a1.563 1.563 0 01-1.153.463H2.616zm12.169-1h6.6a.589.589 0 00.423-.193A.588.588 0 0022 14V2a.59.59 0 00-.192-.423.591.591 0 00-.424-.192H2.616a.591.591 0 00-.424.192A.583.583 0 002 2v12a.59.59 0 00.192.423.587.587 0 00.423.193h.6a8.125 8.125 0 012.554-2.178A6.632 6.632 0 019 11.617c1.151 0 2.228.274 3.23.822a8.15 8.15 0 012.555 2.178zM9 10.23a2.41 2.41 0 001.77-.731c.487-.488.73-1.078.73-1.77 0-.693-.244-1.282-.73-1.768A2.417 2.417 0 009 5.23a2.398 2.398 0 00-1.77.73 2.42 2.42 0 00-.73 1.77c0 .692.243 1.281.73 1.769a2.408 2.408 0 001.77.73zm-4.45 4.385h8.9a6.21 6.21 0 00-2.022-1.475A5.793 5.793 0 009 12.616c-.85 0-1.658.175-2.425.525a6.27 6.27 0 00-2.025 1.475zM9 9.23c-.411 0-.764-.147-1.059-.441A1.447 1.447 0 017.5 7.73c0-.412.147-.765.441-1.058.294-.294.647-.44 1.059-.44.412 0 .765.147 1.059.44.294.295.441.648.441 1.06 0 .412-.147.765-.441 1.059-.295.293-.648.44-1.059.44z"
        fill="#841743"
        stroke="#841743"
        strokeWidth={0.5}
      />
    </Svg>
}
const LogIcon = ({ size }: { size?: number }) => {
  return <Svg
    width={size ? size : 16}
    height={size ? size : 24}
      fill="none"
       viewBox="0 0 16 20"
    >
        <Path
        d="M11.75 11a.75.75 0 00-.75-.75H5a.75.75 0 000 1.5h6a.75.75 0 00.75-.75zM11.75 15a.75.75 0 00-.75-.75H5a.75.75 0 000 1.5h6a.75.75 0 00.75-.75z"
        fill="#8B1D41"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 .25A2.75 2.75 0 00.25 3v14A2.75 2.75 0 003 19.75h10A2.75 2.75 0 0015.75 17V5.968c0-.381-.124-.751-.354-1.055L12.398.945A1.75 1.75 0 0011.003.25H3zM1.75 3c0-.69.56-1.25 1.25-1.25h7.25v4.397c0 .414.336.75.75.75h3.25V17c0 .69-.56 1.25-1.25 1.25H3c-.69 0-1.25-.56-1.25-1.25V3z"
        fill="#8B1D41"
      />
    </Svg>
}
const SupportIcon = ({ size }: { size?: number }) => {
  return <Svg
    width={size ? size : 18}
    height={size ? size : 16}
       viewBox="0 0 18 16"
       fill="none"
     >
        <Path
        d="M8.77 16v-1h6.615c.167 0 .31-.051.432-.154a.502.502 0 00.183-.404V7.554c0-1.873-.689-3.438-2.066-4.693C12.556 1.605 10.911.977 9 .977s-3.556.628-4.934 1.884C2.689 4.116 2 5.681 2 7.554v5.677h-.5c-.409 0-.761-.138-1.057-.415A1.348 1.348 0 010 11.79V9.905c0-.299.097-.564.291-.795.195-.232.431-.42.709-.565l.017-1.229a6.783 6.783 0 01.68-2.9 7.622 7.622 0 011.744-2.323A8.01 8.01 0 015.965.553 8.384 8.384 0 019 0c1.068 0 2.079.183 3.033.552a7.95 7.95 0 012.513 1.538c.721.657 1.3 1.43 1.735 2.32.435.89.67 1.857.702 2.9L17 8.513c.265.125.498.292.699.503.2.21.301.462.301.757v2.166c0 .295-.1.547-.301.757-.2.21-.434.377-.699.502v1.244c0 .435-.157.803-.472 1.105a1.59 1.59 0 01-1.143.453H8.77zM6.385 9.539a.773.773 0 01-.54-.211.676.676 0 01-.23-.52c0-.207.077-.383.23-.53a.756.756 0 01.54-.22c.207 0 .386.073.539.22.153.147.23.323.23.53 0 .207-.076.38-.23.52a.777.777 0 01-.54.21m5.232 0a.775.775 0 01-.54-.21.676.676 0 01-.23-.52c0-.207.077-.383.23-.53a.756.756 0 01.54-.22c.207 0 .386.073.539.22.153.147.23.323.23.53 0 .207-.076.38-.23.52a.777.777 0 01-.54.21M3.718 7.95c-.09-1.497.392-2.774 1.447-3.829 1.055-1.055 2.35-1.583 3.886-1.583 1.29 0 2.435.388 3.432 1.163.997.775 1.606 1.794 1.826 3.055a7.402 7.402 0 01-3.688-1.014 6.637 6.637 0 01-2.61-2.75 6.556 6.556 0 01-1.505 3.034A6.893 6.893 0 013.718 7.95z"
        fill="#8B1D41"
      />
       </Svg>
}
const AboutIcon = ({ size }: { size?: number }) => {
  return <Svg
    width={size ? size : 20}
    height={size ? size : 20}
       fill="none"
       viewBox="0 0 20 20"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm1.252-12c0 .725-.528 1.25-1.242 1.25-.743 0-1.258-.525-1.258-1.264 0-.71.53-1.236 1.258-1.236.714 0 1.242.526 1.242 1.25zm-2.25 3h2v6h-2V9z"
        fill="#8B1D41"
      />
     </Svg>
}


const SettingsIcon = ({ size }: { size?: number }) => {
  return <Svg
    width={size ? size : 18}
    height={size ? size : 18}
       fill="none"
       viewBox="0 0 18 18"
    >
       <Path
        d="M7.135 18l-.362-2.892a5.353 5.353 0 01-1.035-.454 5.077 5.077 0 01-.947-.664l-2.668 1.135-1.865-3.25 2.306-1.739a8.254 8.254 0 01-.073-.558 4.947 4.947 0 010-1.089c.018-.185.043-.394.073-.626L.258 6.126l1.865-3.212L4.77 4.03c.298-.249.622-.473.97-.673a5.53 5.53 0 011.013-.464L7.134 0h3.732l.36 2.912a5.71 5.71 0 011.017.463c.294.174.597.392.909.654l2.725-1.115 1.865 3.211-2.382 1.796c.055.207.085.396.092.569.007.173.01.343.01.51a5.76 5.76 0 01-.108 1.117l2.344 1.758-1.865 3.25-2.681-1.154a7.017 7.017 0 01-.94.673 4.846 4.846 0 01-.985.445L10.866 18H7.135zM8 17h1.956l.369-2.708a5.531 5.531 0 001.36-.549 6.35 6.35 0 001.232-.956l2.495 1.063.994-1.7-2.19-1.644c.084-.285.14-.547.167-.786a6.471 6.471 0 000-1.44 4.217 4.217 0 00-.166-.747l2.227-1.683-.994-1.7-2.552 1.07c-.303-.333-.7-.644-1.193-.935-.494-.29-.96-.482-1.4-.577L10 1H8.006l-.312 2.689c-.504.107-.968.28-1.39.52a5.943 5.943 0 00-1.26.985L2.55 4.15l-.994 1.7 2.169 1.62a3.268 3.268 0 00-.175.73c-.034.263-.05.536-.05.82 0 .253.016.505.05.755.033.25.085.493.156.73l-2.15 1.645.994 1.7 2.475-1.05c.392.396.8.714 1.222.953.422.24.898.426 1.428.559L8 17zm.973-5.5c.697 0 1.288-.242 1.773-.727A2.412 2.412 0 0011.473 9c0-.697-.243-1.288-.727-1.773A2.412 2.412 0 008.973 6.5c-.702 0-1.294.242-1.776.727A2.418 2.418 0 006.473 9c0 .697.241 1.288.724 1.773.482.485 1.074.727 1.776.727z"
        fill="#8B1D41"
      />
    </Svg>
}

const PasswordIcon = ()=> {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#8B1D41"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Rect width={20} height={12} x={2} y={6} rx={2} />
      <Path d="M12 12h.01M17 12h.01M7 12h.01" />
    </Svg>
  )
}
