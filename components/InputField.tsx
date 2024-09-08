import {
    TextInput,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    StyleSheet,
  } from "react-native";
  import React from 'react';
  
  import theme from '@/utils/theme';
  import { InputFieldProps } from "@/types/type";
  
  const InputField = ({
    label,
    icon,
    secureTextEntry = false,
    labelStyle,
    containerStyle,
    inputStyle,
    iconStyle,
    ...props
  }: InputFieldProps) => {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={[styles.container, containerStyle]}>
            <Text style={[styles.label, labelStyle]}>
              {label}
            </Text>
            <View style={[styles.inputContainer, containerStyle]}>
              {icon && (
                <Image source={icon} style={[styles.icon, iconStyle]} />
              )}
              <TextInput
                style={[styles.input, inputStyle]}
                secureTextEntry={secureTextEntry}
                {...props}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      marginVertical: 6,
      width: '100%',
    },
    label: {
      fontSize: 14,
      fontFamily: 'JakartaSemiBold',
      marginBottom: 10,
    },
    inputContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      position: 'relative',
      backgroundColor: '#F5F5F5',
      borderRadius: 50,
      borderWidth: 1,
      borderColor: '#F5F5F5',
      height: 50,
    },
    icon: {
      width: 20,
      height: 20,
      marginLeft: 16,
    },
    input: {
      borderRadius: 50,
      padding: 14,
      fontFamily: theme.fontFamily.JakartaSemiBold,
      fontSize: 13,
      flex: 1,
      textAlign: 'left',
    },
  });
  
  export default InputField;
  