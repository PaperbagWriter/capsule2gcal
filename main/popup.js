$( document ).ready(function() {
  var google = new OAuth2('google', {
    client_id: '997261788022-qkbhve2ujrci4tnv56b190gg8pa8f0cv.apps.googleusercontent.com',
    client_secret: 'I5tLUL6s2MGVOr7x-1qVSmqb',
    api_scope: 'https://www.googleapis.com/auth/calendar'
  });

  var form = $('#form');
  var success = $('#success');

  form.on('submit', function(event) {
    event.preventDefault();
    addEvent();
  });

  $('#liencapsule').click(function(){
    chrome.tabs.create({url: $(this).attr('href')});
    return false;
  });

  function addEvent() {
    var EVENT_CREATE_URL = 'https://www.googleapis.com/calendar/v3/calendars/primary/events';
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(event) {
      if (xhr.readyState == 4) {
        if(xhr.status == 200) {
          // Great success: parse response with JSON
          var task = JSON.parse(xhr.responseText);
          document.getElementById('taskid').innerHTML = task.id;
          form.style.display = 'none';
          success.style.display = 'block';

        } else {
        }
      }
    };

    var event = {
      'summary': 'TEST UNI EXTENSION',
      'location': '800 Howard St., San Francisco, CA 94103',
      'description': 'A chance to hear more about Google\'s developer products.',
      'start': {
        'dateTime': '2015-05-28T09:00:00-07:00',
        'timeZone': 'America/Los_Angeles'
      },
      'end': {
        'dateTime': '2015-05-28T17:00:00-07:00',
        'timeZone': 'America/Los_Angeles'
      }
    };
    var message = JSON.stringify(event);

    xhr.open('POST', EVENT_CREATE_URL, true);

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'OAuth ' + google.getAccessToken());

    xhr.send(message);
  }


  function mainTask(html)
  { 
    h2 = $('h2', $(html));
    if(h2.text() == "Sélection d'une session d'études")
    {
    }
    else
    {
      tables = $('table', $(html));
      tables.each(function(){
        var i;
      });
    }  
  }

  google.authorize(function() {
    chrome.tabs.query({active: true,currentWindow: true}, function(tabs) {
        if (tabs.length > 0) {
          if(tabs[0].url == "https://capsuleweb.ulaval.ca/pls/etprod8/bwskfshd.P_CrseSchdDetl")
          {
            chrome.tabs.sendMessage(tabs[0].id, {method: "getDOM"}, function(response) {
                if (chrome.runtime.lastError) {
                    console.log("ERROR: ", chrome.runtime.lastError);
                } else {
                  html = response.htmlContent;
                  mainTask(html);
                }
            });
          }
          else
          {
          }         
        }
    });  
  });

});