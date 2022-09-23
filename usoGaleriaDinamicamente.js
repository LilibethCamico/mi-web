/*FileReader, como leer 1 archivo
const archivo = document.getElementById('archivo');

archivo.addEventListener("change", (e)=>{
   //console.log(archivo.files[0]);
   //como accedemos a lo que nos esta pasando el usuario, por
   que de momento solo vemos toda su informacion que tipo es 
   y otros valore, pero como hacemos para leer y mostrar lo
   que nos envian
   //leerArchivo(archivo.files[0]);  cuando pasamos 0 es a un unico archivo que vamos acceder
   leerArchivo(archivo.files); //solo files, varios archivos
  
})

const leerArchivo = ar =>{
	 
      lectura de un solo archivo
	 const reader = new FileReader();
	 reader.readAsText(ar); //lee el archivo
	 //verificar que este cargado
	 reader.addEventListener("load", (e)=>{
	 	console.log(JSON.parse(e.currentTarget.result))
	 	//muestra la carga actual
	 });
     //lectura de varios archivos, en el input desde html agregar multiple
     for (var i = 0; i < ar.length; i++) {
     	//console.log(ar[i]);
     	//lo mismo que arriba
     	const reader = new FileReader();
	    reader.readAsText(ar[i]); //i del recorrido del for
	    reader.addEventListener("load", (e)=>{
	 	console.log(JSON.parse(e.currentTarget.result))
     })
}
}*/

/*como funciona readAsDataURL
const archivo = document.getElementById('archivo');
      archivo.addEventListener("change", (e)=>{
              leerArchivo(archivo.files);  
})

const leerArchivo = ar => {
	 
     for (var i = 0; i < ar.length; i++) {
     	const reader = new FileReader();

     	//lectura para un solo archivo, este ejemplo estamos usando una imagen
	    reader.readAsDataURL(ar[i]);
	    reader.addEventListener("load", (e)=>{
	 	  let newImg = `<img src='${e.currentTarget.result}'>`;
	 	  //en vez de usar con innerHTML, se puede hacer con documet fragmet
	 	  document.querySelector(".resultado").innerHTML += newImg;

     })
}
}*/

/*Ejemplo para cargar varias imagenes de forma dinamica
const archivo = document.getElementById('archivo');
      archivo.addEventListener("change", (e)=>{
              leerArchivo(archivo.files);  
})

const leerArchivo = ar => {
   
     for (var i = 0; i < ar.length; i++) {
      const reader = new FileReader();

      //lectura para un solo archivo, este ejemplo estamos usando una imagen
      reader.readAsDataURL(ar[i]);
      reader.addEventListener("load", (e)=>{
      let newImg = `<img src='${e.currentTarget.result}'>`;
      //en vez de usar con innerHTML, se puede hacer con documet fragmet
      document.querySelector(".resultado").innerHTML += newImg;

     })
}
}*/
"use strict"
const zona = document.querySelector(".zona-arrastre");

//dragover para cuando estemos por encima, vamos a cambiar el estilo 
zona.addEventListener("dragover", e =>{
  e.preventDefault();
  changStyle(e.srcElement, "#444");
})

//cpn dragleave hacemos lo mismo pero al salir, cambia el estilo
zona.addEventListener("dragleave", e =>{
  e.preventDefault();
  changStyle(e.srcElement, "#888");
})

//cpn drop para cuando cargue en la zona, nos muestre el archivo cargado
zona.addEventListener("drop", e =>{
  e.preventDefault();
  changStyle(e.srcElement, "#888");
  cargarArchivo(e.dataTransfer.files[0]);
    zona.style.border = "4px solid #888";

})

const changStyle = (obj, color)=>{
//tiene 2 param objecto y color
  obj.style.color = color;
  obj.style.border = `4px dashed ${color}`;

}

/*cargar un archivo con texto 
const cargarArchivo = ar =>{
    const reader = new FileReader();
    reader.readAsText(ar); //para archivo text-plain
    reader.addEventListener("load", e=>{
    document.querySelector(".resultado").textContent = e.currentTarget.result;
    })
  }*/

/*para cargarun a imagen 
const cargarArchivo = ar =>{
    const reader = new FileReader();
    reader.readAsDataURL(ar);
    //cuando cargue, nos muestre el contenido
    reader.addEventListener("load", e=>{
      let url = URL.createObjectURL(ar); //creamos una url para el archivo
      let img = document.createElement("IMG"); //creamos la imagen
      img.setAttribute("src", url);
      document.querySelector(".resultado").appendChild(img); //y la agregamos para que nos la muestre una vez cargada
    })
  };*/

/*para cargar un video
const cargarArchivo = ar =>{
    const reader = new FileReader();
    reader.readAsArrayBuffer(ar); //que trabaja con tipo blob
    //cuando cargue, nos muestre el contenido
    reader.addEventListener("load", e=>{
      //con el video creamos una instancia de blob, la cual para crear un objecto de tipo 
      //blob debemos usar 2 parametros(un array, y options)
      let video = new Blob([new Uint8Array(e.currentTarget.result)], {type: 'video/mp4'}); 
      //Uint8Array, tipo especial de array la cual lousamos para crear el formato valido para la ruta,investigar
      let url = URL.createObjectURL(video); 
      //creamos una url para el video, ya que video si tiene un formato valido para crear una url
      let img = document.createElement("VIDEO"); //creamos al video
      img.setAttribute("src", url);
      document.querySelector(".resultado").appendChild(img); //y la agregamos para que nos la muestre una vez cargada
      img.play(); //para reproducirlo
    })
  }*/


//barrea de carga, por si el video es muy largo se muestre el progreso
const cargarArchivo = ar =>{
    const reader = new FileReader();
    reader.readAsArrayBuffer(ar); //que trabaja con tipo blob

    reader.addEventListener("progress", e=>{
      //console.log("hola"); //lo cual cada 4% nos tira un hola
      //console.log(ar.size); //conocer el tama;o dewl archivo
      //console.log(e.loaded); //nos indica cuanto carga del total del peso del archivo
      let carga = Math.round(e.loaded / ar.size * 100); //una vez conocer el tama;o de la carga le sacamos su porcentaje
      //console.log(carga); no lo mostramos en consola, sino en la vista
      zona.textContent = `${carga}%`;
      document.querySelector(".barra-de-carga").style.padding = "75px 210px";
      document.querySelector(".barra-de-carga").style.width = `${carga/3.6}%`; //3.6 algo mas o menos para precision de la carga e igual investigar
    })
    //una vez que cargo el 100%
    reader.addEventListener("loadend", e=>{
      changStyle(zona, "#2e7");
      zona.style.borderStyle = "solid";
      document.querySelector(".barra-de-carga").style.background = "#2e7";
      //despues de 0.5s ejecute, una vez carga completa
      setTimeout(()=>{
        zona.style.color = "#fff";
        zona.style.animation = "aparecer 1s forwards";
        zona.textContent = "Carga Completa!";
      }, 500)

    })

    //cuando cargue, nos muestre el contenido
    reader.addEventListener("load", e=>{
      /*con el video creamos una instancia de blob, la cual para crear un objecto de tipo 
      blob debemos usar 2 parametros(un array, y options)*/
      let video = new Blob([new Uint8Array(e.currentTarget.result)], {type: 'video/mp4'}); 
      /*Uint8Array, tipo especial de array la cual lousamos para crear el formato valido para la ruta,investigar*/
      let url = URL.createObjectURL(video); 
      /*creamos una url para el video, ya que video si tiene un formato valido para crear una url*/
      let img = document.createElement("VIDEO"); //creamos al video
      img.setAttribute("src", url);
      document.querySelector(".resultado").appendChild(img); //y la agregamos para que nos la muestre una vez cargada
      img.play(); //para reproducirlo

    })
  }