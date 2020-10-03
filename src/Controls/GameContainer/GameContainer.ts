import * as PIXI from 'pixi.js';


/**
 * Контейнер отображения статистики по прошедшим играм
 * Created by Nortren
 */

interface IOptions {
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

export default class GameContainer {
    private texture: PIXI.Texture;
    private _dynamicGameObject: PIXI.Sprite[] = [];
    private _gameIsRunning = true;
    public container: PIXI.Container = new PIXI.Container();

    constructor(options: IOptions) {
        this._startGameSession(this.container, options);
    }


    private _startGameSession(container: PIXI.Container, options: IOptions): void {
        const staticObject = options.texture.staticObject as ITexturePack;
        const dynamicObject = options.texture.dynamicObject as ITexturePack;
        this._playerAvatarData = options.texture.bunny as ITexturePack;


        this._createStaticObject(staticObject);

        this._createDynamicObject(dynamicObject);
        document.addEventListener('keydown', this._bunnyJump.bind(this));
        document.addEventListener('keyup', this._bunnyJump.bind(this));

        this.playerAvatar = this._createPlayerAvatar(this._playerAvatarData);
        this.playerJumped = false;
    }


    _bunnyJump() {
        this.playerJumped = event.type === 'keydown' ? true : false;
    }

    /**
     * Метод создания аватара игрока
     * @param objectData
     * @returns {PIXI.Sprite}
     * @private
     */
    private _createPlayerAvatar(objectData): PIXI.Sprite {
        const bunnyMove = objectData[0];
        const staticObject = new PIXI.Sprite(bunnyMove.texture);
        staticObject.width = bunnyMove.width;
        staticObject.height = bunnyMove.height;
        staticObject.x = bunnyMove.positionX;
        staticObject.y = bunnyMove.positionY;
        staticObject.rotation = bunnyMove.rotation ? bunnyMove.rotation : 0;
        this._addObjectToScene(staticObject);
        return staticObject;
    }

    /**
     * Метод создания статических объёктов сцены
     * @param objectData
     * @private
     */
    private _createStaticObject(objectData): void {
        const objectDataArray = [];
        objectData.forEach((item) => {
            const staticObject = new PIXI.Sprite(item.texture);
            staticObject.width = item.width;
            staticObject.height = item.height;
            staticObject.x = item.positionX;
            staticObject.y = item.positionY;
            staticObject.rotation = item.rotation ? item.rotation : 0;
            objectDataArray.push(staticObject);
            this._addObjectToScene(staticObject);
        });
        return objectDataArray;
    }

    /**
     * Метод создания динамических объектов
     * @param objectData
     * @private
     */
    private _createDynamicObject(objectData): void {

        objectData.forEach((item) => {
            const dynamicObject = new PIXI.Sprite(item.texture);
            dynamicObject.width = item.width + 10;
            dynamicObject.height = item.height;
            dynamicObject.x = item.positionX;
            dynamicObject.y = item.positionY + 41;
            dynamicObject.rotation = item.rotation ? item.rotation : 0;
            this._dynamicGameObject.push({
                sprite: dynamicObject,
                width: item.width,
                height: item.height,
                positionY: item.positionY,
                type: item.type
            });
            this._addObjectToScene(dynamicObject);
        });
    }

    /**
     * Метод запуска анимации на сцене
     * @param app
     */
    startMoveGameObject(app: PIXI.Aplication): void {
        const playerJumpHeight = 400;
        let playerLanded = true;
        let jumpCount = 0;
        const userAvatar = this.playerAvatar;
        const userData = this._playerAvatarData;
        app.ticker.add(() => {
            if (this._gameIsRunning) {
                this._dynamicGameObject.forEach((dynamicObject) => {
                    const sprite = dynamicObject.sprite;
                    const type = dynamicObject.type;
                    const appWidth = app.renderer.width ;
                    const appHeight = app.renderer.height ;


                    const positionY = dynamicObject.positionY;
                    if ((type === 'way') && (dynamicObject.width) <= Math.abs(sprite.x)) {
                        sprite.x = appWidth;
                        sprite.y = appHeight;
                    }
                    if ((type === 'pathElementCollider') && appWidth <= Math.abs(sprite.x)) {
                        sprite.x = appWidth+this._randomPositionGenerator(0,150);
                        sprite.y = positionY;
                    }
                    if ((type === 'pathElement') && appWidth <= Math.abs(sprite.x)) {
                        sprite.x = appWidth+this._randomPositionGenerator(0,150);
                        sprite.y = positionY+this._randomPositionGenerator(0,130);
                    }
                    if ((type === 'playerAvatar')) {
                        sprite.x = appWidth;
                        sprite.y = positionY;
                    }
                    sprite.x -= 10;
                    sprite.y -= 1;

                    if (type === 'pathElementCollider') {
                        let res = this._checkCollision(this.playerAvatar, sprite);
                        if (res) {
                            this._gameIsRunning = false;
                        }
                    }

                });


                if (this.playerJumped || !playerLanded) {

                    userAvatar.texture = this._playerAvatarData[1].texture;

                    if (jumpCount !== playerJumpHeight) {
                        jumpCount += 4;
                        userAvatar.y += 4;
                    } else {
                        jumpCount = 0;
                        playerLanded = true;
                        this.playerJumped = false;
                    }
                    if (this.playerJumped && playerLanded) {
                        playerLanded = false;
                        userAvatar.y = userAvatar.y - playerJumpHeight;
                    }

                } else {
                    userAvatar.texture = userData[0].texture;
                    userAvatar.y = userData[0].positionY;
                    playerLanded = true;
                }
            }
        });
    }

    private _randomPositionGenerator(min, max){
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    }

    /**
     * Метод проверки столкновения игрока с препятствиями
     * @param playerCollider
     * @param obstacleCollider
     * @returns {boolean}
     * @private
     */
    private _checkCollision(playerCollider, obstacleCollider): boolean {
        const bounds1 = playerCollider.getBounds();
        const bounds2 = obstacleCollider.getBounds();

        return bounds1.x < bounds2.x + bounds2.width
            && bounds1.x + bounds1.width > bounds2.x
            && bounds1.y < bounds2.y + bounds2.height
            && bounds1.y + bounds1.height > bounds2.y;
    }

    /**
     * Метод добавления объектов на сцену
     * @param gameObject
     * @private
     */
    private _addObjectToScene(gameObject: PIXI.Texture): void {
        this.container.addChild(gameObject);
    }

    /**
     * Метод получения контейнера с игрой
     * @returns {PIXI.Container}
     */
    public getGameContainer(): Pixi.Container {
        return this.container;
    }
}