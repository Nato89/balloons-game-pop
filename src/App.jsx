import React, { useState, useEffect, useRef, useCallback } from 'react';
import Balloon from './components/Balloon';
import { INITIAL_LIVES, BALLOON_SPAWN_RATE, COLORS } from './utils/constants';

function App() {
  const [gameState, setGameState] = useState('menu'); // menu, playing, gameover
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(INITIAL_LIVES);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [balloons, setBalloons] = useState([]);
  
  const requestRef = useRef();
  const lastTimeRef = useRef();
  const spawnTimerRef = useRef(0);
  
  const startGame = () => {
    setScore(0);
    setLives(INITIAL_LIVES);
    setTimeElapsed(0);
    setBalloons([]);
    setGameState('playing');
    lastTimeRef.current = performance.now();
    requestRef.current = requestAnimationFrame(gameLoop);
  };
  
  const endGame = useCallback(() => {
    setGameState('gameover');
    cancelAnimationFrame(requestRef.current);
  }, []);

  const handlePop = (id) => {
    setBalloons(prev => prev.map(b => b.id === id ? { ...b, popped: true } : b));
    setScore(s => s + 10);
    
    // Eliminar globo reventado después de la animación
    setTimeout(() => {
      setBalloons(prev => prev.filter(b => b.id !== id));
    }, 200);
  };
  
  const handleMiss = useCallback(() => {
    setLives(l => {
      const newLives = l - 1;
      if (newLives <= 0) {
        endGame();
      }
      return newLives;
    });
  }, [endGame]);

  const gameLoop = useCallback((time) => {
    if (gameState !== 'playing') return;
    
    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;
    
    // Actualización de tiempo (ms a segundos)
    setTimeElapsed(prev => prev + deltaTime / 1000);
    
    // Generar nuevos globos
    spawnTimerRef.current += deltaTime;
    // Aumentar dificultad (más globos) conforme suben los puntos
    const currentSpawnRate = Math.max(400, BALLOON_SPAWN_RATE - (score * 2.5));
    
    if (spawnTimerRef.current > currentSpawnRate) {
      spawnTimerRef.current = 0;
      spawnBalloon();
    }
    
    // Mover los globos existentes
    setBalloons(prevBalloons => {
      let activeBalloons = [];
      prevBalloons.forEach(b => {
        if (b.popped) {
          activeBalloons.push(b);
          return;
        }
        
        // b.y es un porcentaje (110 es abajo de la pantalla, -20 es arriba de la pantalla)
        const speed = b.speed + (score * 0.0015); // Aumentar velocidad con la puntuación
        const newY = b.y - speed * deltaTime * 0.04; 
        
        if (newY < -20) {
          // Globo perdido (llegó arriba)
          handleMiss();
        } else {
          activeBalloons.push({ ...b, y: newY });
        }
      });
      return activeBalloons;
    });
    
    requestRef.current = requestAnimationFrame(gameLoop);
  }, [gameState, score, handleMiss]);

  useEffect(() => {
    if (gameState === 'playing') {
      requestRef.current = requestAnimationFrame(gameLoop);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [gameLoop, gameState]);

  const spawnBalloon = () => {
    const size = Math.floor(Math.random() * 40) + 50; // entre 50px y 90px
    const newBalloon = {
      id: Math.random().toString(36).substr(2, 9),
      x: Math.floor(Math.random() * 80) + 10, // 10% a 90% del ancho
      y: 110, // Inicia debajo del área visible
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: size,
      speed: (Math.random() * 0.5) + 0.5, // 0.5 a 1.0 velocidad base
      popped: false
    };
    setBalloons(prev => [...prev, newBalloon]);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="game-container">
      {/* HUD (Heads Up Display) */}
      <div className="hud">
        <div className="glass-panel hud-stats">
          <div className="stat-box">
            <span className="stat-label">Score</span>
            <span className="stat-value">{score}</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">Time</span>
            <span className="stat-value">{formatTime(timeElapsed)}</span>
          </div>
        </div>
        
        <div className="glass-panel stat-box" style={{ flexDirection: 'row', gap: '0.5rem', padding: '1rem 1.5rem', pointerEvents: 'auto' }}>
          <span className="stat-label" style={{ marginRight: '0.5rem' }}>Lives</span>
          <div className="lives-container">
            {Array.from({ length: INITIAL_LIVES }).map((_, i) => (
              <span key={i} className={`life-heart ${i >= lives ? 'life-lost' : ''}`}>
                ❤️
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div className="play-area">
        {balloons.map(b => (
          <Balloon
            key={b.id}
            {...b}
            onClick={() => handlePop(b.id)}
          />
        ))}
      </div>

      {/* Menu Screens */}
      {gameState === 'menu' && (
        <div className="overlay-screen">
          <div className="glass-panel modal">
            <h1>Balloon Pop</h1>
            <p>Revienta los globos antes de que se escapen. No dejes que {INITIAL_LIVES} globos lleguen arriba.</p>
            <button className="btn" onClick={startGame}>Start Game</button>
          </div>
        </div>
      )}

      {gameState === 'gameover' && (
        <div className="overlay-screen">
          <div className="glass-panel modal">
            <h1 style={{ background: 'linear-gradient(to right, #ff4b1f 0%, #ff9068 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Game Over
            </h1>
            <p>¡Puntuación: <strong>{score}</strong>! Sobreviviste por <strong>{formatTime(timeElapsed)}</strong>.</p>
            <button className="btn" onClick={startGame}>Play Again</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
