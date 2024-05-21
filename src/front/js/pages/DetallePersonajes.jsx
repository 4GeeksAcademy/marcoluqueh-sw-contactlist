import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const DetallePersonajes = () => {
	const { store, actions } = useContext(Context);


	return (
		<div className="container">
			<div className="row justify-content-center">
			<div className="card col-6">
				<img src={`https://starwars-visualguide.com/assets/img/characters/${store.currentCharacter.uid}.jpg`} className="card-img-top" alt="..." />
				<div className="card-body">
					<h5 className="card-title">{store.characterDetails.name}</h5>
				</div>
				<ul className="list-group list-group-flush">
					<li className="list-group-item">Género: {store.characterDetails.gender}</li>
					<li className="list-group-item">Año de nacimiento: {store.characterDetails.birth_year}</li>
					<li className="list-group-item">Altura: {store.characterDetails.height} cm</li>
					<li className="list-group-item">Peso: {store.characterDetails.mass} kg</li>
					<li className="list-group-item">Color de pelo: {store.characterDetails.hair_color}</li>
					<li className="list-group-item">Color de ojos: {store.characterDetails.eye_color}</li>
				</ul>
			</div>
			<div className="d-flex justify-content-center mt-3">
			<Link to="/personajes">
				<span className="btn btn-primary btn-lg" role="button">
					Volver a Personajes
				</span>
			</Link>
			</div>
			</div>
		</div>
	);
};


