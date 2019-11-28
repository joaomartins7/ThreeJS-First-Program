/*global THREE*/

var camera, scene, renderer;

var geometry, material, material2, material3, mesh;

var ball;

var axis = new THREE.Vector3(0.5,0.5,0);

function render(){
    'use strict';
    renderer.render(scene, camera);
}

function createBall(x, y, z) {
    'use strict';

    ball = new THREE.Object3D();
    ball.userData = { jumping: true, step: 0 };

    material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
    geometry = new THREE.SphereGeometry(4, 10, 10);
    mesh = new THREE.Mesh(geometry, material);

    ball.add(mesh);
    ball.position.set(x, y, z);

    scene.add(ball);
}

function createRobot(x, y, z) { //createTable
    'use strict';

    var g8 = new THREE.Object3D();
    var g7 = new THREE.Object3D();
    var g6 = new THREE.Object3D();
    var g5 = new THREE.Object3D();
    var g4 = new THREE.Object3D();
    var g3 = new THREE.Object3D();
    var g2 = new THREE.Object3D();
    var g1 = new THREE.Object3D();
    var g0 = new THREE.Object3D();

    var h0 = new THREE.Object3D();
    var h1 = new THREE.Object3D();

    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    material2 = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
    material3 = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true });

    addFinger(g0, -4, 28, -28);
    addFinger(g0, 4, 28, -28);
    addHand(g0, 0, 28, -23);
    //g0.rotateOnAxis(axis, Math.PI);


    addBall(g1, 0, 28, -20);
    g1.add(g0);

    addForearm(g2, 0, 28, -10);
    g2.add(g1);
//por acabar
    addBall(g3, 0, 28, 0);
    g3.add(g2);

    addArm(g4, 0, 18, 0);
    g4.add(g3);

    addHalfSphere(g5, 0, 5, 0);
    g5.add(g4);

    //----------------------

    addWheel(g6, -18, 2, -18);
    addWheel(g6, -18, 2, 18);
    addWheel(g6, 18, 2, 18);
    addWheel(g6, 18, 2, -18);

    addTable(g7, 0, 5, 0);
    g7.add(g6);

    g8.add(g5);
    g8.add(g7);

    //---------------------

    addCylinder(h0, 0, 12, 0);

    addTorus(h1, 0, 29, 0);
    h1.add(h0);




    scene.add(g8);
    scene.add(h1);

    g8.position.x = x;
    g8.position.y = y;
    g8.position.z = z+50;

}

function addFinger(obj, x, y, z){
    'use strict';
    geometry = new THREE.CubeGeometry(2, 2, 8);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addHand(obj, x, y, z){
    'use strict';
    geometry = new THREE.CubeGeometry(10, 2, 2);
    mesh = new THREE.Mesh(geometry, material2); //posso usar material2 para trocar cor
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addBall(obj, x, y, z){
    'use strict';
    geometry = new THREE.SphereGeometry(4, 10, 10);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addForearm(obj, x, y, z){
    'use strict';
    geometry = new THREE.CubeGeometry(2, 2, 16);
    mesh = new THREE.Mesh(geometry, material2);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addArm(obj, x, y, z){
    'use strict';
    geometry = new THREE.CubeGeometry(2, 16, 2);
    mesh = new THREE.Mesh(geometry, material2);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addHalfSphere(obj, x, y, z){
    'use strict';
    geometry = new THREE.SphereGeometry(4, 12, 12, 0, Math.PI*2, -Math.PI/2, Math.PI);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addTable(obj, x, y, z){
    'use strict';
    geometry = new THREE.CubeGeometry(40, 2, 40);
    mesh = new THREE.Mesh(geometry, material3);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addBase(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CubeGeometry(60, 2, 20);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addWheel(obj, x, y, z) {
    'use strict';
    /*
    geometry = new THREE.CubeGeometry(2, 6, 2);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y - 3, z);
    obj.add(mesh);
    */
    geometry = new THREE.SphereGeometry(4, 10, 10);
    material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addCylinder(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CylinderGeometry(5, 5, 24);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addTorus(obj, x, y, z) {
    'use strict';
    geometry = new THREE.TorusGeometry(3, 2, 8, 6);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function createCamera() {
    'use strict';
    camera = new THREE.PerspectiveCamera(70,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         1000);
    camera.position.x = 50;
    camera.position.y = 50;
    camera.position.z = 50;
    camera.lookAt(scene.position);
}

function createScene() {
    'use strict';

    scene = new THREE.Scene();

    scene.add(new THREE.AxisHelper(10));

    createRobot(0, 0, 0);
    //createBall(0, 0, 15);
}

function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }

}

function onKeyDown(e) {
    'use strict';

    switch (e.keyCode) {
    case 65: //A
    case 97: //a
        scene.traverse(function (node) {
            if (node instanceof THREE.Mesh) {
                node.material.wireframe = !node.material.wireframe;
            }
        });
        break;
    case 83:  //S
    case 115: //s
        ball.userData.jumping = !ball.userData.jumping;
        break;
    case 69:  //E
    case 101: //e
        scene.traverse(function (node) {
            if (node instanceof THREE.AxisHelper) {
                node.visible = !node.visible;
            }
        });
        break;
    }

}

function init(){
    'use strict';

    renderer = new THREE.WebGLRenderer({ antialias: true});

    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    createScene();
    createCamera();

    render();

    //window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

}

function animate() {
    'use strict';

    /*if (ball.userData.jumping) {
        ball.userData.step += 0.04;
        ball.position.y = Math.abs(30 * (Math.sin(ball.userData.step)));
        ball.position.z = 15 * (Math.cos(ball.userData.step));
    }*/
    render();

    requestAnimationFrame(animate);
}
