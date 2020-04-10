window.onload = loadItems;

function loadItems() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `${api}/item`);
  xhr.onload = function() {
    if (xhr.status != 200) {
      console.error(xhr.response);
    } else {
      const response = JSON.parse(xhr.response);
      const items = response['Items'];
      const tbody = document.querySelector("table.table tbody");
      while(tbody.firstChild){ tbody.removeChild( tbody.firstChild ); }
      items.forEach(item => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<th>${item.id}</th><td>${item.name}</td><td>${item.type}</td><td>${item.price}</td>`;
        tbody.append(tr);
      });
    }
  };
  xhr.send();
}