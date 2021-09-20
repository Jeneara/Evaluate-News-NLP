function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value;
    const data = {
        formText
    };

    console.log("::: Form Submitted :::")

    if (Client.checkForName(formText)) {
        fetch('http://localhost:8081/userText', {
                method: 'POST',
                cache: "no-cache",
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Body data type must match "Content-Type" header
                body: JSON.stringify(data),
            })
            .then((res) => res.json())
            .then((res) => {
                updateUI(res);
                console.log(res);
            })
    } else {
        alert('Please enter a valid URL link.')
    };
}

// Update UI
const updateUI = async res => {
    try {
        document.getElementById('model').innerHTML = 'Model: ' + res.model;
        document.getElementById('scoreTag').innerHTML = 'Score: ' + res.score_tag;
        document.getElementById('agreement').innerHTML = 'Agreement: ' + res.agreement;
        document.getElementById('subject').innerHTML = 'Subjectivity: ' + res.subjectivity;
        document.getElementById('confidence').innerHTML = 'Confidence: ' + res.confidence;
        document.getElementById('irony').innerHTML = 'Irony: ' + res.irony;
    } catch (error) {
        console.log('error', error);
    }
};

//Export
export {
    handleSubmit
}