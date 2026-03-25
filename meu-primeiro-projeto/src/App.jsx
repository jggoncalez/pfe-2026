// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import confetti from "canvas-confetti";
import './App.css'
import { toast, Toaster } from "react-hot-toast";
import Tilt from "react-parallax-tilt";

function Saudacao({ name, cargo }) {
  return (
    <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} scale={1.03} glareEnable={true} glareMaxOpacity={0.2}>
      <div style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '8px', marginBottom: '10px' }}>
        <h2 style={{ color: '#007bff' }}>Olá, {name}!</h2>
        <p>Cargo: {cargo}</p>
      </div>
    </Tilt>
  )
}

function BotaoFogos() {
  const handleClick = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  return (
    <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} scale={1.03} glareEnable={true} glareMaxOpacity={0.2}>
      <div style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '8px', marginBottom: '10px' }}>
        <h2 style={{ color: '#007bff' }}>Fogos de Artifício de Confete</h2>
        <button onClick={handleClick}>Clica aqui!</button>
      </div>
    </Tilt>
  )
}

function BotaoToast() {
  return (
    <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} scale={1.03} glareEnable={true} glareMaxOpacity={0.2}>
      <div style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '8px', marginBottom: '10px' }}>
        <h2 style={{ color: '#007bff' }}>Torradeira</h2>
        <button onClick={() => toast.success("🍞")}>
          Ligar
        </button>
      </div>
    </Tilt>
  )
}

function App() {
  return (
    <>
      <Toaster />
      <div>
        <h1>Olá, React!</h1>
        <p>Estou alterando meu primeiro componente.</p>
      </div>

      <div style={{ padding: '20px' }}>
        <h2>Minha Primeira Aula de React</h2>
        <hr></hr>
      </div>

      <Saudacao name="João" cargo="Developer"/>
      <BotaoFogos />
      <BotaoToast />
    </>
  )
}
export default App
