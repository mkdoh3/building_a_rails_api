document.addEventListener("DOMContentLoaded", () => {
    const baseURL = "http://localhost:3000/api/v1/";
    fetchUsers();
    renderForm();
    attachSubmitListener("post");

    function fetchUsers() {
        fetch(baseURL + "users")
            .then((res) => res.json())
            .then((data) => {
                renderUserTweets(data);
                attachDeleteHandler();
            });
    }

    function renderUserTweets(users) {
        const div = document.getElementById("tweets");
        div.innerHTML = "";
        users.forEach((user) => (div.innerHTML += userTweetsHTML(user)));
    }

    function userTweetsHTML(user) {
        return `
            <div class="user-tweets">
                <h3>Tweets from ${user.username}</h3>
                <ul data-user-id="${user.id}">
                    ${tweetsHTML(user.tweets)}
                </ul>
            </div>
        `;
    }

    function tweetsHTML(tweets) {
        return tweets
            .map(
                (tweet) => `
            <li>
                <p>${tweet.content}</p>
                <button data-id="${tweet.id}" class="delete">❌</button>
            </li>`
            )
            .join("");
    }

    function renderForm() {
        const container = document.getElementById("form-container");
        container.innerHTML = "";
        container.innerHTML = `
        <form action="" id="new-tweet-form">
            <label for="content">Content:</label>
            <input type="text" name="content" id="">
            <input type="submit" value="Send it!">
        </form>
        `;
    }

    function attachSubmitListener(methodType) {
        const form = document.getElementById("new-tweet-form");
        if (methodType === "post") {
            form.addEventListener("submit", (e) => handleTweetSubmit(e));
        }
    }

    function handleTweetSubmit(event) {
        event.preventDefault();
        const formData = {
            content: event.target.content.value,
        };
        postTweet(formData);
        event.target.reset();
    }

    function postTweet(data) {
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },

            body: JSON.stringify(data),
        };
        fetch(baseURL + "tweets", config)
            .then((res) => res.json())
            .then((data) => {
                const ul = document.querySelector(
                    `[data-user-id="${data.user_id}"]`
                );
                ul.innerHTML += tweetsHTML([data]);
            })
            .catch((err) => console.log(err));
    }

    function attachDeleteHandler() {
        const ul = document.querySelector(`[data-user-id="2"]`);
        ul.addEventListener("click", handleDelete);
    }

    function handleDelete(event) {
        if (event.target.className === "delete") {
            const tweetId = event.target.dataset.id;
            deleteTweet(tweetId);
        }
    }

    function deleteTweet(id) {
        fetch(baseURL + `tweets/${id}`, { method: "delete" })
            .then((res) => res.json())
            .then((data) => removeLi(data.id));
    }

    function removeLi(id) {
        const btn = document.querySelector(`[data-id="${id}"]`);
        btn.parentElement.remove();
    }
});
