import React from 'react';
import { Tabs } from "expo-router";
import { StyleSheet, Image, ImageSourcePropType, View } from "react-native";

import { icons } from '@/app/constants';
import theme from '@/utils/theme';


const TabIcon = ({
    source,
    focused,
  }: {
    source: ImageSourcePropType;
    focused: boolean;
  }) => (
    <View
      style={[
        styles.iconContainer,
        focused && styles.focusedBackground,
      ]}
    >
      <View
        style={[
          styles.innerCircle,
          focused && styles.focusedInnerBackground,
        ]}
      >
        <Image
          source={source}
          style={styles.iconImage}
          tintColor="white"
          resizeMode="contain"
        />
      </View>
    </View>
  );


const Layout = () => (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#333333",
          borderRadius: 50,
          paddingBottom: 0, // iOS only
          overflow: "hidden",
          marginHorizontal: 20,
          marginBottom: 20,
          height: 78,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          position: "absolute",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused } : { focused : boolean }) => (
            <TabIcon source={icons.home} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="rides"
        options={{
          title: "Rides",
          headerShown: false,
          tabBarIcon: ({ focused } : { focused : boolean }) => (
            <TabIcon source={icons.list} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          headerShown: false,
          tabBarIcon: ({ focused } : { focused : boolean }) => (
            <TabIcon source={icons.chat} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused } : { focused : boolean }) => (
            <TabIcon source={icons.profile} focused={focused} />
          ),
        }}
      />
    </Tabs>

)

const styles = StyleSheet.create({
    iconContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 999,
    },
    innerCircle: {
      borderRadius: 999,
      width: 48,
      height: 48,
      justifyContent: "center",
      alignItems: "center",
    },
    iconImage: {
      width: 28,
      height: 28,
    },
    focusedBackground: {
      backgroundColor: theme.colors.general[300],
    },
    focusedInnerBackground: {
      backgroundColor: theme.colors.general[400],
    },
  });

export default Layout;