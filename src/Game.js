// import {useState} from "react";

// const Game = () => {
//     const [number, setNumber] = useState(Math.round(Math.random() * 10))
//     const [guess, setGuess] = useState("")
//     const [message, setMessage] = useState("")
//     const [freeAttempt, setFreeAttempt] = useState(3)
//
//     const [computer, setComputer] = useState(0)
//     const [person, setPerson] = useState(0)

    // const input = (e) =>{
    //     setGuess(e.target.value)
    // }
    //
    // const check = () => {
    //     if (+guess > 0 && +guess <= 10){
    //         if(number === +guess){
    //             setMessage("You win")
    //             setPerson(person +1)
    //         } else if (freeAttempt === 0){
    //             setMessage("You lose")
    //             setComputer(computer +1)
    //         } else {
    //             setFreeAttempt(freeAttempt -1)
    //         }
    //         setGuess("")
    //     }
    // }

//     const reset = () => {
//         setNumber(Math.round(Math.random() * 10))
//         setMessage("")
//         setGuess("")
//         setFreeAttempt(3)
//     }
//     return (
//         <div>
//             <h3>Computer:{computer}</h3>
//             <h3>People:{person}</h3>
//             <div className="game">
//                 <h1>Угадай число от 0 до 10</h1>
//                 <input type="number" value={guess} onChange={input}/>
//                 <div>
//                     <button className="btn" onClick={check}>CHECK</button>
//                     <button onClick={reset}>RESET</button>
//                 </div>
//                 <h3>У вас осталось {freeAttempt} попытки</h3>
//                 <h4>{message}</h4>
//             </div>
//         </div>
//     )
// }



import {useEffect, useState} from "react";

const Game = () => {
    const [random, setRandom] = useState(Math.round(Math.random() * 10))
    const [guess, setGuess] = useState("")
    const [freeAttempts, setFreeAttempts] = useState(3)
    const [message, setMessage] = useState("")
    const [computer, setComputer] = useState(0)
    const [person, setPerson] = useState(0)
    const [isTrue, setIsTrue] = useState(false)

    const handleInput = (e) => {
        setGuess(e.target.value)
    }



    const checkNumber = () => {
        setFreeAttempts(freeAttempts -1)
        if (random > +guess){
            setMessage("Мало")
        } else if (random < +guess){
            setMessage("Много")
        } if (random !== +guess && freeAttempts -1  === 0) {
            setMessage("Проиграл")
            setIsTrue(true)
            setPerson(+computer + 1)
        } else  if (random === +guess){
            setMessage("Выиграл")
            setIsTrue(true)
            setPerson(+person + 1)
        }
    }

    useEffect(() => {
        localStorage.setItem("comp", computer)
        localStorage.setItem("person", person)
    },[message])

    // useEffect(() => {
    //
    //     if (random !== +guess && freeAttempts  === 0) {
    //         setMessage("Проиграл")
    //         setIsTrue(true)
    //         setPerson(+computer + 1)
    //     } else  if (random === +guess){
    //         setMessage("Выиграл")
    //         setIsTrue(true)
    //         setPerson(+person + 1)
    //     }
    // },[freeAttempts])


        const reset = () => {
        setRandom(Math.round(Math.random() * 10))
        setMessage("")
        setGuess("")
        setFreeAttempts(3)
        setIsTrue(false)
    }

    const clear = () => {
        localStorage.clear()
        setPerson(0)
        setComputer(0)
    }

    return (
        <div>
            <h3>Person:{person}</h3>
            <h3>Computer:{computer}</h3>
            <div className="game">
                <h2>Угадай число от 0 до 10</h2>
                <input type="number" onChange={handleInput} value={guess}/>
                <button onClick={checkNumber} disabled={isTrue} className="chk-btn">Check</button>
                <button className="res-btn" onClick={reset}>Reset</button>
                <button onClick={clear}>Clear All</button>
                {
                    Boolean(freeAttempts) && <div>У вас осталось {freeAttempts} {freeAttempts === 1 ? "попытка" : "попытки"}</div>
                }
                <div>{message}</div>
            </div>
        </div>
    )
}

export default Game