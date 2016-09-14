$(document).ready(function () {

    var nx=20, ny=20;

    var $tooltip = $("#tooltip");
    var $puzzle = $("#puzzle");
    var $grid = $("#grid");
    var $empty_piece = $("#empty_piece");
    var $visible_piece = $("#visible_piece");

    var keys = [];
    for (i = 0; i < 40; i++) {
        keys[i] = []
    }
    var index = 200
    $.getJSON("./json/keys.json", function (data) {
        for (i in data) {
            keys[data[i][0]][data[i][1]] = parseInt(i) + 1;
        }
    });

    $puzzle.mousemove(function (e) {
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        var posX = Math.floor(nx * x / 768);
        var posY = Math.floor(ny * y / 1024);
        $tooltip.css("top",e.pageY+20);
        $tooltip.css("left",e.pageX+10);
        var p_index = keys[posX][posY];
        if(p_index>index){
            $visible_piece.hide();
            $empty_piece.show()
        }else{
            $empty_piece.hide();
            $visible_piece.show();
        }
        $puzzle.attr("tooltip", text);
    });
    $puzzle.mouseenter(function(e){
        //$grid.show();
        $tooltip.show();
    });
    $puzzle.mouseleave(function(e){
        //$grid.hide();
        $tooltip.hide();
    });
    $puzzle.dblclick(function(e){
        window.location.href = "https://www.globalgiving.org/projects/empower-native-women-mexico/";
    })

});


