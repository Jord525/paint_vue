<script setup lang="ts">
//@ts-ignore
import downloadButton from './downloadButton.vue'
import { ref } from 'vue'
import { paintPngBackground } from '../../utils/paintPngBackground'
let painting: boolean = false
const canvas = ref<HTMLCanvasElement>()
const x = ref<number | undefined>(undefined)
const y = ref<number | undefined>(undefined)

function startDraw(e: MouseEvent): void {
    painting = true
    draw(e)
}

function endDraw(): void {
    const ctx = canvas.value?.getContext('2d')
    painting = false
    ctx!.beginPath()
}
function drawline(x1: number, y1: number, x2: number, y2: number): void {
    const ctx = canvas.value?.getContext('2d')
    paintPngBackground(ctx, canvas)

    if (!painting) return
    ctx?.beginPath()
    ctx!.strokeStyle = 'black'
    ctx!.lineWidth = 2
    ctx?.moveTo(x1, y1)
    ctx?.lineTo(x2, y2)
    ctx?.stroke()
    ctx?.closePath()
}
function draw(e: MouseEvent): void {
    drawline(x.value!, y.value!, e.offsetX, e.offsetY), (x.value = e.offsetX), (y.value = e.offsetY)
}

function downloadImage(url: string) {
    let canvasUrl = canvas.value?.toDataURL(url)
    const createEl: HTMLAnchorElement = document.createElement('a')
    createEl.href = canvasUrl!
    createEl.download = 'download-image'
    createEl.click()
    createEl.remove()
}

function reset() {
    const ctx = canvas.value?.getContext('2d')
    ctx?.reset()
}
</script>
<template>
    <div>
        <canvas
            width="500"
            height="300"
            ref="canvas"
            id="myCanvas"
            @mousedown="startDraw"
            @mouseup="endDraw"
            @mousemove="draw"
        />
        <a style="cursor: pointer" @click="downloadImage('image/png')">
            <downloadButton />
        </a>
        <button @click="reset">Reset</button>
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
