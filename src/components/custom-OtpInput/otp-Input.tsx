import { moderateScale } from '@/src/utils/deviceConfig';
import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface Props {
  length?: number;
  onOtpComplete?: (otp: string) => void;
  timerSeconds?: number;
  onResend?: () => void; // optional callback to resend API
}

const OtpInput: React.FC<Props> = ({
  length = 4,
  onOtpComplete,
  timerSeconds = 30,
  onResend,
}) => {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const [timer, setTimer] = useState(timerSeconds);
  const inputRefs = useRef<TextInput[]>([]);

  // Countdown timer
  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer(t => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // Call back when OTP is complete
  useEffect(() => {
    if (otp.every(val => val !== '')) {
      onOtpComplete?.(otp.join(''));
    }
  }, [otp]);

  const handleChange = (text: string, index: number) => {
    if (!/^[0-9]?$/.test(text)) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace') {
      const newOtp = [...otp];

      if (otp[index] === '') {
        if (index > 0) {
          newOtp[index - 1] = '';
          inputRefs.current[index - 1]?.focus();
        }
      } else {
        newOtp[index] = '';
      }

      setOtp(newOtp);
    }
  };


  const handleResend = () => {
    setOtp(Array(length).fill(''));
    setTimer(timerSeconds);
    inputRefs.current[0]?.focus();
    onResend?.();
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={ref => (inputRefs.current[index] = ref!)}
            style={styles.inputBox}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={text => handleChange(text, index)}
            onKeyPress={e => handleKeyPress(e, index)}
            returnKeyType="done"
          />
        ))}
      </View>

      {timer > 0 ? (
        <Text style={styles.timerText}>
          {`00:${timer.toString().padStart(2, '0')}`}
        </Text>
      ) : (
        <TouchableOpacity onPress={handleResend}>
          <Text style={styles.resendText}>Resend Code</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default OtpInput;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginTop: moderateScale(20),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: moderateScale(10),
  },
  inputBox: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(8),
    borderWidth: moderateScale(1),
    borderColor: '#ccc',
    textAlign: 'center',
    fontSize: moderateScale(20),
    color: '#000',
    backgroundColor: '#fff',
  },
  timerText: {
    marginTop: moderateScale(10),
    fontSize: moderateScale(16),
    color: '#000',
  },
  resendText: {
    marginTop: moderateScale(10),
    fontSize: moderateScale(16),
    color: '#001f4d',
    fontWeight: '600',
  },
});
