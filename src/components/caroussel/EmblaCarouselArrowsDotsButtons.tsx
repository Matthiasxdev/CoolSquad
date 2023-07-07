import React from 'react'
import styles from './embla.module.css'

type DotButtonPropType = {
  selected: boolean
  onClick: () => void
}

export function DotButton (props:DotButtonPropType) {
  const { selected, onClick } = props

  return (
    <>
    {
        selected?
        <button
          aria-label="DotButton"
          className={`${styles.embla__dot} ${styles.embla__dot__selected}`}
          type="button"
          onClick={onClick}
        />
        :
        <button
          aria-label="DotButton"
          className={styles.embla__dot}
          type="button"
          onClick={onClick}
        />
    }
    </>
  )
}

type PrevNextButtonPropType = {
  enabled: boolean
  onClick: () => void
}

export function PrevButton(props:PrevNextButtonPropType) {
  const { enabled, onClick } = props

  return (
    <button
      aria-label="PrevButton"
      className={`${styles.embla__button} ${styles.embla__button__prev}`}
      onClick={onClick}
      type="button"
      disabled={!enabled}
    >
      <svg className={styles.embla__button__svg} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 4L7 12L15 20" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  )
}

export function NextButton(props:PrevNextButtonPropType) {
  const { enabled, onClick } = props

  return (
    <button
      className={`${styles.embla__button} ${styles.embla__button__next}`}
      onClick={onClick}
      type="button"
      disabled={!enabled}
    >
      <svg className={styles.embla__button__svg}  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 20L17 12L9 4" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  )
}
