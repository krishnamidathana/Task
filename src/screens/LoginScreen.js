import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome"; 
import { login } from "../services/api";
import fb from "../assets/images/facebook.png";
import Google from "../assets/images/Google.png";
import apple from "../assets/images/apple.png";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const handleLogin = async () => {
    try {
      setLoading(true);
      if(!email || !password){
        Alert.alert('Missing Information', 'Please fill in both the email and password fields.')
        return
      }
      const data = await login(email, password ,navigation,setEmail,setPassword);
      if(data){

        navigation.navigate("ProductList");
        setEmail('')
        setPassword('')
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>

      {/* Titles */}
      <Text style={[styles.title, { marginTop: 15 }]}>Welcome</Text>
      <Text style={[styles.title, { marginBottom: 25 }]}>Back!</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="#888" style={styles.icon} />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
            keyboardType="default"
            autoCapitalize="none"
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#888" style={styles.icon} />
        <TextInput
          placeholder="Password"
          value={password}
          secureTextEntry={!showPassword}
          onChangeText={setPassword}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? "eye" : "eye-slash"}
            size={20}
            color="#888"
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Forgot Password */}
      <View style={styles.forgotPasswordContainer}>
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Logging in..." : "Login"}
        </Text>
      </TouchableOpacity>

      {/* OR Text */}
      <Text style={styles.orText}>Or Continue With</Text>

      {/* Social Media Icons */}
      <View style={styles.socialIconsContainer}>
        <Image source={fb} style={styles.socialIcon} />
        <Image source={apple} style={styles.socialIcon} />
        <Image source={Google} style={styles.socialIcon} />
      </View>

      {/* Create Account Section */}
      <View style={styles.signupContainer}>
        <Text style={styles.createAccountText}>Create An Account</Text>
        <TouchableOpacity>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    alignSelf:"flex-start",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: "#fff",
    
  },
  icon: {
    marginRight: 10,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  forgotPasswordContainer: {
    width: "100%",
    alignItems: "flex-end", // Align to the right
  },
  forgotPasswordText: {
    color: "#eb3b6a",
    fontSize: 13,
    textDecorationLine: "underline",
  },
  button: {
    width: "100%",
    backgroundColor: "#eb3b6a",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 38,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  orText: {
    fontSize: 14,
    color: "#888",
    marginTop: 55,
  },
  socialIconsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
    gap:10,
  },
  socialIcon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  signupContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  createAccountText: {
    fontSize: 14,
    color: "#444",
  },
  signupText: {
    fontSize: 14,
    color: "#eb3b6a",
    textDecorationLine: "underline",
    marginLeft: 5,
  },
});

export default LoginScreen;