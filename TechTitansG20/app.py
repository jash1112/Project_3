from flask import Flask, jsonify
from sqlalchemy import create_engine
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session

# Create a Flask app
app = Flask(__name__)

# Database configuration
DATABASE_URL = "postgresql+psycopg2://dbproject_gsp1_user:ihhqN4W8JGLmEBjsjUkjVkQbUrKauRCu@dpg-cnggrb6ct0pc73e2ablg-a.ohio-postgres.render.com:5432/dbproject_gsp1"

# Create a SQLAlchemy engine
engine = create_engine(DATABASE_URL)
Base = automap_base()
# Reflect the tables
metadata = Base.metadata
Base.prepare(engine, autoload_with=engine, metadata=metadata)
# Map tables
GdpTable = Base.classes.G20_GDP_Data
InflationTable = Base.classes.Inflation_Data
IndicesTable = Base.classes.Indices_Data
CompanyTable = Base.classes.Global_Data

def fetch_data_from_database(table):
    """Fetch data from the specified table."""
    with Session(engine) as session:
        try:
            result = session.query(table).all()
            data = [{key: getattr(row, key) for key in row.__dict__.keys() if not key.startswith('_')} for row in result]
            return data
        except Exception as e:
            print(f"Error fetching data from database: {e}")
            return []

@app.route('/')
def home():
    """Home page."""
    return "Welcome to the API!<br>Available endpoints:<br>/api/gdp<br>/api/inflation<br>/api/indices<br>/api/company"

@app.route('/api/gdp')
def get_gdp_data():
    """Get GDP data."""
    gdp_data = fetch_data_from_database(GdpTable)
    return jsonify(gdp_data)

@app.route('/api/inflation')
def get_inflation_data():
    """Get inflation data."""
    inflation_data = fetch_data_from_database(InflationTable)
    return jsonify(inflation_data)

@app.route('/api/indices')
def get_indices_data():
    """Get indices data."""
    indices_data = fetch_data_from_database(IndicesTable)
    return jsonify(indices_data)

@app.route('/api/company')
def get_company_data():
    """Get company data."""
    company_data = fetch_data_from_database(CompanyTable)
    return jsonify(company_data)

if __name__ == '__main__':
    app.run(debug=True)