<template>
    <div>
      <div class="usuarios-container">
        <h2>Lista de Usuarios</h2>
        <!-- Listado de usurios para comprobación -->
        <div v-if="usuarios.length > 0">
          <ul>
            <li v-for="usuario in usuarios" :key="usuario.idUsuario">
              <p><strong>Nombre:</strong> {{ usuario.nombre }}</p>
              <p><strong>Email:</strong> {{ usuario.email }}</p>
              <p><strong>Contraseña:</strong> {{ usuario.contraseña }}</p>
              <hr />
            </li>
          </ul>
        </div>
  
        <div v-else>
          <p>No se encontraron usuarios.</p>
        </div>
      </div>
  
  <!-- Login -->
      <div class="login-container1">
        <h2>Iniciar sesión</h2>
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="email">Correo electrónico</label>
            <input type="email" v-model="email" required />
          </div>
          <div class="form-group">
            <label for="password">Contraseña</label>
            <input type="password" v-model="password" required />
          </div>
          <button type="submit">Iniciar sesión</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'UsuariosList',
    data() {
      return {
        email: '',
        password: '',
        usuarios: []
      };
    },
    methods: {
      async fetchUsuarios() {
        try {
          const response = await axios.get('http://localhost:5109/api/usuario/listar');
          console.log('Datos obtenidos:', response.data);
          this.usuarios = response.data; 
        } catch (error) {
          console.error('Error al obtener usuarios:', error);7
        }
      },
      async login() {
        try {
          const response = await axios.post('http://localhost:5109/api/usuario/login', {
            email: this.email,
            password: this.password,
          });
  
          if (response.data.success) {
            
            this.$router.push('/myHomeMain');
          } else {
            alert('Credenciales incorrectas');
          }
        } catch (error) {
          console.error('Error al iniciar sesión:', error);
          alert('Hubo un error al intentar iniciar sesión.');
        }
      },
    },
    created() {
      
      this.fetchUsuarios();
    }
  };
  </script>