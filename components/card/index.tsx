import { StyleProp, View, ViewProps, ViewStyle } from "react-native";
import AppStyles from "../../includes/styles";
import { ReactNode } from "react";
interface CardProp {
    children:ReactNode;
    style?:StyleProp<ViewStyle>
}
 const Card = (props:CardProp)=>{
    return <View style={[AppStyles.card,props.style]} >
        {props.children}
    </View>
}
export default Card;