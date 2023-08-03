Full-stack Development Exercise for a PhD Position in the Thiele Lab
====================================================================

Full-stack Development Exercise for a PhD Position in the Thiele Lab. The backend was implemented using the Flask framework and the frontend using the React Next.js framework.

As stated in the Flask documentation for the deployment of Flask applications for production:

*A WSGI server is used to run the application, converting incoming HTTP requests to the standard WSGI environ, and converting outgoing WSGI responses to HTTP responses.*

and

*WSGI servers have HTTP servers built-in. However, a dedicated HTTP server may be safer, more efficient, or more capable. Putting an HTTP server in front of the WSGI server is called a “reverse proxy.”*

For this purpose for the production version of the application [uWSGI](https://uwsgi-docs.readthedocs.io/en/latest/) was used as **WSGI** server and [nginx](https://www.nginx.com/) was used for the **reverse proxy** setup. 

*Please look at the page.js file in the \src\app folder and the files in the \src\components folder of the Frontend which are commented showing the details the data fetching and visualization as well as the api.py file in the Backend to look at the implemenation of the API*

Deployment for production with Docker containers
-------------------------------------------------

To build and run docker containers for the Flask api, uWSGI and Nginx servers and the for the Next.js frontend move to the **Production** folder and then execute the following command to build the containers using Docker Compose:

`docker-compose build`

Then run the containers with the command:

`docker-compose up`

To stop the containers run the command

`docker-compose down`

Development
-----------

For development follow the instructions bellow to start the Flask server and the Next.js application.

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
