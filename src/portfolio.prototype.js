// THROWAWAY PROTOTYPE: Which minimal layout best complements stylized 3D?
// Three structurally different directions on one route, selected with ?variant=A|B|C.
import './style.css';
import * as THREE from 'three';
import { createCharacter } from './character.prototype.js';

const app = document.querySelector('#app');
const variants = ['A', 'B', 'C'];
const names = { A: 'Soft & human', B: 'After hours', C: 'Objects of curiosity' };
let disposeScenes = [];
const arrow = '<span aria-hidden="true">↗</span>';
const nav = (dark = false) => `<header class="nav"><a class="wordmark" href="?variant=${current()}">oakkar<span class="brand-dot">®</span></a><nav aria-label="Main navigation"><a href="#work">Work</a><a href="#about">About</a><a href="mailto:hello@example.com">Let’s talk ${arrow}</a></nav></header>`;
const status = '<span class="status"><i></i> Available for select projects</span>';
const scene = (type, className = '') => `<div class="scene ${className}" data-scene="${type}" role="img" aria-label="${type === 'character' ? 'Stylized male character with wavy black hair, round glasses, and a black oversized hoodie' : `Interactive stylized 3D ${type}`}"></div>`;
function VariantA() { return `${nav()}<section class="a-hero"><div class="a-copy"><div class="eyebrow">INDEPENDENT DESIGNER & CREATIVE DEVELOPER</div><h1>Thoughtful design.<br>A little <em>personality.</em></h1><p>I turn complex ideas into simple, delightful digital<br class="desktop-break"> experiences. Made with care. And a bit of play.</p><a class="button" href="#work">Explore my work <span>↘</span></a>${status}</div>${scene('character','a-character')}<div class="character-caption"><span>ME, IN A DIFFERENT DIMENSION</span><span>01 / HELLO THERE</span></div></section><section class="work-section" id="work"><div class="section-heading"><h2>Selected work<span> / 2024–26</span></h2><span>A FEW THINGS I’VE PUT INTO THE WORLD ↙</span></div><div class="a-projects"><a class="project" href="#about"><div class="project-art cream">${scene('bloom')}<span class="art-label">bloom.</span><span class="project-open">↗</span></div><div class="project-meta"><h3>Bloom — a calmer kind of finance</h3><span>BRAND / PRODUCT DESIGN</span></div></a><a class="project" href="#about"><div class="project-art lilac">${scene('orbit')}<span class="art-label">forma</span><span class="project-open">↗</span></div><div class="project-meta"><h3>Forma — space for good ideas</h3><span>WEB DESIGN / DEVELOPMENT</span></div></a></div></section><section class="about" id="about"><div class="eyebrow">A LITTLE ABOUT ME</div><h2>Serious about the craft.<br>Curious about everything else.</h2><p>I’m Oakkar, a designer and developer based in Singapore. I like clear ideas, useful details, and making the everyday feel a little more interesting.</p><a href="mailto:hello@example.com">Have something in mind? Let’s talk ↗</a></section><footer><span>© 2026 Oakkar</span><span>MADE WITH INTENTION, AND A LITTLE FUN.</span></footer>`; }
function VariantB() { return `${nav(true)}<section class="b-hero"><div class="b-topline">DESIGN × TECHNOLOGY × A LITTLE STRANGE<span>SINGAPORE / OPEN TO EVERYWHERE</span></div><div class="b-title"><h1>Less noise.<br>More <span>feeling.</span></h1><p>Independent designer & developer.<br>Crafting digital experiences that<br>leave a lasting impression.</p></div>${scene('chrome','b-sculpture')}<div class="b-bottom">${status}<a href="#work">SCROLL TO DISCOVER <span>↓</span></a></div></section><section class="b-work" id="work"><div class="section-heading"><h2>Selected explorations</h2><span>(03)</span></div>${[['01','FORMA','A home for your next big idea','Digital experience','orbit'],['02','BLOOM','Financial clarity, by design','Brand & product','bloom'],['03','OFFSCRIPT','A different kind of creative studio','Art direction','star']].map(([n,title,desc,tag,obj])=>`<a class="work-row" href="#about"><span class="row-number">${n}</span><h3>${title}</h3><p>${desc}<small>${tag}</small></p>${scene(obj)}<span class="row-arrow">↗</span></a>`).join('')}</section><section class="b-about" id="about"><span class="eyebrow">THE PERSON BEHIND THE PIXELS</span><h2>Good work starts<br>with a conversation.</h2><a href="mailto:hello@example.com">hello@example.com ↗</a></section><footer><span>© 2026 Oakkar</span><span>ALWAYS EXPLORING.</span></footer>`; }
function VariantC() { return `<div class="c-layout"><aside class="c-sidebar"><a class="wordmark" href="?variant=C">oakkar<span class="brand-dot">®</span></a><div><span class="eyebrow">DESIGNER. DEVELOPER.<br>OCCASIONAL DAYDREAMER.</span><h1>Small details.<br>Big possibilities.</h1><p>A collection of things I’ve designed, built, and wondered about.</p>${status}</div><div class="c-sidebar-bottom"><a href="#about">A bit about me ↗</a><a href="mailto:hello@example.com">Say hello ↗</a><span>BASED IN SINGAPORE<br>WORKING EVERYWHERE</span></div></aside><section class="c-content" id="work"><div class="c-heading"><span>THE COLLECTION</span><span>2024 — 2026</span></div><div class="collection"><a class="collection-card card-large" href="#about"><div class="collection-art blue">${scene('character')}<span class="collection-sticker">A LITTLE HUMAN TOUCH</span></div><div class="collection-meta"><div><h2>Hello, world.</h2><p>Character exploration / 3D & motion</p></div><span>↗</span></div></a><a class="collection-card" href="#about"><div class="collection-art peach">${scene('bloom')}<span class="collection-mini">bloom.</span></div><div class="collection-meta"><div><h2>Room to grow</h2><p>Brand identity / Product design</p></div><span>↗</span></div></a><a class="collection-card" href="#about"><div class="collection-art purple">${scene('orbit')}</div><div class="collection-meta"><div><h2>In good shape</h2><p>Creative coding / Experiments</p></div><span>↗</span></div></a><a class="collection-card card-wide" href="#about"><div class="collection-art green">${scene('star')}<div class="wide-art-copy">Ideas deserve<br>a little space.</div></div><div class="collection-meta"><div><h2>Offscript studio</h2><p>Web design / Development</p></div><span>↗</span></div></a></div><section class="c-about" id="about"><h2>A curious mind.<br>A hands-on approach.</h2><p>I’m Oakkar. I combine design and code to make useful things with a point of view. This collection is a small window into that world.</p><a href="mailto:hello@example.com">Let’s make something together ↗</a></section><footer><span>© 2026 Oakkar</span><span>STAY CURIOUS.</span></footer></section></div>`; }
function current() { const v = new URLSearchParams(location.search).get('variant'); return variants.includes(v) ? v : 'A'; }
function render() {
  disposeScenes.forEach(fn => fn()); disposeScenes = [];
  const v = current(); document.body.dataset.variant = v;
  app.innerHTML = ({A:VariantA,B:VariantB,C:VariantC}[v])();
  document.querySelector('#prototype-switcher')?.remove();
  if (import.meta.env.DEV) {
    const bar = document.createElement('div'); bar.id = 'prototype-switcher'; bar.innerHTML = `<span class="prototype-tag">PROTOTYPE</span><button aria-label="Previous variant">←</button><div class="switcher-label"><strong>${v} — ${names[v]}</strong><small>${variants.indexOf(v)+1} OF 3 · USE ← → TO EXPLORE</small></div><button aria-label="Next variant">→</button>`;
    document.body.append(bar); const buttons = bar.querySelectorAll('button'); buttons[0].onclick=()=>change(-1); buttons[1].onclick=()=>change(1);
  }
  document.querySelectorAll('[data-scene]').forEach(el => disposeScenes.push(buildScene(el)));
}
function change(step) { const url = new URL(location.href); url.searchParams.set('variant', variants[(variants.indexOf(current())+step+3)%3]); history.pushState({},'',url); render(); window.scrollTo(0,0); }
window.addEventListener('popstate',render);
window.addEventListener('keydown', e=>{ if(e.target.closest('input,textarea,select,[contenteditable]'))return; if(e.key==='ArrowRight'||e.key==='ArrowLeft'){ e.preventDefault(); change(e.key==='ArrowRight'?1:-1); } });

function buildScene(el) {
  const type = el.dataset.scene;
  const renderer = new THREE.WebGLRenderer({alpha:true, antialias:true}); renderer.setPixelRatio(Math.min(devicePixelRatio,2)); renderer.shadowMap.enabled=true; renderer.shadowMap.type=THREE.PCFSoftShadowMap; renderer.outputColorSpace=THREE.SRGBColorSpace; el.append(renderer.domElement);
  const world=new THREE.Scene(); const camera=new THREE.PerspectiveCamera(33,1,.1,100); camera.position.set(0,1,9); camera.lookAt(0,0,0);
  world.add(new THREE.HemisphereLight(0xffffff,0x8d7b92,2.8)); const light=new THREE.DirectionalLight(0xfff5e4,4); light.position.set(-3,6,5); light.castShadow=true; light.shadow.mapSize.set(1024,1024); world.add(light); const rim=new THREE.DirectionalLight(0xd6dbff,3); rim.position.set(4,2,-3); world.add(rim);
  const group=new THREE.Group(); world.add(group);
  const material=(color,roughness=.35,metalness=0)=>new THREE.MeshStandardMaterial({color,roughness,metalness});
  const mesh=(geo,mat,pos=[0,0,0],scale=[1,1,1])=>{const m=new THREE.Mesh(geo,mat);m.position.set(...pos);m.scale.set(...scale);m.castShadow=true;m.receiveShadow=true;group.add(m);return m;};
  const sphere=(r,mat,pos,scale)=>mesh(new THREE.SphereGeometry(r,48,32),mat,pos,scale);
  if(type==='character') {
    group.add(createCharacter());
  } else if(type==='bloom') {
    const center=material(0xf5b640,.45);sphere(.48,center,[0,0,.25],[1,1,.55]);
    for(let i=0;i<8;i++){const a=i/8*Math.PI*2;const petal=sphere(.48,material(0xffe9a1,.42),[Math.cos(a)*.78,Math.sin(a)*.78,0],[.75,1.3,.6]);petal.rotation.z=a-Math.PI/2;}
    group.rotation.set(.1,-.25,-.17);
  } else if(type==='orbit'||type==='chrome') {
    const mat=material(type==='chrome'?0xc2a7ff:0x8260c8,type==='chrome'?.19:.28,type==='chrome'?.65:.12);
    for(let i=0;i<3;i++){const ring=mesh(new THREE.TorusGeometry(1.18,.245,32,96),mat);ring.rotation.set(i*Math.PI/3+.35,i*Math.PI/3+.4,.3);}
    sphere(.56,material(type==='chrome'?0xb3ff75:0xf5bb81,.25,.16));group.rotation.z=-.25;
  } else {
    const mat=material(0xd8ee7b,.32);sphere(.55,mat);
    for(let i=0;i<6;i++){const a=i/6*Math.PI*2;const m=mesh(new THREE.CapsuleGeometry(.22,.72,8,24),mat,[Math.sin(a)*.7,Math.cos(a)*.7,0]);m.rotation.z=-a;}
    group.rotation.set(.3,-.35,.18);
  }
  const floor=new THREE.Mesh(new THREE.PlaneGeometry(20,20),new THREE.ShadowMaterial({opacity:type==='character'?0:.13}));floor.rotation.x=-Math.PI/2;floor.position.y=type==='character'?-1.7:-1.6;floor.receiveShadow=true;world.add(floor);
  let width=0,height=0;const resize=()=>{width=el.clientWidth;height=el.clientHeight;renderer.setSize(width,height);camera.aspect=width/height;camera.position.z=type==='character'?5.6:8;if(type==='character')camera.lookAt(0,.45,0);camera.updateProjectionMatrix();}; const observer=new ResizeObserver(resize);observer.observe(el);resize();
  let px=0,py=0;const pointer=e=>{const r=el.getBoundingClientRect();px=(e.clientX-r.left)/r.width-.5;py=(e.clientY-r.top)/r.height-.5;};const reset=()=>{px=0;py=0;};el.addEventListener('pointermove',pointer);el.addEventListener('pointerleave',reset);
  const baseY=group.rotation.y,baseX=group.rotation.x; const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;let frame;const start=performance.now();
  function animate(now){frame=requestAnimationFrame(animate);const t=(now-start)/1000;group.rotation.y+=(baseY+px*.35+(reduced?0:Math.sin(t*.45)*.07)-group.rotation.y)*.06;group.rotation.x+=(baseX+py*.18-group.rotation.x)*.06;group.position.y=reduced?0:Math.sin(t*1.1)*.065;renderer.render(world,camera);}frame=requestAnimationFrame(animate);
  return ()=>{cancelAnimationFrame(frame);observer.disconnect();el.removeEventListener('pointermove',pointer);el.removeEventListener('pointerleave',reset);world.traverse(obj=>{obj.geometry?.dispose();if(obj.material)obj.material.dispose();});renderer.dispose();};
}
render();
