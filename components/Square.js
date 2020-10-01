import React from 'react';
import tw, {styled} from 'twin.macro';

export default function Square({squareIndex, pieceType}) {

    const pieceChar = (!pieceType) ? 'X' : (pieceType === 'Knight') ? pieceType[1].toLocaleUpperCase() : pieceType[0];

    const StyledSquare = styled.div`
        ${tw`text-center`}
    `

    const keyAndIdStr = `chessboard-square-${squareIndex}`

    return (
        <StyledSquare key={keyAndIdStr} id={keyAndIdStr}>
            <span css={tw`w-full h-full text-yellow-600`}>{pieceChar}</span>
        </StyledSquare>
    )
}