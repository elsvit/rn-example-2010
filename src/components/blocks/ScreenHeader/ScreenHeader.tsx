import * as React from 'react';
import styled from 'styled-components';
import { Text, View, TouchableOpacity } from 'react-native';

import STYLES from 'constants/styles';
import { ImageButton, SvgButton } from 'ui';
import { ArrowLeftLIcon } from 'icons';

export interface IScreenHeaderProps {
  title?: string;
  bgColor?: string;
  color?: string;
  leftLabel?: string;
  SvgIcon?: any;
  rightColor?: string;
  imageSource?: string;
  onLeftPress?: () => void;
  rightLabel?: string;
  RightSvgIcon?: any;
  leftColor?: string;
  rightImageSrc?: Maybe<string>;
  onRightPress?: () => void;
  RightSvgIcon2?: any;
  onRight2Press?: () => void;
  style?: any;
  insideWrapperStyle?: any;
  rightIconStyle?: any;
}

export default function ScreenHeader({
  title = '',
  bgColor,
  color = STYLES.color.white,
  leftLabel,
  onLeftPress,
  SvgIcon = ArrowLeftLIcon,
  rightColor,
  imageSource,
  rightLabel,
  leftColor,
  RightSvgIcon,
  rightImageSrc,
  onRightPress,
  RightSvgIcon2,
  onRight2Press,
  style,
  rightIconStyle,
  insideWrapperStyle,
}: IScreenHeaderProps) {
  return (
    <Wrapper
      style={{
        backgroundColor: bgColor,
        ...style,
      }}
    >
      <InsideWrapper style={insideWrapperStyle}>
        {onLeftPress ? (
          <BtnsContainer activeOpacity={0} onPress={onLeftPress}>
            {!!imageSource ? (
              <ImageButton
                imageSource={imageSource}
                onPress={onLeftPress}
                title={leftLabel || ''}
              />
            ) : SvgIcon ? (
              <SvgButton
                SvgIcon={SvgIcon}
                onPress={onLeftPress}
                title={leftLabel || ''}
                color={leftColor || color}
              />
            ) : null}
          </BtnsContainer>
        ) : (
          <BtnsEmptyContainer />
        )}

        {!!title && (
          <TitleWrapper style={{ flex: 1 }}>
            <TitleLabel style={{ color }}>{title}</TitleLabel>
          </TitleWrapper>
        )}

        <BtnsContainer activeOpacity={0} onPress={onRightPress} style={{ alignItems: 'flex-end' }}>
          {!!rightImageSrc ? (
            <ImageButton
              imageSource={rightImageSrc}
              onPress={onRightPress}
              title={rightLabel || ''}
              iconStyle={rightIconStyle}
              style={{
                justifyContent: 'flex-end',
                alignSelf: 'center',
              }}
            />
          ) : SvgIcon ? (
            <SvgButton
              SvgIcon={RightSvgIcon}
              onPress={onRightPress}
              title={rightLabel || ''}
              color={rightColor || color}
              style={{
                justifyContent: 'flex-end',
                alignSelf: 'center',
              }}
            />
          ) : null}
          {!!RightSvgIcon2 && !!onRight2Press && (
            <SvgButton
              SvgIcon={RightSvgIcon2}
              onPress={onRight2Press}
              title={''}
              color={rightColor || color}
              width={28}
              style={{
                justifyContent: 'flex-end',
                alignSelf: 'center',
                marginLeft: 8,
              }}
            />
          )}
        </BtnsContainer>
      </InsideWrapper>
    </Wrapper>
  );
}

const Wrapper = styled(View)`
  width: 100%;
  padding: 25px 16px;
`;

const InsideWrapper = styled(View)`
  width: 100%;
  height: ${STYLES.size.screenHeaderHeight}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TitleWrapper = styled(View)`
  flex: 1;
  height: 40px;
  justify-content: center;
  align-items: center;
`;

const TitleLabel = styled(Text)`
  font-family: ${STYLES.fontFamily.bold};
  line-height: ${STYLES.fontSize.large * 1.2}px;
  font-size: ${STYLES.fontSize.large}px;
  text-align: center;
`;

const BtnsEmptyContainer = styled(TouchableOpacity)`
  flex: 1;
  width: 56px;
  max-width: 15%;
`;

const BtnsContainer = styled(TouchableOpacity)`
  flex: 1;
  width: 60px;
  max-width: 15%;
  height: ${STYLES.size.screenHeaderHeight}px;
  opacity: 1;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`;
