import React, { useState, useEffect, useCallback } from 'react';
import StartScreen from './StartScreen';
import GameOverScreen from './GameOverScreen';

// Game constants
const BOARD_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 0, y: -1 }; // Moving up initially
const INITIAL_FOOD = { x: 15, y: 15 };
const GAME_SPEED = 150; // milliseconds

// Game states
type GameState = 'start' | 'playing' | 'gameOver';
type Position = { x: number; y: number };
type Direction = { x: number; y: number };

const SnakeGame: React.FC = () => {
  // Game state
  const [gameState, setGameState] = useState<GameState>('start');
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Position>(INITIAL_FOOD);
  const [score, setScore] = useState(0);

  // Generate random food position
  const generateFood = useCallback((currentSnake: Position[]): Position => {
    // Get all available positions
    const availablePositions: Position[] = [];
    
    for (let x = 0; x < BOARD_SIZE; x++) {
      for (let y = 0; y < BOARD_SIZE; y++) {
        const isOccupied = currentSnake.some(segment => segment.x === x && segment.y === y);
        if (!isOccupied) {
          availablePositions.push({ x, y });
        }
      }
    }
    
    // If no available positions (snake fills entire board), game should end
    // But this is extremely unlikely with a 20x20 board (400 cells)
    if (availablePositions.length === 0) {
      // This means the player has achieved the theoretical maximum!
      return { x: 0, y: 0 }; // Fallback, though this shouldn't happen
    }
    
    // Pick random available position
    const randomIndex = Math.floor(Math.random() * availablePositions.length);
    return availablePositions[randomIndex];
  }, []);

  // Check collision with walls or self
  const checkCollision = useCallback((head: Position, snakeBody: Position[]): boolean => {
    // Wall collision
    if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {
      return true;
    }
    // Self collision
    return snakeBody.some(segment => segment.x === head.x && segment.y === head.y);
  }, []);

  // Move snake
  const moveSnake = useCallback(() => {
    if (gameState !== 'playing') return;

    setSnake(currentSnake => {
      const newSnake = [...currentSnake];
      const head = { 
        x: newSnake[0].x + direction.x, 
        y: newSnake[0].y + direction.y 
      };

      // Check collision
      if (checkCollision(head, newSnake)) {
        setGameState('gameOver');
        return currentSnake;
      }

      newSnake.unshift(head);

      // Check if food is eaten
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 10);
        setFood(generateFood(newSnake));
      } else {
        newSnake.pop(); // Remove tail if no food eaten
      }

      return newSnake;
    });
  }, [gameState, direction, food, checkCollision, generateFood]);

  // Handle keyboard input
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (gameState !== 'playing') return;

    const { key } = event;
    let newDirection: Direction | null = null;

    // Arrow keys
    if (key === 'ArrowUp' || key === 'w' || key === 'W') {
      newDirection = { x: 0, y: -1 };
    } else if (key === 'ArrowDown' || key === 's' || key === 'S') {
      newDirection = { x: 0, y: 1 };
    } else if (key === 'ArrowLeft' || key === 'a' || key === 'A') {
      newDirection = { x: -1, y: 0 };
    } else if (key === 'ArrowRight' || key === 'd' || key === 'D') {
      newDirection = { x: 1, y: 0 };
    }

    // Prevent reverse direction
    if (newDirection && 
        !(newDirection.x === -direction.x && newDirection.y === -direction.y)) {
      setDirection(newDirection);
    }
  }, [gameState, direction]);

  // Start new game
  const startGame = () => {
    setGameState('playing');
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(INITIAL_FOOD);
    setScore(0);
  };

  // Reset game
  const resetGame = () => {
    setGameState('start');
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(generateFood(INITIAL_SNAKE));
    setScore(0);
  };

  // Game loop effect
  useEffect(() => {
    const gameInterval = setInterval(moveSnake, GAME_SPEED);
    return () => clearInterval(gameInterval);
  }, [moveSnake]);

  // Keyboard event listener
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  // Render game board
  const renderBoard = () => {
    const board = [];
    
    for (let y = 0; y < BOARD_SIZE; y++) {
      for (let x = 0; x < BOARD_SIZE; x++) {
        let cellClass = 'game-cell';
        
        // Check if this cell contains snake head
        if (snake[0] && snake[0].x === x && snake[0].y === y) {
          cellClass += ' snake-head';
        }
        // Check if this cell contains snake body
        else if (snake.slice(1).some(segment => segment.x === x && segment.y === y)) {
          cellClass += ' snake-segment';
        }
        // Check if this cell contains food
        else if (food.x === x && food.y === y) {
          cellClass += ' food';
        }
        
        board.push(
          <div
            key={`${x}-${y}`}
            className={cellClass}
          />
        );
      }
    }
    
    return board;
  };

  return (
    <div className="game-container">
      {/* Start Screen */}
      {gameState === 'start' && (
        <StartScreen onStart={startGame} />
      )}

      {/* Game Playing State */}
      {gameState === 'playing' && (
        <div className="animate-fade-in">
          {/* Score Display */}
          <div className="mb-6 text-center">
            <h2 className="text-3xl game-ui-text animate-slide-up">
              Score: {score}
            </h2>
            <p className="text-sm text-[hsl(var(--text-secondary))] mt-2">
              Use arrow keys or WASD to control the snake
            </p>
          </div>

          {/* Game Board */}
          <div 
            className="game-board mx-auto"
            style={{
              width: 'min(90vw, 90vh, 500px)',
              height: 'min(90vw, 90vh, 500px)',
            }}
          >
            {renderBoard()}
          </div>
        </div>
      )}

      {/* Game Over Screen */}
      {gameState === 'gameOver' && (
        <GameOverScreen 
          score={score} 
          onRestart={startGame}
          onBackToMenu={resetGame}
        />
      )}
    </div>
  );
};

export default SnakeGame;