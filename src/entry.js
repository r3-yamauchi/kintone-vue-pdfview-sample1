import Vue from "vue";
import PdfView from "./PdfView.vue";
(function () {
  kintone.events.on("app.record.detail.show", (event) => {
    const elm = kintone.app.record.getSpaceElement("space1");
    if (!elm) {
      return event;
    }
    const vm = new Vue({
      el: elm,
      render(h) {
        return (
          <PdfView fileKey={event.record["file1"].value[0].fileKey} />
        );
      }
    });
    return event;
  });
})();
