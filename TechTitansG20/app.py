import pandas as pd
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import session
from sqlalchemy import create_engine, text, inspect, func
from flask import Flask, jsonify, render_template

# Create the engine
# engine = create_engine("sql:///GlobalTechDB.sql", echo = False)
#insert fake data



# Reflect the database schema
# Base = automap_base()
# Base.prepare(engine, reflect=True)
# GlobalTechDB = Base.classes.GlobalTechDB
# Create the Flask application
app = Flask (__name__)
data = {
        "category1": 50,
        "category2": 75,
        "category3": 60,
        "category4": 80,
        "category5": 90
    }

@app.route("/api/v1.0/global_data")
def global_data():
    # session = session (engine)
    return jsonify(data)


@app.route("/")
def welcome ():
    return render_template('index.html')
if __name__ == "__main__":
    app.run(debug = True)