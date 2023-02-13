export const replaceCanvasToImage = async (element: Element): Promise<void> => {
  if (!element?.childElementCount) {
    return Promise.resolve();
  }
  for (let i = 0; i < element?.childElementCount; i++) {
    const child = element.children[i];
    if (child?.nodeName === "IMG") {
      const complete = (child as HTMLImageElement).complete;
      if (complete) {
        return Promise.resolve();
      }
      const canvas = document.createElement("canvas");
      return new Promise<void>((res, rej) => {
        (child as HTMLImageElement).onload = () => {
          canvas.width = child.clientWidth;
          canvas.height = child.clientHeight;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(child as HTMLImageElement, 0, 0);

          const dataURL = canvas.toDataURL("image/png");
          (child as HTMLImageElement).src = dataURL;
          res();
        };
      });
    } else if (child?.nodeName === "CANVAS") {
      const dataUrl = (child as HTMLCanvasElement)
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      const image = document.createElement("img");
      image.src = dataUrl;
      image.style.width = `${child.clientWidth}px`;
      image.style.height = `${child.clientHeight}px`;
      element.replaceChild(image, element.childNodes[i]);
      return Promise.resolve();
    } else {
      return await replaceCanvasToImage(child);
    }
  }
};
