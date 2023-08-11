export class Bullet {
    private ctx: CanvasRenderingContext2D;
    private startPosition: { x: number, y: number };
    private endPosition: { x: number, y: number };
    private speed: number;
    private gunOffset: { x: number, y: number };
    private actorType: string;
    private bulletColor: string;
    private fromPosition: { x: number, y: number };
    private toPosition: { x: number, y: number };
    private vector: { x: number, y: number };
    private hit: boolean;

    constructor(
        ctx: CanvasRenderingContext2D,
        startPosition: { x: number, y: number },
        endPosition: { x: number, y: number },
        mapArray: any[], // Needs better typing depending on its structure
        gunOffset: { x: number, y: number },
        actorType: string
    ) {
        this.ctx = ctx;
        this.startPosition = startPosition;
        this.endPosition = endPosition;
        this.speed = 20;
        this.gunOffset = gunOffset;
        this.actorType = actorType;
        this.bulletColor = 'red';

        if (this.actorType === 'shyame') {
            this.bulletColor = '#fffb42';
        }

        const vectorX = this.startPosition.x - this.endPosition.x + this.gunOffset.x;
        const vectorY = this.startPosition.y - this.endPosition.y + this.gunOffset.y;
        const distance = this.calculateDistance(
            this.startPosition.x + this.gunOffset.x,
            this.startPosition.y + this.gunOffset.y,
            this.endPosition.x,
            this.endPosition.y
        );

        this.fromPosition = { 
            x: this.startPosition.x + this.gunOffset.x, 
            y: this.startPosition.y + this.gunOffset.y 
        };
        
        this.vector = { x: -vectorX / distance, y: -vectorY / distance };
        this.toPosition = { x: 0, y: 0 };
        this.hit = false;
    }

    fire(): void {
        this.ctx.beginPath();
        this.ctx.lineWidth = 5;

        const toPositionX = this.fromPosition.x + this.vector.x * this.speed;
        const toPositionY = this.fromPosition.y + this.vector.y * this.speed;
        
        this.toPosition = { x: toPositionX, y: toPositionY };

        this.ctx.moveTo(this.fromPosition.x, this.fromPosition.y);
        this.ctx.lineTo(this.toPosition.x, this.toPosition.y);
        this.ctx.strokeStyle = this.bulletColor;
        this.ctx.stroke();
        this.ctx.closePath();

        this.fromPosition = this.toPosition;
    }

    private calculateDistance(x1: number, y1: number, x2: number, y2: number): number {
        return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    }
}

export default Bullet;
