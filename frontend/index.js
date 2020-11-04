document.addEventListener("DOMContentLoaded", ()=> {

    const url = 'http://localhost:3000/api/v1/users'
    fetch(url)
        .then(res => res.json())
        .then(data => {
            debugger
        })
})