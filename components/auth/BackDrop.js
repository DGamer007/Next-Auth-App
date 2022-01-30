import styles from '../../styles/BackDrop.module.css';

function BackDrop({ setPortalState }) {
    return (
        <div className={styles.backdrop} onClick={() => { setPortalState(false); }}></div>
    );
}

export default BackDrop;