"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import datetime
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from api.models import db, Users, Posts, Comments, Characters, Planets, PlanetFavorites, CharacterFavorites


api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


@api.route('/hello', methods=['GET'])
def handle_hello():
    response_body = {}
    response_body['message'] = "Hello! I'm a message that came from the backend"
    return response_body, 200


# Create a route to authenticate your users and return JWTs. 
# The create_access_token() function is used to actually generate the JWT.
@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None).lower()
    password = request.json.get("password", None)
    user = db.session.execute(db.select(Users).where(Users.email == email, Users.password == password, Users.is_active == True)).scalar()
    response_body = {}
    if user:
        access_token = create_access_token(
            identity={'user_id': user.id,
            'user_is_active': user.is_active}
            )
        response_body['message'] = 'User logueado'
        response_body['access_token'] = access_token
        return response_body, 200
    response_body['message'] = 'Bad username or password'
    return response_body, 401

@api.route("/signup", methods=["POST"])
def signup():
    response_body = {}
    email = request.json.get("email", None).lower()
    password = request.json.get("password", None)
    user = Users()
    user.email = email
    user.password = password
    user.is_active = True
    db.session.add(user)
    db.session.commit()
    access_token = create_access_token(
            identity={'user_id': user.id,
                      'user_is_active': user.is_active}
            )
    response_body['message'] = 'User logueado'
    response_body['access_token'] = access_token   
    return response_body, 200

   

@api.route("/private", methods=["GET"])
@jwt_required()
def private():
    response_body = {}
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    print(current_user)
    response_body['message'] = f'User logueado: {current_user}'
    return response_body, 200


@api.route('/users', methods=['GET', 'POST'])
def handle_users():
    response_body = {}
    if request.method == 'GET':
        users = db.session.execute(db.select(Users)).scalars()
        results = [row.serialize() for row in users]
        print(results)
        response_body['results'] = results
        response_body['message'] = "Listado de usuarios"
        return response_body, 200
    if request.method == 'POST':
        response_body['message'] = "El usuario se debe crear haciendo un /signup"
        return response_body, 200


@api.route('/users/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def handle_user(id):
    response_body = {}
    if request.method == 'GET':
        user = db.session.execute(db.select(Users).where(Users.id==id)).scalar()
        if user:
            results = user.serialize()
            response_body['results'] = results
            response_body['message'] = "Usuario existente"
            return response_body, 200
        response_body['message'] = "Usuario no encontrado"
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'PUT':
        data = request.json
        print(data)
        user = db.session.execute(db.select(Users).where(Users.id==id)).scalar()
        if user:
            user.password = data['password']
            user.is_active = data['is_active']
            user.first_name = data['first_name']
            user.last_name = data['last_name']
            db.session.commit()
            response_body['message'] = "Datos de usuario actualizados"
            response_body['results'] = user.serialize()
            return response_body, 200
        response_body['message'] = "Usuario no encontrado"
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'DELETE':
        user = db.session.execute(db.select(Users).where(Users.id==id)).scalar()
        if user:
            user.is_active = False
            db.session.commit()
            response_body['message'] = "Usuario deshabilitado"
            response_body['results'] = user.serialize()
            return response_body, 200
        response_body['message'] = "Usuario no encontrado"
        response_body['results'] = {}
        return response_body, 404


@api.route('/users/favorites/<int:id>', methods=['GET'])
def handle_user_favorites(id):
    response_body = {}
    
    if request.method == 'GET':
        planet_favorites = db.session.execute(
            db.select(PlanetFavorites).where(PlanetFavorites.user_id == id)
        ).scalars().all()
        
        character_favorites = db.session.execute(
            db.select(CharacterFavorites).where(CharacterFavorites.user_id == id)
        ).scalars().all()
        
        if planet_favorites or character_favorites:
            results_planet = [favorite.serialize() for favorite in planet_favorites]
            results_character = [favorite.serialize() for favorite in character_favorites]
            
            response_body['results'] = results_planet + results_character
            response_body['message'] = "Favoritos del usuario"
            return response_body, 200
        
        response_body['message'] = "Favoritos no encontrados"
        response_body['results'] = []
        return response_body, 404


@api.route('/posts', methods=['GET', 'POST'])
@jwt_required()
def handle_posts():
    response_body = {}
    current_user = get_jwt_identity()
    print(current_user)
    if request.method == 'GET':
        posts = db.session.execute(db.select(Posts)).scalars()
        results = [row.serialize() for row in posts]
        print(results)
        response_body['results'] = results
        response_body['message'] = "Listado de posts"
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        row = Posts()
        row.title =data['title']
        row.description =data['description']
        row.body =data['body']
        row.date = datetime.today()
        row.img_url =data['img_url']
        row.author_id = current_user['user_id']
        db.session.add(row)
        db.session.commit()
        response_body['results'] = row.serialize()
        response_body['message'] = "Post creado"
        return response_body, 200


@api.route('/posts/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def handle_post(id):
    response_body = {}
    if request.method == 'GET':
        post = db.session.execute(db.select(Posts).where(Posts.id==id)).scalar()
        if post:
            results = post.serialize()
            response_body['results'] = results
            response_body['message'] = "Usuario existente"
            return response_body, 200
        response_body['message'] = "Usuario no encontrado"
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'PUT':
        data = request.json
        print(data)
        post = db.session.execute(db.select(Posts).where(Posts.id==id)).scalar()
        if post:
            post.password = data['password']
            post.is_active = data['is_active']
            post.first_name = data['first_name']
            post.last_name = data['last_name']
            db.session.commit()
            response_body['message'] = "Datos de usuario actualizados"
            response_body['results'] = post.serialize()
            return response_body, 200
        response_body['message'] = "Usuario no encontrado"
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'DELETE':
        post = db.session.execute(db.select(Posts).where(Posts.id==id)).scalar()
        if post:
            post.is_active = False
            db.session.commit()
            response_body['message'] = "Usuario deshabilitado"
            response_body['results'] = post.serialize()
            return response_body, 200
        response_body['message'] = "Usuario no encontrado"
        response_body['results'] = {}
        return response_body, 404


@api.route('/favorite/planet/<int:planet_id>', methods=['POST', 'DELETE'])
def handle_favorite_planet(planet_id):
    response_body = {}
    data = request.json
    if request.method == 'POST':
        if data['user_id']:
            favorite_planet=PlanetFavorites()
            favorite_planet.user_id = data['user_id']
            favorite_planet.planet_id = planet_id
            db.session.add(favorite_planet)
            db.session.commit()
            response_body['message'] = "Planeta favorito agregado"
            response_body['results'] = favorite_planet.serialize()
            return response_body, 200
        response_body['message'] = "Usuario no encontrado"
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'DELETE':
        favorite_planet = db.session.execute(db.select(PlanetFavorites).where(PlanetFavorites.planet_id==planet_id and PlanetFavorites.user_id== data['user_id'])).scalar()
        if favorite_planet:
            db.session.delete(favorite_planet)
            db.session.commit()
            response_body['message'] = "Planeta favorito eliminado"
            response_body['results'] = {}
            return response_body, 200
        response_body['message'] = "Usuario no encontrado"
        response_body['results'] = {}
        return response_body, 404


@api.route('/favorite/character/<int:character_id>', methods=['POST', 'DELETE'])
def handle_favorite_character(character_id):
    response_body = {}
    data = request.json
    if request.method == 'POST':
        if data['user_id']:
            favorite_character=CharacterFavorites()
            favorite_character.user_id = data['user_id']
            favorite_character.character_id = character_id
            db.session.add(favorite_character)
            db.session.commit()
            response_body['message'] = "Personaje favorito agregado"
            response_body['results'] = favorite_character.serialize()
            return response_body, 200
        response_body['message'] = "Usuario no encontrado"
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'DELETE':
        favorite_character = db.session.execute(db.select(CharacterFavorites).where(CharacterFavorites.character_id==character_id and CharacterFavorites.user_id== data['user_id'])).scalar()
        if favorite_character:
            db.session.delete(favorite_character)
            db.session.commit()
            response_body['message'] = "Personaje favorito eliminado"
            response_body['results'] = {}
            return response_body, 200
        response_body['message'] = "Usuario no encontrado"
        response_body['results'] = {}
        return response_body, 404


@api.route('/characters', methods=['GET'])
def handle_characters():
    response_body = {}
    characters = db.session.execute(db.select(Characters)).scalars()
    results = [row.serialize() for row in characters]
    print(results)
    response_body['results'] = results
    response_body['message'] = "Listado de personajes"
    return response_body, 200


@api.route('/characters/<int:id>', methods=['GET'])
def handle_character(id):
    response_body = {}
    character = db.session.execute(db.select(Characters).where(Characters.id==id)).scalar()
    if character:
        results = character.serialize()
        response_body['results'] = results
        response_body['message'] = "Personaje existente"
        return response_body, 200
    response_body['message'] = "Personaje no encontrado"
    response_body['results'] = {}
    return response_body, 404


@api.route('/planets', methods=['GET'])
def handle_planets():
    response_body = {}
    planets = db.session.execute(db.select(Planets)).scalars()
    results = [row.serialize() for row in planets]
    print(results)
    response_body['results'] = results
    response_body['message'] = "Listado de planetas"
    return response_body, 200


@api.route('/planets/<int:id>', methods=['GET'])
def handle_planet(id):
    response_body = {}
    planet = db.session.execute(db.select(Planets).where(Planets.id==id)).scalar()
    if planet:
        results = planet.serialize()
        response_body['results'] = results
        response_body['message'] = "Planeta existente"
        return response_body, 200
    response_body['message'] = "Planeta no encontrado"
    response_body['results'] = {}
    return response_body, 404
