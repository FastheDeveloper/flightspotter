import Svg, { SvgProps, Path } from 'react-native-svg';
import { memo } from 'react';
import { APP_COLOR } from '~/src/constants/Colors';

const ArrowRightIconComponent = (props: SvgProps) => {
  return (
    <Svg width={20} height={20} fill="none" {...props}>
      <Path
        stroke={props.color ?? APP_COLOR.APP_TEXT}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4.167 10h11.666m0 0-5 5m5-5-5-5"
      />
    </Svg>
  );
};

const ArrowRightIcon = memo(ArrowRightIconComponent);
export default ArrowRightIcon;
