import * as React from "react"
import Svg, { Path} from "react-native-svg"

function BellIcon({size = 20}:{size?:number}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 21 24"
      fill="none"
  >
 <Path
      stroke="#0D1740"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={2}
      d="M13.163 18.958v.991c0 1.115-.743 2.23-1.858 2.354-1.363.248-2.602-.867-2.602-2.23v-1.115h4.46Z"
    />
    <Path
      stroke="#0D1740"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={2}
      d="M18.739 18.958H3.129c-.619 0-1.238-.495-1.238-1.238v-.248c0-.744.371-1.487.867-1.982.867-.744 1.363-1.735 1.363-2.85V8.924c0-3.345 2.353-6.442 5.698-6.938 2.354-.371 4.46.372 5.946 1.859a6.839 6.839 0 0 1 1.983 4.831v3.964c0 1.115.495 2.106 1.362 2.85.62.495.868 1.115.868 1.982v.247c0 .744-.496 1.24-1.24 1.24Z"
    />
    </Svg>
  )
}

export default BellIcon;
