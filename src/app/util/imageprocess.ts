import { Observable } from 'rxjs/Observable';


export class ProcessImage {
    private ctx2d: CanvasRenderingContext2D;

    constructor() {
        this.ctx2d = document.createElement('canvas').getContext('2d');
    }

    // @imgData: the base64 encoded image data from FileReader
    // the observer will return a base64 encoded resized image
    resizeImage(imgData: string, width: number, height: number): Observable<string> {
        return new Observable<string>(observer => {
            const resizeImg = new Image();

            resizeImg.addEventListener('load', () => {
                const aspect = resizeImg.width / resizeImg.height;

                // check our width
                if (resizeImg.width > width) {
                    resizeImg.width = width;
                    resizeImg.height = width * aspect;
                }

                // now check our new height
                if (resizeImg.height > height) {
                    resizeImg.height = height;
                    resizeImg.width = height * aspect;
                }

                this.ctx2d.canvas.width = resizeImg.width;
                this.ctx2d.canvas.height = resizeImg.height;
                this.ctx2d.drawImage(resizeImg, 0, 0, resizeImg.width, resizeImg.height);

                observer.next(this.ctx2d.canvas.toDataURL('image/png', 1.0));
                observer.complete();
            });
            resizeImg.src = imgData;
        });
    }
}
