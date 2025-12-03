const canvas = document.getElementById('lensCanvas');
const ctx = canvas.getContext('2d');
const statusDiv = document.getElementById('imageStatus');
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('input', drawSimulation);
});

function drawSimulation() {
    // input parameters
    let h_o = parseFloat(document.getElementById('objHeight').value);
    let u_dist = parseFloat(document.getElementById('objDist').value);
    let R1 = parseFloat(document.getElementById('r1').value);
    let R2 = parseFloat(document.getElementById('r2').value);
    let mu_L = parseFloat(document.getElementById('muLens').value);
    let mu_A = parseFloat(document.getElementById('muA').value); 
    let mu_B = parseFloat(document.getElementById('muB').value); 
    let lensHeight = parseFloat(document.getElementById('lensHeight').value);

    // Calculations
    let u = -u_dist;

    // Power Calculation
    let term1 = (mu_L - mu_A) / R1;
    let term2 = (mu_B - mu_L) / R2;
    let totalPower = term1 + term2;

    // Image Distance (v)
    let rhs = totalPower + (mu_A / u);
    let v = mu_B / rhs;

    // Magnification
    let m = (mu_A / mu_B) * (v / u);
    let h_i = m * h_o;

    // Image Type
    let isVirtual = v < 0; 

    // Focal Length (Effective in Medium B)
    // f = mu_B / Power
    let f_B = mu_B / totalPower; 

    // Focal Length (Effective in Medium A)
    // f = mu_B / Power
    let f_A = mu_A / totalPower;

    // ৩. ড্রয়িং
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    drawMediaBackground(mu_A, mu_B);

    // Axis
    drawLine(0, centerY, canvas.width, centerY, '#888', []);

    // Lens
    drawLensShape(R1, R2, lensHeight);

    // Focus Points
    drawPoint(centerX + f_B, "F1", "blue");
    drawPoint(centerX - f_A,"F2","blue");

    //center points
    drawPoint(centerX + R1, "C1", "red");
    drawPoint(centerX + R2,"C2","red");

    
    // Object
    drawArrow(centerX + u, centerY, centerX + u, centerY - h_o, "green", "Obj", false);
    
    // Image
    drawArrow(centerX + v, centerY, centerX + v, centerY - h_i, "red", "Img", isVirtual);

    // Rays
    drawRaysGeneral(u, h_o, v, h_i, isVirtual);

    // --- (Status Display and lengend) ---
    statusDiv.innerHTML = `
        Power (P): ${totalPower.toFixed(4)} <br>
        Focal Length at A (f2): ${f_A.toFixed(1)} <br> 
        Focal Length at B (f1): ${f_B.toFixed(1)} <br> 
        Image Dist (v): ${v.toFixed(1)} <br>
        Image Height (hi): ${h_i.toFixed(2)} <br>
        Magnification (m): ${m.toFixed(2)} <br>
        Type: ${isVirtual ? "<span style='color:red'>Virtual</span>" : "<span style='color:green'>Real</span>"} <br>
        <span style='font-size:11px; color:#555'>(μA: ${mu_A}, μB: ${mu_B})</span>
    `;
}

// মিডিয়াম ব্যাকগ্রাউন্ড
function drawMediaBackground(muA, muB) {
    ctx.fillStyle = getColorForIndex(muA);
    ctx.fillRect(0, 0, centerX, canvas.height);
    
    ctx.fillStyle = getColorForIndex(muB);
    ctx.fillRect(centerX, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "#333";
    ctx.font = "12px Arial";
    ctx.fillText(`Medium A (μA=${muA})`, 10,  30);
    ctx.fillText(`Medium B (μB=${muB})`, canvas.width - 120, canvas.height - 10);
}

function getColorForIndex(mu) {
    if (mu <= 1.0) return "rgba(255, 255, 255, 0)"; 
    if (mu <= 1.33) return "rgba(0, 200, 255, 0.05)"; 
    if (mu <= 1.5) return "rgba(0, 200, 255, 0.1)"; 
    return "rgba(0, 100, 200, 0.15)"; 
}

function drawRaysGeneral(u, h_o, v, h_i, isVirtual) {
    const objHeadX = centerX + u;
    const objHeadY = centerY - h_o;
    const lensHitY = centerY - h_o; 
    const imgHeadX = centerX + v;
    const imgHeadY = centerY - h_i;

    // Ray 1
    drawLine(objHeadX, objHeadY, centerX, lensHitY, "orange", []);
    if (isVirtual) {
        let slope = (lensHitY - imgHeadY) / (centerX - imgHeadX);
        let endX = canvas.width;
        let endY = lensHitY + slope * (endX - centerX);
        drawLine(centerX, lensHitY, endX, endY, "orange", []);
        drawLine(centerX, lensHitY, imgHeadX, imgHeadY, "orange", [5, 5]);
    } else {
        drawLine(centerX, lensHitY, imgHeadX, imgHeadY, "orange", []);
    }

    // Ray 2
    drawLine(objHeadX, objHeadY, centerX, centerY, "purple", []);
    if (isVirtual) {
        let slope = (centerY - imgHeadY) / (centerX - imgHeadX);
        let endX = canvas.width;
        let endY = centerY + slope * (endX - centerX);
        drawLine(centerX, centerY, endX, endY, "purple", []);
        drawLine(centerX, centerY, imgHeadX, imgHeadY, "purple", [5, 5]);
    } else {
        drawLine(centerX, centerY, imgHeadX, imgHeadY, "purple", []);
    }
}

function drawLensShape(r1, r2, h) {
    ctx.beginPath();
    ctx.strokeStyle = "#2c3e50";
    ctx.lineWidth = 2;
    ctx.setLineDash([]); 

    let halfH = h / 2;
    let topY = centerY - halfH;
    let bottomY = centerY + halfH;
    
    let offset1 = (Math.abs(r1) > 0) ? (halfH * halfH) / (2 * Math.abs(r1)) : 0;
    let cpx1 = (r1 > 0) ? centerX - offset1 * 3 : centerX + offset1 * 3;
    
    let offset2 = (Math.abs(r2) > 0) ? (halfH * halfH) / (2 * Math.abs(r2)) : 0;
    let cpx2 = (r2 < 0) ? centerX + offset2 * 3 : centerX - offset2 * 3;

    ctx.moveTo(centerX, topY);
    ctx.quadraticCurveTo(cpx1, centerY, centerX, bottomY);
    ctx.quadraticCurveTo(cpx2, centerY, centerX, topY);

    ctx.fillStyle = "rgba(200, 230, 255, 0.4)";
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.setLineDash([5, 3]); 
    ctx.strokeStyle = "rgba(0,0,0,0.3)";
    ctx.moveTo(centerX, topY);
    ctx.lineTo(centerX, bottomY);
    ctx.stroke();
    ctx.setLineDash([]);
}

function drawLine(x1, y1, x2, y2, color, dash) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.setLineDash(dash);
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.setLineDash([]);
}

function drawPoint(x, text, color) {
    if(!isFinite(x) || Math.abs(x) > 50000) return;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, centerY, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillText(text, x - 5, centerY + 20);
}

function drawArrow(fromX, fromY, toX, toY, color, label, isDotted) {
    if (!isFinite(toX) || Math.abs(toX) > 10000) return; 

    const headlen = 10; 
    const angle = Math.atan2(toY - fromY, toX - fromX);
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    if (isDotted) ctx.setLineDash([5, 3]);
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();
    ctx.setLineDash([]); 

    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
    ctx.stroke();

    if (label) {
        ctx.fillStyle = color;
        ctx.fillText(label, fromX - 10, toY + (fromY > toY ? -10 : 20));
    }
}

// Start
drawSimulation();