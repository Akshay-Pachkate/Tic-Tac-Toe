import { useState, useEffect } from "react";
import Tooltip from '@mui/material/Tooltip';
import { winningCombinations } from "./config";
import { styles } from './config'
import { enqueueSnackbar } from 'notistack'
// import Header from "./components/Header";


const App = () => {


  const [winner, setWinner] = useState("");
  const [p1, setP1] = useState([]);
  const [p2, setP2] = useState([]);
  const [currPlayer, setCurrPlayer] = useState("x");
  const [board, setBoard] = useState({});
  


  useEffect(() => {

    const checkWinCond = (playerMoves) => {
      let flag = false;
      
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;

      if (
        playerMoves.includes(a) &&
        playerMoves.includes(b) &&
        playerMoves.includes(c)
      ) {
        flag = true;
        break;
      }

    }
    return flag;
  };


  let boardFilled = Object.keys(board).length;
  if(boardFilled === 9){
    setWinner("Draw!")
  }

  if( boardFilled > 4){
    if(checkWinCond(p1)){
      setWinner("Player 1 Won ");

    }else if(checkWinCond(p2)){
      setWinner("Player 2 Won");
    }
  }
   
  }, [board, p1, p2]);



  const handleOnClick = (event) => {
    const id = event.target.id;

    if(board[id]){
      enqueueSnackbar("already played in this box", {variant: 'error'})
    }

    else{

      if (currPlayer == "x") {
        setP1((prevMoves) => [...prevMoves, id]);
        setBoard((prevState) => {
          return { ...prevState, [id]: "x" };
        });


      } else {
        setP2((prevMoves) => [...prevMoves, id]);
        setBoard((prevState) => {
          return { ...prevState, [id]: "o" };
        });
      }

      setCurrPlayer(() => (currPlayer === "x" ? "o" : "x"));
    }
  };


  function refreshPage() {
    window.location.reload(false);
  }

  function gameOver(){
    console.log("Game Over");
    enqueueSnackbar("Game Over !", {variant: 'error'})
  }

  return (

    <div>


      <Tooltip title="Replay" placement="right">
        <button className="flex mx-auto">
        <h1 onClick={refreshPage} className='text-4xl text-center text-gray-500 p-4 m-4 underline underline-offset-4 hover:cursor-pointer'>{winner}</h1>
        </button>
        </Tooltip> 
    <div className="grid grid-cols-3 grid-row-3 gap-2 bg-gray-700 m-auto w-[616px] h-[616px] rounded-md ">
      

      <div onClick={!winner ? handleOnClick :  gameOver } id="1" className={styles}>
        {board["1"]}
      </div>
      <div onClick={!winner ? handleOnClick :  gameOver} id="2" className={styles}>
        {board["2"]}
      </div>
      <div onClick={!winner ? handleOnClick :  gameOver} id="3" className={styles}>
        {board["3"]}
      </div>
      <div onClick={!winner ? handleOnClick :  gameOver} id="4" className={styles}>
        {board["4"]}
      </div>
      <div onClick={!winner ? handleOnClick :  gameOver} id="5" className={styles}>
        {board["5"]}
      </div>
      <div onClick={!winner ? handleOnClick :  gameOver} id="6" className={styles}>
        {board["6"]}
      </div>
      <div onClick={!winner ? handleOnClick :  gameOver} id="7" className={styles}>
        {board["7"]}
      </div>
      <div onClick={!winner ? handleOnClick :  gameOver} id="8" className={styles}>
        {board["8"]}
      </div>
      <div onClick={!winner ? handleOnClick :  gameOver} id="9" className={styles}>
        {board["9"]}
      </div>
    </div>
</div>
  );
};

export default App