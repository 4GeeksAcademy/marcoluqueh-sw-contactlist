import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext.js";

export const Personajes = () => {
	const { store, actions } = useContext(Context);

	const handleDetalle = (character) => {
		actions.chooseCharacter(character)
		actions.getDetailsCharacter(character.url)
	}

	return (
		<div className="container">
			<div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mt-2 justify-content-center">
				{!store.charactersSW ?
					<div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>
					:
					store.charactersSW.map((item, key) => {
						return (
							<div className="col-8" key={key}>
								<div className="card">
									<img src={`https://starwars-visualguide.com/assets/img/characters/${item.uid}.jpg`} className="card-img-top" alt="..." />
									<div className="card-body d-flex justify-content-center">
										<Link to={"/detalle-personajes"}
											onClick={() => handleDetalle(item)}>
											<h5 className="card-title text-center fs-6">{item.name}</h5>
										</Link>
										<span className="ms-2" onClick={() => actions.addFavorites(item.name)}><i className="far fa-heart text-danger"></i></span>
									</div>
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
