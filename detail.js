// Repère de position en haut des pages détaillées, liens précédent / suivant en bas.
(() => {
  const file = window.location.pathname.split('/').pop().replace(/(\.html)?$/, '.html');
  const timelines = {
    pro: {
      folder: 'experiences',
      page: 'parcours-professionnel.html',
      label: 'Toutes les expériences',
      entries: [
        ['legrand-performance.html', '2025 - 2028', 'Chef de projet performance'],
        ['legrand-developpeur.html', '2024 - 2025', 'Concepteur développeur'],
        ['medipole.html', '2024', 'Projet biomédical']
      ]
    },
    etudes: {
      folder: 'education',
      page: 'parcours-academique.html',
      label: 'Toutes les études',
      entries: [
        ['3il-ingenieur.html', '2025 - 2028', 'Diplôme ingénieur'],
        ['unilim-but.html', '2024 - 2025', 'BUT Informatique'],
        ['unilim-dut.html', '2022 - 2024', 'DUT Informatique'],
        ['lycee-turgot.html', '2019 - 2022', 'Baccalauréat']
      ]
    },
    asso: {
      folder: 'associations',
      page: 'parcours-associatif.html',
      label: 'Tout le parcours associatif',
      entries: [
        ['bde-vice-president-candidat.html', '2026 - 2027', 'Vice-Président BDE'],
        ['oeil-president-candidat.html', '2026 - 2027', 'Président OEIL'],
        ['lea-president.html', '2024 - 2025', 'Président LEA'],
        ['oeil-conseiller.html', '2024 - 2025', 'Conseiller spécial'],
        ['oeil-president.html', '2023 - 2024', 'Président OEIL']
      ]
    },
    citoyen: {
      folder: 'engagement',
      page: 'parcours-citoyen.html',
      label: 'Tout le parcours citoyen',
      entries: [
        ['3il-ca.html', '2025 - 2028', 'Représentant étudiant'],
        ['crj-conseiller.html', '2024 - 2027', 'Conseiller régional jeune']
      ]
    },
    realisations: {
      folder: 'projects',
      page: 'realisations.html',
      label: 'Toutes les réalisations',
      entries: [
        ['solid.html', 'En cours', 'Project Solid'],
        ['portfolio.html', '2026', 'Portfolio']
      ]
    },
    concours: {
      folder: 'projects',
      page: 'concours.html',
      label: 'Tous les concours',
      entries: [
        ['nuit2025.html', 'Déc. 2025', 'Nuit de l’Info'],
        ['ggj2024.html', 'Janv. 2024', 'Global Game Jam'],
        ['nuit2023.html', 'Déc. 2023', 'Nuit de l’Info'],
        ['eloquence.html', 'Mars 2023', 'Éloquence']
      ]
    }
  };

  const timeline = Object.values(timelines).find(({ entries }) => entries.some(([name]) => name === file));
  const main = document.querySelector('main');
  if (!timeline || !main) return;

  const { entries, folder, page, label } = timeline;
  const currentIndex = entries.findIndex(([name]) => name === file);
  const href = name => `../${folder}/${name}`;

  const stepper = document.createElement('nav');
  stepper.className = 'stepper';
  stepper.setAttribute('aria-label', 'Position dans le parcours');
  stepper.innerHTML = `
    <div class="stepper-head">
      <a class="stepper-back" href="../${page}">← ${label}</a>
      <span class="stepper-position">Étape ${currentIndex + 1} sur ${entries.length}</span>
    </div>
    <ol class="stepper-track" style="--steps: ${entries.length}">
      ${entries.map(([name, date, title], index) => `
        <li><a class="stepper-node" href="${href(name)}"${index === currentIndex ? ' aria-current="page"' : ''} aria-label="${date} : ${title}">
          <span class="stepper-dot"></span>
          <span class="stepper-date">${date}</span>
          <span class="stepper-title">${title}</span>
        </a></li>`).join('')}
    </ol>
    <p class="stepper-now" aria-hidden="true">${entries[currentIndex][1]} · ${entries[currentIndex][2]}</p>`;
  main.prepend(stepper);

  const neighbour = (index, className, hint) => {
    if (!entries[index]) return '<span></span>';
    const [name, date, title] = entries[index];
    return `<a class="pager-link ${className}" href="${href(name)}"><small>${hint} · ${date}</small><strong>${title}</strong></a>`;
  };
  const pager = document.createElement('nav');
  pager.className = 'pager';
  pager.setAttribute('aria-label', 'Étape précédente ou suivante');
  pager.innerHTML = neighbour(currentIndex - 1, 'is-previous', '← Plus récent') + neighbour(currentIndex + 1, 'is-next', 'Plus ancien →');
  main.append(pager);
})();
