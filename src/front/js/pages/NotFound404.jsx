import React, { useContext } from "react";
import { Context } from "../store/appContext";
import Yoda404 from "../../img/Yoda404.gif";
import "../../styles/home.css";

export const NotFound404 = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container text-center mt-2">
			<h1>404: Not found!!</h1>
			<br />
			<div className="m-0">
				<img className="rounded-pill img-fluid" src={Yoda404} />
			</div>
		</div>
	);
};
