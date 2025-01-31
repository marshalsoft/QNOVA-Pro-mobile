import * as React from "react"
import Svg, { Path} from "react-native-svg"

function DotsIcon({size = 32}:{size?:number}) {
    return   <Svg width={size} height={size} fill="none">
     <Path
      fill="#231F20"
      fillRule="evenodd"
      d="M2.917 10a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0Zm5.833 0a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0Zm5.834 0a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0Z"
      clipRule="evenodd"
    />
  </Svg>
}
export default DotsIcon;