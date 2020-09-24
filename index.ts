import pixi from 'pixi.js';

var width = window.innerWidth; //получаем ширину экрана
var height = window.innerHeight; // получаем высоту экрана
var app; //создаем глобальную переменную нашей игры
var colors = [0xFFFF0B, 0xFF700B, 0x4286f4, 0x4286f4, 0xf441e8, 0x8dff6d, 0x41ccc9, 0xe03375, 0x95e032, 0x77c687, 0x43ba5b, 0x0ea3ba]; //массив цветов, 0x вместо #

var model = {
    createCanvas: function() {
        app = new PIXI.Application(width, height); //создаем холст
        document.body.appendChild(app.view); //выводим его в тело страницы
    },
    drawCircle: function() {
        var rand = Math.floor(Math.random() * colors.length); //генерим рандомное число (в промежутке от 0 до количества цветов в массиве цветов)
        var radius = 50; //радиус круга
        var inAreaX = width - 100; //возможные координаты по оси X, которые может занимать круг, ширина страницы минус его диаметр
        var circleY = -50; //круг должен создаваться за пределами холста (чтобы глянуть, отрисовался ли круг, измените отрицательное значение на положительное)
        var circleX = Math.floor(Math.random()* inAreaX); //создаем круг в рандомном месте по оси X
        var circle = new PIXI.Graphics(); //создаем новый графический элемент
        circle.lineStyle(0); //начинаем рисовать
        circle.beginFill(colors[rand], 1); //задаем рандомный цвет
        circle.drawCircle(circleX, circleY, radius); //рисуем кружок, ведь он наш дружок
        circle.endFill(); //закончили отрисовку
        circle.interactive = true; //делаем круг интерактивным
        circle.buttonMode = true; //меняем курсор при наведении
        app.stage.addChild(circle); //выводим круг на холсте
        circle.on('pointerdown', controller.clearFigure); //добавляем возможность при клике на фигуру удалить её
    }
}
var view = {
    loadGame: function() {
        model.createCanvas();
        model.drawCircle();//отрисовываем кружок, пока один раз
    }
}


var controller = {
    clearFigure: function(){
        this.clear(); //удаляем фигуры по которой кликнули
    }
}

view.loadGame();
