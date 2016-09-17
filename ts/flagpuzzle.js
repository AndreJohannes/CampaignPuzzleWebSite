/// <reference path="tools/jquery.d.ts" />
/// <reference path="tools/GLRenderer.ts" />
$(document).ready(function () {
    var nx = 30, ny = 40;
    var $tooltip = $("#tooltip");
    var $puzzle = $("#puzzle");
    var $empty_piece = $("#empty_piece");
    var $visible_piece = $("#visible_piece");
    var $accordion = $("#accordion");
    var $name = $("#name");
    var $location = $("#location");
    var keys = [];
    for (var i = 0; i < 40; i++) {
        keys[i] = [];
    }
    var donors;
    $.getJSON("./json/donors.json", function (data) {
        for (var i in data) {
            donors = data;
        }
    });
    $accordion.accordion({
        active: false,
        collapsible: true
    });
    $("input").checkboxradio();
    $puzzle.mousemove(function (e) {
        var offset = $(this).parent().offset();
        var x = e.pageX - offset.left;
        var y = e.pageY - offset.top;
        var width = $(this).width();
        var height = $(this).height();
        var posX = Math.floor(nx * x / width);
        var posY = Math.floor(ny * y / height);
        $tooltip.css("top", e.pageY + 20);
        $tooltip.css("left", e.pageX + 10);
        var donor = donors[posX][posY];
        if (donor == null) {
            $visible_piece.hide();
            $empty_piece.show();
        }
        else {
            $name.text(donor.name);
            $location.text(donor.country);
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
        var renderer_1 = new GLRenderer();
        $.getJSON("./json/donors.json", function (data) {
            for (var i in data) {
                renderer_1.setTiles(data);
            }
        });
        $puzzle.css("background-color", "#ffffff");
        var $canvas = $(renderer_1.getDom());
        $puzzle.append($canvas);
        renderer_1.animate();
        renderer_1.resize($puzzle.width(), $puzzle.width() * 915 / 733);
        window.addEventListener('resize', function () {
            var width = $puzzle.width();
            $canvas.css("width", width);
            $canvas.css("height", width * 915 / 733);
            renderer_1.resize(width, width * 915 / 733);
            renderer_1.update();
        }, false);
        $puzzle.resizable({
            aspectRatio: 733 / 915,
            resize: function () {
                var width = $puzzle.width();
                $canvas.css("width", width);
                $canvas.css("height", width * 915 / 733);
                renderer_1.resize(width, width * 915 / 733);
                renderer_1.update();
            }
        });
        $('#checkbox').change(function () {
            if ($(this).is(':checked')) {
                renderer_1.setRad(0.05);
            }
            else {
                renderer_1.setRad(-0.05);
            }
        }).attr("checked", "");
    }
    else {
        $('#checkbox').change(function () {
            if ($(this).is(':checked')) {
                $("#puzzle").css("background-image", "url(./images/puzzle_back.png)");
            }
            else {
                $("#puzzle").css("background-image", "url(./images/puzzle.png)");
            }
        }).attr("checked", "");
    }
});
//# sourceMappingURL=flagpuzzle.js.map