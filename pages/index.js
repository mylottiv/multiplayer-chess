import React, {useState, useEffect} from 'react';
import ChessboardBackground from '../components/ChessboardBackground';
import SquareGrid from '../components/SquareGrid';
import {rankRangeEnum} from '../chessEngine/constants/chessboardEnums';
import {newBoard} from '../chessEngine/constants/defaultBoardState';
import {readInBoardState} from  '../testReadInBoardState';
import tw from 'twin.macro';

export default function Index({styling, squareRankRef, btnStyling, startingBoard, boardStore}){

    const [boardStateStore, setBoardStateStore] = useState(boardStore)
    const [currentBoardState, setCurrentBoardState] = useState(startingBoard);
    const [currentTurn, setCurrentTurn] = useState(-1);
    const [currentColor, setCurrentColor] = useState('Starting');
    const incrementBoardState = (currentTurn, currentColor) => {
        if (currentColor === 'WhiteTurn') setCurrentColor('BlackTurn');
        else {
            setCurrentColor('WhiteTurn');
            setCurrentTurn(currentTurn + 1);
        }
    };

    useEffect(
        () => {
            currentColor !== 'Starting' && setCurrentBoardState(boardStateStore[currentTurn][currentColor]);
        },
        [currentTurn, currentColor, boardStateStore]
    )

    return (
        <>
        <div css={styling}>
            <SquareGrid rangeRef={squareRankRef} boardState={currentBoardState}/>
            <ChessboardBackground />
        </div>
        <button css={btnStyling} onClick={() => incrementBoardState(currentTurn, currentColor)}>Next Board T: {currentTurn + 1} C: {currentColor}</button>
        </>
    )
}

export async function getStaticProps() {
    return {
        props: {
            styling: [
                tw`relative mx-4 mt-8 mb-4`,
                `width: 330px; height: 330px`
            ],
            btnStyling: [
                tw`bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded`
            ],
            squareRankRef: rankRangeEnum,
            startingBoard: newBoard(),
            boardStore: readInBoardState('./localDummyData/dummyCheckmateOutputs.txt')
        }
    }
};