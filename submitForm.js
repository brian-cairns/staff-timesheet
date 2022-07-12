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

let date = document.querySelector('input#date')
date.addEventListener('change', (e) => {
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

const getTime = new Promise((res) => {
    let time = []
    for (let i = 1; i < 5; i++) {
        if (document.getElementById(`date${i}`).value = '') {
            i = 5
            return time
        }
        let item = new TimeEntry
        item.date = document.getElementById(`date${i}`).value;
        let timeIn = document.getElementById(`timeIn${i}`).value;
        let am = document.getElementById(`am${i}`).value;
        let timeOut = document.getElementById(`timeOut${i}`).value;
        let pm = document.getElementById(`pm${i}`).value;
        item.timeIn = await get24hr(timeIn, am)
        item.timeOut = await get24hr(timeOut, pm)
        item.ttlHrs = document.getElementById(`ttlHrs${i}`).value
        item.goal = document.getElementById(`goal${i}`).value
        time.push(item)
    }
    res(time)
})

const getTtlHrs = new Promise ((res) => {
    let ttlHrs = 0
    for (let i = 1; i < 5; i++) {
        ttlHrs = ttlHrs + document.getElementById(`ttlHrs${i}`)
    }
    res(ttlHrs)
})

function get24hr(time, part) {
    let timeArray = time.parse(':')
    let hour = parseInt(timeArray[0])
    part == 'PM' ? hour = hour + 12 : hour
    timeArray[0] = hour.toString
    let time24 = `${timeArray[0]}:${timeArray[1]}`
    return time24
}

document.getElementById('submit').addEventListener("click", async (event) => {
    newForm.timeDetails = await getTime
    newForm.ttlHrs = await getTtlHrs
    document.getElementById('sumHrs').innerHTML = getTtlHrs
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
      if (response.status == 200) {
      showSuccess()
      } else {
        showError(response.body)
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