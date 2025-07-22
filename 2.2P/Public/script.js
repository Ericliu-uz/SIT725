function addNumbers() {
    const num1 = document.getElementById('num1').value;
    const num2 = document.getElementById('num2').value;
    const resultElement = document.getElementById('result');

    if (num1 === '' || num2 === '') {
        resultElement.textContent = 'Both numbers are required!';
        return;
    }
   
    fetch(`/add?num1=${num1}&num2=${num2}`)
        .then(response => response.json())
        .then(data => {
            resultElement.textContent = data.result;
        })
        .catch(error => {
            console.error('Error:', error);
            resultElement.textContent = 'An error occurred.';
        });
}
