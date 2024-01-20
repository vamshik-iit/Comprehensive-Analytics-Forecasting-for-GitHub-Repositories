 What will Flask do?
       1. Flask will take the repository_name from the body of the api(i.e. from React) and will fetch the created and closed issues 
          for the given repository for past 1 year
       2. Additionally, it will also fetch the author_name and other information for the created and closed issues.
       3. It will use group_by to group the created and closed issues for a given month and will return back the data to client
       4. It will then use the data obtained from the GitHub and pass it as a input request in the POST body to LSTM microservice
          to predict and to forecast the data
       5. The response obtained from LSTM microservice is also return back to client. 

