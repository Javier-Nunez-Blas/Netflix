<template>
    <div class="listas-contenidos">
      <h1>Mis Listas de Seguimiento</h1>
  
      <!-- Buscador por Año -->
      <div class="buscador">
        <h2>Buscar Contenidos por Año</h2>
        <input v-model="añoBusqueda" type="number" placeholder="Año" />
        <button @click="buscarPorAño">Buscar</button>
      </div>
  
      <!-- Resultados del Buscador -->
      <div v-if="resultadosBusqueda.length > 0" class="resultados-busqueda">
        <h3>Resultados para el año {{ añoBusqueda }}</h3>
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Iformacion</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="contenido in resultadosBusqueda" :key="contenido.idContenido">
              <td>{{ contenido.titulo }}</td>
              <td>
                <button @click="verInfo(contenido.idContenido)">Info</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <div v-else-if="buscando && resultadosBusqueda.length === 0">
        <p>No se encontraron contenidos para el año {{ añoBusqueda }}.</p>
      </div>
  
      <!-- Listas de Seguimiento -->
      <div v-if="listas.length === 0">
        <p>No tienes listas de seguimiento creadas.</p>
      </div>
      <div v-else>
        <div v-for="lista in listas" :key="lista.idLista" class="lista-item">
          <h2 @click="toggleContenidos(lista.idLista)">
            {{ lista.nombreLista }}
          </h2>
          <div v-if="contenidos[lista.idLista]" class="contenidos">
            <table>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Tipo</th>
                  <th>Año</th>
                  <th>Categoría</th>
                  <th>Calificación</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="contenido in contenidos[lista.idLista]"
                  :key="contenido.idContenido"> 
                  <td>{{ contenido.titulo }}</td>
                  <td>{{ contenido.tipo }}</td>
                  <td>{{ contenido.año }}</td>
                  <td>{{ contenido.categoria }}</td>
                  <td>{{ contenido.calificacion }}</td>
                  <td>
                    <button @click="eliminarDeLista(contenido.idContenido, lista.idLista)">
                      Eliminar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "ListasYContenidos",
    data() {
      return {
        listas: [], 
        contenidos: {}, 
        resultadosBusqueda: [], 
        añoBusqueda: null, 
        usuarioId: 1, 
        buscando: false, 
      };
    },
    methods: {
      
      async fetchListas() {
        try {
          const response = await axios.get(
            `http://localhost:5109/api/listas/usuario/${this.usuarioId}/listas`
          );
          this.listas = response.data;
        } catch (error) {
          console.error("Error al obtener las listas:", error);
        }
      },
  
      async fetchContenidosDeLista(listaId) {
        try {
          const response = await axios.get(
            `http://localhost:5109/api/listas/${listaId}/contenidos`
          );
          this.$set(this.contenidos, listaId, response.data);
        } catch (error) {
          console.error(`Error al obtener los contenidos de la lista ${listaId}:`, error);
        }
      },
  
      toggleContenidos(listaId) {
        if (this.contenidos[listaId]) {
          this.$delete(this.contenidos, listaId);
        } else {
          this.fetchContenidosDeLista(listaId);
        }
      },
  
      async buscarPorAño() {
        this.buscando = true;
        try {
          const response = await axios.get(
            `http://localhost:5109/api/contenidos/buscar`,
            { params: { año: this.añoBusqueda } }
          );
          this.resultadosBusqueda = response.data;
        } catch (error) {
          console.error("Error al buscar contenidos por año:", error);
          this.resultadosBusqueda = [];
        } finally {
          this.buscando = false;
        }
      },
  
      verInfo(idContenido) {
        this.$router.push(`/infoContenido/${idContenido}`);
      },
  
      async eliminarDeLista(contenidoId, listaId) {
        try {
          await axios.delete(
            `http://localhost:5109/api/listas/${listaId}/contenidos/${contenidoId}`
          );
          this.fetchContenidosDeLista(listaId);
          alert("Contenido eliminado correctamente.");
        } catch (error) {
          console.error("Error al eliminar contenido de la lista:", error);
        }
      },
    },
    mounted() {
      this.fetchListas();
    },
  };
  </script>
  
  
  