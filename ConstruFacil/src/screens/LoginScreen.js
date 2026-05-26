// src/screens/LoginScreen.js
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, KeyboardAvoidingView, Platform, Image,
} from 'react-native';

const USUARIOS = [
  { usuario: 'joao', senha: '1234', nome: 'Sr. João (Proprietário)' },
  { usuario: 'carlos', senha: '1234', nome: 'Carlos (Pátio)' },
];

export default function LoginScreen({ navigation }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    const user = USUARIOS.find(
      (u) => u.usuario === usuario.toLowerCase() && u.senha === senha
    );
    if (user) {
      navigation.navigate('Estoque', { nomeUsuario: user.nome });
    } else {
      Alert.alert('Erro', 'Usuário ou senha incorretos.\nTente: joao / 1234');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.logoBox}>
        <Text style={styles.logoIcon}>🏗️</Text>
        <Text style={styles.logoTitulo}>ConstruFácil</Text>
        <Text style={styles.logoSubtitulo}>Gestão de Estoque</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitulo}>Acesso ao Sistema</Text>

        <Text style={styles.label}>Usuário</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu usuário"
          value={usuario}
          onChangeText={setUsuario}
          autoCapitalize="none"
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          placeholderTextColor="#aaa"
        />

        <TouchableOpacity style={styles.botao} onPress={handleLogin}>
          <Text style={styles.botaoTexto}>ENTRAR</Text>
        </TouchableOpacity>

        <Text style={styles.dica}>Depósito ConstruBem Ltda. • Manaus, AM</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a3a2a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logoBox: { alignItems: 'center', marginBottom: 32 },
  logoIcon: { fontSize: 56 },
  logoTitulo: { fontSize: 32, fontWeight: '800', color: '#f5c842', letterSpacing: 1 },
  logoSubtitulo: { fontSize: 14, color: '#8fbc8f', marginTop: 4 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 28,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  cardTitulo: { fontSize: 18, fontWeight: '700', color: '#1a3a2a', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 13, fontWeight: '600', color: '#555', marginBottom: 6 },
  input: {
    borderWidth: 1.5,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    color: '#222',
    marginBottom: 16,
    backgroundColor: '#fafafa',
  },
  botao: {
    backgroundColor: '#2d6a4f',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 4,
  },
  botaoTexto: { color: '#fff', fontWeight: '800', fontSize: 15, letterSpacing: 1.5 },
  dica: { textAlign: 'center', color: '#aaa', fontSize: 11, marginTop: 20 },
});
