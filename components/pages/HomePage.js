import styles from '../../styles/Home.module.css';

function HomePage() {
    return (
        <main className={styles.main}>
            <h1>Hey ! You made it...</h1>
            <h3>
                Now, that you are here why {'don\'t'} you visit your <u>Profile</u>
            </h3>
            <h3>
                In your Profile, you can even Change your Account Password and ofcourse the <u>Account Information</u> will be there.
            </h3>
        </main>
    );
}

export default HomePage;