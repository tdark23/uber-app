import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import React from "react";
import { ButtonProps } from "@/types/type";

const getBgVariantStyle = (variant: ButtonProps["bgVariant"]): ViewStyle => {
  switch (variant) {
    case "secondary":
      return styles.bgSecondary;
    case "danger":
      return styles.bgDanger;
    case "success":
      return styles.bgSuccess;
    case "outline":
      return styles.bgOutline;
    default:
      return styles.bgPrimary;
  }
};

const getTextVariantStyle = (variant: ButtonProps["textVariant"]): TextStyle => {
  switch (variant) {
    case "primary":
      return styles.textPrimary;
    case "secondary":
      return styles.textSecondary;
    case "danger":
      return styles.textDanger;
    case "success":
      return styles.textSuccess;
    default:
      return styles.textDefault;
  }
};

const CustomButton = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
  style,
  textStyle,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, getBgVariantStyle(bgVariant), style]}
      {...props}
    >
      {IconLeft && <IconLeft style={styles.iconLeft} />}
      <Text style={[styles.text, getTextVariantStyle(textVariant), textStyle]}>
        {title}
      </Text>
      {IconRight && <IconRight style={styles.iconRight} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderRadius: 50,
    padding: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
  bgPrimary: {
    backgroundColor: "#0286FF",
  },
  bgSecondary: {
    backgroundColor: "#6B7280",
  },
  bgDanger: {
    backgroundColor: "#EF4444",
  },
  bgSuccess: {
    backgroundColor: "#10B981",
  },
  bgOutline: {
    backgroundColor: "transparent",
    borderColor: "#D1D5DB",
    borderWidth: 0.5,
  },
  textPrimary: {
    color: "#000000",
  },
  textSecondary: {
    color: "#F3F4F6",
  },
  textDanger: {
    color: "#FEE2E2",
  },
  textSuccess: {
    color: "#D1FAE5",
  },
  textDefault: {
    color: "#FFFFFF",
  },
});

export default CustomButton;
