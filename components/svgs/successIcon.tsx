import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"

function SuccessIcon({size = 20}:{size:number}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
    >
      <Circle cx={40} cy={40} r={40} fill="#C6F5BA" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M40 60c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20zm9.268-23.232a2.5 2.5 0 00-3.536-3.536L37.5 41.465l-3.232-3.233a2.5 2.5 0 00-3.536 3.536l5 5a2.5 2.5 0 003.536 0l10-10z"
        fill="#20A100"
      />
    </Svg>
  )
}

export default SuccessIcon;
