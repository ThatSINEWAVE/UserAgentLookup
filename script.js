document.getElementById('checkMyUserAgent').addEventListener('click', function() {
    fadeOutMain();
    setTimeout(() => {
        fetchUserAgent(navigator.userAgent);
    }, 600);
});

document.getElementById('checkAnotherUserAgent').addEventListener('click', function() {
    fadeOutMain();
    setTimeout(() => {
        document.getElementById('inputSection').style.display = 'block';
        fadeIn(document.getElementById('inputSection'));
        document.getElementById('goBack').style.display = 'block';
        fadeIn(document.getElementById('goBack'));
    }, 600);
});

document.getElementById('lookupButton').addEventListener('click', function() {
    const userAgent = document.getElementById('userAgentInput').value;
    fetchUserAgent(userAgent);
});

document.getElementById('goBack').addEventListener('click', function() {
    fadeOut(document.getElementById('resultSection'));
    fadeOut(document.getElementById('inputSection'));
    fadeOut(document.getElementById('goBack'));
    setTimeout(() => {
        document.getElementById('description').style.display = 'block';
        document.getElementById('checkMyUserAgent').style.display = 'block';
        document.getElementById('checkAnotherUserAgent').style.display = 'block';
        fadeIn(document.getElementById('description'));
        fadeIn(document.getElementById('checkMyUserAgent'));
        fadeIn(document.getElementById('checkAnotherUserAgent'));
    }, 600);
});

function fetchUserAgent(userAgent) {
    const apiUrl = `https://api.apicagent.com/?ua=${encodeURIComponent(userAgent)}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayResult(data);
        });
}

function displayResult(data) {
    const resultSection = document.getElementById('resultSection');
    resultSection.innerHTML = `
        <p><strong>Browser Family:</strong> ${data.browser_family}</p>
        <p><strong>Client Name:</strong> ${data.client.name}</p>
        <p><strong>Client Version:</strong> ${data.client.version}</p>
        <p><strong>Device Brand:</strong> ${data.device.brand}</p>
        <p><strong>Device Type:</strong> ${data.device.type}</p>
        <p><strong>OS Name:</strong> ${data.os.name}</p>
        <p><strong>OS Version:</strong> ${data.os.version}</p>
        <p><strong>User Agent:</strong> ${data.user_agent}</p>
    `;
    fadeOut(document.getElementById('inputSection'));
    fadeIn(resultSection);
    document.getElementById('goBack').style.display = 'block';
    fadeIn(document.getElementById('goBack'));
}

function fadeOutMain() {
    fadeOut(document.getElementById('description'));
    fadeOut(document.getElementById('checkMyUserAgent'));
    fadeOut(document.getElementById('checkAnotherUserAgent'));
}

function fadeIn(element) {
    element.style.display = 'block';
    element.style.opacity = 0;
    let op = 0;
    let timer = setInterval(function() {
        if (op >= 1) {
            clearInterval(timer);
        }
        element.style.opacity = op;
        op += 0.1;
    }, 50);
}

function fadeOut(element) {
    let op = 1;
    let timer = setInterval(function() {
        if (op <= 0) {
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        op -= 0.1;
    }, 50);
}
