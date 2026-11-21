import { useEffect, useState } from "react";
import {
  education,
  experience,
  featured,
  others,
  profile,
  skills,
  ui,
  type Entry,
  type Lang,
  type Project,
} from "./content";

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem("lang");
    if (saved === "fr" || saved === "en") return saved;
  } catch {
    // storage unavailable (private mode): fall back to the browser language
  }
  return navigator.language.toLowerCase().startsWith("fr") ? "fr" : "en";
}

export default function App() {
  const [lang, setLang] = useState<Lang>(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem("lang", lang);
    } catch {
      // not persisted, the page still works
    }
  }, [lang]);

  const t = (text: Record<Lang, string>) => text[lang];

  return (
    <>
      <header className="topbar">
        <a href="#top" className="brand">
          K. KONAN
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
        </section>

        <section id="projects">
          <h2>{t(ui.projects)}</h2>
          <div className="featured">
            {featured.map((p) => (
              <ProjectCard key={p.id} project={p} lang={lang} />
            ))}
          </div>
          <h3 className="subhead">{t(ui.otherProjects)}</h3>
          <div className="grid">
            {others.map((p) => (
              <ProjectCard key={p.id} project={p} lang={lang} compact />
            ))}
          </div>
        </section>

        <section id="experience">
          <h2>{t(ui.experience)}</h2>
          <Timeline entries={experience} lang={lang} />
          <h3 className="subhead">{t(ui.education)}</h3>
          <Timeline entries={education} lang={lang} />
        </section>

        <section id="skills">
          <h2>{t(ui.skills)}</h2>
          <div className="skills">
            {skills.map((group) => (
              <div key={group.title.en}>
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
          <h2>{t(ui.contact)}</h2>
          <p>{t(ui.contactText)}</p>
          <p className="contact-line">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <span aria-hidden="true">·</span>
            <span>{t(profile.location)}</span>
          </p>
        </section>
      </main>

      <footer>
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </>
  );
}

function ProjectCard({
  project,
  lang,
  compact = false,
}: {
  project: Project;
  lang: Lang;
  compact?: boolean;
}) {
  const t = (text: Record<Lang, string>) => text[lang];
  return (
    <article className={compact ? "card compact" : "card"}>
      {project.image && <img src={project.image} alt="" loading="lazy" />}
      <p className="context">{t(project.context)}</p>
      <h3>{t(project.title)}</h3>
      <dl>
        <dt>{t(ui.problem)}</dt>
        <dd>{t(project.problem)}</dd>
        {!compact && (
          <>
            <dt>{t(ui.approach)}</dt>
            <dd>{t(project.approach)}</dd>
          </>
        )}
        {(!compact || project.result) && (
          <>
            <dt>{t(ui.result)}</dt>
            <dd className={project.result ? "" : "todo"}>
              {project.result ? t(project.result) : t(ui.resultTodo)}
            </dd>
          </>
        )}
      </dl>
      <ul className="tags">
        {project.tech.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
      {(project.github || project.report) && (
        <div className="card-links">
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer">
              {t(ui.code)} →
            </a>
          )}
          {project.report && (
            <a href={project.report} target="_blank" rel="noreferrer">
              {t(ui.report)} →
            </a>
          )}
        </div>
      )}
    </article>
  );
}

function Timeline({ entries, lang }: { entries: Entry[]; lang: Lang }) {
  return (
    <ol className="timeline">
      {entries.map((e) => (
        <li key={`${e.place}-${e.title.en}`}>
          {e.period[lang] && <span className="period">{e.period[lang]}</span>}
          <strong>{e.title[lang]}</strong> — {e.place}
          <p>{e.desc[lang]}</p>
        </li>
      ))}
    </ol>
  );
}
