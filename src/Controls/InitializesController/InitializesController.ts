import * as PIXI from 'pixi.js';
import InformerContainer from '../InformerContainer/InformerContainer'


interface IContainerOptions {
    width: number;
    height: number;
    positionX: number;
    positionY: number;
    texture: PIXI.Texture;
}


export default class InitializesController {
    /**
     * Инициализирующий модуль
     * Created by Nortren
     */

    private _activeContainer = null;

    public Init() {
        const optionsApplication = {
            width: 1280,
            height: 720,
        };

        this.app = new PIXI.Application(optionsApplication);
        document.body.appendChild(this.app.view);

        this._preparingDataDorUploading().load((loader, resources) => {

            this.rootContainerCenterX = this.app.renderer.width / 2;
            this.rootContainerCenterY = this.app.renderer.height / 2;

            this.canvasCenter = {centerX: this.rootContainerCenterX, centerY: this.rootContainerCenterY};

            this._activeContainer = this._createIntroContainer(this.rootContainerCenterX, this.rootContainerCenterY, resources);
            this.app.stage.addChild(this._activeContainer);
        });

    }


    /**
     * Метод создания списка победителей
     * @param rootContainerCenterX
     * @param rootContainerCenterY
     * @param resources
     * @returns {PIXI.Container}
     */
    private _createIntroContainer(rootContainerCenterX, rootContainerCenterY, resources): PIXI.Container {
        const introContainerTexture = {
            info_plate_big: resources.info_plate_big.texture,
            play_button: {
                active: resources.play_button_active.texture,
                hover: resources.play_button_hover.texture,
                off: resources.play_button_off.texture,
                press: resources.play_button_press.texture,
            },
            leadboard: {
                active: resources.leadboard_button_active.texture,
                hover: resources.leadboard_button_hover.texture,
                press: resources.leadboard_button_press.texture,
            },
            login_button: {
                active: resources.login_button_active.texture,
                hover: resources.login_button_hover.texture,
                press: resources.login_button_press.texture,
            },
            user_name_bar: resources.user_name_bar.texture,
            header_info_plate: resources.header_info_plate.texture,
        };

        /**
         * Функция переключения на контейнер с результатами игр
         */
        const showLeadBoardContainer = () => {
            this.app.stage.removeChild(this._activeContainer);
            this._activeContainer = this._createLeaderBoardsContainer(rootContainerCenterX, rootContainerCenterY, resources);
            this.app.stage.addChild(this._activeContainer);
        };

        /**
         * TODO временно для показа работы всех контейнеров
         * Функция отображения контейнера завершения игры
         */
        const finalContainer = () => {
            this.app.stage.removeChild(this._activeContainer);
            this._activeContainer = this._createFinalContainer(rootContainerCenterX, rootContainerCenterY, resources);
            this.app.stage.addChild(this._activeContainer);
        };

        const introContainerSettings = this._setContainerOptions(500, 610, rootContainerCenterX, rootContainerCenterY, introContainerTexture);
        const introContainer = new InformerContainer(introContainerSettings);

        introContainer.uploadAuxiliaryButton(215, 125, 640, 500, introContainerTexture.play_button);
        introContainer.uploadAuxiliaryButton(215, 125, 420, 500, introContainerTexture.leadboard, false, showLeadBoardContainer.bind(this));
        introContainer.uploadAuxiliaryButton(215, 125, 535, 260, introContainerTexture.login_button, false, finalContainer.bind(this));
        introContainer.uploadAuxiliaryUI(400, 70, 440, 400, introContainerTexture.user_name_bar);
        introContainer.createHeaderInfo('You Record:', introContainerTexture.header_info_plate);


        return introContainer.getContainer();
    }

    /**
     * Метод создания списка победителей
     * @param rootContainerCenterX
     * @param rootContainerCenterY
     * @param resources
     * @returns {PIXI.Container}
     */
    private _createFinalContainer(rootContainerCenterX, rootContainerCenterY, resources): PIXI.Container {
        const finalContainerTexture = {
            info_plate_big: resources.info_plate_big.texture,
            ok_button: {
                active: resources.ok_button_active.texture,
                hover: resources.ok_button_hover.texture,
                press: resources.ok_button_press.texture,
            },
            collect_coin_icon: resources.collect_coin_icon.texture,
            collect_distance_icon: resources.collect_distance_icon.texture,
            header_info_plate: resources.header_info_plate.texture,
            rays: resources.rays.texture,
            star: resources.star.texture,
        };

        /**
         * Функция переключения на контейнер с результатами игр
         */
        const showIntroContainer = () => {
            this.app.stage.removeChild(this._activeContainer);
            this.app.stage.removeChildren();
            this._activeContainer = this._createIntroContainer(rootContainerCenterX, rootContainerCenterY, resources);
            this.app.stage.addChild(this._activeContainer);
        };

        const finalContainerContainerSettings = this._setContainerOptions(500, 610, rootContainerCenterX, rootContainerCenterY, finalContainerTexture);
        const finalContainer = new InformerContainer(finalContainerContainerSettings);

        finalContainer.uploadAuxiliaryButton(145, 91, 565, 560, finalContainerTexture.ok_button, false, showIntroContainer.bind(this));
        finalContainer.createFinalResult(55, finalContainerTexture.collect_coin_icon, 150, finalContainerTexture.collect_distance_icon, 300);
        finalContainer.createHeaderInfo('You Score:', finalContainerTexture.header_info_plate);
        finalContainer.animationRayStart(finalContainerTexture,this.app,this.canvasCenter);

        return finalContainer.getContainer();
    }

    /**
     * Метод создания списка победителей
     * @param rootContainerCenterX
     * @param rootContainerCenterY
     * @param resources
     * @returns {PIXI.Container}
     */
    private _createLeaderBoardsContainer(rootContainerCenterX, rootContainerCenterY, resources): PIXI.Container {
        const leaderBoardsContainerTexture = {
            info_plate_big: resources.info_plate_big.texture,
            ok_button: {
                active: resources.ok_button_active.texture,
                hover: resources.ok_button_hover.texture,
                press: resources.ok_button_press.texture,
            },
            arrow_btn: {
                active: resources.arrow_btn_active.texture,
                hover: resources.arrow_btn_hover.texture,
                press: resources.arrow_btn_press.texture,
            },
            place_1: resources.place_1.texture,
            place_2: resources.place_2.texture,
            place_3: resources.place_3.texture,
            highleader_scores_plate: resources.highleader_scores_plate.texture,
            midleader_name_plate: resources.midleader_name_plate.texture,
            midleader_scores_plate: resources.midleader_scores_plate.texture,
            header_info_plate: resources.header_info_plate.texture,
        };
        /**
         * Функция переключения на контейнер с результатами игр
         */
        const showIntroContainer = () => {
            this.app.stage.removeChild(this._activeContainer);
            this._activeContainer = this._createIntroContainer(rootContainerCenterX, rootContainerCenterY, resources);
            this.app.stage.addChild(this._activeContainer);
        };
        const leaderBoardsContainerSettings = this._setContainerOptions(500, 610, rootContainerCenterX, rootContainerCenterY, leaderBoardsContainerTexture);
        const leaderBoards = new InformerContainer(leaderBoardsContainerSettings);

        leaderBoards.uploadAuxiliaryButton(145, 91, 565, 560, leaderBoardsContainerTexture.ok_button, false, showIntroContainer.bind(this));
        leaderBoards.dataSwitch(35, 45, leaderBoardsContainerTexture.arrow_btn, ['All Time', 'Week', 'Month']);

        leaderBoards.createLeaderBoardsResult(leaderBoardsContainerTexture);

        leaderBoards.createHeaderInfo('Leaderboard:', leaderBoardsContainerTexture.header_info_plate);

        return leaderBoards.getContainer();
    }

    /**
     * Метод загрузки переданных изображений
     * @param app
     * @returns {any}
     */
    private _preparingDataDorUploading(): PIXI.Loader {
        const DATA_SRC = [
            {name: 'bunny', path: 'assets/bunny.png'},
            {name: 'info_plate_big', path: 'assets/ui/info_plate_big.png'},
            {name: 'play_button_active', path: 'assets/ui/play_button_active.png'},
            {name: 'play_button_hover', path: 'assets/ui/play_button_hover.png'},
            {name: 'play_button_off', path: 'assets/ui/play_button_off.png'},
            {name: 'play_button_press', path: 'assets/ui/play_button_press.png'},
            {name: 'leadboard_button_active', path: 'assets/ui/leadboard_button_active.png'},
            {name: 'leadboard_button_hover', path: 'assets/ui/leadboard_button_hover.png'},
            {name: 'leadboard_button_press', path: 'assets/ui/leadboard_button_press.png'},
            {name: 'user_name_bar', path: 'assets/ui/user_name_bar.png'},
            {name: 'login_button_active', path: 'assets/ui/login_button_active.png'},
            {name: 'login_button_hover', path: 'assets/ui/login_button_hover.png'},
            {name: 'login_button_press', path: 'assets/ui/login_button_press.png'},
            {name: 'header_info_plate', path: 'assets/ui/header_info_plate.png'},
            {name: 'ok_button_active', path: 'assets/ui/ok_button_active.png'},
            {name: 'ok_button_hover', path: 'assets/ui/ok_button_hover.png'},
            {name: 'ok_button_press', path: 'assets/ui/ok_button_press.png'},
            {name: 'collect_coin_icon', path: 'assets/ui/collect_coin_icon.png'},
            {name: 'collect_distance_icon', path: 'assets/ui/collect_distance_icon.png'},
            {name: 'place_1', path: 'assets/ui/place_1.png'},
            {name: 'place_2', path: 'assets/ui/place_2.png'},
            {name: 'place_3', path: 'assets/ui/place_3.png'},
            {name: 'highleader_scores_plate', path: 'assets/ui/highleader_scores_plate.png'},
            {name: 'midleader_name_plate', path: 'assets/ui/midleader_name_plate.png'},
            {name: 'midleader_scores_plate', path: 'assets/ui/midleader_scores_plate.png'},
            {name: 'arrow_btn_active', path: 'assets/ui/arrow_btn_active.png'},
            {name: 'arrow_btn_hover', path: 'assets/ui/arrow_btn_hover.png'},
            {name: 'arrow_btn_press', path: 'assets/ui/arrow_btn_press.png'},
            {name: 'rays', path: 'assets/ui/rays.png'},
            {name: 'star', path: 'assets/ui/star.png'},
        ];
        let resultArray;
        DATA_SRC.forEach((item) => {
            resultArray = this.app.loader.add(item.name, item.path)
        });

        return resultArray
    }

    /**
     * Метод параметризации контейнера
     * создает объект опций с данными необходимыми для инициализации контейнера
     * @param width
     * @param height
     * @param positionX
     * @param positionY
     * @param mainTexture
     */
    private _setContainerOptions(width: number, height: number, positionX: number, positionY: number, mainTexture: PIXI.Texture): IContainerOptions {

        return {width, height, positionX, positionY, texture: mainTexture};

    }
}