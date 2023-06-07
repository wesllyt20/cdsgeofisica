async function get_leyenda_global_info(capa) {
    const url = `https://ide.igp.gob.pe/arcgis/rest/services/CTS/Estudios_Zonificacion/MapServer/${capa}?f=pjson`;
    let data = await fetch(url);
    let datajson = await data.json();
    let styles = {
        geometria: datajson['geometryType']
    }
    if (datajson['drawingInfo']['renderer']['uniqueValueInfos']) {
        styles["campo"] = datajson['drawingInfo']['renderer']['field1'];
        datajson['drawingInfo']['renderer']['uniqueValueInfos'].forEach(element => {
            let llave = element['value'];
            let fondo = element['symbol']['color'] || element['symbol']['imageData'];
            let borde = element['symbol']['outline'] && element['symbol']['outline']['color'];
            styles[llave] = [fondo, borde];
            //            styles[llave] = fondo;
        });
    } else {
        let fondo = datajson['drawingInfo']['renderer']['symbol']['color'] || datajson['drawingInfo']['renderer']['symbol']['imageData']
        console.log("sdsdsd", datajson);
        let borde = (datajson['drawingInfo']['renderer']['symbol']['outline'] && datajson['drawingInfo']['renderer']['symbol']['outline']['color']);
        styles[' '] = [fondo, borde];
    }

    return styles
}

async function get_leyenda_local_info({ capa, departamento, ciudad }) {
    const url = `https://ide.igp.gob.pe/arcgis/rest/services/CTS/Estudios_Zonificacion/MapServer/${capa}/query?where=departamen%3D%27${departamento}%27+and+ciudad%3D%27${ciudad}%27&text=&objectIds=&time=&timeRelation=esriTimeRelationOverlaps&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&havingClause=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&returnExtentOnly=false&sqlFormat=none&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=pjson`;
    let styles = await get_leyenda_global_info(capa);

    let data = await fetch(url);
    let datajson = await data.json();
    let resp = {
        geometria: styles['geometria']
    };
    if (styles['campo']) {
        let campo = styles['campo'];
        datajson['features'].forEach((feature) => {
            resp[feature['attributes'][campo]] = styles[feature['attributes'][campo]];
        });
    } else {
        resp[' '] = styles[' ']
    }
    return resp;
}

async function get_leyenda_estudios_region() {
    const url = `https://ide.igp.gob.pe/arcgis/rest/services/CTS/Estudios_Zonificacion/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&timeRelation=esriTimeRelationOverlaps&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&havingClause=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&returnExtentOnly=false&sqlFormat=none&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=pjson`
    let styles = await get_leyenda_global_info(0);
    let campo = styles['campo'];
    let data = await fetch(url);
    let datajson = await data.json();
    let resp = {
        contentType: 'image/png'
    };
    datajson['features'].forEach((feature) => {
        resp[feature['attributes'][campo]] = styles[feature['attributes'][campo]];
    });
    return resp;

}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const imprimeLeyenda = function () {
    const widgetLayersList = window._widgetManager.getWidgetById("widgets_ListIgp_Widget_57");
    if (!widgetLayersList || widgetLayersList.length == 0) {
        return
    }
    setTimeout(() => {  // Si la clase "checked" fue agregada o removida
        let layers = widgetLayersList.operLayerInfos._operLayers.map((l) => [l.layerObject.visible, l.title, l.url])
        // filtra sólo las capas activas
        layers = layers.filter((l) => l[0] && l[2].includes("Estudios_Zonificacion"));
        layers = layers.filter((l)=> !['Zona de estudio', 'Departamento'].includes(l[1]));
        let resp = [];
        let auxresp = [];
        layers.forEach((layer) => {
            let capa = layer[2].split('/');
            capa = capa[capa.length - 1];
            let nombre_capa = layer[1];
            let capas = null;
            if (capa != 0) {
                let departamento = document.querySelector('#departamentos').value;
                let ciudad = document.querySelector('#ciudades').value;
                if (ciudad != "--Seleccionar--") {
                    capas = get_leyenda_local_info({ capa, departamento, ciudad });
                }

            } else {
                capas = get_leyenda_estudios_region();
            }

            if (capas) {
                auxresp.push([nombre_capa, capas])
            }

        });

        auxresp.reverse();

        auxresp.forEach((r) => {
            resp.push(r[0]);
            resp = resp.concat(r[1]);

        })
        Promise.all(resp)
            .then((r) => {
                ////////////////////////////////////////////////////////////////////////////////
                // MURPHY AQUI DEBES ACTUALIZAR LA LEYENDA CON LOS VALORES DE LA VARIABLE "resp"
                // SE DEBE BORRAR EL CONTENIDO Y VOLVER A GENERARLO SÓLO CON ESTA INFORMACIÓN
                ////////////////////////////////////////////////////////////////////////////////
                let switchContainer = document.getElementById("switchConteiner")
                switchContainer.innerHTML = ""
                let flag_geomtry = "";
                let flag_zonaEstudios = false;
                r.forEach((elem) => {

                    if (typeof elem === "string") {


                        flag_zonaEstudios = elem == "Zona de estudio";
                        const title22 = document.createElement("div");
                        title22.style.fontWeight = "bold";
                        title22.style.fontSize = "14px";
                        title22.style.marginTop = "12px";
                        title22.style.marginLeft = "8px";
                        title22.textContent = elem;
                        switchContainer.appendChild(title22);


                    } else {
                        for (const [llave, valor] of Object.entries(elem)) {
                            const list6 = document.createElement("ul");
                            list6.style.listStyle = "none";
                            list6.style.margin = "0";
                            list6.style.padding = "0";
                            list6.style.marginTop = "10px";
                            switchContainer.appendChild(list6);

                            const size = "12px";
                            const lineheight = "14px"


                            switch (llave) {
                                case "geometria":
                                    flag_geomtry = valor; break;
                                case "contentType":
                                    break;
                                default:
                                    if (typeof valor[0] === "string") {
                                        const item6 = document.createElement("li");
                                        item6.style.display = "flex";
                                        item6.style.alignItems = "center";
                                        item6.style.fontSize = "12px";
                                        item6.style.marginTop = "0px";
                                        item6.style.marginLeft = "10px";
                                        item6.style.lineHeight = "1.4";
                                        list6.appendChild(item6);

                                        const polygon6 = document.createElement("img");
                                        polygon6.style.width = "10px";
                                        polygon6.style.height = "10px";
                                        polygon6.src = `data:image/png;base64,${valor[0]}`;
                                        item6.appendChild(polygon6);

                                        const text6 = document.createElement("span");
                                        text6.textContent = llave;
                                        text6.style.fontSize = size;
                                        text6.style.lineHeight = lineheight;
                                        text6.style.marginLeft = "15px";
                                        item6.appendChild(text6);
                                    } else {
                                        if (flag_geomtry == "esriGeometryPolygon") {
                                            const item6 = document.createElement("li");
                                            item6.style.display = "flex";
                                            item6.style.alignItems = "center";
                                            item6.style.justifyContent = "flex-start";
                                            item6.style.fontSize = "12px";
                                            item6.style.marginTop = "0px";
                                            item6.style.marginLeft = "10px";
                                            item6.style.lineHeight = "1.4";
                                            list6.appendChild(item6);

                                            const polygon6 = document.createElement("div");
                                            const polygon7 = document.createElement("div");
                                            polygon7.style.width = "20px";
                                            polygon7.style.height = "10px";
                                            polygon7.style.borderBottomLeftRadius = "20%";
                                            polygon7.style.borderBottomRightRadius = "40%";
                                            polygon7.style.borderTopLeftRadius = "40%";
                                            polygon7.style.borderTopRightRadius = "20%";

                                            polygon6.style.marginRight = "10px";
                                            //                                            if (flag_zonaEstudios) {
                                            polygon7.style.border = `1px solid rgba(${valor[1].join(',')})`;
                                            polygon7.style.backgroundColor = `rgba(${valor[0].join(',')})`;
                                            //                                            } else {
                                            //                                                polygon7.style.border = `2px solid gray`;
                                            //                                                polygon7.style.backgroundColor = `rgba(${valor[1].join(',')})`;
                                            //                                            }
                                            polygon6.appendChild(polygon7);
                                            item6.appendChild(polygon6);


                                            const text6 = document.createElement("div");
                                            text6.innerHTML = `<span>${llave}</span>`;
                                            //text6
                                            item6.appendChild(text6);

                                        } else if (flag_geomtry == "esriGeometryPoint") {
                                            const item6 = document.createElement("li");
                                            item6.style.display = "flex";
                                            item6.style.alignItems = "center";
                                            item6.style.fontSize = "12px";
                                            item6.style.marginTop = "0px";
                                            item6.style.marginLeft = "10px";
                                            item6.style.lineHeight = "1.4";
                                            list6.appendChild(item6);

                                            const circle = document.createElement("div");
                                            circle.style.width = "8px";
                                            circle.style.height = "8px";
                                            circle.style.borderRadius = "50%";
                                            circle.style.marginLeft = "20px";
                                            circle.style.backgroundColor = `rgba(${valor[0].join(',')})`;
                                            circle.style.border = `0.5px solid rgba(${valor[1].join(',')})`;
                                            item.appendChild(circle);

                                            const textEl = document.createElement("span");
                                            textEl.textContent = llave;
                                            textEl.style.marginLeft = "15px";
                                            item.appendChild(textEl);
                                        } else if (flag_geomtry == "esriGeometryPolyline") {
                                            const item6 = document.createElement("li");
                                            item6.style.display = "flex";
                                            item6.style.alignItems = "center";
                                            item6.style.fontSize = "12px";
                                            item6.style.marginTop = "0px";
                                            item6.style.marginLeft = "10px";
                                            item6.style.lineHeight = "1.4";
                                            list6.appendChild(item6);

                                            const line = document.createElement("div");
                                            line.style.width = "8px";
                                            line.style.height = "2px";
                                            line.style.marginLeft = "20px";
                                            line.style.backgroundColor = `rgba(${valor[0].join(',')})`;
                                            line.style.border = `0.5px solid rgba(${valor[0].join(',')})`;
                                            item6.appendChild(line);

                                            const textEl = document.createElement("span");
                                            textEl.textContent = llave;
                                            textEl.style.marginLeft = "15px";
                                            item6.appendChild(textEl);


                                        }
                                    }
                            }
                        }
                    }
                })
            });
    }, 800);
}

// se selecciona todos los checkboxes de la lista de capas
let checks_to_monit = null;
let Intervalo = setInterval(() => {
    checks_to_monit = document.querySelectorAll('[data-dojo-attach-point="layerListTable"] .checkbox');
    if ((checks_to_monit != null) && (checks_to_monit.length > 0)) {
        // Iniciamos la observación de los elementos
        checks_to_monit.forEach(function (elemento) {
            elemento.onclick = imprimeLeyenda;
        });
        clearInterval(Intervalo);
        //   imprimeLeyenda();  
    }
}, 500);

let filtroLeyenda = null;
let Intervalo2 = setInterval(() => {
    filtroLeyenda = document.getElementById("ciudades");
    if (filtroLeyenda != null) {
        filtroLeyenda.onchange = imprimeLeyenda;
        clearInterval(Intervalo2);
    }
}, 500);
