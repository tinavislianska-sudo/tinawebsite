const toggle=document.querySelector('#theme');
function theme(value){const dark=value==='dark';document.documentElement.dataset.theme=dark?'dark':'light';toggle.textContent=dark?'☀':'☾';toggle.setAttribute('aria-label',dark?'Switch to light theme':'Switch to dark theme');toggle.setAttribute('aria-pressed',String(dark));try{localStorage.setItem('theme',dark?'dark':'light')}catch{}}
try{theme(localStorage.getItem('theme')||'light')}catch{theme('light')}
toggle.addEventListener('click',()=>theme(document.documentElement.dataset.theme==='dark'?'light':'dark'));

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.panel, .process > div, .section-title').forEach(element => {
    element.classList.add('reveal');
    observer.observe(element);
  });
}
