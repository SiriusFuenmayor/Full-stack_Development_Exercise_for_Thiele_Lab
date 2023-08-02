Full-stack Development Exercise for a PhD Position in the Thiele Lab
====================================================================

Full-stack Development Exercise for a PhD Position in the Thiele Lab. The backend was implemented using the Flask framework and the frontend using the React Next.js framework.

**Please look at the page.js file in the \src\app folder and the files in the \src\components folder of the Frontend which are commented showing the details the data fetching and visualization as well as the api.py file in the Backend to look at the implemenation of the API**

Installation
------------

**Method 1: Docker image**

You can use the Dockerfiles provided to build and run the Docker images for the API and frontend applications. 

**Method 2: Manual installation**

**Flask backend**

- cd into the **Backend** folder
- create virtual enviroment with

	`python -m venv .venv`
	
- Activate the enviroment with 

	`.venv\Scripts\activate`

- Install requirements with

    `pip install -r requirements.txt`
    
- Run Flask server with

    `python .\api.py`

    it will start the Flask server will be available on 
    
    `http://localhost:8080`
    
- After stopping the server you can deactivate the vitual enviroment

    `deactivate`

**Next.js frontend**

- cd into **Frontend** folder

- install node modules with:

    `npm install`
    
- then you can run the development server with

    `npm run dev`
    
    it will start the development mode and the web page will be available on
    
    `http://localhost:3000`
    
- for a **production** build use the Docker container.
