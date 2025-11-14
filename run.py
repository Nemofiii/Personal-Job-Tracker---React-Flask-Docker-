from app import create_app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)

# This stays the same — but Docker will NOT use run.py anymore.
# This file is ONLY for running locally with:
# python run.py