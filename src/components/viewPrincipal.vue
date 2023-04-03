<template>
  <v-app>
 
    
    <div class="barra-superior">
  <div class="logos">
    <v-img id="minamLogo" src="/Logo Minam.svg"></v-img>
    <v-img id="igpLogo" src="/Logo IGP.svg"></v-img>
  </div>
  <div id="dividermenu" class="border border-vertical"></div>
  <h1 class="titulo">Comportamiento Dinámico de Suelos (CDS)</h1>
  <div class="opciones">
    <span>Acerca de</span>
    <span>Funcionalidad</span>
    <span>Glosario</span>
  </div>
</div>





    <div class="barra-inferior">
      <a
        class="my-link"
        href="https://www.portaligp.gob.pe/"
        :style="{ marginLeft: '48px' }"
        >Portal IGP</a
      >
      <a class="my-link" href="https://www.igp.gob.pe/servicios/">Servicios</a>
      <a class="my-link" href="https://ide.igp.gob.pe/"
        >Infraestructura de datos espaciales (IDE - IGP)</a
      >
      <a class="my-link" href="https://visor.igp.gob.pe/">Visor Geográfico</a>
      <a class="my-link" href="http://cdsgeofisico.igp.gob.pe/">CDSGeofísico</a>
    </div>

    <v-btn
      id="btnFlecha"
      class="rail-variant ml-n14"
      :class="{ 'rail-variant--open': drawer }"
      icon
      @click.stop="drawer = !drawer"
    >
      <v-img id="iconFlecha" src="/Vector.svg"></v-img>
    </v-btn>

    <v-navigation-drawer
      v-model="drawer"
      :style="{
        transition: 'transform 0.01s ease-in-out',
        width: '358px',
        marginTop: '120px',
      }"
    >
      <h4>Hola</h4>
    </v-navigation-drawer>

    <div id="contenedor" class="fill-height">
      <iframe
        id="inlineFrameExample"
        src="https://ide.igp.gob.pe/geovisor/estudios-cts/"
      ></iframe>
    </div>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      railVariantLeft: 10,
    };
  },
  watch: {
    drawer(val) {
      this.railVariantLeft = val ? 260 : 10;
    },
  },
};
</script>

<style scoped>
*{
  font-family: 'Poppins', sans-serif;
}
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
  margin-top: 120px;
}

.rail-variant {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  transition: left 0.01s ease-in-out;
}

.rail-variant--open {
  left: 361px;
}
#btnFlecha {
  margin-top: 190px;
  position: absolute;
  width: 66.3px;
  height: 49.98px;
}



.barra-superior {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  background: #ffffff;
  left: 0px;
  top: 0px;
}

.logos {
  display: flex;
  align-items: center;
}

#minamLogo {
  width: 260px;
  height: 64px;
}

#igpLogo {
  width: 122px;
  height: 35px;
}

.titulo {
  color: #0000AF;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 300;
  font-size: 24px;
  line-height: 36px;
}

.opciones {
  display: flex;
  margin-left: auto;
}

.opciones span {
  padding: 0 8px;
}

.opciones span {
  padding: 0 8px;
}

#dividermenu {
  height: 40%;
  margin-top: 10px;
}



.barra-inferior {
  display: flex; /* convierte los elementos en una fila */
  align-items: center;

  box-sizing: border-box;

  background: #f0f4fd;
  border-width: 1px 0px;
  border-style: solid;
  border-color: #d6d6e3;
  height: 40px;
}
#iconFlecha {
  margin-left: 50px;
  width: 9px;
  height: 9px;
}

.my-link {
  color: #737b80; /* color del enlace */
  text-decoration: none; /* quita la subrayado del enlace */
  margin-right: 1rem;
}

.my-link:visited {
  color: #0032ff; /* color del enlace visitado */
}

.my-link:hover {
  cursor: pointer; /* muestra el cursor como una mano al pasar el mouse por encima */
  color: #0032ff; /* color del enlace cuando se hace clic */
}

.my-link:active {
  color: #0032ff; /* color del enlace cuando se hace clic */
}

</style>
