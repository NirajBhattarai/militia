export class Resources {
    private images: Record<string, HTMLImageElement>;
    private audios: Record<string, HTMLAudioElement>;
    private imageLoadedCount: number;
    private audioLoadedCount: number;

    constructor() {
        this.images = {};
        this.audios = {};
        this.imageLoadedCount = 0;
        this.audioLoadedCount = 0;
    }

    addImage(name: string, src: string): void {
        const image = new Image();
        image.onload = () => {
            this.imageLoadedCount += 1;
        };
        image.src = src;
        this.images[name] = image;
    }

    getImage(name: string): HTMLImageElement | undefined {
        return this.images[name];
    }

    addAudio(name: string, src: string): void {
        const audio = new Audio(src);
        this.audios[name] = audio;
    }

    getAudio(name: string): HTMLAudioElement | undefined {
        return this.audios[name];
    }
}
