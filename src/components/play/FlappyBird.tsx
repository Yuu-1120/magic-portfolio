'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './FlappyBird.module.scss';

// --- Constants ---
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 600;
const BIRD_SIZE = 28;
const BIRD_X = 80;
const GRAVITY = 0.45;
const JUMP_FORCE = -7.5;
const PIPE_WIDTH = 56;
const PIPE_GAP = 150;
const PIPE_SPEED = 2.5;
const PIPE_SPAWN_INTERVAL = 100;
const GROUND_HEIGHT = 60;

interface Bird {
  y: number;
  velocity: number;
  rotation: number;
  frame: number;
}

interface Pipe {
  x: number;
  topHeight: number;
  scored: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

type GameState = 'idle' | 'playing' | 'gameover';

export default function FlappyBird() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const [gameState, setGameState] = useState<GameState>('idle');
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    if (typeof window !== 'undefined') {
      return Number(localStorage.getItem('flappy-best') || 0);
    }
    return 0;
  });

  const birdRef = useRef<Bird>({ y: CANVAS_HEIGHT / 2, velocity: 0, rotation: 0, frame: 0 });
  const pipesRef = useRef<Pipe[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const frameCountRef = useRef(0);
  const scoreRef = useRef(0);
  const gameStateRef = useRef<GameState>('idle');
  const groundOffsetRef = useRef(0);

  // Sync state to ref
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  // --- Particle System ---
  const spawnParticles = useCallback((x: number, y: number, count: number, colors: string[]) => {
    for (let i = 0; i < count; i++) {
      particlesRef.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6 - 2,
        life: 30 + Math.random() * 20,
        maxLife: 50,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 2 + Math.random() * 4
      });
    }
  }, []);

  // --- Drawing Helpers ---
  const drawBird = useCallback((ctx: CanvasRenderingContext2D, bird: Bird) => {
    ctx.save();
    ctx.translate(BIRD_X + BIRD_SIZE / 2, bird.y + BIRD_SIZE / 2);
    ctx.rotate(bird.rotation);

    // Body glow
    const glow = ctx.createRadialGradient(0, 0, BIRD_SIZE / 2, 0, 0, BIRD_SIZE);
    glow.addColorStop(0, 'rgba(255, 220, 50, 0.3)');
    glow.addColorStop(1, 'rgba(255, 220, 50, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(-BIRD_SIZE, -BIRD_SIZE, BIRD_SIZE * 2, BIRD_SIZE * 2);

    // Body
    const bodyGrad = ctx.createLinearGradient(-BIRD_SIZE / 2, -BIRD_SIZE / 2, BIRD_SIZE / 2, BIRD_SIZE / 2);
    bodyGrad.addColorStop(0, '#FFE066');
    bodyGrad.addColorStop(0.5, '#FFD700');
    bodyGrad.addColorStop(1, '#FFA500');
    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.ellipse(0, 0, BIRD_SIZE / 2, BIRD_SIZE / 2.2, 0, 0, Math.PI * 2);
    ctx.fill();

    // Wing
    const wingOffset = Math.sin(bird.frame * 0.3) * 4;
    ctx.fillStyle = '#F0C040';
    ctx.beginPath();
    ctx.ellipse(-4, 2 + wingOffset, 8, 5, -0.3, 0, Math.PI * 2);
    ctx.fill();

    // Eye
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(8, -5, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#222';
    ctx.beginPath();
    ctx.arc(10, -5, 3, 0, Math.PI * 2);
    ctx.fill();

    // Beak
    ctx.fillStyle = '#FF6B35';
    ctx.beginPath();
    ctx.moveTo(12, 0);
    ctx.lineTo(20, 2);
    ctx.lineTo(12, 5);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }, []);

  const drawPipe = useCallback((ctx: CanvasRenderingContext2D, pipe: Pipe) => {
    const capHeight = 20;
    const capExtra = 6;

    // Top pipe
    const topGrad = ctx.createLinearGradient(pipe.x, 0, pipe.x + PIPE_WIDTH, 0);
    topGrad.addColorStop(0, '#4CAF50');
    topGrad.addColorStop(0.3, '#66BB6A');
    topGrad.addColorStop(0.7, '#43A047');
    topGrad.addColorStop(1, '#2E7D32');
    ctx.fillStyle = topGrad;
    ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight);

    // Top cap
    const capGrad = ctx.createLinearGradient(pipe.x - capExtra, 0, pipe.x + PIPE_WIDTH + capExtra, 0);
    capGrad.addColorStop(0, '#388E3C');
    capGrad.addColorStop(0.3, '#4CAF50');
    capGrad.addColorStop(0.7, '#43A047');
    capGrad.addColorStop(1, '#2E7D32');
    ctx.fillStyle = capGrad;
    ctx.fillRect(pipe.x - capExtra, pipe.topHeight - capHeight, PIPE_WIDTH + capExtra * 2, capHeight);

    // Top cap highlight
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.fillRect(pipe.x - capExtra, pipe.topHeight - capHeight, PIPE_WIDTH + capExtra * 2, 3);

    // Bottom pipe
    const bottomY = pipe.topHeight + PIPE_GAP;
    const bottomHeight = CANVAS_HEIGHT - GROUND_HEIGHT - bottomY;
    ctx.fillStyle = topGrad;
    ctx.fillRect(pipe.x, bottomY, PIPE_WIDTH, bottomHeight);

    // Bottom cap
    ctx.fillStyle = capGrad;
    ctx.fillRect(pipe.x - capExtra, bottomY, PIPE_WIDTH + capExtra * 2, capHeight);

    // Bottom cap highlight
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.fillRect(pipe.x - capExtra, bottomY, PIPE_WIDTH + capExtra * 2, 3);

    // Pipe shadow
    ctx.fillStyle = 'rgba(0,0,0,0.08)';
    ctx.fillRect(pipe.x + PIPE_WIDTH - 4, 0, 4, pipe.topHeight);
    ctx.fillRect(pipe.x + PIPE_WIDTH - 4, bottomY, 4, bottomHeight);
  }, []);

  const drawBackground = useCallback((ctx: CanvasRenderingContext2D) => {
    // Sky gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT - GROUND_HEIGHT);
    skyGrad.addColorStop(0, '#87CEEB');
    skyGrad.addColorStop(0.4, '#B0E0F6');
    skyGrad.addColorStop(0.7, '#E0F0FF');
    skyGrad.addColorStop(1, '#FFF8DC');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT - GROUND_HEIGHT);

    // Clouds (static decorative)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    const drawCloud = (x: number, y: number, s: number) => {
      ctx.beginPath();
      ctx.arc(x, y, 20 * s, 0, Math.PI * 2);
      ctx.arc(x + 25 * s, y - 10 * s, 25 * s, 0, Math.PI * 2);
      ctx.arc(x + 50 * s, y, 18 * s, 0, Math.PI * 2);
      ctx.fill();
    };
    drawCloud(50, 80, 1);
    drawCloud(200, 120, 0.8);
    drawCloud(320, 60, 0.7);
    drawCloud(150, 200, 0.5);
  }, []);

  const drawGround = useCallback((ctx: CanvasRenderingContext2D) => {
    const groundY = CANVAS_HEIGHT - GROUND_HEIGHT;

    // Ground base
    const groundGrad = ctx.createLinearGradient(0, groundY, 0, CANVAS_HEIGHT);
    groundGrad.addColorStop(0, '#8B7355');
    groundGrad.addColorStop(0.15, '#DEB887');
    groundGrad.addColorStop(0.3, '#D2B48C');
    groundGrad.addColorStop(1, '#A0826D');
    ctx.fillStyle = groundGrad;
    ctx.fillRect(0, groundY, CANVAS_WIDTH, GROUND_HEIGHT);

    // Grass strip
    ctx.fillStyle = '#4CAF50';
    ctx.fillRect(0, groundY, CANVAS_WIDTH, 8);
    ctx.fillStyle = '#66BB6A';
    ctx.fillRect(0, groundY, CANVAS_WIDTH, 3);

    // Ground pattern (scrolling)
    ctx.fillStyle = 'rgba(0,0,0,0.06)';
    const offset = groundOffsetRef.current % 24;
    for (let x = -offset; x < CANVAS_WIDTH; x += 24) {
      ctx.fillRect(x, groundY + 12, 12, 4);
      ctx.fillRect(x + 12, groundY + 24, 12, 4);
    }
  }, []);

  const drawParticles = useCallback((ctx: CanvasRenderingContext2D) => {
    particlesRef.current.forEach(p => {
      const alpha = p.life / p.maxLife;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }, []);

  // --- Game Logic ---
  const resetGame = useCallback(() => {
    birdRef.current = { y: CANVAS_HEIGHT / 2, velocity: 0, rotation: 0, frame: 0 };
    pipesRef.current = [];
    particlesRef.current = [];
    frameCountRef.current = 0;
    scoreRef.current = 0;
    setScore(0);
  }, []);

  const jump = useCallback(() => {
    if (gameStateRef.current === 'idle') {
      resetGame();
      setGameState('playing');
      birdRef.current.velocity = JUMP_FORCE;
      spawnParticles(BIRD_X, birdRef.current.y, 5, ['#FFD700', '#FFF', '#FFE066']);
    } else if (gameStateRef.current === 'playing') {
      birdRef.current.velocity = JUMP_FORCE;
      spawnParticles(BIRD_X, birdRef.current.y, 5, ['#FFD700', '#FFF', '#FFE066']);
    } else if (gameStateRef.current === 'gameover') {
      resetGame();
      setGameState('idle');
    }
  }, [resetGame, spawnParticles]);

  const gameOver = useCallback(() => {
    setGameState('gameover');
    spawnParticles(BIRD_X, birdRef.current.y, 20, ['#FF4444', '#FF6B35', '#FFD700', '#FFF']);

    if (scoreRef.current > bestScore) {
      setBestScore(scoreRef.current);
      if (typeof window !== 'undefined') {
        localStorage.setItem('flappy-best', String(scoreRef.current));
      }
    }
  }, [bestScore, spawnParticles]);

  // --- Main Game Loop ---
  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bird = birdRef.current;
    const pipes = pipesRef.current;
    const particles = particlesRef.current;

    // Update
    if (gameStateRef.current === 'playing') {
      frameCountRef.current++;
      groundOffsetRef.current += PIPE_SPEED;

      // Bird physics
      bird.velocity += GRAVITY;
      bird.y += bird.velocity;
      bird.rotation = Math.min(bird.velocity * 0.08, Math.PI / 3);
      bird.frame++;

      // Pipe spawning
      if (frameCountRef.current % PIPE_SPAWN_INTERVAL === 0) {
        const minTop = 60;
        const maxTop = CANVAS_HEIGHT - GROUND_HEIGHT - PIPE_GAP - 60;
        const topHeight = minTop + Math.random() * (maxTop - minTop);
        pipes.push({ x: CANVAS_WIDTH, topHeight, scored: false });
      }

      // Pipe movement & collision
      for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].x -= PIPE_SPEED;

        // Score
        if (!pipes[i].scored && pipes[i].x + PIPE_WIDTH < BIRD_X) {
          pipes[i].scored = true;
          scoreRef.current++;
          setScore(scoreRef.current);
          spawnParticles(BIRD_X + 20, bird.y, 8, ['#4CAF50', '#8BC34A', '#FFD700']);
        }

        // Remove off-screen
        if (pipes[i].x + PIPE_WIDTH < -10) {
          pipes.splice(i, 1);
          continue;
        }

        // Collision detection
        const birdLeft = BIRD_X + 4;
        const birdRight = BIRD_X + BIRD_SIZE - 4;
        const birdTop = bird.y + 4;
        const birdBottom = bird.y + BIRD_SIZE - 4;
        const pipeLeft = pipes[i].x;
        const pipeRight = pipes[i].x + PIPE_WIDTH;

        if (birdRight > pipeLeft && birdLeft < pipeRight) {
          if (birdTop < pipes[i].topHeight || birdBottom > pipes[i].topHeight + PIPE_GAP) {
            gameOver();
          }
        }
      }

      // Ground / ceiling collision
      if (bird.y + BIRD_SIZE > CANVAS_HEIGHT - GROUND_HEIGHT || bird.y < 0) {
        gameOver();
      }
    } else if (gameStateRef.current === 'idle') {
      // Floating animation
      bird.y = CANVAS_HEIGHT / 2 + Math.sin(Date.now() * 0.003) * 15;
      bird.frame++;
      groundOffsetRef.current += 0.5;
    }

    // Update particles
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].x += particles[i].vx;
      particles[i].y += particles[i].vy;
      particles[i].vy += 0.1;
      particles[i].life--;
      if (particles[i].life <= 0) {
        particles.splice(i, 1);
      }
    }

    // --- Draw ---
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    drawBackground(ctx);

    // Pipes
    pipes.forEach(pipe => drawPipe(ctx, pipe));

    // Ground
    drawGround(ctx);

    // Bird
    drawBird(ctx, bird);

    // Particles
    drawParticles(ctx);

    // Score display (in-game)
    if (gameStateRef.current === 'playing') {
      ctx.save();
      ctx.font = 'bold 48px "Segoe UI", system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.fillText(String(scoreRef.current), CANVAS_WIDTH / 2 + 2, 72);
      ctx.fillStyle = '#fff';
      ctx.strokeStyle = 'rgba(0,0,0,0.3)';
      ctx.lineWidth = 3;
      ctx.strokeText(String(scoreRef.current), CANVAS_WIDTH / 2, 70);
      ctx.fillText(String(scoreRef.current), CANVAS_WIDTH / 2, 70);
      ctx.restore();
    }

    animFrameRef.current = requestAnimationFrame(gameLoop);
  }, [drawBackground, drawBird, drawGround, drawParticles, drawPipe, gameOver, spawnParticles]);

  // Start/stop game loop
  useEffect(() => {
    animFrameRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [gameLoop]);

  // Keyboard & touch controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [jump]);

  return (
    <div className={styles.container}>
      <div className={styles.gameWrapper}>
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className={styles.canvas}
          onClick={jump}
          onTouchStart={e => {
            e.preventDefault();
            jump();
          }}
        />

        {/* Start Screen Overlay */}
        {gameState === 'idle' && (
          <div className={`${styles.overlay} ${styles.overlayIdle}`}>
            <div className={styles.titleCard}>
              <h1 className={styles.title}>Flappy Bird</h1>
              <p className={styles.subtitle}>Tap or press Space to fly</p>
              <div className={styles.bestBadge}>
                <span className={styles.bestLabel}>Best</span>
                <span className={styles.bestValue}>{bestScore}</span>
              </div>
            </div>
          </div>
        )}

        {/* Game Over Overlay */}
        {gameState === 'gameover' && (
          <div className={`${styles.overlay} ${styles.overlayGameOver}`}>
            <div className={styles.resultCard}>
              <h2 className={styles.gameOverTitle}>Game Over</h2>
              <div className={styles.scoreRow}>
                <div className={styles.scoreBox}>
                  <span className={styles.scoreLabel}>Score</span>
                  <span className={styles.scoreValue}>{score}</span>
                </div>
                <div className={styles.scoreBox}>
                  <span className={styles.scoreLabel}>Best</span>
                  <span className={styles.scoreValue}>{bestScore}</span>
                </div>
              </div>
              {score >= bestScore && score > 0 && <div className={styles.newRecord}>New Record!</div>}
              <p className={styles.restartHint}>Tap to restart</p>
            </div>
          </div>
        )}
      </div>

      {/* Controls hint */}
      <div className={styles.controls}>
        <span className={styles.key}>Space</span>
        <span className={styles.key}>↑</span>
        <span className={styles.key}>Click</span>
        <span className={styles.key}>Tap</span>
      </div>
    </div>
  );
}
