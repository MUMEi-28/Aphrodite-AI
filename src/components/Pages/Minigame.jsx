import { useState } from 'react'

import languages from "../../data/minigame/Messages.js"
import { getFarewellText, getRandomWord } from "../../data/minigame/gameMessages.js"
import Confetti from "react-confetti"


export default function Minigame()
{
    // State Values
    const [currentWord, setCurrentWord] = useState(function () { return getRandomWord() })
    const [guessedLetter, setGuessedLetter] = useState([])

    // Derived values
    const wrongGuessCount = guessedLetter.filter(function (letter) { return !currentWord.includes(letter) }).length

    const isGameLost = wrongGuessCount >= 9
    const isGameWon = currentWord.split("").every(function (letter) { return guessedLetter.includes(letter) })

    const lastGuessLetter = guessedLetter[guessedLetter.length - 1]
    const islastGuessIncorrect = lastGuessLetter && !currentWord.includes(lastGuessLetter)

    console.log(islastGuessIncorrect)

    const isGameOver = isGameLost || isGameWon

    // Static Values
    const alphabet = "abcdefghijklmnopqrstuvwxyz"

    function onGuessLetter(letter)
    {
        setGuessedLetter(function (prevLetter)
        {
            return prevLetter.includes(letter) ? prevLetter : [...prevLetter, letter]
        })

    }

    function startNewGame()
    {
        setCurrentWord(getRandomWord())
        setGuessedLetter([])
    }

    return (
        <>

            {isGameWon && <Confetti />}
            <div className='bg-[#1e1e1e] min-h-screen flex flex-col items-center justify-center'>
                <div className="min-w-lg max-w-lg bg-[#282726] rounded-md text-center px-8 min-h-[65vh] max-h-[65vh]">


                    <header className='p-3'>
                        <h1 className='text-2xl font-mono text-white my-3'>Hangman: Love Edition</h1>
                        <p className='text-gray-200'>Guess the word in under 9 attempts to keep Aphrodite happy!</p>
                    </header>
                    {!isGameOver && wrongGuessCount === 0 ? (
                        <section className="bg-blue-600 p-2 mt-4 mb-9 rounded-md">
                            <p className="text-lg">APRHODITE MESSAGE</p>
                        </section>
                    ) : isGameWon && isGameOver ? (
                        <section className="bg-green-500 p-2 mt-4 mb-9 rounded-md">
                            <h1 className="text-lg">ADD APHRODITE CONGRATULATION MESSAGE HERE</h1>
                        </section>
                    ) : isGameLost && isGameOver ? (
                        <section className="bg-red-500 p-2 mt-4 mb-9 rounded-md">
                            <h1 className="text-lg">APHRODITE MESSAGE "{currentWord}"</h1>
                        </section>
                    ) : !isGameOver && islastGuessIncorrect ? (
                        <section className="bg-purple-500 p-2 mt-4 mb-9 rounded-md">
                            <p className="text-lg">
                                {getFarewellText(languages[wrongGuessCount - 1].name)}
                            </p>
                        </section>
                    ) : (
                        <section className="bg-blue-600 p-2 mt-4 mb-9 rounded-md">
                            <p className="text-lg">APHRODITE MESSAGE</p>
                        </section>
                    )}


                    <section className='flex flex-wrap gap-1 justify-center '>
                        {languages.map(function (language, index)
                        {

                            const isLanguageLost = index < wrongGuessCount

                            return (<span style={{
                                backgroundColor: language.backgroundColor,
                                color: isLanguageLost ? "#fff" : language.color
                            }}
                                className={`p-1 rounded-sm gap relative ${isLanguageLost ? "lost" : ""} `}
                                key={language.name}
                            >{language.name}</span >)
                        })}
                    </section>


                    {/* WORD GUESSING HERE
 */}                    <section className='my-9'>

                        {
                            currentWord.split("").map(function (letter)
                            {
                                return (
                                    <span
                                        className='text-xl uppercase bg-[#323232] text-white px-4 py-2 border-b-2 m-[0.1rem] size-[3rem]'
                                    >{guessedLetter.includes(letter) ? letter.split("") : ""}</span>
                                )
                            })
                        }
                    </section>
                    <section className='flex flex-wrap items-center justify-center'>
                        {alphabet.split("").map(function (letter, index)
                        {
                            const isGuessed = guessedLetter.includes(letter)
                            const isCorrect = isGuessed && currentWord.includes(letter)
                            const isWrong = isGuessed && !currentWord.includes(letter)

                            const colorStyle = isCorrect ? "bg-green-500" : isWrong ? "bg-red-500" : "bg-yellow-600"
                            return (
                                <button
                                    key={index}
                                    className={`py-2 px-4 ${colorStyle} text-black uppercase m-1 rounded-sm border-[#e7e6e6] border-[1px] font-semibold cursor-pointer`}
                                    onClick={function () { onGuessLetter(letter) }}

                                    disabled={isGameOver}
                                > {letter}</button>)
                        })}
                    </section >

                    {isGameOver &&

                        <div className='flex flex-row justify-center gap-4'>

                            <button className='bg-blue-400 text-black py-3 px-19 rounded-md border border-white mt-9 mb-19'
                                onClick={function () { startNewGame() }}
                            >Play Again</button>

                            <button className='bg-blue-400 text-black py-3 px-19 rounded-md border border-white mt-9 mb-19'
                                onClick={function () { startNewGame() }}
                            >Back</button>
                        </div>
                    }
                </div>

            </div>

        </>
    )
}
