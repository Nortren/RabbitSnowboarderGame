import * as PIXI from 'pixi.js';


/**
 * Контейнер отображения статистики по прошедшим играм
 * Created by Nortren
 */

interface ITexturePack {
    active?: PIXI.Texture;
    hover?: PIXI.Texture;
    press?: PIXI.Texture;
    off?: PIXI.Texture;
    midleader_scores_plate?: PIXI.Texture;
    midleader_name_plate?: PIXI.Texture;
    info_plate_big?: PIXI.Texture;
}

interface IOptions {
    texture: PIXI.Texture;
    width: number;
    height: number;
    positionX: number;
    positionY: number;
}
export default class InformerContainer {

    private texturePack: ITexturePack;
    private texture: PIXI.Texture;
    public container: PIXI.Container = new PIXI.Container();

    constructor(options: IOptions) {


        this._loadContainerTexture(this.container, options);
    }

    /**
     * Загрузка фоновой текстуры контейнера
     * @param container
     * @param texture
     */
    private _loadContainerTexture(container: PIXI.Container, options: IOptions): void {
        const texturePack = options.texture as ITexturePack;
        const info_plate_big = new PIXI.Sprite(texturePack.info_plate_big);
        info_plate_big.width = options.width;
        info_plate_big.height = options.height;
        info_plate_big.x = options.positionX - options.width / 2;
        info_plate_big.y = options.positionY - options.height / 2;
        this.container.addChild(info_plate_big);
    }

    /**
     * Метод создания списка из UI элементов
     * @param texturePack
     * @param count количество элементов
     * @param step шаг по Y между элементами
     */
    public createScoreList(texturePack: ITexturePack, count: number, step: number): void {
        for (let i = 0; i < count; i++) {
            this.uploadAuxiliaryUI(280, 27, 460, 345 + step * i, texturePack.midleader_name_plate);
            this.uploadAuxiliaryUI(110, 27, 760, 345 + step * i, texturePack.midleader_scores_plate);
            this.createText(430, 345 + step * i, `${i + 4}`, 'Arial', 24, 0xffffff, 'right', 700);
        }

    }

    /**
     * Метод загрузки и параметризации различных элементов UI
     */
    public uploadAuxiliaryButton(width: number, height: number, positionX: number,
                                 positionY: number, texture: ITexturePack, mirror?: boolean, click?: object): void {
        const elementUI = new PIXI.Sprite(texture.active);
        elementUI.x = positionX;
        elementUI.y = positionY;
        elementUI.scale.x = mirror ? -1 : 1;
        elementUI.width = width;
        elementUI.height = height;
        this.container.addChild(elementUI);


        elementUI.interactive = true;
        elementUI.buttonMode = true;
        elementUI.texturePack = texture;
        elementUI.click = click;

        elementUI
            .on('pointerdown', this.onButtonDown.bind(elementUI, texture, click))
            .on('pointerup', this.onButtonUp.bind(elementUI, texture))
            .on('pointerupoutside', this.onButtonUp.bind(elementUI, texture))
            .on('pointerover', this.onButtonOver.bind(elementUI, texture))
            .on('pointerout', this.onButtonOut.bind(elementUI, texture));


    }

    /**
     * МЕтод создания текстовых данных
     */
    public createText(positionX, positionY, text: string, fontFamily: string, fontSize: number, fill: number, align?: string, fontWeight?: string | number): void {
        const align = align ? align : 'center';
        let text = new PIXI.Text(text, {
            fontFamily,
            fontSize,
            fill,
            align,
            fontWeight
        });
        text.x = positionX;
        text.y = positionY;
        this.container.addChild(text);
        return text;
    }

    /**
     * Метод создания компонента переключения временного отрезка
     * @param width
     * @param height
     * @param texture
     * @param textArray
     */
    public dataSwitch(width: number, height: number, texture: ITexturePack, textArray: string[]) {
        let countData = 0;
        let switcjText = this.createText(570, 135, textArray[countData], 'Arial', 40, 0xFF6801, 'center', 700);
        const selectDataPeriodPlus = () => {
            countData++;
            if(countData === textArray.length){
                countData = 0;
            }
            switcjText.text = textArray[countData];

        };

        const selectDataPeriodMinus= () => {
            countData--;
            if(countData < 0){
                countData = textArray.length -1;
            }
            switcjText.text = textArray[countData];

        };

        this.uploadAuxiliaryButton(width, height, 470, 135, texture, true, selectDataPeriodMinus);
        this.uploadAuxiliaryButton(width, height, 800, 135, texture, false, selectDataPeriodPlus);
    }

    /**
     * Метод загрузки и параметризации различных элементов UI
     */
    public uploadAuxiliaryUI(width: number, height: number, positionX: number, positionY: number, texture: PIXI.Texture): void {
        const elementUI = new PIXI.Sprite(texture);
        elementUI.width = width;
        elementUI.height = height;
        elementUI.x = positionX;
        elementUI.y = positionY;
        this.container.addChild(elementUI);

        elementUI.interactive = true;
        elementUI.buttonMode = true;

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


    public getContainer() {
        return this.container;
    }
}