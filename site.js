// Menu, pied de page et badges "En cours", communs à toutes les pages.
// À charger en tout début de <body> : le menu s'affiche ainsi sans décalage.
(() => {
  const root = document.currentScript.getAttribute('src').replace(/site\.js$/, '');
  const section = document.body.dataset.section;
  const links = [
    ['pro', 'parcours-professionnel.html', 'Expériences'],
    ['etudes', 'parcours-academique.html', 'Études'],
    ['asso', 'parcours-associatif.html', 'Associatif'],
    ['citoyen', 'parcours-citoyen.html', 'Citoyen'],
    ['realisations', 'realisations.html', 'Réalisations'],
    ['concours', 'concours.html', 'Concours'],
    ['contact', 'index.html#contact', 'Contact']
  ];

  const nav = document.createElement('header');
  nav.className = 'site-nav';
  nav.innerHTML = `
    <div class="site-nav-inner">
      <a class="site-brand" href="${root}index.html">Logan Ferreira</a>
      <button class="site-menu-toggle" type="button" aria-expanded="false" aria-controls="site-links">Menu</button>
      <ul class="site-links" id="site-links">
        ${links.map(([key, href, label]) => `<li><a href="${root}${href}"${key === section ? ' aria-current="page"' : ''}>${label}</a></li>`).join('')}
      </ul>
    </div>`;

  const skip = document.createElement('a');
  skip.className = 'skip-link';
  skip.href = '#contenu';
  skip.textContent = 'Aller au contenu';
  document.body.prepend(skip, nav);

  const toggle = nav.querySelector('.site-menu-toggle');
  const setOpen = open => {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Fermer' : 'Menu';
  };
  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
  nav.querySelector('.site-links').addEventListener('click', event => {
    if (event.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('main');
    if (main) {
      main.id = 'contenu';
      main.tabIndex = -1;
      main.style.outline = 'none';
    }

    const footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.innerHTML = `
      <div class="site-footer-inner">
        <span>Limoges · Logan Ferreira · ${new Date().getFullYear()}</span>
        <a href="${root}mentions-legales.html">Mentions légales</a>
      </div>`;
    document.body.append(footer);

    // Une étape est "en cours" tant que son année de fin n'est pas dépassée.
    const year = new Date().getFullYear();
    document.querySelectorAll('.timeline-entry[data-end]').forEach(entry => {
      if (Number(entry.dataset.end) < year) return;
      entry.classList.add('is-current');
      const badge = document.createElement('span');
      badge.className = 'timeline-badge';
      badge.textContent = 'En cours';
      entry.querySelector('.timeline-when')?.append(badge);
    });
  });
})();
