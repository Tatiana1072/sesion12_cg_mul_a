var scene = new THREE.Scene();

function cubo(x, y, z, color, material, alambrado) {
   var cubeGeometry = new THREE.BoxGeometry(x, y, z);
   var cubeMaterial;
   switch (material) {
case 'Basic': cubeMaterial = new THREE.MeshBasicMaterial({color: color, wireframe: alambrado});
      break;

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

   var axes = new THREE.AxesHelper(5);
   scene.add(axes);

   //Creacion de los 3 cubos con sus caracteristicas
   Cubo = []; //Se define un array para almacenar los 3 cubos
   tam = 1; //dimension inicial de los cubos
   Cubo.push(cubo(tam, tam, tam, 0x00FF00, 'Physical', false));
   Cubo.push(cubo(tam, tam, tam, 0xFF0000, 'Physical', false));
   Cubo.push(cubo(tam, tam, tam, 0xFFFFFF, 'Physical', false));

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
angulo=Math.PI/4
Cubo[0].rotateY(angulo);
Cubo[2].rotateY(angulo);


b=tam/Math.sqrt(8);
Cubo[0].translateZ(b);

Cubo[2].translateZ(tam/2);
u=(3*tam)/4+(3*tam)/8
Cubo[2].translateZ(-u);
Cubo[2].translateZ(-tam/16);
w=Math.sqrt(4*Math.pow(b, 2)+(1/4)*Math.pow(tam, 2))
Cubo[2].translateZ(w);
Cubo[2].translateZ(tam/8);

Cubo[1].translateZ(-tam/2);
Cubo[1].translateX(-tam/2);
e=Math.sqrt(Math.pow(tam, 2)/2);
Cubo[1].translateZ(e);
Cubo[1].translateX(e);

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