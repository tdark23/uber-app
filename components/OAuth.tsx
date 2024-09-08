import React, { useState } from 'react';
// import { useOAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { Alert, Image, Text, View, StyleSheet } from "react-native";

import theme from '@/utils/theme';
import CustomButton from "@/components/CustomButton";
import { icons } from '@/app/constants';
// import { googleOAuth } from "@/lib/auth";

const OAuth = () => {
//   const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

const handleGoogleSignIn = async () => {};
//   const handleGoogleSignIn = async () => {
//     const result = await googleOAuth(startOAuthFlow);

//     if (result.code === "session_exists") {
//       Alert.alert("Success", "Session exists. Redirecting to home screen.");
//       router.replace("/(root)/(tabs)/home");
//     }

//     Alert.alert(result.success ? "Success" : "Error", result.message);
//   };

  return (
    <View>
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.orText}>Or</Text>
        <View style={styles.divider} />
      </View>

      <CustomButton
        title="Log In with Google"
        style={styles.customButtonStyles}
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            style={styles.googleIcon}
          />
        )}
        bgVariant="outline"
        textVariant="primary"
        textStyle={{fontSize: 14}}
        onPress={handleGoogleSignIn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dividerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16, 
    gap: 12,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.general[100],
  },
  orText: {
    fontSize: 16, 
  },
  googleIcon: {
    width: 20, 
    height: 20, 
    marginHorizontal: 8,
  },
  customButtonStyles: {
    marginTop: 20,
    width: '100%',
    shadowColor: 'transparent', // This effectively removes the shadow on iOS
    shadowOffset: { width: 0, height: 0 }, // Removes the offset shadow
    shadowOpacity: 0, // Removes the opacity of the shadow
    shadowRadius: 0, // Removes the blur radius of the shadow
    elevation: 0, // Removes the shadow on Android
  }
});

export default OAuth;
