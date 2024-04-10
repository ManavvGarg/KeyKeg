from flask import Flask, request, jsonify
import pickle
import numpy as np
from warnings import filterwarnings
#vectorizer = TfidfVectorizer(analyzer="char")

app = Flask(__name__)
# Load the trained model
model = pickle.load(open('./keykeg_rf.pkl', 'rb'))
vectorizer = pickle.load(open('./keykeg_rf_vectorizer.pkl', 'rb'))

@app.route('/predict', methods=['GET'])
def predict():
    # Get data from request parameters
    password = request.args.get('password')
    pass_array = np.array([password])
    
    # 151 dimension
    sample_matrix = vectorizer.transform(pass_array) 
    
    # +2 dimension
    length_pass = len(password)
    length_normalised_lowercase = len([char for char in password if char.islower()])/len(password)
    
    # 151 + 2 
    new_matrix2 = np.append(sample_matrix.toarray() , (length_pass , length_normalised_lowercase)).reshape(1,155)

    # Make predictions using the loaded model
    prediction = model.predict(new_matrix2)

    if prediction == 0 :
        return jsonify({'prediction': "Your Password is Weak"})
    elif prediction == 1 :
        return jsonify({'prediction': "Your Password is Normal"})
    else:
        return jsonify({'prediction': "Your password is Strong"})

if __name__ == '__main__':
    app.run(debug=True)
