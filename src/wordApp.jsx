import React from "react";
import ReactWordcloud from 'react-wordcloud';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import words from "./words";


const WordApp = () => <ReactWordcloud words={words} />;

export default WordApp;