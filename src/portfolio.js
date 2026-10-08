// Selected direction: sidebar introduction and a collection of projects.
// The original design variants are preserved on prototype/portfolio-variants.
import './style.css';
import * as THREE from 'three';
import { repositories } from './github-repositories.js';

const app = document.querySelector('#app');
let disposeScenes = [];
const status = '<span class="status"><i></i> Currently learning &amp; building</span>';
const scene = (type, className = '') => type === 'character'
  ? `<div class="scene portrait ${className}"><img src="/images/oakkar-character-v2.png" alt="Full-length stylized character of Oakkar with curly hair, silver glasses, a black hoodie, and black sneakers" width="1122" height="1402" fetchpriority="high" /></div>`
  : `<div class="scene ${className}" data-scene="${type}" role="img" aria-label="Interactive stylized 3D ${type}"></div>`;
const projects = [
  { name: 'Poker helper', status: 'In progress', description: 'My friends and I had cards, but no chips or cash. So I’m figuring out a digital stand-in: track virtual chips and results with one person managing the table, or everyone joining on their own phone.', detail: 'Early design stage · No demo yet', object: 'star', color: 'purple' },
  { name: 'SSH manager', status: 'Private tool', description: 'Remembering server IPs, usernames, and key files got old. This CLI reads a JSON config so I can connect with one command: sshm server_alias.', detail: 'A small tool I actually use', object: 'orbit', color: 'peach' },
  { name: 'Home server', status: 'Personal setup', description: 'An old laptop now runs long agent tasks so my everyday laptop doesn’t have to. T3 helps me manage Codex and OpenCode; Hermes handles research and server setup, with Tailscale for access when I’m out.', detail: 'Hermes / Codex / OpenCode / T3 / Tailscale', object: 'bloom', color: 'green' },
  { name: 'AkashaLearn', status: 'Archived', description: 'I built an AI lesson app to learn Go and experiment with LLM integration. It’s no longer maintained and the app is offline, but the code is still around.', detail: 'Go / React / LLM integration · View code', url: 'https://github.com/okhay-p/akasha-client', object: 'orbit', color: 'purple' },
];
function ProjectCard(project) {
  const tag = project.url ? 'a' : 'article';
  const attributes = project.url ? ` href="${project.url}" target="_blank" rel="noopener noreferrer"` : '';
  return `<${tag} class="collection-card"${attributes}><div class="collection-art ${project.color}">${scene(project.object)}<span class="project-status">${project.status}</span></div><div class="collection-meta"><div><h2>${project.name}</h2><p>${project.detail}</p></div>${project.url ? '<span aria-hidden="true">↗</span>' : ''}</div><p class="project-description">${project.description}</p></${tag}>`;
}
const escape = text => String(text).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const githubLink = '<a class="github-profile" href="https://github.com/okhay-p" target="_blank" rel="noopener noreferrer">More on GitHub ↗</a>';
function Skills() {
  return `<section class="skills-section" id="skills"><div class="eyebrow">HOW I BUILD</div><div class="skills-intro"><h2>A curious mind.<br>A practical toolkit.</h2><p>Code, craft, and AI-assisted development.</p></div><div class="skills-groups"><div><h3>Development</h3><div class="skill-tags">${['TypeScript','React','Astro','Go','Python'].map(name=>`<span>${name}</span>`).join('')}</div></div><div><h3>AI-assisted development</h3><div class="skill-tags agent-tags">${['Hermes','OpenCode','Codex'].map((name,i)=>`<span><i aria-hidden="true">${['✳','⌘','›_'][i]}</i>${name}</span>`).join('')}</div></div></div></section>`;
}
function RepositoryList() {
  return `<section class="repository-section" id="repositories"><div class="section-heading"><h2>Public repositories <span>/ ${repositories.length}</span></h2>${githubLink}</div><div class="repo-list">${repositories.map(repo=>`<a href="${escape(repo.url)}" target="_blank" rel="noopener noreferrer"><span class="repo-name">${escape(repo.name)}${repo.isFork?'<small>FORK</small>':''}</span><span class="repo-language">${escape(repo.primaryLanguage?.name || 'Resources')}</span><span aria-hidden="true">↗</span></a>`).join('')}</div></section>`;
}
function Portfolio() {
  return `<div class="c-layout"><aside class="c-sidebar"><a class="wordmark" href="/">oakkar<span class="brand-dot">®</span></a><div><span class="eyebrow">DEVELOPER. BUILDER.<br>OCCASIONAL DAYDREAMER.</span><h1>Small tools.<br>Just because.</h1><p>First-year Computer Science student at Singapore Management University. Learning by building.</p>${status}</div><div class="c-sidebar-bottom"><a href="#about">A bit about me ↗</a><a href="#skills">My toolkit ↗</a><a href="https://www.linkedin.com/in/oakkarphyo/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="https://github.com/okhay-p" target="_blank" rel="noopener noreferrer">GitHub ↗</a><span>LEARNING / BUILDING / EXPLORING</span></div></aside><section class="c-content" id="work"><div class="c-heading"><span>THE COLLECTION</span><span>SMALL TOOLS & SIDE QUESTS</span></div><div class="collection"><div class="collection-card card-large"><div class="collection-art blue">${scene('character')}<span class="collection-sticker">A LITTLE HUMAN TOUCH</span></div><div class="collection-meta"><div><h2>Hello, I’m Oakkar.</h2><p>Learning things. Making things. Mostly because I can.</p></div></div></div>${projects.map(ProjectCard).join('')}</div>${Skills()}${RepositoryList()}<section class="c-about" id="about"><h2>A curious mind.<br>A hands-on approach.</h2><p>I’m Oakkar, a first-year Computer Science student at Singapore Management University. I build small tools, learn things along the way, and occasionally make life a little easier. Mostly because I can.</p><p>Outside of code, I play football. I also used to make 3D models and animations—some of that past life lives on Instagram.</p><a class="instagram-card" href="https://www.instagram.com/noooidea.creative/" target="_blank" rel="noopener noreferrer" aria-label="See my past 3D models and animations on Instagram"><img src="/images/instagram-creative-card-v1.png" alt="A miniature gallery inspired by my 3D renders: a riverside shop, snowman, moon-and-stars switch, and framed abstract print" width="1536" height="1024" loading="lazy" /><div class="instagram-card-caption"><div><h3>A past life in polygons.</h3><span>@noooidea.creative · 3D & animation</span></div><span aria-hidden="true">↗</span></div></a><div class="about-socials"><a class="github-profile" href="https://www.linkedin.com/in/oakkarphyo/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>${githubLink}</div></section><footer><span>© 2026 Oakkar</span><span>STAY CURIOUS.</span></footer></section></div>`;
}
function render() {
  disposeScenes.forEach(dispose => dispose());
  disposeScenes = [];
  app.innerHTML = Portfolio();
  document.querySelectorAll('[data-scene]').forEach(el => disposeScenes.push(buildScene(el)));
}
window.addEventListener('pagehide', () => disposeScenes.forEach(dispose => dispose()));
if (import.meta.hot) import.meta.hot.dispose(() => disposeScenes.forEach(dispose => dispose()));

function buildScene(el) {
  const type = el.dataset.scene;
  const renderer = new THREE.WebGLRenderer({alpha:true, antialias:true}); renderer.setPixelRatio(Math.min(devicePixelRatio,2)); renderer.shadowMap.enabled=true; renderer.shadowMap.type=THREE.PCFSoftShadowMap; renderer.outputColorSpace=THREE.SRGBColorSpace; el.append(renderer.domElement);
  const world=new THREE.Scene(); const camera=new THREE.PerspectiveCamera(33,1,.1,100); camera.position.set(0,1,9); camera.lookAt(0,0,0);
  world.add(new THREE.HemisphereLight(0xffffff,0x8d7b92,2.8)); const light=new THREE.DirectionalLight(0xfff5e4,4); light.position.set(-3,6,5); light.castShadow=true; light.shadow.mapSize.set(1024,1024); world.add(light); const rim=new THREE.DirectionalLight(0xd6dbff,3); rim.position.set(4,2,-3); world.add(rim);
  const group=new THREE.Group(); world.add(group);
  const material=(color,roughness=.35,metalness=0)=>new THREE.MeshStandardMaterial({color,roughness,metalness});
  const mesh=(geo,mat,pos=[0,0,0],scale=[1,1,1])=>{const m=new THREE.Mesh(geo,mat);m.position.set(...pos);m.scale.set(...scale);m.castShadow=true;m.receiveShadow=true;group.add(m);return m;};
  const sphere=(r,mat,pos,scale)=>mesh(new THREE.SphereGeometry(r,48,32),mat,pos,scale);
  if(type==='bloom') {
    const center=material(0xf5b640,.45);sphere(.48,center,[0,0,.25],[1,1,.55]);
    for(let i=0;i<8;i++){const a=i/8*Math.PI*2;const petal=sphere(.48,material(0xffe9a1,.42),[Math.cos(a)*.78,Math.sin(a)*.78,0],[.75,1.3,.6]);petal.rotation.z=a-Math.PI/2;}
    group.rotation.set(.1,-.25,-.17);
  } else if(type==='orbit') {
    const mat=material(0x8260c8,.28,.12);
    for(let i=0;i<3;i++){const ring=mesh(new THREE.TorusGeometry(1.18,.245,32,96),mat);ring.rotation.set(i*Math.PI/3+.35,i*Math.PI/3+.4,.3);}
    sphere(.56,material(0xf5bb81,.25,.16));group.rotation.z=-.25;
  } else {
    const mat=material(0xd8ee7b,.32);sphere(.55,mat);
    for(let i=0;i<6;i++){const a=i/6*Math.PI*2;const m=mesh(new THREE.CapsuleGeometry(.22,.72,8,24),mat,[Math.sin(a)*.7,Math.cos(a)*.7,0]);m.rotation.z=-a;}
    group.rotation.set(.3,-.35,.18);
  }
  const floor=new THREE.Mesh(new THREE.PlaneGeometry(20,20),new THREE.ShadowMaterial({opacity:.13}));floor.rotation.x=-Math.PI/2;floor.position.y=-1.6;floor.receiveShadow=true;world.add(floor);
  let width=0,height=0;const resize=()=>{width=el.clientWidth;height=el.clientHeight;renderer.setSize(width,height);camera.aspect=width/height;camera.position.z=8;camera.updateProjectionMatrix();}; const observer=new ResizeObserver(resize);observer.observe(el);resize();
  let px=0,py=0;const pointer=e=>{const r=el.getBoundingClientRect();px=(e.clientX-r.left)/r.width-.5;py=(e.clientY-r.top)/r.height-.5;};const reset=()=>{px=0;py=0;};el.addEventListener('pointermove',pointer);el.addEventListener('pointerleave',reset);
  const baseY=group.rotation.y,baseX=group.rotation.x; const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;let frame;const start=performance.now();
  function animate(now){frame=requestAnimationFrame(animate);const t=(now-start)/1000;group.rotation.y+=(baseY+px*.35+(reduced?0:Math.sin(t*.45)*.07)-group.rotation.y)*.06;group.rotation.x+=(baseX+py*.18-group.rotation.x)*.06;group.position.y=reduced?0:Math.sin(t*1.1)*.065;renderer.render(world,camera);}frame=requestAnimationFrame(animate);
  return ()=>{cancelAnimationFrame(frame);observer.disconnect();el.removeEventListener('pointermove',pointer);el.removeEventListener('pointerleave',reset);world.traverse(obj=>{obj.geometry?.dispose();if(obj.material)obj.material.dispose();});renderer.dispose();};
}
render();
