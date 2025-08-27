'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { getRandomText } from './typingData'

interface GameStats {
  wpm: number
  accuracy: number
  correctChars: number
  totalChars: number
  errors: number
  skips: number
}

export default function TypingGame() {
  const [currentText, setCurrentText] = useState('')
  const [userInput, setUserInput] = useState('')
  const [gameStarted, setGameStarted] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60) // 60秒
  const [gameStartTime, setGameStartTime] = useState<number | null>(null)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [stats, setStats] = useState<GameStats>({
    wpm: 0,
    accuracy: 100,
    correctChars: 0,
    totalChars: 0,
    errors: 0,
    skips: 0
  })
  
  const inputRef = useRef<HTMLInputElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // ゲーム初期化
  useEffect(() => {
    setCurrentText(getRandomText())
  }, [])

  // ゲーム終了
  const endGame = useCallback(() => {
    setGameEnded(true)
    setGameStarted(false)
    
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    
    // 最終統計を計算（正確な経過時間を使用）
    if (gameStartTime) {
      const now = Date.now()
      const timeElapsedMs = now - gameStartTime
      const timeElapsedMinutes = timeElapsedMs / (1000 * 60)
      const wordsTyped = stats.correctChars / 5 // 平均的な単語の長さを5文字として計算
      const finalWpm = timeElapsedMinutes > 0 ? Math.round(wordsTyped / timeElapsedMinutes) : 0
      
      setStats(prev => ({ ...prev, wpm: finalWpm }))
    }
  }, [gameStartTime, stats.correctChars])

  // 文章スキップ機能（ペナルティ付き）
  const skipCurrentText = useCallback(() => {
    if (!gameStarted || gameEnded) return
    
    // 新しいテキストを生成
    setCurrentText(getRandomText())
    setCurrentCharIndex(0)
    setUserInput('')
    
    // ペナルティとしてエラーに+10、スキップ回数も増加
    setStats(prev => ({
      ...prev,
      errors: prev.errors + 10,
      totalChars: prev.totalChars + 10,
      skips: prev.skips + 1,
      accuracy: Math.round((prev.correctChars / (prev.totalChars + 10)) * 100)
    }))
  }, [gameStarted, gameEnded])

  // タイマー処理（計算ベースの正確な時間管理）
  useEffect(() => {
    if (gameStarted && !gameEnded && gameStartTime) {
      timerRef.current = setInterval(() => {
        const now = Date.now()
        const elapsed = Math.floor((now - gameStartTime) / 1000)
        const remaining = Math.max(0, 60 - elapsed)
        
        setTimeLeft(remaining)
        
        if (remaining <= 0) {
          endGame()
        }
      }, 100) // より頻繁にチェック（100ms間隔）
    } else {
      // ゲームが開始されていないか終了している場合、タイマーをクリア
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [gameStarted, gameEnded, gameStartTime, endGame])

  // グローバルESCキーリスナー
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && gameStarted && !gameEnded) {
        e.preventDefault()
        skipCurrentText()
      }
    }

    // イベントリスナーを追加
    document.addEventListener('keydown', handleGlobalKeyDown)

    // クリーンアップ
    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown)
    }
  }, [gameStarted, gameEnded, skipCurrentText])

  // ゲーム開始
  const startGame = () => {
    const now = Date.now()
    setGameStarted(true)
    setGameEnded(false)
    setTimeLeft(60)
    setGameStartTime(now)
    setUserInput('')
    setCurrentCharIndex(0)
    setStats({ wpm: 0, accuracy: 100, correctChars: 0, totalChars: 0, errors: 0, skips: 0 })
    setCurrentText(getRandomText())
    
    // フォーカスを入力欄に設定
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
  }

  // 入力処理
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!gameStarted || gameEnded) return

    const value = e.target.value
    
    // 入力長が現在位置を超えている場合、現在位置の文字のみをチェック
    if (value.length > currentCharIndex) {
      const currentChar = currentText[currentCharIndex]
      const inputChar = value[currentCharIndex]

      if (inputChar === currentChar) {
        // 正解 - 次の文字に進む
        setUserInput(value)
        setCurrentCharIndex(prev => prev + 1)
        setStats(prev => ({
          ...prev,
          correctChars: prev.correctChars + 1,
          totalChars: prev.totalChars + 1,
          accuracy: Math.round(((prev.correctChars + 1) / (prev.totalChars + 1)) * 100)
        }))

        // テキストの最後に到達したら新しいテキストを生成
        if (currentCharIndex + 1 >= currentText.length) {
          setCurrentText(getRandomText())
          setCurrentCharIndex(0)
          setUserInput('')
        }
      } else {
        // 不正解 - 入力を現在位置までに制限し、カーソルは進まない
        setUserInput(value.slice(0, currentCharIndex))
        setStats(prev => ({
          ...prev,
          errors: prev.errors + 1,
          totalChars: prev.totalChars + 1,
          accuracy: Math.round((prev.correctChars / (prev.totalChars + 1)) * 100)
        }))
      }
    } else {
      // バックスペースなどで文字が削除された場合
      setUserInput(value)
    }

    // リアルタイムWPM計算（正確な経過時間を使用）
    if (gameStartTime) {
      const now = Date.now()
      const timeElapsedMs = now - gameStartTime
      const timeElapsedMinutes = timeElapsedMs / (1000 * 60)
      
      if (timeElapsedMinutes > 0) {
        const wordsTyped = stats.correctChars / 5
        const currentWpm = Math.round(wordsTyped / timeElapsedMinutes)
        setStats(prev => ({ ...prev, wpm: currentWpm }))
      }
    }
  }

  // キー入力処理
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      // ESCキーで文章スキップ
      e.preventDefault()
      skipCurrentText()
    } else if (e.key === 'Backspace') {
      // バックスペースは許可するが、正解文字まで削除されないようにする
      if (userInput.length > currentCharIndex) {
        // 間違った文字のみ削除可能
        return
      } else {
        // 正解文字の削除は禁止
        e.preventDefault()
      }
    }
  }

  // 文字の表示スタイルを決定
  const getCharStyle = (charIndex: number) => {
    if (charIndex < userInput.length) {
      // 入力済みの文字
      if (userInput[charIndex] === currentText[charIndex]) {
        return 'text-green-400 bg-green-900/30' // 正解
      } else {
        return 'text-red-400 bg-red-900/30' // 不正解
      }
    } else if (charIndex === userInput.length) {
      return 'text-yellow-400 bg-yellow-900/50 animate-pulse' // 現在の文字
    } else {
      return 'text-gray-400' // 未入力
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-lg shadow-xl">
      {/* ヘッダー情報 */}
      <div className="mb-6 grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
        <div className="bg-gray-700 p-3 rounded">
          <div className="text-sm text-gray-400">時間</div>
          <div className="text-2xl font-bold text-blue-400">{timeLeft}s</div>
        </div>
        <div className="bg-gray-700 p-3 rounded">
          <div className="text-sm text-gray-400">WPM</div>
          <div className="text-2xl font-bold text-green-400">{stats.wpm}</div>
        </div>
        <div className="bg-gray-700 p-3 rounded">
          <div className="text-sm text-gray-400">正確性</div>
          <div className="text-2xl font-bold text-purple-400">{stats.accuracy}%</div>
        </div>
        <div className="bg-gray-700 p-3 rounded">
          <div className="text-sm text-gray-400">エラー</div>
          <div className="text-2xl font-bold text-red-400">{stats.errors}</div>
        </div>
        <div className="bg-gray-700 p-3 rounded">
          <div className="text-sm text-gray-400">スキップ</div>
          <div className="text-2xl font-bold text-orange-400">{stats.skips}</div>
        </div>
      </div>

      {/* メインゲーム画面 */}
      <div className="mb-6">
        {!gameStarted && !gameEnded && (
          <div className="text-center py-8">
            <p className="text-xl mb-4 text-gray-300">
              プログラマ向けタイピングゲームへようこそ！
            </p>
            <p className="text-gray-400 mb-6">
              60秒間でできる限り多くの文字を正確にタイプしてください。<br/>
              プログラミング用語、略語のフルスペル、コード片が出題されます。
            </p>
            <button
              onClick={startGame}
              className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors"
            >
              ゲーム開始
            </button>
          </div>
        )}

        {gameStarted && !gameEnded && (
          <div>
            {/* タイピングテキスト表示 */}
            <div className="bg-gray-900 p-6 rounded-lg mb-4 min-h-[120px] flex items-center">
              <div className="text-2xl leading-relaxed font-mono">
                {currentText.split('').map((char, index) => (
                  <span
                    key={index}
                    className={`${getCharStyle(index)} px-1 py-0.5 rounded`}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </div>
            </div>

            {/* 入力フィールド */}
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="w-full p-4 text-xl bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:border-blue-500 focus:outline-none font-mono"
              placeholder="ここにタイプしてください..."
              autoComplete="off"
              spellCheck="false"
            />
            
            <div className="mt-2 text-center space-x-4">
              <button
                onClick={skipCurrentText}
                className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded transition-colors"
                title="文章をスキップ（ESCキーまたはクリック / ペナルティ: エラー+10）"
              >
                文章スキップ (ESC / -10ペナルティ)
              </button>
              <button
                onClick={endGame}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
              >
                ゲーム終了
              </button>
            </div>
          </div>
        )}

        {gameEnded && (
          <div className="text-center py-8">
            <h2 className="text-3xl font-bold mb-6 text-green-400">ゲーム終了！</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-lg mx-auto mb-6">
              <div className="bg-gray-700 p-4 rounded">
                <div className="text-lg text-gray-400">最終WPM</div>
                <div className="text-3xl font-bold text-green-400">{stats.wpm}</div>
              </div>
              <div className="bg-gray-700 p-4 rounded">
                <div className="text-lg text-gray-400">正確性</div>
                <div className="text-3xl font-bold text-purple-400">{stats.accuracy}%</div>
              </div>
              <div className="bg-gray-700 p-4 rounded">
                <div className="text-lg text-gray-400">正解文字数</div>
                <div className="text-3xl font-bold text-blue-400">{stats.correctChars}</div>
              </div>
              <div className="bg-gray-700 p-4 rounded">
                <div className="text-lg text-gray-400">エラー数</div>
                <div className="text-3xl font-bold text-red-400">{stats.errors}</div>
              </div>
              <div className="bg-gray-700 p-4 rounded">
                <div className="text-lg text-gray-400">スキップ数</div>
                <div className="text-3xl font-bold text-orange-400">{stats.skips}</div>
              </div>
              <div className="bg-gray-700 p-4 rounded">
                <div className="text-lg text-gray-400">ペナルティ</div>
                <div className="text-3xl font-bold text-yellow-400">{stats.skips * 10}</div>
              </div>
            </div>
            
            <button
              onClick={startGame}
              className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors"
            >
              もう一度プレイ
            </button>
          </div>
        )}
      </div>

      {/* 説明 */}
      <div className="text-sm text-gray-400 text-center space-y-1">
        <p>
          💡 ヒント: 正解の文字のみが入力されます。間違った文字は入力されず、カーソルはそのままです。
        </p>
        <p>
          ⚠️ スキップ機能: 長い文章は「ESCキー」または「スキップボタン」で飛ばせますが、エラー+10のペナルティがあります。
        </p>
      </div>
    </div>
  )
}
