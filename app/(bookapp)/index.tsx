import {
  Dimensions,
  FlatList,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextInput
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "expo-router";
import colors from '../../assets/colors.json';
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { mostrated, foryou, latest } from '../../books';
import { EvilIcons, FontAwesome } from "@expo/vector-icons";

const genres = ['Fantasy', 'Science Fiction', 'Mystery', 'Romance', 'Horror', 'Thriller', 'Non-fiction'];

function GenreSelection(props) {
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    loadSelectedGenres();
  }, []);

  // Load saved genres
  const loadSelectedGenres = async () => {
    try {
      const savedGenres = await AsyncStorage.getItem('favoriteGenres');
      if (savedGenres) {
        setSelectedGenres(JSON.parse(savedGenres));
      }
    } catch (error) {
      console.log('Error loading genres:', error);
    }
  };

  // Save selected genres
  const saveGenres = async () => {
    try {
      await AsyncStorage.setItem('favoriteGenres', JSON.stringify(selectedGenres));
      Alert.alert('Success', 'Your favorite genres have been saved!');
    } catch (error) {
      console.log('Error saving genres:', error);
    }
  };

  // Handle genre selection
  const handleSelectGenre = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else if (selectedGenres.length < 3) {
      setSelectedGenres([...selectedGenres, genre]);
    } else {
      Alert.alert('Limit Reached', 'You can only select up to 3 genres.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Favorite Genres (Up to 3)</Text>
      <FlatList
        data={genres}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.genreItem,
              selectedGenres.includes(item) && styles.selectedGenreItem,
            ]}
            onPress={() => handleSelectGenre(item)}
          >
            <Text style={styles.genreText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.saveButton} onPress={saveGenres}>
        <Text style={styles.saveButtonText}>Save Genres</Text>
      </TouchableOpacity>
    </View>
  );
}
export default function Index() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [selectedGenres, setSelectedGenres] = useState([])
  useEffect(() => {
    checkBookGenres()
  }, [])
  const checkBookGenres = async () => {
    try {
      const savedGenres = await AsyncStorage.getItem('favoriteGenres');
      if (savedGenres) {
        setLoading(false)
        setSelectedGenres(JSON.parse(savedGenres));
      }
      setLoading(false)

    } catch (error) {
      console.log('Error loading genres:', error);
      setLoading(false)
    };
  }

  const Book = (item) => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate("bookdetails", item);
        }}
        style={{
          overflow: "hidden",
          width: Dimensions.get("window").width * (item.search ? 0.3 : 0.37),
          height: item.search ? 250 : null,
          backgroundColor: colors.white,
          // height: 200,
          borderWidth: 3,
          borderColor: colors.green,
          borderRadius: 25,
          marginHorizontal: item.search ? 5 : 0,
        }}
      >
        <View style={{ flex: item.search ? 1.8 : 2.3, width: "100%", overflow: "hidden", alignItems: 'center', justifyContent: 'center' }}>
          <Image
            style={{
              width: "90%",
              margin: 10,
              borderRadius: 25,
              height: "90%",
              overflow: "hidden",
            }}
            resizeMode="cover"
            source={{
              uri: item.image,
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
              color: colors.black,
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
              color: colors.black,
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
            <Text style={{
              color: colors.black,
            }}>{item.year}</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 2,
                alignItems: "center",
              }}
            >
              <Text style={{
                alignItems: "center",
                color: colors.black,

              }}>{item.rating}</Text>
              <Ionicons name="star" size={15} color={colors.green} />
            </View>
          </View>
        </View>
      </Pressable>
    );
  };
  const [search, setSearch] = useState('');

  if (loading) {
    return (<View style={{
      ...Dimensions.get('window'),
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <ActivityIndicator color={colors.green} size={'large'} />
    </View>)
  }
  if (selectedGenres.length == 0) {
    return <GenreSelection />

  }
  return (
    <ScrollView
      style={{
        width: Dimensions.get("window").width,
      }}
    >
      <View style={{
        width: Dimensions.get("window").width,
        padding: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
      }}>
        <FontAwesome name='search' size={30} color='#3a3a3a' style={{ alignSelf: 'center' }} />
        <TextInput style={{ borderRadius: 15, borderWidth: 1, flex: 1, paddingRight: 10,borderColor:"#3a3a3a" }} onChangeText={setSearch} value={search} placeholder='ابحث عن كتاب' />
      </View>
      {search !== '' ?
        <View>

          <FlatList
            numColumns={3}
            data={[...mostrated, ...foryou, ...latest].filter(i => (i.author.toLowerCase().includes(search.toLowerCase())
              || (i.title.toLowerCase().startsWith(search.toLowerCase()))))}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 20, }}
            style={{ width: Dimensions.get("window").width, }} ا
            renderItem={({ item, index }) => <Book {...item} search />}
          />
        </View> : <>
          <View>
            <Text
              style={{
                margin: 10,
                fontWeight: "bold",
                fontSize: 25,
                color: colors.black,
                textAlign: "right",
              }}
            >
              الكتب الاعلى تقييما
            </Text>
            <FlatList
              data={mostrated}
              horizontal
              showsHorizontalScrollIndicator={false}
              inverted
              contentContainerStyle={{
                gap: 10,
                paddingStart: 15
              }}
              style={{ width: Dimensions.get("window").width, height: 250 }}
              renderItem={({ item, index }) => <Book {...item} />}
            />
          </View>
          <View>
            <Text
              style={{
                margin: 10,
                color: colors.black,
                fontWeight: "bold",
                fontSize: 25,
                textAlign: "right",
              }}
            >
              الكتب الاحدث
            </Text>
            <FlatList
              data={latest}
              horizontal
              showsHorizontalScrollIndicator={false}
              inverted
              contentContainerStyle={{
                gap: 10,
                paddingStart: 15

              }}
              style={{ width: Dimensions.get("window").width, height: 250 }}
              renderItem={({ item, index }) => <Book {...item} />}
            />
          </View>
          <View>
            <Text
              style={{
                color: colors.black,
                margin: 10,
                fontWeight: "bold",
                fontSize: 25,
                textAlign: "right",
              }}
            >
              من اجلك
            </Text>
            <FlatList
              data={foryou}
              showsHorizontalScrollIndicator={false}
              horizontal
              inverted
              contentContainerStyle={{
                gap: 10,
                paddingStart: 15
              }}
              style={{ width: Dimensions.get("window").width, height: 250 }}
              renderItem={({ item, index }) => <Book {...item} />}
            />
          </View>
        </>}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  genreItem: {
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
  },
  selectedGenreItem: {
    backgroundColor: '#4caf50',
  },
  genreText: {
    fontSize: 16,
    color: '#000',
  },
  saveButton: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#2196f3',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});