import * as React from "react"
import Svg, { Path } from "react-native-svg"

function CaretDownIcon({size = 20}:{size:number}) {
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
        d="M6.293 8.793a1 1 0 011.414 0L12 13.086l4.293-4.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414z"
        fill="#000"
      />
    </Svg>
  )
}

export default CaretDownIcon;
