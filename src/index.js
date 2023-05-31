
// first check for the defer keyword in the <script>
// you can add defer but comment in your code
//    Core Deliverables
// 1. view image for each ramen in #ramen menu on http:// on load
// 2. click on an image and have its details pupulated in the #ramen-detail
// 3. create a new ramen in #ramen-menu by submitting the form in #new-raman

function displayRamen(ramen) {

    const menu = document.querySelector('#ramen-menu');
    const img = document.createElement('img')
    img.src = ramen.image; 
// look in db.json and each ramen object has a property called image and has the URL
// option 1. you can use dot notation like above, option 2. img.src= ramen["image"]
    img.alt = ramen.name  
    menu.append(img);  // menu is the variable associaed with the querySelector
// we want to listen for click events on each image when clicked, each has its own listener
    img.addEventListener("click", () => { //call "ramen details" noted in HTML
        const imgDetail = document.querySelector('.detail-image')
        imgDetail.src = ramen.image
        imgDetail.alt = ramen.name // get name from the db.json which has names for all the ramens
        document.querySelector('.name').textContent = ramen.name // the (.name) the dot refers to class
        document.querySelector('.restaurant').textContent = ramen.restaurant
        document.querySelector('#rating-display').textContent = ramen.rating // # refers to ID
        document.querySelector('#comment-display').textContent = ramen.comment
    })
}

fetch("http://localhost:3000/ramens")
.then(response=>response.json()) 
// this converts json to javascript
.then(ramens =>   
// the objects are represented by ramens
    ramens.forEach(ramen=> displayRamen(ramen)))

document.querySelector('#new-ramen').addEventListener("submit", event => {
    event.preventDefault() // lets get all the values for the form name, restaurant, image etc
    const newRamenName = event.target.name.value // name is from HTML name="name" its the "name" value
    const newRamenRestaurnt = event.target.restaurant.value
    const newRamenImage = event.target.image.value
    const newRamenRating = event.target.rating.value
    const newRamenComment = event.target['new-comment'].value
    const newRamen = {
        "name": newRamenName,
        "restaurant": newRamenRestaurnt,
        "image": newRamenImage,
        "rating": newRamenRating,
        "comment": newRamenComment
    }
    displayRamen(newRamen)
    fetch("http://localhost:3000/ramens", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(newRamen)
    })
    .then(response=>response.json())
})
    

