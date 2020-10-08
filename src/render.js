window.addEventListener("DOMContentLoaded", () => {
    const closeBtn = document.getElementById("close-btn")
    const minBtn = document.getElementById("min-btn")
    const maxBtn = document.getElementById("max-btn")
    const msgDiv = document.getElementById("msg-div")
    const loginForm = document.getElementById('login-form')

    /* Event Listeners */
    //controls _ || X
    closeBtn.addEventListener("click", () => window.closeCurrentWindow())
    minBtn.addEventListener("click", () => window.minimizeWindow())
    maxBtn.addEventListener("click", () => window.maximizeWindow())
    // login
    loginForm.addEventListener("submit", login)

    // Helper functions
    async function postData(url = '', formData = {}) {
        const response = await fetch(url, {
            body: formData,
            method: "post"
        })
        return response
    }


    async function login(e) {
        e.preventDefault() // Dont refresh page

        toggleLoadingBtn() // UX loader
        try {
            //Load data
            var formData = new URLSearchParams()
            formData.append('username', document.getElementById('username').value)
            formData.append('password', document.getElementById('password').value)
            //Send request
            let response = await postData('http://francescogorini.com:9999/login', formData)
            let data = await response.json()

            switch (response.status) {
                case 200: case 201:// Authorized Error
                    showAuth()
                    break
                case 401: case 403:// Unauthorized Error
                    showMessage(data.message)
                    break
                default:// 500 Internal Server Error
                    showMessage('An error occoured. Please try again')
                    break
            }

        } catch (err) { // No Internet or Server down
            console.error(err)
            showMessage("Couldn't reach server. Check your connection and check server status on website.")
        }
        finally {
            toggleLoadingBtn() // UX loader
        }
    }

    function toggleLoadingBtn() { // Shows spinner in button
        document.getElementById('login-btn').classList.toggle("show")
        document.getElementById('loading-btn').classList.toggle("show")
    }

    function showMessage(message) { // Shows error message in msgDiv
        msgDiv.innerHTML = message
        msgDiv.classList.toggle("show-msg")
        setTimeout(() => msgDiv.classList.toggle("show-msg"), 3500)
    }

    function showAuth() {
        console.log('called')
        document.getElementsByClassName('login-page')[0].classList.add("hide")
    }
})