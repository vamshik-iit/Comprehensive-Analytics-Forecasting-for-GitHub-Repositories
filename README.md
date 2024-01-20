# Comprehensive-Analytics-Forecasting-for-GitHub-Repositories

Problem Statement:
The goal is to use GitHub to track created and closed issues of a given repository(angular, material-design, angular-cli,D3) for the past year along with timeseries forecasting using Tensorflow/LSTM Keras and we will then see how to deploy it to gcloud platform.

Solution:
We are creating three microservices:
        1. React 
        2. Flask
        3. LSTM/Keras

Features:

Data Extraction: Utilizes Python with the GitHub API to retrieve detailed information from selected GitHub repositories over the past two months.

Microservice Architecture: Implements Docker and Google Cloud-based microservices for scalable and efficient application deployment.

Back-End Development: Employs Python and Flask for a robust and responsive back-end.

Front-End Interface: Features a React and JavaScript-based front-end, providing an intuitive and user-friendly experience.

Dynamic Data Visualization: Includes various types of charts like Line, Bar, and Stack-Bar charts to visualize issues, stars, forks, and other repository metrics.

Predictive Analytics: Uses TensorFlow/Keras LSTM models to forecast repository activities including issue creation and closure patterns, pull requests, commits, and more.


Predictive Forecasting:

Predicts the day of the week with the maximum number of issues created and closed.

Forecasts the month with the highest number of issue closures.

Visualizes future trends in issues, pull requests, commits, branches, contributors, and releases.


![image](https://github.com/vamshikusa/Comprehensive-Analytics-Forecasting-for-GitHub-Repositories/assets/40212124/1da8de8c-7b39-4133-8162-c9dfd79bf91f)


![image](https://github.com/vamshikusa/Comprehensive-Analytics-Forecasting-for-GitHub-Repositories/assets/40212124/97d226b2-fd84-458f-a134-baceab3f4c62)


![image](https://github.com/vamshikusa/Comprehensive-Analytics-Forecasting-for-GitHub-Repositories/assets/40212124/9d117664-fdd5-4cf5-9f94-2662b6d1398a)


