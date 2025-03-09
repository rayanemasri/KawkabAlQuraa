import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import colors from '../../assets/colors.json'
const BookDetails = () => {
  const { params } = useRoute();
  const [readmore, showmore] = useState(false);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Book Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: params.image }} style={styles.image} />
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        <Text style={styles.title}>{params.title}</Text>
        <Text style={styles.author}>{params.author}</Text>

        {/* Rating */}
        <View style={styles.ratingContainer}>
          {Array.from({ length: 5 }, (_, index) => (
            <FontAwesome
              key={index}
              name={index < Math.floor(params?.rating) ? "star" : "star-o"}
              size={20}
              color={colors.green}
            />
          ))}
          <Text style={styles.rating}>{params?.rating.toFixed(1)}</Text>
        </View>

        {/* Description */}
        <Text
          style={{
            margin: 5,
            textAlign: "right",
            fontSize: 25,
            fontWeight: "heavy",
          }}
        >
          لمحة عن الكتاب
        </Text>
        <Text
          style={styles.description}
          numberOfLines={readmore ? null : 5}
          onPress={() => {
            showmore(true);
          }}
        >
          {params.description}
        </Text>

        {/* Action Button */}
        <TouchableOpacity
        activeOpacity={0.7}
          style={styles.button}
          onPress={() => {
            alert("تم الحجز بنجاح");
          }}
        >
          <Text style={styles.buttonText}>احجز الكتاب</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flexGrow: 1,
  },
  imageContainer: {
    backgroundColor: colors.white,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "right",
    color: colors.black,
    marginBottom: 10,
  },
  author: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "right",
    color: colors.black,
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "center",
    marginBottom: 15,
  },
  rating: {
    fontSize: 16,
    marginLeft: 8,
    color: colors.black,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "right",
    color: colors.black,
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.green,
    paddingVertical: 12,
    borderRadius: 15,
    alignItems: "center",
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default BookDetails;
