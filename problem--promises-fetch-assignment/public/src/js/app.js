
var button = document.querySelector('#start-button');
var output = document.querySelector('#output');

button.addEventListener('click', function() {
    promise = new Promise(function(resolve,reject){
      setTimeout(function(){
        resolve("https://swapi.co/api/people/1");
      },3000)
    }).then(function(urlToResolve){
      return fetch(urlToResolve)})
      .then(function(data){
        return data.json();
      }).then(function(jsonData){
        output.textContent=jsonData.name;
      })
    })

/*PUT*/

button.addEventListener('click', function() {
  promise = new Promise(function(resolve,reject){
    setTimeout(function(){
      resolve("https://swapi.co/api/people/1");
    },3000)
  }).then(function(urlToResolve){
    return fetch(urlToResolve)})
    .then(function(data){
      return data.json();
    }).then(function(jsonData){
      output.textContent=jsonData.name;
    })
  })

  /*PUT*/


button.addEventListener('click', function() {
  promise = new Promise(function(resolve,reject){
    setTimeout(function(){
      resolve("https://httpbin.org/put");
    },3000)
  })
  .then(function(urlToResolve){
    return fetch(urlToResolve,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        "accept":"application/json"
      },
      body:JSON.stringify({person: {name: 'Max', age: 28}})
    })})
    .then(function(data){
      return data.json();
    },function(err){
      console.log("error is " ,err);
    })
    .then(function(jsonData){
      var result=jsonData.json.person.name;
      console.log(result);
      output.textContent=result;
    }).catch(function(error){
        console.log("error" + error);
    })
  })

  // Create a new Promise here and use setTimeout inside the function you pass to the constructor

  
  // Handle the Promise "response" (=> the value you resolved) and return a fetch()
  // call to the value (= URL) you resolved (use a GET request)

  // Handle the response of the fetch() call and extract the JSON data, return that
  // and handle it in yet another then() block

  // Finally, output the "name" property of the data you got back (e.g. data.name) inside
  // the "output" element (see variables at top of the file)

  // Repeat the exercise with a PUT request you send to https://httpbin.org/put
  // Make sure to set the appropriate headers (as shown in the lecture)
  // Send any data of your choice, make sure to access it correctly when outputting it
  // Example: If you send {person: {name: 'Max', age: 28}}, you access data.json.person.name
  // to output the name (assuming your parsed JSON is stored in "data")

  // To finish the assignment, add an error to URL and add handle the error both as
  // a second argument to then() as well as via the alternative taught in the module
