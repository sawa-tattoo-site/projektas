import { useEffect, useState } from "react";

function useJSON(url, fallback) {
  const [data, setData] = useState(fallback);
  useEffect(() => {
    fetch(url).then(r => r.json()).then(setData).catch(() => setData(fallback));
  }, [url]);
  return data;
}

export default function App() {
  const site = useJSON('/content/site.json', {});
  const pricing = useJSON('/content/pricing.json', []);
  const faq = useJSON('/content/faq.json', []);
  const aftercare = useJSON('/content/aftercare.json', []);
  const gallery = useJSON('/content/gallery/index.json', []);

  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    artistName = "SAWA Tattoo",
    tagline = "Custom black & grey • Fine line • Neo-traditional",
    location = "Vilnius, Lithuania",
    email = "bookings@example.com",
    phone = "+37060000000",
    instagramUrl = "",
    tiktokUrl = "",
    bookingUrl = ""
  } = site || {};

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-stone-300 selection:text-neutral-900">
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/70 border-b border-white/5">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-block h-8 w-8 rounded-xl bg-white/5 ring-1 ring-white/10" />
            <span className="font-semibold tracking-wide">{artistName}</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-300">
            <a href="#work" className="hover:text-white">Darbai</a>
            <a href="#about" className="hover:text-white">Apie</a>
            <a href="#pricing" className="hover:text-white">Kainos</a>
            <a href="#aftercare" className="hover:text-white">Priežiūra</a>
            <a href="#faq" className="hover:text-white">DUK</a>
            <a href="#contact" className="hover:text-white">Kontaktai</a>
          </nav>
          <button onClick={() => setOpen(true)} className="rounded-2xl bg-white text-neutral-900 px-4 py-2 text-sm font-medium shadow hover:shadow-lg transition">
            Registruotis
          </button>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_-10%,rgba(255,255,255,0.08),transparent_70%)]" />
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
                {artistName}
              </h1>
              <p className="mt-4 text-neutral-300 text-lg">{tagline}</p>
              <p className="mt-2 text-neutral-400">{location}</p>
              <div className="mt-8 flex items-center gap-3">
                <button onClick={() => setOpen(true)} className="rounded-2xl bg-white text-neutral-900 px-5 py-3 font-medium shadow hover:shadow-lg transition">
                  Užsiregistruoti konsultacijai
                </button>
                {bookingUrl ? (
                  <a href={bookingUrl} target="_blank" className="rounded-2xl border border-white/20 px-5 py-3 font-medium hover:bg-white/10 transition">
                    Peržiūrėti tvarkaraštį
                  </a>
                ) : (
                  <a href="#contact" className="rounded-2xl border border-white/20 px-5 py-3 font-medium hover:bg-white/10 transition">
                    Susisiekti
                  </a>
                )}
              </div>
              <div className="mt-6 flex items-center gap-4 text-neutral-400">
                {instagramUrl && (<a href={instagramUrl} target="_blank" className="hover:text-white">Instagram</a>)}
                {tiktokUrl && (<a href={tiktokUrl} target="_blank" className="hover:text-white">TikTok</a>)}
              </div>
            </div>
            <div className="relative">
              {gallery[0] && (
                <img
                  src={gallery[0].src}
                  alt={gallery[0].alt || "Tattoo"}
                  className="rounded-3xl ring-1 ring-white/10 shadow-2xl w-full object-cover aspect-[4/3]"
                />
              )}
              <div className="absolute -bottom-6 -left-6 hidden md:block w-40 h-40 rounded-3xl bg-white/5 ring-1 ring-white/10" />
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl md:text-3xl font-semibold">Darbai</h2>
          {instagramUrl && <a href={instagramUrl} target="_blank" className="text-sm text-neutral-300 hover:text-white">Daugiau Instagram</a>}
        </div>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {gallery.map((img, i) => (
            <figure key={i} className="group relative overflow-hidden rounded-2xl ring-1 ring-white/10">
              <img src={img.src} alt={img.alt || 'Tattoo'} className="aspect-square object-cover w-full group-hover:scale-[1.03] transition" />
              <figcaption className="absolute inset-x-0 bottom-0 p-3 text-xs text-neutral-200/90 bg-gradient-to-t from-black/60 to-transparent">
                {img.alt}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="about" className="bg-white/5">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold">Apie</h2>
              <p className="mt-4 text-neutral-300 leading-relaxed">
                Esu tatuiruočių meistrė, kurianti individualius, ilgalaikius ir estetiškus darbus.
                Daugiausia dirbu su juodais/pilkais atspalviais ir smulkiomis linijomis, tačiau mielai priimu
                ir spalvotus projektus. Konsultacijos metu aptariame idėją, stilių, dydį, biudžetą ir priežiūrą.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              {[["7+","metų patirtis"],["1000+","darbų"],["Sterilu","vienkartinės priemonės"]].map(([num,label],i)=>(
                <div key={i} className="rounded-2xl bg-neutral-900 ring-1 ring-white/10 p-6">
                  <div className="text-3xl font-semibold">{num}</div>
                  <div className="mt-1 text-neutral-400 text-sm">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <h2 className="text-2xl md:text-3xl font-semibold">Kainos</h2>
        <p className="mt-3 text-neutral-300">Kaina priklauso nuo dydžio, vietos, stiliaus ir sudėtingumo.</p>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {pricing.map((card, i) => (
            <div key={i} className={`rounded-3xl p-6 ring-1 ring-white/10 bg-white/5 ${card.featured ? "ring-2 ring-white/20":""}`}>
              <div className="flex items-baseline justify-between">
                <h3 className="text-lg font-medium">{card.title}</h3>
                <div className="text-xl font-semibold">{card.price}</div>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-neutral-300">
                {card.includes?.map((li, j) => (<li key={j}>• {li}</li>))}
              </ul>
              <button onClick={() => setOpen(true)} className="mt-6 w-full rounded-2xl bg-white text-neutral-900 py-2 font-medium hover:shadow">
                Užklausa / rezervacija
              </button>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="bg-white/5">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <h2 className="text-2xl md:text-3xl font-semibold">DUK</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            {faq.map((item, i) => (
              <div key={i} className="rounded-2xl p-6 ring-1 ring-white/10 bg-neutral-900">
                <div className="font-medium">{item.q}</div>
                <p className="mt-2 text-neutral-300 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="aftercare" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <h2 className="text-2xl md:text-3xl font-semibold">Tatuiruotės priežiūra</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {aftercare.map((step, i) => (
            <div key={i} className="rounded-2xl p-6 ring-1 ring-white/10 bg-white/5">
              <div className="text-lg font-medium">{step.title}</div>
              <p className="mt-2 text-neutral-300 text-sm leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-neutral-400 text-sm">*Jei kyla paraudimas, patinimas ar kiti neįprasti simptomai – susisiekite.</p>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">Kontaktai</h2>
            <p className="mt-3 text-neutral-300">Studija: {location}</p>
            <div className="mt-4 space-y-2 text-neutral-300">
              <div>El. paštas: <a className="underline" href={`mailto:${email}`}>{email}</a></div>
              <div>Tel.: <a className="underline" href={`tel:${phone}`}>{phone}</a></div>
              {instagramUrl && (<div>IG: <a className="underline" href={instagramUrl} target="_blank">{instagramUrl}</a></div>)}
            </div>
            <div className="mt-6">
              <button onClick={() => setOpen(true)} className="rounded-2xl bg-white text-neutral-900 px-5 py-3 font-medium hover:shadow">
                Pildyti užklausą
              </button>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden ring-1 ring-white/10 bg-white/5">
            <iframe
              title="SAWA Tattoo Facebook"
              src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent('https://www.facebook.com/sawatattoo')}&tabs=timeline&width=800&height=520&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true`}
              width="100%"
              height="520"
              style={{ border: 0, overflow: 'hidden' }}
              scrolling="no"
              frameBorder="0"
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              className="w-full"
            />
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-neutral-400 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} {artistName}. Visos teisės saugomos.</div>
          <div className="flex items-center gap-4">
            {instagramUrl && <a href={instagramUrl} target="_blank" className="hover:text-white">Instagram</a>}
            {tiktokUrl && <a href={tiktokUrl} target="_blank" className="hover:text-white">TikTok</a>}
            <a href="#" className="hover:text-white">Privatumo politika</a>
          </div>
        </div>
      </footer>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/70">
          <div className="w-full max-w-xl rounded-3xl bg-neutral-900 ring-1 ring-white/10 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold">Užklausa / Registracija</h3>
                <p className="mt-1 text-sm text-neutral-300">
                  Užpildykite formą – atsakysiu per 1–2 darbo dienas. Jei norite, pridėkite nuorodas į įkvėpimo pavyzdžius.
                </p>
              </div>
              <button onClick={() => setOpen(false)} className="text-neutral-300 hover:text-white">✕</button>
            </div>
            {bookingUrl ? (
              <div className="mt-5">
                <iframe title="Calendar" src={bookingUrl} className="w-full h-[480px] rounded-2xl ring-1 ring-white/10" />
              </div>
            ) : (
              <Form onSubmitted={() => setSubmitted(true)} email={email} />
            )}
            {submitted && (
              <div className="mt-4 rounded-xl bg-green-500/10 text-green-300 p-3 text-sm">
                Ačiū! Jūsų užklausa gauta. Netrukus susisieksiu el. paštu.
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  )
}

function Form({ onSubmitted, email }) {
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    // Replace with your Formspree endpoint if desired.
    const action = "";
    const formEl = e.currentTarget;

    if (!action) {
      await new Promise((r)=>setTimeout(r,800));
      setLoading(false);
      onSubmitted();
      formEl.reset();
      return;
    }

    try {
      const formData = new FormData(formEl);
      await fetch(action, { method: "POST", body: formData, mode: "no-cors" });
      setLoading(false);
      onSubmitted();
      formEl.reset();
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Nepavyko išsiųsti formos. Pabandykite dar kartą arba rašykite el. paštu " + email);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5 grid grid-cols-1 gap-4">
      <div className="grid md:grid-cols-2 gap-4">
        <Input label="Vardas" name="name" required />
        <Input label="El. paštas" name="email" type="email" required />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Input label="Telefonas" name="phone" />
        <Input label="Pageidaujama data" name="date" type="date" />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Input label="Stilius / idėja" name="style" placeholder="Fine line, blackwork, ..." />
        <Input label="Vieta ant kūno" name="placement" placeholder="Dilbys, kulkšnis, ..." />
      </div>
      <Textarea label="Žinutė" name="message" placeholder="Aprašykite idėją, dydį (cm), spalvas, nuorodas į pavyzdžius..." />
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <label className="text-sm text-neutral-300 flex items-center gap-2">
          <input type="checkbox" name="consent" required className="accent-white" /> Sutinku su asmens duomenų tvarkymu rezervacijai atlikti
        </label>
        <button type="submit" disabled={loading} className="rounded-2xl bg-white text-neutral-900 px-5 py-2 font-medium disabled:opacity-70">
          {loading ? "Siunčiama…" : "Siųsti"}
        </button>
      </div>
    </form>
  )
}

function Input({ label, ...props }) {
  return (
    <label className="block">
      <span className="text-sm text-neutral-300">{label}</span>
      <input {...props} className="mt-1 w-full rounded-xl bg-neutral-800 text-white placeholder:text-neutral-500 px-3 py-2 ring-1 ring-white/10 focus:outline-none focus:ring-white/30" />
    </label>
  )
}

function Textarea({ label, ...props }) {
  return (
    <label className="block">
      <span className="text-sm text-neutral-300">{label}</span>
      <textarea {...props} rows={5} className="mt-1 w-full rounded-xl bg-neutral-800 text-white placeholder:text-neutral-500 px-3 py-2 ring-1 ring-white/10 focus:outline-none focus:ring-white/30" />
    </label>
  )
}
