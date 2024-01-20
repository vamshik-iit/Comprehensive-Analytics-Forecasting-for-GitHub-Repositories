/*
Goal of React:
  1. React will retrieve GitHub created and closed issues for a given repository and will display the bar-charts 
     of same using high-charts        
  2. It will also display the images of the forecasted data for the given GitHub repository and images are being retrieved from 
     Google Cloud storage
  3. React will make a fetch api call to flask microservice.
*/

// Import required libraries
import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
// Import custom components
import BarCharts from "./BarCharts";
import Loader from "./Loader";
import StarBarCharts from "./StarBarCharts";
import ForkBarCharts from "./ForkBarCharts";
import LineCharts from "./LineCharts";
import StackBar from "./StackBar";

import { ListItemButton } from "@mui/material";

const drawerWidth = 240;
// List of GitHub repositories 
const repositories = [
  {
    key: "angular/angular-cli",
    value: "Angular-cli",
  },
  {
    key: "angular/material",
    value: "Angular Material",
  },
  {
    key: "SebastianM/angular-google-maps",
    value: "Angular Google Maps",
  },
  {
    key: "d3/d3",
    value: "D3",
  },
  {
    key: "pallets/flask",
    value: "Flask",
  },
  {
    key: "golang/go",
    value: "Go",
  },
  {
    key: "google/go-github",
    value: "Go Github",
  },
  {
    key: "keras-team/keras",
    value: "Keras",
  },
  {
    key: "milvus-io/pymilvus/",
    value: "Milvus-io Pymilvus",
  },
  {
    key: "openai/openai-cookbook",
    value: "Openai Cookbook",
  },
  {
    key: "openai/openai-quickstart-python",
    value: "Openai Quickstart Python",
  },  
  {
    key: "facebook/react",
    value: "React",
  },
  {
    key: "SeleniumHQ/selenium",
    value: "Selenium",
  },
  {
    key: "tensorflow/tensorflow",
    value: "Tensorflow",
  },



  {
    key: "X openai/openai-cookbook openai/openai-python openai/openai-quickstart-python milvus-io/pymilvus SeleniumHQ/selenium golang/go google/go-github angular/material angular/angular-cli SebastianM/angular-google-maps d3/d3 facebook/react tensorflow/tensorflow keras-team/keras pallets/flask",
    value: "Number of stars",
  },
  {
    key: "Y openai/openai-cookbook openai/openai-python openai/openai-quickstart-python milvus-io/pymilvus SeleniumHQ/selenium golang/go google/go-github angular/material angular/angular-cli SebastianM/angular-google-maps d3/d3 facebook/react tensorflow/tensorflow keras-team/keras pallets/flask",
    value: "Number of forks",
  },
 /* {
    key: "Z openai/openai-cookbook openai/openai-python openai/openai-quickstart-python milvus-io/pymilvus SeleniumHQ/selenium golang/go google/go-github angular/material angular/angular-cli SebastianM/angular-google-maps d3/d3 facebook/react tensorflow/tensorflow keras-team/keras pallets/flask",
    value: "Number of issues Line chart",
  },*/
];

export default function Home() {
  /*
  The useState is a react hook which is special function that takes the initial 
  state as an argument and returns an array of two entries. 
  */
  /*
  setLoading is a function that sets loading to true when we trigger flask microservice
  If loading is true, we render a loader else render the Bar charts
  */
  const [loading, setLoading] = useState(true);
  /* 
  setRepository is a function that will update the user's selected repository such as Angular,
  Angular-cli, Material Design, and D3
  The repository "key" will be sent to flask microservice in a request body
  */
  const [repository, setRepository] = useState({
    key: "angular/angular-cli",
    value: "Angular-cli",
  });
  /*
  
  The first element is the initial state (i.e. githubRepoData) and the second one is a function 
  (i.e. setGithubData) which is used for updating the state.

  so, setGitHub data is a function that takes the response from the flask microservice 
  and updates the value of gitHubrepo data.
  */
  const [githubRepoData, setGithubData] = useState([]);
  // Updates the repository to newly selected repository
  const eventHandler = (repo) => {
    setRepository(repo);
  };


  //setting conditions for stars and forks as false by default, 
  const [isStars, setIsStars] = useState('false');
  const [isForks, setIsForks] = useState('false');
  //const [isIssueLine, setIsIssueLine] = useState('false');
  const [flag, setFlag] = useState('true');

  /* 
  Fetch the data from flask microservice on Component load and on update of new repository.
  Everytime there is a change in a repository, useEffect will get triggered, useEffect inturn will trigger 
  the flask microservice 
  */
  React.useEffect(() => {
    // set loading to true to display loader
    setLoading(true);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Append the repository key to request body
      body: JSON.stringify({ repository: repository.key }),
    };

    /*
    Fetching the GitHub details from flask microservice
    The route "/api/github" is served by Flask/App.py in the line 53
    @app.route('/api/github', methods=['POST'])
    Which is routed by setupProxy.js to the
    microservice target: "your_flask_gcloud_url"
    */
    fetch("/api/github", requestOptions)
      .then((res) => res.json())
      .then(
        // On successful response from flask microservice
        (result) => {
          // On success set loading to false to display the contents of the resonse
          setLoading(false);
          // Set state on successfull response from the API
          //setGithubData(result);
          if(result.stars!==undefined && result.forks==undefined ){
            setIsStars(true);
            setIsForks(false);
            //setIsIssueLine(false);
            setFlag(false);
            setGithubData(result)
            console.log("Instars-stars: ",isStars)
            console.log("Instars-forks: ",isForks)
            //console.log("Infork-issues: ",isIssueLine)
          }
          else if(result.forks!==undefined && result.stars==undefined ){
            setIsForks(true);
            setIsStars(false);
            //setIsIssueLine(false);
            setFlag(false);
            setGithubData(result)
            console.log("Infork-stars: ",isStars)
            console.log("Infork-forks: ",isForks)
           // console.log("Infork-issues: ",isIssueLine)
          }
          /*else if(result.issuesCnt!==undefined && result.stars==undefined && result.forks==undefined){
            setIsIssueLine(true);
            setIsForks(false);
            setIsStars(false);
            setFlag(false);
            setGithubData(result)
            console.log("Inline-stars: ",isStars)
            console.log("Inline-forks: ",isForks)
            //console.log("Inline-issues: ",isIssueLine)
          }*/
          else
          {
            setFlag(true);
            setIsStars(false);
            setIsForks(false);
            //setIsIssueLine(false);
            setGithubData(result);
            console.log("chek")
          }
        },
        // On failure from flask microservice
        (error) => {
          // Set state on failure response from the API
          console.log(error);
          // On failure set loading to false to display the error message
          setLoading(false);
          setGithubData([]);
        }
      );
  }, [repository]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Application Header */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Assignment 5 - Time Series Forecasting
          </Typography>
        </Toolbar>
      </AppBar>
      {/* Left drawer of the application */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {/* Iterate through the repositories list */}
            {repositories.map((repo) => (
              <ListItem
                button
                key={repo.key}
                onClick={() => eventHandler(repo)}
                disabled={loading && repo.value !== repository.value}
              >
                <ListItemButton selected={repo.value === repository.value}>
                  <ListItemText primary={repo.value} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {/* Render loader component if loading is true else render charts and images */}
        {loading ? (
          <Loader />
        ) : (
          <div>
            {/* Render barchart component for a monthly created issues for a selected repositories*/}
            {flag && <BarCharts
              title={`Monthly Created Issues for ${repository.value} in last 2 months i.e past 60 days`}
              data={githubRepoData?.created}
            />
            }
            {/* Render linechart component for weekly created issues for a selected repositories*/}
            {flag && <LineCharts
              title={`Issues of ${repository.value} in last 2 months  i.e past 60 days`}
              data={githubRepoData?.created_weekly}
            />}
            {/* Render barchart component for a monthly created issues for a selected repositories*/}
            {flag && <BarCharts
              title={`Weekly Closed Issues for ${repository.value} in last 2 months i.e past 60 days`}
              data={githubRepoData?.created_weekly}
            />
            }
            {/* Render stackbar component for created and closed issues*/}
            {flag && <StackBar
              title={`Created and Closed Issues of ${repository.value} in last 2 months i.e past 60 days`}
              data={githubRepoData?.created}
              data2={githubRepoData?.closed}
            />}
            
            {isStars && <StarBarCharts
              title={`Number of stars for each repository`}
              data={githubRepoData?.stars}
              
            />}
            {isForks && <ForkBarCharts
              title={`Number of forks for each repository`}
              data={githubRepoData?.forks}
              
            />}
            {/*isIssueLine && <LineCharts
              title={`Number of issues for each repository`}
              data={githubRepoData?.issuesCnt}
              
            />*/}

            <Divider
              sx={{ borderBlockWidth: "3px", borderBlockColor: "#9e6262" }}
            />


        {flag && (<div> 
          <div>
            <Typography variant="h5" component="div" gutterBottom>
              The day of the week maximum number of issues created
              </Typography>
              <div>
                
                <img
                  src={githubRepoData?.createdAtImageUrls?.day_max_issue_created}
                  alt={"The day of the week maximum number of issues created"}
                  loading={"lazy"}
                />
              </div>
            </div>
            <div>
            <Typography variant="h5" component="div" gutterBottom>
              The day of the week maximum number of issues Closed
              </Typography>
              <div>
                
                <img
                  src={githubRepoData?.createdAtImageUrls?.day_max_issue_closed}
                  alt={"The day of the week maximum number of issues Closed"}
                  loading={"lazy"}
                />
              </div>
            </div>

            <div>
            <Typography variant="h5" component="div" gutterBottom>
            The month of the year that has maximum number of issues closed
              </Typography>
              <div>
                
                <img
                  src={githubRepoData?.createdAtImageUrls?.month_max_issues_closed}
                  alt={"The month of the year that has maximum number of issues closed"}
                  loading={"lazy"}
                />
              </div>
            </div>
            </div> )}

            {/* Rendering Timeseries Forecasting of Created Issues using Tensorflow and
                Keras LSTM */}
            {flag && (<div>
            <div>
              <Typography variant="h5" component="div" gutterBottom>
                Timeseries Forecasting of Created Issues using Tensorflow and
                Keras LSTM based on past month
              </Typography>

              <div>
                <Typography component="h4">
                  Model Loss for Created Issues
                </Typography>
                {/* Render the model loss image for created issues */}
                <img
                  src={githubRepoData?.createdAtImageUrls?.model_loss_image_url}
                  alt={"Model Loss for Created Issues"}
                  loading={"lazy"}
                />
              </div>
              <div>
                <Typography component="h4">
                  LSTM Generated Data for Created Issues
                </Typography>
                {/* Render the LSTM generated image for created issues*/}
                <img
                  src={
                    githubRepoData?.createdAtImageUrls?.lstm_generated_image_url
                  }
                  alt={"LSTM Generated Data for Created Issues"}
                  loading={"lazy"}
                />
              </div>
              <div>
                <Typography component="h4">
                  All Issues Data for Created Issues
                </Typography>
                {/* Render the all issues data image for created issues*/}
                <img
                  src={
                    githubRepoData?.createdAtImageUrls?.all_issues_data_image
                  }
                  alt={"All Issues Data for Created Issues"}
                  loading={"lazy"}
                />
              </div>
            </div>
            </div>)}




            {/* Rendering Timeseries Forecasting of Closed Issues using Tensorflow and
                Keras LSTM  */}
            {flag && (<div>
            <div>
              <Divider
                sx={{ borderBlockWidth: "3px", borderBlockColor: "#9e6262" }}
              />
              <Typography variant="h5" component="div" gutterBottom>
                Timeseries Forecasting of Closed Issues using Tensorflow and
                Keras LSTM based on past month
              </Typography>

              <div>
                <Typography component="h4">
                  Model Loss for Closed Issues
                </Typography>
                {/* Render the model loss image for closed issues  */}
                <img
                  src={githubRepoData?.closedAtImageUrls?.model_loss_image_url}
                  alt={"Model Loss for Closed Issues"}
                  loading={"lazy"}
                />
              </div>
              <div>
                <Typography component="h4">
                  LSTM Generated Data for Closed Issues
                </Typography>
                {/* Render the LSTM generated image for closed issues */}
                <img
                  src={
                    githubRepoData?.closedAtImageUrls?.lstm_generated_image_url
                  }
                  alt={"LSTM Generated Data for Closed Issues"}
                  loading={"lazy"}
                />
              </div>
              <div>
                <Typography component="h4">
                  All Issues Data for Closed Issues
                </Typography>
                {/* Render the all issues data image for closed issues*/}
                <img
                  src={githubRepoData?.closedAtImageUrls?.all_issues_data_image}
                  alt={"All Issues Data for Closed Issues"}
                  loading={"lazy"}
                />
              </div>
            </div> 
            </div>)}



            
            {/* Rendering Timeseries Forecasting of Pull Requests using Tensorflow and
                Keras LSTM  */}
            {flag && (<div>
              <Divider
                sx={{ borderBlockWidth: "3px", borderBlockColor: "#9e6262" }}
              />
              <Typography variant="h5" component="div" gutterBottom>
                Timeseries Forecasting of Pull Requests using Tensorflow and
                Keras LSTM based on past month
              </Typography>

              <div>
                <Typography component="h4">
                  Model Loss for Pull Requests
                </Typography>
                {/* Render the model loss image Pull Requests  */}
                <img
                  src={githubRepoData?.pullReqImageUrls?.model_loss_image_url}
                  alt={"Model Loss for Pull Requests"}
                  loading={"lazy"}
                />
              </div>
              <div>
                <Typography component="h4">
                  LSTM Generated Data for Pull Requests
                </Typography>
                {/* Render the LSTM generated image Pull Requests */}
                <img
                  src={
                    githubRepoData?.pullReqImageUrls?.lstm_generated_image_url
                  }
                  alt={"LSTM Generated Data for Pull Requests"}
                  loading={"lazy"}
                />
              </div>
              <div>
                <Typography component="h4">
                  All Issues Data for Pull Requests
                </Typography>
                {/* Render the all issues data image for Pull Requests*/}
                <img
                  src={githubRepoData?.pullReqImageUrls?.all_issues_data_image}
                  alt={"All Issues Data for Pull Requests"}
                  loading={"lazy"}
                />
              </div>
            </div>)}





            {/* Rendering Timeseries Forecasting of Commits using Tensorflow and
                Keras LSTM  */}
            {flag && (<div>
              <Divider
                sx={{ borderBlockWidth: "3px", borderBlockColor: "#9e6262" }}
              />
              <Typography variant="h5" component="div" gutterBottom>
                Timeseries Forecasting of Commits using Tensorflow and
                Keras LSTM based on past month
              </Typography>

              <div>
                <Typography component="h4">
                  Model Loss for Commits
                </Typography>
                {/* Render the model loss image Commits  */}
                <img
                  src={githubRepoData?.commitsImageUrls?.model_loss_image_url}
                  alt={"Model Loss for Commits"}
                  loading={"lazy"}
                />
              </div>
              <div>
                <Typography component="h4">
                  LSTM Generated Data for Commits
                </Typography>
                {/* Render the LSTM generated image Commits */}
                <img
                  src={
                    githubRepoData?.commitsImageUrls?.lstm_generated_image_url
                  }
                  alt={"LSTM Generated Data for Commits"}
                  loading={"lazy"}
                />
              </div>
              <div>
                <Typography component="h4">
                  All Issues Data for Commits
                </Typography>
                {/* Render the all issues data image for Commits*/}
                <img
                  src={githubRepoData?.commitsImageUrls?.all_issues_data_image}
                  alt={"All Issues Data for Commits"}
                  loading={"lazy"}
                />
              </div>
            </div>)}






          </div>
        )}
      </Box>
    </Box>
  );
}
