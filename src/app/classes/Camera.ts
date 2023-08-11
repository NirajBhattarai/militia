export class Camera {
    private ctx: CanvasRenderingContext2D;
    private shyame: any; // Replace 'any' with the appropriate type if known
    private canvasMarginLeft: number;
    private cameraSpeed: number;

    constructor(ctx: CanvasRenderingContext2D, shyame: any) {
        this.ctx = ctx;
        this.shyame = shyame;
        this.canvasMarginLeft = 0;
        this.cameraSpeed = this.shyame.actor.speed;
    }

    move(): void {
        const diffCurrPos = this.shyame.actor.position.x - Math.abs(this.canvasMarginLeft);
        if(diffCurrPos != 600) {
            if (diffCurrPos > 600) {
                this.moveRight();
            } else {
                this.moveLeft();
            }
        }
    }

    private moveRight(): void {
        if (this.canvasMarginLeft <= 0 && this.canvasMarginLeft >= -2635.0001) {
            this.canvasMarginLeft -= this.cameraSpeed;
        }
        this.ctx.canvas.style.marginLeft = this.canvasMarginLeft + 'px';
    }

    private moveLeft(): void {
        if (this.canvasMarginLeft < -this.cameraSpeed && this.canvasMarginLeft >= (-2635 - this.cameraSpeed)) {
            this.canvasMarginLeft += this.cameraSpeed;
        }
        this.ctx.canvas.style.marginLeft = this.canvasMarginLeft + 'px';
    }
}
