from flask import Flask, send_from_directory

app = Flask(__name__)

# Routes
@app.route('/')
def root():
    # Send default home page
    return app.send_static_file('index.html')

@app.route('/<path:path>')
def static_proxy(path):
    # Send files from directory ./static/
    return app.send_static_file(path)

if __name__ == "__main__":
    app.run(port=80)