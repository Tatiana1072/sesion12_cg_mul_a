var scene = new THREE.Scene();

function cubo(x, y, z, color, material, alambrado) {
   var cubeGeometry = new THREE.BoxGeometry(x, y, z);
   var cubeMaterial;
   switch (material) {
      case 'Phong':
         cubeMaterial = new THREE.MeshPhongMaterial({
            color: color,
            wireframe: alambrado
         });
         break;
      case 'Standard':
         cubeMaterial = new THREE.MeshStandardMaterial({
            color: color,
            wireframe: alambrado
         });
         break;
      case 'Physical':
         cubeMaterial = new THREE.MeshPhysicalMaterial({
            color: color,
            wireframe: alambrado
         });
         break;
   }

   var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
   scene.add(cube);
   return (cube);
}

function init() {
   var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

   var renderer = new THREE.WebGLRenderer();
   renderer.setClearColor(new THREE.Color(0x000000));
   renderer.setSize(window.innerWidth, window.innerHeight);

   var axes = new THREE.AxesHelper(50);
   scene.add(axes);

   //Creacion de los 3 cubos con sus caracteristicas
   Cubo = []; //Se define un array para almacenar los 3 cubos
   tam = 1; //dimension inicial de los cubos
   Cubo.push(cubo(tam, tam, tam, 0x00FF00, 'Physical', false));
   Cubo.push(cubo(tam, tam, tam, 0xFF0000, 'Standard', false));
   Cubo.push(cubo(tam, tam, tam, 0xFFFFFF, 'Phong', false));

   for(i=0; i<3; i++){//se translada los tres cubos con uno de sus vertices al origen de coordenadas
   Cubo[i].translateX(tam/2);
   Cubo[i].translateZ(tam/2);
   Cubo[i].translateY(tam/2);
}

for(i=1; i<3; i++){//transformaciones de escalado y translacion sobre el eje Y
//Escalado que hace que las dimensiones sean la mitad del cubo anterior
escala=1/(2*i);//Escalado de la mitad del cubo anterior
unidades=(3*tam)/4+((3*tam)/8)*(i-1);
Cubo[i].scale.set(escala, escala, escala);
Cubo[i].translateY(unidades);
}
angulo=Math.PI/12;
Cubo[0].rotateY(angulo);
Cubo[2].rotateY(angulo);

   //EJES: X rojo, Y verde, Z azul
var h=tam/(Math.sin(angulo)+Math.cos(angulo)+1)
var x=h*Math.sin(angulo)
//var y=(tam-h)*Math.tan(angulo)
var y=x*Math.sin(180-angulo);

Cubo[0].position.x+=x;
Cubo[0].position.z+=x;
Cubo[2].position.x+=x;
Cubo[2].position.z+=x;
Cubo[1].position.x+=x;
Cubo[1].position.z+=x;

//posicionamiento de la luz
   light = new THREE.PointLight(0xFFFF00);
   light.position.set(3, 4,5);
   scene.add(light);

//posicionamiento de la camara
   camera.position.set(3, 4,5);
   camera.lookAt(scene.position);
//agrega la salida del render al elemento html
   document.getElementById("webgl-output").appendChild(renderer.domElement);
   renderer.render(scene, camera);

}