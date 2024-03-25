<template>
  <div class="content">
    <h3>Hola Devs</h3>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate nemo, earum doloremque aut pariatur hic similique ea quos facilis enim eligendi nesciunt, repudiandae officia, minima accusamus quas necessitatibus officiis recusandae.</p>
    <div class="content__body" ref="miDiv">
      <img src="https://picsum.photos/id/235/200/300" alt="imagen" class="content__img">
      <table border="1" class="content__body__table">
        <thead class="content__body__table__head">
          <th>Cursos</th>
          <th>Plataforma</th>
        </thead>
        <tbody>
          <tr>
              <td><p>Vue de cero a Pro</p></td>
              <td>Youtube</td>
          </tr>
          <tr>
              <td>Django pro</td>
              <td>Udemy</td>
          </tr>
          <tr>
              <td>Gestor de estados</td>
              <td>Youtube</td>
          </tr>
        </tbody>
      </table>
    </div>
    <button @click="descargarImg()">Descargar Tabla</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { useHtmlImage } from '../composables/useHtmlImage.js'

const miDiv = ref(null)
const { generarImagen } = useHtmlImage()

const descargarImg = () => {
  console.log('generando imagen ...');
  generarImagen(miDiv.value).then(
    imagen => {
      const enlaceDercarga = document.createElement('a')
      enlaceDercarga.href = imagen
      enlaceDercarga.download = 'imagen.png'
      //
      enlaceDercarga.click()
    }
  ).catch(error => {
    console.log(error);
  })

}



</script>

<style lang="scss" scoped>
.content {
  padding: 10em;
  &__img {
    width: 300px;
    height: 250px;
    display: block;
    margin-bottom: 1em;
  }
  &__body {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 2em;
    background-color: #242424;
    &__table {
      width: 100%;
      &__head {
        background: #27ae60;
      }
    }
  }
}
</style>