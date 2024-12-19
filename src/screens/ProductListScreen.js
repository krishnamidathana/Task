import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome
import { fetchProducts } from "../services/api"; // Import the fetchProducts function
import { SafeAreaView } from "react-native-safe-area-context";

// Get the screen width for responsive design
const { width } = Dimensions.get("window");

const ProductListScreen = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetchProducts();
        // Access the array inside the 'data' property
        const productsArray = response.data; // Use 'data' to access the array

        const limitedData = productsArray.slice(0, 10); // Limit to 10 products
        setProducts(limitedData);
        setFilteredProducts(limitedData);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = products.filter((item) =>
      item.productname.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <View style={styles.container}>

      {/* Search Bar with Icon */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          placeholder="Search Products..."
          value={searchQuery}
          onChangeText={handleSearch}
          style={styles.searchBar}
          placeholderTextColor="#888"
        />
      </View>

      {loading ? (
         <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
       </View>
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2} // Set number of columns to 2
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image
                source={{ uri: item.productimg }}
                style={styles.productImage}
              />
              <Text style={styles.productName}>{item.productname}</Text>
              <Text style={styles.productPrice}>₹ {item.mrp}</Text>
            </View>
          )}
          contentContainerStyle={styles.flatListContainer} // Add a container for spacing
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    padding: 10,
    paddingTop:20,
  },
 
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 22,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    height: 45,
    fontSize: 16,
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 5, // Add some spacing between cards
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
    width: (width - 40) / 2, // Calculate width of each item based on screen size
  },
  productImage: {
    width: "100%",
    height: 120,
    resizeMode: "contain",
    borderRadius: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
    marginVertical: 5,
  },
  productPrice: {
    fontSize: 14,
    color: "#000",
    fontWeight:"bold",
    
  },
  flatListContainer: {
    paddingBottom: 20, // Add padding to the bottom of the list
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9", // Optional: Match the background color
  },
});

export default ProductListScreen;
