# Jira Query Predictor with Vector Database

## Overview
This project leverages machine learning to predict Jira queries by utilizing solutions stored in a DVector database. The model enhances issue tracking and management by providing intelligent query suggestions based on historical data.

## Features
- **Predictive Modeling**: Uses advanced algorithms to predict Jira queries.
- **Vector Database Integration**: Efficiently retrieves and utilizes solution data stored in DVector for accurate predictions.
- **Automated Query Suggestions**: Enhances productivity by automating the query suggestion process.
- **Scalable and Adaptable**: Easily integrates with existing Jira setups and can be scaled to handle large datasets.

## Tech Stack
- **BERT Embeddings**: For transforming text data into meaningful vector representations.
- **Vector Database-FAISS**: To store and manage solution vectors.
- **Python**: Main programming language for model development and integration.
- **TensorFlow/PyTorch**: For building and training the machine learning models.
- **Django**: For creating the web API to serve the model predictions.
- **React**: For the frontend user interface to interact with the model.

## Getting Started

### Backend

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/yourusername/jiraModelCreation.git
    cd jiraModelCreation
    ```

2. **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

3. **Configure Database**:
    - Ensure your DVector database is set up and accessible.
    - Update the database configuration in `config.py`.

4. **Run Migrations**:
    ```bash
    python manage.py migrate
    ```

5. **Run the Django Server**:
    ```bash
    python manage.py runserver
    ```

6. **Django API Code**:

    - **`jira_predictor/views.py`**:
    ```python
    from django.http import JsonResponse
    from .model import predict_query

    def predict(request):
        if request.method == 'POST':
            data = json.loads(request.body)
            query = data.get('query')
            if not query:
                return JsonResponse({'error': 'No query provided'}, status=400)

            prediction = predict_query(query)
            return JsonResponse({'prediction': prediction})
        return JsonResponse({'error': 'Invalid method'}, status=405)
    ```

    - **`jira_predictor/urls.py`**:
    ```python
    from django.urls import path
    from . import views

    urlpatterns = [
        path('predict/', views.predict, name='predict'),
    ]
    ```

    - **`jira_predictor/model.py`**:
    ```python
    import faiss
    import numpy as np
    import tensorflow as tf
    from transformers import BertTokenizer, TFBertModel

    # Load BERT model and tokenizer
    tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
    bert_model = TFBertModel.from_pretrained('bert-base-uncased')

    def predict_query(query):
        # Tokenize and encode the query
        inputs = tokenizer(query, return_tensors='tf')
        outputs = bert_model(**inputs)
        embeddings = outputs.last_hidden_state.mean(axis=1).numpy()
        
        # Assuming FAISS index is already loaded
        index = faiss.read_index('path/to/your/index/file')
        _, I = index.search(embeddings, k=1)  # k=1 for the top prediction

        # Return the most similar query
        return I[0][0]
    ```

### Frontend

1. **Navigate to the Frontend Directory**:
    ```bash
    cd frontend
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Run the React Application**:
    ```bash
    npm start
    ```
   This will start the React development server, and you can view the frontend at `http://localhost:3000`.

4. **React Frontend Code**:
    ```jsx
    import React, { useState } from 'react';
    import './App.css';

    function App() {
        const [query, setQuery] = useState('');
        const [prediction, setPrediction] = useState('');

        const handleSubmit = async () => {
            const response = await fetch('http://localhost:8000/predict/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query }),
            });
            const data = await response.json();
            setPrediction(data.prediction);
        };

        return (
            <div className="App">
                <h1>Jira Query Predictor</h1>
                <input 
                    type="text" 
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)} 
                    placeholder="Enter your query"
                />
                <button onClick={handleSubmit}>Predict</button>
                {prediction && <p>Prediction: {prediction}</p>}
            </div>
        );
    }

    export default App;
    ```

## Colab Notebook
To make it easier to get started, we have provided a Google Colab notebook where you can run the model and see it in action without needing to set up a local environment. [Click here to open the Colab notebook](https://colab.research.google.com/drive/1DU9cZpYkXN9AzJJXt5pxI9VIxbv3Rdke?usp=sharing).
