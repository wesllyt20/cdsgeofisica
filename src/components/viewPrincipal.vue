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
      <h1 class="titulo">CDS - IGP</h1>
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
    <v-btn
      id="btnFlecha"
      class="rail-variant ml-n10"
      :class="{ 'rail-variant--open': drawer }"
      icon
      @click.stop="onMoveWidgetsButtonClick"
    >
      <v-img
        id="iconFlecha"
        class="rotate-image"
        src="https://i.ibb.co/CJzYHCM/Vector-1.png"
      ></v-img>
    </v-btn>
    <!-- contenedor de menu -->
    <v-navigation-drawer
      v-model="drawer"
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
  "dijit__WidgetBase_1",
  "widgets_Scalebar_Widget_59",
  "widgets_Coordinate_Widget_61",
  "_62_panel",
  "_63_panel",
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
    };
  },
  methods: {
    iframeLoad() {
      setTimeout(() => {
        this.positivo();
        this.drawer = true;
        this.indexflecha = 1;
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
      } else if (this.elementos === false) {
        this.positivo();
      }
    },
    positivo() {
      this.elementos = true;
      // this.movewidgets(465);
    },
    negativo() {
      this.elementos = false;
      //  this.movewidgets(-465);
    },
    funcionFlechaFalse() {
      console.log("ESTE ES",this.drawer);
      if (this.drawer === false) {
        console.log("AQUI SI EJECUTO ")
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
        var botonFiltro = iframe.contentWindow.document.getElementById(
          "dijit__WidgetBase_1"
        );

        botonFiltro.click();
        var botonLeyenda = iframe.contentWindow.document.getElementById(
          "dijit__WidgetBase_0"
        );
        botonLeyenda.click();
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
      console.log(val)
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
  left: calc(v-bind(anchoMenu) + 3px);
}
/* BOTON DE FLECHA */
#btnFlecha {
  margin-top: 300px;
  position: absolute;
  width: 60.3px;
  height: 49.98px;
  z-index: v-bind(indexflecha);
}
#iconFlecha {
  margin-left: 30px;
  width: 19px;
  height: 20px;
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
  transform: rotate(180deg); /* Gira la imagen 180 grados */
}
</style>
