import { useToast } from 'react-native-toast-notifications';
import { COLOURS } from './constants';
const useShowToastMsg = ()=>{
    const toast = useToast();
    const success = (msg:string,position:"top"|"bottom")=>{
     
      toast.show(msg, {
        swipeEnabled:true,
        type: 'custom',
        successColor:COLOURS.success,
        placement:position,
        textStyle:{
          color:COLOURS.green 
        },
        duration: 4000,
        animationType:'slide-in',
        style:{
            backgroundColor:COLOURS.lighterGreen,
            borderLeftColor:COLOURS.green,
            borderLeftWidth:6,
            marginBottom:position === "top"?5:0,
            marginTop:position === "bottom"?5:0,
        },
        data:{message:msg}
      });
    }
    const error = (msg:string,position:"top"|"bottom")=>{
      toast.show(msg, {
        swipeEnabled:true,
        type: 'custom',
        successColor:COLOURS.red,
        placement:position,
        textStyle:{
          color:COLOURS.red 
        },
        duration: 4000,
        animationType:'slide-in',
        style:{
            backgroundColor:COLOURS.lighterRed,
            borderLeftColor:COLOURS.red,
            borderLeftWidth:6,
            marginBottom:position === "top"?5:0,
            marginTop:position === "bottom"?5:0,
        },
        data:{message:msg}
      });
      
    }
    return {
    success,
    error
    }
  }
  export default useShowToastMsg;