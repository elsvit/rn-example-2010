import * as React from 'react';
import { View, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';
import styled from 'styled-components';

import { Button } from 'ui';
import STYLES from 'constants/styles';
import SafeAreaBackground from '../SafeAreaBackground';

const MODAL_PADDING = 16;

const btnLabelStyle = {
  fontFamily: STYLES.fontFamily.bold,
  letterSpacing: 0.5,
  paddingRight: 0,
  textAlign: 'right',
};

export interface IModalProps {
  isVisible?: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  submitText?: string;
  submitColor?: string;
  submitStyle?: any;
  closeText?: string;
  closeColor?: string;
  closeStyle?: any;
  disabled?: boolean;
  children?: any;
}

export default function ModalWrapper({
  isVisible = false,
  onClose,
  onSubmit,
  submitText = '',
  submitColor = STYLES.color.lightishPurple,
  submitStyle,
  closeText = 'CANCEL',
  closeColor = STYLES.color.darkSlateBlue,
  closeStyle,
  disabled,
  children,
}: IModalProps) {
  return (
    <Modal isVisible={isVisible} backdropColor={STYLES.color.darkSlateBlue}>
      <SafeAreaBackground bgColor="transparent">
        <ContentWrapper>
          <ScrollViewWrapper>{children}</ScrollViewWrapper>
        </ContentWrapper>

        <BtnsWrapper>
          <Button
            label={closeText}
            color={closeColor}
            style={closeStyle}
            onPress={onClose}
            hasBorder={false}
            labelStyle={btnLabelStyle}
            width={'40%'}
            disabled={disabled}
          />
          {!!onSubmit && (
            <Button
              label={submitText}
              color={submitColor}
              style={submitStyle}
              onPress={onSubmit}
              hasBorder={false}
              labelStyle={btnLabelStyle}
              width={'40%'}
              disabled={disabled}
            />
          )}
        </BtnsWrapper>
      </SafeAreaBackground>
    </Modal>
  );
}

const ContentWrapper = styled(View)`
  flex: 1;
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  background-color: ${STYLES.color.white};
`;

const ScrollViewWrapper = styled(KeyboardAwareScrollView)`
  flex: 1;
  padding: ${MODAL_PADDING}px ${MODAL_PADDING}px 52px;
  margin-bottom: 62px;
`;

const BtnsWrapper = styled(View)`
  flex: 1;
  position: absolute;
  flex-direction: row;
  justify-content: flex-end;
  padding-bottom: 32px;
  bottom: 0;
  height: 72px;
  left: ${MODAL_PADDING}px;
  right: ${MODAL_PADDING}px;
  background-color: ${STYLES.color.white};
`;
