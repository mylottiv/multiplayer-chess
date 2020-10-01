import React from 'react';
import 'twin.macro';

export default function ChessboardBackground() {
    return (
        // <div css={stylingContainer}>
            <svg
            tw={'absolute top-0 left-0 w-full h-full align-top z-0'}
            xmlns="http://www.w3.org/2000/svg"
            width="330"
            height="330"
            viewBox="-.05 -.05 8.1 8.1"
            // preserveAspectRatio="xMidYMin meet"
            >
            <path d="M-0.5 -0.5H8.5V8.5H-0.5z"></path>
            <path
            fill="#FFF"
            d="M0 0h8v1H0zm0 2h8v1H0zm0 2h8v1H0zm0 2h8v1H0zm1-6v8h1V0zm2 0v8h1V0zm2 0v8h1V0zm2 0v8h1V0z"
            ></path>
            </svg>
        // </div>
    )
}