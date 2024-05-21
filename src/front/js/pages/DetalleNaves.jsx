import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";


export const DetalleNaves = () => {
	const { store, actions } = useContext(Context);
	const imgError = (event) => {
		event.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"
	}

	return (
		!store.starshipDetails ? <div className="spinner-border" role="status">
			<span className="visually-hidden">Loading...</span>
		</div> :
			(<div className="container">
				<div className="row justify-content-center">
					<div className="card col-6">
						<img src={`https://starwars-visualguide.com/assets/img/starships/${store.currentStarship.uid}.jpg`} className="card-img-top" alt="..." onError={imgError} />
						<div className="card-body d-flex">
							<h5 className="card-title">{store.starshipDetails.name}</h5>
							<span className="ms-2" onClick={() => actions.addFavorites(store.starshipDetails)}><i className="far fa-heart text-danger"></i></span>
						</div>
						
						<ul className="list-group list-group-flush">
							<li className="list-group-item">Modelo: {store.starshipDetails.model}</li>
							<li className="list-group-item">Fabricante: {store.starshipDetails.manufacturer}</li>
							<li className="list-group-item">Coste: {store.starshipDetails.cost_in_credits} créditos</li>
							<li className="list-group-item">Longitud: {store.starshipDetails.length} m</li>
							<li className="list-group-item">Tripulación: {store.starshipDetails.crew} personas</li>
							<li className="list-group-item">Pasajeros: {store.starshipDetails.passengers} personas</li>
							<li className="list-group-item">Capacidad de carga: {store.starshipDetails.cargo_capacity}</li>
						</ul>
					</div>
					<div className="d-flex justify-content-center mt-3">
						<Link to="/naves">
							<span className="btn btn-primary btn-lg" role="button">
								Volver a Naves
							</span>
						</Link>
					</div>
				</div>
			</div>)
	);
};


