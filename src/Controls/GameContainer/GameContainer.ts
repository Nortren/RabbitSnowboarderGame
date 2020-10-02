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
    private texturePack: ITexturePack;
    private texture: PIXI.Texture;
    public container: PIXI.Container = new PIXI.Container();

    constructor(options: IOptions) {
        this._startGameSession(this.container, options);
    }


    private _startGameSession(container: PIXI.Container, options: IOptions): void {
        const texturePack = options.texture as ITexturePack;
        const staticObject = options.texture.staticObject as ITexturePack;
        /*     const info_plate_big = new PIXI.Sprite(texturePack.staticObject.street.texture);
         info_plate_big.width = options.width;
         info_plate_big.height = options.height;
         info_plate_big.x = options.positionX - options.width / 2;
         info_plate_big.y = options.positionY - options.height / 2;*/

        // this.container.addChild(info_plate_big);
        this._createStaticObject(staticObject);
        // this._addObjectToScene(info_plate_big);
    }


    private _createStaticObject(objectData) {

        const staticObjectArray = [];

        objectData.forEach((item) => {
            const staticObject = new PIXI.Sprite(item.texture);
            staticObject.width = item.width;
            staticObject.height = item.height;
            staticObject.x = item.positionX ;
            staticObject.y = item.positionY;
            staticObject.rotation = item.rotation ? item.rotation : 0;
            this._addObjectToScene(staticObject);
            // staticObjectArray.push(staticObject);
        });

        return staticObjectArray;

    }

    private _addObjectToScene(gameObject: PIXI.Texture) {

        this.container.addChild(gameObject);
    }


    public getGameContainer() {

        return this.container;
    }
}