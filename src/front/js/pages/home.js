import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Characters from "../../img/character.jpg";
import Planets from "../../img/planets.jpg";
import Starships from "../../img/starships.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<Link to="/personajes">
			<div className="row justify-content-center">
				<div className="col-12">
				<img className="rounded-pill img-fluid" src={Characters} />
				</div>
				<p className="fw-bold">Personajes</p>
			</div>
			</Link>

			<Link to="/planetas">
			<div className="row justify-content-center">
				<div className="col-12">
				<img className="rounded-pill img-fluid" src={Planets} />
				</div>
				<p className="fw-bold">Planetas</p>
			</div>
			</Link>

			<Link to="/naves">
			<div className="row justify-content-center">
				<div className="col-12">
				<img className="rounded-pill img-fluid" src={Starships} />
				</div>
				<p className="fw-bold">Naves espaciales</p>
			</div>
			</Link>
		</div>
	);
};
