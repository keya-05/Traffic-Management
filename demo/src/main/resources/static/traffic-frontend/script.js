const API_URL = 'http://localhost:8080/api/traffic';
let barChart, pieChart;

async function updateDashboard() {
    try {
        const response = await fetch(`${API_URL}/summary`);
        const summaryData = await response.json();

        const labels = Object.keys(summaryData);
        const values = Object.values(summaryData);

        // Update Bar Chart
        const ctxBar = document.getElementById('fineChart').getContext('2d');
        if (barChart) barChart.destroy();
        barChart = new Chart(ctxBar, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{ data: values, backgroundColor: '#3b82f6', borderRadius: 5 }]
            },
            options: { plugins: { legend: { display: false } }, maintainAspectRatio: false }
        });

        // Update Pie Chart
        const ctxPie = document.getElementById('pieChart').getContext('2d');
        if (pieChart) pieChart.destroy();
        pieChart = new Chart(ctxPie, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{ data: values, backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'] }]
            },
            options: { plugins: { legend: { position: 'bottom', labels: { color: '#9ca3af' } } }, maintainAspectRatio: false }
        });
    } catch (err) {
        console.error("Dashboard Sync Error:", err);
    }
}

document.getElementById('processBtn').addEventListener('click', async () => {
    const payload = {
        vehicleId: document.getElementById('vehicleId').value,
        speed: parseFloat(document.getElementById('speed').value),
        zone: document.getElementById('zone').value,
        emergencyVehicle: document.getElementById('emergencyBox').checked
    };

    try {
        const response = await fetch(`${API_URL}/process`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        // Success! Update the table
        const log = document.getElementById('activityLog');
        const row = `<tr class="log-item">
            <td>${data.vehicleId}</td>
            <td>${data.zone}</td>
            <td>${data.speed} km/h</td>
            <td class="fine-amt">Rs. ${data.fine}</td>
        </tr>`;

        log.insertAdjacentHTML('afterbegin', row);

        // Keep only top 5
        if (log.children.length > 5) log.lastElementChild.remove();

        updateDashboard(); // Refresh graphs
    } catch (err) {
        document.getElementById('outputArea').innerText = "Connection Error - Check Backend Console";
    }
});

// Initial Load
updateDashboard();