import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const AddContact = () => {
	const { store, actions } = useContext(Context);
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [address, setAddress] = useState('');

	const navigate = useNavigate('')

	const handleSubmit = (event) => {
		event.preventDefault();
		const dataToSend = {
			name: name,
			phone: phone,
			email: email,
			address: address
		}
		console.log(dataToSend);
		actions.addContact(dataToSend)
		navigate('/contacts')
	}




	return (
		<div className="container">
			<form>
				<div className="mb-3">
					<label htmlFor="inputName" className="form-label">Nombre</label>
					<input type="string" className="form-control" id="inputName" value={name} onChange={(event) => setName(event.target.value)} />
				</div>
				<div className="mb-3">
					<label htmlFor="inputPhone" className="form-label">Teléfono</label>
					<input type="integer" className="form-control" id="inputPhone" value={phone} onChange={(event) => setPhone(event.target.value)} />
				</div>
				<div className="mb-3">
					<label htmlFor="inputEmail" className="form-label">Email</label>
					<input type="email" className="form-control" id="inputEmail" value={email} onChange={(event) => setEmail(event.target.value)} />
				</div>
				<div className="mb-3">
					<label htmlFor="inputAddress" className="form-label">Dirección</label>
					<input type="string" className="form-control" id="inputAddress" value={address} onChange={(event) => setAddress(event.target.value)} />
				</div>
				<p className="text-center">
					<button type="submit" className="btn btn-success" onClick={handleSubmit}>Submit</button>
				</p>
			</form>
			<br />
			<p className="text-center">
				<Link to="/contacts">
					<button className="btn btn-primary">Vuelve a tus contactos</button>
				</Link>
			</p>
		</div>
	);
};
