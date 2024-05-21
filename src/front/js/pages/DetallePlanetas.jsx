import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const DetallePlanetas = () => {
	const { store, actions } = useContext(Context);
	const imgError = (event) => {
		event.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"
	}

	return (
		<div className="container">
			<div className="row justify-content-center">
			<div className="card col-6">
				<img src={`https://starwars-visualguide.com/assets/img/planets/${store.currentPlanet.uid}.jpg`} className="card-img-top" alt="..." onError={imgError}/>
				<div className="card-body">
					<h5 className="card-title">{store.planetDetails.name}</h5>
				</div>
				<ul className="list-group list-group-flush">
					<li className="list-group-item">Diámetro: {store.planetDetails.diameter} km</li>
					<li className="list-group-item">Período de rotación: {store.planetDetails.rotation_period} horas</li>
					<li className="list-group-item">Período de traslación: {store.planetDetails.orbital_period} días</li>
					<li className="list-group-item">Gravedad: {store.planetDetails.gravity}</li>
					<li className="list-group-item">Población: {store.planetDetails.population} kg</li>
					<li className="list-group-item">Clima: {store.planetDetails.climate}</li>
					<li className="list-group-item">Tipo de terreno: {store.planetDetails.terrain}</li>
					<li className="list-group-item">Superficie acuosa: {store.planetDetails.surface_water}%</li>
				</ul>
			</div>
			<div className="d-flex justify-content-center mt-3">
			<Link to="/planetas">
				<span className="btn btn-primary btn-lg" role="button">
					Volver a Planetas
				</span>
			</Link>
			</div>
			</div>
		</div>
	);
};


