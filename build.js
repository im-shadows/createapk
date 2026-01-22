const form   = document.getElementById('form');
const btnTxt = document.getElementById('btnText');
const spinner= document.getElementById('spinner');
const result = document.getElementById('result');
const msg    = document.getElementById('msg');
const dlLink = document.getElementById('dlLink');
const toast  = document.getElementById('toast');

/* ⚠️ ISI API KEY KAMU DI SINI */
const apiKey = "bagus";

form.addEventListener('submit', async e => {
  e.preventDefault();

  btnTxt.textContent = 'Proses...';
  spinner.classList.remove('hidden');
  result.classList.add('hidden');

  try {
    const apiURL =
      `https://web2apk-cg.zone.id/tools/web2app` +
      `?apikey=${apiKey}` +
      `&url=${encodeURIComponent(form.url.value)}` +
      `&email=${encodeURIComponent(form.email.value)}` +
      `&name=${encodeURIComponent(form.name.value)}`;

    const res = await fetch(apiURL);
    const data = await res.json();

    if (data.status) {
      msg.textContent = `Aplikasi "${data.appName}" berhasil dibuat`;
      dlLink.href = data.download;
      result.classList.remove('hidden');
    } else {
      throw new Error(data.message || "Gagal build APK");
    }
  } catch (err) {
    showToast(err.message);
  } finally {
    spinner.classList.add('hidden');
    btnTxt.textContent = 'Build APK';
  }
});

function showToast(text) {
  toast.textContent = text;
  toast.classList.remove('opacity-0');
  setTimeout(() => toast.classList.add('opacity-0'), 3000);
}

/* TYPING EFFECT */
const text = "Cuxxyzhost";
const el = document.getElementById("typingText");
let i = 0, del = false;

(function loop() {
  el.textContent = text.substring(0, i);
  if (!del && i++ === text.length) setTimeout(() => del = true, 1200);
  if (del && i-- === 0) del = false;
  setTimeout(loop, del ? 80 : 120);
})();