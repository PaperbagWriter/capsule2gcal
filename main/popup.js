$( document ).ready(function() {
  var google = new OAuth2('google', {
    client_id: '997261788022-qkbhve2ujrci4tnv56b190gg8pa8f0cv.apps.googleusercontent.com',
    client_secret: 'I5tLUL6s2MGVOr7x-1qVSmqb',
    api_scope: 'https://www.googleapis.com/auth/calendar'
  });

  var form = $('#form');
  var success = $('#success');
  var listEvents = [];

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
      'summary': listEvents[0].name,
      'location': 'Pavillon'+listEvents[0].place,
      'description': listEvents[0].name + " " + listEvents[0].teachingMethod + " " + listEvents[0].teacher,
      'start': {
        'dateTime': '2015-05-28T09:00:00-07:00',
        'timeZone': 'America/New York'
      },
      'end': {
        'dateTime': '2015-05-28T17:00:00-07:00',
        'timeZone': 'America/New York'
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
    switch(h2.text())
    {
      case "Sélection d'une session d'études":
      case "Connexion - Utilisateur":
        $('#liencapsule').hide();
        $('#pcapsule').show();
        break;
      default:
      {
        $('#liencapsulecont').hide();
        $('#mainform').show();
        tables = $('table', $(html));        
        //Pair CourseDescription X CourseScheduleAndInfo
        for(i=7; i<=tables.length; i+=2)
        {
          if($(tables.get(i+1)).attr('summary')=="Cette table établit la liste des horaires prévus et des professeurs affectés à ce cours.." && 
              $(tables.get(i)).attr('summary')=="Cette table de disposition sert à présenter les détails de l'horaire des cours")
          {         
            //CourseScheduleAndInfo
            var trs = $('tr',tables.get(i+1));
            for(j=1; j<=trs.length-1; j++)
            {
              course = {
                name:$('caption',tables.get(i)).text(),
                type:null,
                hour:null,
                day:null,
                place:null,
                fromDatetoDate:null,
                teachingMethod:null,
                teacher:null
              };
              var tds = $('td',trs.get(j));
              for(h=0; h<=6;h++)
              {                
                switch(h)
                {
                  case 0:
                    course.type = $(tds.get(h)).text();  
                    break;  
                  case 1:   
                    course.hour = $(tds.get(h)).text();  
                    break;  
                  case 2:
                    course.day = $(tds.get(h)).text();  
                    break;               
                  case 3:
                    if($('abbr ',tds.get(h)).text() == ""){course.place=$(tds.get(h)).text();}else{course.place=$('abbr ',tds.get(h)).text();}  
                    break; 
                  case 4:         
                    course.fromDatetoDate = $(tds.get(h)).text();  
                    break; 
                  case 5:         
                   course.teachingMethod = $(tds.get(h)).text();  
                   break;  
                  case 6:         
                   course.teacher = $(tds.get(h)).text();  
                   break;       
                }
              }    
              listEvents.push(course);                      
            }                                                         
          }                    
        }
        addEvent(listEvents);
      }
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