<script setup lang="ts">
//@ts-ignore
import downloadButton from "./downloadButton.vue";
import { ref } from "vue";
const canvas = ref<HTMLCanvasElement>();
const x = ref<number | undefined>(undefined);
const y = ref<number | undefined>(undefined);

function drawLine(x1: number, y1: number, x2: number, y2: number): any {
  const ctx = canvas.value?.getContext("2d");
  let imgData = ctx?.getImageData(
    0,
    0,
    canvas.value!.width,
    canvas.value!.height
  );
  var data = imgData!.data;
  for (var i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 255) {
      data[i] = 255;
      data[i + 1] = 255;
      data[i + 2] = 255;
      data[i + 3] = 255;
    }
  }
  ctx!.putImageData(imgData!, 0, 0);
  ctx?.beginPath();
  ctx!.strokeStyle = "black";
  ctx!.lineWidth = 2;
  ctx?.moveTo(x1, y1);
  ctx?.lineTo(x2, y2);
  ctx?.stroke();
  ctx?.closePath();
}
function draw(e: MouseEvent) {
  drawLine(x.value!, y.value!, e.offsetX, e.offsetY),
    (x.value = e.offsetX),
    (y.value = e.offsetY);
}
function downloadImage(url: string) {
  let canvasUrl = canvas.value?.toDataURL(url);
  const createEl: HTMLAnchorElement = document.createElement("a");
  createEl.href = canvasUrl!;
  createEl.download = "download-image";

  createEl.click();
  createEl.remove();
}
</script>
<template>
  <div>
    <canvas
      width="500"
      height="300"
      ref="canvas"
      id="myCanvas"
      @mousemove="draw"
    />
    <a style="cursor: pointer" @click="downloadImage('image/png')">
      <downloadButton />
    </a>
  </div>
</template>
<style>
canvas {
  border: 2px solid gray;
  background-color: white;
  border-radius: 10px;
  cursor: crosshair;
}
</style>
