import { useState } from 'react'

import languages from "../../data/minigame/Messages.js"
import { getFarewellText, getRandomWord } from "../../data/minigame/gameMessages.js"
import Confetti from "react-confetti"
import { Link } from 'react-router-dom'

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


            <div className='bg-[#FFEEF2] min-h-screen flex flex-col items-center justify-center'>
                <div className="min-w-lg max-w-lg bg-[#FFC0CB] rounded-md text-center px-8 min-h-[65vh] max-h-[65vh] shadow-lg border border-[#FF69B4]">

                    <header className='p-3'>
                        <h1 className='text-2xl font-mono text-[#B22222] my-3'>Hangman: Love Edition</h1>
                        <p className='text-[#8B0000]'>Guess the word in under 9 attempts to keep Aphrodite happy!</p>
                    </header>
                    {!isGameOver && wrongGuessCount === 0 ? (
                        <section className="bg-[#FFB6C1] p-2 mt-4 mb-9 rounded-md">
                            <p className="text-lg text-[#8B0000]">Aphrodite's Encouragement</p>
                        </section>
                    ) : isGameWon && isGameOver ? (
                        <section className="bg-[#FF69B4] p-2 mt-4 mb-9 rounded-md">
                            <h1 className="text-lg text-white">Aphrodite showers you with love! ❤️</h1>
                        </section>
                    ) : isGameLost && isGameOver ? (
                        <section className="bg-[#DC143C] p-2 mt-4 mb-9 rounded-md">
                            <h1 className="text-lg text-white">Aphrodite is disappointed... The word was "{currentWord}" 💔</h1>
                        </section>
                    ) : !isGameOver && islastGuessIncorrect ? (
                        <section className="bg-[#DDA0DD] p-2 mt-4 mb-9 rounded-md">
                            <p className="text-lg text-[#8B0000]">
                                {getFarewellText(languages[wrongGuessCount - 1].name)}
                            </p>
                        </section>
                    ) : (
                        <section className="bg-[#FFB6C1] p-2 mt-4 mb-9 rounded-md">
                            <p className="text-lg text-[#8B0000]">Aphrodite's Encouragement</p>
                        </section>
                    )}

                    <section className='flex flex-wrap gap-1 justify-center'>
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

                    <section className='my-9'>
                        {
                            currentWord.split("").map(function (letter, index)
                            {
                                return (
                                    <span key={index}
                                        className='text-xl uppercase bg-[#FF69B4] text-white px-4 py-2 border-b-2 m-[0.1rem] size-[3rem] rounded-md'
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

                            const colorStyle = isCorrect ? "bg-green-500" : isWrong ? "bg-red-500" : "bg-pink-400"
                            return (
                                <button
                                    key={index}
                                    className={`py-2 px-4 ${colorStyle} text-white uppercase m-1 rounded-md border-[#e7e6e6] border-[1px] font-semibold cursor-pointer`}
                                    onClick={function () { onGuessLetter(letter) }}
                                    disabled={isGameOver}
                                > {letter}</button>)
                        })}
                    </section >

                    {isGameOver &&
                        <div className='flex flex-row justify-center gap-4'>
                            <button className='bg-[#FF69B4] text-white py-3 px-19 rounded-md border border-white mt-9 mb-19'
                                onClick={function () { startNewGame() }}
                            >Play Again</button>
                        </div>
                    }
                    <Link to='..'>
                        <button className='cursor-pointer bg-[#FF69B4] text-white py-3 px-19 rounded-md border border-white mt-9 mb-19'>Back</button>
                    </Link >
                </div>
            </div>
        </>
    )
}
