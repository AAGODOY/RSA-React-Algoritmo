import React, {useState} from 'react';
import { getEncryptedNumbersFromText, getEncryptedTextFromNums } from '../../back/core/rsaFunctions'; 

let initResult = {
	c_numbers: [[]],
	c_text: [""],
}

export const Punto2: React.FunctionComponent<any> = () => {
	const [plainText, setPlainText] = useState("");
	const [e, setE] = useState(0);
	const [n, setN] = useState(0);
	const [result, setResult] = useState(initResult);
	const [showResult, setShowResult] = useState(false);

	const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		const { name, value } = event.target;
		
		if(name === "plainText"){
			const inputText = value.match(/^[b-zB-Z]*$/) ? value.toString().toUpperCase() : plainText;
			setPlainText(inputText);
		}
		if(name === "e" || name === "n"){
			const inputNumber = value ? parseInt(value, 10) : 0;
			if(name === "e" && inputNumber < 100000)
				setE(inputNumber);
			if(name === "n" && inputNumber < 100000)
				setN(inputNumber);
		}
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		event.stopPropagation();

		const c_numbers = getEncryptedNumbersFromText(plainText, e, n);
		const c_text = getEncryptedTextFromNums(c_numbers);
		let newResult = {
			c_numbers,
			c_text
		}

		//SET RESULTS
		setResult(newResult);
		// console.info({result});

		//SHOW RESULTS
		setShowResult(true);
	}

	const handleCleanUp = (): void => {
		setShowResult(false);
		setResult(initResult);
		setPlainText("");
		setE(0);
		setN(0);
	}

	return (
		<div className="box-punto">
			<h1>PARCIAL | Punto 2 | Encriptar</h1>
			<form className="input-box" autoComplete="off" noValidate onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
				<label>Ingrese texto plano</label>
				<input type="text" 
					   name="plainText"
					   placeholder="3 letras..."
					   value={plainText}
					   minLength={3}
					   maxLength={3}
					   onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInput(event)}
				/><br /><br />
				<label>Ingrese clave pública {"(e, n)"}</label>
				<input type="text"
					   name="e"
					   value={e}
					   placeholder="e"
					   onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInput(event)}
				/>
				<label></label>
				<input type="text"
					   name="n"
					   value={n}
					   placeholder="n"
					   onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInput(event)}
				/><br /><br />
				<button type="submit" className="btn-action" disabled={e === n || plainText === ""}>Calcular</button>
				<button type="button" className="btn-action" onClick={()=>handleCleanUp()}>Limpiar</button>
			</form>
			<div>
				{showResult && 
					<div className="output-box">
						<p>RESULTADOS</p>
						<p>Texto plano cifrado en números: {result.c_numbers.join(", ")}</p>
						<p>Texto plano cifrado en texto: {result.c_text.join(",")}</p>
						{result.c_numbers.length > 1 &&
							<p className="output-condition">Recorda que al desencriptar se deberán conservar los bloques.</p>
						}
					</div>
				}
			</div>
		</div>
	);
};
