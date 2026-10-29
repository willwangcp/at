/* AtomTrans. No libraries, no remote requests, no build step. */
(() => {
  'use strict';
  const en = {
    skip:'Skip to content', navLabel:'Main navigation', navPlatform:'Simulation Platform', navCapabilities:'Software Features', navResearch:'Research Example', navFilm:'Introduction Video',
    themeLabel:'Appearance', lightLabel:'Light theme', darkLabel:'Dark theme', mobileNavLabel:'Quick navigation', filmLanguageLabel:'Video language',
    hero1:'From atoms.', hero2:'To device insight.',
    heroBody:'A quantum transport simulation platform built on plane-wave calculations and Wannier-basis Hamiltonians. Connect microscopic electronic structure with electrical response—and explore the limits of semiconductor devices.',
    watchFilm:'Watch introduction', explore:'Explore the platform',
    heroAlt:'Conceptual illustration of an atomic transport channel between two electrodes', heroCaption:'Atomistic transport · conceptual illustration',
    heroBaseline:'From microscopic atomic structure to semiconductor device performance.', scrollLabel:'Explore the page',
    filmEyebrow:'01 / MEET ATOMTRANS', filmTitle:'Start with an atom. See further.',
    filmBody:'A short introduction to a connected research experience, from device modeling to transport analysis.',
    filmEdition:'English introduction', videoLabel:'AtomTrans English introduction', playLabel:'Play the introduction',
    videoFallback:'Your browser does not support video playback. Download the film to watch it.',
    filmCaption:'Real software. Actual calculation examples.', downloadFilm:'Download film',
    videoError:'The film could not be played. Use the download link to open the included MP4 file.',
    platformTitle1:'Microscopic mechanisms.', platformTitle2:'Visible insight.',
    platformBody:'Build devices, define electrodes and channels, monitor calculations, and compare transport results in one scientific workspace. Keep every analysis connected to the underlying atomic structure.',
    workspaceLabel:'Software views', tabDevice:'3D device modeling', tabTransmission:'Transmission analysis', tabIV:'Current response',
    enlargeLabel:'Enlarge the software interface', enlarge:'Expand view',
    workspaceDevice:'Au–BDT–Au molecular junction · 3D view of electrodes and the central region', actualInterface:'ACTUAL SOFTWARE INTERFACE',
    method1:'Plane-wave first principles', method1Body:'Describe the electronic structure of a material, starting from its atomic configuration.',
    method2:'Wannier-basis Hamiltonians', method2Body:'Construct a localized representation through Wannierization, connecting electronic structure to transport.',
    method3:'Nonequilibrium Green’s functions', method3Body:'Analyze quantum transport with open boundaries to obtain transmission and current response.',
    capTitle:'One platform. More dimensions.', capBody:'From molecular junctions and nanowires to two-dimensional semiconductors, bring materials, contacts, and device behavior into one research perspective.',
    cap1:'Atomistic device modeling', cap1Body:'Define electrodes, central regions, channels, and boundaries in a three-dimensional workspace.',
    cap2:'Bias and gate response', cap2Body:'Set up gates and dielectric regions. Explore electrical response through current and transmission.',
    cap3:'Spin & superconductivity', cap3Body:'Explore spin-resolved electronic transport and transport behavior in superconducting systems.',
    cap4:'Phonons & heat', cap4Body:'From phonons to thermoelectric response, examine how energy moves through a device.',
    cap5:'Semiclassical transport', cap5Body:'Study band-related material transport properties through semiclassical transport workflows.',
    cap6:'Learned Hamiltonians', cap6Body:'Extend atomistic transport research with machine-learned Hamiltonian workflows.',
    researchTitle:'Bring transport mechanisms into focus.', researchBody:'Transmission spectra, local densities of states, and current curves offer complementary views of microscopic mechanisms.',
    researchLabel:'Research examples', chainTab:'Au atomic chain',
    caseBdtCategory:'MOLECULAR JUNCTION', caseBdtTitle:'From molecular contacts\nto current response.',
    caseBdtBody:'For an Au–BDT–Au molecular junction, combine transmission spectra and I–V curves to examine the relationship between contacts, electronic states, and device transport.',
    viewResult:'Explore the calculation', resultZoom:'Enlarge the calculation result',
    caseNote:'Actual AtomTrans calculation examples. Each result corresponds to its own structure and computational settings.',
    closing1:'Connect electronic structure.', closing2:'Understand device transport.',
    footer:'Plane-wave and Wannier-basis quantum transport', backTop:'Back to top ↑',
    dialogLabel:'Expanded software view', closeLabel:'Close expanded view'
  };
  const translated = [...document.querySelectorAll('[data-i18n]')];
  const accessible = [...document.querySelectorAll('[data-aria]')];
  const altNodes = [...document.querySelectorAll('[data-alt]')];
  const zh = {};
  translated.forEach(node => { zh[node.dataset.i18n] = node.textContent.trim(); });
  accessible.forEach(node => { zh[node.dataset.aria] = node.getAttribute('aria-label'); });
  altNodes.forEach(node => { zh[node.dataset.alt] = node.alt; });
  const strings = { zh, en };
  let language = 'zh';
  let workspace = 'device';
  let researchCase = 'bdt';
  let theme = 'dark';
  const video = document.getElementById('product-video');
  const playButton = document.getElementById('video-play');
  const videoError = document.getElementById('video-error');
  const dialog = document.getElementById('image-dialog');
  const workspaceImage = document.getElementById('workspace-image');
  const caseImage = document.getElementById('case-image');
  function setTheme(next) {
    if(next!=='dark'&&next!=='light')return;
    theme=next;
    document.documentElement.dataset.theme=theme;
    document.querySelector('meta[name="theme-color"]').content=theme==='light'?'#f6f7f2':'#080c10';
    document.querySelector('.hero-art img').src=theme==='light'?'assets/hero-device-light.svg':'assets/hero-device.svg';
    document.querySelectorAll('[data-theme-choice]').forEach(button=>{
      const active=button.dataset.themeChoice===theme;
      button.classList.toggle('active',active);
      button.setAttribute('aria-pressed',String(active));
    });
    try{localStorage.setItem('atomtrans-theme',theme);}catch(_error){/* file:// storage may be restricted. */}
  }
  document.querySelectorAll('[data-theme-choice]').forEach(button=>button.addEventListener('click',()=>setTheme(button.dataset.themeChoice)));
  try{setTheme(localStorage.getItem('atomtrans-theme')||'dark');}catch(_error){setTheme('dark');}
  const workspaces = {
    device: { image:'assets/device.webp', zh:'Au–BDT–Au 分子结 · 电极与中心区的三维结构视图', en:'Au–BDT–Au molecular junction · 3D view of electrodes and the central region' },
    transmission: { image:'assets/transmission.webp', zh:'Au–BDT–Au 分子结 · 透射谱与参考结果对比', en:'Au–BDT–Au molecular junction · transmission spectra and reference comparison' },
    iv: { image:'assets/iv.webp', zh:'Au–BDT–Au 分子结 · 电流–电压特性与参考结果对比', en:'Au–BDT–Au molecular junction · current–voltage characteristics and reference comparison' }
  };
  const cases = {
    bdt: { image:'assets/iv.webp', tags:['Transmission','I–V'], zh:{ category:'MOLECULAR JUNCTION', title:'从分子接触，\n到电流响应。', body:zh.caseBdtBody, alt:'Au–BDT–Au 分子结的 I–V 曲线与参考结果对比' }, en:{ category:'MOLECULAR JUNCTION', title:en.caseBdtTitle, body:en.caseBdtBody, alt:'I–V curves and reference comparison for an Au–BDT–Au molecular junction' } },
    co: { image:'assets/ldos.webp', tags:['Spin-resolved','LDOS'], zh:{category:'SPIN-RESOLVED TRANSPORT',title:'一个杂质原子，\n不同的自旋视角。',body:'在含 Co 杂质的 Au 原子链中，通过自旋分辨的局域态密度，观察不同自旋电子态沿输运方向的空间分布。',alt:'Au–Co–Au 体系在 E−EF = −1 eV 处的自旋分辨局域态密度'},en:{category:'SPIN-RESOLVED TRANSPORT',title:'One impurity.\nA different spin perspective.',body:'For an Au atomic chain containing a Co impurity, spin-resolved local densities of states reveal how electronic states are distributed along the transport direction.',alt:'Spin-resolved local density of states of Au–Co–Au at E−EF = −1 eV'} },
    chain: { image:'assets/md-transport.webp',tags:['MD–Landauer','Transmission'],zh:{category:'ATOMIC DYNAMICS & TRANSPORT',title:'结构在变化，\n输运随之而动。',body:'对比 Au 原子链的静态透射与分子动力学构型下的透射分布，观察结构涨落对电子输运的影响。',alt:'Au 原子链的静态透射、分子动力学平均透射与构型间分布'},en:{category:'ATOMIC DYNAMICS & TRANSPORT',title:'Structures fluctuate.\nTransport responds.',body:'Compare static transmission with transmission across molecular-dynamics configurations of an Au atomic chain to examine the effect of structural fluctuations.',alt:'Static transmission, molecular-dynamics mean transmission, and frame spread for an Au atomic chain'} }
  };

  function renderWorkspace() {
    const item = workspaces[workspace];
    workspaceImage.src = item.image;
    workspaceImage.alt = item[language];
    document.getElementById('workspace-caption').textContent = item[language];
    document.getElementById('workspace-panel').setAttribute('aria-labelledby', 'tab-' + workspace);
    document.querySelectorAll('[data-workspace]').forEach(button => {
      const active = button.dataset.workspace === workspace;
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
    });
  }
  function renderCase() {
    const item = cases[researchCase];
    const copy = item[language];
    caseImage.src = item.image;
    caseImage.alt = copy.alt;
    document.getElementById('case-category').textContent = copy.category;
    document.getElementById('case-title').textContent = copy.title;
    document.getElementById('case-body').textContent = copy.body;
    const tags = document.getElementById('case-tags');
    tags.replaceChildren(...item.tags.map(text => {const span = document.createElement('span');span.textContent = text;return span;}));
    document.getElementById('case-panel').setAttribute('aria-labelledby', 'case-' + researchCase);
    document.querySelectorAll('[data-case]').forEach(button => {
      const active = button.dataset.case === researchCase;
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
    });
  }
  function setLanguage(next) {
    if (!strings[next] || next === language) return;
    const wasPlaying = !video.paused && !video.ended;
    video.pause();
    language = next;
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    const copy = strings[language];
    translated.forEach(node => { node.textContent = copy[node.dataset.i18n] || zh[node.dataset.i18n]; });
    accessible.forEach(node => { node.setAttribute('aria-label', copy[node.dataset.aria] || zh[node.dataset.aria]); });
    altNodes.forEach(node => { node.alt = copy[node.dataset.alt] || zh[node.dataset.alt]; });
    document.querySelectorAll('[data-lang]').forEach(button => {
      const active = button.dataset.lang === language;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    document.title = language === 'zh' ? 'AtomTrans — 从原子结构到器件性能' : 'AtomTrans — From atoms to device insight';
    document.querySelector('meta[name="description"]').content = language === 'zh' ? zh.heroBody : en.heroBody;
    const suffix = language === 'zh' ? 'cn' : 'en';
    video.poster = 'assets/video/poster-' + suffix + '.jpg';
    video.src = 'assets/video/atomtrans-' + suffix + '.mp4';
    video.load();
    document.getElementById('video-download').href = 'assets/video/atomtrans-' + suffix + '.mp4';
    document.getElementById('film-duration').textContent = language === 'zh' ? '01:11' : '01:20';
    playButton.hidden = false;
    videoError.hidden = true;
    renderWorkspace();
    renderCase();
    if (wasPlaying) playFilm();
  }
  function playFilm() {
    if (video.ended) video.currentTime = 0;
    const result = video.play();
    if (result && result.catch) result.catch(() => { playButton.hidden = false; });
  }
  document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.lang)));
  playButton.addEventListener('click', playFilm);
  video.addEventListener('play', () => { playButton.hidden = true;videoError.hidden = true; });
  video.addEventListener('ended', () => { playButton.hidden = false; });
  video.addEventListener('error', () => { videoError.hidden = false; });
  document.querySelectorAll('[data-play-film]').forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    document.getElementById('film').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
    playFilm();
  }));
  document.querySelectorAll('[data-workspace]').forEach(button => button.addEventListener('click', () => {workspace=button.dataset.workspace;renderWorkspace();}));
  document.querySelectorAll('[data-case]').forEach(button => button.addEventListener('click', () => {researchCase=button.dataset.case;renderCase();}));
  document.querySelectorAll('[role="tablist"]').forEach(list => list.addEventListener('keydown', event => {
    const tabs=[...list.querySelectorAll('[role="tab"]')];
    const index=tabs.indexOf(document.activeElement);
    if(index<0)return;
    let next;
    if(event.key==='ArrowRight')next=(index+1)%tabs.length;
    else if(event.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;
    else if(event.key==='Home')next=0;
    else if(event.key==='End')next=tabs.length-1;
    else return;
    event.preventDefault();tabs[next].focus();tabs[next].click();
  }));
  function showImage(src, caption) {
    document.getElementById('dialog-image').src = src;
    document.getElementById('dialog-image').alt = caption;
    document.getElementById('dialog-caption').textContent = caption;
    if (typeof dialog.showModal === 'function') {dialog.showModal();document.body.style.overflow='hidden';}
    else {window.open(src, '_blank', 'noopener');}
  }
  document.getElementById('workspace-zoom').addEventListener('click', () => showImage(workspaces[workspace].image,workspaces[workspace][language]));
  const showCase = () => showImage(cases[researchCase].image,cases[researchCase][language].alt);
  document.getElementById('case-zoom').addEventListener('click', showCase);
  document.getElementById('case-image-zoom').addEventListener('click', showCase);
  document.getElementById('dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {document.body.style.overflow='';});
  dialog.addEventListener('click', event => {
    if (event.target!==dialog)return;
    const r=dialog.getBoundingClientRect();
    if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();
  });
  // Visible content remains accessible if scripting or motion support is absent.
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('js-motion');
    const observer=new IntersectionObserver(entries => entries.forEach(entry => {
      if(entry.isIntersecting){entry.target.classList.add('revealed');observer.unobserve(entry.target);}
    }),{threshold:.06});
    document.querySelectorAll('.section-heading,.method-strip,.capability-grid article,.closing').forEach(node=>{node.classList.add('reveal');observer.observe(node);});
  }
})();
