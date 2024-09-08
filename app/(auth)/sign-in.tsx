import React, { useState } from 'react';
import { Alert, View, Image, Text, ScrollView, StyleSheet } from 'react-native';
import { useSignIn } from '@clerk/clerk-expo'

import { icons, images } from '@/app/constants';
import theme from '@/utils/theme';
import InputField from '@/components/InputField';
import CustomButton from '@/components/CustomButton';
import { Link, useRouter } from 'expo-router';
import OAuth from '@/components/OAuth';


const SignIn = () => {
    const { signIn, setActive, isLoaded } = useSignIn()
    const router = useRouter()

    const [form, setForm] = useState({
        email: '',
        password: "",
    })

    const onSignInPress = React.useCallback(async () => {
        if (!isLoaded) {
          return
        }
    
        try {
          const signInAttempt = await signIn.create({
            identifier: form.email,
            password: form.password,
          })
    
          if (signInAttempt.status === 'complete') {
            await setActive({ session: signInAttempt.createdSessionId })
            router.replace('/')
          } else {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(signInAttempt, null, 2))
            Alert.alert("Error", "Log in failed. Please try again.");
          }
        } catch (err: any) {
          console.error(JSON.stringify(err, null, 2))
          Alert.alert("Error", err.errors[0].longMessage);
        }
      }, [isLoaded, form.email, form.password])

    return (
        <ScrollView style={styles.scrollviewContainer}>
            <View style={styles.flexContainer}>
                <View style={styles.container}>
                    <Image
                        source={images.signUpCar}
                        style={styles.carImage}
                    />
                    <Text style={styles.accountText}>
                        Welcome 👋
                    </Text>
                </View>
                <View style={{padding: 20}}>
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
                        title="Sign In"
                        style={{marginTop: 22}}
                        textStyle={{fontSize: 14}}
                        onPress={onSignInPress}
                    />

                    <OAuth/>

                    <Link href='/sign-up' style={styles.signInLink}>
                        <Text style={{fontSize: 16}}>
                            Don't have an account ?{' '}
                        </Text>
                        <Text style={{color: theme.colors.primary[500], fontSize: 16}}>
                            Sign Up
                        </Text>
                    </Link>
                </View>
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
    }
})

export default SignIn;