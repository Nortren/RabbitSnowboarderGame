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

export default function LeaderBoardsContainer(options: IOptions): PIXI.Container {
    const loadTexture = options.texture;
    const container = new PIXI.Container();

    loadContainerTexture(container, options);



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
    uploadAuxiliaryButton(container, 35, 45, 470, 135, texturePack.arrow_btn, true);
    uploadAuxiliaryButton(container, 35, 45, 800, 135, texturePack.arrow_btn);
    uploadAuxiliaryUI(container, 333, 53, 407, 180, texturePack.place_1);
    uploadAuxiliaryUI(container, 333, 53, 407, 233, texturePack.place_2);
    uploadAuxiliaryUI(container, 333, 53, 407, 287, texturePack.place_3);
    uploadAuxiliaryUI(container, 120, 33, 753, 190, texturePack.highleader_scores_plate);
    uploadAuxiliaryUI(container, 120, 33, 753, 245, texturePack.highleader_scores_plate);
    uploadAuxiliaryUI(container, 120, 33, 753, 296, texturePack.highleader_scores_plate);

    createScoreList(container, texturePack, 7, 31);

    uploadAuxiliaryUI(container, 390, 60, 443, 60, texturePack.header_info_plate);
}

function createScoreList(container, texturePack, count, step) {
    for (let i = 0; i < count; i++) {
        uploadAuxiliaryUI(container, 280, 27, 460, 345 + step*i, texturePack.midleader_name_plate);
        uploadAuxiliaryUI(container, 110, 27, 760, 345 + step*i, texturePack.midleader_scores_plate);
    }

}

/**
 * Метод загрузки и параметризации различных элементов UI
 */
function uploadAuxiliaryButton(container: PIXI.Container, width: number, height: number, positionX: number, positionY: number, texture: object, mirror?: boolean): void {
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
        .on('pointerdown', onButtonDown.bind(elementUI, texture))
        .on('pointerup', onButtonUp.bind(elementUI, texture))
        .on('pointerupoutside', onButtonUp.bind(elementUI, texture))
        .on('pointerover', onButtonOver.bind(elementUI, texture))
        .on('pointerout', onButtonOut.bind(elementUI, texture));


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
