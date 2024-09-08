import React, { useState } from 'react';
import { Alert, View, Image, Text, ScrollView, StyleSheet } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { ReactNativeModal } from "react-native-modal";
import { router } from 'expo-router';

import { icons, images } from '@/app/constants';
import theme from '@/utils/theme';
import InputField from '@/components/InputField';
import CustomButton from '@/components/CustomButton'
import { Link } from 'expo-router';
import OAuth from '@/components/OAuth';
import { fetchAPI } from '@/lib/fetch';


const SignUp = () => {

    const { isLoaded, signUp, setActive } = useSignUp()
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: "", //843653test
    })

    const [verification, setVerification] = useState({
        state: "default",
        error: "",
        code: "",
    })

    const onSignUpPress = async () => {
        if (!isLoaded) {
          return
        }
    
        try {
          await signUp.create({
            emailAddress : form.email,
            password : form.password,
          })
    
          await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
    
          setVerification({
            ...verification,
            state: "pending",
          })
        } catch (err: any) {
          // See https://clerk.com/docs/custom-flows/error-handling
          // for more info on error handling
          console.error("error during sign up process : ", JSON.stringify(err, null, 2))
          Alert.alert("Error", err.errors[0].longMessage);
        }
      }
    
      const onPressVerify = async () => {
        if (!isLoaded) return;
    
        try {
          const completeSignUp = await signUp.attemptEmailAddressVerification({
            code : verification.code,
          })
    
          if (completeSignUp.status === 'complete') {
            // Create a database user !
            await fetchAPI('/(api)/user', {
                method: "POST",
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    clerkId: completeSignUp.createdUserId
                })
            })

            await setActive({ session: completeSignUp.createdSessionId })
            setVerification({
             ...verification,
              state: "success",
            })
          } else {
            setVerification({
                ...verification,
                state: "failed",
                error: "Verification failed",
  
            })
            console.error(JSON.stringify(completeSignUp, null, 2))
          }
        } catch (err: any) {
            setVerification({
                ...verification,
                state: "failed",
                error: err.errors[0].longMessage,
  
            })
          // See https://clerk.com/docs/custom-flows/error-handling
          // for more info on error handling
          console.error("Verification failed due to : ",JSON.stringify(err, null, 2))
        }
      }

    return (
        <ScrollView style={styles.scrollviewContainer}>
            <View style={styles.flexContainer}>
                <View style={styles.container}>
                    <Image
                        source={images.signUpCar}
                        style={styles.carImage}
                    />
                    <Text style={styles.accountText}>
                        Create your account
                    </Text>
                </View>
                <View style={{padding: 20}}>
                    <InputField
                        label="Name"
                        placeholder='Enter your name'
                        icon={icons.person}
                        value={form.name}
                        onChangeText={(value) => setForm({...form, name : value})}
                    />
                    <InputField
                        label="Email"
                        placeholder='Enter your email'
                        icon={icons.email}
                        value={form.email}
                        onChangeText={(value) => setForm({...form, email : value})}
                    />
                    <InputField
                        label="Password"
                        placeholder='Enter your password'
                        icon={icons.lock}
                        secureTextEntry={true}
                        value={form.password}
                        onChangeText={(value) => setForm({...form, password : value})}
                    />
                    <CustomButton
                        title="Sign Up"
                        style={{marginTop: 22}}
                        textStyle={{fontSize: 14}}
                        onPress={onSignUpPress}
                    />

                    <OAuth/>

                    <Link href='/sign-in' style={styles.signInLink}>
                        <Text style={{fontSize: 16}}>
                            Already have an account ?{' '}
                        </Text>
                        <Text style={{color: theme.colors.primary[500], fontSize: 16}}>
                            Log In
                        </Text>
                    </Link>
                </View>

                <ReactNativeModal
                    isVisible={verification.state === "pending"}
                    // onBackdropPress={() =>
                    //   setVerification({ ...verification, state: "default" })
                    // }
                    onModalHide={() => {
                        if (verification.state === "success") {
                            setShowSuccessModal(true);
                        }
                    }}
                    >
                    <View style={styles.modalContainer}>
                        <Text style={styles.titleText}>
                            Verification
                        </Text>
                        <Text style={styles.bodyText}>
                            We've sent a verification code to : {form.email}.
                        </Text>
                        <InputField
                            label={"Code"}
                            icon={icons.lock}
                            placeholder={"12345"}
                            value={verification.code}
                            keyboardType="numeric"
                            onChangeText={(code) =>
                                setVerification({ ...verification, code })
                            }
                        />
                        {verification.error && (
                        <Text style={styles.errorText}>
                            {verification.error}
                        </Text>
                        )}
                        <CustomButton
                            title="Verify Email"
                            onPress={onPressVerify}
                            style={styles.button}
                            textStyle={{fontSize : 16}}
                        />
                    </View>
                </ReactNativeModal>

                <ReactNativeModal isVisible={showSuccessModal}>
                    <View style={styles.successModal}>
                        <Image
                            source={icons.checkmark}
                            style={styles.checkMarck}
                        />
                        <Text style={styles.verified}>
                            Verified
                        </Text>
                        <Text style={styles.successVerificationText}>
                            You have successfully verified your account
                        </Text>
                        <CustomButton
                            title="Browse Home"
                            style={{marginTop: 20}}
                            textStyle={{fontSize: 14}}
                            onPress={() => {
                                setShowSuccessModal(false)
                                router.push('/(root)/(tabs)/home')
                            }}
                        />
                    </View>
                </ReactNativeModal>
                
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollviewContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    flexContainer : {
        flex: 1,
        backgroundColor: '#fff',
    },
    container : {
        width: "100%",
        height: 250,
        position: "relative",
    },
    carImage: {
        zIndex: 0,
        width: "100%",
        height: 250,
    },
    accountText: {
        fontSize: 24,
        color: "#000",
        position: "absolute", 
        bottom: 20,
        left: 20,
        fontFamily: theme.fontFamily.JakartaSemiBold,
    },
    signInLink: {
        fontSize: 18,
        textAlign: 'center',
        color: theme.colors.general[200],
        marginTop: 40,
    },
    successModal: {
        backgroundColor: '#fff',
        paddingHorizontal: 28,
        paddingVertical: 36,
        borderRadius: 24,
        minHeight: 300,
    },
    checkMarck: {
        width: 100,
        height: 100,
        marginHorizontal: "auto",
        marginVertical: 20,
    },
    verified: {
        fontSize: 30,
        fontFamily: theme.fontFamily.JakartaBold,
        textAlign: 'center',
    },
    successVerificationText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#9CA3AF',
        fontFamily: theme.fontFamily.Jakarta
    },
    modalContainer: {
    backgroundColor: '#FFF',
    paddingHorizontal: 28,
    paddingVertical: 36,
    borderRadius: 24,
    minHeight: 300,
    },
    titleText: {
        fontFamily: theme.fontFamily.JakartaExtraBold,
        fontSize: 24,
        marginBottom: 8,
    },
    bodyText: {
        fontFamily: theme.fontFamily.Jakarta,
        marginBottom: 20,
    },
    errorText: {
        color: '#EF4444',
        fontSize: 12,
        marginTop: 4,
    },
    button: {
        marginTop: 20, // mt-5
        backgroundColor: theme.colors.success[500],
    },
})

export default SignUp;