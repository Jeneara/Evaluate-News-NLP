function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value;

    console.log("::: Form Submitted :::")

    if (Client.checkForName(formText)) {
        fetch('http://localhost:8081/userText', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Body data type must match "Content-Type" header
                body: JSON.stringify({ formText }),
            })
            .then(res => {
                console.log(res)
                return res.json()
            })
            // Get Data
            .then(function (res) {
                document.getElementById('model').innerHTML = 'Model: ' + res.model;
                document.getElementById('score_tag').innerHTML = 'Score: ' + res.score_tag;
                document.getElementById('agreement').innerHTML = 'Agreement: ' + res.agreement;
                document.getElementById('subjectivity').innerHTML = 'Subjectivity: ' + res.subjectivity;
                document.getElementById('confidence').innerHTML = 'Confidence: ' + res.confidence;
                document.getElementById('irony').innerHTML = 'Irony: ' + res.irony;
            })
    } else {
        alert('Please enter a valid URL link.')
    };
}

//Export
export {
    handleSubmit
}