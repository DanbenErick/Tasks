(function(){
    let boton = document.querySelector("#add");
    let boton2 = document.querySelector("#clean");
    let lista = document.querySelector("ul");
    let contenido = document.querySelector("input");
    let localStorages = window.localStorage;
    boton.addEventListener("click", addTask);
    boton2.addEventListener("click", cleanTasks);

    let seg = 1,
    min = 1,
    horas = 1;
    setInterval(contar, 1000);
    function contar() {
        if(seg < 10){
            document.querySelector("#seg").textContent = "0" + seg++;
        }
        else {
            document.querySelector("#seg").textContent = seg++;
        }
        if(seg > 60) {
            seg = 0;
            if(min < 10) {
                document.querySelector("#min").textContent ="0" + min++;
            }else{
                document.querySelector("#min").textContent = min++;
            }
        }
        if(min > 60) {
            min = 0;
            document.querySelector("#hor").textContent = horas++;
        }
    }

    function addTask () {
        let li = document.createElement("li");
        if(contenido.value == "") {
            console.log("No podermos agregar una tarea vacia");
        }else{
            if(contenido.value.length >= 20) {
                console.log("Muchos Digitos");
            }else{
                li.textContent = contenido.value;
                lista.appendChild(li);

                //Guardar en el localStorage
                saveLocalStorage();
            }
        }
    }
    function saveLocalStorage() {
        let contenido = document.querySelectorAll("li");
        let arregloContenido = [];
        for(let i = 0; i < contenido.length; i++) {
            arregloContenido[i] = contenido[i].textContent;
        }
        localStorages.setItem('contenido', arregloContenido.toString());

    }

    function getTaks() {
        let itemsLista = localStorages.getItem('contenido');
        itemsLista = itemsLista != null ? itemsLista.split(','): null;
        if(itemsLista == null) {
            console.log("No hay contenido para mostrar");
        }
        else if(itemsLista.length == 1) {
            let li = document.createElement("li");
            li.textContent = itemsLista[0];
            lista.appendChild(li);
        }else if(itemsLista.length > 1) {
            for(let i = 0; i < itemsLista.length; i++) {
                console.log("Cantidad de elementos", itemsLista.length);
                console.log("Array de Elementos", itemsLista);
                let li = document.createElement("li");
                li.textContent = itemsLista[i];
                lista.appendChild(li);
                console.log("indice", i);
            }
        }

    }
    getTaks();
    function cleanTasks(){
        localStorages.removeItem('contenido');
        lista.innerHTML = "";
    }
    tarea.addEventListener("keyup", function(e) {
      if(e.target.value.length > 20) {
        tarea.classList.add("red-border")
      }
      else {
        tarea.classList.remove("red-border")
      }
    })
})();
