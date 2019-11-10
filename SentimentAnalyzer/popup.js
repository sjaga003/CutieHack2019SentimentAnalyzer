var app = angular.module("app", []);

        var bad = 0;
        var meh = 0;
        var good = 0;

app.controller("popupController", ['$scope', '$http', function($scope, $http){
		$scope.percent = "";
		$scope.selectedText = "";
    var selectedText = "";
		

		var background = chrome.extension.getBackgroundPage();
   		selectedText = background.selectedText;
   		if(selectedText == "") {
   			$scope.selectedText = "Highlight text to see sentiment";
        return;
   		}
   		$scope.selectedText = selectedText;
		$http({
          url: 'https://language.googleapis.com/v1/documents:analyzeSentiment?key=AIzaSyA-YMkmJVSpfBtjFooIQ_ZT8RKCWvloFhI',
          method: "POST",
          data: {
            "encodingType": "UTF8",
            "document": {
              "type": "PLAIN_TEXT",
              "content": selectedText
            }
          }
      })
      .then(function(response) {
        // success
       // $scope.selectedText = $scope.selectedText + ("\nSUCCESS\n");
        //$scope.selectedText = $scope.selectedText + ("response: " + JSON.stringify(response));
        $scope.score = response.data.documentSentiment.score;
        for(var i = 0; i < Object.keys(response.data.sentences).length; i++) {
	        var score = response.data.sentences[i].sentiment.score;
	        if(score >= -1 && score <= -0.25) {
	        	bad = bad + 1;
	        }
	        else if(score >= -0.26 && score <= 0.25){
	        	meh = meh + 1;
	        }
	        else if(score >= 0.26 && score <= 1){
	        	good = good + 1;
	        }
    	}	

      },
      function(response) {
        // failed
        alert("FAILURE");
      });
setTimeout(function() {
      
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Negative', 'Neutral', 'Positive'],
        datasets: [{
            label: '# of Sentiments',
            data: [bad, meh, good],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(100, 170, 103, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(100, 170, 103, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        legend: {
          display: false
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    callback: function(value) {if (value % 1 === 0) {return value;}}
                }
            }]
        }
    }
});

 }, Math.random() * 1000);
  }


]);

