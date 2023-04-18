<template>
  <div class="main-container">
    <div class="barra-superior">
      <div class="logos">
        <v-img
          id="minam"
          src="https://www.igp.gob.pe/programas-de-investigacion/images/logo-minan.png"
        />
        <v-img
          id="igpLogo"
          src="https://www.igp.gob.pe/programas-de-investigacion/images/logo_igp_normal.png"
        />
      </div>
      <div id="dividermenutop" class="border border-vertical" />
      <h1 class="titulo">Comportamiendo dinámico de suelos - IGP</h1>
      <div class="opciones">
        <a id="acerca" class="my-linktop" @click="btnGeofi()">Acerca de</a>
        <div id="dividermenutopL" class="border border-vertical" />
        <a id="func" class="my-linktop" @click="btnFuncion()">Guía de uso</a>
        <div id="dividermenutopL" class="border border-vertical" />
        <a id="listado" class="my-linktop" @click="btnListado()">Informes</a>
        <div id="dividermenutopL" class="border border-vertical" />
        <a
          id="contacto"
          class="my-linktop"
          @click="btnCont()"
          :style="{ marginRight: '50px' }"
          >Contacto</a
        >
      </div>
    </div>
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
        >CDS - IGP</a
      >
    </div>

    <div class="content-container">
      <div v-if="showAside" class="aside-container">
        <aside>
          <contFuncion v-show="mostrarFun"></contFuncion>
          <contGeofisico v-show="mostrarGeo"></contGeofisico>
          <contContacto v-show="mostrarCont"></contContacto>
          <contListado v-show="mostrarList"></contListado>
        </aside>
      </div>
      <div class="iframe-container" :class="{ 'full-width': !showAside }">
        <iframe
          id="inlineFrameExample"
          ref="iframe"
          v-show="loaded"
          src="'https://ide.igp.gob.pe/geovisor/estudios-cts"
          style="border: 0"
          @load="iframeLoad"
        ></iframe>
        <div v-if="!loaded" class="loading-message">
          <p>Cargando...</p>
        </div>
      </div>
    </div>

    <button v-if="loaded" class="ear-button" @click="onMoveWidgetsButtonClick">
      <img
        id="iconFlecha"
        class="rotate-image"
        src="https://i.ibb.co/CJzYHCM/Vector-1.png"
      />
    </button>
  </div>
</template>
  
<script>
import contFuncion from "./contFuncion.vue";
import contGeofisico from "./contGeofisico.vue";
import contContacto from "./contContacto.vue";
import contListado from "./contListado.vue";
export default {
  name: "viewPrincipal2",
  components: {
    contFuncion,
    contGeofisico,
    contContacto,
    contListado,
  },
  data() {
    return {
      showAside: true,
      loaded: false,
      mostrarGeo: true,
      mostrarFun: false,
      mostrarCont: false,
      mostrarList: false,
    };
  },
  methods: {
    iframeLoad() {
      this.loaded = true;
    },
    btnGeofi() {
      this.funcionFlechaFalse();
      this.ocultarTodo();
      this.mostrarGeo = true;
    },
    btnCont() {
      this.funcionFlechaFalse();
      this.ocultarTodo();
      this.mostrarCont = true;
    },
    btnListado() {
      this.funcionFlechaFalse();
      this.ocultarTodo();
      this.mostrarList = true;
    },
    btnFuncion() {
      this.funcionFlechaFalse();
      this.ocultarTodo();
      this.mostrarFun = true;
    },
    ocultarTodo() {
      this.mostrarGeo = false;
      this.mostrarFun = false;
      this.mostrarCont = false;
      this.mostrarList = false;
      this.showAside = true;
    },
    onMoveWidgetsButtonClick() {
      this.showAside = !this.showAside;
      this.imageFlipped = !this.imageFlipped;
      const iconFlecha = document.querySelector("#iconFlecha");
      iconFlecha.classList.toggle("rotate-180", this.imageFlipped);
    },
    funcionFlechaFalse() {
      if (this.showAside === false) {
        this.imageFlipped = !this.imageFlipped;
        const iconFlecha = document.querySelector("#iconFlecha");
        iconFlecha.classList.toggle("rotate-180", this.imageFlipped);
      }
    },
  },
  mounted() {
    this.$refs.iframe.src = "https://ide.igp.gob.pe/geovisor/estudios-cts";
  },
};
</script>
  
  <style scoped>
* {
  font-family: "Poppins", sans-serif;
}
html,
body {
  height: 100%;
  overflow: hidden;
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
  padding-left: 20px;
}

#minam {
  width: 157.49px;
  height: 46px;
  margin-right: 10px;
}

#igpLogo {
  width: 122px;
  height: 40px;
}
#dividermenutop {
  height: 40%;
  margin-left: 25px;
  margin-right: 25px;
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

.my-linktop {
  color: #737b80; /* color del enlace */
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
}

.my-linktop:hover {
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
  background: rgba(214, 214, 227, 0.1);
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

.rotate-image {
  transition: transform 0s; /* Agrega transición de transformación */
}
/****************/
/****************/
/****************/
.main-container {
  height: 100%;
  overflow: hidden;
}

.content-container {
  display: flex;
  height: 100%;
}
.aside-container {
  height: 100%;
  max-width: 100%;
  
}
aside {
  width: 450px;
  overflow-y: auto;
}

.iframe-container {
  width: 100%;
  height: 100%;
  max-height: 90vh;
  position: relative;
  transition: width 0s ease-out;
}

.full-width {
  width: 100%;
}

iframe {
  width: 100%;
  height: 100%;
}

.loading-message {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
}
.ear-button {
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  background-color: #333;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease-out;
}

#iconFlecha {
  width: 19px;
  height: 20px;
}
.ear::before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 20px;
  background-color: #333;
  border-radius: 50%;
}
.ear::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 20px;
  background-color: #333;
  border-radius: 50%;
}
.ear-button:hover {
  background-color: #555;
}
</style>
  
  
  
  