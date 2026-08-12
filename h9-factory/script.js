(() => {
  const app = document.querySelector('[data-mock-app]');
  if (!app) return;

  const panels = [...app.querySelectorAll('[data-step-panel]')];
  const tabs = [...app.querySelectorAll('[data-step-target]')];
  const brief = document.querySelector('#mock-brief');
  const briefCount = document.querySelector('#brief-count');
  const nameInput = document.querySelector('#project-name');
  const audienceInput = document.querySelector('#project-audience');
  const goalInput = document.querySelector('#project-goal');
  const constraintsInput = document.querySelector('#project-constraints');
  const notesInput = document.querySelector('#review-notes');
  const validationFeedback = document.querySelector('#validation-feedback');
  const exportFeedback = document.querySelector('#export-feedback');
  let activeStep = 1;
  let result = null;

  const escapeHtml = (value) => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  function updateBriefCount() {
    const count = brief.value.trim().length;
    briefCount.textContent = `${count} caractère${count > 1 ? 's' : ''}`;
  }

  function syncReview() {
    document.querySelector('#review-name').textContent = nameInput.value.trim() || 'Application sans nom';
    document.querySelector('#review-goal').textContent = goalInput.value.trim() || 'Objectif à préciser';
    document.querySelector('#review-audience').textContent = audienceInput.value.trim() || 'Public à préciser';
  }

  function showStep(step) {
    activeStep = Number(step);
    panels.forEach((panel) => {
      const isActive = Number(panel.dataset.stepPanel) === activeStep;
      panel.hidden = !isActive;
      panel.classList.toggle('is-active', isActive);
    });
    tabs.forEach((tab) => {
      const tabStep = Number(tab.dataset.stepTarget);
      const isActive = tabStep === activeStep;
      tab.classList.toggle('is-active', isActive);
      tab.classList.toggle('is-complete', tabStep < activeStep);
      tab.setAttribute('aria-selected', String(isActive));
    });
    if (activeStep === 3) syncReview();
    if (activeStep === 4 && !result) generateResult();
    app.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function buildResult() {
    const name = nameInput.value.trim() || 'Application H9';
    const goal = goalInput.value.trim() || 'Objectif métier à préciser.';
    const audience = audienceInput.value.trim() || 'Utilisateur métier';
    const note = notesInput.value.trim();
    const summaryMarkdown = `# ${name}\n\n${goal}\n\n## Cadrage validé\n\n- **Utilisateur principal :** ${audience}\n- **Architecture :** ${constraintsInput.value.trim()}\n- **Parcours :** Discover → Map → Audit → AI Finder → Optimize → SOP → Roadmap → Knowledge\n- **Décision :** validation humaine avant toute capitalisation.${note ? `\n- **Précision :** ${note}` : ''}\n\n## Prochaines étapes\n\n1. Prototyper le module Discover.\n2. Tester le parcours manuel sans API IA.\n3. Valider les schémas de sortie et les exports.`;

    return {
      contractVersion: 'h9.v1',
      generatedBy: 'mock-browser-only',
      application: {
        name,
        slug: name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        audience,
        goal,
        constraints: constraintsInput.value.trim()
      },
      summaryMarkdown,
      deliverables: [
        { type: 'diagnostic', title: 'Diagnostic du processus', status: 'ready' },
        { type: 'process-map', title: 'Cartographie métier', status: 'ready' },
        { type: 'roadmap', title: 'Feuille de route 90 jours', status: 'ready' }
      ],
      sources: [],
      warnings: ['Démonstration statique : aucune analyse IA réelle n’a été exécutée.'],
      mockContext: { brief: brief.value.trim(), humanNote: note }
    };
  }

  function generateResult() {
    result = buildResult();
    document.querySelector('#result-name').textContent = result.application.name;
    document.querySelector('#result-summary').textContent = `${result.application.goal} Le cadrage conserve ${result.application.audience.toLowerCase()} dans la boucle de décision.`;
    const note = document.querySelector('#result-note');
    if (result.mockContext.humanNote) {
      note.hidden = false;
      note.textContent = `Précision humaine intégrée : ${result.mockContext.humanNote}`;
    } else {
      note.hidden = true;
      note.textContent = '';
    }
    document.querySelector('#json-preview').textContent = JSON.stringify({
      contractVersion: result.contractVersion,
      application: result.application,
      deliverables: result.deliverables
    }, null, 2);
  }

  function validateAndGenerate() {
    const checks = [...app.querySelectorAll('[data-required-check]')];
    if (checks.some((check) => !check.checked)) {
      validationFeedback.textContent = 'Confirmez les trois points pour poursuivre la simulation.';
      return;
    }
    validationFeedback.textContent = '';
    generateResult();
    showStep(4);
  }

  function download(filename, mime, content) {
    const blob = new Blob([content], { type: `${mime};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function exportResult(format) {
    if (!result) generateResult();
    const slug = result.application.slug || 'h9-result';
    if (format === 'json') {
      download(`${slug}.json`, 'application/json', JSON.stringify(result, null, 2));
    }
    if (format === 'markdown') {
      download(`${slug}.md`, 'text/markdown', result.summaryMarkdown);
    }
    if (format === 'html') {
      const paragraphs = result.summaryMarkdown.split('\n').map((line) => {
        if (line.startsWith('# ')) return `<h1>${escapeHtml(line.slice(2))}</h1>`;
        if (line.startsWith('## ')) return `<h2>${escapeHtml(line.slice(3))}</h2>`;
        if (line.startsWith('- ')) return `<p>• ${escapeHtml(line.slice(2))}</p>`;
        if (/^\d+\. /.test(line)) return `<p>${escapeHtml(line)}</p>`;
        return line ? `<p>${escapeHtml(line)}</p>` : '';
      }).join('\n');
      const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(result.application.name)}</title><style>body{max-width:760px;margin:60px auto;padding:0 24px;color:#172033;font:16px/1.7 system-ui,sans-serif}h1{font-size:42px;line-height:1.05}h2{margin-top:38px;color:#4b53d4}p{color:#566078}</style></head><body>${paragraphs}</body></html>`;
      download(`${slug}.html`, 'text/html', html);
    }
    exportFeedback.textContent = `Export ${format.toUpperCase()} généré localement.`;
  }

  brief.addEventListener('input', updateBriefCount);
  nameInput.addEventListener('input', syncReview);
  audienceInput.addEventListener('input', syncReview);
  goalInput.addEventListener('input', syncReview);

  app.addEventListener('click', (event) => {
    const tab = event.target.closest('[data-step-target]');
    const next = event.target.closest('[data-next-step]');
    const previous = event.target.closest('[data-prev-step]');
    const exportButton = event.target.closest('[data-export]');
    if (tab) showStep(tab.dataset.stepTarget);
    if (next) showStep(next.dataset.nextStep);
    if (previous) showStep(previous.dataset.prevStep);
    if (exportButton) exportResult(exportButton.dataset.export);
  });

  document.querySelector('#generate-result').addEventListener('click', validateAndGenerate);
  document.querySelector('#restart-demo').addEventListener('click', () => {
    result = null;
    validationFeedback.textContent = '';
    exportFeedback.textContent = '';
    showStep(1);
  });

  updateBriefCount();
  syncReview();
})();
