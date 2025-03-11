import { Text, StyleSheet, View, TouchableOpacity, Image, BackHandler } from "react-native";
import { COLOURS, DEVICE, FONTFAMILY } from "../../../../../includes/constants";
import { useEffect, useState } from "react";
import Svg, { Path } from "react-native-svg"
import { EyeClosed, EyeOpen } from "../../../../../components/svgs/eyeClosed";
import { TitleText } from "../../../../settings";
import ArrowLeft from "../../../../../components/svgs/arrowLeft";
import BaseInput from "../../../../../components/baseInput";
import { Formik, FormikProps, FormikValues } from 'formik';
import * as y from 'yup';
import BaseButton from "../../../../../components/baseButton";
const Schema = y.object({
  password: y.string().required('Password is required.')
});
interface PINScreenProp {
  onValue: (otp: string) => void;
  status: "pin" | "confirm";
  goBack?: () => void;
  data?: any;
  subTitle?: string;
  title?: string;
  value?: string;
  password?: boolean;
  handleBackBtn?:()=>void;
}

const PINScreen = ({ onValue,handleBackBtn, value, password, status, goBack, title, subTitle }: PINScreenProp) => {
  const [showKey, setShowKey] = useState<boolean>(false);
  const [kKeys, setKkeys] = useState<string[]>([
    "",
    "",
    "",
    ""
  ])
  const handleKeyTap = (d: string) => {
    var x = [d];
    if (d == 'x') {
      var tx = kKeys.map((a, i, self) => {
        if (self.filter((k, o) => k !== '').length - 1 == i) {
          a = '';
        }
        return a;
      });
      setKkeys(tx);
    } else {
      var tx = kKeys.map((a, i, self) => {
        const val = self.filter((k, o) => k === '');
        if (self.length - val.length == i) {
          a = d;
        }
        return a;
      });
      setKkeys(tx);
      if (title || subTitle) {
        const f = tx.filter((a, i) => a !== "");
        if (f.length === 4) {
          onValue(f.join(""));
        }
      }
    }

  }
  useEffect(() => {
    if (value === " ") {
      setKkeys(["", "", "", ""]);
    } else {
      if (value?.length === 4) {
        setKkeys(String(value).split(""));
      }
    }
  }, [value])

  useEffect(()=>{
    const x = BackHandler.addEventListener("hardwareBackPress",()=>{
      if(handleBackBtn)
      {
        handleBackBtn()
      }
      return true
    })
    return ()=>{
      x.remove()
    }
  },[])
  return <View style={{ flexDirection: "column", flex: 1, backgroundColor: "white" }}>
    {goBack ? <TouchableOpacity
      style={{ marginLeft: 30, marginTop: 30 }}
      onPress={goBack}
    >
      <ArrowLeft size={20} />
    </TouchableOpacity> : null}
    <View style={{ flexDirection: "column" }}>
      <Text style={{ alignSelf: "center", color: COLOURS.black, fontSize: 20, fontFamily: FONTFAMILY.INTER.bold }}>{title}</Text>
      <Text style={{ alignSelf: "center", color: "#7B7F99", fontSize: 12, marginTop: 10, marginBottom: 10, textAlign: "center", fontFamily: FONTFAMILY.INTER.normal, paddingHorizontal: 50 }}>{subTitle}</Text>
      {!password ? <View style={{ paddingHorizontal: 20, flexDirection: "column", justifyContent: "center", alignItems: "center" }} >
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginVertical: 10 }}>
          {kKeys.map((a, i) => {
            return <View key={i} style={{ width: 45, height: 40, marginHorizontal: 10, justifyContent: "center", alignItems: "center" }} >
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                {a !== "" ? showKey ? <TitleText style={{ fontFamily: FONTFAMILY.INTER.bold, fontSize: 22 }}>{a}</TitleText> : <View style={{ width: 8, height: 8, borderRadius: 8, backgroundColor: COLOURS.purple }} /> : null}
              </View>
              <View style={{ height: 5, backgroundColor: COLOURS.gray100, width: "70%" }} />
            </View>
          })}
        </View>
        <TouchableOpacity
          onPress={() => setShowKey(!showKey)}
          style={{ paddingVertical: 10, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10 }}
        >
          <TitleText >{showKey ? "Hide PIN" : "Show PIN"}</TitleText>
          {!showKey ? <EyeOpen size={20} /> : <EyeClosed size={20} />}
        </TouchableOpacity>
        <View
          style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}
        >
          {[
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "",
            "0",
            "x",
          ].map((a, i) => {
            if (a === "") {
              return <View
                style={{ height: 90, width: (DEVICE.width / 3) - 30, justifyContent: "center", alignItems: "center" }}
              />
            }
            return <TouchableOpacity
              disabled={kKeys.filter((a, i) => a !== "").length == 4 && a !== "x"}
              onPress={() => handleKeyTap(a)}
              style={{ height: 90, width: (DEVICE.width / 3) - 30, justifyContent: "center", alignItems: "center" }}>
              {a === "x" ? <XIcon /> : <Text style={{ fontSize: 24, fontWeight: "bold", fontFamily: FONTFAMILY.INTER.medium }}>{a}</Text>}
            </TouchableOpacity>
          })}
        </View>
      </View> : <Formik
        initialValues={{
          password: ""
        }}
        onSubmit={(values: FormikValues, actions: any) => {
          onValue(values.password)
        }}
        validationSchema={Schema}
      >
        {({ values, handleChange, setFieldValue, handleSubmit, errors, isValid, touched }) => (
          <View style={{ paddingHorizontal: 20, flexDirection: "column" }}>
            <BaseInput
              type="visible-password"
              label="Password"
              placeholder="Qwerty$123"
              value={values.password}
              onChange={(data) => {
                setFieldValue("password", String(data).replace(/[ ]/g, ''))
              }}
              max={30}
              errorMessage={touched.password && errors.password}
            />
            <BaseButton
              onPress={handleSubmit}
              title="Continue"
            />
          </View>)}
      </Formik>}
    </View>
  </View>
}
export default PINScreen;

const XIcon = () => {
  return (
    <Svg
      width={37}
      height={37}
      viewBox="0 0 37 37"
      fill="none"
    >
      <Path
        d="M16.372 13.455c.439-.44 1.151-.44 1.59 0l3.705 3.704 3.704-3.704a1.125 1.125 0 111.591 1.59l-3.704 3.705 3.704 3.705a1.125 1.125 0 01-1.59 1.59l-3.705-3.704-3.705 3.705a1.125 1.125 0 01-1.59-1.591l3.704-3.705-3.704-3.704a1.125 1.125 0 010-1.591z"
        fill="#000"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.276 8.175a5.625 5.625 0 00-4.424 2.151L3.51 17.13a2.625 2.625 0 000 3.242l5.342 6.803a5.625 5.625 0 004.424 2.151h15.97A4.125 4.125 0 0033.37 25.2V12.3a4.125 4.125 0 00-4.125-4.125h-15.97zm-2.655 3.54a3.375 3.375 0 012.655-1.29h15.97c1.036 0 1.875.84 1.875 1.875v12.9c0 1.036-.84 1.875-1.875 1.875h-15.97a3.375 3.375 0 01-2.655-1.29L5.28 18.982a.375.375 0 010-.463l5.342-6.803z"
        fill="#000"
      />
    </Svg>
  )
}