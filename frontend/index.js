async function sprintChallenge5() { // Note the async keyword so you can use `await` inside sprintChallenge5
  // 👇 WORK ONLY BELOW THIS LINE 👇
  // 👇 WORK ONLY BELOW THIS LINE 👇
  // 👇 WORK ONLY BELOW THIS LINE 👇

  // 👇 ==================== TASK 1 START ==================== 👇

  // 🧠 Use Axios to GET learners and mentors.
  // ❗ Use the variables `mentors` and `learners` to store the data.
  // ❗ Use the await keyword when using axios.

  let mentors = [] // fix this
  let learners = [] // fix this

  async function getData(url) {
    try {
      let response = await axios.get(url)
      let people = response.data
      return people
    } catch (err) {
      console.log('Not working')
    }
  }

    let mentorsURL = 'http://localhost:3003/api/mentors'
    let learnersURL = 'http://localhost:3003/api/learners'

    mentors = await getData(mentorsURL)
    learners = await getData(learnersURL)


    let mentorsContainer = document.querySelector('#mentors')
    let learnersContainer = document.querySelector('#learners')

    //getData(mentors)
    //getData(learners)
  
  

  // 👆 ==================== TASK 1 END ====================== 👆

  // 👇 ==================== TASK 2 START ==================== 👇

  // 🧠 Combine learners and mentors.
  // ❗ At this point the learner objects only have the mentors' IDs.
  // ❗ Fix the `learners` array so that each learner ends up with this exact structure:
  // {
  //   id: 6,
  //   fullName: "Bob Johnson",
  //   email: "bob.johnson@example.com",
  //   mentors: [
  //     "Bill Gates",
  //     "Grace Hopper"
  //   ]`
  // }
    learners = learners.map(learner => {
      if (learner.mentors) {
      learner.mentors = learner.mentors.map(mentorID => {
        let mentorData = mentors.find(mentorData => mentorData.id === mentorID)
        
        console.log(mentorID)
        console.log(mentorData)
        
        return mentorData ? `${mentorData.firstName} ${mentorData.lastName}` : mentorID
      })
      } else {
        console.log('mentors is undefined for learners')
      }
      return learner
    })
    

  // 👆 ==================== TASK 2 END ====================== 👆

  const cardsContainer = document.querySelector('.cards')
  const info = document.querySelector('.info')
  info.textContent = 'No learner is selected'


  // 👇 ==================== TASK 3 START ==================== 👇

  for (let learner of learners) { // looping over each learner object

    // 🧠 Flesh out the elements that describe each learner
    // ❗ Give the elements below their (initial) classes, textContent and proper nesting.
    // ❗ Do not change the variable names, as the code that follows depends on those names.
    // ❗ Also, loop over the mentors inside the learner object, creating an <li> element for each mentor.
    // ❗ Fill each <li> with a mentor name, and append it to the <ul> mentorList.
    // ❗ Inspect the mock site closely to understand what the initial texts and classes look like!

    const card = document.createElement('div')
    card.classList.add('card')

    const heading = document.createElement('h3')
    heading.textContent = learner.fullName
    card.appendChild(heading)
    
    const email = document.createElement('div')
    email.classList.add('email')
    email.textContent = learner.email
    card.appendChild(email)

    const mentorsHeading = document.createElement('h4')
    mentorsHeading.classList.add('closed')
    mentorsHeading.textContent = 'Mentors'
    card.appendChild(mentorsHeading)

    const mentorsList = document.createElement('ul')
    learner.mentors.forEach(mentorName => {
      const mentorItem = document.createElement('li')
      mentorItem.textContent = mentorName
      mentorsList.appendChild(mentorItem)
    })

    
    
    

    // 👆 ==================== TASK 3 END ====================== 👆

    // 👆 WORK ONLY ABOVE THIS LINE 👆
    // 👆 WORK ONLY ABOVE THIS LINE 👆
    // 👆 WORK ONLY ABOVE THIS LINE 👆
    card.appendChild(mentorsList)
    card.dataset.fullName = learner.fullName
    cardsContainer.appendChild(card)

    card.addEventListener('click', evt => {
      const mentorsHeading = card.querySelector('h4')
      // critical booleans
      const didClickTheMentors = evt.target === mentorsHeading
      const isCardSelected = card.classList.contains('selected')
      // do a reset of all learner names, selected statuses, info message
      if (!didClickTheMentors) {
      document.querySelectorAll('.card').forEach(crd => {
        crd.classList.remove('selected')
        crd.querySelector('h3').textContent = crd.dataset.fullName
      })
      info.textContent = 'No learner is selected'
    }
      // conditional logic
      if (!didClickTheMentors) {
        // easy case, no mentor involvement
        if (!isCardSelected) {
          // selecting the card:
          card.classList.add('selected')
          heading.textContent += `, ID ${learner.id}`
          info.textContent = `The selected learner is ${learner.fullName}`
        }
      } else {
        // clicked on mentors, we toggle and select no matter what
        card.classList.add('selected')
        if (mentorsHeading.classList.contains('open')) {
          mentorsHeading.classList.replace('open', 'closed')
        } else {
          mentorsHeading.classList.replace('closed', 'open')
        }
        if (!isCardSelected) {
          // if card was not selected adjust texts
          heading.textContent += `, ID ${learner.id}`
          info.textContent = `The selected learner is ${learner.fullName}`
        }
      }
    })
  }

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`
}

// ❗ DO NOT CHANGE THIS CODE. WORK ONLY INSIDE TASKS 1, 2, 3
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
