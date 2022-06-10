import database_common
from psycopg2 import sql

@database_common.connection_handler
def add_user(cursor, registration_form):
    query = sql.SQL("INSERT INTO users (username, password)  VALUES ({}, {})").format(sql.Literal(registration_form['username']), sql.Literal(registration_form['password']))
    cursor.execute(query)


@database_common.connection_handler
def list_scores(cursor):
    query = "SELECT user_name, user_score, registration_date FROM sudoku_scores ORDER BY user_score"
    cursor.execute(query)
    return cursor.fetchall()

@database_common.connection_handler
def insert_new_planet(cursor, registration_form):
    query = """
        INSERT INTO 
        (user_email, password, registration_date)
        VALUES
        (
        {user_email},
        {password},
        (SELECT NOW()::timestamp(0))
        )
    """
    cursor.execute(
        sql.SQL(query).format(
            user_email=sql.Literal(registration_form['user_email']),
            password=sql.Literal(registration_form['password'])
        )
    )


@database_common.connection_handler
def get_user_password_by_name(cursor, login_form):
    query = """
        SELECT password FROM users
        WHERE username = %s
    """
    cursor.execute(query, [login_form['username']])
    return cursor.fetchall()


@database_common.connection_handler
def get_user_id_by_name(cursor, username):
    query = """
            SELECT id FROM users
            WHERE user_email = %s
        """
    cursor.execute(query, [email])
    return cursor.fetchall()[0]
