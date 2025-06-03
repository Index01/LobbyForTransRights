

"""
Root application level
"""


from flask import Flask, render_template, request, jsonify
import pandas as pd
import os

app = Flask(__name__)

CSV_PATH = os.path.join('data', 'senatorContactInfo.csv')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_states')
def get_states():
    df = pd.read_csv(CSV_PATH)
    states = sorted(df['State'].unique())
    return jsonify(states)

@app.route('/get_senators', methods=['POST'])
def get_senators():
    state = request.json.get('state')
    df = pd.read_csv(CSV_PATH)
    filtered = df[df['State'] == state]
    print(f'filtered: {filtered}')
    return jsonify(filtered.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5555)

