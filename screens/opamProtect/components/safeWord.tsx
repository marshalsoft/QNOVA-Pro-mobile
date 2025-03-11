import { ScrollView, Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { ScreenComponentType } from "../../../includes/types";
import { COLOURS, DEVICE, FONTFAMILY, passwordRules, ROUTES, ValidateNigerianMobile, ValidateNigerianMobile2 } from "../../../includes/constants";
import { RefObject, useEffect, useRef, useState } from "react";
import {
  Waveform,
  type IWaveformRef,
} from '@simform_solutions/react-native-audio-waveform';
import BaseInput from "../../../components/baseInput";
import { Formik, FormikProps, FormikValues } from 'formik';
import * as y from 'yup';
import Svg, { Circle, G, Path,Line, Defs } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */
import AudioRecord from 'react-native-audio-record';
const options = {
  sampleRate: 16000,  // default 44100
  channels: 1,        // 1 or 2, default 1
  bitsPerSample: 16,  // 8 or 16, default 16
  audioSource: 6,     // android only (see below)
  wavFile: 'test.wav' // default 'audio.wav'
};
const FormSchema = y.object({
  safeWord: y.string().min(3, "Safeword must be minimum of 8 characters.").max(12, "Safeword must be maximum of 12 characters.").matches(/[a-z A-Z]/, "Safe word must be alphabets.").required('Safe word is required.')
});
import BaseButton from "../../../components/baseButton";
import useHttp from "../../../includes/http.hooks";
import { navigationRef } from "../../../App";
import { BaseModalLoader } from "../../../components/baseLoader";
interface PINScreenProp {
  onValue?: (otp: any) => void;
  status?: "pin" | "confirm";
  goBack: () => void;
  data?: any;
  subTitle?: string;
  title?: string;
}
import { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import React from 'react';
import Animated, { Easing, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { PERMISSIONS, request } from "react-native-permissions";
import { ReturnAllLetter } from "../../../includes/functions";
import { NavigatePop } from "../../../includes/useNavigation";
import { useDispatch } from "react-redux";

const SafeWordScreen = ({ goBack,Reducer }: ScreenComponentType) => {
  const [recording, setRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { OpamProtectAudioUpload,OpamProtectCreatePassword, loading, ShowMessage } = useHttp();
  const [counter, setCounter] = useState<number>(0)
  const IWaveformRefRef = useRef<IWaveformRef>(null);
  const timer = useRef<NodeJS.Timeout>();
 
  useEffect(()=>{
  AudioRecord.init(options);
  AudioRecord.on('data', data => {
    console.log(data)
    // base64-encoded audio data chunks
  });
  },[]);
const StartTimer = ()=>{
  timer.current = setInterval(()=>{
    setCounter((counter)=>counter + 1)
  },1000)
}
  const startRecording = async () => {
    const granted = await CheckPermission();
    try {
      if(granted)
      {
      AudioRecord.start();
      setRecording(true);
      StartTimer()
      }
    } catch (err) {
      ShowMessage("top").fail('Unable to start recording.');
      console.log(err);
    }
  };

  const stopRecording = async () => {
    try {
      const audioFile:any = await AudioRecord.stop();
      setRecording(false)
      setRecordedAudio(audioFile);
      clearInterval(timer.current);
    } catch (err) {
      console.log(err);
      ShowMessage("top").fail('Unable to stop recording.');
    }
  };

  const playStop = async () => {
    setIsPlaying(false);
    IWaveformRefRef.current?.stopPlayer();
  }
  const playRecording = async () => {
    if(isPlaying)
    {
      return playStop();
    }
    setIsPlaying(true);
    IWaveformRefRef.current?.startPlayer();
   };
  const CheckPermission = async()=>{
    const granted = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
    return granted === "granted";
  }
  
  const dispatch = useDispatch();
  return <View style={{ backgroundColor: "#F2F2F2", flexDirection: "column", paddingVertical: 30, height: DEVICE.height, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
    <View style={{ flexDirection: "column" }}>
      <Formik
        initialValues={{
          safeWord: ""
        }}
        onSubmit={(values: FormikValues, actions: any) => {
          const extn = String(recordedAudio).split(".");
          OpamProtectCreatePassword({
            ...Reducer?.OpamProtectCreation,
            safeword: values.safeWord,
            audioFile: {
              uri: "file://"+recordedAudio,
              type: `audio/${extn[extn.length - 1]}`,
              name: `recording.${extn[extn.length - 1]}`,
            }
          }).then((res) => {
            if(res.status === "success" && res.statusCode === 200)
              {
                dispatch({
                  type: "update", 
                  payload: {
                    creationOfSafeWord: true,
                    isOpamProtected:true
                  }})
              NavigatePop(1)
            }
          })
        }}
        validationSchema={FormSchema}
      >
        {({ values, handleChange, setFieldValue, handleSubmit, errors, isValid, touched }) => (<View style={{ flexDirection: "column", alignItems: "center", paddingHorizontal: 24 }}>

          <View style={{ width: "100%" }}>
            <BaseInput
              max={100}
              placeholder="Enter your Safe Word"
              type="default"
              value={ReturnAllLetter(values.safeWord)}
              onChange={(d) => {
                setFieldValue("safeWord", d)
              }}
              errorMessage={touched.safeWord && errors.safeWord}
              label="Safe Word"
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              if (!recording) {
                startRecording();
              } else {
                stopRecording();
              }
            }}
            style={{ height: 130 }}>
            <AudioIcon start={recording} />
          </TouchableOpacity>
          <Text style={{fontSize:40,opacity:recording?1:0}}>{counter}</Text>
          {recordedAudio && <View style={{ height: 80, flexDirection: "row",justifyContent:"center",gap:10,width:100,alignItems:"center" }}>
            <TouchableOpacity
              onPress={playRecording}
              style={{ width: 15 }}>
              {!isPlaying?<PlayIcon />:<StopIcon />}
            </TouchableOpacity>
  <Waveform
  mode="static"
  ref={IWaveformRefRef}
  path={recordedAudio}
  candleSpace={2}
  candleWidth={4}
  waveColor={COLOURS.gray}
  scrubColor={COLOURS.purple}
  candleHeightScale={4}
  containerStyle={{width:120}}
  onCurrentProgressChange={(d)=>setCounter(d)}
  onPlayerStateChange={playerState =>{
    setIsPlaying(playerState === "playing")
  }}
  onPanStateChange={isMoving => console.log(isMoving)}
/>
          </View>}
          {recordedAudio ? <BaseButton
            onPress={handleSubmit}
            title="Continue"
          /> : null}
        </View>)}
      </Formik>
    </View>
    {loading && <BaseModalLoader modal />}
  </View>
}

export default SafeWordScreen;

const AudioIcon = ({ start }: { start?: boolean }) => {
  const scale = useSharedValue(0);
  useEffect(()=>{
 if(start)
    {
   scale.value = withRepeat(
    withTiming(1.5, { duration: 500, easing: Easing.ease }), // Scale up to 1.5
    -1, 
    true 
  );
  }else{
    scale.value = withTiming(1.5, { duration: 500, easing: Easing.ease }) // Scale up to 1.5
  }
  },[start])
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  return (<View style={sty.container}>
    <Animated.View style={[sty.box, animatedStyle]} />
    <Animated.View style={[sty.box,{
      width:60,
      height:60
    }, animatedStyle]} />
    <View 
    style={sty.inner}
    >
    {start?<StopMicIcon />:<MicIcon />}
    </View>
  </View>
  )
}
const PlayIcon = () => {
  return <Svg
    width={90}
    height={24}
    viewBox="0 0 90 24"
    fill="none"
  ><Path
      d="M21.75 12a9.75 9.75 0 11-19.5 0 9.75 9.75 0 0119.5 0z"
      stroke="#000"
      strokeWidth={1.5}
    />
    <Path d="M16.5 12L9.75 7.5v9L16.5 12z" stroke="#000" strokeWidth={1.5} />
  </Svg>
}
const MicIcon = () => {
  return (
    <Svg
    fill="#fff"
    width="30px"
    height="30px"
    viewBox="0 0 1920 1920"
    stroke="#fff"
  >
    <Path
      d="M425.818 709.983V943.41c0 293.551 238.946 532.497 532.497 532.497 293.55 0 532.496-238.946 532.496-532.497V709.983h96.818V943.41c0 330.707-256.438 602.668-580.9 627.471l-.006 252.301h242.044V1920H667.862v-96.818h242.043l-.004-252.3C585.438 1546.077 329 1274.116 329 943.41V709.983h96.818zM958.315 0c240.204 0 435.679 195.475 435.679 435.68v484.087c0 240.205-195.475 435.68-435.68 435.68-240.204 0-435.679-195.475-435.679-435.68V435.68C522.635 195.475 718.11 0 958.315 0z"
      fillRule="evenodd"
    />
  </Svg>
  )
}
const StopMicIcon = ()=>{
  return <Svg
  fill="#fff"
  width="30px"
  height="30px"
  viewBox="0 0 1920 1920"
  stroke="#fff"
>
  <Path
    d="M666.286 1242.8c-88.168-79.79-143.65-195.06-143.65-323.033V435.679C522.636 195.475 718.111 0 958.315 0c176.955 0 329.645 106.09 397.775 257.997L1536.8 0l92.38 64.669L331.381 1917.48 239 1852.81l305.289-435.84C412.414 1301.53 329 1132.02 329 943.408V709.98h96.818v233.428c0 155.812 67.32 296.242 174.393 393.722l66.075-94.33zm129.034 207.58l-57.716 82.4c54.294 20.4 112.129 33.5 172.304 38.1v252.3H667.861V1920h580.909v-96.82h-242.044v-252.3c324.464-24.8 580.904-296.76 580.904-627.472V709.98h-96.82v233.428c0 293.552-238.94 532.492-532.495 532.492-56.824 0-111.601-8.95-162.995-25.52zm598.67-854.695L868.36 1346.11c29.036 6.12 59.127 9.34 89.955 9.34 240.205 0 435.675-195.48 435.675-435.683V595.685z"
    fillRule="evenodd"
  />
</Svg>
}
const sty = StyleSheet.create({
  inner:{
    alignSelf:"center",
    width: 50,
    height: 50,
    position:"absolute",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:COLOURS.purple,
    borderRadius:100
  },
  container:{
    alignSelf:"center",
    width: 100,
    height: 100,
    position:"absolute",
    justifyContent:"center",
    alignItems:"center"
  },
  box: {
    width: 60,
    height: 60,
    borderRadius:100,
    borderWidth:1,
    borderColor:COLOURS.purple,
    position:"absolute"
  },
});

const StopIcon = ()=>{
  return (
    <Svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
    >
      <G stroke={COLOURS.purple} strokeWidth={1.5}>
        <Circle cx={12} cy={12} r={10} />
        <Path d="M8 12c0-1.886 0-2.828.586-3.414C9.172 8 10.114 8 12 8c1.886 0 2.828 0 3.414.586C16 9.172 16 10.114 16 12c0 1.886 0 2.828-.586 3.414C14.828 16 13.886 16 12 16c-1.886 0-2.828 0-3.414-.586C8 14.828 8 13.886 8 12z" />
      </G>
    </Svg>
  )
}

