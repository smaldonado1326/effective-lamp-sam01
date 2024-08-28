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
        // Convert each character to its NATO phonetic equivalent
        var phoneticText = '';
        for (var i = 0; i < text.length; i++) {
            var char = text.charAt(i).toUpperCase();
            if (natoPhonetic[char]) {
                phoneticText += natoPhonetic[char] + ' ';
            } else {
                phoneticText += char + ' '; 
            }
        }
        return phoneticText.trim(); 
    }

    // Function to convert text to kebab-case
    function convertToKebabCase(text) {
        return text.toLowerCase().replace(/\s+/g, '-');
    }

    // Event listener for convert button
    $('#convertBtn').click(function() {
        var inputText = $('#textInput').val().trim();
        if (inputText !== '') {
            var outputText;
            var outputType = $('input[name=outputType]:checked').val();
            switch (outputType) {
                case 'kebab':
                    outputText = convertToKebabCase(inputText);
                    break;
                default:
                    outputText = convertToNatoPhonetic(inputText);
            }
            $('#outputList').append('<li class="list-group-item">' + outputText + '</li>');
        }
    });

    // Event listener for clear button
    $('#clearBtn').click(function() {
        $('#textInput').val('');
        $('#outputList').empty();
    });

    // Hamburger menu toggle for smaller screens
    $('.navbar-toggler').click(function() {
        $('.navbar-collapse').toggleClass('show');
    });

    // Event listener for text input
    $('#textInput').on('input', function() {
        if ($(this).val().trim() !== '') {
            $('#goCrazy').slideDown();
        } else {
            $('#goCrazy').slideUp();
        }
    });
});
