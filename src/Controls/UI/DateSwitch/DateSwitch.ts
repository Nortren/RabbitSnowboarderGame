import * as PIXI from 'pixi.js';
/**
 * Компонент переключение даты (в текстовом формате)
 */
export default class DateSwitch{

    constructor(options){

    }

    public onButtonDown(): void {
        this.texture = this.texturePack.press;
    }

    public onButtonUp(): void {
        this.texture = this.texturePack.active;
    }

    public onButtonOver(): void {
        this.texture = this.texturePack.hover
    }

    public onButtonOut(): void {
        this.texture = this.texturePack.active
    }


}
