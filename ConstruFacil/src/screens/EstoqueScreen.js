// src/screens/EstoqueScreen.js
import React, { useState, useCallback } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { PRODUTOS_INICIAIS, calcularSaldoLiquido } from '../data/database';

const CATEGORIA_CORES = {
  Alvenaria: '#e07b39',
  Madeira: '#5c8a3c',
  Argamassa: '#607d8b',
  Agregados: '#a0825c',
  Ferragem: '#546e7a',
};

export default function EstoqueScreen({ navigation, route }) {
  const nomeUsuario = route.params?.nomeUsuario || 'Usuário';
  const [movimentacoes, setMovimentacoes] = useState([]);

  useFocusEffect(
    useCallback(() => {
      // Ao voltar para esta tela, recebe movimentações atualizadas
      const novas = route.params?.novasMovimentacoes || [];
      setMovimentacoes((prev) => [...prev, ...novas]);
    }, [route.params?.novasMovimentacoes])
  );

  const renderItem = ({ item }) => {
    const saldo = calcularSaldoLiquido(item, movimentacoes);
    const emAlerta = saldo <= item.quantidadeMinima;
    const cor = CATEGORIA_CORES[item.categoria] || '#607d8b';

    return (
      <TouchableOpacity
        style={[styles.card, emAlerta && styles.cardAlerta]}
        onPress={() => navigation.navigate('Movimentacao', { produto: item, nomeUsuario })}
        activeOpacity={0.7}
      >
        <View style={[styles.categoriaBadge, { backgroundColor: cor }]}>
          <Text style={styles.categoriaTexto}>{item.categoria}</Text>
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.nomeProduto}>{item.nome}</Text>
          <View style={styles.saldoRow}>
            <Text style={[styles.saldoValor, emAlerta && styles.saldoAlerta]}>
              {saldo} {item.unidade}
            </Text>
            {emAlerta && <Text style={styles.alertaIcon}>⚠️ Estoque Baixo</Text>}
          </View>
        </View>
        <Text style={styles.chevron}>›</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a3a2a" />

      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitulo}>🏗️ ConstruFácil</Text>
          <Text style={styles.headerSub}>Olá, {nomeUsuario.split(' ')[0]}!</Text>
        </View>
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeTexto}>{PRODUTOS_INICIAIS.length} itens</Text>
        </View>
      </View>

      <Text style={styles.secaoTitulo}>Saldo Líquido do Estoque</Text>

      <FlatList
        data={PRODUTOS_INICIAIS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('Movimentacao', { produto: null, nomeUsuario })}
      >
        <Text style={styles.fabTexto}>+ Registrar Movimentação</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f0' },
  header: {
    backgroundColor: '#1a3a2a',
    padding: 20,
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitulo: { color: '#f5c842', fontSize: 22, fontWeight: '800' },
  headerSub: { color: '#8fbc8f', fontSize: 13, marginTop: 2 },
  headerBadge: { backgroundColor: '#2d6a4f', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6 },
  headerBadgeTexto: { color: '#fff', fontWeight: '700', fontSize: 12 },
  secaoTitulo: { padding: 16, paddingBottom: 8, fontSize: 13, fontWeight: '700', color: '#555', letterSpacing: 0.5 },
  lista: { padding: 12, paddingTop: 4, paddingBottom: 100 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 10,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  cardAlerta: { borderLeftWidth: 4, borderLeftColor: '#e74c3c' },
  categoriaBadge: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 12,
  },
  categoriaTexto: { color: '#fff', fontSize: 10, fontWeight: '700' },
  cardBody: { flex: 1 },
  nomeProduto: { fontSize: 15, fontWeight: '700', color: '#1a3a2a', marginBottom: 4 },
  saldoRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  saldoValor: { fontSize: 18, fontWeight: '800', color: '#2d6a4f' },
  saldoAlerta: { color: '#e74c3c' },
  alertaIcon: { fontSize: 11, color: '#e74c3c', fontWeight: '600' },
  chevron: { fontSize: 24, color: '#ccc', marginLeft: 8 },
  fab: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
    backgroundColor: '#f5c842',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#f5c842',
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  fabTexto: { color: '#1a3a2a', fontWeight: '800', fontSize: 15 },
});
