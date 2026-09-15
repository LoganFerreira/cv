(() => {
  const file = window.location.pathname.split('/').pop();
  const timelines = {
    professional: {
      accent: '#60a5fa',
      page: 'parcours-professionnel.html',
      entries: [
        ['legrand-performance.html', '2025 - 2028', 'Chef de projet performance'],
        ['legrand-developpeur.html', '2024 - 2025', 'Concepteur développeur'],
        ['medipole.html', '2024', 'Projet biomédical']
      ]
    },
    academic: {
      accent: '#34d399',
      page: 'parcours-academique.html',
      entries: [
        ['3il-ingenieur.html', '2025 - 2028', 'Diplôme ingénieur'],
        ['unilim-but.html', '2024 - 2025', 'BUT Informatique'],
        ['unilim-dut.html', '2022 - 2024', 'DUT Informatique'],
        ['lycee-turgot.html', '2019 - 2022', 'Baccalauréat']
      ]
    },
    association: {
      accent: '#c084fc',
      page: 'parcours-associatif.html',
      entries: [
        ['bde-vice-president-candidat.html', '2026 - 2027', 'Vice-Président BDE'],
        ['oeil-president-candidat.html', '2026 - 2027', 'Président OEIL'],
        ['lea-president.html', '2024 - 2025', 'Président LEA'],
        ['oeil-conseiller.html', '2024 - 2025', 'Conseiller spécial'],
        ['oeil-president.html', '2023 - 2024', 'Président OEIL']
      ]
    },
    citizen: {
      accent: '#fb7185',
      page: 'parcours-citoyen.html',
      entries: [
        ['3il-ca.html', '2025 - 2028', 'Représentant étudiant'],
        ['crj-conseiller.html', '2024 - 2027', 'Conseiller régional jeune']
      ]
    },
    projects: {
      accent: '#60a5fa',
      page: 'realisations.html',
      entries: [
        ['solid.html', 'En cours', 'Project Solid'],
        ['portfolio.html', '2026', 'Portfolio']
      ]
    },
    contests: {
      accent: '#fb923c',
      page: 'concours.html',
      entries: [
        ['nuit2025.html', 'Déc. 2025', 'Nuit de l’Info'],
        ['ggj2024.html', 'Janv. 2024', 'Global Game Jam'],
        ['nuit2023.html', 'Déc. 2023', 'Nuit de l’Info'],
        ['eloquence.html', 'Mars 2023', 'Éloquence']
      ]
    }
  };

  const folders = { professional: 'experiences', academic: 'education', association: 'associations', citizen: 'engagement', projects: 'projects', contests: 'projects' };
  const category = Object.keys(folders).find(key => file === timelines[key].entries.find(entry => entry[0] === file)?.[0]);
  if (!category) return;

  const timeline = timelines[category];
  const timelineLabels = {
    professional: 'Retour aux expériences',
    academic: 'Retour aux études',
    association: 'Retour à l’associatif',
    citizen: 'Retour à l’engagement',
    projects: 'Retour aux réalisations',
    contests: 'Retour aux concours'
  };
  const currentIndex = timeline.entries.findIndex(entry => entry[0] === file);
  const root = '../';
  const detailPath = index => `${root}${folders[category]}/${timeline.entries[index][0]}`;
  const pagePath = `${root}${timeline.page}`;
  const previousIndex = currentIndex > 0 ? currentIndex - 1 : -1;
  const nextIndex = currentIndex < timeline.entries.length - 1 ? currentIndex + 1 : -1;

  const legacyPages = {
    '#pro': 'parcours-professionnel.html',
    '#formation': 'parcours-academique.html',
    '#asso': 'parcours-associatif.html',
    '#citoyen': 'parcours-citoyen.html',
    '#realisations': 'realisations.html',
    '#events': 'concours.html'
  };
  document.querySelectorAll('a[href]').forEach(link => {
    const replacement = legacyPages[new URL(link.href, window.location.href).hash];
    if (replacement) link.href = `${root}${replacement}`;
  });

  document.body.classList.add('detail-page');
  document.documentElement.style.setProperty('--detail-accent', timeline.accent);

  const headerNavigation = document.querySelector('nav');
  if (headerNavigation) {
    headerNavigation.innerHTML = `<div class="max-w-6xl mx-auto px-4 flex items-center justify-between gap-4"><a href="${root}index.html" class="text-blue-400 font-black text-lg hover:text-blue-300 transition"><i class="fas fa-arrow-left mr-2"></i>Retour</a><a href="${pagePath}" class="text-blue-400 font-black text-sm uppercase tracking-wider text-right hover:text-blue-300 transition">${timelineLabels[category]}</a></div>`;
  }

  const transitionLayer = document.createElement('div');
  transitionLayer.className = 'detail-transition-layer';
  transitionLayer.innerHTML = '<span class="detail-transition-label">Changement de chapitre</span>';
  document.body.appendChild(transitionLayer);

  const main = document.querySelector('main');
  if (!main) return;

  const navigation = document.createElement('section');
  navigation.className = 'detail-timeline';
  navigation.setAttribute('aria-label', 'Navigation dans la timeline');
  navigation.innerHTML = `
    <div class="detail-timeline-head">
      <span class="detail-timeline-kicker">Votre position dans la timeline</span>
      <span class="detail-timeline-position">${currentIndex + 1} / ${timeline.entries.length}</span>
    </div>
    <div class="detail-timeline-track">
      ${timeline.entries.map((entry, index) => `<a class="detail-timeline-node${index === currentIndex ? ' is-current' : ''}" href="${detailPath(index)}" aria-current="${index === currentIndex ? 'page' : 'false'}"><span><strong>${entry[1]}</strong><small>${entry[2]}</small></span></a>`).join('')}
    </div>
    <div class="detail-timeline-actions">
      <a class="detail-timeline-button" href="${previousIndex >= 0 ? detailPath(previousIndex) : '#'}" aria-disabled="${previousIndex < 0}"><i class="fas fa-arrow-left"></i><span>Plus récent</span></a>
      <a class="detail-timeline-button next" href="${nextIndex >= 0 ? detailPath(nextIndex) : '#'}" aria-disabled="${nextIndex < 0}"><span>Événement suivant</span><i class="fas fa-arrow-right"></i></a>
    </div>`;

  main.prepend(navigation);
  navigation.querySelectorAll('[aria-disabled="true"]').forEach(button => button.addEventListener('click', event => event.preventDefault()));

  const navigateWithTransition = (event, link) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const destination = link.getAttribute('href');
    if (!destination || destination === '#' || link.getAttribute('aria-disabled') === 'true') return;

    event.preventDefault();
    const destinationIndex = timeline.entries.findIndex(entry => destination.endsWith(`/${entry[0]}`));
    document.body.classList.add('is-leaving', destinationIndex > currentIndex ? 'is-next' : 'is-previous');
    window.setTimeout(() => { window.location.href = destination; }, 560);
  };

  navigation.querySelectorAll('a[href]').forEach(link => link.addEventListener('click', event => navigateWithTransition(event, link)));

  const style = document.createElement('link');
  style.rel = 'stylesheet';
  style.href = `${root}detail.css`;
  document.head.appendChild(style);

  const current = navigation.querySelector('.is-current');
  current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
})();
