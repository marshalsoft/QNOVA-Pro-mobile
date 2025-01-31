import * as React from "react"
import Svg, { Path} from "react-native-svg"

function PaymentIcon({size = 20,color = "#841743"}:{size:number;color?:string;}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 21 16"
      fill="none"
    >
    <Path
      fill={color}
      d="M15.902 13.826v-6.26h-2.839c-1.203.214-2.406.861-3.61 1.613H7.25c-.998.059-1.521 1.063-.55 1.723.772.562 1.792.53 2.838.437.721-.036.752.926 0 .93-.261.02-.545-.042-.793-.042-1.306-.001-2.379-.249-3.037-1.271l-.33-.765-3.28-1.613C.457 8.043-.71 9.745.5 10.93a43.05 43.05 0 0 0 7.303 4.265c1.81 1.092 3.62 1.055 5.428 0l2.672-1.369ZM5.875 2.696V0h4.301v2.71h2.08L8.011 7.66 3.75 2.696h2.124ZM21 6.964h-4.244v7.492H21V6.964Z"
     />
    </Svg>
  )
}

export default PaymentIcon;
