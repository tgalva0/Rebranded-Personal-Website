import perfilNavbar from './assets/perfil-sem-fundo.png'
import perfil from './assets/perfil.png'
import {useEffect, useRef, useState} from "react";
import './App.css'
function App() {
    const [isHovering, setIsHovering] = useState(false);
    const textRef = useRef(null);

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
      {/* Texto Fixo + Texto Dinâmico */}
                <span style={{ color: '#F8F0FB' }}>Desenvolvedor </span>
      <span className="dynamic-text" style={{ color: color }}>
        {text}
      </span>
      <span className="cursor">&nbsp;</span>
    </span>
        );
    };

    return (
        <body className="App">
            <div>
                <header className="navbar">
                    <div className="perfil-container">
                        <img src={perfilNavbar} alt="logo" />
                        <h1 cref={textRef}
                            className={`texto-magnetico ${isHovering ? 'ativo' : ''}`}
                            onMouseMove={handleMouseMove}
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={handleMouseLeave}>Portfólio</h1>
                    </div>
                    <ul className="nav">
                        <li className="nav-item"><a href={'#hero'}>Sobre Mim</a></li>
                        <li className="nav-item"><a>Projetos</a></li>
                        <li className="nav-item"><a>Contato</a></li>
                    </ul>
                </header>

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
                                    Estudante de Bacharelado em Sistemas de Informação, sou apaixonado por transformar lógica em soluções reais. Atualmente, foco meus estudos no ecossistema <b>Java</b>, desenvolvendo desde aplicações de produtividade pessoal até sistemas complexos de gestão com <b>Spring Boot e Spring Security</b>. Tenho facilidade em aprender novas tecnologias e busco minha primeira oportunidade para aplicar conhecimentos em <b>desenvolvimento Backend e APIs REST</b> em um ambiente profissional desafiador.
                                </p>
                            </div>
                        </div>

                    </div>
                </main>

            </div>
        </body>

    )
}
export default App