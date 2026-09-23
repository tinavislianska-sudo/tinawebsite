const toggle=document.querySelector('#theme');
function theme(value){const dark=value==='dark';document.documentElement.dataset.theme=dark?'dark':'light';toggle.textContent=dark?'☀':'☾';toggle.setAttribute('aria-label',dark?'Switch to light theme':'Switch to dark theme');toggle.setAttribute('aria-pressed',String(dark));try{localStorage.setItem('theme',dark?'dark':'light')}catch{}}
try{theme(localStorage.getItem('theme')||'light')}catch{theme('light')}
toggle.addEventListener('click',()=>theme(document.documentElement.dataset.theme==='dark'?'light':'dark'));
