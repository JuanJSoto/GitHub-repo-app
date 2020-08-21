'use strict';

function displayResults(responseJson) {

  console.log(responseJson);
  $('#results-list').empty();
  

  for (let i = 0; i < responseJson.length; i++){
    // for each object in the articles
    //array, add a list item to the results 
    $('#results-list').append(
      `<li><h3><a href="${responseJson[i].html_url}" target=_"blank">${responseJson[i].name}</a></h3>
      <p>${responseJson[i].description}</p>
      <p>By ${responseJson[i].body}</p>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getRepo(searchUser) {
  
  fetch(`https://api.github.com/users/${searchUser}/repos`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchUser = $('#js-search-term').val();
    getRepo(searchUser);
  });
}

$(watchForm);