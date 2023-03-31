<template>
  <v-app>
    <div class="barra-superior"></div>
    <div class="barra-inferior">
      <v-btn text>Portal IGP</v-btn>
      <v-btn text>Servicios</v-btn>
      <v-btn text>Infraestructura de datos espaciales (IDE - IGP)</v-btn>
      <v-btn text>Visor Geográfico</v-btn>
      <v-btn text>CDSGeofísico</v-btn>
    </div>

    <v-btn id="btnFlecha" class="rail-variant ml-n6" :class="{ 'rail-variant--open': drawer }" icon @click.stop="drawer = !drawer">
    <v-icon>mdi-menu</v-icon>
    </v-btn>
    <v-navigation-drawer v-model="drawer">
      <h4>Hola</h4>
    </v-navigation-drawer>

    <div id="contenedor" class="fill-height">
      <iframe id="inlineFrameExample" src="https://ide.igp.gob.pe/geovisor/estudios-cts/"></iframe>
    </div>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      railVariantLeft: 10
    };
  },
  watch: {
    drawer(val) {
      this.railVariantLeft = val ? 260 : 10;
    }
  }
};
</script>

<style scoped>
#contenedor {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  border: none;
  z-index: 1;
}

#inlineFrameExample {
  width: 100%;
  height: 100%;
  border: none;
}

.fill-height {
  height: 100vh;
}

.rail-variant {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  transition: left 0.3s ease-in-out;
}

.rail-variant--open {
  left: 260px;
}
#btnFlecha{
  margin-top: 90px;
  position: absolute;
   z-index: 999; 
}
.barra-superior {
  height: 80px;
  background-color: #000;
}

</style>
