
import Bullet from "./Bullet";
import { CollisionHandler } from "./CollisionHandler";

interface Offset {
    x: number;
    y: number;
}

interface Position {
    x: number;
    y: number;
}

class Weapon {
    private resources: any;  // Assuming it's a generic object
    private ctx: CanvasRenderingContext2D;
    private collisionHandler: any;  // Replace with specific type if available
    private offset: Offset;
    private actorType: string;
    private weaponImageRight: HTMLImageElement;
    private weaponImageLeft: HTMLImageElement;

    constructor(ctx: CanvasRenderingContext2D, collisionHandler: CollisionHandler, actorType: string, resources: any) {
        this.resources = resources;
        this.ctx = ctx;
        this.collisionHandler = collisionHandler;
        this.offset = { x: 20, y: 60 };
        this.actorType = actorType;

        this.initializeWeapon();
    }

    private initializeWeapon(): void {
        if (this.actorType === 'shyame') {
            this.weaponImageRight = this.resources.getImage('hand_with_gun');
            this.weaponImageLeft = this.resources.getImage('hand_with_gun_left');
        } else if (this.actorType === 'robot-unit') {
            this.weaponImageRight = this.resources.getImage('enemy_gun');
            this.weaponImageLeft = this.resources.getImage('enemy_gun_left');
        }
    }

    public fireBullet(startPosition: Position, endPosition: Position): Bullet {
        return new Bullet(this.ctx, startPosition, endPosition, this.collisionHandler, this.offset, this.actorType);
    }
}
