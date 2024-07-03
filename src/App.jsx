import { useState, useEffect, useRef } from 'react';
import { ArrowRight, House, Trash } from '@phosphor-icons/react';

import { GREP_A_WORD } from './constants/options'
import { OptionsRow } from './components/OptionsRow';

import wordCountObject from './assets/wordCount.json';

import styles from './App.module.css'

import './global.css'

export function App() {
  const [selectedOption, setSelectedOption] = useState(GREP_A_WORD);
  const [inputValue, setInputValue] = useState('');
  const [wordCount, setWordCount] = useState(-1);
  const [isCleanFormButtonDisabled, setIsCleanFormButtonDisabled] = useState(true);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);
  const [foundWord, setFoundWord] = useState('');
  const [foundWords, setFoundWords] = useState([]);

  const inputRef = useRef(null);

  function handleHomeButtonClick() {
    setSelectedOption('');
  }

  function handleInputValueChange() {
    const inputStr = event.target.value;

    if(!event.target.value) {
      setInputValue('');
    }

    if (!inputStr.match(/^[a-zA-Z0-9À-ú]+$/)) return;

    setInputValue(inputStr);
  }

  function handleSubmitForm() {
    event.preventDefault();

    const inputValueStr = inputValue.toLowerCase();

    if (!wordCountObject.hasOwnProperty(inputValueStr)) {
      setWordCount(0);
      return;
    }

    setFoundWord(inputValueStr);

    const wordCount = wordCountObject[inputValueStr]

    setWordCount(wordCount);

    const foundWordObj = {
      "word": inputValueStr,
      "count": wordCount
    }

    let index = foundWords.findIndex(word => wordCount > word.count);
    if (index === -1) {
      index = foundWords.length;
    }

    const newArray = [...foundWords.slice(0, index), foundWordObj, ...foundWords.slice(index)];
    setFoundWords(newArray);
  }
  
  function handleCleanForm() {
    event.preventDefault();

    setInputValue('');
    setWordCount(-1);
    inputRef.current.focus();
  }

  function onKeyUpInput() {
    const enterKeyCharCode = 13;

    if (event.keyCode !== enterKeyCharCode) {
      return;
    }

    if (inputValue === '') {
      return;
    }

    handleSubmitForm();
  }

  useEffect(() => {
    if (inputValue === '') {
      setIsSubmitButtonDisabled(true);
    } else {
      setIsSubmitButtonDisabled(false);
    }

  }, [inputValue])

  useEffect(() => {
    if ([inputValue, wordCount].every((varStr) => varStr === '')) {
      setIsCleanFormButtonDisabled(true);
    } else {
      setIsCleanFormButtonDisabled(false);
    }

  }, [inputValue, wordCount])

  return (
    <div>
      <header className={styles.header}>
        <button className={styles.homeButton} onClick={handleHomeButtonClick}>
          <House size={24} />
        </button>
        <OptionsRow onSelectOption={selectedOption}/>
      </header>

      <div className={styles.wrapper}>
        <h1>Welcome to my diary exposer!</h1>

        { !!! selectedOption &&
          <>
            <p>Please select one of the options:</p>
            <OptionsRow onSelectOption={setSelectedOption} />
          </>
        }

        { selectedOption &&
          <>
            <div className={styles.optionInfo}>
              <h2>Mode: Grep a word</h2>
              <h3>Please input a word to see how many times it's mentioned in my diary:</h3>
              <p>(it's case insensitive)</p>
            </div>
            <div className={styles.form}>
              <input type='text' ref={inputRef} value={inputValue} onChange={handleInputValueChange} maxLength={16} onKeyUp={onKeyUpInput} />
              <button onClick={handleSubmitForm} disabled={isSubmitButtonDisabled} >
                <ArrowRight size={24} />
              </button>

              <button className={styles.cleanFormButton} onClick={handleCleanForm} disabled={isCleanFormButtonDisabled}>
                <Trash size={24} />
              </button>
            </div>
          </>
        }

        { foundWord &&
          <>
            <div className={styles.result}>
              <p>There are{' '}</p>
              <p className={styles.highlight}>{wordCount}</p>
              <p>{' '}occurrences of the word{' "'}</p>
              <p className={styles.highlight}>{foundWord}</p>
              <p>{'" '}in my diary!</p>
            </div>
          </>
        }

        <div className={styles.foundWordsList}>
          { foundWords.length !== 0 &&
            <h2>Found words</h2>
          }
          { foundWords.map(wordObj => {
            return(
              <>
                <div key={wordObj.word} className={styles.row}>
                  <span>{wordObj.word}</span>
                  <span>{wordObj.count}</span>
                </div>
              </>
            )
          }) }
        </div>
      </div>
    </div>
  )
}
