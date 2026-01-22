import perfilNavbar from './assets/perfil-sem-fundo.png'
import perfil from './assets/perfil.png'
import {useEffect, useRef, useState} from "react";
import ScrollReveal from './components/ScrollReveal';
import './App.css'
import * as contentful from "contentful";

const Typewriter = ({ textList, color }) => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    useEffect(() => {
        const handleType = () => {
            const i = loopNum % textList.length;
            const fullText = textList[i];

            setText(isDeleting
                ? fullText.substring(0, text.length - 1)
                : fullText.substring(0, text.length + 1)
            );

            setTypingSpeed(isDeleting ? 50 : 150);

            if (!isDeleting && text === fullText) {
                setTimeout(() => setIsDeleting(true), 2000);
            }
            else if (isDeleting && text === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        const timer = setTimeout(handleType, typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum, textList, typingSpeed]);

    return (
        <span>
            <span style={{ color: '#F8F0FB' }}>Desenvolvedor </span>
            <span className="dynamic-text" style={{ color: color }}>
                {text}
            </span>
            <span className="cursor">&nbsp;</span>
        </span>
    );
};

function App() {
    const [isHovering, setIsHovering] = useState(false);
    const textRef = useRef(null);

    const [menuOpen, setMenuOpen] = useState(false);
    const handleMouseMove = (e) => {
        const element = e.currentTarget;
        const rect = element.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const moveX = (x - centerX) * 0.1;
        const moveY = (y - centerY) * 0.1;

        element.style.setProperty('--x', `${x}px`);
        element.style.setProperty('--y', `${y}px`);

        element.style.setProperty('--move-x', `${moveX}px`);
        element.style.setProperty('--move-y', `${moveY}px`);
    };

    const handleMouseLeave = (e) => {
        setIsHovering(false);

        const element = e.currentTarget;
        element.style.setProperty('--move-x', `0px`);
        element.style.setProperty('--move-y', `0px`);
    };

    const handleImageTilt = (e) => {
        const container = e.currentTarget;
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const intensity = 5;
        const rotateX = ((y - centerY) / centerY) * -intensity;
        const rotateY = ((x - centerX) / centerX) * intensity;

        container.style.setProperty('--rX', `${rotateX}deg`);
        container.style.setProperty('--rY', `${rotateY}deg`);
    };

    const handleImageReset = (e) => {
        const container = e.currentTarget;
        container.style.setProperty('--rX', `0deg`);
        container.style.setProperty('--rY', `0deg`);
    };

    const skills = [
        { name: "Java", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
        { name: "Spring", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
        { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { name: "JavaScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "SQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg" },
        { name: "Git", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
        { name: "HTML5", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
        { name: "CSS3", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    ];

    const client = contentful.createClient({
        space: import.meta.env.VITE_SPACE_ID,
        environment: 'master',
        accessToken: import.meta.env.VITE_ACCESS_TOKEN
    })

    const getProjects = async () => {
        const response = await client.getEntries({
            content_type: 'sitePessoal',
            order: '-sys.createdAt'
        });

        // Limpando os dados para facilitar o uso no componente
        return response.items.map(item => ({
            id: item.sys.id,
            titulo: item.fields.titulo,
            descricao: item.fields.descricao,
            imagem: item.fields.imagem?.fields.file.url,
            linkGithub: item.fields.linkGithub,
            linkDeploy: item.fields.linkDeploy,
            tags: item.fields.tags || []
        }));
    };

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        getProjects().then((data) => {
            setProjects(data);
        });
    }, []);

    const [emailCopied, setEmailCopied] = useState(false);

    const handleCopyEmail = () => {
        const myEmail = "tgalvaoferreira@gmail.com";

        navigator.clipboard.writeText(myEmail);
        setEmailCopied(true);

        setTimeout(() => setEmailCopied(false), 3000);
    };

    return (
        <body className="App">
            <div>
                <nav className="navbar">
                    <div className="perfil-container">
                        <img src={perfilNavbar} alt="logo" />
                        <h1 cref={textRef}
                            className={`texto-magnetico ${isHovering ? 'ativo' : ''}`}
                            onMouseMove={handleMouseMove}
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={handleMouseLeave}>Portfólio</h1>
                    </div>

                    <div className="mobile-menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? (
                            <svg viewBox="0 0 24 24" width="30" height="30" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" width="30" height="30" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="3" y1="12" x2="21" y2="12"></line>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <line x1="3" y1="18" x2="21" y2="18"></line>
                            </svg>
                        )}
                    </div>

                    <ul className={`nav ${menuOpen ? 'active' : ''}`}>
                        <li className="nav-item"><a href="#hero" onClick={() => setMenuOpen(false)}>Sobre Mim</a></li>
                        <li className="nav-item"><a href="#projetos" onClick={() => setMenuOpen(false)}>Projetos</a></li>
                        <li className="nav-item"><a href="#contato" onClick={() => setMenuOpen(false)}>Contato</a></li>
                    </ul>
                </nav>

                <main className="content">
                    <div className="hero-container" id={'hero'}>
                        <div className="img-container position-relative tilt-effect"
                             onMouseMove={handleImageTilt}
                             onMouseLeave={handleImageReset}>
                            <div className={'decorative-square big-square'}></div>
                            <div className={'decorative-square small-square'}></div>
                            <img src={perfil} className={'profile-image'} alt="logo" />
                        </div>
                        <div className="info-container">
                            <h1><b>Thiago Galvão Ferreira</b> é um</h1>
                            <h2 style={{ fontSize: '2rem', marginTop: '-10px' }}>
                                <Typewriter
                                    textList={['Java', 'JavaScript', 'Python', 'React']}
                                    color="#00d4ff"
                                />
                            </h2>
                            <div className={`decorative-square text-container ${isHovering ? 'active' : ''}`}
                                 onMouseMove={handleMouseMove}
                                 onMouseEnter={() => setIsHovering(true)}
                                 onMouseLeave={handleMouseLeave}>
                                <p>
                                    Estudante de Bacharelado em Sistemas de Informação, sou apaixonado por transformar lógica em soluções reais. Atualmente, foco meus estudos no ecossistema <b>Java</b>, desenvolvendo desde aplicações de produtividade pessoal até sistemas complexos de gestão com <b>Spring Boot e Spring Security</b>
                                </p>
                            </div>
                        </div>
                    </div>
                    <ScrollReveal delay={200}>
                        <div className={'skills-container'}>
                            <p className='skills-title'>Minhas Habilidades Técnicas</p>
                            <div className="carousel-window">
                                <div className="carousel-track">
                                    {[...skills, ...skills].map((skill, index) => (
                                        <div className="skill-card" key={index}>
                                            <img src={skill.img} alt={skill.name} />
                                            <span>{skill.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </main>
                <div id="projetos" className="projects-section">
                    <ScrollReveal>
                        <h2 className="section-title">Meus Projetos</h2>
                    </ScrollReveal>

                    <div className="projects-grid">
                        {projects.map((proj, index) => (
                            <ScrollReveal key={proj.id} delay={index * 100}>
                                <div key={proj.id} className="project-card">
                                    <div className="project-img-box">
                                        {proj.imagem && <img src={`https:${proj.imagem}`} alt={proj.titulo} />}
                                    </div>

                                    <div className="project-content">
                                        <h3>{proj.titulo}</h3>

                                        <div className="project-tags">
                                            {proj.tags.map((tag, i) => (
                                                <span key={i} className="tag">{tag}</span>
                                            ))}
                                        </div>

                                        <p>{proj.descricao}</p>

                                        <div className="project-links">
                                            {proj.linkGithub && (
                                                <a href={proj.linkGithub} target="_blank" rel="noreferrer" className="btn-project">
                                                    GitHub
                                                </a>
                                            )}
                                            {proj.linkDeploy && (
                                                <a href={proj.linkDeploy} target="_blank" rel="noreferrer" className="btn-project outline">
                                                    Demo
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>

                        ))}
                    </div>
                </div>
                <div id="contato" className="contact-section">
                    <ScrollReveal>
                        <div className="contact-content">
                            <h2 className="section-title">Vamos Conversar?</h2>
                            <p className="contact-text">
                                Estou sempre aberto a novas oportunidades e desafios no mundo Java e Backend.
                                Se você tem uma vaga, um projeto ou apenas quer trocar uma ideia, me chame!
                            </p>

                            <div className="social-grid">
                                <a href="https://www.linkedin.com/in/tgalvaoferreira/" target="_blank" rel="noreferrer" className="social-card linkedin">
                                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt="LinkedIn" />
                                    <div className="social-info">
                                        <h3>LinkedIn</h3>
                                        <span>Conecte-se profissionalmente</span>
                                    </div>
                                </a>
                                <a href="https://github.com/tgalva0" target="_blank" rel="noreferrer" className="social-card github">
                                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" className="github-icon" alt="GitHub" />
                                    <div className="social-info">
                                        <h3>GitHub</h3>
                                        <span>Veja meu código fonte</span>
                                    </div>
                                </a>
                                <div onClick={handleCopyEmail} className="social-card email" style={{ cursor: 'pointer' }}>
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="email-icon">
                                        <path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <rect x="3" y="5" width="18" height="14" rx="2" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>

                                    <div className="social-info">
                                        <h3>{emailCopied ? "Copiado!" : "Email"}</h3>
                                        <span>{emailCopied ? "Pronto para colar" : "Clique para copiar"}</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </ScrollReveal>
                    <footer className="footer">
                        <p>© 2026 Thiago Galvão Ferreira. Desenvolvido com React & CSS Puro.</p>
                    </footer>
                </div>
            </div>
        </body>

    )
}
export default App