from flask import Flask, jsonify, render_template, request
from sqlalchemy import create_engine, select
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session, sessionmaker

# Create a Flask app
app = Flask(__name__)

# Create a SQLAlchemy engine
render_username = 'dbproject_gsp1_user'
render_password = 'ihhqN4W8JGLmEBjsjUkjVkQbUrKauRCu'
render_host = 'dpg-cnggrb6ct0pc73e2ablg-a.ohio-postgres.render.com'
database = 'dbproject_gsp1'
engine = create_engine(f"postgresql+psycopg2://{render_username}:{render_password}@{render_host}:5432/{database}")
Base = automap_base()

# reflect the tables|
Base.prepare(engine, reflect=True)

print(Base.classes.keys())
# Save references to each table
gdp_table = Base.classes.G20_GDP_Data
inflation_table = Base.classes.Inflation_Data
indices_table = Base.classes.Indices_Data
company_table = Base.classes.Global_Data

def fetch_data_from_database(table):
    with Session(engine) as session:
        try:
            # Query the database
            result = session.query(table).all()

            # Convert ORM objects to dictionaries
            data = [row.__dict__ for row in result]

            # Remove the '_sa_instance_state' key from each dictionary
            for item in data:
                item.pop('_sa_instance_state', None)

            return data
        except Exception as e:
            # Handle exceptions here, e.g., log the error or raise it
            print(f"Error fetching data from database: {e}")
            return []
def fetch_country_data(year=None):
    with Session(engine) as session:
        try:
            query = session.query(gdp_table)
            # This is where you'd add filtering logic if your table supports it.
            # For example, if 'year' is a column: query = query.filter(gdp_table.year == year)
            results = query.all()
            return results
        except Exception as e:
            print(f"Error fetching country data from database: {e}")
            return []
        

@app.route('/')
def home():
    html= "/api/gdp<br>"
    html+= "/api/inflation<br>"
    html+= "/api/indices<br>"
    html+=  "/api/company<br>" 
    return render_template('index.html')

@app.route('/api/inflation')
def get_inflation_data():
    # Fetch inflation data from the database
    inflation_data = fetch_data_from_database(inflation_table)

    # Return the inflation data as JSON
    return jsonify('inflationtion.html',inflation_data=inflation_data)
@app.route('/api/gdp')
def get_gdp_data():
    # Fetch all GDP data from the database
    all_gdp_data = fetch_data_from_database(gdp_table)
    
    # Extract the 'year' query parameter from the URL, if provided
    year = request.args.get('year')
    
    processed_data = []
    
    # Process each country's data
    for country_data in all_gdp_data:
        if year in country_data:
            # If a specific year is requested and data for that year exists
            gdp_value = country_data.get(str(year), "no data")
        else:
            # If no specific year is requested or data for that year does not exist, default to "no data"
            gdp_value = "no data"
        
        # Append processed data for each country
        processed_data.append({
            "name": country_data.get("Country_Name", "Unknown"),
            "lat": country_data.get("latitude", 0),
            "lng": country_data.get("longitude", 0),
            "gdp": gdp_value,
            "year": year if year else "All Years"
        })
    
    # Assuming 'gdp.html' is designed to display this data
    return render_template('gdp.html', gdp_data=processed_data, year=year if year else "All Years")
@app.route('/api/indices')
def get_indices_data():
    # Fetch inflation data from the database
    indices_data = fetch_data_from_database(indices_table)

    # Return the inflation data as JSON
    return render_template('indices.html', indices_data=indices_table) 
@app.route('/api/company')
def get_company_data():
    # Fetch inflation data from the database
    company_data = fetch_data_from_database(company_table)

    # Return the inflation data as JSON
    return render_template('company.html')
Session.close

if __name__ == '__main__':
    app.run(debug=True)
