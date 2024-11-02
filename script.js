// Variabel untuk menyimpan ekspresi
let display = document.querySelector('.display');
let currentExpression = '';
let openBrackets = 0; // Untuk menghitung jumlah kurung buka

// Fungsi untuk memperbarui tampilan
function updateDisplay(value) {
    display.value = value;
}

// Fungsi untuk menangani input tombol
function handleButtonClick(event) {
    let buttonValue = event.target.getAttribute('data-value');

    // Jika tombol AC ditekan, reset semua
    if (buttonValue === 'AC') {
        currentExpression = '';
        openBrackets = 0;
        updateDisplay('');
    }
    // Jika tombol DEL ditekan, hapus karakter terakhir
    else if (buttonValue === 'DEL') {
        currentExpression = currentExpression.slice(0, -1);
        updateDisplay(currentExpression);
    }
    // Jika tombol "=" ditekan, evaluasi ekspresi
    else if (buttonValue === '=') {
        try {
            // Convert the expression to handle percentages correctly
            let processedExpression = currentExpression.replace(/(\d+(\.\d+)?)%/g, (match, number) => {
                return `(${parseFloat(number) / 100})`;
            });
            let result = eval(processedExpression);

            // Display the result without % symbol
            currentExpression = result.toString();
            updateDisplay(currentExpression);
        } catch (error) {
            updateDisplay('Error');
        }
    }
    // Jika tombol brackets ditekan, cek kurung buka atau tutup
    else if (buttonValue === 'brackets') {
        if (openBrackets === 0 || (openBrackets > 0 && currentExpression.slice(-1) === '(')) {
            currentExpression += '(';
            openBrackets++;
        } else {
            currentExpression += ')';
            openBrackets--;
        }
        updateDisplay(currentExpression);
    }
    // Jika tombol % ditekan, tambahkan simbol % pada angka terakhir
    else if (buttonValue === '%') {
        let lastNumberMatch = currentExpression.match(/(\d+(\.\d+)?)(?!.*\d)/);
        if (lastNumberMatch) {
            let lastNumber = lastNumberMatch[0];
            currentExpression = currentExpression.replace(lastNumber, `${lastNumber}%`);
            updateDisplay(currentExpression);
        }
    }
    // Jika tombol lainnya ditekan, tambahkan ke ekspresi
    else {
        currentExpression += buttonValue;
        updateDisplay(currentExpression);
    }
}

// Tambahkan event listener ke semua tombol
let buttons = document.querySelectorAll('.buttons button');
buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});