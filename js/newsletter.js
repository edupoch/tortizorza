// Envía o formulario da newsletter a Mailchimp sen saír da páxina.
// Mailchimp non permite CORS, así que se usa o seu endpoint JSONP
// (/subscribe/post-json). Sen JS, o formulario envíase normal nunha
// pestana nova.
const form = document.getElementById('newsletterForm');
const status = document.getElementById('newsletterStatus');

if (form && status) {
  const button = form.querySelector('button[type="submit"]');

  const show = (text, kind) => {
    status.textContent = text;
    status.dataset.kind = kind;
  };

  const messageFor = (data) => {
    if (data.result === 'success') {
      return 'Feito! Xa estás na nosa newsletter.';
    }
    const msg = String(data.msg || '').toLowerCase();
    if (msg.includes('already') || msg.includes('ya está') || msg.includes('ya es')) {
      return 'Este correo xa está apuntado á newsletter.';
    }
    if (msg.includes('too many')) {
      return 'Demasiados intentos seguidos. Proba de novo nun anaco.';
    }
    if (msg.includes('email') || msg.includes('correo')) {
      return 'Revisa o enderezo de correo: non parece válido.';
    }
    return 'Algo fallou. Proba de novo nun anaco.';
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const callback = `mcCallback${Date.now()}`;
    const params = new URLSearchParams(new FormData(form));
    params.set('c', callback);
    const url = `${form.action.replace('/post?', '/post-json?')}&${params}`;

    const script = document.createElement('script');
    const cleanup = () => {
      delete window[callback];
      script.remove();
      button.disabled = false;
    };
    const timeout = setTimeout(() => {
      cleanup();
      show('Non puidemos conectar. Proba de novo nun anaco.', 'error');
    }, 10000);

    window[callback] = (data) => {
      clearTimeout(timeout);
      cleanup();
      show(messageFor(data), data.result === 'success' ? 'success' : 'error');
      if (data.result === 'success') form.reset();
    };

    script.onerror = () => {
      clearTimeout(timeout);
      cleanup();
      show('Non puidemos conectar. Proba de novo nun anaco.', 'error');
    };

    button.disabled = true;
    show('Enviando…', 'pending');
    script.src = url;
    document.body.appendChild(script);
  });
}
