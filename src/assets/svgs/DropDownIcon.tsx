import Svg, { SvgProps, Path } from "react-native-svg";
import { memo } from "react";
import { APP_COLOR } from "@/src/constants/Colors";

const DropdownIconComponent = (props: SvgProps) => {
  return (
    <Svg fill="none" {...props}>
      <Path
        stroke={props.color ?? APP_COLOR.APP_TEXT}
        strokeLinecap="round"
        strokeWidth={2}
        d="m6 9 5.293 5.685a.952.952 0 0 0 1.414 0L18 9"
      />
    </Svg>
  );
};

const DropdownIcon = memo(DropdownIconComponent);
export default DropdownIcon;
