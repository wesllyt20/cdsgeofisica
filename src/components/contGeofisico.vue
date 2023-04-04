<template>
  <div>
    <div class="img-container">
      <v-img id="mapaImg" src="https://i.ibb.co/q90Cts6/afrik.png" />
    </div>
    <h2 id="tiGeo">¿Qué es CDSGeofísico?</h2>
    <div id="parGeo" class="mb-5">
      <p class="parrafoGeo">
        Dentro del Programa Presupuestal por Resultados Nº068 "Reducción de la
        Vulnerabilidad y Atención de Emergencias por Desastres", el Instituto
        Gerofísico del Perú (IGP) viene desarrollando la actividad "Generación
        de Estudios Territoriales de Peligro Sísmico" a fin de obtener los Mapas
        de Zonificación Geofísica - Geotécnica (Comportamiento Dinámico de
        Suelo) para áreas urbanas ubicadas en zonas con alto potencial sísmico.
      </p>
      <p class="parrafoGeo mt-5">
        Como producto de los estudios de Zonificación Geofísica – Geotécnica,
        estos mapas permiten tener mayor conocimiento sobre la estructura y
        propiedades físicas de los suelos sobre los cuales se encuentran las
        áreas urbanas y/o futuras áreas de expansión. Para ello el IGP hace uso
        de diversos métodos geofísicos (razones espectrales, sísmica refracción,
        tomografía eléctrica y georadar) y geotécnicos (geología, geodinámica,
        geomorfología y geotecnia). La correlación de los resultados obtenidos
        con cada método, permiten los suelos con diferente comportamiento
        dinámico ante la ocurrencia de sismos.
      </p>
      <p class="parrafoGeo mt-5 pb-12">
        Este aporte a la Gestion del Riesgo de Desastres debe ser considerado
        por la población y autoridades regionales y locales para la correcta
        implementación de acciones y medidas para reducir el riesgo ante la
        ocurrencia de sismos.
      </p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
#tiGeo {
  font-style: normal;
  font-size: 20px;
  line-height: 26px;
  color: #0a1fc2;
  margin-left: 25px;
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
.img-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 50%;
}

.img-container:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 1)
  );
}

#mapaImg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>