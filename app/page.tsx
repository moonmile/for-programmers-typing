'use client'

import TypingGame from './components/TypingGame'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-mono">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-green-300">
          プログラマ向けタイピングゲーム
        </h1>
        <TypingGame />
      </main>
    </div>
  )
}
