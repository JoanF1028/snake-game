import React from 'react';

interface GameOverScreenProps {
  score: number;
  onRestart: () => void;
  onBackToMenu: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ 
  score, 
  onRestart, 
  onBackToMenu 
}) => {
  return (
    <div className="game-overlay">
      <div className="text-center animate-slide-up">
        {/* Game Over Title */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold game-ui-text mb-4">
            GAME OVER
          </h1>
          <div className="w-24 h-1 bg-[hsl(var(--accent))] mx-auto rounded-full"></div>
        </div>

        {/* Score Display */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="bg-[hsl(var(--card))] rounded-lg p-6 border border-[hsl(var(--border))] max-w-sm mx-auto">
            <p className="text-[hsl(var(--text-secondary))] mb-2">Final Score</p>
            <p className="text-4xl font-bold game-ui-text text-[hsl(var(--accent))]">
              {score}
            </p>
            <p className="text-sm text-[hsl(var(--text-secondary))] mt-2">
              {score >= 100 ? '🏆 Excellent!' : 
               score >= 50 ? '🎯 Good job!' : 
               score >= 20 ? '👍 Not bad!' : 
               '🐍 Keep practicing!'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <button
            onClick={onRestart}
            className="game-button text-lg w-48 block mx-auto"
          >
            🔄 Play Again
          </button>
          
          <button
            onClick={onBackToMenu}
            className="bg-[hsl(var(--secondary))] text-[hsl(var(--text-primary))] 
                     hover:bg-[hsl(var(--muted))] px-8 py-3 rounded-lg font-bold 
                     transition-all duration-200 shadow-lg hover:shadow-xl 
                     hover:scale-105 cursor-pointer w-48 block mx-auto"
          >
            🏠 Back to Menu
          </button>
        </div>

        {/* Tips */}
        <div className="mt-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="max-w-md mx-auto bg-[hsl(var(--card))]/50 rounded-lg p-4 border border-[hsl(var(--border))]/50">
            <p className="text-xs text-[hsl(var(--text-secondary))]">
              💡 <strong>Pro tip:</strong> Plan your moves ahead and avoid getting trapped in corners!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameOverScreen;