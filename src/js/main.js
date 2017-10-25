if(navigator.serviceWorker) {
  navigator.serviceWorker.register('/sw.js')
  .catch(function(err) {
    console.error('Unable to register service worker.', err);
  });
}

const STORY1_INDEX = 0
const STORY2_INDEX = 1

const jsonize = data => data.json()
const afterLoad = data => {
  renderStories(selectRandom(data.stories))
  document.querySelector('body').style.filter = "none"
  document.querySelector('#refresher').onclick = e => renderStories(selectRandom(data.stories))
}

fetch("https://www.jasonbase.com/things/rZMx.json")
  .then(jsonize)
  .then(afterLoad)

function selectRandom(stories) {
  const storyCount = stories.length
  const startIndex = 0
  let selectedStories = [stories[getRandomInt(startIndex, storyCount)], stories[getRandomInt(startIndex, storyCount)]]

  while (selectedStories[STORY2_INDEX].name === selectedStories[STORY1_INDEX].name) {
    selectedStories = [selectedStories[STORY1_INDEX], stories[getRandomInt(startIndex, storyCount)]]
  }

  return selectedStories
}

function renderStories([story1, story2]) {
  document.querySelector('#story1 > .story__title').innerHTML = story1.name
  document.querySelector('#story2 > .story__title').innerHTML = story2.name
  document.querySelector('#story1').style.backgroundImage = `url(${story1.image})`
  document.querySelector('#story2').style.backgroundImage = `url(${story2.image})`
}

// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}