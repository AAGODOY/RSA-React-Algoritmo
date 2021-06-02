import React, {useState} from 'react';
import { getDecryptedNumberFromText, getDecryptedTextFromNum } from '../../back/core/rsaFunctions'; 

let initResult = {
	d_number: [0],
	d_text: "",
}

export const Punto3: React.FunctionComponent<any> = () => {
	const [cipherText, setCipherText] = useState("");
	const [d, setD] = useState(0);
	const [n, setN] = useState(0);
	const [result, setResult] = useState(initResult);
	const [showResult, setShowResult] = useState(false);

	const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		const { name, value } = event.target;
		
		if(name === "cipherText"){
			const inputText = value.match(/^([^0-9]*)$/) ? value.toString().toUpperCase() : cipherText;
			if(!inputText.includes("A"))
				setCipherText(inputText);
		}
		if(name === "d" || name === "n"){
			const inputNumber = value ? parseInt(value, 10) : 0;
			if(name === "d" && inputNumber < 100000)
				setD(inputNumber);
			if(name === "n" && inputNumber < 100000)
				setN(inputNumber);
		}
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		event.stopPropagation();

		const text = cipherText.split(",");
		const d_number = text.map((groupText) => getDecryptedNumberFromText(groupText, d, n));
		const d_text = d_number.map((numD) => getDecryptedTextFromNum(numD, d, n)).join("");
		let newResult = {
			d_number,
			d_text
		}

		//SET RESULTS
		setResult(newResult);
		// console.info({newResult});

		//SHOW RESULTS
		setShowResult(true);
	}

	const handleCleanUp = (): void => {
		setShowResult(false);
		setResult(initResult);
		setCipherText("");
		setD(0);
		setN(0);
	}

	return (
		<div className="box-punto">
			<h1>PARCIAL | Punto 3 | Desencriptar</h1>
			<form className="input-box" autoComplete="off" noValidate onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
				<label>Ingrese texto cifrado</label>
				<input type="text" 
					   name="cipherText"
					   placeholder="Texto..."
					   value={cipherText}
					   minLength={3}
					   maxLength={8}
					   onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInput(event)}
				/><br /><br />
				<label>Ingrese clave privada {"(d, n)"}</label>
				<input type="text"
					   name="d"
					   value={d}
					   placeholder="d"
					   onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInput(event)}
				/>
				<label></label>
				<input type="text"
					   name="n"
					   value={n}
					   placeholder="n"
					   onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInput(event)}
				/><br /><br />
				<button type="submit" className="btn-action" disabled={d === n || cipherText === ""}>Calcular</button>
				<button type="button" className="btn-action" onClick={()=>handleCleanUp()}>Limpiar</button>
			</form>
			<div>
				{showResult && 
					<div className="output-box">
						<p>RESULTADOS</p>
						<p>Texto plano cifrado en números: {result.d_number.toString()}</p>
						<p>Texto plano cifrado en texto: {result.d_text}</p>
					</div>
				}
			</div>
		</div>
	);
};
