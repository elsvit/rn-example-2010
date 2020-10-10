import * as React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styled from 'styled-components';

import STYLES from 'constants/styles';

interface ISvgButtonProps {
  SvgIcon?: any; // svg
  color?: string;
  title?: string;
  titleColor?: string;
  width?: number;
  style?: any;
  onPress?: () => void;
}

export default function SvgButton({
  SvgIcon,
  color = STYLES.color.white,
  title = '',
  titleColor = STYLES.color.white,
  width = 24,
  style,
  onPress,
}: ISvgButtonProps) {
  const wrapperStyle = {
    flex: 1,
    height: width,
    maxHeight: width,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  };

  const renderInsiade = () => (
    <>
      {SvgIcon && <SvgIcon width={width} height={width} fill={color} stroke={color} />}
      {title ? <Label>{title}</Label> : null}
    </>
  );

  return !!onPress ? (
    <TouchableOpacity onPress={onPress} style={{ ...wrapperStyle, ...style }}>
      {renderInsiade()}
    </TouchableOpacity>
  ) : (
    <View style={{ ...wrapperStyle, ...style }}>{renderInsiade()}</View>
  );
}

const Label = styled(Text)`
  font-family: ${STYLES.fontFamily.medium};
  font-size: ${STYLES.fontSize.medium}px;
  line-height: ${STYLES.fontSize.medium * 1.2}px;
  color: ${STYLES.color.white};
  margin-left: 8px;
`;
