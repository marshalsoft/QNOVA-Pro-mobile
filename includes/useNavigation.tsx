import { StackActions } from '@react-navigation/native';
import { navigationRef } from '../App';

export const NavigateReplace = (route:string,params:any)=>{
    navigationRef.current?.dispatch(
        StackActions.replace(route, params)
      );
}
export const NavigatePop = (index:number)=>{
    navigationRef.current?.dispatch(
        StackActions.pop(index)
      );
}
