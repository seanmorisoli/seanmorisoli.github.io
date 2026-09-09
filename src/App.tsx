import { useState, type ReactNode } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import githubIcon from '../assets/github.png'
import linkedinIcon from '../assets/linkedin.png'
import investNestLogo from '../assets/investnest-logo.png'
import paceifyLogo from '../assets/paceify.png'
import unrealGameImage from '../assets/unrealgame.png'
import resume from '../assets/morisoli-resume.pdf'

type Project = { name: string; year: string; description: string; technologies: string[]; image: string; links?: { label: string; href: string }[] }

const projects: Project[] = [
  { name: 'InvestNest', year: '2026', description: 'A full-stack personal finance application built by a six-person team. I developed the Node.js and Express backend supporting a React and TypeScript frontend with PostgreSQL.', technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL'], image: investNestLogo },
  { name: 'Paceify', year: '2025', description: "A 24-hour Pitt SteelHacks XII project that generates running playlists by matching a user's pace and cadence to song BPM, with Spotify OAuth 2.0 and Web API integration.", technologies: ['React', 'Node.js', 'Spotify Web API'], image: paceifyLogo },
  { name: 'Unreal Engine FPS', year: '2024', description: 'A first-person shooter where players locate and destroy targets within a time limit. Gameplay mechanics, UI, and asset integration were built with Unreal Engine Blueprint.', technologies: ['Unreal Engine 5', 'Blueprint'], image: unrealGameImage, links: [{ label: 'Download', href: 'https://drive.google.com/file/d/1gOoIOaqV30_wDXjOftadYH0hWQy_C9AC/view?usp=sharing' }, { label: 'Demo', href: 'https://youtu.be/V_ag0Uyeo6c?feature=shared' }] },
]

const experiences = [
  { company: 'Cencora', location: 'Conshohocken, PA', role: 'Visualization Intern', dates: 'June 2026 – Present', details: 'Developed Playwright UI tests for the ARGUS Warehouse Automation platform and expanded the framework with reusable JSON configurations. Also helped build GitHub Actions and Jira automation that triggers tests on a self-hosted Linux server.' },
  { company: 'Vistra', location: 'Beaver Valley, PA', role: 'Simulator Software Engineer Intern', dates: 'May 2025 – August 2025', details: 'Developed a VBA and SQL login system for an internal work request database, added user-specific change tracking, and helped troubleshoot simulator hardware and software integration issues.' },
]

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noreferrer" className="inline-link">{children}<ArrowUpRight size={14} /></a>
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const close = () => setOpen(false)
  const navItems: Array<{ label: string; section: string } | { label: string; href: string }> = [{ label: 'About', section: 'about' }, { label: 'Experience', section: 'experience' }, { label: 'Projects', section: 'projects' }]
  const goToSection = (section: string) => {
    close()
    if (location.pathname !== '/') {
      navigate('/')
      window.setTimeout(() => document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' }), 0)
      return
    }
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })
  }
  return <header className="site-header"><div className="nav-shell"><Link to="/" className="wordmark" onClick={close}>Sean Morisoli</Link><button className="menu-button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={21} /> : <Menu size={21} />}</button><nav className={`nav-links ${open ? 'is-open' : ''}`} aria-label="Primary navigation">{navItems.map((item) => 'section' in item ? <a key={item.label} href={`#${item.section}`} onClick={(event) => { event.preventDefault(); goToSection(item.section) }}>{item.label}</a> : <Link key={item.label} to={item.href} onClick={close} className={location.pathname === item.href ? 'active' : ''}>{item.label}</Link>)}<ExternalLink href="https://github.com/seanmorisoli"><img className="social-image" src={githubIcon} alt="GitHub" /></ExternalLink><ExternalLink href="https://www.linkedin.com/in/sean-morisoli"><img className="social-image" src={linkedinIcon} alt="LinkedIn" /></ExternalLink><a href={resume} target="_blank" rel="noreferrer" className="resume-link">Resume</a></nav></div></header>
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) { return <div className="section-heading"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div> }

function ProjectItem({ project }: { project: Project }) {
  return <article className="project-item"><div className={`project-image-wrap ${project.name === 'Paceify' ? 'paceify-image' : ''}`}><img src={project.image} alt={`${project.name} project preview`} /></div><div className="project-copy"><div className="project-title-row"><h3>{project.name}</h3><span>{project.year}</span></div><p>{project.description}</p><div className="tag-list">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>{project.links && <div className="project-links">{project.links.map((link) => <ExternalLink key={link.label} href={link.href}>{link.label}</ExternalLink>)}</div>}</div></article>
}

function Footer() { return <footer><div><strong>Sean Morisoli</strong><span>© 2026</span></div><div className="footer-links"><ExternalLink href="https://github.com/seanmorisoli">GitHub</ExternalLink><ExternalLink href="https://www.linkedin.com/in/sean-morisoli">LinkedIn</ExternalLink><ExternalLink href={resume}>Resume</ExternalLink></div></footer> }

function Home() {
  return <><main><section className="hero page-section"><div className="hero-rule" /><p className="eyebrow">Computer Science @ Pitt</p><h1>Sean Morisoli</h1><p className="hero-subtitle"> Visualization Intern @ Cencora</p><div className="hero-actions"><Link to="/projects" className="button button-primary">View projects <ArrowUpRight size={16} /></Link><a href={resume} target="_blank" rel="noreferrer" className="button">View resume <ArrowUpRight size={16} /></a></div></section><section id="about" className="page-section split-section"><SectionHeading eyebrow="01" title="About" /><div className="section-body"><p>I’m a Computer Science student at the University of Pittsburgh, graduating in May 2027 with minors in Information Science and Music. I have software engineering experience from internships at Cencora and Vistra.</p><p>I’m interested in full-stack development, automation and testing, and SCADA. Outside of computer science, music, cooking, lifting, skiing, and gaming keep me busy.</p></div></section><section id="experience" className="page-section split-section"><SectionHeading eyebrow="02" title="Experience" /><div className="section-body timeline">{experiences.map((experience) => <article className="timeline-item" key={experience.company}><div className="timeline-meta"><strong>{experience.company}</strong><span>{experience.location}</span></div><div><h3>{experience.role}</h3><p className="muted">{experience.dates}</p><p>{experience.details}</p></div></article>)}<article className="timeline-item education"><div className="timeline-meta"><strong>University of Pittsburgh</strong><span>Expected May 2027</span></div><div><h3>B.S. Computer Science</h3><p className="muted">Minors: Information Science and Music · GPA: 3.86/4.0</p></div></article></div></section><section id="projects" className="page-section split-section"><SectionHeading eyebrow="03" title="Featured projects" /><div className="section-body project-list">{projects.map((project) => <ProjectItem project={project} key={project.name} />)}<Link to="/projects" className="all-projects">View all projects <ArrowUpRight size={16} /></Link></div></section><section className="page-section split-section skills-section"><SectionHeading eyebrow="04" title="Skills" /><div className="section-body skills"><p><strong>Languages</strong> Java · Python · JavaScript · TypeScript · SQL · C · VBA</p><p><strong>Frameworks</strong> React · Node.js · Express · Playwright · Selenium · Vite</p><p><strong>Tools</strong> Git · GitHub Actions · Jira · Linux · PostgreSQL · Render · Vercel</p></div></section></main><Footer /></>
}

function ProjectsPage() { return <><main><section className="page-section projects-page"><div className="hero-rule" /><p className="eyebrow">Selected work</p><h1>Projects</h1><p className="page-intro">A few practical projects spanning full-stack web development, APIs, and game development.</p><div className="project-list all-project-list">{projects.map((project) => <ProjectItem project={project} key={project.name} />)}</div></section></main><Footer /></> }

export default function App() { return <><Navbar /><Routes><Route path="/" element={<Home />} /><Route path="/projects" element={<ProjectsPage />} /></Routes></> }
