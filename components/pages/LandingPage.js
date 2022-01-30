import styles from '../../styles/Home.module.css';

function LandingPage() {
    return (
        <main className={styles.main}>
            <h1>Welcome !</h1>
            <h3>
                This is <u>DGamer</u> and I welcome you to my little Next-JS Web Application. Lemme tell you what this App is not...
            </h3>
            <h3>
                This App is not just Basic Next-JS App but it has Next-Auth integrated in it.
            </h3>
            <h3>
                Now, let yourself in by Authenticating...
            </h3>
        </main>
    );
}

export default LandingPage;