const queueForm = document.getElementById("queueForm");

const queueList = document.getElementById("queueList");

const ticket = document.getElementById("ticket");

const serving = document.getElementById("serving");

const nextButton = document.getElementById("nextButton");

const clearButton = document.getElementById("clearButton");


// Load queue when page opens

loadQueue();


// Add student to queue

queueForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;

    const service = document.getElementById("service").value;


    const response = await fetch("/api/queue", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            name: name,
            service: service
        })

    });


    const data = await response.json();


    if (response.ok) {

        ticket.innerHTML = `
            <div class="ticket">
                Your Queue Number is:
                <br>
                <strong>Q${data.person.number}</strong>
            </div>
        `;

        queueForm.reset();

        loadQueue();

    } else {

        alert(data.message);

    }

});


// Display queue

async function loadQueue() {

    const response = await fetch("/api/queue");

    const queue = await response.json();


    if (queue.length === 0) {

        queueList.innerHTML =
            "<p>No students in queue.</p>";

        return;

    }


    queueList.innerHTML = "";


    queue.forEach(function(person) {

        const div = document.createElement("div");

        div.className = "queue-item";

        div.innerHTML = `
            <div class="queue-number">
                Q${person.number}
            </div>

            <div>
                Name: ${person.name}
            </div>

            <div>
                Service: ${person.service}
            </div>
        `;

        queueList.appendChild(div);

    });

}


// Call next student

nextButton.addEventListener("click", async function() {

    const response = await fetch(
        "/api/queue/next",
        {
            method: "DELETE"
        }
    );


    const data = await response.json();


    if (response.ok) {

        serving.innerHTML = `
            <div class="serving">
                Now Serving:
                Q${data.person.number}
                - ${data.person.name}
            </div>
        `;

        loadQueue();

    } else {

        alert(data.message);

    }

});


// Clear queue

clearButton.addEventListener("click", async function() {

    await fetch("/api/queue", {
        method: "DELETE"
    });


    serving.innerHTML = "";

    ticket.innerHTML = "";

    loadQueue();

});
