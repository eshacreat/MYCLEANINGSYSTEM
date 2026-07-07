// Smart Booking Wizard & Real-Time ML Price/Duration Estimator Controller

document.addEventListener("DOMContentLoaded", () => {
    initBookingWizard();
    initEstimatorTriggers();
    runEstimatorUIUpdate(); // Run initial calculation
});

// ==========================================
// 1. STEPPED FORM NAVIGATION (WIZARD)
// ==========================================
let currentStep = 1;
const totalSteps = 2;

function initBookingWizard() {
    updateWizardUI();
    
    const bookNowBtn = document.getElementById("bookNowBtn");
    if (bookNowBtn) {
        bookNowBtn.addEventListener("click", () => {
            const customerName = document.getElementById("customerName").value.trim();
            
            // Integrate validation from validation.js
            if (typeof validateName !== "undefined" && !validateName(customerName)) {
                alert("Please enter a valid full name (minimum 3 alphabetical letters).");
                return;
            } else if (!customerName) {
                alert("Please enter your name to confirm booking.");
                return;
            }

            // Set progress to 100%
            const progressBar = document.getElementById("progressBar");
            if (progressBar) progressBar.style.width = "100%";

            // Collect current inputs and calculation results
            const serviceType = document.getElementById("serviceType").value;
            const squareFootage = parseFloat(document.getElementById("squareFootage").value) || 0;
            const numRooms = parseInt(document.getElementById("numRooms").value) || 0;
            const dirtLevel = document.getElementById("dirtLevel").value;
            
            // Run final inference to get details for payload
            const result = runEstimatorInference(squareFootage, numRooms, serviceType, dirtLevel);

            const payload = {
                customerName,
                serviceType,
                squareFootage,
                numRooms,
                dirtLevel,
                estimatedDuration: result.duration,
                estimatedPrice: result.price
            };

            // Integrate API call from api.js
            if (typeof submitBookingAPI !== "undefined") {
                submitBookingAPI(payload)
                    .then(response => {
                        alert(`Success! Service booked for ${customerName}.\nBooking ID: ${response.bookingId}`);
                        document.getElementById("bookingForm").reset();
                        goToStep(1);
                        runEstimatorUIUpdate();
                    })
                    .catch(err => {
                        alert(`API Error: ${err.message}`);
                    });
            } else {
                // Fallback local simulated success
                setTimeout(() => {
                    alert(`Success! Service booked for ${customerName}.`);
                    document.getElementById("bookingForm").reset();
                    goToStep(1);
                    runEstimatorUIUpdate();
                }, 500);
            }
        });
    }
}

function goToStep(step) {
    if (step < 1 || step > totalSteps) return;
    
    // Check validation for Step 1 before moving to Step 2
    if (step === 2 && currentStep === 1) {
        const sqFt = parseFloat(document.getElementById("squareFootage").value);
        const rooms = parseInt(document.getElementById("numRooms").value);
        
        if (isNaN(sqFt) || sqFt < 200 || sqFt > 10000) {
            alert("Please enter a valid square footage between 200 and 10,000.");
            return;
        }
        if (isNaN(rooms) || rooms < 1 || rooms > 15) {
            alert("Please enter a valid room count between 1 and 15.");
            return;
        }
    }

    currentStep = step;
    updateWizardUI();
}

function updateWizardUI() {
    // Toggle active form step divs
    for (let i = 1; i <= totalSteps; i++) {
        const stepDiv = document.getElementById(`step${i}`);
        if (stepDiv) {
            if (i === currentStep) {
                stepDiv.classList.add("active-step");
            } else {
                stepDiv.classList.remove("active-step");
            }
        }
    }

    // Update Progress Bar width
    const progressBar = document.getElementById("progressBar");
    if (progressBar) {
        const pct = ((currentStep - 1) / totalSteps) * 100;
        progressBar.style.width = `${pct}%`;
    }
}

// ==========================================
// 2. LIVE ML ESTIMATION TRIGGERING
// ==========================================
function initEstimatorTriggers() {
    const triggers = ["serviceType", "squareFootage", "numRooms", "dirtLevel"];
    
    triggers.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            // Re-run estimator on change or direct key inputs
            element.addEventListener("input", runEstimatorUIUpdate);
            element.addEventListener("change", runEstimatorUIUpdate);
        }
    });
}

function runEstimatorUIUpdate() {
    const serviceType = document.getElementById("serviceType").value;
    const squareFootage = parseFloat(document.getElementById("squareFootage").value) || 0;
    const numRooms = parseInt(document.getElementById("numRooms").value) || 0;
    const dirtLevel = document.getElementById("dirtLevel").value;

    const estDurationSpan = document.getElementById("estDuration");
    const estPriceSpan = document.getElementById("estPrice");
    const badge = document.getElementById("inferenceBadge");

    if (!estDurationSpan || !estPriceSpan) return;

    if (squareFootage < 200 || numRooms < 1) {
        estDurationSpan.innerText = "--";
        estPriceSpan.innerText = "--";
        return;
    }

    // Add subtle visual processing loading effect
    estDurationSpan.style.opacity = 0.5;
    estPriceSpan.style.opacity = 0.5;

    // Run inference (ML Ridge Regression)
    const result = runEstimatorInference(squareFootage, numRooms, serviceType, dirtLevel);

    // Dynamic latency effect for a realistic AI computation feel
    setTimeout(() => {
        estDurationSpan.innerText = result.duration;
        estPriceSpan.innerText = result.price.toFixed(2);
        
        estDurationSpan.style.opacity = 1;
        estPriceSpan.style.opacity = 1;

        if (badge) {
            if (result.isML) {
                badge.className = "ml-tag active-ml";
                badge.innerHTML = "🤖 AI Estimator (Ridge Model)";
            } else {
                badge.className = "ml-tag";
                badge.innerHTML = "⚠️ Rule-Based Fallback Mode";
            }
        }
    }, 150);
}