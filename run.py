from flask import Flask, render_template, request


app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        return render_template('index.html')

@app.route('/generate', methods=['GET'])
def generate():
    return render_template('generate.html')

@app.route('/own', methods=['GET'])
def own():
    return render_template('own.html')

@app.route('/read', methods=['POST'])
def read():
    text = request.form['userText']
    return render_template('read.html', text=text)

if __name__ == '__main__':
    app.run(debug=True)
    