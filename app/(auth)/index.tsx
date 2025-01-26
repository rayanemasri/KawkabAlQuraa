import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function SignInScreen() {
    const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);

  };
  
  const handleSignIn = () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please enter both email and password.');
      
    } else if (!validateEmail(email)) {
        Alert.alert('Error', 'Please enter a valid email address.');
    } else {
      // Handle sign-in logic here
    //   Alert.alert('Success', 'Signed in successfully!');
      navigation.replace('(bookapp)')

    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign In</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>Don't have an account? <Text style={styles.link} onPress={()=>{
        navigation.navigate('signup');
      }}>Sign Up</Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footerText: {
    marginTop: 20,
    color: '#777',
  },
  link: {
    color: '#007BFF',
  },
});
