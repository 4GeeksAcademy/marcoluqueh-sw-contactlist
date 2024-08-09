import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Private = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	useEffect(() => {
		if (!store.isLogin) {
			navigate('/')
		}
	}, [])

	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="text-center">
					Perfil privado
				</div>
				<div className="d-flex justify-content-center mt-3">
					<Link to="/">
						<span className="btn btn-primary btn-lg" role="button">
							Volver al Home
						</span>
					</Link>
				</div>
			</div>
		</div>
	);
};


