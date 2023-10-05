// Function to display the selected file name
function displayFileName() {
    const fileInput = document.getElementById('fileInput');
    const fileNameDisplay = document.getElementById('fileNameDisplay');

    if (fileInput.files.length > 0) {
        const fileName = fileInput.files[0].name;
        fileNameDisplay.textContent = `Selected File: ${fileName}`;
    } else {
        fileNameDisplay.textContent = '';
    }
}
