// Importation des modules nécessaires depuis React, React Native et d'autres dépendances.
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { Dimensions } from "react-native";
import { login } from "../../reducers/user";
import { EXPO_PUBLIC_BACKEND_URL } from '@env'
//import { LOCAL_BACKEND_URL } from "@env";

// Récupération des dimensions de la fenêtre.
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function SignIn({navigation}) {
  // Hook useDispatch pour utiliser les actions Redux
  const dispatch = useDispatch();
  // Hook useSelector pour obtenir l'état utilisateur
  const user = useSelector((state) => state.user.value);

   // Hooks d'états locaux 
  const [showSignup, setShowSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  // Fonction appelée lors de la soumission du formulaire
  const handleSubmit = () => {
    if (showSignup) {
      fetch(`${EXPO_PUBLIC_BACKEND_URL}/users/signup`, {
        // Requête POST vers le backend pour l'inscription.
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            setUsername("");
            setEmail("");
            setPassword("");
            // Réinitialisation des champs
          }
          setShowSignup(!showSignup)
        });
    } else {
      fetch(`${EXPO_PUBLIC_BACKEND_URL}/users/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            console.log("signIn", data);
            dispatch(
              login({
                token: data.token,
                username: data.username,
                email: data.email,
                profilPictURL: "",
              })
            );
            navigation.navigate("HomeScreen");
            
            //retarder la reinitialisation des états
            setTimeout(() => {
              setUsername(""), { connectTimeoutMS: 3000 };
              setPassword(""), { connectTimeoutMS: 3000 };
            }, 1000);
          }
        });
    }
  };

  // Fonction pour basculer entre les modes connexion et inscription
  const handleToggleSignup = () => {
    setShowSignup(!showSignup);
  };

  return (
    <View style={styles.modalGrey}>
      <View style={styles.imputContainer}>
        <View>
          <Text style={styles.title}>
            {showSignup ? "Inscription" : "Connexion"}
          </Text>
          <Text style={styles.textContent}>
            Pour créer le dressing de ses rêves!
          </Text>
        </View>
        <TextInput
          email
          placeholder="Identifiant"
          autoCapitalize="none" 
          keyboardType="default" 
          textContentType="username" 
          autoComplete="username" 
          onChangeText={(value) => setUsername(value)}
          value={username}
          style={styles.input}
        />
        {showSignup && (
          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoComplete="email"
            onChangeText={(value) => setEmail(value)}
            value={email}
            style={styles.input}
          />
        )}
        <TextInput
          placeholder="Mot de passe"
          secureTextEntry={isPasswordHidden}
          autoCapitalize="none"
          keyboardType="default"
          textContentType="password"
          // autoComplete="current-password" // https://reactnative.dev/docs/textinput#autocomplete-android
          onChangeText={(value) => setPassword(value)}
          value={password}
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.buttonGreen}
          onPress={() => handleSubmit()}
          activeOpacity={0.8}
        >
          <Text style={styles.textLink}>
            {showSignup ? "S'inscrire" : "Se connecter"}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.viewContainer}>
        <Text style={styles.textBottom}>
          {showSignup ? "Déjà un compte?" : "Pas encore de compte?"}
        </Text>
        <TouchableOpacity
          onPress={() => handleToggleSignup()}
          activeOpacity={0.8}
        >
          <Text style={styles.textLink}>
            {showSignup ? "Connexion" : "Inscription"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalGrey: {
    height: windowHeight * 0.77,
    backgroundColor: "#EAF4F4",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "flex-start",
    width: windowWidth,
  },

  imputContainer: {
    alignItems: "center",
    rowGap: 10,
  },
  input: {
    width: windowWidth * 0.9,
    padding: 10,
    borderWidth: 1.5,
    fontSize: 16,
    borderRadius: 10,
    borderColor: "#6B9080",
    backgroundColor: "#fff",
  },
  buttonGreen: {
    width: windowWidth * 0.9,
    alignItems: "center",
    backgroundColor: "#6B9080",
    padding: 12,
    borderRadius: 10,
  },
  title: {
    fontFamily: "Lora-Bold",
    fontSize: 20,
    color: "black",
    textAlign: "center",
    padding: 15,
  },
  viewContainer: {
    position: "absolute",
    bottom: "20%",
    left: 0,
    right: 0,
    alignItems: "center",
    padding: "10%",
  },

  textBottom: {
    fontFamily: "Lora-Regular",
  },

  textLink: {
    fontFamily: "Lora-Bold",
  },

  textContent: {
    fontFamily: "Lora-Regular",
    paddingBottom: "5%",
    width: "100%",
  },
});
