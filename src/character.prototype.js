// Procedural reference-inspired character; all shapes are editable Three.js geometry.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

export function createCharacter() {
  const group = new THREE.Group();
  const material = (color, roughness = .75, metalness = 0) =>
    new THREE.MeshStandardMaterial({ color, roughness, metalness });
  const skin = material(0xb87c52);
  const hair = material(0x141416, .88);
  const hoodie = material(0x131418, .95);
  const ribbing = material(0x202126, .95);
  const pants = material(0x292b31);
  const soles = material(0xe9e5dd, .8);
  const frame = material(0xa8a59e, .3, .7);
  const eyes = material(0x211710);
  const mouth = material(0x71482f);
  const add = (geometry, mat, position, scale = [1, 1, 1]) => {
    const mesh = new THREE.Mesh(geometry, mat);
    mesh.position.set(...position); mesh.scale.set(...scale);
    mesh.castShadow = true; mesh.receiveShadow = true;
    group.add(mesh); return mesh;
  };
  const sphere = (radius, mat, position, scale) =>
    add(new THREE.SphereGeometry(radius, 32, 24), mat, position, scale);
  const box = (w, h, d, radius, mat, position) =>
    add(new RoundedBoxGeometry(w, h, d, 4, radius), mat, position);
  const line = (points, radius, mat) => add(new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p))),
    20, radius, 8, false), mat, [0, 0, 0]);

  // Narrow shoulder span, dropped sleeves, and a roomy lower hoodie silhouette.
  box(1.06, 1.16, .76, .22, hoodie, [0, -.3, 0]);
  sphere(.47, hoodie, [0, .31, -.23], [1.13, .65, .82]);
  sphere(.2, skin, [0, .44, .02], [.82, 1.35, .9]);
  const collar = add(new THREE.TorusGeometry(.24, .065, 12, 40), ribbing, [0, .34, .1]);
  collar.rotation.x = Math.PI / 2;
  box(.99, .12, .71, .045, ribbing, [0, -.85, 0]);
  box(.63, .32, .08, .08, ribbing, [0, -.55, .395]);
  [-1, 1].forEach(side => {
    line([[side * .18, .23, .375], [side * .16, .05, .403], [side * .19, -.12, .405]], .013, ribbing);
    box(.035, .075, .035, .008, frame, [side * .19, -.15, .405]);
    const sleeve = add(new THREE.CapsuleGeometry(.205, .57, 8, 24), hoodie,
      [side * .61, -.29, .02]);
    sleeve.rotation.z = side * .13;
    const cuff = box(.31, .13, .34, .045, ribbing, [side * .66, -.71, .035]);
    cuff.rotation.z = side * .13;
    sphere(.145, skin, [side * .665, -.84, .055], [.82, 1.15, .8]);
    add(new THREE.CapsuleGeometry(.19, .43, 8, 24), pants, [side * .255, -1.19, 0]);
    box(.38, .24, .63, .095, hoodie, [side * .255, -1.55, .11]);
    box(.39, .075, .65, .025, soles, [side * .255, -1.66, .12]);
  });

  // A tapered jaw and softly faceted face rather than a spherical cartoon head.
  const profile = [[0,-.62],[.23,-.59],[.38,-.47],[.48,-.26],[.55,.04],[.56,.3],[.49,.49],[.3,.61],[0,.65]];
  add(new THREE.LatheGeometry(profile.map(([r,y]) => new THREE.Vector2(r,y)), 40),
    skin, [0, 1.05, .02], [1, 1, .83]);
  [-1, 1].forEach(side => {
    sphere(.14, skin, [side * .55, 1.02, .015], [.57, 1, .66]);
    sphere(.075, mouth, [side * .59, 1.025, .055], [.35, .8, .45]);
    sphere(.1, soles, [side * .24, 1.105, .433], [1.08, .5, .3]);
    sphere(.052, eyes, [side * .24, 1.108, .461], [.83, 1, .36]);
    sphere(.012, soles, [side * .24 - .014, 1.124, .48]);
    line([[side * .12,1.265,.442],[side * .245,1.29,.44],[side * .37,1.265,.408]], .025, hair);
    const glasses = add(new THREE.TorusGeometry(.222, .015, 10, 48), frame,
      [side * .255, 1.1, .501], [1, .95, 1]);
    glasses.rotation.y = side * .09;
    line([[side * .474,1.14,.483],[side * .56,1.16,.28],[side * .568,1.1,.04]], .012, frame);
  });
  line([[-.037,1.135,.514],[0,1.16,.53],[.037,1.135,.514]], .014, frame);
  sphere(.095, skin, [0, .975, .485], [.67, 1.12, .85]);
  line([[-.155,.798,.407],[-.075,.78,.445],[0,.773,.455],[.075,.78,.445],[.155,.798,.407]], .015, mouth);

  // Swept waves and asymmetric curls echo the reference without using photo textures.
  sphere(.575, hair, [0, 1.48, -.065], [1.02, .62, .83]);
  [-1, 1].forEach(side => sphere(.22, hair, [side * .46, 1.36, -.09], [.65, 1.25, 1.15]));
  const waves = [
    [-.39,1.63,.12,.24,-.45],[-.19,1.72,.12,.26,-.4],
    [.055,1.74,.09,.27,-.35],[.29,1.7,.05,.25,-.35],[.43,1.58,-.04,.21,-.3],
    [-.36,1.49,.32,.19,-.65],[-.16,1.57,.35,.22,-.5],[.07,1.61,.34,.21,-.5],
    [.29,1.56,.29,.2,-.6],[-.19,1.72,-.2,.22,.4],[.17,1.72,-.2,.25,.3]
  ];
  waves.forEach(([x,y,z,r,angle]) => {
    const curl = sphere(r, hair, [x,y,z], [.9, .68, 1.16]);
    curl.rotation.z = angle; curl.rotation.x = -.3;
  });
  group.rotation.y = -.13;
  return group;
}
