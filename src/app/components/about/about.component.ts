import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements AfterViewInit {
  @ViewChild('container') container: ElementRef<HTMLDivElement> | undefined;

  constructor() {}

  ngAfterViewInit() {
    // this.initRect();
    this.initText();

  }

  public initRect() {
    const width = window.innerWidth / 2;
    const height = window.innerHeight / 2;

    const camera = new THREE.PerspectiveCamera(20, width / height, 0.1, 10);
    camera.position.z = 1;

    const scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const material = new THREE.MeshNormalMaterial();
    
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setAnimationLoop(animation);
    this.container?.nativeElement.appendChild(renderer.domElement);
        
    function animation(time = 100) {
      mesh.rotation.x = time / 2000;
      mesh.rotation.y = time / 1000;
      renderer.render(scene, camera);
    }
  }

  public initText( ) {
    const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set( 0, - 400, 600 );

    const scene = new THREE.Scene();

    const loader = new FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', (font) => {

    const color = 0x402E32;
    const matDark = new THREE.LineBasicMaterial( {
      color: color,
      side: THREE.DoubleSide
    } );

    const matLite = new THREE.MeshBasicMaterial( {
      color: color,
      transparent: true,
      opacity: 0.4,
      side: THREE.DoubleSide
    } );

    const message = 'Happy\nCoding!';
    const shapes = font.generateShapes( message, 120 );
    const geometry: any = new THREE.ShapeGeometry( shapes );
    geometry.computeBoundingBox();

    const xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
    geometry.translate( xMid, 0, 0 );

    // make shape ( N.B. edge view not visible )
    const text = new THREE.Mesh( geometry, matLite );
    text.position.z = - 150;
    scene.add( text );

    const holeShapes: any = [];

    for ( let i = 0; i < shapes.length; i ++ ) {
      const shape = shapes[ i ];
      if ( shape.holes && shape.holes.length > 0 ) {
        for ( let j = 0; j < shape.holes.length; j ++ ) {
          const hole = shape.holes[ j ];
          holeShapes.push( hole );
        }
      }
    }

    shapes.push.apply( shapes, holeShapes );
    const lineText = new THREE.Object3D();

    for ( let i = 0; i < shapes.length; i ++ ) {
      const shape = shapes[ i ];
      const points = shape.getPoints();
      const geometry = new THREE.BufferGeometry().setFromPoints( points );
      geometry.translate( xMid, 0, 0 );

      const lineMesh = new THREE.Line( geometry, matDark );
      lineText.add( lineMesh );
    }

    scene.add( lineText );
    render();

  });

    const renderer = new THREE.WebGLRenderer( { antialias: true } );
    const width = window.innerWidth / 2;
    const height = window.innerHeight / 2;
    renderer.setClearColor(0xffffff, 0);
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(width, height);
    this.container?.nativeElement.appendChild(renderer.domElement);

    const controls = new OrbitControls( camera, renderer.domElement );
    controls.target.set( 0, 0, 0 );
    controls.update();

    controls.addEventListener( 'change', render );
    window.addEventListener( 'resize', onWindowResize );

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      render();
    }

    function render() {
      renderer.render( scene, camera );
    }
  }

}
