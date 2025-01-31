import * as React from "react"
import Svg, { Path} from "react-native-svg"

function WalletIcon({size = 20,color = "#841743"}:{size:number;color?:string;}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 20 16"
      fill="none"
    >
    <Path
      fill={color}
      fillRule="evenodd"
      d="M0 3a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3Zm3 0a1 1 0 0 0 0 2h14a1 1 0 1 0 0-2H3ZM2 9a1 1 0 0 1 1-1h4c.028 0 .056.001.084.004a1 1 0 0 1 1.03.663 2.001 2.001 0 0 0 3.772 0 1 1 0 0 1 1.03-.663C12.943 8 12.972 8 13 8h4a1 1 0 1 1 0 2h-3.536a3.997 3.997 0 0 1-5.465 1.465A3.998 3.998 0 0 1 6.535 10H3a1 1 0 0 1-1-1Z"
      clipRule="evenodd"
    />
    </Svg>
  )
}

export default WalletIcon;
