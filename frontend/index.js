document.addEventListener("DOMContentLoaded", () => {
    init();
});

const baseURL = "http://localhost:3000/api/v1/";

function init() {
    fetchUsers();
    renderForm();
    attachSubmitListener("get");
}

function fetchUsers() {
    fetch(baseURL + "users")
        .then((res) => res.json())
        .then((data) => {
            renderUsersTweets(data);
        });
}

function renderUsersTweets(users) {
    const div = document.getElementById("tweets");
    div.innerHTML = "";
    users.forEach((user) => {
        div.innerHTML += userTweetsHTML(user);
    });
}
function userTweetsHTML(user) {
    return `
        <div class="user-tweets">
            <h3>Tweets from ${user.username}:</h3>
            <ul>
                ${tweetsHTML(user.tweets)}
            </ul>

        </div>`;
}
function tweetsHTML(tweets) {
    return tweets.map((tweet) => `<li>${tweet.content}</li>`).join("");
}

function renderForm() {
    const container = document.getElementById("form-container");
    container.innerHTML = `
        <h3>New Tweet</h3>
        <form action="#" id="new-tweet-form">
            <label for="content">Content:</label>
            <input type="text" name="content" id="content" />
            <input type="submit" value="Send it" />
        </form>
        `;
}

function attachSubmitListener(methodType) {
    const form = document.getElementById("new-tweet-form");

    if (methodType.toLowerCase() === "get") {
        form.addEventListener("submit", (e) => handleTweetSubmit(e));
    }
}

function handleTweetSubmit(e) {
    e.preventDefault();
    const formData = {
        content: e.target.content.value,
    };
    postTweet(formData);
}

function postTweet(formData) {
    const config = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(formData),
    };
    fetch(baseURL + "tweets", config)
        .then((res) => res.json())
        .then((tweet) => console.log(tweet));
}
