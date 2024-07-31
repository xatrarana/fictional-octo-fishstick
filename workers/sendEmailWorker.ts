import { parentPort, workerData } from 'worker_threads';
import { sendMail } from '../lib/mail';

async function handleEmailSending() {
    const { to, from, subject, text } = workerData;

    try {
        await sendMail(to, from, subject, text);
        parentPort?.postMessage({ status: 'success' });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        parentPort?.postMessage({ status: 'error', error: errorMessage });
    }
}

handleEmailSending();
