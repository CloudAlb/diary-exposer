import { useState } from 'react';
import { House } from '@phosphor-icons/react';

import { GREP_A_WORD } from './constants/options'
import { OptionsRow } from './components/OptionsRow';

import styles from './App.module.css'

import './global.css'

export function App() {
  const [selectOption, setSelectOption] = useState('');

  function handleHomeButtonClick() {
    setSelectOption('');
  }

  return (
    <div>
      <header className={styles.header}>
        <img src={'https://static-00.iconduck.com/assets.00/sushi-emoji-2048x2048-5itsruw8.png'} />
        <p>My diary exposer</p>
        <button className={styles.homeButton} onClick={handleHomeButtonClick}>
          <House size={24} />
        </button>
        <OptionsRow onSelectOption={selectOption}/>
      </header>

      <div className={styles.wrapper}>
        <h1>Welcome to my diary exposer!</h1>
        <p>Please select one of the options:</p>
        <OptionsRow onSelectOption={setSelectOption} />

        { selectOption &&
          <p>foo</p>
        }
      </div>
    </div>
  )
}
