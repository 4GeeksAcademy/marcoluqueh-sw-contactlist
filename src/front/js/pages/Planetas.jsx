import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const Planetas = () => {
	const { store, actions } = useContext(Context);

	const handleDetalle = (planet) => {
		actions.choosePlanet(planet)
		actions.getDetailsPlanet(planet.url)
	}
	const isFavorite = (name) => {
		return store.favorites.includes(name);
	};

	const imgError = (event) => {
		event.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"
	}
	return (
		<div className="container">
			<div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mt-2 justify-content-center">
				{!store.planetsSW ?
					<div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>
					:
					store.planetsSW.map((item, key) => {
						return (
							<div className="col-8" key={key}>
								<div className="card">
									<img src={`https://starwars-visualguide.com/assets/img/planets/${item.uid}.jpg`} className="card-img-top" alt="..." onError={imgError} />
									<div className="card-body d-flex justify-content-center">
										<Link to={"/detalle-planetas/"}
											onClick={() => handleDetalle(item)}>
											<h5 className="card-title">{item.name}</h5>
										</Link>
										{isFavorite(item.name) ? (
										<span className="ms-2" onClick={() => actions.removeFavorites(item.name)} style={{cursor : 'pointer' }}><i className="fas fa-heart text-danger"></i></span>
									) : (
										<span className="ms-2" onClick={() => actions.addFavorites(item.name)} style={{cursor : 'pointer' }}><i className="far fa-heart text-danger"></i></span>
									)}									</div>
								</div>
							</div>
						);
					})

				}
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
