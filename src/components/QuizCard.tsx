import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, XCircle, ChevronRight, RotateCcw, Award } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ModuleQuiz } from '@/data/quiz'
import { cn } from '@/lib/utils'

interface QuizCardProps {
    quiz: ModuleQuiz;
    onComplete: (score: number) => void;
}

export default function QuizCard({ quiz, onComplete }: QuizCardProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [selectedOption, setSelectedOption] = useState<number | null>(null)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [score, setScore] = useState(0)
    const [isFinished, setIsFinished] = useState(false)

    const currentQuestion = quiz.questions[currentQuestionIndex]
    const isCorrect = selectedOption === currentQuestion.correctAnswer

    const handleSubmit = () => {
        if (selectedOption === null) return
        setIsSubmitted(true)
        if (isCorrect) setScore(score + 1)
    }

    const handleNext = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1)
            setSelectedOption(null)
            setIsSubmitted(false)
        } else {
            setIsFinished(true)
            onComplete(score + (isCorrect ? 1 : 0))
        }
    }

    const resetQuiz = () => {
        setCurrentQuestionIndex(0)
        setSelectedOption(null)
        setIsSubmitted(false)
        setScore(0)
        setIsFinished(false)
    }

    if (isFinished) {
        const finalScore = score
        const percentage = Math.round((finalScore / quiz.questions.length) * 100)
        const passed = percentage >= 70

        return (
            <Card className="border-none shadow-2xl bg-white dark:bg-slate-900 overflow-hidden">
                <div className={cn(
                    "h-2",
                    passed ? "bg-emerald-500" : "bg-amber-500"
                )} />
                <CardContent className="p-12 text-center space-y-6">
                    <div className={cn(
                        "w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4",
                        passed ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"
                    )}>
                        <Award className="w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-bold">Quiz Complete!</h2>
                    <p className="text-slate-500 text-lg">
                        You scored <span className="font-bold text-slate-900 dark:text-white">{finalScore}/{quiz.questions.length}</span> ({percentage}%)
                    </p>

                    <div className="pt-6 flex justify-center gap-4">
                        <Button variant="outline" onClick={resetQuiz} className="rounded-xl gap-2 font-bold h-12 px-6">
                            <RotateCcw className="w-4 h-4" /> Try Again
                        </Button>
                        {passed && (
                            <Button className="bg-primary hover:bg-orange-600 text-white rounded-xl gap-2 font-bold h-12 px-6">
                                Continue Module <ChevronRight className="w-4 h-4" />
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="border-2 border-slate-100 dark:border-slate-800 shadow-xl bg-white dark:bg-slate-900 overflow-hidden">
            <CardHeader className="p-8 pb-4">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest px-2 py-1 rounded-md bg-primary/10 dark:bg-primary/20">
                        Assessment
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                        Question {currentQuestionIndex + 1} of {quiz.questions.length}
                    </span>
                </div>
                <CardTitle className="text-2xl font-bold leading-tight">
                    {currentQuestion.question}
                </CardTitle>
            </CardHeader>

            <CardContent className="p-8 pt-6 space-y-8">
                <div className="space-y-3">
                    {currentQuestion.options.map((option, i) => (
                        <button
                            key={i}
                            disabled={isSubmitted}
                            onClick={() => setSelectedOption(i)}
                            className={cn(
                                "w-full p-4 rounded-2xl text-left border-2 transition-all flex items-center justify-between group",
                                selectedOption === i
                                    ? "border-primary bg-primary/10 dark:bg-primary/20"
                                    : "border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50",
                                isSubmitted && i === currentQuestion.correctAnswer && "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20",
                                isSubmitted && selectedOption === i && i !== currentQuestion.correctAnswer && "border-rose-500 bg-rose-50 dark:bg-rose-900/20"
                            )}
                        >
                            <span className={cn(
                                "font-medium",
                                selectedOption === i ? "text-orange-700 dark:text-orange-400" : "text-slate-600 dark:text-slate-400",
                                isSubmitted && i === currentQuestion.correctAnswer && "text-emerald-700 dark:text-emerald-400",
                                isSubmitted && selectedOption === i && i !== currentQuestion.correctAnswer && "text-rose-700 dark:text-rose-400"
                            )}>
                                {option}
                            </span>

                            {isSubmitted && i === currentQuestion.correctAnswer && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                            {isSubmitted && selectedOption === i && i !== currentQuestion.correctAnswer && <XCircle className="w-5 h-5 text-rose-500" />}
                        </button>
                    ))}
                </div>

                <AnimatePresence>
                    {isSubmitted && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={cn(
                                "p-4 rounded-xl text-sm font-medium",
                                isCorrect ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300" : "bg-rose-50 text-rose-800 dark:bg-rose-900/20 dark:text-rose-300"
                            )}
                        >
                            <p className="font-bold mb-1">{isCorrect ? "Correct!" : "Incorrect"}</p>
                            <p className="opacity-80">{currentQuestion.explanation}</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="pt-4 flex justify-end">
                    {!isSubmitted ? (
                        <Button
                            onClick={handleSubmit}
                            disabled={selectedOption === null}
                            className="bg-primary hover:bg-orange-600 text-white rounded-xl px-8 h-12 font-bold shadow-lg shadow-primary/20"
                        >
                            Submit Answer
                        </Button>
                    ) : (
                        <Button
                            onClick={handleNext}
                            className="bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-xl px-8 h-12 font-bold gap-2"
                        >
                            {currentQuestionIndex < quiz.questions.length - 1 ? "Next Question" : "Finish Quiz"}
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
