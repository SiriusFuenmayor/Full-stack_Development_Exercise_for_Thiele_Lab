# For this part I used the instructions on https://flask.palletsprojects.com/en/2.3.x/patterns/sqlite3/

import sqlite3
from flask import Flask, g
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

DATABASE = './metabolic_reactions.db'

# When a Flask application begins handling a request, it pushes an application context and a request context. When the request ends it pops the request context then the application context. Typically, an application context will have the same lifetime as a request.

# g proxie to the application context will define _database as an object in the application context and when the request ends the application context will end and the _database object will be destroyed. 

def get_db_connection():

    # if there is a _database object defined on the application context (g proxy) save that _database object in the connection object, if not save None in the connection object  
    connection = getattr(g, '_database', None)
    # if there isn't already an _database object defined on the application context (connection is None) then create one 
    if connection is None:
        connection = g._database = sqlite3.connect(DATABASE)

    return connection

# The application will call functions registered with teardown_appcontext() when the application context is popped. In this case it will close the database connection
@app.teardown_appcontext
def close_db_connection(exception):
    connection = getattr(g, '_database', None)
    if connection is not None:
        connection.close()

# Please keep in mind that the teardown request and appcontext functions are always executed, even if a before-request handler failed or was never executed. Because of this we have to make sure here that the database is there before we close it.

# Now, to use the database, the application must either have an active application context (which is always true if there is a request in flight) or create an application context itself. At that point the get_db_connection function can be used to get the current database connection. Whenever the context is destroyed the database connection will be terminated.

### Create an endpoint /api/metabolites which fetches and returns a list of all metabolites from the database.

# Use the app.route() decorator to create a Flask view function called get_metabolites
@app.route('/api/metabolites')
def get_metabolites(): 

    # Open database connection and have access to the result of the db query as a Rows object
    cursor = get_db_connection().cursor() # the cursor.execute method resolves to a list of tuples where each tuple contains field values
    metabolites = cursor.execute("SELECT [Metabolite] FROM metabolic_reactions").fetchall()

    metabolite_list = []    
    for index, tup in enumerate(metabolites):
        metabolite_list.append(tup[0])

    return {"Metabolites" : metabolite_list}


### Create another endpoint /api/metabolite/<metabolite_name> that returns the reactionType, equation, and pubmedID for a given metabolite.
@app.route('/api/metabolites/<metabolite_name>')
def get_data_from_metabolite(metabolite_name): 

    cursor = get_db_connection().cursor()    
    metabolite_data = cursor.execute("SELECT [Reaction Type], [Equation], [pubmedID] FROM metabolic_reactions WHERE [Metabolite] = ?", (metabolite_name,)).fetchall()

    return {
              "ReactionType" : metabolite_data[0][0], 
              "Equation" : metabolite_data[0][1], 
              "pubmedID" : metabolite_data[0][2]                
           }

if __name__ == "__main__":
    #app.debug = True
    #app.run(debug=True, port=8080)
    app.run(port=8080)