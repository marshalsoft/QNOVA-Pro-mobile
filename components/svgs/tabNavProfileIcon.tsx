import * as React from "react"
import Svg, { Path} from "react-native-svg"

function TabNavProfileIcon({size = 20,color = "#B8B8B8"}:{size:number;color:string;}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 25"
      fill="none"
    >
      <Path
      fill={color}
      fillRule="evenodd"
      d="M16.36 9.227a4.364 4.364 0 1 1-8.728 0 4.364 4.364 0 0 1 8.728 0Zm-2.182 0a2.182 2.182 0 1 1-4.363 0 2.182 2.182 0 0 1 4.363 0Z"
      clipRule="evenodd"
    />
    <Path
      fill={color}
      fillRule="evenodd"
      d="M12 .5C5.373.5 0 5.873 0 12.5s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12Zm-9.818 12c0 2.28.778 4.379 2.081 6.046a9.803 9.803 0 0 1 7.808-3.864 9.802 9.802 0 0 1 7.737 3.772A9.816 9.816 0 0 0 15.142 3.2 9.818 9.818 0 0 0 2.182 12.5ZM12 22.318a9.778 9.778 0 0 1-6.188-2.195 7.627 7.627 0 0 1 6.259-3.26 7.628 7.628 0 0 1 6.206 3.186A9.78 9.78 0 0 1 12 22.32Z"
      clipRule="evenodd"
    />
    </Svg>
  )
}

export default TabNavProfileIcon;
