import * as React from "react"
import Svg, { Path,G } from "react-native-svg"

function SearchIcon({size = 20}:{size:number}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
    >
      <G stroke="#323232" strokeWidth={2}>
        <Path d="M15 15l6 6" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
      </G>
    </Svg>
  )
}

export default SearchIcon
