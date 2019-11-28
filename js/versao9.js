/*global THREE*/

var camera, cameraPerspective, cameraTop, cameraSide, cameraFront;

var g8, g7, g6, g5, g4, g3, g2, g1, g0;
var h1, h0;

var cameraFactor = 10;
var deslocamento = 5;
var rotation = 0.1;

var change_cameraTop = false;
var change_cameraFront = false;
var change_cameraSide = false;
var change_cameraPerspective = false;

var leftArrow = false;
var rightArrow = false;
var upArrow = false;
var downArrow = false;

var clockwiseTheta1 = false;
var counterclockwiseTheta1 = false;

var theta2Q = false;
var theta2W = false;

var theta2QW_limit = 0;

var scene, renderer;
var geometry, material, material2, material3, mesh;
var axis = new THREE.Vector3(0, 5, 0);

function render(){
    'use strict';
    renderer.render(scene, camera);
}

function createRobotAndCylinderWithTorus(x, y, z) { // FIXME dividir em duas funcoes
    'use strict';

    g8 = new THREE.Object3D();
    g7 = new THREE.Object3D();
    g6 = new THREE.Object3D();
    g5 = new THREE.Object3D();
    g4 = new THREE.Object3D();
    g3 = new THREE.Object3D();
    g2 = new THREE.Object3D();
    g1 = new THREE.Object3D();
    g0 = new THREE.Object3D();

    h0 = new THREE.Object3D();
    h1 = new THREE.Object3D();

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

    //---------------------

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
    geometry = new THREE.CubeGeometry(2, 20, 2);       //FIXME estava (2, 18, 2)
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
    geometry = new THREE.SphereGeometry(3, 10, 10);
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
    geometry = new THREE.TorusGeometry(3, 2, 10, 8);
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

function checkMovement(){
    if(leftArrow){
        //decrementar coordenada x do robot
        g8.position.x -= deslocamento;
        leftArrow = false;
    }
    else if(rightArrow){
        //incrementar coordenada x do robot
        g8.position.x += deslocamento;
        rightArrow = false;
    }
    else if(upArrow){
        //incrementar coordenada y do robot
        g8.position.z -= deslocamento;
        upArrow = false;
    }
    else if(downArrow){
        //decrementar coordenada y do robot
        g8.position.z += deslocamento;
        downArrow = false;
    }

    else if(counterclockwiseTheta1){
        g5.rotateY(rotation);
        counterclockwiseTheta1 = false;
    }
    else if(clockwiseTheta1){
        g5.rotateY(-rotation);
        clockwiseTheta1 = false;
    }

    else if(theta2Q){

        if(theta2QW_limit > -8){
            g4.rotateX(rotation);
            g4.position.z -= 0.8;
            theta2QW_limit -= 1;
        }

        //g4.rotateOnAxis(axis, rotation);

        theta2Q = false;
    }
    else if(theta2W){

        if(theta2QW_limit < 20){
            g4.rotateX(-rotation);
            //g4.position.z += 0.8;
            theta2QW_limit += 1;
        }
        theta2W = false;
    }

}




function createScene() {
    'use strict';

    scene = new THREE.Scene();
    scene.add(new THREE.AxisHelper(10));

    createRobotAndCylinderWithTorus(0, 0, 0);
}


function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }

}


function onKeyPress(e) {
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

    case 37: // left arrow
        leftArrow = true;
        break;
    case 39: // right arrow
        rightArrow = true;
        break;
    case 38: // up arrow
        upArrow = true;
        break;
    case 40: // down arrow
        downArrow = true;
        break;

    case 65:  // A
    case 97:  // a
        counterclockwiseTheta1 = true;
        break;
    case 83:  // S
    case 115: // s
        clockwiseTheta1 = true;
        break;

    case 81: // Q
    case 113: // q
        theta2Q = true;
        break;

    case 87: // W
    case 119: // w
        theta2W = true;
        break;

    case 54: // tecla 6
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
    createCameraPerspective();         //perspetiva

    createCameraTop();      //ortográfica topo
    createCameraSide();     //ortográfica lateral
    createCameraFront();    //ortográfica frente

    camera = cameraSide;



    render();

    window.addEventListener("keypress", onKeyPress);
    window.addEventListener("resize", onResize);

}


function animate() {
    'use strict';

    checkMovement();

    checkCamera();
    render();

    requestAnimationFrame(animate);
}
