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
    texture?: PIXI.Texture;
}

interface IPlayerResult {
    name: string;
    score: number;
    color: number
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
     * @param options
     * @private
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
            this.createText(430, 345 + step * i, `${i + 4}`, null, 24, 0xffffff, 'right', 700);
            this.createText(470, 345 + step * i, `testName_${i}`, null, 23, 0x343434, 'center', 700);
            this.createText(790, 345 + step * i, '100', null, 23, 0x343434, 'center', 700);
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
     * Метод создания текстовых данных
     */
    public createText(positionX, positionY, textValue: string, fontFamily: string | null, fontSize: number, fill: number, align?: string, fontWeight?: string | number): PIXI.Text {
        align = align ? align : 'center';
        fontFamily = fontFamily ? fontFamily : 'ZubiloBlack';
        let text = new PIXI.Text(textValue, {
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
    public dataSwitch(width: number, height: number, texture: ITexturePack, textArray: string[]): void {
        let countData = 0;
        let switcjText = this.createText(570, 135, textArray[countData], null, 40, 0xFF6801, 'center', 700);
        const selectDataPeriodPlus = () => {
            countData++;
            if (countData === textArray.length) {
                countData = 0;
            }
            switcjText.text = textArray[countData];

        };

        const selectDataPeriodMinus = () => {
            countData--;
            if (countData < 0) {
                countData = textArray.length - 1;
            }
            switcjText.text = textArray[countData];

        };

        this.uploadAuxiliaryButton(width, height, 470, 135, texture, true, selectDataPeriodMinus);
        this.uploadAuxiliaryButton(width, height, 800, 135, texture, false, selectDataPeriodPlus);
    }

    /**
     * Метод создания заголовка
     */
    public createHeaderInfo(headerText: string, headerTexture: PIXI.Texture): void {
        this.uploadAuxiliaryUI(390, 60, 443, 60, headerTexture);
        this.createText(520, 65, headerText, null, 40, 0x003D71, 'center', 700);
    }

    /**
     * Метод создания данных по финальному результату заезда
     * @param coin
     * @param coinCount
     * @param distance
     * @param distanceCount
     */
    public createFinalResult(mainResult: number, coin: PIXI.Texture, coinCount: number, distance: PIXI.Texture, distanceCount: number): void {
        this.createText(550, 150, mainResult.toString(), null, 90, 0x00CC00, 'center', 700);
        this.uploadAuxiliaryUI(65, 60, 454, 287, coin);
        this.createText(580, 295, coinCount.toString(), null, 60, 0xF4AD25, 'center', 700);
        this.uploadAuxiliaryUI(80, 76, 443, 396, distance);
        this.createText(580, 405, `${distanceCount} m`, null, 60, 0x9AC6FF, 'center', 700);
    }

    public createLeaderBoardsResult(leaderBoardsContainerTexture: ITexturePack): void {

        this._createTopThree(leaderBoardsContainerTexture.place_1, leaderBoardsContainerTexture.highleader_scores_plate,
            180, 190, {name: 'Guest_1', score: 483, color: 0xC26102});
        this._createTopThree(leaderBoardsContainerTexture.place_2, leaderBoardsContainerTexture.highleader_scores_plate,
            233, 245, {name: 'Guest_2', score: 125, color: 0x215DB0});
        this._createTopThree(leaderBoardsContainerTexture.place_3, leaderBoardsContainerTexture.highleader_scores_plate,
            287, 296, {name: 'Guest_3', score: 700, color: 0x8B1B01});

        this.createScoreList(leaderBoardsContainerTexture, 7, 31);
    }

    /**
     * Метод создания результатов по ТОП-3 игроков
     * @param placeTexture
     * @param scorePlate
     * @param positionYPlace
     * @param positionYScore
     * @private
     */
    private _createTopThree(placeTexture: PIXI.Texture, scorePlate: PIXI.Texture, positionYPlace: number, positionYScore: number, playerResult: IPlayerResult): void {
        this.uploadAuxiliaryUI(333, 53, 407, positionYPlace, placeTexture);
        this.uploadAuxiliaryUI(120, 33, 753, positionYScore, scorePlate);
        this.createText(460, positionYPlace + 10, playerResult.name, null, 25, playerResult.color, 'center', 700);
        this.createText(790, positionYScore, playerResult.score.toString(), null, 25, playerResult.color, 'center', 700);
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
