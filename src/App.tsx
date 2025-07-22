
import { useState } from "react"

const rounds = [
  ["Enkla", "Viora"],
  ["Lattjo", "Kyra"],
  ["Nymane", "Arvia"],
  ["Lumina", "Gronlid"],
  ["Askvo", "Tarnaby"],
  ["Bixby", "Klippan"],
  ["Nolea", "Hemnes"],
  ["Finnala", "Ziora"],
  ["Jarpen", "Covexa"],
  ["Olara", "Smastad"]
]

const ikeaDescriptions: Record<string, string> = {
  Enkla: "basic cabinet frame",
  Lattjo: "children’s toy collection",
  Nymane: "wall/ceiling lamp",
  Gronlid: "modular sofa series",
  Tarnaby: "retro-style table lamp",
  Klippan: "two-seat sofa",
  Hemnes: "classic bedroom series",
  Finnala: "customizable couch",
  Jarpen: "shelf board",
  Smastad: "kids' storage system"
}

const aiDescriptions: Record<string, string> = {
  Viora: "virtual health assistant (Viorica Health)",
  Kyra: "AI productivity tool (Kyra Systems)",
  Arvia: "AI meeting assistant (Arvia AI)",
  Lumina: "AI webcam companion (Lumina)",
  Askvo: "AI helpdesk bot",
  Bixby: "Samsung virtual assistant",
  Nolea: "AI healthcare triage tool",
  Ziora: "AI onboarding assistant",
  Covexa: "AI-driven business insights",
  Olara: "AI beauty consultant"
}

const ikeaItems = new Set(Object.keys(ikeaDescriptions))

const Button = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...props}
    className={
      "bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition " +
      (props.className || "")
    }
  />
)

const Card = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    {...props}
    className={
      "border border-gray-300 rounded-lg bg-white " +
      (props.className || "")
    }
  />
)

const CardContent = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...props} className={"p-4 " + (props.className || "")} />
)

export default function AIorIKEA() {
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [revealed, setRevealed] = useState(false)

  const gameOver = current === rounds.length

  const round = !gameOver ? rounds[current] : []
  const correctAnswer = !gameOver ? round.find(name => !ikeaItems.has(name)) : null

  const handleGuess = (guess: string) => {
    if (revealed) return
    setSelected(guess)
    const guessIsAI = !ikeaItems.has(guess)
    if (guessIsAI) setScore(score + 1)
    setRevealed(true)
  }

  const nextRound = () => {
    if (current < rounds.length) {
      setCurrent(current + 1);
      setSelected(null);
      setRevealed(false);
    }
  };

  const getDescription = (name: string) => {
    return ikeaItems.has(name)
      ? ikeaDescriptions[name]
      : aiDescriptions[name] || "AI assistant"
  }

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6 text-center">
      <h1 className="text-2xl font-bold">AI Agent… or IKEA Furniture?</h1>

      {gameOver ? (
        <div>
          <p className="text-xl mb-4">You scored {score} out of {rounds.length}!</p>
          <Button onClick={() => { setCurrent(0); setScore(0) }}>Play Again</Button>
        </div>
      ) : (
        <>
          <p className="text-lg">Which of these is the AI name?</p>
          <div className="grid grid-cols-2 gap-4">
            {round.map((name, i) => (
              <Card key={i} onClick={() => handleGuess(name)} className="cursor-pointer hover:shadow-xl">
                <CardContent>
                  <div className="text-xl font-medium">{name}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {revealed && selected && (
            <div className="mt-4 text-lg">
              {selected === correctAnswer ? (
                <p className="text-green-600 font-semibold">✅ Correct! <strong>{selected}</strong> is the AI agent: {getDescription(selected)}</p>
              ) : (
                <>
                  <p className="text-red-600 font-semibold">❌ Incorrect. <strong>{selected}</strong> is IKEA furniture: {getDescription(selected)}</p>
                  <p className="mt-1">The AI agent was <strong>{correctAnswer}</strong>: {getDescription(correctAnswer!)}</p>
                </>
              )}
            </div>
          )}

          {revealed && (
            <Button onClick={nextRound} className="mt-4">Next Round</Button>
          )}
        </>
      )}
    </div>
  )
}
