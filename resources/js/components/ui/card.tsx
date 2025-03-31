import styles from "./card.module.css"

export default function Card({  ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={styles.card}
      {...props}
    />
  )
}