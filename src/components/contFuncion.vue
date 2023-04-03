<template>
  <div>
    <h2 id="tiGeo">¿Cómo funciona?</h2>
    <p class="parrafoGeo">
      Para poder visualizar la información de nuestro geo visor sigue los
      siguientes pasos, empecemos! :
    </p>
    <br />
    <br />

    <v-timeline side="end" align="start">
      <v-timeline-item dot-color="#0075FF" size="large">
        <template v-slot:icon>
          <strong :style="{ color: 'white' }">1</strong>
        </template>

        <div class="d-flex">
          <div>
            <p class="parrafoGeo">
              Paso 1 : Ubicar el icono de capas y luego seleccionar el
              departamento y la ciudad para acceder a los tipos de estudios.
            </p>
          </div>
        </div>
      </v-timeline-item>

      <v-timeline-item dot-color="#0075FF" size="large">
        <template v-slot:icon>
          <strong :style="{ color: 'white' }">2</strong>
        </template>
        <div class="d-flex">
          <div>
            <p class="parrafoGeo">
              Paso 2 : Procedemos a activar el icono de check sobre los estudios
              para visualizarlos en el mapa.
            </p>
          </div>
        </div>
      </v-timeline-item>

      <v-timeline-item dot-color="#0075FF" size="large">
        <template v-slot:icon>
          <strong :style="{ color: 'white' }">3</strong>
        </template>
        <div class="d-flex">
          <div>
            <p class="parrafoGeo">
              Paso 3 : Luego, ubicaremos el icono de “Descripción y Leyenda”
              para ver más información de la zonificación.
            </p>
          </div>
        </div>
      </v-timeline-item>
    </v-timeline>
    <br />
    <br />
    <p class="parrafoGeo">
        Tambien puedes mirar nuestro videotutorial aqui.
    </p>
  </div>
</template>
  
  <script>
export default {};
</script>
  
  <style>
#tiGeo {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #0a1fc2;
}
.parrafoGeo {
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 18px;
  color: #00132e;
}
</style>