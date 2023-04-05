<template>
  <div>
    <div class="bg-image"></div>
    <h2 id="tiGeo">¿Qué es CDS - IGP?</h2>
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
      
      <br>
      <br>
      <br>
    

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
.bg-image {
  background-image: url(https://i.ibb.co/BrFG4zN/image.png);
  background-repeat: no-repeat;
  background-size: cover;
  height: 200px; /* Altura ajustada */
  background-position: center; /* Alinea la imagen al centro */
  background-color: #0077be; /* Color de fondo */
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 1)
  ),
    url(https://i.ibb.co/BrFG4zN/image.png); /* Agrega un degradado */
  background-position-y:-200px ;

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

</style>
