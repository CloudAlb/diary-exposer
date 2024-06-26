import { GREP_A_WORD } from '../constants/options'

import styles from './OptionsRow.module.css';

export function OptionsRow({ onSelectOption }) {
  function handleSelectOption() {
    onSelectOption(event.target.id);
  }

  return (
    <button id={GREP_A_WORD} className={styles.button} onClick={handleSelectOption}>Grep a word</button>
  )
}
