<template>
  <v-app>
    <!-- START HEADER -->
    <!-- SUPERIOR -->
    <div class="barra-superior">
      <div class="logos">
        <v-img id="minamLogo" src="/Logo Minam.svg" />
        <v-img id="igpLogo" src="/Logo IGP.svg" />
      </div>
      <div id="dividermenutop" class="border border-vertical" />
      <h1 class="titulo">Comportamiento Dinámico de Suelos (CDS)</h1>
      <div class="opciones">
        <a id="acerca" class="my-linktop" @click="btnGeofi()">Acerca de</a>
        <div id="dividermenutopL" class="border border-vertical" />
        <a id="func" class="my-linktop" @click="btnFuncion()">Funcionalidad</a>
        <div id="dividermenutopL" class="border border-vertical" />
        <a
          id="glosa"
          class="my-linktop"
          @click="btnGlorsario()"
          :style="{ marginRight: '80px' }"
          >Glosario</a
        >
      </div>
    </div>

    <!-- final superior -->
    <!-- INFERIOR -->
    <div class="barra-inferior">
      <a
        class="my-link"
        href="https://www.gob.pe/igp"
        target="_blank"
        :style="{ marginLeft: '48px' }"
        >Portal IGP</a
      >
      <div id="dividermenubot" class="border border-vertical" />
      <a
        class="my-link"
        href="https://www.igp.gob.pe/servicios/infraestructura-de-datos-espaciales/"
        target="_blank"
        >Infraestructura de datos espaciales (IDE - IGP)</a
      >
      <div id="dividermenubot" class="border border-vertical" />
      <a
        class="my-link"
        href="https://www.igp.gob.pe/servicios/infraestructura-de-datos-espaciales/componentes/visor-geografico"
        target="_blank"
        >Visor Geográfico</a
      >
      <div id="dividermenubot" class="border border-vertical" />
      <a
        class="my-link"
        href="https://ide.igp.gob.pe/geovisor/estudios-cts/"
        target="_blank"
        >CDSGeofísico</a
      >
    </div>
    <!-- final inferior -->
    <!-- EMD HEADER -->

    <!-- START MENU -->
    <!-- boton -->
    <v-btn
      id="btnFlecha"
      class="rail-variant ml-n14"
      :class="{ 'rail-variant--open': drawer }"
      icon
      @click.stop="drawer = !drawer"
    >
      <v-img id="iconFlecha" src="/flechaPe.svg"></v-img>
    </v-btn>
    <!-- contenedor de menu -->
    <v-navigation-drawer
      v-model="drawer"
      :style="{
        transition: 'transform 0.01s ease-in-out',
        width: '22.375rem',
        marginTop: '120px',
      }"
    >
      <contFuncion v-show="mostrarFun"></contFuncion>
      <contGeofisico v-show="mostrarGeo"></contGeofisico>
      <contGlorsario v-show="mostrarGlo"></contGlorsario>
    </v-navigation-drawer>
    <!-- END MENU -->

    <!-- START IFRAME -->
    <div
      id="contenedor"
      style="
        position: absolute;
        top: 120px;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
      "
    >
      <iframe
        id="inlineFrameExample"
        src="https://10.10.150.76:3344/webappbuilder/apps/2/"
        style="width: 100%; height: 100%"
      ></iframe>
    </div>
    <!-- END IFRAME -->
  </v-app>
</template>

<script>
import contFuncion from "./contFuncion.vue";
import contGeofisico from "./contGeofisico.vue";
import contGlorsario from "./contGlorsario.vue";

window.onload = function () {
  var iframe = document.getElementById("inlineFrameExample");
  var container = document.getElementById("contenedor");
  iframe.onload = function () {
    container.style.height =
      iframe.contentWindow.document.body.scrollHeight + "px";
  };
};
export default {
  name: "viewPrincipal",
  components: {
    contFuncion,
    contGeofisico,
    contGlorsario,
  },
  data() {
    return {
      railVariantLeft: 10,
      drawer: false,
      mostrarGeo: true,
      mostrarFun: false,
      mostrarGlo: false,
    };
  },
  methods: {
    btnGeofi() {
      this.ocultarTodo();
      this.mostrarGeo = true;
    },
    btnFuncion() {
      this.ocultarTodo();
      this.mostrarFun = true;
    },
    btnGlorsario() {
      this.ocultarTodo();
      this.mostrarGlo = true;
    },
    ocultarTodo() {
      this.mostrarGeo = false;
      this.mostrarFun = false;
      this.mostrarGlo = false;
      this.drawer = true;
    },
  },
  watch: {
    drawer(val) {
      this.railVariantLeft = val ? 260 : 10;
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Poppins", sans-serif;
}
#contenedor {
  height: auto;
}
/* CONTENEDOR  */
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
/* BOTON DE FLECHA */
#btnFlecha {
  margin-top: 250px;
  position: absolute;
  width: 66.3px;
  height: 49.98px;
}
#iconFlecha {
  margin-left: 50px;
  width: 9px;
  height: 9px;
}
/* HEADER SUPERIOR */
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
  margin-right: -25px;
}

#igpLogo {
  width: 122px;
  height: 35px;
}

.titulo {
  color: #0000af;
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

.my-linktop {
  color: #737b80; /* color del enlace */
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
}

.my-linktop:hover {
  cursor: pointer;
  color: #0032ff;
  font-weight: 600;
}

.my-linktop:active {
  color: #0032ff;
}
.my-linktop:link {
  color: #737b80;
  text-decoration: none;
}

#dividermenutop {
  height: 40%;
  margin-left: 25px;
  margin-right: 35px;
}
#dividermenutopL {
  margin-top: 4px;
  height: 16px;
  margin-left: 10px;
  margin-right: 10px;
}
/* HEADER INFERIOR */
.barra-inferior {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  background: #f0f4fd;
  border-width: 1px 0px;
  border-style: solid;
  border-color: #d6d6e3;
  height: 40px;
}

/* botones link */
.my-link {
  color: #737b80;
  text-decoration: none;
  margin-right: 1rem;
  font-weight: 300;
  font-size: 12px;
}

.my-link:hover {
  cursor: pointer;
  color: #0032ff;
  font-weight: 600;
}

.my-link:active {
  color: #0032ff;
}
.my-link:link {
  color: #737b80;
  text-decoration: none;
  margin-right: 1rem;
}
#dividermenubot {
  height: 40%;
  margin-left: 5px;
  margin-right: 15px;
}
</style>
