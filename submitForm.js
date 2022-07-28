let submit = document.getElementById('submit')
console.log(submit)
const formName = 'staffTimesheet'
console.log('form: ' + formName)
let newForm = {}
let submitted = 0
let additional = 0

let staffName = document.querySelector('input#staffName')
staffName.addEventListener('change', (e) => {
	console.log('changed')
	newForm.staffName = e.target.value;
  console.log(newForm.staffName);
})

let caregiverName = document.querySelector('input#caregiverName')
caregiverName.addEventListener('change', (e) => {
	console.log('changed')
	newForm.caregiverName = e.target.value;
  console.log(newForm.caregiverName);
})
  
let supervisorName = document.querySelector('input#supervisorName')
supervisorName.addEventListener('change', (e) => {
	console.log('changed')
	newForm.supervisorName = e.target.value;
  console.log(newForm.supervisorName);
})

let todaysDate = document.querySelector('input#todaysDate')
todaysDate.addEventListener('change', (e) => {
	console.log('changed')
	newForm.date = e.target.value;
  console.log(newForm.date);
})
 
class TimeEntry {
    constructor(date, timeIn, timeOut, ttlHrs, goal) {
        this.date = date;
        this.timeIn = timeIn;
        this.timeOut = timeOut;
        this.ttlHrs = ttlHrs;
        this.goal = goal
    }
}

let timeDetails = []
for (let i = 1; i < 5; i++) {
  timeDetails[i] = new TimeEntry
}

let date1 = document.querySelector('input#date1')
date1.addEventListener('change', (e) => {
  timeDetails[1].date = e.target.value
  console.log(e.target.value)
})

let in1 = document.querySelector('input#in1')
in1.addEventListener('change', (e) => {
  timeDetails[1].timeIn = e.target.value
  console.log(e.target.value)
})

let out1 = document.querySelector('input#out1')
out1.addEventListener('change', (e) => {
  timeDetails[1].timeOut = e.target.value
  console.log(e.target.value)
})

let goal1 = document.querySelector('input#goal1')
goal1.addEventListener('change', (e) => {
  timeDetails[1].goal = e.target.value
  console.log(e.target.value)
})

let ttlHrs1 = document.querySelector('input#ttlHrs1')
ttlHrs1.addEventListener('change', (e) => {
  timeDetails[1].ttlHrs = parseFloat(e.target.value)
  console.log(e.target.value)
})

let date2 = document.querySelector('input#date2')
date2.addEventListener('change', (e) => {
  timeDetails[2].date = e.target.value
  console.log(e.target.value)
})

let in2 = document.querySelector('input#in2')
in2.addEventListener('change', (e) => {
  timeDetails[2].timeIn = e.target.value
  console.log(e.target.value)
})

let out2 = document.querySelector('input#out2')
out2.addEventListener('change', (e) => {
  timeDetails[2].timeOut = e.target.value
  console.log(e.target.value)
})

let goal2 = document.querySelector('input#goal2')
goal2.addEventListener('change', (e) => {
  timeDetails[2].goal = e.target.value
  console.log(e.target.value)
})

let ttlHrs2 = document.querySelector('input#ttlHrs2')
ttlHrs2.addEventListener('change', (e) => {
  timeDetails[2].ttlHrs = parseFloat(e.target.value)
  console.log(e.target.value)
})

let date3 = document.querySelector('input#date3')
date3.addEventListener('change', (e) => {
  timeDetails[3].date = e.target.value
})

let in3 = document.querySelector('input#in3')
in3.addEventListener('change', (e) => {
  timeDetails[3].timeIn = e.target.value
})

let out3 = document.querySelector('input#out3')
out3.addEventListener('change', (e) => {
  timeDetails[3].timeOut = e.target.value
})

let goal3 = document.querySelector('input#goal3')
goal3.addEventListener('change', (e) => {
  timeDetails[3].goal = e.target.value
})

let ttlHrs3 = document.querySelector('input#ttlHrs3')
ttlHrs3.addEventListener('change', (e) => {
  timeDetails[3].ttlHrs = parseFloat(e.target.value)
})

let date4 = document.querySelector('input#date4')
date4.addEventListener('change', (e) => {
  timeDetails[4].date = e.target.value
})

let in4 = document.querySelector('input#in4')
in4.addEventListener('change', (e) => {
  timeDetails[4].timeIn = e.target.value
})

let out4 = document.querySelector('input#out4')
out4.addEventListener('change', (e) => {
  timeDetails[4].timeOut = e.target.value
})

let goal4 = document.querySelector('input#goal4')
goal4.addEventListener('change', (e) => {
  timeDetails[4].goal = e.target.value
})

let ttlHrs4 = document.querySelector('input#ttlHrs4')
ttlHrs4.addEventListener('change', (e) => {
  timeDetails[4].ttlHrs = parseFloat(e.target.value)
})

let totalHrs = document.getElementById('totalHrs')
totalHrs.addEventListener('click', () => {
  let sum = 0
  for (let i = 1; i < 5; i++) {
    typeof(timeDetails[i].ttlHrs) == "number" ? sum = sum + timeDetails[i].ttlHrs : i = 5
  }
  document.getElementById('sumHrs').innerHTML = sum
})

document.getElementById('submit').addEventListener("click", async (event) => {
    newForm.timeDetails = timeDetails
    newForm.staffName = document.querySelector('input#staffName').value;
    newForm.caregiverName = document.querySelector('input#caregiverName').value;
    newForm.supervisorName = document.querySelector('input#supervisorName').value;
    newForm.date = document.querySelector('input#todaysDate').value;
    console.log(newForm)
    submitForm(newForm, formName)
})

async function submitForm(data, form) {
  const document = {
    'form': form,
    'data': data
  }
  console.log(document)
  fetch('https://pffm.azurewebsites.net/form', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin" : "*"
    },
    body: JSON.stringify(document)
  })
    .then((response) => {
      if (response.status != 400 && response.status != 500) {
      showSuccess()
      } else {
        showError(response.status)
      }
    })
    .catch((err) => showError(err))
}


function showSuccess() {
    document.getElementById('returnMessage').innerHTML = 'Form has been successfully submitted'
}

function showError(err) {
    console.error
    document.getElementById('returnMessage').innerHTML = `An error occurred when submitting this form, which was ${err}. Please contact the administrator for help.`
}