import React from 'react';
import { Image, Text, View, StyleSheet } from "react-native";
import { icons } from "@/app/constants/index";
import { formatDate, formatTime } from "@/lib/utils";
import { Ride } from "@/types/type";

import theme from '@/utils/theme';

const RideCard = ({ ride }: { ride: Ride }) => {
  const isPaid = ride.payment_status === "paid";

  return (
    <View style={styles.cardContainer}>
      <View style={styles.innerContainer}>
        <View style={styles.row}>
          <Image
            source={{
              uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${ride.destination_longitude},${ride.destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
            }}
            style={styles.mapImage}
          />

          <View style={styles.addressContainer}>
            <View style={styles.addressRow}>
              <Image source={icons.to} style={styles.icon} />
              <Text style={styles.addressText} numberOfLines={1}>
                {ride.origin_address}
              </Text>
            </View>

            <View style={styles.addressRow}>
              <Image source={icons.point} style={styles.icon} />
              <Text style={styles.addressText} numberOfLines={1}>
                {ride.destination_address}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Date & Time</Text>
            <Text style={styles.infoText} numberOfLines={1}>
              {formatDate(ride.created_at)}, {formatTime(ride.ride_time)}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Driver</Text>
            <Text style={styles.infoText}>
              {ride.driver.first_name} {ride.driver.last_name}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Car Seats</Text>
            <Text style={styles.infoText}>{ride.driver.car_seats}</Text>
          </View>

          <View style={[styles.infoRow, {paddingBottom: 0, borderBottomWidth: 0, marginBottom: 0}]}>
            <Text style={styles.infoLabel}>Payment Status</Text>
            <Text
              style={[
                styles.infoText,
                { color: isPaid ? "green" : "red",
                    textTransform: 'capitalize'
                 },
              ]}
            >
              {ride.payment_status}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 12,
  },
  innerContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 14,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mapImage: {
    width: 79,
    height: 90,
    borderRadius: 10,
  },
  addressContainer: {
    flexDirection: "column",
    marginLeft: 20,
    flex: 1,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  icon: {
    width: 20,
    height: 20,
  },
  addressText: {
    marginLeft: 8,
    fontSize: 13,
    fontFamily: theme.fontFamily.JakartaMedium,
    marginVertical: 6
  },
  infoContainer: {
    width: "100%",
    marginTop: 20,
    backgroundColor: theme.colors.general[500],
    borderRadius: 14,
    padding: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    borderBottomColor: "white",
    borderBottomWidth: 2,
    paddingBottom: 10,
  },
  infoLabel: {
    fontSize: 15,
    fontFamily: "JakartaMedium",
    color: "gray",
  },
  infoText: {
    fontSize: 15,
    fontFamily: "JakartaBold",
  },
});

export default RideCard;