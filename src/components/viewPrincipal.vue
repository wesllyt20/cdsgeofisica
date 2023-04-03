<template>
  <v-app>
    <div class="barra-superior"></div>
    <div class="barra-inferior">
      <a class="my-link" href="https://www.portaligp.gob.pe/" :style="{marginLeft: '48px'} ">Portal IGP</a>
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
      <svg
        id="iconFlecha"
        width="12"
        height="12"
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.97717 3.3241V7.31078C2.97717 7.3989 2.94216 7.4834 2.87986 7.5457C2.81756 7.60801 2.73305 7.64301 2.64494 7.64301C2.55683 7.64301 2.47233 7.60801 2.41003 7.5457C2.34772 7.4834 2.31272 7.3989 2.31272 7.31078V3.3241C2.31272 3.23599 2.34772 3.15149 2.41003 3.08919C2.47233 3.02688 2.55683 2.99188 2.64494 2.99188C2.73305 2.99188 2.81756 3.02688 2.87986 3.08919C2.94216 3.15149 2.97717 3.23599 2.97717 3.3241ZM1.31605 2.99188C1.22794 2.99188 1.14344 3.02688 1.08113 3.08919C1.01883 3.15149 0.983827 3.23599 0.983826 3.3241V7.31078C0.983826 7.3989 1.01883 7.4834 1.08113 7.5457C1.14344 7.60801 1.22794 7.64301 1.31605 7.64301C1.40416 7.64301 1.48866 7.60801 1.55097 7.5457C1.61327 7.4834 1.64827 7.3989 1.64827 7.31078V3.3241C1.64827 3.23599 1.61327 3.15149 1.55097 3.08919C1.48866 3.02688 1.40416 2.99188 1.31605 2.99188ZM9.52434 5.08253L5.53766 1.09585C5.4912 1.04939 5.432 1.01774 5.36756 1.00492C5.30311 0.9921 5.23631 0.998678 5.1756 1.02382C5.11489 1.04897 5.063 1.09155 5.0265 1.14619C4.98999 1.20082 4.97051 1.26505 4.97051 1.33076V2.99188H3.97384C3.88573 2.99188 3.80122 3.02688 3.73892 3.08919C3.67662 3.15149 3.64161 3.23599 3.64161 3.3241V7.31078C3.64161 7.39889 3.67662 7.4834 3.73892 7.5457C3.80122 7.608 3.88573 7.64301 3.97384 7.64301H4.97051V9.30412C4.97051 9.36983 4.98999 9.43407 5.0265 9.4887C5.063 9.54334 5.11489 9.58592 5.1756 9.61107C5.23631 9.63621 5.30311 9.64279 5.36756 9.62997C5.432 9.61715 5.4912 9.5855 5.53766 9.53904L9.52434 5.55236C9.58663 5.49004 9.62161 5.40555 9.62161 5.31744C9.62161 5.22934 9.58663 5.14484 9.52434 5.08253Z"
          fill="black"
        />
      </svg>
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
  height: 80px;
  background: #ffffff;
  left: 0px;
  top: 0px;
}
.barra-inferior {

  display: flex; /* convierte los elementos en una fila */
  align-items: center;

  box-sizing: border-box;

  background: #F0F4FD;
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
