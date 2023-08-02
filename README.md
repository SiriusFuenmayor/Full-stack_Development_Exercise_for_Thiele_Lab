Sample application for fetching the EMBL ChEMBL API
===================================================

Sample application showing the fetching, processing and visualisation of data from the ChEMBL API of the European Molecular Biology Laboratory (https://www.ebi.ac.uk/chembl/) using the Flask web framework and ChEMBL web service client (https://github.com/chembl/chembl_webresource_client). The D3.js JavaScript Library was used for creating the Heatmap for data visualization.

This application will extract all the pchembl_value's in the ChEMBL database relating the activity of a given molecule over a given target for targets and molecules of the following list:

List of targets: CHEMBL325, CHEMBL1937, CHEMBL1829, CHEMBL3524, CHEMBL2563, CHEMBL1865, CHEMBL2716, CHEMBL3192, CHEMBL4145, CHEMBL5103, CHEMBL3310

List of molecules: CHEMBL98, CHEMBL99, CHEMBL27759, CHEMBL2018302, CHEMBL483254, CHEMBL1213490, CHEMBL356769, CHEMBL272980, CHEMBL430060, CHEMBL1173445, CHEMBL356066, CHEMBL1914702

**Please look at the 'chembl_app_flask.py' and 'index.html' files which are commented showing the details of the data fetching and processing**

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
