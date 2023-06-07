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
      <a class="btnFunciG" @click="recepFunc">Ver Guia de uso</a>

      <br />
      <a class="btnFunciG" @click="recepInfo">Ver Informes </a>
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
    recepInfo() {
      document.querySelectorAll("#listado").forEach((boton) => boton.click());
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
  margin-top: -120px;
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
  width: 450px;
  height: 550px;
  background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 65%,
      rgba(255, 255, 255, 1) 72%
    ),
    url("https://ide.igp.gob.pe/geovisor/cds/costaImage.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
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
}.btnFunciG {
  width: 195px;
  height: 41px;
  background: #ffffff;
  border: 1px solid #0000af;
  color: #0000af;
  border-radius: 4.26437px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  line-height: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 45px;
}
.btnFunciG:hover {
  background-color: #0000af;
  color: #ffffff;
}
</style>
