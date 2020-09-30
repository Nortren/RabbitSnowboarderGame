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
    highleader_scores_plate?: PIXI.Texture;
    info_plate_big?: PIXI.Texture;
    texture?: PIXI.Texture;
}

interface IPlayerResult {
    name: string;
    score: number;
    color: number
}
interface IDropShadow{
    dropShadow: boolean;
    dropShadowAngle: number;
    dropShadowBlur: number;
    dropShadowColor: number;
}

interface IOptions {
    texture?: PIXI.Texture;
    width: number;
    height: number;
    positionX: number;
    positionY: number;
    animation?: IAnimation
}
interface IAnimation {
    scale: { startPositionRotation: number; endPositionRotation: number; animationSpeed: number };
    rotation: { animationSpeed: number };
    cyclicRotation: { startPositionRotation: number; endPositionRotation: number; animationSpeed: number };
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
    public createText(positionX, positionY, textValue: string, fontFamily: string | null, fontSize: number, fill: number, align?: string, fontWeight?: string | number, dropShadow?: IDropShadow): PIXI.Text {
        align = align ? align : 'center';
        fontFamily = fontFamily ? fontFamily : 'ZubiloBlack';
        let text = new PIXI.Text(textValue, {
            ...dropShadow,
            fontFamily,
            fontSize,
            fill,
            align,
            fontWeight,
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
        const dropShadow = {
            dropShadow: true,
            dropShadowAngle: 1,
            dropShadowBlur: 3,
            dropShadowColor: 0x003a6d
        };
        let switchText = this.createText(570, 135, textArray[countData], null, 40, 0xFF6801, 'center', 700,dropShadow);
        const selectDataPeriodPlus = () => {
            countData++;
            if (countData === textArray.length) {
                countData = 0;
            }
            switchText.text = textArray[countData];

        };

        const selectDataPeriodMinus = () => {
            countData--;
            if (countData < 0) {
                countData = textArray.length - 1;
            }
            switchText.text = textArray[countData];

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
        const dropShadow = {
            dropShadow: true,
            dropShadowAngle: 1,
            dropShadowBlur: 3,
            dropShadowColor: 0x003a6d
        };
        this.createText(550, 150, mainResult.toString(), null, 130, 0x00CC00, 'center', 700, dropShadow);
        this.uploadAuxiliaryUI(65, 60, 454, 287, coin);
        this.createText(580, 295, coinCount.toString(), null, 60, 0xF4AD25, 'center', 700, dropShadow);
        this.uploadAuxiliaryUI(80, 76, 443, 396, distance);
        this.createText(580, 405, `${distanceCount} m`, null, 60, 0x9AC6FF, 'center', 700, dropShadow);
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


    /**
     * Метод параметризации и запуска анимации рекорда
     */
    animationRayStart(texture: PIXI.Texture, app: PIXI.Aplication, center: object): void {
        this._animationRotation(texture.rays, app, {
            positionX: center.centerX,
            positionY: center.centerY,
            width: 10,
            height: 10,
            animation: {
                scale: {startPositionScale: 0.7, endPositionScale: 0.8, animationSpeed: 0.001},
                rotation: {animationSpeed: 0.01},
                cyclicRotation: false
            }
        });

        const arrayStarsParams = [
            {
                positionX: 300,
                positionY: 150,
                width: 100,
                height: 100,
                animation: {
                    scale: false,
                    rotation: false,
                    cyclicRotation: {startPositionRotation: 0, endPositionRotation: 0.6, animationSpeed: 0.005}
                }
            },
            {
                positionX: 280,
                positionY: 300,
                width: 60,
                height: 60,
                animation: {
                    scale: false,
                    rotation: false,
                    cyclicRotation: {startPositionRotation: 0, endPositionRotation: 0.4, animationSpeed: 0.005}
                }
            },
            {
                positionX: 240,
                positionY: 450,
                width: 140,
                height: 140,
                animation: {
                    scale: false,
                    rotation: false,
                    cyclicRotation: {startPositionRotation: 0, endPositionRotation: 0.5, animationSpeed: 0.005}
                }
            },
            {
                positionX: 310,
                positionY: 600,
                width: 100,
                height: 100,
                animation: {
                    scale: false,
                    rotation: false,
                    cyclicRotation: {startPositionRotation: 0, endPositionRotation: 0.7, animationSpeed: 0.005}
                }
            },
            {
                positionX: 980,
                positionY: 140,
                width: 100,
                height: 100,
                animation: {
                    scale: false,
                    rotation: false,
                    cyclicRotation: {startPositionRotation: 0, endPositionRotation: 0.6, animationSpeed: 0.005}
                }
            },
            {
                positionX: 1000,
                positionY: 290,
                width: 140,
                height: 140,
                animation: {
                    scale: false,
                    rotation: false,
                    cyclicRotation: {startPositionRotation: 0, endPositionRotation: 0.4, animationSpeed: 0.005}
                }
            },
            {
                positionX: 1000,
                positionY: 450,
                width: 90,
                height: 90,
                animation: {
                    scale: false,
                    rotation: false,
                    cyclicRotation: {startPositionRotation: 0, endPositionRotation: 0.5, animationSpeed: 0.005}
                }
            },
            {
                positionX: 980,
                positionY: 600,
                width: 100,
                height: 100,
                animation: {
                    scale: false,
                    rotation: false,
                    cyclicRotation: {startPositionRotation: 0, endPositionRotation: 0.7, animationSpeed: 0.005}
                }
            }
        ];

        arrayStarsParams.forEach((star) => {
            this._animationRotation(texture.star, app, {
                positionX: star.positionX,
                positionY: star.positionY,
                width: star.width,
                height: star.height,
                animation: star.animation
            });
        });
    }

    /**
     * Метод зупуска набора заданных анимаций
     * @param texture
     * @param app
     * @param options
     * @private
     */
    private _animationRotation(texture: PIXI.Texture, app: PIXI.Aplication, options: IOptions): void {
        const optionsAnimation = options.animation;
        const scaleAnimation = optionsAnimation.scale;
        const cyclicRotationAnimation = optionsAnimation.cyclicRotation;
        const rotationAnimation = optionsAnimation.rotation;
        const scaleSpeed = scaleAnimation.animationSpeed;
        const cyclicRotationSpeed = cyclicRotationAnimation.animationSpeed;
        const rotationSpeed = rotationAnimation.animationSpeed;

        let sprite = new PIXI.Sprite(texture);
        sprite.x = options.positionX;
        sprite.y = options.positionY;
        sprite.width = options.width;
        sprite.height = options.height;
        sprite.anchor.set(0.5);
        app.stage.addChild(sprite);


        let countScale = scaleAnimation.startPositionScale;
        let countCyclicRotation = cyclicRotationAnimation.startPositionRotation;
        let countRotation = 0;

        let stepAnimationScale = scaleAnimation ? scaleSpeed : 0;
        let stepAnimationRotation = rotationAnimation ? rotationSpeed : 0;
        let stepAnimationCyclicRotation = cyclicRotationAnimation ? cyclicRotationSpeed : 0;
        app.ticker.add(() => {

            if (scaleAnimation) {
                stepAnimationScale = this._changeState(scaleAnimation.startPositionScale,
                    scaleAnimation.endPositionScale,
                    scaleSpeed,
                    stepAnimationScale,
                    countScale);
                countScale += stepAnimationScale;
                sprite.scale.x = countScale;
                sprite.scale.y = countScale;
            }

            if (cyclicRotationAnimation) {
                stepAnimationCyclicRotation = this._changeState(cyclicRotationAnimation.startPositionRotation,
                    cyclicRotationAnimation.endPositionRotation,
                    cyclicRotationSpeed,
                    stepAnimationCyclicRotation,
                    countCyclicRotation);
                countCyclicRotation += stepAnimationCyclicRotation;
                sprite.rotation = countCyclicRotation;
            }

            if (rotationAnimation) {
                stepAnimationRotation = rotationSpeed;
                countRotation += stepAnimationRotation;
                sprite.rotation = countRotation;
            }
        });
    }

    /**
     *  Метод позволяющий циклично двигаться в заданном диапазоне значений
     * (от меньшего к большему и обратно с заданым шагом)
     * @param rangeFrom
     * @param rangeTo
     * @param animationSpeed
     * @param stepResult
     * @param count
     * @returns {number}
     * @private
     */
    private _changeState(rangeFrom: number, rangeTo: number, animationSpeed: number, stepResult: number, count): number {
        if (count > rangeTo) {
            stepResult = -animationSpeed;
        }
        if (count < rangeFrom) {
            stepResult = animationSpeed;
        }
        return stepResult;

    }
}

