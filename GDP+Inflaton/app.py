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


def fetch_data_from_database(table):
    with Session(engine) as session:
        try:
            result = session.query(table).all()
            data = [row.__dict__ for row in result]
            for item in data:
                item.pop('_sa_instance_state', None)
            return data
        except Exception as e:
            print(f"Error fetching data from database: {e}")
            return []


@app.route('/')
def home():
    html =  "Main Page<br>" 
    html += "/api/gdp<br>"
    html += "/api/inflation<br>"
    return html

@app.route('/api/gdp')
def get_gdp_data():
    # Fetch GDP data from the database
    gdp_data = fetch_data_from_database(gdp_table)
    
    
    # Return the GDP data as JSON
    return jsonify(gdp_data)
    #return render_template('index.html')

@app.route('/api/inflation')
def get_inflation_data():
    # Fetch inflation data from the database
    inflation_data = fetch_data_from_database(inflation_table)

    # Return the inflation data as JSON
    return jsonify(inflation_data)
    #return render_template('index.html')

@app.route('/dashboard')
def draw_dashboard():
    return render_template('dashboard.html')

if __name__ == '__main__':
    app.run(debug=True)
