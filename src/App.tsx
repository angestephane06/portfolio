import { useEffect, useRef, useState } from "react";
import {
  education,
  experience,
  featured,
  highlights,
  others,
  profile,
  skills,
  stats,
  ui,
  type Entry,
  type Lang,
  type Project,
} from "./content";

type Text = Record<Lang, string>;

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem("lang");
    if (saved === "fr" || saved === "en") return saved;
  } catch {
    // storage unavailable (private mode): fall back to the browser language
  }
  return navigator.language.toLowerCase().startsWith("fr") ? "fr" : "en";
}

/** Adds the "visible" class when the element scrolls into view (once). */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("visible");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

export default function App() {
  const [lang, setLang] = useState<Lang>(initialLang);
  const t = (text: Text) => text[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem("lang", lang);
    } catch {
      // not persisted, the page still works
    }
  }, [lang]);

  return (
    <>
      <div className="backdrop" aria-hidden="true" />
      <header className="topbar">
        <a href="#top" className="brand">
          <span className="prompt">~/</span>kouame
        </a>
        <nav aria-label="Sections">
          <a href="#projects">{t(ui.projects)}</a>
          <a href="#experience">{t(ui.experience)}</a>
          <a href="#skills">{t(ui.skills)}</a>
          <a href="#contact">{t(ui.contact)}</a>
        </nav>
        <button
          type="button"
          className="lang"
          onClick={() => setLang(lang === "fr" ? "en" : "fr")}
          aria-label={lang === "fr" ? "Switch to English" : "Passer en français"}
        >
          {lang === "fr" ? "EN" : "FR"}
        </button>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-text">
            <p className="whoami">
              <span className="dollar">$</span> whoami
            </p>
            <h1>{profile.name}</h1>
            <p className="headline">{t(profile.headline)}</p>
            <p className="intro">{t(profile.intro)}</p>
            <div className="links">
              <a className="button primary" href={profile.cv} target="_blank" rel="noreferrer">
                {t(ui.cv)}
              </a>
              <a className="button" href={profile.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a className="button" href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>
            <p className="location">
              <span className="dot" aria-hidden="true" /> {t(ui.available)}
            </p>
          </div>
          <Terminal lang={lang} />
        </section>

        <ul className="stats" aria-label="Key results">
          {stats.map((s) => (
            <li key={s.label.en}>
              <span className="stat-value">{t(s.value)}</span>
              <span className="stat-label">{t(s.label)}</span>
            </li>
          ))}
        </ul>

        <section id="projects">
          <SectionTitle index="01" title={t(ui.featuredTitle)} />
          <div className="featured">
            {featured.map((p, i) => (
              <FeaturedProject key={p.id} project={p} lang={lang} index={i + 1} />
            ))}
          </div>
          <h3 className="subhead">{t(ui.otherProjects)}</h3>
          <div className="grid">
            {others.map((p) => (
              <SmallProject key={p.id} project={p} lang={lang} />
            ))}
          </div>
        </section>

        <section id="experience">
          <SectionTitle index="02" title={t(ui.experience)} />
          <div className="two-cols">
            <Timeline entries={experience} lang={lang} />
            <div>
              <h3 className="subhead first">{t(ui.education)}</h3>
              <Timeline entries={education} lang={lang} />
            </div>
          </div>
        </section>

        <section id="skills">
          <SectionTitle index="03" title={t(ui.skills)} />
          <div className="skills">
            {skills.map((group) => (
              <div key={group.title.en} className="skill-group">
                <h3>{t(group.title)}</h3>
                <ul className="tags">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="contact">
          <SectionTitle index="04" title={t(ui.contact)} />
          <div className="contact-card">
            <p>{t(ui.contactText)}</p>
            <a className="mail" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <div className="links">
              <a className="button" href={profile.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a className="button" href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a className="button" href={profile.cv} target="_blank" rel="noreferrer">
                {t(ui.cv)}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <span className="prompt">$</span> echo "© {new Date().getFullYear()} {profile.name}"
      </footer>
    </>
  );
}

function SectionTitle({ index, title }: { index: string; title: string }) {
  return (
    <h2 className="section-title">
      <span className="index">{index}.</span> {title}
    </h2>
  );
}

function Terminal({ lang }: { lang: Lang }) {
  return (
    <div className="terminal" aria-label="Results summary">
      <div className="terminal-bar" aria-hidden="true">
        <span />
        <span />
        <span />
        <em>results.txt</em>
      </div>
      <pre>
        <span className="dollar">$</span> cat results.txt{"\n"}
        {highlights.map((h) => (
          <span key={h.repo} className="term-line">
            <span className="repo">{h.repo}</span>
            {"\n  "}
            {h.line[lang]}
            {"\n"}
          </span>
        ))}
        <span className="dollar">$</span> <span className="cursor" aria-hidden="true" />
      </pre>
    </div>
  );
}

function Media({ project, lang }: { project: Project; lang: Lang }) {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  if (project.video) {
    return (
      <video
        className="media"
        src={project.video}
        poster={project.poster}
        autoPlay={!reduced}
        controls={reduced}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={project.title[lang]}
      />
    );
  }
  if (project.image) {
    return <img className="media" src={project.image} alt={project.title[lang]} loading="lazy" />;
  }
  return null;
}

function Links({ project, lang }: { project: Project; lang: Lang }) {
  if (!project.github && !project.report) return null;
  return (
    <div className="card-links">
      {project.github && (
        <a href={project.github} target="_blank" rel="noreferrer">
          {ui.code[lang]} →
        </a>
      )}
      {project.report && (
        <a href={project.report} target="_blank" rel="noreferrer">
          {ui.report[lang]} →
        </a>
      )}
    </div>
  );
}

function FeaturedProject({ project, lang, index }: { project: Project; lang: Lang; index: number }) {
  const ref = useReveal<HTMLElement>();
  const hasMedia = Boolean(project.video || project.image);
  return (
    <article ref={ref} className={`feature reveal${hasMedia ? "" : " no-media"}`}>
      {hasMedia && (
        <div className="media-frame">
          <Media project={project} lang={lang} />
        </div>
      )}
      <div className="feature-body">
        <p className="context">
          <span className="num">{String(index).padStart(2, "0")}</span> {project.context[lang]}
        </p>
        <h3>{project.title[lang]}</h3>
        <dl>
          <dt>{ui.problem[lang]}</dt>
          <dd>{project.problem[lang]}</dd>
          <dt>{ui.approach[lang]}</dt>
          <dd>{project.approach[lang]}</dd>
          <dt>{ui.result[lang]}</dt>
          <dd className={project.result ? "result" : "todo"}>
            {project.result ? project.result[lang] : ui.resultTodo[lang]}
          </dd>
        </dl>
        <ul className="tags">
          {project.tech.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        <Links project={project} lang={lang} />
      </div>
    </article>
  );
}

function SmallProject({ project, lang }: { project: Project; lang: Lang }) {
  const ref = useReveal<HTMLElement>();
  return (
    <article ref={ref} className="card reveal">
      <p className="context">{project.context[lang]}</p>
      <h3>{project.title[lang]}</h3>
      <p className="problem">{project.problem[lang]}</p>
      {project.result && <p className="result small">{project.result[lang]}</p>}
      <ul className="tags">
        {project.tech.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
      <Links project={project} lang={lang} />
    </article>
  );
}

function Timeline({ entries, lang }: { entries: Entry[]; lang: Lang }) {
  return (
    <ol className="timeline">
      {entries.map((e) => (
        <li key={`${e.place}-${e.title.en}`}>
          {e.period[lang] && <span className="period">{e.period[lang]}</span>}
          <strong>{e.title[lang]}</strong>
          <span className="place">{e.place}</span>
          <p>{e.desc[lang]}</p>
        </li>
      ))}
    </ol>
  );
}
