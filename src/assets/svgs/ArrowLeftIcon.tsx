import Svg, { SvgProps, Path } from 'react-native-svg';
import { memo } from 'react';
import { APP_COLOR } from '~/src/constants/Colors';

const ArrowLeftIconComponent = (props: SvgProps) => {
  return (
    <Svg width={20} height={20} fill="none" {...props}>
      <Path
        stroke={props.color ?? APP_COLOR.APP_TEXT}
        strokeLinecap="round"
        strokeWidth={2}
        d="M4.166 10h11.667M4.166 10l5 5m-5-5 5-5"
      />
    </Svg>
  );
};
const ArrowLeftIcon = memo(ArrowLeftIconComponent);
export default ArrowLeftIcon;
