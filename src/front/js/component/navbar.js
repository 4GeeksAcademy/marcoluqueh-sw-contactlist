import React, { useContext } from "react";
import { Context } from "../store/appContext.js"
import { Link } from "react-router-dom";
import logo from "../../img/SW-logo.png";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	return (
		<nav className="navbar navbar-expand-md navbar-light bg-lighter">
			<div className="container-fluid">
				<Link to={'/'} className="navbar-brand ps-5" >
					<img src={logo} alt="Logo" width="100" height="100" className="d-inline-block align-text-top" />
				</Link>
				<div className="">
					<button className="navbar-toggler me-5" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav me-5 mb-2 mb-lg-0">
							<li className="nav-item">
								<Link to={'/personajes'} className="nav-link active">Personajes</Link>
							</li>
							<li className="nav-item">
								<Link to={'/planetas'} className="nav-link active">Planetas</Link>
							</li>
							<li className="nav-item">
								<Link to={'/naves'} className="nav-link active">Naves</Link>
							</li>
							<li className="nav-item dropdown">
								<a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle={store.favorites.length > 0 ? 'dropdown' : ''} aria-expanded="false">
									<i className="far fa-heart"></i> <span className="badge rounded-pill bg-success">{store.favorites.length}</span>
								</a>
								<ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
									{store.favorites.map((item, index) =>
										<li className="dropdown-item d-flex justify-content-between" key={index}>
											{item}
											<span className="ms-2" style={{cursor : 'pointer' }} onClick={() => actions.removeFavorites(item)}><i className="fas fa-heart text-danger"></i></span>
										</li>)}
								</ul>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};
