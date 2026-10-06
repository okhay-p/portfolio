// Throwaway, reference-inspired portrait built entirely with Three.js geometry.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

export function createCharacter() {
  const group = new THREE.Group();
  const material = (color, roughness = .75, metalness = 0) =>
    new THREE.MeshStandardMaterial({ color, roughness, metalness });
  const skin = material(0xc08a65, .64);
  const warmSkin = material(0xb77a5d, .68);
  const hair = material(0x171513, .72);
  const hairHighlight = material(0x302821, .78);
  const hoodie = material(0x141519, .95);
  const ribbing = material(0x24252a, .95);
  const white = material(0xfff6e9, .28);
  const frame = material(0xaca79c, .3, .7);
  const iris = material(0x7d4218, .38);
  const pupil = material(0x160e08, .25);
  const lip = material(0xa16c55, .72);
  const add = (geometry, mat, position, scale = [1, 1, 1]) => {
    const mesh = new THREE.Mesh(geometry, mat);
    mesh.position.set(...position); mesh.scale.set(...scale);
    mesh.castShadow = true; mesh.receiveShadow = true;
    group.add(mesh); return mesh;
  };
  const sphere = (radius, mat, position, scale) =>
    add(new THREE.SphereGeometry(radius, 40, 32), mat, position, scale);
  const box = (w, h, d, radius, mat, position) =>
    add(new RoundedBoxGeometry(w, h, d, 5, radius), mat, position);
  const line = (points, radius, mat, taper = false) => {
    const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)));
    const geometry = new THREE.TubeGeometry(curve, 32, radius, 16, false);
    if (taper) {
      const positions = geometry.attributes.position;
      for (let i = 0; i <= 32; i++) {
        const t = i / 32;
        const center = curve.getPointAt(t);
        const thickness = Math.max(.025, Math.sin(Math.PI * (.14 + t * .86)));
        for (let j = 0; j <= 16; j++) {
          const index = i * 17 + j;
          const vertex = new THREE.Vector3().fromBufferAttribute(positions, index);
          vertex.sub(center).multiplyScalar(thickness).add(center);
          positions.setXYZ(index, vertex.x, vertex.y, vertex.z);
        }
      }
      geometry.computeVertexNormals();
    }
    return add(geometry, mat, [0, 0, 0]);
  };

  // Portrait proportions: narrow shoulders, long neck, relaxed oversized hoodie.
  box(1.15, 1.6, .78, .24, hoodie, [0, -.92, -.04]);
  sphere(.42, hoodie, [0, -.2, -.22], [1.3, .8, .95]);
  add(new THREE.CapsuleGeometry(.17, .63, 12, 32), skin, [0, .12, 0], [1, 1, .94]);
  const collar = add(new THREE.TorusGeometry(.255, .075, 16, 48), ribbing, [0, -.17, .045]);
  collar.rotation.x = Math.PI / 2;
  box(.73, .38, .045, .09, ribbing, [0, -1.23, .37]);
  [-1, 1].forEach(side => {
    const sleeve = add(new THREE.CapsuleGeometry(.215, 1.08, 10, 32), hoodie, [side * .64, -.99, -.03]);
    sleeve.rotation.z = side * .065;
    line([[side * .2, -.24, .39], [side * .17, -.48, .408], [side * .2, -.73, .41]], .016, ribbing);
    box(.035, .075, .035, .009, frame, [side * .2, -.76, .41]);
    line([[side * .48, -.42, .29], [side * .5, -.7, .32], [side * .48, -1.04, .32]], .009, ribbing);
  });

  // Smooth elongated face with a slim jaw and distinct chin.
  const profile = [[0,-.78],[.2,-.75],[.33,-.6],[.42,-.35],[.5,-.04],[.54,.25],[.51,.55],[.36,.74],[0,.8]];
  const outline = new THREE.CatmullRomCurve3(profile.map(([r,y]) => new THREE.Vector3(r,y,0)));
  const points = outline.getPoints(64).map(p => new THREE.Vector2(Math.max(0,p.x),p.y));
  add(new THREE.LatheGeometry(points, 64), skin, [0, 1.12, .015], [1, 1, .84]);
  [-1, 1].forEach(side => {
    sphere(.19, skin, [side * .53, 1.03, -.01], [.7, 1.2, .52]);
    sphere(.125, warmSkin, [side * .585, 1.04, .059], [.56, 1.02, .24]);
    const ear = add(new THREE.TorusGeometry(.09, .022, 10, 32), skin, [side * .585, 1.055, .075], [.65, 1.05, 1]);
    ear.rotation.y = side * .25;
    // Large expressive eyeballs, inset into a warm eyelid rim.
    sphere(.204, warmSkin, [side * .25, 1.3, .393], [1.02, 1.08, .63]);
    sphere(.181, white, [side * .25, 1.3, .426], [1, 1.05, .66]);
    sphere(.094, iris, [side * .245, 1.295, .536], [1, 1, .26]);
    sphere(.046, pupil, [side * .245, 1.295, .558], [1, 1, .24]);
    sphere(.024, white, [side * .245 - .027, 1.327, .573], [1, 1, .4]);
    // Raised inner brows give a gentle, inquisitive expression.
    line([[side*.09,1.68,.377],[side*.2,1.66,.424],[side*.35,1.6,.395],[side*.43,1.54,.315]], .061, hair, true);
    const glasses = add(new THREE.TorusGeometry(.241, .012, 12, 64), frame, [side * .266, 1.3, .585], [1, 1.06, 1]);
    glasses.rotation.y = side * .1;
    line([[side*.506,1.33,.56],[side*.564,1.34,.32],[side*.568,1.14,.04]], .011, frame);
  });
  line([[-.027,1.335,.6],[0,1.365,.615],[.027,1.335,.6]], .012, frame);
  sphere(.105, skin, [0, 1.125, .464], [.75, 2.15, 1.4]);
  sphere(.134, skin, [0, .99, .54], [.91, .73, .9]);
  [-1,1].forEach(side => sphere(.03, lip, [side*.079,.951,.574], [1,.4,.35]));
  line([[-.17,.727,.356],[-.075,.75,.421],[.025,.75,.433],[.16,.737,.366]], .018, lip, true);
  line([[-.135,.703,.377],[0,.716,.425],[.115,.703,.391]], .015, skin, true);

  // Subtle deterministic freckles over the cheeks, using instanced geometry.
  const freckles = new THREE.InstancedMesh(new THREE.SphereGeometry(.005, 6, 4), material(0x95664e), 64);
  const dummy = new THREE.Object3D();
  for (let i=0;i<64;i++) {
    const side = i % 2 ? 1 : -1;
    const x = side * (.22 + ((i * 17) % 29) / 29 * .22);
    const y = .91 + ((i * 11) % 31) / 31 * .23;
    const z = .015 + .84 * Math.sqrt(Math.max(.01, .49*.49-x*x));
    dummy.position.set(x,y,z+.018); dummy.scale.setScalar(.55+(i%4)*.15);
    dummy.updateMatrix(); freckles.setMatrixAt(i,dummy.matrix);
  }
  group.add(freckles);

  // Tapered swept locks replace the previous ball-shaped curls.
  sphere(.56, hair, [0, 1.75, -.08], [1.09, .65, .9]);
  const locks = [
    [[-.49,1.53,.05],[-.67,1.85,.15],[-.6,2.04,.13],[-.75,2.13,.08]],
    [[-.37,1.69,.31],[-.6,1.92,.38],[-.47,2.17,.25],[-.54,2.32,.12]],
    [[-.2,1.77,.39],[-.32,2.02,.45],[-.16,2.23,.28],[-.3,2.43,.12]],
    [[.04,1.84,.4],[-.04,2.08,.45],[.2,2.25,.22],[.34,2.36,.02]],
    [[.24,1.79,.36],[.47,1.95,.4],[.54,2.16,.22],[.66,2.3,.04]],
    [[.43,1.63,.21],[.66,1.81,.18],[.7,1.99,.03],[.83,2.04,-.04]],
    [[.48,1.44,-.02],[.68,1.61,-.04],[.72,1.8,-.13],[.83,1.85,-.17]],
    [[-.46,1.4,-.05],[-.65,1.58,-.1],[-.66,1.77,-.16],[-.8,1.81,-.2]],
    [[-.3,1.85,-.28],[-.39,2.09,-.25],[-.25,2.24,-.25],[-.31,2.38,-.3]],
    [[.25,1.86,-.29],[.38,2.08,-.24],[.55,2.17,-.23],[.68,2.27,-.32]],
  ];
  locks.forEach((points,index) => {
    const lockRadius = index < 5 ? .165 : .13;
    line(points, lockRadius, hair, true);
    for (let strand=0;strand<9;strand++) {
      const offset=(strand-4)*.022;
      line(points.map(([x,y,z],i)=>[x+offset*(1-i*.2),y+.008,z+Math.sqrt(lockRadius*lockRadius-offset*offset)*Math.sin(Math.PI*(.14+i/3*.86))+.003]),
        .0035, strand%3===0?hairHighlight:hair, true);
    }
  });
  [-1,1].forEach(side => line([[side*.51,1.64,.03],[side*.55,1.41,.04],[side*.505,1.16,.06]], .07, hair, true));
  group.rotation.y = -.15;
  group.rotation.z = -.025;
  group.scale.setScalar(.83);
  return group;
}
