/// <reference path="./three.d.ts" />
/// <reference path="./quads.ts" />

class GLRenderer {

    private scene: THREE.Scene;
    private camera: THREE.Camera;
    private renderer: THREE.Renderer;
    private quads: Quads;

    private rad = 0.0;
    private dRad = -0.05;

    private state = false;

    constructor() {

        var that = this;
        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(-768 / 2, 768 / 2, 1024 / 2, -1024 / 2)//THREE.PerspectiveCamera(90, 768 / 1024, 1, 10000);
        this.camera.position.z = 1024 / 2;

        //var  geometry:THREE.Geometry = new THREE.PlaneGeometry(768,1024);//THREE.BoxGeometry( 200, 1024, 200 );
        //var  material = new THREE.MeshBasicMaterial( { color: 0xFFFFFF });
        //var mesh = new THREE.Mesh(geometry, material);
        //this.scene.add(mesh);

        var texloader = new THREE.TextureLoader();
        var texture = texloader.load("images/template.png");
        texture.minFilter = THREE.NearestFilter;
        let material1 = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            map: texture,
            transparent: true,
            depthWrite: false
        });
        this.quads = new Quads(20, 30, 768, 1024);
        var geometry: THREE.Geometry = this.quads.getGeometry();
        var mesh = new THREE.Mesh(geometry, material1);
        this.scene.add(mesh);

        this.renderer = new THREE.WebGLRenderer({alpha: false});
        //this.renderer.setClearColor(0xffffff, 0)
        this.renderer.setSize(768, 1024);

        GLRenderer.heartbeat(this)();

    }

    public getDom() {
        return this.renderer.domElement;
    }

    public animate() {
        GLRenderer._animate(this)();
    }

    public setRad(value) {
        this.dRad = value;
    }

    private static _animate(render: GLRenderer) {
        return function () {
            requestAnimationFrame(GLRenderer._animate(render));
            render.render();
        }
    }


    private static heartbeat(renderer: GLRenderer) {
        return function () {
            setTimeout(GLRenderer.heartbeat(renderer), 2000);
            if (renderer.renderer != null) {
                renderer.renderer.render(renderer.scene, renderer.camera);
            }
        }
    }

    private render() {
        var rad = Math.min(Math.max(0, this.rad + this.dRad), Math.PI + 0.2 * 20);
        if (rad != this.rad) {
            this.rad = rad;
            for (var j = 0; j < 30; j++) {
                for (var i = 0; i < 20; i++) {
                    var rad = Math.min(Math.PI, Math.max(0, this.rad - 0.2 * (i)))
                    this.quads.flip(rad, i, j);
                }
            }
            this.renderer.render(this.scene, this.camera);

        }

    }

    public static webgl_support() {
        var retValue: Boolean = false;
        try {
            var canvas = document.createElement("canvas");
            retValue = !!window["WebGLRenderingContext"] != null &&
                (canvas.getContext("webgl") != null ||
                canvas.getContext("experimental-webgl")) != null;
        } catch (e) {
            return false;
        }
        return retValue;
    }
}
