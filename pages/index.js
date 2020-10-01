import React from 'react';
import ChessboardBackground from '../components/ChessboardBackground';
import SquareGrid from '../components/SquareGrid';
import {rankRangeEnum} from '../chessEngine/constants/chessboardEnums';
import {newBoard} from '../chessEngine/constants/defaultBoardState';
import tw from 'twin.macro';

export default function Index({styling, squareRankRef, board}){
    return (
        <div css={styling}>
            <SquareGrid rangeRef={squareRankRef} boardState={board}/>
            <ChessboardBackground />
        </div>
    )
}

export async function getStaticProps() {
    return {
        props: {
            styling: [
                tw`relative mx-4 mt-8 mb-4`,
                `width: 330px; height: 330px`
            ],
            squareRankRef: rankRangeEnum,
            board: newBoard()
        }
    }
};