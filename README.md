
## Description
**KeyKeg - Password Wizard | Secure, Strong, and Smart**
The ultimate password management solution that securely stores your passwords, generates strong and unique passwords, and utilizes artificial intelligence to analyze and classify password strength.

## Directory Structure
- **app/keykeg/**: Contains a Next.js app.
- **model/**: Contains a server and machine learning models.

## App Directory
1. **Installation**
   - Download or clone the repository.
   - Navigate to the `app/keykeg/` directory.
   - Run `npm install` to install dependencies.
	   - Make sure to make a .env file and insert the following environment variables:
		   - GOOGLE_ID = 
			- GOOGLE_SECRET = 
			- NEXTAUTH_URL = 
			- NEXTAUTH_SECRET = 
			- ADMIN_MAIL = 
			- MONGO_DB = 
			- MONGODB_USR = 
			- MONGODB_PWD = 
			- PRED_API = 
  
2. **Usage**
   - After installation, run the app using Node.js with the command `npm run dev` to run it in dev environment.

## Model Directory
1. **Exporting Models**
   - Use the provided `ipynb` file to train and then export machine learning models along with their vectorizers.

2. **Server Setup**
   - Navigate to the `model/` directory.
   - Run `pip install -r requirements.txt` to install dependencies for the server.
   - Execute `python server.py` to start the server.

## Additional Information
**Machine Learning Model Used for Password Prediction:** *Random Forest Ensemble Technique*
The Random Forest method operates by constructing numerous decision trees on random subsets of the training data and features. Each tree independently analyzes the data and makes predictions. However, the true power lies in aggregating these predictions through techniques like majority voting or averaging, resulting in a model that is more accurate and less prone to overfitting than its constituent decision trees.

This approach excels in handling high-dimensional and complex data, capturing intricate non-linear patterns that individual models may struggle with. Furthermore, Random Forests inherently offer parallelization capabilities, enabling efficient processing of large datasets, making them well-suited for big data applications.


Within a remarkable span of 2.5 days, I conceptualized, developed, and brought this password management application to life. 

Features ⭐️
1. AI-Powered Strength Prediction: 
Harnessing the power of Random Forest Ensemble Technique, KeyKeg accurately predicts password strength. 

2. Seamless Integration: 
With integration of MongoDB and Next.js, KeyKeg delivers seamless data/password storage and processing capabilities. 

3. Built-In Secure Password Generator: 
KeyKeg boasts its own secure password generator, eliminating reliance on third-party tools. 
