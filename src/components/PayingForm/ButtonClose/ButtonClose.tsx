import styles from './style.module.scss'
import ButtonCloseProps from '../../../@types/props/ButtonCloseProps'

const ButtonClose = ({ classType, onClick }: ButtonCloseProps) => {
  return (
    <div className={styles.closeWrapper}>
      <div
        aria-label="close auth window"
        tabIndex={0}
        role="button"
        onClick={onClick}
        onKeyDown={() => onClick}
        className={styles[classType]}
      />
    </div>
  )
}

export default ButtonClose
