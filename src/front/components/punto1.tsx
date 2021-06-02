import React, {useState} from 'react';
import { isPrime } from '../../back/helpers/mathFunctions';
import { getE, getD } from '../../back/core/rsaFunctions'; 

let initResult = {
	p: 0,
	q: 0,
	N: 0,
	Φ: 0,
	E: 0,
	D: 0
}

export const Punto1: React.FunctionComponent<any> = () => {
	const [p, setP] = useState(0);
	const [q, setQ] = useState(0);
	const [result, setResult] = useState(initResult);
	const [showResult, setShowResult] = useState(false);

	const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		const { name, value } = event.target;
		const inputNumber = value ? parseInt(value, 10) : 0;
		if(name === "p" && inputNumber < 100) setP(inputNumber); 
		if(name === "q" && inputNumber < 100) setQ(inputNumber); 
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		event.stopPropagation();

		let newResult = {
			p: p,
			q: q,
			N: (p * q),
			Φ: ((p - 1) * (q - 1)),
			E: 0,
			D: 0
		}
		
		//VERIFY VALID E
		const valids_E = getE(newResult.Φ);
		let valid_D = 0;
		let validEindex = 0;
		for (let index = 0; index < valids_E.length; index++) {
			let tempD = getD(valids_E[index], newResult.Φ);
			if (tempD !== 0) {
				valid_D = tempD;
				validEindex = index;
				break;
			}
		}
		newResult.E = valids_E[validEindex];
		newResult.D = valid_D;

		//SET RESULTS
		setResult(newResult);
		// console.info({result});

		//SHOW RESULTS
		setShowResult(true);
	}

	const handleCleanUp = (): void => {
		setShowResult(false);
		setResult(initResult);
		setP(0);
		setQ(0);
	}

	return (
		<div className="box-punto">
			<h1>PARCIAL | Punto 1 | Generar claves</h1>
			<form className="input-box" autoComplete="off" noValidate onSubmit={(event: React.FormEvent<HTMLFormElement>) => handleSubmit(event)}>
				<label>Ingrese P</label>
				<input type="text" 
					   name="p"
					   value={p}
					   onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInput(event)}
				/>
				<br />{ !isPrime(p) && p!== 0 &&  <label className="input-error">P debe ser primo</label> }<br />
				<label>Ingrese Q</label>
				<input type="text"
					   name="q"
					   value={q}
					   onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInput(event)}
				/>
				<br />{ !isPrime(q) && q!== 0 &&  <label className="input-error">Q debe ser primo</label> }<br />
				<button type="submit" className="btn-action" disabled={p === q || (!isPrime(p) || !isPrime(q))}>Calcular</button>
				<button type="button" className="btn-action" onClick={()=>handleCleanUp()}>Limpiar</button>
			</form>
			<div>
				{showResult && isPrime(p) && isPrime(q) &&
					<div className="output-box">
						<p>RESULTADOS PARA P={p} Q={q}</p>
						<p>Clave pública = {`(${result.E}, ${result.N})`}</p>
						<p>Clave privada = {`(${result.D}, ${result.N})`}</p>
					</div>
				}
			</div>
		</div>
	);
};
