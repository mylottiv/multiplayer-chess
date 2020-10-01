import React from 'react';
import '../styles/index.css';
// Use this if going with the Twin GlobalStyles instead of custom Tailwind base classes
// import { GlobalStyles } from 'twin.macro';
// Or, sans animate classes
// import 'tailwindcss/dist/base.min.css'

export default function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}