import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
	const [subjectInput, setSubjectInput] = useState("");
	const [result, setResult] = useState();

	async function onSubmit(event) {
		event.preventDefault();
		try {
			const response = await fetch("/api/generate", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ subject: subjectInput }),
			});

			const data = await response.json();
			if (response.status !== 200) {
				throw (
					data.error ||
					new Error(`Request failed with status ${response.status}`)
				);
			}

			setResult(data.result);
			setSubjectInput("");
		} catch (error) {
			// Consider implementing your own error handling logic here
			console.error(error);
			alert(error.message);
		}
	}

	return (
		<div>
			<Head>
				<title>OpenAI Testing</title>
				<link rel="icon" href="/tree.png" />
			</Head>

			<main className={styles.main}>
				<img src="/tree.png" className={styles.icon} />
				<h3>TAG ME</h3>
				<form onSubmit={onSubmit}>
					<input
						type="text"
						name="subject"
						placeholder="Enter subject for your tagline"
						value={subjectInput}
						onChange={(e) => setSubjectInput(e.target.value)}
					/>
					<input type="submit" value="Generate Tagline" />
				</form>
				<div className={styles.result}>{result}</div>
			</main>
		</div>
	);
}
