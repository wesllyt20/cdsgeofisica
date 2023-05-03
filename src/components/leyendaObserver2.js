
/*async function get_leyenda_global_info(capa) {
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
            let value = element['symbol']['color'] || element['symbol']['imageData'];
            styles[llave] = value;
        });
    } else {
        styles[' '] = datajson['drawingInfo']['renderer']['symbol']['color'] || datajson['drawingInfo']['renderer']['symbol']['imageData']
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

} */
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// var iframe = document.getElementById("inlineFrameExample");
// var iframeWindow = iframe.contentWindow;
// Creamos una nueva instancia de MutationObserver para monitorear los cambios

/*const imprimeLeyenda = function () {
    const widgetLayersList = window._widgetManager.getWidgetById("widgets_ListIgp_Widget_57");
    if (!widgetLayersList || widgetLayersList.length == 0) {
        console.log("NO HAY CAPAS");
        return
    }
    setTimeout(() => {  // Si la clase "checked" fue agregada o removida
        let layers = widgetLayersList.operLayerInfos._operLayers.map((l) => [l.layerObject.visible, l.title, l.url])
        // filtra sólo las capas activas
        layers = layers.filter((l) => l[0] && l[2].includes("Estudios_Zonificacion"));
        let resp = [];
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
                resp.push(nombre_capa);
                resp = resp.concat(
                    capas
                );
            }
        });


        Promise.all(resp)
            .then((r) => {

                let switchContainer = document.getElementById("switchConteiner")
                switchContainer.innerHTML = ""
                let flag_geomtry = "";
                let flag_zonaEstudios = false;
                r.forEach((elem) => {
                    if (typeof elem === "string") {
                        flag_zonaEstudios = elem == "Zona de estudio"
                        const title22 = document.createElement("div");
                        title22.style.fontWeight = "bold";
                        title22.style.fontSize = "14px";
                        title22.style.marginTop = "12px";
                        title22.style.marginLeft = "8px";
                        title22.textContent = elem;
                        switchContainer.appendChild(title22);


                    } else {
                        for (const [llave, valor] of Object.entries(elem)) {
                            console.log(`${llave}: ${valor}`);

                            const list6 = document.createElement("ul");
                            list6.style.listStyle = "none";
                            list6.style.margin = "0";
                            list6.style.padding = "0";
                            list6.style.marginTop = "10px";
                            switchContainer.appendChild(list6);



                            switch (llave) {
                                case "geometria":
                                    flag_geomtry = valor; break;
                                case "contentType":
                                    break;
                                default:
                                    if (typeof valor === "string") {
                                        const item6 = document.createElement("li");
                                        item6.style.display = "flex";
                                        item6.style.alignItems = "center";
                                        item6.style.fontSize = "12px";
                                        item6.style.marginTop = "0px";
                                        item6.style.marginLeft = "10px";
                                        item6.style.lineHeight = "1.4";
                                        list6.appendChild(item6);

                                        const polygon6 = document.createElement("img");
                                        polygon6.style.width = "20px";
                                        polygon6.style.height = "20px";
                                        polygon6.src = `data:image/png;base64,${valor}`;
                                        item6.appendChild(polygon6);

                                        const text6 = document.createElement("span");
                                        text6.textContent = llave;
                                        text6.style.marginLeft = "15px";
                                        item6.appendChild(text6);
                                    } else {
                                        if (flag_geomtry == "esriGeometryPolygon") {
                                            const item6 = document.createElement("li");
                                            item6.style.display = "flex";
                                            item6.style.alignItems = "center";
                                            item6.style.fontSize = "12px";
                                            item6.style.marginTop = "0px";
                                            item6.style.marginLeft = "10px";
                                            item6.style.lineHeight = "1.4";
                                            list6.appendChild(item6);

                                            const polygon6 = document.createElement("div");
                                            polygon6.style.width = "20px";
                                            polygon6.style.height = "10px";
                                            if (flag_zonaEstudios) {
                                                polygon6.style.borderColor = `rgba(${valor.join(',')})`;
                                            } else {
                                                polygon6.style.backgroundColor = `rgba(${valor.join(',')})`;
                                            }
                                            polygon6.style.clipPath = "polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)";
                                            item6.appendChild(polygon6);


                                            const text6 = document.createElement("span");
                                            text6.textContent = llave;
                                            text6.style.marginLeft = "15px";
                                            item6.appendChild(text6);

                                            console.log("SE HACE UN CUADRILATERO");
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
                                            circle.style.backgroundColor = `rgba(${valor.join(',')})`;
                                            circle.style.border = "0.5px solid black";
                                            item.appendChild(circle);

                                            const textEl = document.createElement("span");
                                            textEl.textContent = llave;
                                            textEl.style.marginLeft = "15px";
                                            item.appendChild(textEl);



                                            console.log("SE HACE UN PUNTO");
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
                                            line.style.backgroundColor = `rgba(${valor.join(',')})`;
                                            line.style.border = "0.5px solid black";
                                            item.appendChild(line);

                                            const textEl = document.createElement("span");
                                            textEl.textContent = llave;
                                            textEl.style.marginLeft = "15px";
                                            item.appendChild(textEl);


                                        }
                                    }
                            }
                        }
                    }
                })




              

                //console.log("ARRAY", r[1])

                console.log("ARRAY", r)
               
                //console.log("Salida ------->", r)
            });
    }, 2000);
}*/


// se selecciona todos los checkboxes de la lista de capas
/*let checks_to_monit = null;
let Intervalo = setInterval(() => {
    checks_to_monit = document.querySelectorAll('[data-dojo-attach-point="layerListTable"] .checkbox');
    if ((checks_to_monit != null) && (checks_to_monit.length > 0)) {
        // Iniciamos la observación de los elementos
        checks_to_monit.forEach(function (elemento) {
            elemento.onclick = imprimeLeyenda;
        });
        clearInterval(Intervalo);
    }
}, 1000);
let filtroLeyenda = document.getElementById("ciudades");
filtroLeyenda.onchange = imprimeLeyenda; */


//console.log (document.querySelectorAll('[data-dojo-attach-point="layerListTable"] .checkbox'))
//console.log("AQUI IMPRIME EL SCRIP .JS", document.querySelector("#ciudades")) */

  /* SWTICH UTILIZADO
                                switch (r.length) {
                                    case 22:
                                        //title22
                
                                        const title22 = document.createElement("div");
                                        title22.style.fontWeight = "bold";
                                        title22.style.fontSize = "14px";
                                        title22.style.marginTop = "12px";
                                        title22.style.marginLeft = "8px";
                                        title22.textContent = r[18];
                                        switchContainer.appendChild(title22);
                
                
                
                
                
                                        if (r[19].geometria == "esriGeometryPolygon") {
                                            console.log("SE HACE UN CUADRILATERO");
                                        } else if (r[19].geometria == "esriGeometryPoint") {
                                            console.log("SE HACE UN PUNTO");
                                        } else if (r[19].geometria == "esriGeometryPolyline") {
                                            console.log("SE HACE UNA LINEA");
                                        }
                                        console.log("HAY 22");
                                    case 20:
                                        //title20
                                        const title20 = document.createElement("div");
                                        title20.style.fontWeight = "bold";
                                        title20.style.fontSize = "14px";
                                        title20.style.marginTop = "12px";
                                        title20.style.marginLeft = "8px";
                                        title20.textContent = r[16];
                                        switchContainer.appendChild(title20);
                
                
                
                                        if (r[17].geometria == "esriGeometryPolygon") {
                                            console.log("SE HACE UN CUADRILATERO");
                                        } else if (r[17].geometria == "esriGeometryPoint") {
                                            console.log("SE HACE UN PUNTO");
                                        } else if (r[17].geometria == "esriGeometryPolyline") {
                                            console.log("SE HACE UNA LINEA");
                                        }
                                        console.log("HAY 20");
                                    case 18:
                                        //title18
                                        const title18 = document.createElement("div");
                                        title18.style.fontWeight = "bold";
                                        title18.style.fontSize = "14px";
                                        title18.style.marginTop = "12px";
                                        title18.style.marginLeft = "8px";
                                        title18.textContent = r[14];
                                        switchContainer.appendChild(title18);
                
                
                
                                        if (r[15].geometria == "esriGeometryPolygon") {
                                            console.log("SE HACE UN CUADRILATERO");
                                        } else if (r[15].geometria == "esriGeometryPoint") {
                                            console.log("SE HACE UN PUNTO");
                                        } else if (r[15].geometria == "esriGeometryPolyline") {
                                            console.log("SE HACE UNA LINEA");
                                        }
                                        console.log("HAY 18");
                                    case 16:
                                        //title16
                                        const title16 = document.createElement("div");
                                        title16.style.fontWeight = "bold";
                                        title16.style.fontSize = "14px";
                                        title16.style.marginTop = "12px";
                                        title16.style.marginLeft = "8px";
                                        title16.textContent = r[12];
                                        switchContainer.appendChild(title16);
                
                
                
                
                                        if (r[13].geometria == "esriGeometryPolygon") {
                                            console.log("SE HACE UN CUADRILATERO");
                                        } else if (r[13].geometria == "esriGeometryPoint") {
                                            console.log("SE HACE UN PUNTO");
                                        } else if (r[13].geometria == "esriGeometryPolyline") {
                                            console.log("SE HACE UNA LINEA");
                                        }
                                        console.log("HAY 16");
                                    case 14:
                                        //title14
                                        const title14 = document.createElement("div");
                                        title14.style.fontWeight = "bold";
                                        title14.style.fontSize = "14px";
                                        title14.style.marginTop = "12px";
                                        title14.style.marginLeft = "8px";
                                        title14.textContent = r[10];
                                        switchContainer.appendChild(title14);
                
                
                
                
                
                                        if (r[11].geometria == "esriGeometryPolygon") {
                                            console.log("SE HACE UN CUADRILATERO");
                                        } else if (r[11].geometria == "esriGeometryPoint") {
                                            console.log("SE HACE UN PUNTO");
                                        } else if (r[11].geometria == "esriGeometryPolyline") {
                                            console.log("SE HACE UNA LINEA");
                                        }
                                        console.log("HAY 14");
                                    case 12:
                                        //title12
                                        const title12 = document.createElement("div");
                                        title12.style.fontWeight = "bold";
                                        title12.style.fontSize = "14px";
                                        title12.style.marginTop = "12px";
                                        title12.style.marginLeft = "8px";
                                        title12.textContent = r[8];
                                        switchContainer.appendChild(title12);
                
                
                
                
                
                                        if (r[9].geometria == "esriGeometryPolygon") {
                                            console.log("SE HACE UN CUADRILATERO");
                                        } else if (r[9].geometria == "esriGeometryPoint") {
                                            console.log("SE HACE UN PUNTO");
                                        } else if (r[9].geometria == "esriGeometryPolyline") {
                                            console.log("SE HACE UNA LINEA");
                                        }
                                        console.log("HAY 12");
                                    case 10:
                                        //title10
                                        const title10 = document.createElement("div");
                                        title10.style.fontWeight = "bold";
                                        title10.style.fontSize = "14px";
                                        title10.style.marginTop = "12px";
                                        title10.style.marginLeft = "8px";
                                        title10.textContent = r[6];
                                        switchContainer.appendChild(title10);
                
                
                
                                        if (r[7].geometria == "esriGeometryPolygon") {
                                            console.log("SE HACE UN CUADRILATERO");
                                        } else if (r[7].geometria == "esriGeometryPoint") {
                                            console.log("SE HACE UN PUNTO");
                                        } else if (r[7].geometria == "esriGeometryPolyline") {
                                            console.log("SE HACE UNA LINEA");
                                        }
                                        console.log("HAY 10");
                                    case 8:
                                        //title8
                                        const title8 = document.createElement("div");
                                        title8.style.fontWeight = "bold";
                                        title8.style.fontSize = "14px";
                                        title8.style.marginTop = "12px";
                                        title8.style.marginLeft = "8px";
                                        title8.textContent = r[4];
                                        switchContainer.appendChild(title8);
                
                
                
                
                
                                        if (r[5].geometria == "esriGeometryPolygon") {
                                            console.log("SE HACE UN CUADRILATERO");
                                        } else if (r[5].geometria == "esriGeometryPoint") {
                                            console.log("SE HACE UN PUNTO");
                                        } else if (r[5].geometria == "esriGeometryPolyline") {
                                            console.log("SE HACE UNA LINEA");
                                        }
                                        console.log("HAY 8");
                                    case 6:
                
                
                                        //title6
                                        const title6 = document.createElement("div");
                                        title6.style.fontWeight = "bold";
                                        title6.style.fontSize = "14px";
                                        title6.style.marginTop = "12px";
                                        title6.style.marginLeft = "8px";
                                        title6.textContent = r[2];
                                        switchContainer.appendChild(title6);
                
                
                
                                        // Agregamos la lista de elementos como hijo del contenedor
                                        const addListItem6 = (texto6, color6) => {
                                            const list6 = document.createElement("ul");
                                            list6.style.listStyle = "none";
                                            list6.style.margin = "0";
                                            list6.style.padding = "0";
                                            list6.style.marginTop = "10px";
                                            switchContainer.appendChild(list6);
                
                                            // Agregamos los elementos de la lista como hijos de la lista
                
                                            const item6 = document.createElement("li");
                                            item6.style.display = "flex";
                                            item6.style.alignItems = "center";
                                            item6.style.fontSize = "12px";
                                            item6.style.marginTop = "0px";
                                            item6.style.marginLeft = "10px";
                                            item6.style.lineHeight = "1.4";
                                            list6.appendChild(item6);
                
                                            if (r[3].geometria == "esriGeometryPolygon") {
                
                
                
                                                const polygon6 = document.createElement("div");
                                                polygon6.style.width = "20px";
                                                polygon6.style.height = "10px";
                                                polygon6.style.backgroundColor = color6;
                                                polygon6.style.border = "1px solid black";
                                                polygon6.style.clipPath = "polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)";
                                                item6.appendChild(polygon6);
                
                
                                                const text6 = document.createElement("span");
                                                text6.textContent = texto6;
                                                text6.style.marginLeft = "15px";
                                                item6.appendChild(text6);
                
                                                console.log("SE HACE UN CUADRILATERO");
                                            } else if (r[3].geometria == "esriGeometryPoint") {
                                                console.log("SE HACE UN PUNTO");
                                            } else if (r[3].geometria == "esriGeometryPolyline") {
                                                console.log("SE HACE UNA LINEA");
                                            }
                                            console.log("HAY 6");
                                        }
                                        addListItem6("ANCASH", "#a900e6");
                                        addListItem6("LIMA", "#0000AF");
                                        break;
                
                
                
                
                
                
                
                                    default:
                                        document.getElementsByClassName("switchConteiner").innerHTML = ""
                                        console.log("SE VACIO ESTA COSA");
                
                
                                }
                
                */