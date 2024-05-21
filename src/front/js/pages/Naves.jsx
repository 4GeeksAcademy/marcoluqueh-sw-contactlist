import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const Naves = () => {
	const { store, actions } = useContext(Context);

	const handleDetalle = (starship) => {
		actions.chooseStarship(starship)
		actions.getDetailsStarship(starship.url)
	}

	const imgError = (event) => {
		event.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"
	}
	return (
		<div className="container">
			<div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mt-2 justify-content-center">
				{!store.starshipsSW ?
					<div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>
					:
					store.starshipsSW.map((item, key) => {
						return (
							<div className="card" key={key}>
								<img src={`https://starwars-visualguide.com/assets/img/starships/${item.uid}.jpg`} className="card-img-top" alt="..." onError={imgError} />
								<div className="card-body d-flex justify-content-center">
									<Link to={"/detalle-naves/"}
										onClick={() => handleDetalle(item)}>
										<h5 className="card-title">{item.name}</h5>
									</Link>
									<span className="ms-2" onClick={() => actions.addFavorites(item.name)}><i className="far fa-heart text-danger"></i></span>
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
