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


## Colab Notebook
To make it easier to get started, we have provided a Google Colab notebook where you can run the model and see it in action without needing to set up a local environment. [Click here to open the Colab notebook](https://colab.research.google.com/drive/1DU9cZpYkXN9AzJJXt5pxI9VIxbv3Rdke?usp=sharing).
