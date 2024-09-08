import React, { useRef, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import Swiper from 'react-native-swiper';

import theme from '@/utils/theme';
import { onboarding } from '@/app/constants';
import CustomButton from '@/components/CustomButton';


const Onboarding = () => {
    /** 
     * Function to handle navigation to the Sign-Up screen 
     */
    const handleSkip = () => {
        router.replace("/(auth)/sign-up");
    };

    const swiperRef = useRef<Swiper>(null);

    const [activeIndex, setActiveIndex] = useState(0);

    const isLastSlide = activeIndex === onboarding.length - 1;

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <TouchableOpacity
                style={styles.skipButtonContainer}
                onPress={handleSkip}
            >
                <Text style={styles.skipText}>
                    Skip
                </Text>
            </TouchableOpacity>
            <Swiper
                ref={swiperRef}
                loop={false}
                dot={<View style={styles.dotComponent}/>}
                activeDot={<View style={{...styles.dotComponent, backgroundColor: '#0286FF' }} />}
                onIndexChanged={(index) => setActiveIndex(index)}
            >
                {onboarding.map((item) => (
                    <View
                        key={item.id}
                        style={styles.swiperContainer}
                    >
                        <Image
                            source={item.image}
                            style={styles.onboardingImage}
                            resizeMode='contain'
                        />
                        <View style={styles.textContainer}>
                            <Text style={styles.titleText}>
                                {item.title}
                            </Text>
                            <Text style={styles.descriptionText}>
                                {item.description}
                            </Text>
                        </View>
                        
                    </View>
                ))}
            </Swiper>
            <CustomButton
                title={isLastSlide ? 'Gest Started' : "Next"}
                onPress={() =>
                    isLastSlide
                    ? router.replace("/(auth)/sign-up")
                    : swiperRef.current?.scrollBy(1)
                }
                style={styles.customButtonStyles}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff'
    },
    skipButtonContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        padding: 20
    },
    skipText: {
        color: "#000",
        fontSize: 16,
        fontFamily: theme.fontFamily.JakartaBold
    },
    dotComponent: {
        width: 32,
        height: 4,
        marginHorizontal: 1,
        backgroundColor: '#E2E8F0',
        borderRadius: 999,
    },
    swiperContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    onboardingImage: {
        width: '100%',
        height: 300,
    },
    textContainer: {
        flex: 1,
        // flexDirection: 'row',
        // alignItems: "center",
        // justifyContent: "center",
        width: "100%",
        height: 50,
        // marginTop: 40,
    },
    titleText: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 28,
        marginHorizontal: 40,
        textAlign: "center",
    },
    descriptionText: {
        fontSize: 14,
        fontFamily: theme.fontFamily.JakartaSemiBold,
        textAlign: "center",
        color: "#858585",
        marginHorizontal: 10,
        marginTop: 10,
    },
    customButtonStyles: {
        width: "91.67%",
        marginTop: 40,
        marginBottom: 40,
    }
})

export default Onboarding;