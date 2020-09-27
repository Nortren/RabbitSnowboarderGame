import * as PIXI from 'pixi.js';


/**
 * Контейнер отображения статичтики пройденого уровня после завершения игры
 * Created by Nortren
 */

interface IOptions {
    texture: PIXI.Texture;
    width: number;
    height: number;
    positionX: number;
    positionY: number;
}

export default function FinalContainer(options: IOptions): PIXI.Container {
    const loadTexture = options.texture;
    const container = new PIXI.Container();

    loadContainerTexture(container, options);

    let redRect = new PIXI.Graphics();
    redRect.beginFill(663399);
    redRect.drawRect(250, 100, 800, 400);


    return container;
}

/**
 * Загрузка фоновой текстуры контейнера
 * @param container
 * @param texture
 */
function loadContainerTexture(container: PIXI.Container, options: IOptions): void {
    const texturePack = options.texture;
    const info_plate_big = new PIXI.Sprite(texturePack.info_plate_big);
    info_plate_big.width = options.width;
    info_plate_big.height = options.height;
    info_plate_big.x = options.positionX - options.width / 2;
    info_plate_big.y = options.positionY - options.height / 2;
    container.addChild(info_plate_big);


    uploadAuxiliaryButton(container, 145, 91, 565, 560, texturePack.ok_button);
    uploadAuxiliaryUI(container, 65, 60, 454, 287, texturePack.collect_coin_icon);
    uploadAuxiliaryUI(container, 80, 76, 443, 396, texturePack.collect_distance_icon);
    uploadAuxiliaryUI(container, 390, 60, 443, 60, texturePack.header_info_plate);
}

/**
 * Метод загрузки и параметризации различных элементов UI
 */
function uploadAuxiliaryButton(container: PIXI.Container, width: number, height: number, positionX: number, positionY: number, texture: object): void {
    const elementUI = new PIXI.Sprite(texture.active);
    elementUI.width = width;
    elementUI.height = height;
    elementUI.x = positionX;
    elementUI.y = positionY;
    container.addChild(elementUI);

    elementUI.interactive = true;
    elementUI.buttonMode = true;
    elementUI.texturePack = texture;

    elementUI
        .on('pointerdown', onButtonDown.bind(elementUI,texture))
        .on('pointerup', onButtonUp.bind(elementUI,texture))
        .on('pointerupoutside', onButtonUp.bind(elementUI,texture))
        .on('pointerover', onButtonOver.bind(elementUI,texture))
        .on('pointerout', onButtonOut.bind(elementUI,texture));


}

/**
 * Метод загрузки и параметризации различных элементов UI
 */
function uploadAuxiliaryUI(container: PIXI.Container, width: number, height: number, positionX: number, positionY: number, texture: PIXI.Texture): void {
    const elementUI = new PIXI.Sprite(texture);
    elementUI.width = width;
    elementUI.height = height;
    elementUI.x = positionX;
    elementUI.y = positionY;
    container.addChild(elementUI);

    elementUI.interactive = true;
    elementUI.buttonMode = true;

}
function onButtonDown() {
    this.texture = this.texturePack.press;
}
function onButtonUp() {
    this.texture = this.texturePack.active;
}
function onButtonOver() {
    this.texture = this.texturePack.hover
}
function onButtonOut() {
    this.texture = this.texturePack.active
}
