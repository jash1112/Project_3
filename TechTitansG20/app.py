import pandas as pd
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import session
from sqlalchemy import create_engine, text, inspect, func
from flask import Flask, jsonify, render_template
import sqlite3

# Create the engine
engine = create_engine("sqlite:///DB/G20_GDP.sqlite", echo = False)

# Reflect the database schema
Base = automap_base()
Base.prepare(engine, reflect=True)

# Create the Flask application
app = Flask(__name__)



@app.route("/")
def get_gdp_data():
    conn = sqlite3.connect('DB/G20_GDP.sqlite')
    cursor = conn.cursor()
    cursor.execute("SELECT Country_Name, latitude, longitude, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028 FROM G20_GDP")

    data = cursor.fetchall()
    conn.close()
    
    # Convert the fetched data into a list of dictionaries
    gdp_data = []
    for row in data:
        gdp_data.append({
            "Country_Name": row[0],
            "latitude": row[1],
            "longitude": row[2],
            "GDP_data": row[3:]  
        })
    
    # Return the processed data as JSON
    return jsonify(gdp_data)

@app.route("/test")
def test():
    return("Test")

if __name__ == "__main__":
    app.run(debug=True)