// src/screens/admin/CadastrarSala.js
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from '../../components/form/Button';
import Input from '../../components/form/Input';
import { api } from '../../services/api';

export default function CadastrarSala() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [nivelAcesso, setNivelAcesso] = useState('');
  const navigation = useNavigation();

  const handleCadastrar = async () => {
    if (!nome) return Alert.alert('Erro', 'Número da Porta é obrigatório');

    const res = await api.cadastrarSala({
      nome,
      descricao,
      nivelAcesso: Number(nivelAcesso)
    });

    if (res.success) {
      Alert.alert('Sucesso', 'Porta cadastrada!');
      navigation.goBack();
    } else {
      Alert.alert('Erro', 'Falha ao cadastrar porta');
    }
  };

  return (
    <View style={styles.container}>

      {/* Círculo superior */}
      <View style={styles.circleTop} />

      {/* Círculo inferior */}
      <View style={styles.circleBottom} />

      <Text style={styles.title}>Cadastrar Portas</Text>

      <Text style={styles.subtitle}>
        Preencha as informações abaixo para registrar uma nova porta no sistema.
      </Text>

      <Input
        label="Número da Porta"
        value={nome}
        onChangeText={setNome}
        labelStyle={styles.label}
        inputStyle={styles.input}
      />

      <Input
        label="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        labelStyle={styles.label}
        inputStyle={styles.input}
      />

      <Input
        label="Nível de Acesso"
        value={nivelAcesso}
        onChangeText={setNivelAcesso}
        keyboardType="numeric"
        placeholder="ex: 0, 1, 2..."
        labelStyle={styles.label}
        inputStyle={styles.input}
      />

      <Button
        title="Cadastrar"
        onPress={handleCadastrar}
        style={styles.primaryButton}
        textStyle={styles.buttonText}
      />

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1b2a',
    padding: 24,
    justifyContent: 'center',
  },

  /* CÍRCULO SUPERIOR */
  circleTop: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 260,
    backgroundColor: '#1C3B70',
    top: -120,
    left: -80,
    opacity: 0.25,
    zIndex: -1,
  },

  /* CÍRCULO INFERIOR */
  circleBottom: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 260,
    backgroundColor: '#1C3B70',
    bottom: -100,
    right: -60,
    opacity: 0.3,
    zIndex: -1,
  },

  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
  },

  subtitle: {
    color: '#d1d5db',
    fontSize: 14,
    marginBottom: 35,
  },

  label: {
    color: '#fff',
    marginBottom: 6,
    fontSize: 15,
  },

  input: {
    backgroundColor: '#1C3B70',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
  },

  primaryButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  logoutButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 25,
  },

  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
