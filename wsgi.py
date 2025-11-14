from app import create_app

app = create_app()

# No if __name__ == "__main__",
# No debug=True,
# No reloader,
# No running app.
# Just expose the app.

# Gunicorn LOVES this.