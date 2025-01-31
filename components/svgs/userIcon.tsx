import * as React from "react"
import Svg, { Path} from "react-native-svg"

function UserIcon({size = 20}:{size:number}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
    >
     <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 .917a7.083 7.083 0 00-5.626 11.387A12.032 12.032 0 018 10.917c2.03 0 3.945.5 5.626 1.387A7.083 7.083 0 008 .917zM14.055 13.1A7.917 7.917 0 101.945 2.9a7.917 7.917 0 0012.11 10.2zm-.99-.148A11.201 11.201 0 008 11.75c-1.823 0-3.543.433-5.065 1.202A7.062 7.062 0 008 15.083a7.062 7.062 0 005.065-2.131zM8 4.25a2.083 2.083 0 100 4.167A2.083 2.083 0 008 4.25zM5.083 6.333a2.917 2.917 0 115.834 0 2.917 2.917 0 01-5.834 0z"
        fill="#231F20"
      />
    </Svg>
  )
}

export default UserIcon;
