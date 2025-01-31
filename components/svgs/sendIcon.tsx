import * as React from "react"
import Svg, { Path } from "react-native-svg"
import CONSTANTS from "../../includes/constants"

function SendIcon({size = 20,color = CONSTANTS.Colors.black}:{size:number;color?:string}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 19 18"
      fill="none"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.75 9a.75.75 0 01-.386.656l-2.282 1.268a75.748 75.748 0 01-14.193 6.084l-.665.208A.75.75 0 01.25 16.5v-5.75c0-.391.3-.716.69-.748l.228-.018A44.251 44.251 0 007.555 9a44.249 44.249 0 00-6.478-.992l-.135-.01A.75.75 0 01.25 7.25V1.5a.75.75 0 01.974-.716l.665.208a75.749 75.749 0 0114.193 6.084l2.282 1.268A.75.75 0 0118.75 9zm-2.294 0l-1.103-.612A74.25 74.25 0 001.75 2.52V6.56c2.93.264 5.828.81 8.654 1.631l.305.089a.75.75 0 01-.001 1.44l-.39.113A45.747 45.747 0 011.75 11.44v4.04a74.247 74.247 0 0013.603-5.868L16.456 9z"
        fill={color}
      />
    </Svg>
  )
}

export default SendIcon;
