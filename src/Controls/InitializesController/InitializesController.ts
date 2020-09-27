import * as PIXI from 'pixi.js';
import IntroContainer from '../IntroContainer/IntroContainer'
import FinalContainer from '../FinalContainer/FinalContainer'
import LeaderBoardsContainer from '../LeaderBoardsContainer/LeaderBoardsContainer'
import InformerContainer from '../InformerContainer/InformerContainer'


interface IContainerOptions {
    width: number;
    height: number;
    positionX: number;
    positionY: number;
    texture: PIXI.Texture;
}

/**
 * Инициализирующий модуль
 * Created by Nortren
 */
export default function Init() {
    const optionsApplication = {
        width: 1280,
        height: 720,
    };

    const app = new PIXI.Application(optionsApplication);
    document.body.appendChild(app.view);

    preparingDataDorUploading(app).load((loader, resources) => {

        const rootContainerCenterX = app.renderer.width / 2;
        const rootContainerCenterY = app.renderer.height / 2;
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
        };

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



        /*    const introContainerOptions = setContainerOptions(500, 610, rootContainerCenterX, rootContainerCenterY, introContainerTexture);
            app.stage.addChild(IntroContainer(introContainerOptions));*/

       /* const finalContainer = setContainerOptions(500, 610, rootContainerCenterX, rootContainerCenterY, finalContainerTexture);
        app.stage.addChild(FinalContainer(finalContainer)); */

     /*   const leaderBoardsContainer = setContainerOptions(500, 610, rootContainerCenterX, rootContainerCenterY, leaderBoardsContainerTexture);
        const testContainer = LeaderBoardsContainer(leaderBoardsContainer)
        app.stage.addChild(testContainer);*/

        const leaderBoardsContainer = setContainerOptions(500, 610, rootContainerCenterX, rootContainerCenterY, leaderBoardsContainerTexture);
        const informerContainer = new InformerContainer(leaderBoardsContainer).getContainer();
        app.stage.addChild(informerContainer);

        // This creates a texture from a 'bunny.png' image
        const bunny = new PIXI.Sprite(resources.bunny.texture);

// Setup the position of the bunny
        bunny.x = 1230;
        bunny.y = 30;

// Rotate around the center
        bunny.anchor.x = 0.1;
        bunny.anchor.y = 0.5;

// Add the bunny to the scene we are building
        app.stage.addChild(bunny);

// Listen for frame updates
        app.ticker.add(() => {
            // each frame we spin the bunny around a bit
            bunny.rotation += 0.1;
        });
    });

}

/**
 * Метод загрузки переданных изображений
 * @param app
 * @returns {any}
 */
function preparingDataDorUploading(app) {
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
    ];
    let resultArray;
    DATA_SRC.forEach((item) => {
        resultArray = app.loader.add(item.name, item.path)
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
function setContainerOptions(width: number, height: number, positionX: number, positionY: number, mainTexture: PIXI.Texture): IContainerOptions {

    return {width, height, positionX, positionY, texture: mainTexture};

}