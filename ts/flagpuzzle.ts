/// <reference path="tools/jquery.d.ts" />
/// <reference path="tools/GLRenderer.ts" />


$(document).ready(function () {

    var nx = 20, ny = 20;

    var $tooltip = $("#tooltip");
    var $puzzle = $("#puzzle");
    var $grid = $("#grid");
    var $empty_piece = $("#empty_piece");
    var $visible_piece = $("#visible_piece");
    var $accordion = $("#accordion");

    var keys = [];
    for (var i = 0; i < 40; i++) {
        keys[i] = []
    }
    var index = 200
    $.getJSON("./json/keys.json", function (data) {
        for (var i in data) {
            keys[data[i][0]][data[i][1]] = parseInt(i) + 1;
        }
    });

    $accordion.accordion({
        collapsible: true
    });

    $("input").checkboxradio();

    $puzzle.mousemove(function (e) {
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        var posX = Math.floor(nx * x / 768);
        var posY = Math.floor(ny * y / 1024);
        $tooltip.css("top", e.pageY + 20);
        $tooltip.css("left", e.pageX + 10);
        var p_index = keys[posX][posY];
        if (p_index > index) {
            $visible_piece.hide();
            $empty_piece.show()
        } else {
            $empty_piece.hide();
            $visible_piece.show();
        }
        //$puzzle.attr("tooltip", text);
    });
    $puzzle.mouseenter(function (e) {
        //$grid.show();
        $tooltip.show();
    });
    $puzzle.mouseleave(function (e) {
        //$grid.hide();
        $tooltip.hide();
    });
    $puzzle.dblclick(function (e) {
        window.location.href = "https://www.globalgiving.org/projects/empower-native-women-mexico/";
    });


    if (GLRenderer.webgl_support()) {
        let renderer = new GLRenderer();
        $("#puzzle").css("background-color","#ffffff");
        $("#puzzle").append(renderer.getDom());
        GLRenderer.initiate(renderer)();
        renderer.animate();
        $('#checkbox').change(function () {
            if ($(this).is(':checked')) {
                renderer.setRad(0.05);
            } else {
                renderer.setRad(-0.05);
            }
        }).attr("checked", "");
    } else {
        $('#checkbox').change(function () {
            if ($(this).is(':checked')) {
                $("#puzzle").css("background-image", "url(./images/puzzle_back.png)");
            } else {
                $("#puzzle").css("background-image", "url(./images/puzzle.png)");
            }
        }).attr("checked", "");
    }
}
