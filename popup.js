document.addEventListener(chrome.history.onVisited, restaurantDetail());

async function restaurantDetail() {
  chrome.action.setIcon({
    path: "gray-restaurant.png",
  });
  let usCities = await (await fetch("/uscities.json")).json();
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    var item = tabs[0];
    usCities.map((obj) => {
      if (
        obj.website != null &&
        item.url.trim().toLowerCase() == obj.website.trim().toLowerCase()
      ) {
        chrome.action.setIcon({
          path: "restaurant.png",
        });
        var html =
          `<section><h2 class="restaurant-name">` +
          obj.restaurant +
          `</h2><p class="address">` +
          obj.address +
          `</p>` +
          obj.iframe +
          `</section>`;
        document.getElementById("showDetail").innerHTML = html;
      }
    });
    if (
      item.title.toLowerCase().includes("restaurant".toLowerCase()) ||
      item.title.toLowerCase().includes("restaurants".toLowerCase())
    ) {
      if (usCities.length > 0) {
        usCities.map((obj) => {
          var data = obj.address.split(",");
          data.forEach((element) => {
            if (
              item.title.toLowerCase().includes(element.trim().toLowerCase()) ||
              item.title
                .toLowerCase()
                .includes(obj.restaurant.trim().toLowerCase())
            ) {
              chrome.action.setIcon({
                path: "restaurant.png",
              });
              var html =
                `<section><h2 class="restaurant-name">` +
                obj.restaurant +
                `</h2><p class="address">` +
                obj.address +
                `</p>` +
                obj.iframe +
                `</section>`;
              document.getElementById("showDetail").innerHTML = html;
            }
          });
        });
      }
    }
  });
}
