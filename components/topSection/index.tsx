import { Text,View } from "react-native"
import AppStyles from "../../includes/styles";
import { FONTFAMILY } from "../../includes/constants";
interface TopSectionProp {
    title:string;
    sub:string;
}
const TopSection = (props:TopSectionProp)=>{

    return <View style={{flexDirection:"column",width:"100%"}}>
        <Text style={AppStyles.topSectionTitleText}>{props.title}</Text>
        <Text style={[AppStyles.topSectionSubTitleText,{fontFamily:FONTFAMILY.Baloo.semiBold}]}>{props.sub}</Text>
    </View>
}
export default TopSection;