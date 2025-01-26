import {
  Dimensions,
  FlatList,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "expo-router";
const books = [
  {
    title: "القندس",
    author: "محمد حسن علوان",
    image: "https://picsum.photos/150/300",
    rating: 5.0,
  },
  {
    title: "عائد إلى حيفا",
    author: "غسان كنفاني",
    image: "https://example.com/images/haifa_return.jpg",
    rating: 3.5,
  },
  {
    title: "أولاد حارتنا",
    author: "نجيب محفوظ",
    image: "https://example.com/images/awlad_haratna.jpg",
    rating: 4,
  },
  {
    title: "في قلبي أنثى عبرية",
    author: "خولة حمدي",
    image: "https://example.com/images/fiqalbi.jpg",
    rating: 4.5,
  },
  {
    title: "رواية ساق البامبو",
    author: "سعود السنعوسي",
    image: "https://example.com/images/saq_albamboo.jpg",
    rating: 4,
  },
  {
    title: "الرجال من المريخ والنساء من الزهرة",
    author: "جون غراي",
    image: "https://example.com/images/men_mars_women_venus.jpg",
    rating: 4,
  },
  {
    title: "الخيميائي",
    author: "باولو كويلو",
    image: "https://example.com/images/alchemist.jpg",
    rating: 4,
  },
  {
    title: "زوربا",
    author: "نيكوس كازانتزاكيس",
    image: "https://example.com/images/zorba.jpg",
    rating: 4,
  },
  {
    title: "الأسود يليق بك",
    author: "أحلام مستغانمي",
    image: "https://example.com/images/alaswad_yaliq_bik.jpg",
    rating: 4,
  },
  {
    title: "الأجنحة المتكسرة",
    author: "جبران خليل جبران",
    image: "https://example.com/images/wings_broken.jpg",
    rating: 4,
  },
];

export default function Index() {
  const navigation = useNavigation();
  const Book = (item) => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate("bookdetails", item);
        }}
        style={{
          overflow: "hidden",
          width: Dimensions.get("window").width * 0.33,
          // height: 300,?
          backgroundColor: "#33d9b2855",
          // height: 200,
          borderWidth: 2,
          borderColor: "#4b4b4b",
          borderRadius: 5,
          margin: 2.5,
        }}
      >
        <View style={{ flex: 2.3, width: "100%", overflow: "hidden" }}>
          <Image
            style={{
              width: "100%",
              height: "100%",
              overflow: "hidden",
            }}
            resizeMode="cover"
            source={{
              uri: "https://picsum.photos/200/300",
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            margin: 5,
            marginTop: 0,
            justifyContent: "space-evenly",
          }}
        >
          <Text
            numberOfLines={1}
            // ellipsizeMode='middle'
            // adjustsFontSizeToFit
            style={{
              textAlign: "right",
              fontWeight: "bold",
            }}
          >
            {item.title}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="middle"
            style={{
              textAlign: "right",
            }}
          >
            {item.author}
          </Text>

          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 2.5,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text>2011</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 2,
                alignItems: "center",
              }}
            >
              <Text style={{ alignItems: "center" }}>{item.rating}</Text>
              <Ionicons name="star" size={15} color="#16a085" />
            </View>
          </View>
        </View>
      </Pressable>
    );
  };
  return (
    <ScrollView
      style={{
        width: Dimensions.get("window").width,
      }}
    >
      <View>
        <Text
          style={{
            margin: 10,
            color: "#4b4b4b",
            fontWeight: "bold",
            fontSize: 25,

            textAlign: "right",
          }}
        >
          الكتب الاعلى تقييما
        </Text>
        <FlatList
          data={books}
          horizontal
          showsHorizontalScrollIndicator={false}
          inverted
          style={{ width: Dimensions.get("window").width, height: 250 }}
          renderItem={({ item, index }) => <Book {...item} />}
        />
      </View>
      <View>
        <Text
          style={{
            margin: 10,
            color: "#4b4b4b",
            fontWeight: "bold",
            fontSize: 25,
            textAlign: "right",
          }}
        >
          الكتب الاحدث
        </Text>
        <FlatList
          data={books}
          horizontal
          inverted
          style={{ width: Dimensions.get("window").width, height: 250 }}
          renderItem={({ item, index }) => <Book {...item} />}
        />
      </View>
      <View>
        <Text
          style={{
            margin: 10,
            color: "#4b4b4b",
            fontWeight: "bold",
            fontSize: 25,
            textAlign: "right",
          }}
        >
          من اجلك
        </Text>
        <FlatList
          data={books}
          horizontal
          inverted
          style={{ width: Dimensions.get("window").width, height: 250 }}
          renderItem={({ item, index }) => <Book {...item} />}
        />
      </View>
    </ScrollView>
  );
}
