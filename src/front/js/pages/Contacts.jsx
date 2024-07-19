import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext.js";

export const Contacts = () => {
	const { store, actions } = useContext(Context);
	const [currentContact, setCurrentContact] = useState('')
	const [contactToDelete, setContactToDelete] = useState('');

	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [address, setAddress] = useState('');

	const navigate = useNavigate('')

	const handleViewContact = (item) => {
		setCurrentContact(item)

	}
	const handleEditContact = (item) => {
		setCurrentContact(item)
		setName(item.name);
		setPhone(item.phone);
		setEmail(item.email);
		setAddress(item.address);
		console.log(item);
	}

	const handleModalSubmit = (event) => {
		event.preventDefault();
		const dataToSend = {
			name: name,
			phone: phone,
			email: email,
			address: address
		}
		console.log(dataToSend);
		actions.editContact(dataToSend, currentContact.id)

	}

	const deleteContact = async (item) => {
		const uri = `${store.apiContact}agendas/${store.agenda}/contacts/${item.id}`
		const options = {
			method: 'DELETE',
		}
		const response = await fetch(uri, options)
		if (!response.ok) {
			console.log('error:', response.status, response.statusText);
			return
		}
		actions.getContacts()
	}


	return (
		<div className="container">
			<h1 className="text-center">Contactos</h1>
			<p className="text-center">
				<Link to="/addcontact" className="btn btn-success">
					Añadir contacto
				</Link>
			</p>
			<div className="row d-flex justify-content-center">

				<div className="modal fade" id="detailsModal" tabIndex="-1" aria-labelledby="detailsModalLabel" aria-hidden="true">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h1 className="modal-title fs-5" id="detailsModalLabel">Detalles</h1>
								<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<div className="modal-body">
								<p>Nombre: {currentContact.name}</p>
								<p>Teléfono: {currentContact.phone}</p>
								<p>Email: {currentContact.email}</p>
								<p>Dirección: {currentContact.address}</p>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
							</div>
						</div>
					</div>
				</div>

				<div className="modal fade" id="contactEditModal" tabIndex="-1" aria-labelledby="contactEditModalLabel" aria-hidden="true">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h1 className="modal-title fs-5" id="contactEditModalLabel">Editar contacto: [{currentContact.name}]</h1>
								<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<div className="modal-body">
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
								</form>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
								<button type="submit" className="btn btn-success" data-bs-dismiss="modal" onClick={handleModalSubmit}>Guardar cambios</button>
							</div>
						</div>
					</div>
				</div>

				<div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h1 className="modal-title fs-5" id="deleteModalLabel">Confirmar eliminación del contacto</h1>
								<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<div className="modal-body">
								¿Estás seguro de que deseas eliminar este contacto?
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
								<button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => deleteContact(contactToDelete)}>Sí</button>
							</div>
						</div>
					</div>
				</div>

				<div className="col-6">
					<ul className="list-group text-center">

						{!store.contacts ?
							<div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>
							:
							store.contacts.map((item, key) => {
								return (
									<li className="list-group-item d-flex justify-content-between" key={key}>
										{item.name}
										<span className="fs-6">
											<span onClick={() => handleViewContact(item)} className="me-4" data-bs-toggle="modal" data-bs-target="#detailsModal">
												<i className="fa-regular fa-eye text-primary"></i>
											</span>
											<span onClick={() => handleEditContact(item)} className="me-4" data-bs-toggle="modal" data-bs-target="#contactEditModal">
												<i className="far fa-edit text-success"></i>
											</span>
											<span onClick={() => setContactToDelete(item)} data-bs-toggle="modal" data-bs-target="#deleteModal">
												<i className="fas fa-trash-alt text-danger"></i>
											</span>
										</span>
									</li>
								);
							})
						}
					</ul>
				</div>
			</div>
			<br />
			<div className="d-flex justify-content-center">
				<Link to="/">
					<button className="btn btn-primary">Back home</button>
				</Link>
			</div>
		</div>
	);
};
