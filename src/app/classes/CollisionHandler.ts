
import { Camera } from "./Camera";
import { TILE_SIZE } from "./Constants";
interface Position {
    x: number;
    y: number;
}

interface Actor {
    position: Position;
    actorWidth: number;
    actorHeight: number;
}

interface Tile {
    tileType: number;
}

export class CollisionHandler {
    private ctx: CanvasRenderingContext2D; 
    private camera: Camera;  // Replace 'any' with the appropriate type for 'camera'
    private mapArray: Tile[][];

    constructor(ctx: CanvasRenderingContext2D, camera: Camera, mapArray: Tile[][]) {
        this.ctx = ctx;
        this.camera = camera;
        this.mapArray = mapArray;
    }

    hasReachedGround(actor: Actor): boolean {
        const y = Math.round((actor.position.y + actor.actorHeight) / TILE_SIZE) - 1;
        const x = Math.round((actor.position.x + actor.actorWidth) / TILE_SIZE) - 2;

        if (this.mapArray[y]) {
            if (this.mapArray[y][x]) {
                if(this.mapArray[y][x].tileType === 1 || this.mapArray[y][x].tileType === 4) {
                    return true;
                }
            }
        }
        return false;
    }

    pushingAgainstWall(actor: Actor, direction: 'D' | 'A'): boolean {
        const fromY = Math.round(actor.position.y / TILE_SIZE) - 1;
        let x;
        
        if(direction === 'D') 
            x = Math.round((actor.position.x + actor.actorWidth) / TILE_SIZE);
        else if(direction === 'A') 
            x = Math.round(actor.position.x / TILE_SIZE);
        
        x = x - 3;
        
        const toY = Math.round((actor.position.y + actor.actorHeight) / TILE_SIZE) - 1;

        for(let i = fromY; i < toY; i++) {
            if (this.mapArray[i]) {
                if (this.mapArray[i][x]) {
                    if(this.mapArray[i][x].tileType === 1 || this.mapArray[i][x].tileType === 2 || this.mapArray[i][x].tileType === 4) {
                        return true;
                    }
                    if(this.mapArray[i][x + 2] && (this.mapArray[i][x + 2].tileType === 3 || this.mapArray[i][x + 2].tileType === 5)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    objectIsOutBound(position: Position): boolean {
        const y = Math.round(position.y / TILE_SIZE);
        const x = Math.round(position.x / TILE_SIZE);

        if (this.mapArray[y] && this.mapArray[y][x] && (this.mapArray[y][x].tileType === 1 || this.mapArray[y][x].tileType === 4 || this.mapArray[y][x].tileType === 2)) {
            return true;
        }
        return false;
    }
}
