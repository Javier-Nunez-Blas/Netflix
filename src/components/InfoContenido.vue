<template>
    <div class="info-contenido">
      <h1>Información de Contenido</h1>
  
      <div v-if="contenido">
        <h2>{{ contenido.titulo }}</h2>
        <p><strong>Titulo:</strong> {{ contenido.titulo }}</p>
        <p><strong>Tipo:</strong> {{ contenido.tipo }}</p>
        <p><strong>Año:</strong> {{ contenido.año }}</p>
        <p><strong>Categoría:</strong> {{ contenido.categoria }}</p>
        <p><strong>Calificación:</strong> {{ contenido.calificacion }}</p>
  
        <!-- Botón para añadir a la lista -->
        <div>
          <label for="lista">Selecciona una lista:</label>
          <select v-model="listaSeleccionada" id="lista">
            <option v-for="lista in listas" :key="lista.idLista" :value="lista.idLista">
              {{ lista.nombreLista }}
            </option>
          </select>
          <button @click="añadirALista">Añadir a la Lista</button>
        </div>
  
        <!-- Formulario para crear una nueva lista -->
        <div>
          <h3>Crear una nueva lista</h3>
          <input 
            v-model="nuevoNombreLista" 
            type="text" 
            placeholder="Nombre de la nueva lista" 
          />
          <button @click="crearNuevaLista">Crear Lista</button>
        </div>
      </div>
  
      <div v-else>
        <p>Cargando información del contenido...</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "InfoContenido",
    props: ["idContenido"],
    data() {
      return {
        contenido: null,
        listas: [],
        listaSeleccionada: null,
        nuevoNombreLista: "",
        usuarioId: 1, 
      };
    },
    methods: {
      async fetchContenido() {
        try {
          const response = await axios.get(
            `http://localhost:5109/api/contenidos/${this.idContenido}`
          );
          this.contenido = response.data;
        } catch (error) {
          console.error("Error al obtener la información del contenido:", error);
          alert("No se pudo cargar la información del contenido.");
        }
      },
  
      async fetchListas() {
        try {
          const response = await axios.get(
            `http://localhost:5109/api/listas/usuario/${this.usuarioId}/listas`
          );
          this.listas = response.data;
        } catch (error) {
          console.error("Error al obtener las listas del usuario:", error);
          alert("No se pudieron cargar las listas.");
        }
      },
  
      async añadirALista() {
        if (!this.listaSeleccionada) {
          alert("Selecciona una lista para añadir el contenido.");
          return;
        }
  
        try {
          await axios.post(
            `http://localhost:5109/api/listas/usuario/${this.usuarioId}/listas/${this.listaSeleccionada}/contenidos/${this.idContenido}`
          );
          alert("Contenido añadido correctamente a la lista.");
        } catch (error) {
          console.error("Error al añadir contenido a la lista:", error);
          alert("No se pudo añadir el contenido a la lista.");
        }
      },
  
      async crearNuevaLista() {
        if (!this.nuevoNombreLista) {
          alert("Por favor, ingresa un nombre para la lista.");
          return;
        }
  
        try {
          const nuevaLista = {
            nombreLista: this.nuevoNombreLista,
            idUsuario: this.usuarioId, 
          };
  
          const response = await axios.post(
            `http://localhost:5109/api/listas`, 
            nuevaLista
          );
  
          this.listas.push(response.data);
          this.nuevoNombreLista = "";
          alert("Nueva lista creada correctamente.");
        } catch (error) {
          console.error("Error al crear la lista:", error);
          alert("No se pudo crear la nueva lista.");
        }
      },
    },
    mounted() {
      this.fetchContenido();
      this.fetchListas();
    },
  };
  </script>