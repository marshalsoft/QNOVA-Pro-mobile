import * as React from "react"
import Svg, {G, Path} from "react-native-svg"

function CopyIcon({size = 20}:{size:number}) {
  return (
    <Svg
      width={size}
      height={size}
      fill="none" viewBox="0 0 24 24">
    <G stroke="#1C274C" strokeWidth={1.5}>
      <Path d="M6 11c0-2.828 0-4.243.879-5.121C7.757 5 9.172 5 12 5h3c2.828 0 4.243 0 5.121.879C21 6.757 21 8.172 21 11v5c0 2.828 0 4.243-.879 5.121C19.243 22 17.828 22 15 22h-3c-2.828 0-4.243 0-5.121-.879C6 20.243 6 18.828 6 16v-5Z" />
      <Path d="M6 19a3 3 0 0 1-3-3v-6c0-3.771 0-5.657 1.172-6.828C5.343 2 7.229 2 11 2h4a3 3 0 0 1 3 3" />
    </G>
  </Svg>
  )
}

export default CopyIcon;
