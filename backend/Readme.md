## Backend Installation

### Technologies Used

1.	FastAPI: A modern, fast (high-performance) web framework for building APIs with Python 3.7+ based on standard Python type hints.

2.	SQLAlchemy: A SQL toolkit and Object-Relational Mapping (ORM) library for Python, which allows for database manipulation through Python objects.

3.	MySQL: An open-source relational database management system used for storing and managing the application’s data.

4.	Pydantic: Used for data validation and settings management using Python type annotations, often integrated with FastAPI for request and response data validation.

5.	CORS Middleware: Middleware for handling Cross-Origin Resource Sharing (CORS) to allow your backend API to be accessed from a different origin (like your frontend application).

6.	Uvicorn: An ASGI server that serves your FastAPI application, allowing it to handle asynchronous requests efficiently.


7.	Python: The programming language used for writing the backend code.

8.	dotenv: A module used to load environment variables from a .env file, typically for configuration settings such as database URLs.


## Create a virtual environment

     • python -m venv venv

Activate the virtual environment:
	•	On Windows:

    •  venv\Scripts\activate


  		On macOS/Linux:


    - source venv/bin/activate

## Set up the environment variables:

### Create a .env file in the backend/ directory and add your database URL:


     • DATABASE_URL=mysql://username:password@localhost/purchase_db





## Install the requirments mentioned in req.txt file
    • cd backend
    • pip install -r req.txt
    

# Start the FastAPI server:
    • cd backend
    • uvicorn backend:app --reload



