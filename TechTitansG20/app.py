from flask import Flask, jsonify, render_template
from sqlalchemy import create_engine, select
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session

# Create a Flask app
app = Flask(__name__)

# Create a SQLAlchemy engine
render_username = 'dbproject_gsp1_user'
render_password = 'ihhqN4W8JGLmEBjsjUkjVkQbUrKauRCu'
render_host = 'dpg-cnggrb6ct0pc73e2ablg-a.ohio-postgres.render.com'
database = 'dbproject_gsp1'
engine = create_engine(f"postgresql+psycopg2://{render_username}:{render_password}@{render_host}:5432/{database}")
Base = automap_base()

# reflect the tables
Base.prepare(engine, reflect=True)


print(Base.classes.keys())
# Save references to each table
gdp_table = Base.classes.G20_GDP_Data
inflation_table = Base.classes.Inflation_Data
indices_table = Base.classes.indices_Data
company_table = Base.classes.Global_Data


# def fetch_data_from_database(table):
#         session = Session(engine)
#     # try:
#         # Create a select query to fetch all data from the table
#         result = session.query(table).all()

#         # Convert the result to a list of dictionaries
#         data = [row.__dict__ for row in result]
#         session.close()
#         return data
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


   

@app.route('/')
def home():
    html= "/api/gdp<br>"
    html+= "/api/inflation<br>"
    html+= "/api/indices<br>"
    html+=  "/api/company<br>" 
    return render_template('index.html')

@app.route('/api/gdp')
def get_gdp_data():
    # Fetch GDP data from the database
    gdp_data = fetch_data_from_database(gdp_table)
    print(gdp_data)

    # Return the GDP data as JSON
    # return jsonify(gdp_data)
    return render_template('index.html', gdp_data=gdp_data)

Session.close
@app.route('/api/inflation')
def get_inflation_data():
    # Fetch inflation data from the database
    inflation_data = fetch_data_from_database(inflation_table)

    # Return the inflation data as JSON
    return jsonify(inflation_data)
Session.close

@app.route('/api/indices')
def get_indices_data():
    # Fetch inflation data from the database
    indices_data = fetch_data_from_database(indices_table)

    # Return the inflation data as JSON
    return jsonify(indices_data)
Session.close

@app.route('/api/company')
def get_company_data():
    # Fetch inflation data from the database
    company_data = fetch_data_from_database(company_table)

    # Return the inflation data as JSON
    return jsonify(company_data)
Session.close

if __name__ == '__main__':
    app.run(debug=True)