import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'

const rnBiometrics = new ReactNativeBiometrics();
export type CheckAvailablityTypes = "TouchID" | "FaceID" | "Biometrics" | null;
const useBiometricHook = ()=>{
    const CheckAvailablity = async():Promise<CheckAvailablityTypes> =>{
        const { biometryType } = await rnBiometrics.isSensorAvailable()
        if (biometryType === BiometryTypes.TouchID) {
          return "TouchID"
        }else if (biometryType === BiometryTypes.Biometrics) {
            return "Biometrics"
        }else if (biometryType === BiometryTypes.FaceID) {
            return "FaceID"
          }else{
            return null;
          }
    }
    type ReturnType = true | false;
    const SetUp = async(message:string):Promise<ReturnType>=>{
        const resultObject = await rnBiometrics.simplePrompt({promptMessage: message})
          const { success,error } = resultObject;
            if (success) {
             return success;
            }else{
                return false;
            }
    }
    return {
        CheckAvailablity,
        SetUp
    }

}
export default useBiometricHook;