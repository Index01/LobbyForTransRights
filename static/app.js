

document.addEventListener('DOMContentLoaded', function () {
    axios.get('/get_states')
        .then(response => {
            const dropdown = document.getElementById('stateDropdown');
            response.data.forEach(state => {
                let option = document.createElement('option');
                option.value = state;
                option.text = state;
                dropdown.appendChild(option);
            });
        });
});

function fetchSenators() {
    const state = document.getElementById('stateDropdown').value;
    if (!state) return;

    axios.post('/get_senators', { state: state })
        .then(response => {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '';

            if (response.data.length === 0) {
                resultsDiv.innerHTML = '<p>No data found.</p>';
                return;
            }

            response.data.forEach(senator => {
                let senatorInfo = '<div><ul>';
                for (let key in senator) {
                    senatorInfo += `<li><strong>${key}:</strong> ${senator[key]}</li>`;
                }
                senatorInfo += '</ul></div><hr>';
                resultsDiv.innerHTML += senatorInfo;
            });
        });
}

