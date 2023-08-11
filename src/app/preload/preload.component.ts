import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Resources } from '../classes/Resources';

@Component({
  selector: 'app-preload',
  templateUrl: './preload.component.html',
  styleUrls: ['./preload.component.scss'],
})
export class PreloadComponent implements AfterViewInit {

  private canvasWrapper: any;
  private canvas: any;
  private ctx: any;
  private splashImage?: HTMLImageElement;
  private splashAudio?: HTMLAudioElement;
  private resources: any;
  private preloadInterval: any;

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    this._init();
  }

  private _init() {
    const _this = this;

    this.canvasWrapper = this.el.nativeElement.querySelector('.wrapper');
    this.canvas = this.el.nativeElement.querySelector('#canvas');
    this.ctx = this.canvas.getContext('2d');

    this.splashImage = new Image();
    // this.splashImage.src = 'images/splash.png';
    this.splashImage.src = '../assets/images/splash.png';
    this.splashImage.onload = function () {
      _this.ctx.drawImage(_this.splashImage, 0, 0, _this.canvasWrapper.clientWidth, _this.canvasWrapper.clientHeight);
    };

    this.splashAudio = new Audio('../assets/audio/splash.aac');
    this.splashAudio.play();

    // Assuming Resources is a global or imported class
    this.resources = new Resources();
    this.resources.addImage('character_sprite1_left', '../assets/images/character/character_sprite1_left.png');
    this.resources.addImage('character_sprite1_right', '../assets/images/character/character_sprite1_right.png');

    this.resources.addImage('Enemy-1-left', '../assets/images/character/Enemy-1-left.png');
    this.resources.addImage('Enemy-1-right', '../assets/images/character/Enemy-1-right.png');

    this.resources.addImage('hand_with_gun', '../assets/images/hand_with_gun.png');
    this.resources.addImage('hand_with_gun_left', '../assets/images/hand_with_gun_left.png');
    this.resources.addImage('enemy_gun', '../assets/images/enemy_gun.PNG');
    this.resources.addImage('enemy_gun_left', '../assets/images/enemy_gun_left.PNG');

    this.resources.addAudio('intro', '../assets/audio/intro.mp3');
    this.resources.addAudio('background_music', '../assets/audio/background_music.mp3');
    this.resources.addAudio('gun_shot', '../assets/audio/gun_shot.mp3');

    this.preloadInterval = setInterval(function () {
      // if(_this.resources.imageLoadedCount == Object.size(_this.resources.images)) {
      //     _this.splashAudio.pause();
      //     delete _this.splashAudio;
      //     clearInterval(_this.preloadInterval);
      //     new Game(_this.canvas, _this.resources);
      // }else{
      //     // console.log('here');
      // }
    }, 5000);


    // ... [rest of your code] ...

    // this.preloadInterval = setInterval(function() {
    //     if (_this.resources.imageLoadedCount === _this.resources.length) {
    //         // _this.splashAudio.pause();
    //         // delete _this.splashAudio;
    //         clearInterval(_this.preloadInterval);
    //         // new Game(_this.canvas, _this.resources);
    //     }
    // }, 5000);
  }
}

// You can also move the Object.size method to a utility class or file
// Object.size = function(obj) {
//   var size = 0, key;
//   for (key in obj) {
//     if (obj.hasOwnProperty(key)) size++;
//   }
//   return size;
// };

