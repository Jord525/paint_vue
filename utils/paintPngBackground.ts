export function paintPngBackground(ctx:any, canvas:any){
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
}
