/// <reference path="three.d.ts" />
/// <reference path="jquery.d.ts" />
/// <reference path="./tools/quads.ts" />
var Vector2 = THREE.Vector2;
var Render = (function () {
    function Render() {
        this.rad = 0;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(90, 768 / 1024, 1, 10000);
        this.camera.position.z = 1024 / 2;
        //let geometry = new THREE.PlaneGeometry(768,1024);//THREE.BoxGeometry( 200, 1024, 200 );
        //let material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } )
        var texture = THREE.ImageUtils.loadTexture("images/destination.png");
        texture.minFilter = THREE.NearestFilter;
        var material1 = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture, transparent: true, depthWrite: false });
        this.quads = new Quads(20, 30, 768, 1024);
        var geometry = this.quads.getGeometry();
        var mesh = new THREE.Mesh(geometry, material1);
        this.scene.add(mesh);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(768, 1024);
        $("#puzzle").append(this.renderer.domElement);
    }
    Render.prototype.animate = function () {
        //this.stats.begin();
        Render._animate(this)();
    };
    Render._animate = function (render) {
        return function () {
            requestAnimationFrame(Render._animate(render));
            //render.controls.update();
            //render.stats.update();
            render.render();
        };
    };
    Render.prototype.render = function () {
        this.rad += 0.2;
        for (var j = 0; j < 30; j++) {
            for (var i = 0; i < 20; i++) {
                var rad = Math.min(Math.PI, Math.max(0, this.rad - 0.2 * (i + 20 * j)));
                this.quads.flip(rad, i, j);
            }
        }
        this.renderer.render(this.scene, this.camera);
    };
    return Render;
}());
window.onload = function () {
    var renderer = new Render();
    renderer.animate();
    //renderer.render();
    window.render = renderer;
};
//# sourceMappingURL=flagpuzzle.js.map