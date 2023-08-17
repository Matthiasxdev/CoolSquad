'use client';

import HeartIcon from '../svg/heart';
import styles from "./LikeButton.module.css"

type LikeButtonProps = {
    liked: boolean;
    onClick: () => void;
    disabled?: boolean;
    loading?: boolean;
  };
  

export const LikeButton = ({ liked, onClick} : LikeButtonProps) => {

  return (
    
    <button
    type="button"
    onClick={e => {
      e.preventDefault();
      onClick();
    }}
    className={styles.button_like}
    >
    <HeartIcon
      className={`${styles.like} ${liked ? styles.red : styles.white}`}
    />
    </button>
  )
}
