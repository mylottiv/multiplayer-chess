import React from 'react';
import tw, {styled} from 'twin.macro';

export default function Square({squareIndex, pieceType, color}) {

    const pieceChar = (!pieceType) ? 'X' : (pieceType === 'Knight') ? pieceType[1].toLocaleUpperCase() : pieceType[0];

    const StyledSquare = styled.div`
        ${tw`text-center`}
    `

    const keyAndIdStr = `chessboard-square-${squareIndex}`

    return (
        <StyledSquare key={keyAndIdStr} id={keyAndIdStr}>
            <span css={tw`w-full h-full`, (color === 'White') ? tw`text-yellow-600` : (color === 'Black') ? tw`text-red-600` : tw`text-green-600`}>{pieceChar}</span>
        </StyledSquare>
    )
}