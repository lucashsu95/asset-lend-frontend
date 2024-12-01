import styles from '@/styles/Loading.module.css'

export default function Loading() {
	return (
		<div className={styles['loading-container']}>
			<div className={styles.loading}>
				<div className={styles.circle}></div>
				<div className={styles.circle}></div>
				<div className={styles.circle}></div>
				<div className={styles.circle}></div>
			</div>
		</div>
	)
}
