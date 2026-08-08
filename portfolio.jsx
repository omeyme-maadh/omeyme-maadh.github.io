/**
 * Omeyme Cherif Ahmed — Personal Portfolio
 * -----------------------------------------------------------------------
 * Single-file React preview. Maps 1:1 onto a Next.js + TypeScript app:
 *   - Each <Section> becomes app/components/<Name>.tsx
 *   - The `translations` object becomes /locales or a dictionary map,
 *     e.g. via next-intl / next-i18next
 *   - Colors/fonts become tailwind.config.ts tokens
 * Languages: English (en), Français (fr), العربية (ar, RTL)
 * -----------------------------------------------------------------------
 */

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, Sun, Moon, Github, Linkedin, Mail, ArrowUpRight,
  Code2, Globe, Database, Briefcase, BrainCircuit, GraduationCap,
  Award, Sparkles, Terminal, Plus, MapPin, Languages
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Design tokens                                                      */
/* ------------------------------------------------------------------ */
const THEMES = {
  dark: {
    bg: "#0a0a0c", bgSoft: "#101014",
    panel: "rgba(255,255,255,0.045)", panelBorder: "rgba(255,255,255,0.09)",
    text: "#f5f5f7", textDim: "#98989f", textFaint: "#5c5c63",
  },
  light: {
    bg: "#f3f3f1", bgSoft: "#eae9e5",
    panel: "rgba(10,10,12,0.035)", panelBorder: "rgba(10,10,12,0.10)",
    text: "#0e0e10", textDim: "#5a5a60", textFaint: "#9c9ca2",
  },
};
const GOLD = "#c9a227";
const GOLD_SOFT = "rgba(201,162,39,0.16)";
const BLUE = "#4f7cff";
const BLUE_SOFT = "rgba(79,124,255,0.16)";

const LANGS = [
  { code: "en", label: "EN", dir: "ltr" },
  { code: "fr", label: "FR", dir: "ltr" },
  { code: "ar", label: "AR", dir: "rtl" },
];

/* ------------------------------------------------------------------ */
/* Translations                                                       */
/* ------------------------------------------------------------------ */
const T_ITEMS = {
  programming: ["C", "C++", "Java", "Python", "SQL"],
  web: ["HTML5", "CSS3", "JavaScript", "React", "Next.js"],
  db: ["MySQL", "PostgreSQL", "MongoDB", "Merise / UML"],
  business: {
    en: ["Project Management", "ERP Systems", "Process Analysis", "Information Systems"],
    fr: ["Gestion de projet", "Systèmes ERP", "Analyse des processus", "Systèmes d'information"],
    ar: ["إدارة المشاريع", "أنظمة ERP", "تحليل العمليات", "نظم المعلومات"],
  },
  ai: {
    en: ["Data Analysis", "Machine Learning Basics", "Power BI", "Statistics"],
    fr: ["Analyse de données", "Bases du Machine Learning", "Power BI", "Statistiques"],
    ar: ["تحليل البيانات", "أساسيات تعلم الآلة", "Power BI", "الإحصاء"],
  },
};

const translations = {
  en: {
    nav: { about: "About", skills: "Skills", projects: "Projects", education: "Education", certifications: "Certifications", contact: "Contact" },
    hero: {
      eyebrow: "Student Profile — FST, Université de Nouakchott",
      tagline: "Computer Science Student / Business Information Systems / Future AI Engineer",
      ctaContact: "Get in touch", ctaProjects: "View projects",
    },
    about: {
      eyebrow: "About",
      heading: "Where software engineering meets business strategy.",
      p1: "I'm a computer science student specializing in **Informatique Appliquée à la Gestion d'Entreprise (MIAGE)** at the Faculté des Sciences et Techniques, Université de Nouakchott — a program built at the intersection of software engineering, information systems, and business management.",
      p2: "My interests center on **computer science fundamentals**, **artificial intelligence**, and **business process analysis** — I'm drawn to problems where a technically sound system also has to serve a real organizational need. I'm currently building toward a career as an AI engineer, with a foundation in enterprise systems thinking that most purely technical profiles don't have.",
      tags: ["Problem solving", "Systems thinking", "Continuous learning", "Data-driven"],
    },
    skills: { eyebrow: "Skills", heading: "A toolkit shaped by both code and context.",
      cats: { programming: "Programming", web: "Web Development", db: "Databases", business: "Business & Management", ai: "AI & Data" } },
    projects: {
      eyebrow: "Projects", heading: "Selected work — ready to grow.",
      slots: [
        { tag: "Slot 01", title: "Add your first project", desc: "This space is ready for a project summary, stack, and a link to the repo or live demo." },
        { tag: "Slot 02", title: "Add your second project", desc: "Showcase an academic, personal, or freelance project that reflects your engineering mindset." },
        { tag: "Slot 03", title: "Add your third project", desc: "Highlight measurable impact — performance gains, users reached, or problems solved." },
      ],
    },
    education: { eyebrow: "Education", status: "In progress", location: "Nouakchott, Mauritania" },
    certifications: { eyebrow: "Certifications", heading: "Credentials, as they're earned.", placeholder: "Add certification" },
    contact: {
      eyebrow: "Contact", heading: "Let's build something worth shipping.",
      p: "Open to internships, collaborative projects, and conversations about AI and business systems.",
    },
    footer: { tagline: "Built with intention" },
    id: { label: "DIGITAL ID", holder: "HOLDER", verified: "VERIFIED" },
  },

  fr: {
    nav: { about: "À propos", skills: "Compétences", projects: "Projets", education: "Formation", certifications: "Certifications", contact: "Contact" },
    hero: {
      eyebrow: "Profil étudiant — FST, Université de Nouakchott",
      tagline: "Étudiante en informatique / Systèmes d'information de gestion / Future ingénieure IA",
      ctaContact: "Me contacter", ctaProjects: "Voir les projets",
    },
    about: {
      eyebrow: "À propos",
      heading: "Là où l'ingénierie logicielle rencontre la stratégie d'entreprise.",
      p1: "Je suis étudiante en informatique, spécialisation **Informatique Appliquée à la Gestion d'Entreprise (MIAGE)** à la Faculté des Sciences et Techniques, Université de Nouakchott — une formation construite au croisement du génie logiciel, des systèmes d'information et de la gestion d'entreprise.",
      p2: "Mes centres d'intérêt portent sur les **fondamentaux de l'informatique**, l'**intelligence artificielle** et l'**analyse des processus métier** — j'aime les problèmes où un système techniquement solide doit aussi répondre à un vrai besoin organisationnel. Je construis actuellement mon parcours vers le métier d'ingénieure IA, avec une base en pensée systémique d'entreprise que peu de profils purement techniques possèdent.",
      tags: ["Résolution de problèmes", "Vision systémique", "Apprentissage continu", "Orientée données"],
    },
    skills: { eyebrow: "Compétences", heading: "Un socle façonné par le code et le contexte.",
      cats: { programming: "Programmation", web: "Développement Web", db: "Bases de données", business: "Gestion & Entreprise", ai: "IA & Données" } },
    projects: {
      eyebrow: "Projets", heading: "Travaux sélectionnés — prêts à grandir.",
      slots: [
        { tag: "Emplacement 01", title: "Ajoutez votre premier projet", desc: "Cet espace est prêt pour un résumé de projet, la stack technique et un lien vers le dépôt ou la démo." },
        { tag: "Emplacement 02", title: "Ajoutez votre deuxième projet", desc: "Mettez en avant un projet académique, personnel ou freelance qui reflète votre approche d'ingénieure." },
        { tag: "Emplacement 03", title: "Ajoutez votre troisième projet", desc: "Soulignez un impact mesurable — gains de performance, utilisateurs touchés ou problèmes résolus." },
      ],
    },
    education: { eyebrow: "Formation", status: "En cours", location: "Nouakchott, Mauritanie" },
    certifications: { eyebrow: "Certifications", heading: "Des certifications, au fur et à mesure.", placeholder: "Ajouter une certification" },
    contact: {
      eyebrow: "Contact", heading: "Construisons quelque chose qui compte.",
      p: "Ouverte aux stages, projets collaboratifs et échanges autour de l'IA et des systèmes d'entreprise.",
    },
    footer: { tagline: "Conçu avec intention" },
    id: { label: "IDENTITÉ NUMÉRIQUE", holder: "TITULAIRE", verified: "VÉRIFIÉ" },
  },

  ar: {
    nav: { about: "نبذة", skills: "المهارات", projects: "المشاريع", education: "التعليم", certifications: "الشهادات", contact: "تواصل" },
    hero: {
      eyebrow: "الملف الطلابي — كلية العلوم والتقنيات، جامعة نواكشوط",
      tagline: "طالبة علوم حاسوب / نظم معلومات إدارة الأعمال / مهندسة ذكاء اصطناعي مستقبلًا",
      ctaContact: "تواصل معي", ctaProjects: "عرض المشاريع",
    },
    about: {
      eyebrow: "نبذة عني",
      heading: "حيث تلتقي هندسة البرمجيات باستراتيجية الأعمال.",
      p1: "أنا طالبة علوم حاسوب متخصصة في **المعلوماتية المطبّقة على إدارة الأعمال (MIAGE)** بكلية العلوم والتقنيات، جامعة نواكشوط — برنامج مبني عند تقاطع هندسة البرمجيات، نظم المعلومات، وإدارة الأعمال.",
      p2: "تتركز اهتماماتي حول **أساسيات علوم الحاسوب**، و**الذكاء الاصطناعي**، و**تحليل العمليات التجارية** — أنجذب للمشكلات التي يحتاج فيها النظام السليم تقنيًا أن يخدم أيضًا حاجة تنظيمية حقيقية. أبني حاليًا مسيرتي نحو مهنة مهندسة ذكاء اصطناعي، مع أساس في التفكير المنظومي للمؤسسات لا يمتلكه أغلب الملفات التقنية البحتة.",
      tags: ["حل المشكلات", "التفكير المنظومي", "التعلم المستمر", "معتمدة على البيانات"],
    },
    skills: { eyebrow: "المهارات", heading: "مجموعة مهارات صقلتها البرمجة والسياق معًا.",
      cats: { programming: "البرمجة", web: "تطوير الويب", db: "قواعد البيانات", business: "الإدارة والأعمال", ai: "الذكاء الاصطناعي والبيانات" } },
    projects: {
      eyebrow: "المشاريع", heading: "أعمال مختارة — جاهزة للنمو.",
      slots: [
        { tag: "الفتحة 01", title: "أضيفي مشروعك الأول", desc: "هذا المكان جاهز لملخص المشروع، التقنيات المستخدمة، ورابط المستودع أو العرض المباشر." },
        { tag: "الفتحة 02", title: "أضيفي مشروعك الثاني", desc: "أبرزي مشروعًا أكاديميًا أو شخصيًا أو حرًّا يعكس أسلوبك الهندسي." },
        { tag: "الفتحة 03", title: "أضيفي مشروعك الثالث", desc: "أبرزي أثرًا قابلًا للقياس — تحسّن الأداء، عدد المستخدمين، أو مشكلات تم حلها." },
      ],
    },
    education: { eyebrow: "التعليم", status: "قيد الدراسة", location: "نواكشوط، موريتانيا" },
    certifications: { eyebrow: "الشهادات", heading: "شهادات، أولًا بأول.", placeholder: "إضافة شهادة" },
    contact: {
      eyebrow: "تواصل", heading: "لنبنِ شيئًا يستحق الإنجاز.",
      p: "منفتحة على فرص التدريب، والمشاريع التعاونية، والنقاشات حول الذكاء الاصطناعي ونظم إدارة الأعمال.",
    },
    footer: { tagline: "صُمم بعناية" },
    id: { label: "هوية رقمية", holder: "الاسم", verified: "موثّق" },
  },
};

const CERTS = [1, 2, 3];

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */
// Renders **bold** segments from translation strings without dangerouslySetInnerHTML
function RichText({ text, color }) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} style={{ color, fontWeight: 600 }}>{part}</strong>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </>
  );
}

function Reveal({ children, delay = 0, y = 24, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, color = GOLD }) {
  return (
    <div
      className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase mb-4"
      style={{ fontFamily: "'JetBrains Mono', monospace", color }}
    >
      <span className="w-4 h-px" style={{ background: color }} />
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                     */
/* ------------------------------------------------------------------ */
export default function PortfolioApp() {
  const [mode, setMode] = useState("dark");
  const [lang, setLang] = useState("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const T = THEMES[mode];
  const t = translations[lang];
  const dir = LANGS.find((l) => l.code === lang).dir;
  const isRTL = dir === "rtl";

  const fontBody = lang === "ar" ? "'Cairo', 'Inter', sans-serif" : "'Inter', sans-serif";
  const fontDisplay = lang === "ar" ? "'Cairo', sans-serif" : "'Poppins', sans-serif";

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const NAV_ORDER = ["about", "skills", "projects", "education", "certifications", "contact"];

  const scrollTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const NAV_LINKS = NAV_ORDER.map((id) => ({ id, label: t.nav[id] }));

  return (
    <div
      dir={dir}
      style={{
        background: T.bg, color: T.text, fontFamily: fontBody,
        minHeight: "100vh", position: "relative", overflowX: "hidden",
        transition: "background 0.5s ease, color 0.5s ease",
        "--font-display": fontDisplay, "--font-body": fontBody,
      }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@300;500;600;700&family=JetBrains+Mono:wght@400;500&family=Cairo:wght@400;500;600;700&display=swap"
      />
      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::selection { background: ${GOLD_SOFT}; color: ${T.text}; }
        .display { font-family: var(--font-display); }
        .mono { font-family: 'JetBrains Mono', monospace; direction: ltr; unicode-bidi: embed; }
        .bg-grid {
          background-image:
            linear-gradient(${T.panelBorder} 1px, transparent 1px),
            linear-gradient(90deg, ${T.panelBorder} 1px, transparent 1px);
          background-size: 44px 44px;
        }
        .glass {
          background: ${T.panel};
          border: 1px solid ${T.panelBorder};
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        .glow-gold:hover { box-shadow: 0 0 0 1px ${GOLD}55, 0 8px 40px -8px ${GOLD}44; }
        .glow-blue:hover { box-shadow: 0 0 0 1px ${BLUE}55, 0 8px 40px -8px ${BLUE}44; }
        .chip { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.03em; }
        a, button { -webkit-tap-highlight-color: transparent; }
        .focus-ring:focus-visible { outline: 2px solid ${GOLD}; outline-offset: 3px; border-radius: 8px; }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
        }
      `}</style>

      {/* Ambient background */}
      <div className="bg-grid" style={{ position: "fixed", inset: 0, opacity: mode === "dark" ? 0.5 : 0.6, pointerEvents: "none" }} />
      <div style={{ position: "fixed", top: "-10%", insetInlineEnd: "-10%", width: 520, height: 520, background: `radial-gradient(circle, ${GOLD}22, transparent 70%)`, filter: "blur(10px)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: "-15%", insetInlineStart: "-10%", width: 560, height: 560, background: `radial-gradient(circle, ${BLUE}1c, transparent 70%)`, filter: "blur(10px)", pointerEvents: "none" }} />

      {/* NAV */}
      <header
        className="glass focus-ring"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          borderTop: "none", borderLeft: "none", borderRight: "none",
          background: scrolled ? T.panel : "transparent",
          borderBottomColor: scrolled ? T.panelBorder : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          transition: "all 0.4s ease",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="mono focus-ring" style={{ fontSize: 14, letterSpacing: "0.08em", color: T.text, background: "none", border: "none", cursor: "pointer" }}>
            OCA<span style={{ color: GOLD }}>.</span>
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="focus-ring"
                style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: T.textDim, transition: "color 0.25s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = T.text)}
                onMouseLeave={(e) => (e.currentTarget.style.color = T.textDim)}
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Language switcher */}
            <div style={{ position: "relative" }}>
              <button
                aria-label="Change language"
                onClick={() => setLangOpen((o) => !o)}
                className="focus-ring"
                style={{ display: "flex", alignItems: "center", gap: 6, height: 36, padding: "0 12px", borderRadius: 999, border: `1px solid ${T.panelBorder}`, background: T.panel, color: T.text, cursor: "pointer", fontSize: 12 }}
              >
                <Languages size={14} />
                <span className="mono">{LANGS.find((l) => l.code === lang).label}</span>
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="glass"
                    style={{
                      position: "absolute", top: 44,
                      [isRTL ? "left" : "right"]: 0,
                      borderRadius: 14, padding: 6, minWidth: 128, zIndex: 60,
                      boxShadow: "0 20px 50px -12px rgba(0,0,0,0.4)",
                    }}
                  >
                    {LANGS.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => { setLang(l.code); setLangOpen(false); }}
                        className="focus-ring"
                        style={{
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          width: "100%", padding: "8px 10px", borderRadius: 8, border: "none",
                          background: l.code === lang ? GOLD_SOFT : "transparent",
                          color: l.code === lang ? GOLD : T.text,
                          fontSize: 12.5, cursor: "pointer", textAlign: isRTL ? "right" : "left",
                        }}
                      >
                        <span>{l.code === "en" ? "English" : l.code === "fr" ? "Français" : "العربية"}</span>
                        <span className="mono" style={{ fontSize: 10, opacity: 0.6 }}>{l.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              aria-label="Toggle theme"
              onClick={() => setMode((m) => (m === "dark" ? "light" : "dark"))}
              className="focus-ring"
              style={{ width: 36, height: 36, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${T.panelBorder}`, background: T.panel, color: T.text, cursor: "pointer" }}
            >
              {mode === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <button
              className="md:hidden focus-ring"
              aria-label="Menu"
              onClick={() => setMenuOpen((o) => !o)}
              style={{ width: 36, height: 36, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${T.panelBorder}`, background: T.panel, color: T.text, cursor: "pointer" }}
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden glass"
              style={{ overflow: "hidden", borderTop: `1px solid ${T.panelBorder}` }}
            >
              <div className="flex flex-col px-6 py-4 gap-1">
                {NAV_LINKS.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => scrollTo(l.id)}
                    className="focus-ring"
                    style={{ textAlign: isRTL ? "right" : "left", padding: "10px 4px", background: "none", border: "none", color: T.textDim, fontSize: 14, cursor: "pointer" }}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO */}
      <section id="hero" className="max-w-6xl mx-auto px-6 md:px-10 pt-36 pb-24 md:pt-48 md:pb-32 relative">
        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Eyebrow>{t.hero.eyebrow}</Eyebrow>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="display"
              style={{ fontSize: "clamp(2.4rem, 6vw, 4.4rem)", fontWeight: 600, lineHeight: 1.05, letterSpacing: lang === "ar" ? "normal" : "-0.02em" }}
            >
              Omeyme Cherif<br /><span style={{ color: T.textDim }}>Ahmed</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.28 }}
              className={lang === "ar" ? "" : "mono"}
              style={{ marginTop: 22, fontSize: lang === "ar" ? 14.5 : 13, color: T.textDim, lineHeight: 1.9, maxWidth: 460 }}
            >
              {t.hero.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-3 mt-10"
            >
              <button
                onClick={() => scrollTo("contact")}
                className="focus-ring"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 22px", borderRadius: 999, border: "none", background: GOLD, color: "#0a0a0c", fontSize: 13.5, fontWeight: 600, cursor: "pointer", transition: "transform 0.25s, box-shadow 0.25s" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 10px 30px -8px ${GOLD}99`; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
              >
                {t.hero.ctaContact} <ArrowUpRight size={15} style={{ transform: isRTL ? "scaleX(-1)" : "none" }} />
              </button>
              <button onClick={() => scrollTo("projects")} className="focus-ring glass" style={{ padding: "12px 22px", borderRadius: 999, fontSize: 13.5, color: T.text, cursor: "pointer", fontWeight: 500 }}>
                {t.hero.ctaProjects}
              </button>
            </motion.div>
          </div>

          <IDCard T={T} mode={mode} reduceMotion={reduceMotion} t={t.id} isRTL={isRTL} />
        </div>
      </section>

      {/* ABOUT */}
      <Section id="about" T={T}>
        <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-12 md:gap-20 items-start">
          <Reveal>
            <Eyebrow color={BLUE}>{t.about.eyebrow}</Eyebrow>
            <h2 className="display" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 600, letterSpacing: lang === "ar" ? "normal" : "-0.01em", lineHeight: 1.3 }}>
              {t.about.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ color: T.textDim, fontSize: 15.5, lineHeight: 1.9 }}><RichText text={t.about.p1} color={T.text} /></p>
            <p style={{ color: T.textDim, fontSize: 15.5, lineHeight: 1.9, marginTop: 18 }}><RichText text={t.about.p2} color={T.text} /></p>
            <div className="flex flex-wrap gap-2.5 mt-7">
              {t.about.tags.map((tag) => (
                <span key={tag} className="glass" style={{ fontFamily: lang === "ar" ? fontBody : "'JetBrains Mono', monospace", fontSize: lang === "ar" ? 12.5 : 11, padding: "7px 13px", borderRadius: 999, color: T.textDim }}>
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" T={T}>
        <Reveal>
          <Eyebrow>{t.skills.eyebrow}</Eyebrow>
          <h2 className="display" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 600, letterSpacing: lang === "ar" ? "normal" : "-0.01em", marginBottom: 44 }}>
            {t.skills.heading}
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { key: "programming", icon: Code2, accent: GOLD, items: T_ITEMS.programming },
            { key: "web", icon: Globe, accent: BLUE, items: T_ITEMS.web },
            { key: "db", icon: Database, accent: GOLD, items: T_ITEMS.db },
            { key: "business", icon: Briefcase, accent: BLUE, items: T_ITEMS.business[lang] },
            { key: "ai", icon: BrainCircuit, accent: GOLD, items: T_ITEMS.ai[lang] },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.key} delay={i * 0.06}>
                <div
                  className={`glass ${s.accent === GOLD ? "glow-gold" : "glow-blue"}`}
                  style={{ borderRadius: 18, padding: 26, height: "100%", transition: "box-shadow 0.35s, transform 0.35s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
                >
                  <div style={{ width: 40, height: 40, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: s.accent === GOLD ? GOLD_SOFT : BLUE_SOFT, color: s.accent, marginBottom: 18 }}>
                    <Icon size={18} />
                  </div>
                  <h3 style={{ fontSize: 15.5, fontWeight: 600, marginBottom: 14 }}>{t.skills.cats[s.key]}</h3>
                  <div className="flex flex-wrap gap-2">
                    {s.items.map((it) => (
                      <span key={it} className="chip" style={{ fontFamily: /[\u0600-\u06FF]/.test(it) ? fontBody : "'JetBrains Mono', monospace", color: T.textDim, padding: "5px 10px", borderRadius: 8, border: `1px solid ${T.panelBorder}` }}>
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects" T={T}>
        <Reveal>
          <Eyebrow color={BLUE}>{t.projects.eyebrow}</Eyebrow>
          <h2 className="display" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 600, letterSpacing: lang === "ar" ? "normal" : "-0.01em", marginBottom: 44 }}>
            {t.projects.heading}
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-5">
          {t.projects.slots.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div
                className="glass glow-gold"
                style={{ borderRadius: 18, padding: 26, height: "100%", display: "flex", flexDirection: "column", borderStyle: "dashed", transition: "box-shadow 0.35s, transform 0.35s" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="mono" style={{ fontSize: 11, color: T.textFaint }}>{p.tag}</span>
                  <div style={{ width: 30, height: 30, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", background: GOLD_SOFT, color: GOLD }}>
                    <Plus size={14} />
                  </div>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{p.title}</h3>
                <p style={{ fontSize: 13.5, color: T.textDim, lineHeight: 1.7, flexGrow: 1 }}>{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* EDUCATION */}
      <Section id="education" T={T}>
        <Reveal><Eyebrow>{t.education.eyebrow}</Eyebrow></Reveal>
        <Reveal delay={0.08}>
          <div className="glass" style={{ borderRadius: 22, padding: "36px 32px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -60, insetInlineEnd: -60, width: 180, height: 180, background: `radial-gradient(circle, ${GOLD_SOFT}, transparent 70%)` }} />
            <div className="flex flex-col md:flex-row md:items-center gap-6 relative">
              <div style={{ width: 54, height: 54, borderRadius: 14, background: GOLD_SOFT, color: GOLD, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <GraduationCap size={24} />
              </div>
              <div style={{ flexGrow: 1 }}>
                <h3 style={{ fontSize: 17, fontWeight: 600 }}>
                  Informatique Appliquée à la Gestion d'Entreprise <span style={{ color: T.textDim, fontWeight: 500 }}>(MIAGE)</span>
                </h3>
                <p style={{ fontSize: 14, color: T.textDim, marginTop: 6 }}>
                  Faculté des Sciences et Techniques (FST) — Université de Nouakchott
                </p>
                <div className="flex items-center gap-1.5 mt-3" style={{ color: T.textFaint, fontSize: 12.5 }}>
                  <MapPin size={13} /> {t.education.location}
                </div>
              </div>
              <span className="chip" style={{ fontFamily: lang === "ar" ? fontBody : "'JetBrains Mono', monospace", padding: "8px 16px", borderRadius: 999, border: `1px solid ${T.panelBorder}`, color: T.textDim, whiteSpace: "nowrap" }}>
                {t.education.status}
              </span>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* CERTIFICATIONS */}
      <Section id="certifications" T={T}>
        <Reveal>
          <Eyebrow color={BLUE}>{t.certifications.eyebrow}</Eyebrow>
          <h2 className="display" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 600, letterSpacing: lang === "ar" ? "normal" : "-0.01em", marginBottom: 44 }}>
            {t.certifications.heading}
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-3 gap-5">
          {CERTS.map((c, i) => (
            <Reveal key={c} delay={i * 0.06}>
              <div className="glass" style={{ borderRadius: 18, padding: 30, height: 160, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", borderStyle: "dashed", color: T.textFaint }}>
                <Award size={22} style={{ marginBottom: 10, opacity: 0.7 }} />
                <span style={{ fontFamily: lang === "ar" ? fontBody : "'JetBrains Mono', monospace", fontSize: lang === "ar" ? 12.5 : 11 }}>{t.certifications.placeholder}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" T={T} last>
        <Reveal>
          <div className="glass" style={{ borderRadius: 26, padding: "56px 36px", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "-30%", left: "50%", transform: "translateX(-50%)", width: 420, height: 420, background: `radial-gradient(circle, ${GOLD_SOFT}, transparent 70%)`, pointerEvents: "none" }} />
            <div className="relative">
              <Eyebrow>{t.contact.eyebrow}</Eyebrow>
              <h2 className="display" style={{ fontSize: "clamp(1.7rem, 4vw, 2.6rem)", fontWeight: 600, letterSpacing: lang === "ar" ? "normal" : "-0.01em", maxWidth: 560, margin: "0 auto" }}>
                {t.contact.heading}
              </h2>
              <p style={{ color: T.textDim, fontSize: 14.5, marginTop: 16, maxWidth: 440, marginLeft: "auto", marginRight: "auto" }}>
                {t.contact.p}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 mt-9">
                <ContactPill icon={Linkedin} label="LinkedIn" href="#" T={T} accent={BLUE} />
                <ContactPill icon={Github} label="GitHub" href="#" T={T} accent={GOLD} />
                <ContactPill icon={Mail} label="Email" href="#" T={T} accent={BLUE} />
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* FOOTER */}
      <footer className="max-w-6xl mx-auto px-6 md:px-10 py-10 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop: `1px solid ${T.panelBorder}` }}>
        <span className="mono" style={{ fontSize: 11.5, color: T.textFaint }}>© {new Date().getFullYear()} Omeyme Cherif Ahmed</span>
        <span className="mono" style={{ fontSize: 11.5, color: T.textFaint, display: "flex", alignItems: "center", gap: 6 }}>
          <Terminal size={12} /> {t.footer.tagline}
        </span>
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section wrapper                                                    */
/* ------------------------------------------------------------------ */
function Section({ id, children, T, last }) {
  return (
    <section id={id} className="max-w-6xl mx-auto px-6 md:px-10" style={{ padding: last ? "0 24px 96px" : "56px 24px" }}>
      {children}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Contact pill                                                       */
/* ------------------------------------------------------------------ */
function ContactPill({ icon: Icon, label, href, T, accent }) {
  return (
    <a
      href={href}
      className="focus-ring"
      style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 20px", borderRadius: 999, border: `1px solid ${T.panelBorder}`, color: T.text, fontSize: 13.5, fontWeight: 500, textDecoration: "none", transition: "all 0.3s" }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = accent + "88"; e.currentTarget.style.boxShadow = `0 8px 30px -10px ${accent}66`; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = T.panelBorder; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
    >
      <Icon size={15} style={{ color: accent }} /> {label}
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Signature hero element — a "digital credential" card                */
/* ------------------------------------------------------------------ */
function IDCard({ T, mode, reduceMotion, t, isRTL }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    if (reduceMotion || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: py * -8, y: px * 10 });
  };
  const reset = () => setTilt({ x: 0, y: 0 });
  const dots = useMemo(() => Array.from({ length: 48 }), []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
    >
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        dir="ltr"
        className="glass"
        style={{
          borderRadius: 24, padding: 30, position: "relative", overflow: "hidden",
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.3s ease-out",
          boxShadow: mode === "dark" ? "0 30px 80px -30px rgba(0,0,0,0.6)" : "0 30px 80px -30px rgba(0,0,0,0.15)",
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(115deg, transparent 30%, ${GOLD}22 45%, ${BLUE}18 55%, transparent 70%)`, transform: `translate(${tilt.y * 3}px, ${tilt.x * 3}px)`, transition: "transform 0.3s ease-out", pointerEvents: "none" }} />
        <div className="flex items-center justify-between relative">
          <span className="mono" style={{ fontSize: 10.5, letterSpacing: "0.15em", color: T.textFaint }}>{t.label}</span>
          <Sparkles size={14} color={GOLD} />
        </div>
        <div style={{ marginTop: 28, marginBottom: 28 }} className="relative">
          <p className="mono" style={{ fontSize: 10, color: T.textFaint, letterSpacing: "0.1em" }}>{t.holder}</p>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 20, fontWeight: 600, marginTop: 4 }}>Omeyme Cherif Ahmed</p>
          <p className="mono" style={{ fontSize: 11, color: T.textDim, marginTop: 8 }}>MIAGE · FST Nouakchott</p>
        </div>
        <div className="flex items-end justify-between relative">
          <div className="grid grid-cols-8 gap-[3px]" style={{ width: 96 }}>
            {dots.map((_, i) => (
              <span key={i} style={{ width: "100%", paddingBottom: "100%", borderRadius: 1, background: Math.random() > 0.42 ? T.panelBorder : "transparent" }} />
            ))}
          </div>
          <span className="chip" style={{ color: GOLD, border: `1px solid ${GOLD}44`, padding: "6px 12px", borderRadius: 999 }}>{t.verified}</span>
        </div>
      </div>
    </motion.div>
  );
}
