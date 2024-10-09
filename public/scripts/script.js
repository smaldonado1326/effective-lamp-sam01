$(document).ready(function() {
    // Function to convert text to NATO phonetic alphabet
    function convertToNatoPhonetic(text) {
        var natoPhonetic = {
            'A': 'Alpha', 'B': 'Bravo', 'C': 'Charlie', 'D': 'Delta', 'E': 'Echo',
            'F': 'Foxtrot', 'G': 'Golf', 'H': 'Hotel', 'I': 'India', 'J': 'Juliett',
            'K': 'Kilo', 'L': 'Lima', 'M': 'Mike', 'N': 'November', 'O': 'Oscar',
            'P': 'Papa', 'Q': 'Quebec', 'R': 'Romeo', 'S': 'Sierra', 'T': 'Tango',
            'U': 'Uniform', 'V': 'Victor', 'W': 'Whiskey', 'X': 'X-ray', 'Y': 'Yankee', 'Z': 'Zulu'
        };
        var phoneticText = '';
        for (var i = 0; i < text.length; i++) {
            var char = text.charAt(i).toUpperCase();
            phoneticText += natoPhonetic[char] || char;
            phoneticText += ' ';
        }
        return phoneticText.trim();
    }

    // Event listener for convert button
    $('#convertBtn').click(function() {
        var inputText = $('#textInput').val().trim();
        if (inputText !== '') {
            var outputText = convertToNatoPhonetic(inputText);

            // Place the output in the hidden input field for submission
            $('#convertedText').val(outputText);

            // Submit the form to save the result as a new post in MongoDB
            $('#conversionForm').submit();
        }
    });

    // Clear button functionality
    $('#clearBtn').click(function() {
        $('#textInput').val('');
    });
});
