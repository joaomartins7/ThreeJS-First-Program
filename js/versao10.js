/*global THREE*/

var camera, cameraPerspective, cameraTop, cameraSide, cameraFront;

var g8, g7, g6, g5, g4, g3, g2, g1, g0;
var h1, h0;

var keyArray = new Array(100);
for (var i = 0; i < keyArray.length; i += 1) {
    keyArray[i] = false;
}

var cameraFactor = 10;
var deslocamento = 4;
var rotation = 0.1;

var changeCameraTop = false;
var changeCameraFront = false;
var changeCameraSide = false;
var changeCameraPerspective = false;

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

function render(){
    'use strict';
    renderer.render(scene, camera);
}

function createRobotAndCylinderWithTorus(x, y, z) { 
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
    g8.position.z = z+30;


    h1.position.x = x;
    h1.position.y = y;
    h1.position.z = z-40;
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
    mesh = new THREE.Mesh(geometry, material2); 
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
    geometry = new THREE.CubeGeometry(2, 20, 2);       
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
    geometry = new THREE.TorusGeometry(4, 1, 10, 20);    
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




// --------------- Camera Flags Checking ---------------

function checkCamera(){
    if(changeCameraFront){
        camera = cameraFront;
        changeCameraFront = false;
    }
    else if(changeCameraSide){
        camera = cameraSide;
        changeCameraSide = false
    }
    else if(changeCameraTop){
        camera = cameraTop;
        changeCameraTop = false
    }
    else if(changeCameraPerspective){
        camera = cameraPerspective;
        changeCameraPerspective = false
    }
}
// -------------------------------------------------



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



function onKeyDown(e) {
    'use strict';

    switch (e.keyCode) {

    case 49:   // tecla 1
        changeCameraTop = true;
        break;
    case 50:   // tecla 2
        changeCameraSide = true;
        break;
    case 51:   // tecla 3
        changeCameraFront = true;
        break;

    case 52:   // tecla 4
        scene.traverse(function (node) {
            if (node instanceof THREE.Mesh) {
                node.material.wireframe = !node.material.wireframe;
            }
        });
        break;

    case 53:   // tecla 5
        changeCameraPerspective = true;
        break;

    case 37: // left arrow
        keyArray[37] = true;
        break;
    case 39: // right arrow
        keyArray[39] = true;
        break;
    case 38: // up arrow
        keyArray[38] = true;
        break;
    case 40: // down arrow
        keyArray[40] = true;
        break;

    case 65:  // A
    case 97:  // a (counterclockwiseTheta1)
        keyArray[65] = true;
        break;
    case 83:  // S
    case 115: // s (clockwiseTheta1)
        keyArray[83] = true;
        break;

    case 81: // Q
    case 113: // q (theta2Q)
        keyArray[81] = true;
        break;
    case 87: // W
    case 119: // w (theta2W)
        keyArray[87] = true;
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



function onKeyUp(e) {
    'use strict';

    switch (e.keyCode) {

    case 37: // left arrow
        keyArray[37] = false;
        break;
    case 39: // right arrow
        keyArray[39] = false;
        break;
    case 38: // up arrow
        keyArray[38] = false;
        break;
    case 40: // down arrow
        keyArray[40] = false;
        break;

    case 65:  // A
    case 97:  // a (counterclockwiseTheta1)
        
        keyArray[65] = false;
        break;
    case 83:  // S
    case 115: // s (clockwiseTheta1)
        keyArray[83] = false;
        break;

    case 81: // Q
    case 113: // q (theta2Q)
        keyArray[81] = false;
        break;
    case 87: // W
    case 119: // w (theta2W)
        keyArray[87] = false;
        break;
    
    }
}



function processInputKeys(){

    if(keyArray[37]){                       // leftArrow
        g8.position.x -= deslocamento;
    }

    if(keyArray[39]){                      // rightArrow
        g8.position.x += deslocamento;
    }

    if(keyArray[38]){                      // upArrow
        g8.position.z -= deslocamento;
    }

    if(keyArray[40]){                      // downArrow
        g8.position.z += deslocamento;
    }

    if(keyArray[65]){                      // counterclockwiseTheta1
        g5.rotateY(rotation);
    }

    if(keyArray[83]){                      // clockwiseTheta1
        g5.rotateY(-rotation);
    }

    if(keyArray[81]){                      // theta2Q
        if(theta2QW_limit > -8){
            g4.rotateX(rotation);   
            g4.position.z -= 0.8;
            theta2QW_limit -= 1;
        }    
    }

    if(keyArray[87]){                      // theta2W
        if(theta2QW_limit < 4){
            g4.rotateX(-rotation);
            g4.position.z += 0.8;   
            theta2QW_limit += 1;
        }
    }
}



function init(){
    'use strict';

    renderer = new THREE.WebGLRenderer({ antialias: true});

    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    createScene();
    createCameraPerspective();          //perspetiva

    createCameraTop();                  //ortográfica topo
    createCameraSide();                 //ortográfica lateral
    createCameraFront();                //ortográfica frente

    camera = cameraTop;

    render();    

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);
}


function animate() {
    'use strict';

    checkCamera();
    processInputKeys();

    render();
    requestAnimationFrame(animate);
}

