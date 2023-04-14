<template>
  <div>
    <div class="bg-image2"></div>
    <h2 id="tiGeo" class="">
      Estudios sobre Comportamiento
      <br />
      Dinámico de Suelos
      <br />
      <b>CDS-IGP</b>
    </h2>
    <br />
    <div id="parGeo" class="mb-5">
      <p class="parrafoGeo">
        En el PPR Nº068, &quot;Reducción de la Vulnerabilidad y Atención de
        Emergencias por Desastres&quot;, el Instituto Geofísico del Perú (IGP)
        desarrolla la actividad que permite obtener los Mapas de Zonificación
        Geofísica - Geotécnica (Comportamiento Dinámico de Suelo) para áreas
        urbanas ubicadas en zonas de alto potencial sísmico.
      </p>
      <p class="parrafoGeo mt-5">
        Estos mapas permiten tener mayor conocimiento sobre la estructura y
        propiedades físicas de los suelos sobre los cuales se encuentran las
        áreas urbanas y/o futuras áreas de expansión. Para ello, el IGP
        correlaciona los resultados obtenidos con la aplicación de diversos
        métodos geofísicos y geotécnicos con el fin de identificar y clasificar
        los suelos con diferente comportamiento dinámico ante la ocurrencia de
        sismos.
      </p>
      <p class="parrafoGeo mt-5 pb-8">
        Este aporte a la Gestion del Riesgo de Desastres debe ser considerado
        por la población y autoridades para la correcta implementación de
        acciones y medidas para reducir el riesgo ante sismos.
      </p>
      <a
        id="btnFunci"
        class="my-linktop"
        @click="recepFunc"
        style="color: #0000af"
        >Ver Guia de uso</a
      >
      <br />

      <br />

      <br />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    recepFunc() {
      document.querySelectorAll("#func").forEach((boton) => boton.click());
    },
  },
};
</script>

<style>
#tiGeo {
  font-style: normal;
  font-size: 20px;
  line-height: 26px;
  color: #0a1fc2;
  margin-bottom: 12px;
  margin-left: 45px;
}
#parGeo {
  margin-bottom: 80px !important;
}
.parrafoGeo {
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  color: #00132e;
  margin-left: 45px;
  margin-right: 45px;
}
.bg-image2 {
  background-image: url('https://ide.igp.gob.pe/geovisor/cds-igp/playa.webp');
  background-repeat: no-repeat;
  background-size: cover;
  height: 200px; /* Ajusta la altura según sea necesario */
  background-position: center top -50px; /* Mueve la imagen hacia arriba en 50 píxeles */
  background-color: #0077be; /* Color de fondo */
  background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 1)
    ),
    url('https://ide.igp.gob.pe/geovisor/cds-igp/playa.webp'); /* Agrega un degradado */
}
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-thumb {
  background-color: #bbbbbb;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #888;
}
#btnFunci {
  width: 141.98px;
  height: 24.73px;
  background: #ffffff;
  border: 0.426437px solid rgba(0, 33, 79, 0.6);
  border-radius: 4.26437px;
  cursor: pointer;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 45px;
}
#btnFunci:hover{
  background-color: #EDF7FF;
}
</style>
