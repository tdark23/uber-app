import React, { useState, useEffect } from 'react';
import { SignedIn, useUser } from '@clerk/clerk-expo';
import { Text, View, FlatList, ActivityIndicator, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '@/utils/theme';
import * as Location from "expo-location"

import RideCard from '@/components/RideCard';
import { icons, images } from '@/app/constants';
import GoogleTextInput from '@/components/GoogleTextInput';
import Map from '@/components/Map';
import { useLocationStore } from "@/store"

export default function Page() {
  const { setUserLocation, setDestinationLocation } = useLocationStore();

  const { user } = useUser();

  const [hasPermission, setHasPermission] = useState(false)

  const loading = false;

  const handleSignOut = () => {};

  const handleDestinationPress = () => {};

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setHasPermission(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords?.latitude!,
        longitude: location.coords?.longitude!,
      });

      setUserLocation({
        latitude: location.coords?.latitude,
        longitude: location.coords?.longitude,
        address: `${address[0].name}, ${address[0].region}`,
      });
    })();
  }, []);

  const recentRides = [
    {
        "ride_id": "1",
        "origin_address": "Lagos, Nigeria",
        "destination_address": "Ibadan, Nigeria",
        "origin_latitude": "6.524379",
        "origin_longitude": "3.379206",
        "destination_latitude": "7.377535",
        "destination_longitude": "3.947041",
        "ride_time": 391,
        "fare_price": "15000.00",
        "payment_status": "paid",
        "driver_id": 2,
        "user_id": "1",
        "created_at": "2024-08-12 05:19:20.620007",
        "driver": {
            "driver_id": "2",
            "first_name": "Kwame",
            "last_name": "Mensah",
            "profile_image_url": "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
            "car_image_url": "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
            "car_seats": 5,
            "rating": "4.60"
        }
    },
    {
        "ride_id": "2",
        "origin_address": "Nairobi, Kenya",
        "destination_address": "Mombasa, Kenya",
        "origin_latitude": "1.292066",
        "origin_longitude": "36.821946",
        "destination_latitude": "-4.043477",
        "destination_longitude": "39.668206",
        "ride_time": 491,
        "fare_price": "20000.00",
        "payment_status": "paid",
        "driver_id": 1,
        "user_id": "1",
        "created_at": "2024-08-12 06:12:17.683046",
        "driver": {
            "driver_id": "1",
            "first_name": "John",
            "last_name": "Ochieng",
            "profile_image_url": "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
            "car_image_url": "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
            "car_seats": 4,
            "rating": "4.80"
        }
    },
    {
        "ride_id": "3",
        "origin_address": "Cape Town, South Africa",
        "destination_address": "Johannesburg, South Africa",
        "origin_latitude": "-33.924870",
        "origin_longitude": "18.424055",
        "destination_latitude": "-26.204103",
        "destination_longitude": "28.047305",
        "ride_time": 124,
        "fare_price": "17000.00",
        "payment_status": "paid",
        "driver_id": 1,
        "user_id": "1",
        "created_at": "2024-08-12 08:49:01.809053",
        "driver": {
            "driver_id": "1",
            "first_name": "Sipho",
            "last_name": "Zulu",
            "profile_image_url": "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
            "car_image_url": "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
            "car_seats": 4,
            "rating": "4.80"
        }
    },
    {
        "ride_id": "4",
        "origin_address": "Accra, Ghana",
        "destination_address": "Kumasi, Ghana",
        "origin_latitude": "5.603717",
        "origin_longitude": "-0.186964",
        "destination_latitude": "6.688497",
        "destination_longitude": "-1.624429",
        "ride_time": 159,
        "fare_price": "12000.00",
        "payment_status": "paid",
        "driver_id": 3,
        "user_id": "1",
        "created_at": "2024-08-12 18:43:54.297838",
        "driver": {
            "driver_id": "3",
            "first_name": "Michael",
            "last_name": "Mensah",
            "profile_image_url": "https://ucarecdn.com/0330d85c-232e-4c30-bd04-e5e4d0e3d688/-/preview/826x822/",
            "car_image_url": "https://ucarecdn.com/289764fb-55b6-4427-b1d1-f655987b4a14/-/preview/930x932/",
            "car_seats": 4,
            "rating": "4.70"
        }
    }
];


  return (
    <SafeAreaView style={{backgroundColor: theme.colors.general[500], marginHorizontal: 16}}>
      <FlatList
        data = {recentRides?.slice(0, 5)}
        renderItem={({item}) => <RideCard ride={item}/>}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{paddingBottom: 100, backgroundColor: theme.colors.general[500]}}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.container}>
            {!loading ? (
              <>
                <Image
                  source={images.noResult}
                  style={styles.image}
                  alt="No recent rides found"
                  resizeMode="contain"
                />
                <Text style={styles.text}>No recent rides found</Text>
              </>
            ) : (
              <ActivityIndicator size="small" color="#000" />
            )}
          </View>
        )}
        ListHeaderComponent={() =>(
          <>
            <View style={styles.headerContainer}>
              <Text style={styles.welcomeText}>
              Welcome {" "}
                {user?.firstName || user?.emailAddresses[0].emailAddress.split("@")[0]}{" "}👋
              </Text>
              <TouchableOpacity style={styles.signOutButton} onPress={() => handleSignOut()}>
                <Image
                  source={icons.out}
                  style={styles.signOutIcon}
                  resizeMode="contain"
                  alt="Sign out"
                />
              </TouchableOpacity>
          </View>
          <GoogleTextInput
            icon={icons.search}
            containerStyle={styles.inputContainer}
            handlePress={handleDestinationPress}
          />
          <>
            <Text style={{
              fontSize: 20,
              fontFamily: theme.fontFamily.JakartaBold,
              marginBottom: 12,
              marginTop: 20,
            }}>
              Your current location
            </Text>
            <View style={{
              flex: 1,
              flexDirection: "row",
              alignItems: 'center',
              backgroundColor: 'transparent',
              height: 300,
              borderRadius: 16
            }}>
              <Map/>
            </View>
          </>
          <Text style={{
              fontSize: 20,
              fontFamily: theme.fontFamily.JakartaBold,
              marginBottom: 12,
              marginTop: 20,
            }}>
              Recent Rides
            </Text>
          </>
        )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  image: {
    width: 160, // 40 * 4 (w-40)
    height: 160, // 40 * 4 (h-40)
  },
  text: {
    fontSize: 14, // text-sm
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20, // my-5
  },
  welcomeText: {
    fontSize: 20, // text-2xl
    fontFamily: theme.fontFamily.JakartaExtraBold, // Make sure this matches your font
  },
  signOutButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 40, // w-10
    height: 40, // h-10
    borderRadius: 20, // rounded-full
    backgroundColor: "white",
  },
  signOutIcon: {
    width: 20, // w-4
    height: 20, // h-4
  },
  searchInput: {
    backgroundColor: "white",
    shadowColor: "#000", // shadow-md shadow-neutral-300
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Android shadow
  },
  locationText: {
    fontSize: 20, // text-xl
    fontFamily: "JakartaBold", // Make sure this matches your font
    marginTop: 20, // mt-5
    marginBottom: 12, // mb-3
  },
  mapContainer: {
    height: 300, // h-[300px]
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  recentRidesText: {
    fontSize: 20, // text-xl
    fontFamily: "JakartaBold", // Make sure this matches your font
    marginTop: 20, // mt-5
    marginBottom: 12, // mb-3
  },
  inputContainer: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2, // For Android shadow
  },
});