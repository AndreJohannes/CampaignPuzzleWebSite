/// <reference path="three.d.ts" />
/// <reference path="jquery.d.ts" />
/// <reference path="./tools/quads.ts" />

import Vector2 = THREE.Vector2;
import OrthographicCamera = THREE.OrthographicCamera;
class Render {

    private scene: THREE.Scene;
    private camera: THREE.Camera;
    private renderer: THREE.Renderer;
    private quads: Quads;

    private rad = 0;

    constructor() {

        this.scene = new THREE.Scene();

        this.camera = new OrthographicCamera(-768/2, 768/2, 1024/2, -1024/2)//THREE.PerspectiveCamera(90, 768 / 1024, 1, 10000);
        this.camera.position.z = 1024 / 2;

        //let geometry = new THREE.PlaneGeometry(768,1024);//THREE.BoxGeometry( 200, 1024, 200 );
        //let material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } )

        var texture = THREE.ImageUtils.loadTexture("images/destination.png");
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

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(768, 1024);

        $("#puzzle").append(this.renderer.domElement);

    }

    public animate() {
        //this.stats.begin();
        Render._animate(this)();
    }

    private static _animate(render: Render) {
        return function () {
            requestAnimationFrame(Render._animate(render));
            //render.controls.update();
            //render.stats.update();
            render.render();
        }
    }

    public render() {
        this.rad += .1;
        for (var j = 0; j < 30; j++) {
            for (var i = 0; i < 20; i++) {
                var rad = Math.min(Math.PI, Math.max(0, this.rad - 0.2 * (i + 20 * j)))
                this.quads.flip(rad, i, j);
            }
        }
        this.renderer.render(this.scene, this.camera);
    }

}

window.onload = function () {

    let renderer = new Render();
    renderer.animate();
    //renderer.render();
    window.render = renderer;
}
