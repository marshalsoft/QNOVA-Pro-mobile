import * as React from "react"
import Svg, { Path } from "react-native-svg"
import CONSTANTS from "../../includes/constants"

function ShareIcon({size = 20,color = CONSTANTS.Colors.black}:{size:number;color?:string}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 21 20"
      fill="none"
    >
     
     <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.5 2.917a2.083 2.083 0 100 4.167 2.083 2.083 0 000-4.167zM12.584 5a2.917 2.917 0 11.52 1.664L8.27 9.082a2.914 2.914 0 010 1.837l4.835 2.417a2.917 2.917 0 11-.373.745l-4.835-2.417a2.917 2.917 0 110-3.328l4.835-2.417A2.913 2.913 0 0112.584 5zM5.5 7.917a2.083 2.083 0 100 4.167 2.083 2.083 0 000-4.167zm10 5a2.084 2.084 0 100 4.167 2.084 2.084 0 000-4.167z"
       fill={color}
      />
    </Svg>
  )
}

export default ShareIcon;
