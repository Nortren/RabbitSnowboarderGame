import * as PIXI from 'pixi.js';


/**
 * Контейнер отображения статистики по прошедшим играм
 * Created by Nortren
 */

interface IOptions {
    texture: PIXI.Texture;
    width: number;
    height: number;
    positionX: number;
    positionY: number;
}
export default class InformerContainer {

    public container:PIXI.Container = new PIXI.Container();
    constructor(options: IOptions) {


        this.loadContainerTexture(this.container, options);
    }

    /**
     * Загрузка фоновой текстуры контейнера
     * @param container
     * @param texture
     */
    loadContainerTexture(container: PIXI.Container, options: IOptions): void {
        const texturePack = options.texture;
        const info_plate_big = new PIXI.Sprite(texturePack.info_plate_big);
        info_plate_big.width = options.width;
        info_plate_big.height = options.height;
        info_plate_big.x = options.positionX - options.width / 2;
        info_plate_big.y = options.positionY - options.height / 2;
        container.addChild(info_plate_big);


        this.uploadAuxiliaryButton(container, 145, 91, 565, 560, texturePack.ok_button);
        this.uploadAuxiliaryButton(container, 35, 45, 470, 135, texturePack.arrow_btn, true);
        this.uploadAuxiliaryButton(container, 35, 45, 800, 135, texturePack.arrow_btn);
        this.uploadAuxiliaryUI(container, 333, 53, 407, 180, texturePack.place_1);
        this.uploadAuxiliaryUI(container, 333, 53, 407, 233, texturePack.place_2);
        this.uploadAuxiliaryUI(container, 333, 53, 407, 287, texturePack.place_3);
        this.uploadAuxiliaryUI(container, 120, 33, 753, 190, texturePack.highleader_scores_plate);
        this.uploadAuxiliaryUI(container, 120, 33, 753, 245, texturePack.highleader_scores_plate);
        this.uploadAuxiliaryUI(container, 120, 33, 753, 296, texturePack.highleader_scores_plate);

        this.createScoreList(container, texturePack, 7, 31);

        this.uploadAuxiliaryUI(container, 390, 60, 443, 60, texturePack.header_info_plate);
    }

    createScoreList(container, texturePack, count, step) {
        for (let i = 0; i < count; i++) {
            this.uploadAuxiliaryUI(container, 280, 27, 460, 345 + step * i, texturePack.midleader_name_plate);
            this.uploadAuxiliaryUI(container, 110, 27, 760, 345 + step * i, texturePack.midleader_scores_plate);
        }

    }

    /**
     * Метод загрузки и параметризации различных элементов UI
     */
    uploadAuxiliaryButton(container: PIXI.Container, width: number, height: number, positionX: number, positionY: number, texture: object, mirror?: boolean): void {
        const elementUI = new PIXI.Sprite(texture.active);
        elementUI.x = positionX;
        elementUI.y = positionY;
        elementUI.scale.x = mirror ? -1 : 1;
        elementUI.width = width;
        elementUI.height = height;
        container.addChild(elementUI);


        elementUI.interactive = true;
        elementUI.buttonMode = true;
        elementUI.texturePack = texture;

        elementUI
            .on('pointerdown', this.onButtonDown.bind(elementUI, texture))
            .on('pointerup', this.onButtonUp.bind(elementUI, texture))
            .on('pointerupoutside', this.onButtonUp.bind(elementUI, texture))
            .on('pointerover', this.onButtonOver.bind(elementUI, texture))
            .on('pointerout', this.onButtonOut.bind(elementUI, texture));


    }

    /**
     * Метод загрузки и параметризации различных элементов UI
     */
    uploadAuxiliaryUI(container: PIXI.Container, width: number, height: number, positionX: number, positionY: number, texture: PIXI.Texture): void {
        const elementUI = new PIXI.Sprite(texture);
        elementUI.width = width;
        elementUI.height = height;
        elementUI.x = positionX;
        elementUI.y = positionY;
        container.addChild(elementUI);

        elementUI.interactive = true;
        elementUI.buttonMode = true;

    }

    onButtonDown() {
        this.texture = this.texturePack.press;
    }

    onButtonUp() {
        this.texture = this.texturePack.active;
    }

    onButtonOver() {
        this.texture = this.texturePack.hover
    }

    onButtonOut() {
        this.texture = this.texturePack.active
    }


    getContainer(){
        return this.container;
    }
}