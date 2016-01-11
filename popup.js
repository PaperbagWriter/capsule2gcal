currentTab = null;

var google = new OAuth2('google', {
  client_id: '997261788022-qkbhve2ujrci4tnv56b190gg8pa8f0cv.apps.googleusercontent.com',
  client_secret: 'I5tLUL6s2MGVOr7x-1qVSmqb',
  api_scope: 'https://www.googleapis.com/auth/calendar'
});

google.authorize(function() {  

  var query = { active: true, currentWindow: true };
  function callback(tabs) {
    currentTab = tabs[0];
    var EVENT_CREATE_URL = 'https://www.googleapis.com/calendar/v3/calendars/primary/events';

    var form = document.getElementById('form');
    var success = document.getElementById('success');

    form.addEventListener('submit', function(event) {
      event.preventDefault();
      addEvent();
    });
    $('#liencapsule').click(function(){
      chrome.tabs.create({url: $(this).attr('href')});
      return false;
    });
    if(currentTab.url == "https://capsuleweb.ulaval.ca/pls/etprod8/bwskfshd.P_CrseSchdDetl")
    {
      $("#mainform").fadeIn();
      $("#liencapsulecont").fadeOut();
      chrome.runtime.sendMessage({action: "getDOM"},function (response) {
        console.log(response.dom);
      });
    }
    else
    {
      $("#mainform").fadeOut();
      $("#liencapsulecont").fadeIn();
    }
    function addEvent() {
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

      var event = [{
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
      },{
        'summary': 'TEST UNI EXTENSION2',
        'location': '800 Howard St., San Francisco, CA 94103',
        'description': 'A chance to hear more about Google\'s developer products.',
        'start': {
          'dateTime': '2015-05-29T09:00:00-07:00',
          'timeZone': 'America/Los_Angeles'
        },
        'end': {
          'dateTime': '2015-05-30T17:00:00-07:00',
          'timeZone': 'America/Los_Angeles'
        }
      }];
      var message = JSON.stringify(event);

      xhr.open('POST', EVENT_CREATE_URL, true);

      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('Authorization', 'OAuth ' + google.getAccessToken());

      xhr.send(message);
    }
  }

  chrome.tabs.query(query, callback);
  

});

