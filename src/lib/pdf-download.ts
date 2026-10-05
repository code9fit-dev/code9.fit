export async function downloadPdfFromHtml(htmlPath: string, filename: string) {
  try {
    // Fetch the HTML file
    const response = await fetch(htmlPath);
    const htmlContent = await response.text();

    // Create a temporary div to hold the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    tempDiv.style.display = 'none';
    document.body.appendChild(tempDiv);

    // Load html2pdf library dynamically
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';

    script.onload = () => {
      const element = tempDiv;
      const opt = {
        margin: 0,
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'in', format: 'letter' }
      };

      // Generate PDF
      (window as any).html2pdf().set(opt).from(element).save();

      // Cleanup
      setTimeout(() => {
        document.body.removeChild(tempDiv);
      }, 1000);
    };

    document.head.appendChild(script);
  } catch (error) {
    console.error('Error downloading PDF:', error);
  }
}
