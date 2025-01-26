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
              color="#FFD700"
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
          في كتاب رحلة عبر الزمن، يأخذنا الكاتب في رحلة ساحرة بين الماضي والحاضر
          والمستقبل، حيث تتشابك الأحداث والقصص بطريقة فريدة تلهم القارئ للتفكير
          في عمق الحياة ومعانيها. يستعرض الكتاب مزيجًا من الحكايات التاريخية،
          والشخصيات المؤثرة، والحكم التي نقلها الأجداد. بأسلوب أدبي غني ولغة
          عذبة، يعيد الكاتب إحياء تفاصيل التراث العربي من خلال رؤية حديثة تتحدث
          عن الأصالة والحداثة في آنٍ واحد. رحلة عبر الزمن هو كتاب لكل من يبحث عن
          فهم أعمق للتاريخ العربي وجذوره، وكيف يمكن لهذه الجذور أن تشكل حاضرنا
          وتلهم مستقبلنا. مثالي لمحبي الأدب العربي الذين يبحثون عن قراءة تجمع
          بين الحكمة والخيال بأسلوب ممتع ومؤثر.
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
    backgroundColor: "#fdfdfd",
    flexGrow: 1,
  },
  imageContainer: {
    backgroundColor: "#eee",
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
    color: "#333",
    marginBottom: 10,
  },
  author: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "right",
    color: "#333",
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
    color: "#777",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "right",
    color: "#555",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#16a085",
    paddingVertical: 12,
    borderRadius: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default BookDetails;
