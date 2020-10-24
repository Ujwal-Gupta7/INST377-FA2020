// You may wish to find an effective randomizer function on MDN.
 
function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }
  return arr;
}

function sortFunction(a, b, key) {
  if (a[key] < b[key]) {
    return -1;
  } if (a[key] > b[key]) {
    return 1;
  }
  return 0;
}

document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray(); // here we're using jQuery to serialize the form
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((fromServer) => {
      if (document.querySelector('.flex-inner')) {
        document.querySelector('.flex-inner').remove();
      }
      const randomList = [];
      for (let i = 0; i < fromServer; i+=1) {
        index = Math.floor(Math.random() * (fromServer.length-1 - 0) + 0);
        randomList.push(fromServer[index]);
      }
      const tenList = [];
      for (let i = 0; i < 10; i +=1) {
        tenList[i] = randomList[i];
      }
      const reverseArray = tenList.sort((a, b) => sortFunction(b, a, 'name'));
      const ul = document.createElement('ul');
      ul.className = 'flex-inner';
      $('form').prepend(ul);
      
      reverseArray.forEach((el, j) => {
        const li = document.createElement('li');
        $(li).append('<input type="checkbox" value =$(el.code) id=$(el.code) />');
        $(li).append('<label for=$(el.code)>$(el.name)</label>');
        $(ul).append(li);
      });
      console.log('fromServer', fromServer);
    })
    .catch((err) => console.log(err));
});