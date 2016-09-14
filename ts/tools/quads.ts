/// <reference path="./three.d.ts" />

class Quads {

    private nx: number;
    private ny: number;
    private dx: number;
    private dy: number;
    private res_x: number;
    private res_y: number;
    private geometry: THREE.Geometry;

    constructor(nx: number, ny: number, res_x: number, res_y: number) {
        this.nx = nx;
        this.ny = ny;
        this.dx = res_x / nx;
        this.dy = res_y / ny;
        this.res_x = res_x;
        this.res_y = res_y;
        this.geometry = this.makeGeometry();
    }

    public flip(rad: number, i: number, j: number) {
        let x_center = this.res_x * (i / this.nx - 1 / 2) + this.dx / 2;

        let index = i * (this.ny + 1) + j;

        let cos = Math.cos(rad);
        let sin = Math.sin(rad);

        this.geometry.vertices[4 * index].x = x_center - this.dx * cos;
        this.geometry.vertices[4 * index].z = -this.dx * sin;
        this.geometry.vertices[4 * index + 1].x = x_center + this.dx * cos;
        this.geometry.vertices[4 * index + 1].z = this.dx * sin;
        this.geometry.vertices[4 * index + 2].x = x_center - this.dx * cos;
        this.geometry.vertices[4 * index + 2].z = -this.dx * sin;
        this.geometry.vertices[4 * index + 3].x = x_center + this.dx * cos;
        this.geometry.vertices[4 * index + 3].z = this.dx * sin;

        this.geometry.verticesNeedUpdate = true;
        //this.geometry.uvsNeedUpdate = true;
    }

    public getGeometry(): THREE.Geometry {
        return this.geometry;
    }

    private makeGeometry(): THREE.Geometry {

        let geometry = new THREE.Geometry();
        var offset = 0;

        for (var i = 0; i < 1; i += 1 / this.nx) {
            for (var j = 0; j < 1; j += 1 / this.ny) {
                let x = -this.res_x / 2 + this.res_x * i;
                let y = -this.res_y / 2 + this.res_y * j;
                geometry.vertices.push(new THREE.Vector3(x - this.dx / 2, y - this.dy / 2, 0));
                geometry.vertices.push(new THREE.Vector3(x + 3 * this.dx / 2, y - this.dy / 2, 0));
                geometry.vertices.push(new THREE.Vector3(x - this.dx / 2, y + 3 * this.dy / 2, 0));
                geometry.vertices.push(new THREE.Vector3(x + 3 * this.dx / 2, y + 3 * this.dy / 2, 0));
                geometry.faces.push(new THREE.Face3(offset + 0, offset + 1, offset + 2));
                geometry.faces.push(new THREE.Face3(offset + 3, offset + 2, offset + 1));
                geometry.faces.push(new THREE.Face3(offset + 2, offset + 1, offset + 0));
                geometry.faces.push(new THREE.Face3(offset + 1, offset + 2, offset + 3));
                geometry.faceVertexUvs[0].push([new THREE.Vector2(i / 2, j),
                    new THREE.Vector2((i + 1 / this.nx) / 2, j),
                    new THREE.Vector2(i / 2, j + 1 / this.ny)]);
                geometry.faceVertexUvs[0].push([new THREE.Vector2((i + 1 / this.nx) / 2, j + 1 / this.ny),
                    new THREE.Vector2(i / 2, j + 1 / this.ny),
                    new THREE.Vector2((i + 1 / this.nx) / 2, j)]);
                geometry.faceVertexUvs[0].push([new THREE.Vector2(0.5 + (i + 1 / this.nx) / 2, j + 1 / this.ny),
                    new THREE.Vector2(0.5 + i / 2, j),
                    new THREE.Vector2(0.5 + (i + 1 / this.nx) / 2, j)]);
                geometry.faceVertexUvs[0].push([new THREE.Vector2(0.5 + i / 2, j),
                    new THREE.Vector2(0.5 + (i + 1 / this.nx) / 2, j + 1 / this.ny),
                    new THREE.Vector2(0.5 + i / 2, j + 1 / this.ny)]);
                offset += 4;
            }
        }

        return geometry;
    }


}
