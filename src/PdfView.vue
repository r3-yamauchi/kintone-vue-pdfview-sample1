<template>
  <object :data="imageUrl" type="application/pdf" width="100%" height="100%" style="height: 500px;">
  </object>
</template>

<script>
export default {
  name: "PdfView",
  props: ["fileKey"],
  data () {
    return { fileKey: this.fileKey, imageUrl: "" };
  },
  created () {
    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open("GET", `/k/v1/file.json?fileKey=${this.fileKey}`, true);
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      xhr.responseType = "blob";

      xhr.onload = function (e) {
        if (this.status === 200) {
          resolve(this.response);
        }
      };

      xhr.send();
    }).then(pdfData => {
      const url = window.URL || window.webkitURL;
      this.imageUrl = url.createObjectURL(pdfData);
    });
  }
}
</script>
