from flask import Flask, render_template, request
from markupsafe import Markup
from silben import transform_text_to_syllables


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
    action = request.form.get('action', None)

    if action == "own_text":
        text = request.form['userText']
        syllables = transform_text_to_syllables(text)
        text_words = text
        
        return render_template('read.html', syllables_text=Markup(syllables), text_words=Markup(text_words))

    
    return render_template('index.html')
        


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)
    