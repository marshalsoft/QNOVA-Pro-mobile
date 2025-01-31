import * as React from "react"
import Svg, { Path } from "react-native-svg"
import CONSTANTS from "../../includes/constants";

function InfoIcon({size = 20,color = CONSTANTS.Colors.black}:{size:number;color?:string}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
    >
     <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.4 8A6.4 6.4 0 111.6 8a6.4 6.4 0 0112.8 0zm-5.6 3.2a.8.8 0 11-1.6 0 .8.8 0 011.6 0zM8 4a.8.8 0 00-.8.8V8a.8.8 0 101.6 0V4.8A.8.8 0 008 4z"
        fill={color}
      />
    </Svg>
  )
}

export default InfoIcon;
