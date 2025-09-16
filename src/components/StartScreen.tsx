import React from 'react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="text-center animate-fade-in">
      {/* Game Title */}
      <div className="mb-8">
        <h1 className="text-6xl md:text-7xl font-bold game-ui-text mb-4 animate-slide-up">
          🐍 SNAKE
        </h1>
        <p className="text-xl text-[hsl(var(--text-secondary))] animate-slide-up" style={{ animationDelay: '0.1s' }}>
          A Modern Classic
        </p>
      </div>

      {/* Game Instructions */}
      <div className="mb-8 max-w-md mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="bg-[hsl(var(--card))] rounded-lg p-6 border border-[hsl(var(--border))]">
          <h3 className="text-lg font-semibold game-ui-text mb-4">How to Play</h3>
          <div className="text-[hsl(var(--text-secondary))] space-y-2 text-sm">
            <p>🎮 Use arrow keys or WASD to control the snake</p>
            <p>🍎 Eat the orange food to grow and score points</p>
            <p>🚫 Don't hit the walls or yourself</p>
            <p>🏆 Try to get the highest score possible!</p>
          </div>
        </div>
      </div>

      {/* Play Button */}
      <button
        onClick={onStart}
        className="game-button text-xl animate-slide-up animate-game-pulse"
        style={{ animationDelay: '0.3s' }}
      >
        🎮 Start Game
      </button>

      {/* Controls Help */}
      <div className="mt-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <p className="text-sm text-[hsl(var(--text-secondary))] mb-4">Controls:</p>
        <div className="flex justify-center space-x-4 text-xs">
          <div className="bg-[hsl(var(--muted))] px-3 py-2 rounded">
            ↑ ↓ ← → Arrow Keys
          </div>
          <div className="bg-[hsl(var(--muted))] px-3 py-2 rounded">
            W A S D Keys
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;