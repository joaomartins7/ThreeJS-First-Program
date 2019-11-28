/*global THREE*/

var camera, cameraPerspective, cameraTop, cameraSide, cameraFront;

var cameraFactor = 10;

var change_cameraTop = false;
var change_cameraFront = false;
var change_cameraSide = false;
var change_cameraPerspective = false;

var scene, renderer;
var geometry, material, material2, material3, mesh;
var axis = new THREE.Vector3(0.5,0.5,0);

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

function render(){
    'use strict';
    renderer.render(scene, camera);
}

function createRobot(x, y, z) {
    'use strict';


    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    material2 = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
    material3 = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true });

    addFinger(g0, -4, 28, -28);
    addFinger(g0, 4, 28, -28);
    addHand(g0, 0, 28, -23);

    addBall(g1, 0, 28, -20);
    g1.add(g0);

    addForearm(g2, 0, 28, -10);
    g2.add(g1);

    addBall(g3, 0, 28, 0);
    g3.add(g2);

    addArm(g4, 0, 18, 0);
    g4.add(g3);

    addHalfSphere(g5, 0, 6, 0);
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

    scene.add(g8);
    g8.position.x = x;
    g8.position.y = y;
    g8.position.z = z+50;

}

function createTarget(x, y ,z){
  'use strict';

  addCylinder(h0, 0, 12, 0);

  addTorus(h1, 0, 29, 0);
  h1.add(h0);

  scene.add(h1);

  h1.position.x = x;
  h1.position.y = y;
  h1.position.z = z;
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
    geometry = new THREE.SphereGeometry(2, 10, 10);
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

function addWheel(obj, x, y, z) {
    'use strict';
    geometry = new THREE.SphereGeometry(2, 10, 10);
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

// --------------- Camera's Creation ---------------

function createCameraPerspective() {
    'use strict';
    cameraPerspective = new THREE.PerspectiveCamera(70,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         1000);
    cameraPerspective.position.x = 70;
    cameraPerspective.position.y = 70;
    cameraPerspective.position.z = 70;
    cameraPerspective.lookAt(scene.position);
}

function createCameraTop() {
    'use strict';
    cameraTop = new THREE.OrthographicCamera(window.innerWidth / -cameraFactor,
                                         window.innerWidth / cameraFactor,
                                         window.innerHeight / cameraFactor,
                                         window.innerHeight / -cameraFactor,
                                         1,
                                         1000);
    cameraTop.position.x = 0;
    cameraTop.position.y = 100;
    cameraTop.position.z = 0;
    cameraTop.lookAt(scene.position);
}

function createCameraSide() {
    'use strict';
    cameraSide = new THREE.OrthographicCamera(window.innerWidth / -cameraFactor,
                                         window.innerWidth / cameraFactor,
                                         window.innerHeight / cameraFactor,
                                         window.innerHeight / -cameraFactor,
                                         1,
                                         1000);
    cameraSide.position.x = 100;
    cameraSide.position.y = 0;
    cameraSide.position.z = 0;
    cameraSide.lookAt(scene.position);
}

function createCameraFront() {
    'use strict';
    cameraFront = new THREE.OrthographicCamera(window.innerWidth / -cameraFactor,
                                         window.innerWidth / cameraFactor,
                                         window.innerHeight / cameraFactor,
                                         window.innerHeight / -cameraFactor,
                                         1,
                                         1000);
    cameraFront.position.x = 0;
    cameraFront.position.y = 0;
    cameraFront.position.z = -100;
    cameraFront.lookAt(scene.position);
}
// ------------------------------------------------

// --------------- Flags Checking ---------------

function checkCamera(){
    if(change_cameraFront){
        camera = cameraFront;
        change_cameraFront = false;
    }
    else if(change_cameraSide){
        camera = cameraSide;
        change_cameraSide = false
    }
    else if(change_cameraTop){
        camera = cameraTop;
        change_cameraTop = false
    }
    else if(change_cameraPerspective){
        camera = cameraPerspective;
        change_cameraPerspective = false
    }
}

// -------------------------------------------------

function createScene() {
    'use strict';

    scene = new THREE.Scene();
    scene.add(new THREE.AxisHelper(10));

    createRobot(0, 0, 0);
    createTarget(0,0,0);
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

    case 49:   // tecla 1
        change_cameraTop = true;
        break;
    case 50:   // tecla 2
        change_cameraSide = true;
        break;
    case 51:   // tecla 3
        change_cameraFront = true;
        break;

    case 52:   // tecla 4
        scene.traverse(function (node) {
            if (node instanceof THREE.Mesh) {
                node.material.wireframe = !node.material.wireframe;
            }
        });
        break;

    case 53:   // tecla 5
        change_cameraPerspective = true;
        break;

    case 54: // tecla 6
        scene.traverse(function (node) {
            if (node instanceof THREE.AxisHelper) {
                node.visible = !node.visible;
            }
        });
        break;

    case 39: //right arrow
        g8.position.x +=10;
        break;
    case 37: //left arrow
        g8.position.x -=10;
        break;
    case 40: //back arrow
        g8.position.z +=10;
        break;
    case 38: //front arrow
        g8.position.z -=10;
        break;

      break;
    }

}

/*function onRotate(e){
  'use strict';

  switch (e.Keycode) {
    case 65: //A
    case 97: //a
      g5.userData.rotating = !g5.userData.rotating;
      break;
  }
}
*/
//FIX ME
function init(){
    'use strict';

    renderer = new THREE.WebGLRenderer({ antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createScene();
    createCameraPerspective();         //perspetiva

    createCameraTop();      //ortográfica topo
    createCameraSide();     //ortográfica lateral
    createCameraFront();    //ortográfica frente

    camera = cameraPerspective;
    render();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    //window.addEventListener("rotation", onRotate);

}

//FIX ME
function animate() {
    'use strict';

    //if (g5.userData.rotating) { g5.rotateY(Math.degToRad(1/2)); }
    checkCamera();
    render();

    requestAnimationFrame(animate);
}
