import { useNavigation } from '@react-navigation/native';
import  { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';  // Picker component for Expo

const schools = [
    { label: 'Select your school', value: '' },
    { label: 'Harvard University', value: 'harvard' },
    { label: 'Stanford University', value: 'stanford' },
    { label: 'MIT', value: 'mit' },
    { label: 'University of Oxford', value: 'oxford' },
    { label: 'University of Cambridge', value: 'cambridge' }, 
    // Add more schools as needed
  ];

export default function SignUpScreen({  }) {
  const [email, setEmail] = useState('');
      const navigation = useNavigation();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const handleSignUp = () => {
    if (email === '' || password === '' || confirmPassword === '' || !selectedSchool) {
      Alert.alert('Error', 'Please fill all fields.');
    }
    else if (!validateEmail(email)) {
        Alert.alert('Error', 'Please enter a valid email address.');
      } else if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
    } else {
      // Handle sign-up logic here
    //   Alert.alert('Success', 'Signed up successfully!');
      navigation.replace('(bookapp)')
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>

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

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

    {/* Picker for School Selection */}
      <Picker
        selectedValue={selectedSchool}
        onValueChange={(itemValue) => setSelectedSchool(itemValue)}
        style={styles.picker}
      >
        {schools.map((school) => (
          <Picker.Item key={school.value} label={school.label} value={school.value} />
        ))}
      </Picker>

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Already have an account?{' '}
        <Text style={styles.link} onPress={() => navigation.goBack()}>
          Sign In
        </Text>
      </Text>
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
  picker: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
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
