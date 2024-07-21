from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    first_name = db.Column(db.String(40), unique=False, nullable=False)
    last_name = db.Column(db.String(80), unique=False, nullable=False)

    def __repr__(self):
        return f'<Users {self.email}>'

    def serialize(self):
        # Do not serialize the password, its a security breach
        return {'id': self.id,
                'email': self.email,
                'is_active': self.is_active,
                'first_name': self.first_name,
                'last_name': self.last_name}


class Followers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_from_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_from_id_to = db.relationship('Users', foreign_keys=[user_from_id])
    user_to_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to_id_to = db.relationship('Users', foreign_keys=[user_to_id])


    def __repr__(self):
        return f'<Follow {self.user_from_id} -> {self.user_to_id}>'

    def serialize(self):
        return {'id': self.id,
                'user_from_id': self.user_from_id,
                'user_to_id': self.user_to_id}


class Posts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(240), unique=False, nullable=False)
    description = db.Column(db.String(500), unique=False, nullable=False)
    body = db.Column(db.String(500), unique=False, nullable=False)
    date = db.Column(db.Date(), unique=False, nullable=False)
    img_url = db.Column(db.String(), unique=False, nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    author_id_to = db.relationship('Users', foreign_keys=[author_id])


    def __repr__(self):
        return f'<Posts {self.id}>'

    def serialize(self):
        return {'id': self.id,
                'title': self.title,
                'description': self.description,
                'body': self.body,
                'date': self.date,
                'img_url': self.img_url,
                'author_id': self.author_id}


class Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(500), unique=False, nullable=False)
    date = db.Column(db.Date(), unique=False, nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    post_id_to = db.relationship('Posts', foreign_keys=[post_id])
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_id_to = db.relationship('Users', foreign_keys=[user_id])


    def __repr__(self):
        return f'<Comments {self.id}>'

    def serialize(self):
        return {'id': self.id,
                'body': self.body,
                'date': self.date,
                'post_id': self.post_id,
                'user_id': self.user_id}


class Planets(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), unique=False, nullable=False)
    diameter = db.Column(db.Float, unique=False, nullable=False)


    def __repr__(self):
        return f'<Planets {self.id}>'

    def serialize(self):
        return {'id': self.id,
                'name': self.name,
                'diameter': self.diameter}


class Characters(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), unique=False, nullable=False)
    height = db.Column(db.Integer, unique=False, nullable=False)
    mass = db.Column(db.Integer, unique=False, nullable=False)
    hair_color = db.Column(db.String(40), unique=False, nullable=False)
    skin_color = db.Column(db.String(40), unique=False, nullable=False)
    eye_color = db.Column(db.String(40), unique=False, nullable=False)
    birth_year = db.Column(db.String(40), unique=False, nullable=False)
    gender = db.Column(db.String(40), unique=False, nullable=False)
    description = db.Column(db.String(500), unique=False, nullable=False)
    homeworld_id = db.Column(db.Integer, db.ForeignKey('planets.id'))
    homeworld_id_to = db.relationship('Planets', foreign_keys=[homeworld_id])


    def __repr__(self):
        return f'<Characters {self.id}>'

    def serialize(self):
        return {'id': self.id,
                'name': self.name,
                'description': self.description,
                'homeworld_id': self.homeworld_id}


class Films(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), unique=False, nullable=False)
    director = db.Column(db.String(100), unique=False, nullable=False)
    release_date = db.Column(db.Date, unique=False, nullable=False)
    

    def __repr__(self):
        return f'<Films {self.id}>'

    def serialize(self):
        return {'id': self.id,
                'name': self.name,
                'director': self.director,
                'release_date': self.release_date}


class Cast(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    actor_name = db.Column(db.String(40), unique=False, nullable=False)
    character_id = db.Column(db.Integer, db.ForeignKey('characters.id'))
    character_id_to = db.relationship('Characters', foreign_keys=[character_id])
    film_id = db.Column(db.Integer, db.ForeignKey('films.id'))
    film_id_to = db.relationship('Films', foreign_keys=[film_id])


    def __repr__(self):
        return f'<Cast {self.id}>'

    def serialize(self):
        return {'id': self.id,
                'actor_name': self.actor_name,
                'character_id': self.character_id,
                'film_id': self.film_id}


class PlanetFavorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_id_to = db.relationship('Users', foreign_keys=[user_id])
    planet_id = db.Column(db.Integer, db.ForeignKey('planets.id'))
    planet_id_to = db.relationship('Planets', foreign_keys=[planet_id])


    def __repr__(self):
        return f'<PlanetFavorites {self.id}>'

    def serialize(self):
        return {'id': self.id,
                'user_id': self.user_id,
                'planet_id': self.planet_id}


class CharacterFavorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_id_to = db.relationship('Users', foreign_keys=[user_id])
    character_id = db.Column(db.Integer, db.ForeignKey('characters.id'))
    character_id_to = db.relationship('Characters', foreign_keys=[character_id])


    def __repr__(self):
        return f'<CharacterFavorites {self.id}>'

    def serialize(self):
        return {'id': self.id,
                'user_id': self.user_id,
                'character_id': self.character_id}
