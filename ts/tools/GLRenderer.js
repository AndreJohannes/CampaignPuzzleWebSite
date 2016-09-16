/// <reference path="./three.d.ts" />
/// <reference path="./quads.ts" />
var GLRenderer = (function () {
    function GLRenderer() {
        this.rad = 0.0;
        this.dRad = -0.05;
        this.state = false;
        var that = this;
        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(-733 / 2, 733 / 2, 915 / 2, -915 / 2); //THREE.PerspectiveCamera(90, 768 / 1024, 1, 10000);
        this.camera.position.z = 1024 / 2;
        //var  geometry:THREE.Geometry = new THREE.PlaneGeometry(768,1024);//THREE.BoxGeometry( 200, 1024, 200 );
        //var  material = new THREE.MeshBasicMaterial( { color: 0xFFFFFF });
        //var mesh = new THREE.Mesh(geometry, material);
        //this.scene.add(mesh);
        var texloader = new THREE.TextureLoader();
        var texture = texloader.load("images/template.png");
        texture.minFilter = THREE.NearestFilter;
        var material1 = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            map: texture,
            transparent: true,
            depthWrite: false
        });
        this.quads = new Quads(30, 40, 733, 915);
        var geometry = this.quads.getGeometry();
        var mesh = new THREE.Mesh(geometry, material1);
        this.scene.add(mesh);
        this.renderer = new THREE.WebGLRenderer({ alpha: false });
        //this.renderer.setClearColor(0xffffff, 0)
        this.renderer.setSize(733, 915);
        GLRenderer.heartbeat(this)();
    }
    GLRenderer.prototype.getDom = function () {
        return this.renderer.domElement;
    };
    GLRenderer.prototype.resize = function (x, y) {
        this.renderer.setSize(x, y);
    };
    GLRenderer.prototype.animate = function () {
        GLRenderer._animate(this)();
    };
    GLRenderer.prototype.setRad = function (value) {
        this.dRad = value;
    };
    GLRenderer._animate = function (render) {
        return function () {
            requestAnimationFrame(GLRenderer._animate(render));
            render.render();
        };
    };
    GLRenderer.heartbeat = function (renderer) {
        return function () {
            setTimeout(GLRenderer.heartbeat(renderer), 2000);
            if (renderer.renderer != null) {
                renderer.renderer.render(renderer.scene, renderer.camera);
            }
        };
    };
    GLRenderer.prototype.render = function () {
        var rad = Math.min(Math.max(0, this.rad + this.dRad), Math.PI + 0.2 * 30);
        if (rad != this.rad) {
            this.rad = rad;
            for (var j = 0; j < 40; j++) {
                for (var i = 0; i < 30; i++) {
                    var rad = Math.min(Math.PI, Math.max(0, this.rad - 0.2 * (i)));
                    this.quads.flip(rad, i, j);
                }
            }
            this.renderer.render(this.scene, this.camera);
        }
    };
    GLRenderer.webgl_support = function () {
        var retValue = false;
        try {
            var canvas = document.createElement("canvas");
            retValue = !!window["WebGLRenderingContext"] != null &&
                (canvas.getContext("webgl") != null ||
                    canvas.getContext("experimental-webgl")) != null;
        }
        catch (e) {
            return false;
        }
        return retValue;
    };
    return GLRenderer;
}());
//# sourceMappingURL=GLRenderer.js.map