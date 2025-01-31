import * as React from "react"
import Svg, { Path } from "react-native-svg"
import CONSTANTS from "../../includes/constants"

function ImageIcon({size = 20,color = CONSTANTS.Colors.black}:{size:number;color?:string}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 20 16"
      fill="none"
    >
    <Path d="M12 5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" fill={color} />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.268.658a54.646 54.646 0 019.465 0l1.51.132a3.138 3.138 0 012.831 2.66 30.597 30.597 0 010 9.1 3.138 3.138 0 01-2.831 2.66l-1.51.131a54.634 54.634 0 01-9.465 0l-1.51-.131a3.138 3.138 0 01-2.832-2.66 30.601 30.601 0 010-9.1A3.138 3.138 0 013.757.79l1.51-.132zm9.335 1.495a53.146 53.146 0 00-9.206 0l-1.51.131A1.638 1.638 0 002.41 3.672a29.101 29.101 0 00-.311 5.17L5.97 4.97a.75.75 0 011.09.032l3.672 4.13 2.53-.844a.75.75 0 01.795.21l3.52 3.91.014-.08a29.101 29.101 0 000-8.656 1.638 1.638 0 00-1.478-1.388l-1.51-.131zm2.017 11.435l-3.349-3.721-2.534.844a.75.75 0 01-.797-.213L6.468 6.593l-4.244 4.243c.049.498.11.996.185 1.491a1.638 1.638 0 001.478 1.389l1.51.131c3.063.266 6.143.266 9.206 0l1.51-.131c.179-.016.35-.06.507-.128z"
        fill={color}
      />
    </Svg>
  )
}

export default ImageIcon;
