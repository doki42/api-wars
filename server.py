from flask import Flask, flash, request, render_template, session, redirect, escape, url_for, jsonify
import data_manager, secrets, hash
from psycopg2 import errors

app = Flask(__name__)
app.secret_key = secrets.token_bytes(16)


@app.route('/')
def main_page():
    title = "Star Wars universe planets"
    if 'username' in session:
        user_name = escape(session['username'])
        return render_template("index.html", title=title, user_name=user_name)
    return render_template("index.html")


@app.route("/registration", methods=['GET', 'POST'])
def registration():
    if request.method == 'POST':
        new_user_dictionary = dict(request.form)
        hashed_password = hash.hash_password(request.form['password'])
        new_user_dictionary['password'] = hashed_password
        try:
            data_manager.add_user(new_user_dictionary)
        except errors.UniqueViolation:
            flash('Username already exists, please choose another one!')
            return render_template("registration.html")
        flash('Successful registration. Log in to continue.')
        return redirect(url_for('login'))
    return render_template('registration.html')


@app.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        user_hashed_password = data_manager.get_user_password_by_name(request.form)
        if user_hashed_password:
            try:
                hash.verify_password(request.form['password'],
                                     user_hashed_password[0]['password'])
            except ValueError:
                flash('Wrong username or password')

            else:
                session['username'] = request.form['username']
                return redirect(url_for('main_page'))
        else:
            flash('Wrong username or password')
            # return render_template('index.html')
    return render_template('login.html')


@app.route("/logout")
def logout():
    session.pop('username', None)
    return redirect(url_for('main_page'))


if __name__ == "__main__":
    app.run(
        host='0.0.0.0',
        port=8010,
        debug=True,
    )
