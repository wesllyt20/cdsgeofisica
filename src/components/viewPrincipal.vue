<template>
  <v-app>
    <!-- START HEADER -->
    <!-- SUPERIOR -->
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
      <h1 class="titulo">Comportamiento dinámico de suelos - IGP</h1>

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

      <button class="menu-btn" @click="toggleMenu">
        <svg
          fill="#65696c"
          width="24px"
          height="24px"
          viewBox="0 0 32.00 32.00"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#65696c"
          style="margin-top: 10px"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M0.844 6.050c-0.256-0.256-0.381-0.581-0.381-0.975s0.125-0.719 0.381-0.975 0.581-0.381 0.975-0.381h28.512c0.394 0 0.719 0.125 0.975 0.381s0.381 0.581 0.381 0.975-0.125 0.719-0.381 0.975-0.581 0.381-0.975 0.381h-28.512c-0.394 0-0.719-0.125-0.975-0.381zM31.306 14.963c0.256 0.256 0.381 0.581 0.381 0.975s-0.125 0.719-0.381 0.975-0.581 0.381-0.975 0.381h-28.512c-0.394 0-0.719-0.125-0.975-0.381s-0.381-0.581-0.381-0.975 0.125-0.719 0.381-0.975 0.581-0.381 0.975-0.381h28.512c0.394 0 0.719 0.125 0.975 0.381zM31.306 25.819c0.256 0.256 0.381 0.581 0.381 0.975s-0.125 0.719-0.381 0.975-0.581 0.381-0.975 0.381h-28.512c-0.394 0-0.719-0.125-0.975-0.381s-0.381-0.581-0.381-0.975 0.125-0.719 0.381-0.975 0.581-0.381 0.975-0.381h28.512c0.394 0 0.719 0.131 0.975 0.381z"
            ></path>
          </g>
        </svg>
      </button>

      <div v-if="showMenu" class="dropdown-menu">
        <ul>
          <li><a id="acerca" @click="btnGeofi()">Acerca de</a></li>
          <li><a id="func" @click="btnFuncion()">Guía de uso</a></li>
          <li><a id="listado" @click="btnListado()">Informes</a></li>
          <li><a id="contacto" @click="btnCont()">Contacto</a></li>
        </ul>
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
        >CDS - IGP</a
      >
    </div>
    <!-- final inferior -->
    <!-- EMD HEADER -->

    <!-- START MENU -->
    <!-- boton -->
    <div v-if="showVButton">
      <v-btn
        id="btnFlecha"
        class="rail-variant ml-n9"
        :class="{ 'rail-variant--open': drawer, 'bounce-right': isLoaded }"
        icon
        @click.stop="onMoveWidgetsButtonClick"
      >
        <v-img
          id="iconFlecha"
          class="rotate-image"
          src="https://i.ibb.co/VSqBM9X/Vector-1.png"
        ></v-img>
        <v-tooltip
          activator="parent"
          location="end"
          v-model="showTooltip"
          content-class="tooltipClass"
          >{{ tooltipText }}</v-tooltip
        >
      </v-btn>
    </div>
    <!-- contenedor de menu -->
    <v-navigation-drawer
      class="vNavi"
      v-model="drawer"
      :scrim="false"
      hide-overlay
      :style="{
        transition: 'transform 0.01s ease-in-out',
        width: anchoMenu,
        marginTop: '120px',
      }"
    >
      <contFuncion v-show="mostrarFun"></contFuncion>
      <contGeofisico v-show="mostrarGeo"></contGeofisico>
      <contContacto v-show="mostrarCont"></contContacto>
      <contListado v-show="mostrarList"></contListado>
    </v-navigation-drawer>
    <!-- END MENU -->

    <!-- START IFRAME -->
    <div id="contenedor" style="">
      <iframe
        id="inlineFrameExample"
        src="https://ide.igp.gob.pe/geovisor/estudios-cts"
        style="width: 100%; height: 100%; border: 0"
        @load="iframeLoad"
      ></iframe>
    </div>
    <!-- END IFRAME -->
  </v-app>
</template>

<script>
import contFuncion from "./contFuncion.vue";
import contGeofisico from "./contGeofisico.vue";
import contContacto from "./contContacto.vue";
import contListado from "./contListado.vue";

window.onload = function () {
  var iframe = document.getElementById("inlineFrameExample");
  var container = document.getElementById("contenedor");
  iframe.onload = function () {
    container.style.height =
      iframe.contentWindow.document.body.scrollHeight + "px";
  };
};
const ids = [
  "widgets_ZoomSlider_Widget_72",
  "widgets_HomeButton_Widget_68",
  "dijit__WidgetBase_0",
  "widgets_Scalebar_Widget_59",
  "widgets_Coordinate_Widget_61",
  "btnFiltroDOM",
  "_62_panel",
  "popupFiltro",
];

export default {
  name: "viewPrincipal",

  components: {
    contFuncion,
    contGeofisico,
    contContacto,
    contListado,
  },
  data() {
    return {
      railVariantLeft: 10,
      drawer: false,
      mostrarGeo: true,
      mostrarFun: false,
      mostrarCont: false,
      mostrarList: false,
      anchoMenu: "450px",
      elementos: false,
      indexflecha: -1,
      showMenu: false,
      isLoaded: false,
      showVButton: false,
      showTooltip: false,
      tooltipText: "--",
    };
  },

  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    iframeLoad() {
      const iframe = document.getElementById("inlineFrameExample");
      const btn = iframe.contentDocument.createElement("button");
      btn.innerHTML = "Imprimir en consola";
      btn.onclick = () => {
        console.log("Cree un botón dentro del DOM");
      };
      btn.innerHTML = "Filtro";
      btn.style.position = "absolute";
      btn.style.left = "0";
      btn.style.top = "17%";
      btn.style.marginLeft = "5px";
      btn.style.width = "40px";
      btn.style.height = "40px";
      btn.style.padding = "0x";
      btn.style.transform = "translateY(-50%)";
      btn.style.backgroundColor = "#ffffff";
      btn.style.border = "none";
      btn.style.borderRadius = "5px";
      btn.style.cursor = "pointer";
      btn.style.display = "flex";
      btn.style.justifyContent  = "center";
      btn.style.alignItems  = "center";
      btn.innerHTML = '<img src="https://ide.igp.gob.pe/geovisor/cds-igp-test/filtroBtn.svg" alt=""  />';
      btn.id = "btnFiltroDOM";
      iframe.contentDocument.body.appendChild(btn);

      // Creamos la ventana flotante
      const popup = iframe.contentDocument.createElement("div");
      popup.style.position = "absolute";
      popup.style.width = "100px";
      popup.style.height = "100px";
      popup.style.top = "50%";
      popup.style.left = "50%";
      popup.style.transform = "translate(-50%, -50%)";
      popup.style.backgroundColor = "#fff";
      popup.style.border = "1px solid #000";
      popup.style.boxShadow = "0px 0px 10px #000";
      popup.style.padding = "10px";
      popup.style.display = "none";
      popup.id = "popupFiltro";
      popup.innerHTML = "<h2 style='color: #0000AF'>Filtro</h2>";
      iframe.contentDocument.body.appendChild(popup);

      btn.addEventListener("click", () => {
        if (popup.style.display === "none") {
          popup.style.display = "block";
        } else {
          popup.style.display = "none";
        }
      });

      setTimeout(() => {
        this.movewidgets(0);
        this.drawer = false;
        this.indexflecha = 1;
        this.isLoaded = true;
        this.showVButton = true;
        setTimeout(() => {
          this.showTooltip = true;
          this.tooltipText = "¡Conoce más!";
        }, 1000);
      }, 4000);
    },
    btnGeofi() {
      this.funcionFlechaFalse();

      this.ocultarTodo();
      this.mostrarGeo = true;
      if (this.elementos === false) {
        this.positivo();
      }
    },
    btnCont() {
      this.funcionFlechaFalse();

      this.ocultarTodo();
      this.mostrarCont = true;
      if (this.elementos === false) {
        this.positivo();
      }
    },
    btnListado() {
      this.funcionFlechaFalse();

      this.ocultarTodo();
      this.mostrarList = true;
      if (this.elementos === false) {
        this.positivo();
      }
    },
    btnFuncion() {
      this.funcionFlechaFalse();

      this.ocultarTodo();
      this.mostrarFun = true;
      if (this.elementos === false) {
        this.positivo();
      }
    },

    ocultarTodo() {
      this.mostrarGeo = false;
      this.mostrarFun = false;
      this.mostrarCont = false;
      this.mostrarList = false;
      this.drawer = true;
    },

    onMoveWidgetsButtonClick() {
      this.drawer = !this.drawer;
      this.imageFlipped = !this.imageFlipped;
      const iconFlecha = document.querySelector("#iconFlecha");
      iconFlecha.classList.toggle("rotate-180", this.imageFlipped);

      if (this.elementos === true) {
        this.negativo();
        this.tooltipText = "¡Abre aquí!";
      } else if (this.elementos === false) {
        this.positivo();
        this.tooltipText = "¡Cierra aquí!";
      }
    },
    positivo() {
      this.elementos = true;
      this.movewidgets(465);
    },
    negativo() {
      this.elementos = false;
      this.movewidgets(-465);
    },
    funcionFlechaFalse() {
      console.log("ESTE ES", this.drawer);
      if (this.drawer === false) {
        console.log("AQUI SI EJECUTO ");
        this.imageFlipped = !this.imageFlipped;
        const iconFlecha = document.querySelector("#iconFlecha");
        iconFlecha.classList.toggle("rotate-180", this.imageFlipped);
      }
    },

    movewidgets(displacement) {
      const iframe = document.getElementById("inlineFrameExample");
      const idocument = iframe.contentWindow.document;

      ids.forEach((id) => {
        var widget = null;
        while (!widget) {
          widget = idocument.getElementById(id);
        }
        console.log("--->", widget);

        let left = 0;
        if (!widget.style.inset) {
          left = parseInt(widget.style.left.slice(0, 3));
          widget.style.left = `${left + displacement}px`;
        } else {
          let split = widget.style.inset.split(" ");
          left = parseInt(split[3].slice(0, 3));
          split[3] = `${left + displacement}px`;
          widget.style.inset = split.join(" ");
        }
      });
    },
  },
  watch: {
    drawer(val) {
      this.railVariantLeft = val ? 260 : 10;
      console.log(val);
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
  position: absolute;
  top: 120px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
.bounce-right {
  animation: bounce-right 0.8s linear both;
}

@keyframes bounce-right {
  0% {
    transform: translateX(48px);
    animation-timing-function: ease-in;
    opacity: 1;
  }
  24% {
    opacity: 1;
  }
  40% {
    transform: translateX(26px);
    animation-timing-function: ease-in;
  }
  65% {
    transform: translateX(13px);
    animation-timing-function: ease-in;
  }
  82% {
    transform: translateX(6.5px);
    animation-timing-function: ease-in;
  }
  93% {
    transform: translateX(4px);
    animation-timing-function: ease-in;
  }
  25%,
  55%,
  75%,
  87%,
  98% {
    transform: translateX(0);
    animation-timing-function: ease-out;
  }
  100% {
    transform: translateX(0);
    animation-timing-function: ease-out;
    opacity: 1;
  }
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
  left: calc(v-bind(anchoMenu) + 3px);
}
/* BOTON DE FLECHA */
#btnFlecha {
  margin-top: 300px;
  position: absolute;
  width: 55px;
  height: 55px;
  z-index: v-bind(indexflecha);
  border-radius: 0% 100% 100% 0%;
}
#iconFlecha {
  margin-left: 30px;
  width: 20px;
  height: 19px;
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
  transition: transform 0.5s; /* Agrega transición de transformación */
}

.rotate-image.rotate-180 {
  transform: rotate(180deg);
}
.menu-btn {
  display: none; /* ocultar el botón en pantallas grandes */
  cursor: pointer;
  margin-right: 10px;
  padding: 0px 10px;
  border-radius: 10px;
  box-sizing: border-box;
  cursor: pointer;
  background: #ffffff;
  border: 0.566325px solid rgba(25, 32, 36, 0.6);
  border-radius: 3.39795px;
}
.menu-btn:active {
  filter: brightness(75%);
}
.dropdown-menu {
  position: absolute;
  margin: 245px 0 0 0;
  padding: 20px 0;
  right: 0;
  z-index: 2;

  background: var(--dropdown-background);
  border-radius: 6px;
  list-style: none;

  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 10px;
  z-index: 199999;
}
.dropdown-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.dropdown-menu li {
  margin-bottom: 10px;
}

.dropdown-menu a {
  color: #333;
  text-decoration: none;
  padding: 5px;
  display: block;
}

.dropdown-menu a:hover {
  background-color: #f7f7f7;
}
@media screen and (max-width: 1390px) {
  .titulo {
    display: none;
    font-size: 24px;
    content: "CDS-IGp";
  }
  .menu-btn {
    display: block;
  }

  /* ocultar el menú principal en pantallas pequeñas */
  .opciones,
  #dividermenutop {
    display: none;
  }

  /* mostrar el menú desplegable en pantallas pequeñas */
  .dropdown-menu {
    display: block;
  }
  .barra-inferior {
    display: none;
  }
  #contenedor {
    top: 80px;
  }
  .vNavi {
    margin-top: 80px !important;
  }
}
</style>
