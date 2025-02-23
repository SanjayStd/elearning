function generateCertificate(name, course, score) {
    let canvas = document.getElementById("certificateCanvas");
    let ctx = canvas.getContext("2d");

    let image = new Image();
    image.src = "certificate_template.png";  // Ensure this file is in your project folder

    image.onload = function () {
        ctx.drawImage(image, 0, 0, 800, 600);
        
        ctx.font = "30px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(name, 300, 250);  // Positioning the name
        ctx.fillText(course, 300, 300);
        ctx.fillText("Score: " + score + "/3", 300, 350);
        ctx.fillText(new Date().toLocaleDateString(), 300, 400);
    };
}

function downloadCertificate() {
    let canvas = document.getElementById("certificateCanvas");
    let link = document.createElement("a");
    link.download = "Certificate.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
}
