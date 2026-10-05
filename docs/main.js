import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

const REPO = "fftfaisal/jarvisql-releases";
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("scrolled", scrollY > 8);
onScroll();
addEventListener("scroll", onScroll, { passive: true });

const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    }
  },
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.setProperty("--d", `${(i % 6) * 0.07}s`);
  io.observe(el);
});

function detectOs() {
  const ua = navigator.userAgent;
  if (/Windows/i.test(ua)) return "windows";
  if (/Android|iPhone|iPad/i.test(ua)) return "";
  if (/Mac/i.test(ua)) return "mac-arm";
  if (/Linux|X11/i.test(ua)) return "linux";
  return "";
}

const PICK = {
  windows: (n) => /setup\.exe$/i.test(n),
  "mac-arm": (n) => /aarch64\.dmg$/i.test(n),
  "mac-intel": (n) => /x64\.dmg$/i.test(n),
  linux: (n) => /\.AppImage$/i.test(n),
};
const NAMES = { windows: "Windows", "mac-arm": "macOS", "mac-intel": "macOS", linux: "Linux" };

async function loadRelease() {
  const os = detectOs();
  document.querySelector(`.dl[data-os="${os}"]`)?.classList.add("mine");
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`);
    if (!res.ok) throw new Error(String(res.status));
    const release = await res.json();
    const version = String(release.tag_name ?? "").replace(/^v/, "");
    if (version) {
      document.getElementById("hero-version").textContent = `Version ${version}`;
      document.getElementById("dl-sub").textContent = `Version ${version}. Free to download.`;
    }
    for (const [key, test] of Object.entries(PICK)) {
      const asset = release.assets?.find((a) => test(a.name));
      const link = document.querySelector(`.dl[data-os="${key}"]`);
      if (asset && link) link.href = asset.browser_download_url;
    }
    const mine = os && document.querySelector(`.dl[data-os="${os}"]`);
    if (mine && mine.href.includes("/download/")) {
      const button = document.getElementById("hero-download");
      button.href = mine.href;
      button.textContent = `Download for ${NAMES[os]}`;
      document.getElementById("hero-note").textContent = `Version ${version} · Windows, macOS and Linux`;
    }
  } catch {
    document.getElementById("hero-version").textContent = "Latest release";
  }
}
loadRelease();

function scene() {
  const canvas = document.getElementById("scene");
  const host = document.getElementById("art");
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  } catch {
    return;
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  const sceneObj = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 0.6, 8);

  const rig = new THREE.Group();
  sceneObj.add(rig);

  const blue = new THREE.Color("#3b82f6");
  const cyan = new THREE.Color("#22d3ee");
  const disks = [];
  for (let i = 0; i < 3; i++) {
    const geo = new THREE.CylinderGeometry(1.7, 1.7, 0.62, 56, 1);
    const fill = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: blue, transparent: true, opacity: 0.1 }));
    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(geo, 20),
      new THREE.LineBasicMaterial({ color: i === 1 ? cyan : blue, transparent: true, opacity: 0.9 }),
    );
    const disk = new THREE.Group();
    disk.add(fill, edges);
    disk.position.y = (1 - i) * 1.25;
    rig.add(disk);
    disks.push(disk);
  }

  const rings = [];
  for (let i = 0; i < 2; i++) {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.55 + i * 0.35, 0.012, 8, 120),
      new THREE.MeshBasicMaterial({ color: cyan, transparent: true, opacity: 0.45 - i * 0.2 }),
    );
    ring.rotation.x = Math.PI / 2.2;
    rig.add(ring);
    rings.push(ring);
  }

  const count = 520;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = 3 + Math.random() * 2.6;
    const t = Math.random() * Math.PI * 2;
    const y = (Math.random() - 0.5) * 6;
    positions[i * 3] = Math.cos(t) * r;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = Math.sin(t) * r;
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const dust = new THREE.Points(
    dustGeo,
    new THREE.PointsMaterial({ color: cyan, size: 0.035, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false }),
  );
  rig.add(dust);

  const packets = [];
  for (let i = 0; i < 9; i++) {
    const p = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 12), new THREE.MeshBasicMaterial({ color: "#ffffff" }));
    const angle = (i / 9) * Math.PI * 2;
    p.userData = { angle, radius: 1.1 + (i % 3) * 0.2, speed: 0.35 + (i % 4) * 0.08, phase: i * 0.7 };
    rig.add(p);
    packets.push(p);
  }

  const pointer = { x: 0, y: 0 };
  addEventListener("pointermove", (e) => {
    pointer.x = (e.clientX / innerWidth - 0.5) * 2;
    pointer.y = (e.clientY / innerHeight - 0.5) * 2;
  });

  function resize() {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
  resize();
  new ResizeObserver(resize).observe(host);

  let visible = true;
  new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(host);

  const clock = new THREE.Clock();
  function frame() {
    requestAnimationFrame(frame);
    if (!visible || document.hidden) return;
    const t = clock.getElapsedTime();
    const k = reduced ? 0 : 1;
    rig.rotation.y = t * 0.22 * k + pointer.x * 0.35;
    rig.rotation.x = 0.28 + pointer.y * 0.12;
    rig.position.y = Math.sin(t * 0.8) * 0.12 * k;
    disks.forEach((d, i) => {
      d.position.y = (1 - i) * (1.25 + Math.sin(t * 0.9 + i) * 0.06 * k);
    });
    rings.forEach((r, i) => (r.rotation.z = t * (0.25 + i * 0.12) * k));
    dust.rotation.y = -t * 0.05 * k;
    packets.forEach((p) => {
      const d = p.userData;
      const a = d.angle + t * d.speed * k;
      p.position.set(Math.cos(a) * 1.9, ((((t * 0.5 * k + d.phase) % 4) + 4) % 4) - 2, Math.sin(a) * 1.9);
      p.scale.setScalar(0.6 + Math.abs(Math.sin(t * 2 + d.phase)) * 0.8);
    });
    renderer.render(sceneObj, camera);
  }
  frame();
}
scene();
