import html2canvas from "html2canvas"
import { ref } from 'vue';

export function useHtmlImage() {

    function generarImagen(content) {
      return html2canvas(
        content, 
        {
          useCORS: true,
        }).then(canvas => {
          return canvas.toDataURL("image/png");
        });
    }

    function generarImagenPersonalizada(miDiv, width=null, height=null) {
      return html2canvas(miDiv)
      .then(canvas => {
        // Crear un nuevo canvas con las dimensiones deseadas
        const nuevoCanvas = document.createElement('canvas');
        nuevoCanvas.width = width;
        nuevoCanvas.height = height;
        const ctx = nuevoCanvas.getContext('2d');
        ctx.drawImage(canvas, 0, 0, width, height);
        const dataURL = nuevoCanvas.toDataURL("image/png");
        return dataURL;
      });
    }


  const imageSrc = ref(null);

  const convertDivToImage = (divRef) => {
    const div = divRef.value;
    if (!div) {
      console.error(`Provided ref does not reference a valid element.`);
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = div.offsetWidth;
    canvas.height = div.offsetHeight;

    const ctx = canvas.getContext('2d');
    const imageData = new Image();
    imageData.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(div.innerHTML)));

    imageData.onload = () => {
      ctx.drawImage(imageData, 0, 0);
      const url = canvas.toDataURL();
      imageSrc.value = url;
      downloadImage(url);
    };
  };

  const downloadImage = (url) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = 'imagen_generada.png'; // Nombre del archivo a descargar
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };


    return {
        generarImagen,
        generarImagenPersonalizada,
        convertDivToImage
    }
}