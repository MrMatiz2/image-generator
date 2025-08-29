// Imagen de fondo por defecto
const defaultImage = 'data:image/svg+xml;base64,' + btoa(`
    <svg width="405" height="720" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="grad" cx="50%" cy="50%">
                <stop offset="0%" style="stop-color:#667eea"/>
                <stop offset="100%" style="stop-color:#764ba2"/>
            </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)"/>
        <circle cx="120" cy="180" r="70" fill="rgba(255,255,255,0.1)"/>
        <circle cx="285" cy="540" r="100" fill="rgba(255,255,255,0.05)"/>
    </svg>
`);

// Configurar imagen predeterminada
document.getElementById('backgroundLayer').style.backgroundImage = `url(${defaultImage})`;

// Event listeners
document.getElementById('authorText').addEventListener('input', updatePreview);
document.getElementById('titleText').addEventListener('input', updatePreview);
document.getElementById('contentText').addEventListener('input', updatePreview);
document.getElementById('overlayOpacity').addEventListener('change', updatePreview);
document.getElementById('fontSize').addEventListener('change', updatePreview);
document.getElementById('authorFont').addEventListener('change', updatePreview);
document.getElementById('authorSize').addEventListener('change', updatePreview);
document.getElementById('titleFont').addEventListener('change', updatePreview);
document.getElementById('contentFont').addEventListener('change', updatePreview);
document.getElementById('backgroundEffect').addEventListener('change', updatePreview);
document.getElementById('blurIntensity').addEventListener('change', updatePreview);
document.getElementById('imageFile').addEventListener('change', handleImageUpload);

function updatePreview() {
    const authorText = document.getElementById('authorText').value || '@Escuchemos_al_MaestroJesús';
    const titleText = document.getElementById('titleText').value || 'Escuchen hijos míos:';
    const contentText = document.getElementById('contentText').value;
    const overlayOpacity = document.getElementById('overlayOpacity').value;
    const fontSize = document.getElementById('fontSize').value;
    const authorFont = document.getElementById('authorFont').value;
    const authorSize = document.getElementById('authorSize').value;
    const titleFont = document.getElementById('titleFont').value;
    const contentFont = document.getElementById('contentFont').value;
    const backgroundEffect = document.getElementById('backgroundEffect').value;
    const blurIntensity = document.getElementById('blurIntensity').value;

    // Update text content
    document.getElementById('authorDisplay').textContent = authorText;
    document.getElementById('titleDisplay').textContent = titleText;
    document.getElementById('contentDisplay').innerHTML = contentText.replace(/\n/g, '<br>');
    
    // Update background effect
    const backgroundLayer = document.getElementById('backgroundLayer');
    if (backgroundEffect === 'blur') {
        backgroundLayer.classList.add('blurred');
        // Usar tanto CSS filter como SVG filter para mejor compatibilidad
        backgroundLayer.style.filter = `blur(${blurIntensity}px) url(#blur-filter)`;
        backgroundLayer.style.webkitFilter = `blur(${blurIntensity}px)`;
        document.getElementById('overlay').style.backgroundColor = `rgba(0, 0, 0, 0.2)`;
    } else {
        backgroundLayer.classList.remove('blurred');
        backgroundLayer.style.filter = 'none';
        backgroundLayer.style.webkitFilter = 'none';
        document.getElementById('overlay').style.backgroundColor = `rgba(0, 0, 0, ${overlayOpacity})`;
    }
    
    // Update font sizes
    document.getElementById('contentDisplay').style.fontSize = fontSize + 'px';
    document.getElementById('titleDisplay').style.fontSize = fontSize + 'px';
    document.getElementById('authorDisplay').style.fontSize = authorSize + 'px';
    
    // Update font families
    document.getElementById('authorDisplay').style.setProperty('font-family', `'${authorFont}', sans-serif`, 'important');
    document.getElementById('titleDisplay').style.setProperty('font-family', `'${titleFont}', sans-serif`, 'important');
    document.getElementById('contentDisplay').style.setProperty('font-family', `'${contentFont}', sans-serif`, 'important');
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('backgroundLayer').style.backgroundImage = `url(${e.target.result})`;
        };
        reader.readAsDataURL(file);
    }
}

function downloadAsImage() {
    const element = document.getElementById('imagePreview');
    
    html2canvas(element, {
        allowTaint: true,
        useCORS: true,
        ignoreElements: function(element) {
            // No ignorar ningún elemento para capturar el blur
            return false;
        },
        onclone: function(clonedDoc) {
            // Asegurar que el filtro blur se aplique en el clon
            const clonedBg = clonedDoc.getElementById('backgroundLayer');
            if (clonedBg && clonedBg.classList.contains('blurred')) {
                clonedBg.style.filter = clonedBg.style.filter || 'blur(4px)';
                clonedBg.style.webkitFilter = clonedBg.style.filter;
            }
        }
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'imagen-inspiracional.png';
        link.href = canvas.toDataURL();
        link.click();
    });
}

function clearContent() {
    document.getElementById('contentText').value = '';
    updatePreview();
}

// Inicializar vista previa
updatePreview();