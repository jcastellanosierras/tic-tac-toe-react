import { MouseEvent } from 'react'
import styles from '@/components/Styles.module.css'

export default function Cell({
  value,
  onClick,
  disabled,
}: {
  value: '' | 'X' | 'O'
  onClick: (e: MouseEvent<HTMLDivElement>) => void
  disabled: boolean
}) {
  return (
    <div onClick={disabled ? undefined : onClick} className={styles.box}>
      {value}
    </div>
  )
}
