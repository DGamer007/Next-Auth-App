import Image from 'next/image';
import styles from '../../styles/Loading.module.css';

function Loading() {
    return (
        <div className={styles.container}>
            <Image src='/assets/DUCK.gif' width='130' height='150' />
        </div>
    );
}

export default Loading;