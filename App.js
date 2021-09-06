import React, { useState, useEffect } from 'react';
import {Text, View, FlatList, TextInput, Button, TouchableHighlight, StyleSheet,} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import shortid from 'shortid';

export default function App() {
  const [nombre, guardarInputTexto] = useState('');
  const [lista, guardarlista] = useState([]);

  const [edad, guardarInputTextoE] = useState('');
  const [listaE, guardarlistaE] = useState([]);

  const [carrera, guardarInputTextoC] = useState('');
  const [listaC, guardarlistaC] = useState([]);

  useEffect(() => {
    obtenerDatosStorage();
  }, []);



  const guardarDato = async () => {
    try {
      const nombrealumno = { nombre };
      nombrealumno.id = shortid.generate();

 const edadalumno= { edad };
      edadalumno.id = shortid.generate();

const carreraalumno= { carrera };
      carreraalumno.id = shortid.generate();

      const listanombres = [...lista, nombrealumno];
      guardarlista(listanombres);
      const datos = JSON.stringify(listanombres);
      await AsyncStorage.setItem('listaalumnos', datos);

      const listaedad = [...listaE, edadalumno];
      guardarlistaE(listaedad);
      const datos1 = JSON.stringify(listaedad);
      await AsyncStorage.setItem('listaedades', datos1);

const listacarrera = [...listaC, carreraalumno];
      guardarlistaC(listacarrera);
      const datos2 = JSON.stringify(listacarrera);
      await AsyncStorage.setItem('listacarreras', datos2);

    } catch (error) {
      console.log(error);
    }
  };

  const obtenerDatosStorage = async () => {
    try {
      const nombreStorage = await AsyncStorage.getItem('listaalumnos');
      if (nombreStorage) {
        guardarlista(JSON.parse(nombreStorage));
 console.log(`esta es la: ${nombreStorage}`);
        }
    } catch (error) {
      console.log(error);
    }

    try {
      const edadStorage = await AsyncStorage.getItem('listaedades');
      if (edadStorage) {
        guardarlistaE(JSON.parse(edadStorage));
 console.log(`esta es la: ${edadStorage}`);
        }
    } catch (error) {
      console.log(error);
    }

    try {
      const carreraStorage = await AsyncStorage.getItem('listacarreras');
      if (carreraStorage) {
        guardarlistaC(JSON.parse(carreraStorage));
 console.log(`esta es la: ${carreraStorage}`);
        }
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarDato = (id) => {
    try {
      const nombresFiltrados = lista.filter((nombre) => nombre.id !== id);
      guardarlista(nombresFiltrados);
      guardarDato();
    } catch (error) {
      console.log(error);
    }

    try {
      const edadFiltrados = listaE.filter((edad) => edad.id !== id);
      guardarlistaE(edadFiltrados);
      guardarDato();
    } catch (error) {
      console.log(error);
    }

    try {
      const carreraFiltrados = listaC.filter((carrera) => carrera.id !== id);
      guardarlistaC(carreraFiltrados);
      guardarDato();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
            <View style={styles.contenedor}>
        <TextInput
          placeholder="Nombre"
          style={styles.input}
          onChangeText={(texto) => guardarInputTexto(texto)}
        />

        <TextInput
          placeholder="Edad"
          style={styles.input}
          onChangeText={(texto) => guardarInputTextoE(texto)}
        />


 <TextInput
          placeholder="Carrera"
          style={styles.input}
          onChangeText={(texto) => guardarInputTextoC(texto)}
        />


        <Button  title="Guardar" color="blue"  onPress={() => guardarDato()} />

        <Text style={styles.titulo}>
          {lista.length > 0 ? 'Lista de alumnos' : 'No hay alumnos, agrega uno'}
        </Text>
<Text>
       {lista?( <FlatList
          style={styles.item}
          data={lista}
          renderItem={({ item }) => <Text>{item.nombre} </Text>}
          keyExtractor={(item) => item.id}
        />) :null}

        {listaE?(<FlatList
          style={styles.item1}
          data={listaE}
          renderItem={({ item }) => <Text>{item.edad} </Text>}
          keyExtractor={(item) => item.id}
        />) :null}

        {listaC?(<FlatList
          style={styles.item2}
          data={listaC}
          renderItem={({ item }) => <Text>{item.carrera} </Text>}
          keyExtractor={(item) => item.id}
        />) :null}
              
 </Text>
        

        
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 135, 
  },

  Button: {
    marginTop:5,
    paddingTop: 15,

  },
  input: {
    borderColor: 'blue',
    borderBottomWidth: 1,
    width: 300,
    height: 40
  
    
  },
  titulo:{
    fontFamily: 'Arial',
    fontSize: 20,
    color: 'red',
    backgroundColor: 'yellow',
    marginTop:5,
    marginHorizontal: 4,
    marginBottom:5
  },

  
  item: {
    
    backgroundColor: 'orange',
    padding: 17,
    marginVertical: 2,
    marginHorizontal: 0,
  },
  item1: {
    backgroundColor: 'orange',
    padding: 17,
    marginVertical: 2,
    marginHorizontal: 0,

  },

  item2: {
    backgroundColor: 'orange',
    padding: 17,
    marginVertical: 2,
    marginHorizontal: 0,

  }

});
