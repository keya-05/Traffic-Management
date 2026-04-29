# Traffic Intelligence System 🚦

A full-stack, real-time traffic monitoring and fine management dashboard. This system automates the detection of speed violations and calculates fines based on zone-specific regulations, featuring a high-performance Java backend and a reactive dark-mode frontend.

**Live Demo:** [https://traffic-management-vbdx.onrender.com/index.html](https://traffic-management-vbdx.onrender.com/index.html)
<img width="1600" height="774" alt="image" src="https://github.com/user-attachments/assets/40505bce-4ee9-44d5-84c1-b0e448843903" />



## 🚀 Features

* **Real-Time Violation Processing:** Instantly calculates fines for speeding vehicles while exempting emergency services.
* **Dynamic Data Visualization:** Integrated **Chart.js** dashboard featuring:
    * **Bar Chart:** Visualizes fine distribution across different city zones.
    * **Doughnut Chart:** Displays a percentage-based breakdown of violation types.
* **Live Activity Feed:** A sliding window display of the top 5 most recent system entries.
* **Cloud Integration:** Fully containerized and deployed using a distributed architecture (Render + Railway).
* **Responsive Dark-UI:** Optimized for high-traffic monitoring environments.

## 🛠️ Technical Stack

### **Backend**
* **Java 17** with **Spring Boot 3.x**
* **Spring Data JPA:** For ORM and database abstraction.
* **Hibernate:** Database schema management and migrations.
* **MySQL:** Hosted on Railway for persistent storage.
* **Docker:** Containerized deployment for environment parity.

### **Frontend**
* **Vanilla JavaScript (ES6+):** Asynchronous API handling via Fetch API.
* **Chart.js:** For rendering real-time analytics.
* **CSS3:** Custom Grid/Flexbox layout with a modern glassmorphism aesthetic.



## 🏗️ Architecture

The project follows a **Decoupled Monolith** architecture:
1.  **Client Layer:** Browser-based UI served via Spring Boot static resources.
2.  **API Layer:** RESTful controllers handling JSON payloads.
3.  **Persistence Layer:** JPA repositories communicating with a remote MySQL instance.
4.  **Infrastructure:** Multi-stage Docker builds to optimize image size and security.

## 🔧 Installation & Local Setup

### Prerequisites
* JDK 17 or higher
* Maven 3.6+
* MySQL 8.0+

### Setup Steps
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/keya-05/Traffic-Management.git
    cd Traffic-Management
    ```

2.  **Configure Environment Variables:**
    Create an `application.properties` or set your system env variables:
    ```properties
    SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/your_db
    SPRING_DATASOURCE_USERNAME=your_user
    SPRING_DATASOURCE_PASSWORD=your_password
    ```

3.  **Build and Run:**
    ```bash
    mvn clean install
    mvn spring-boot:run
    ```
    Access the UI at `http://localhost:8080/index.html`.

## 🐳 Docker Deployment

To run the system in a containerized environment:
```bash
docker build -t traffic-system .
docker run -p 8080:8080 \
  -e SPRING_DATASOURCE_URL=your_url \
  -e SPRING_DATASOURCE_USERNAME=root \
  -e SPRING_DATASOURCE_PASSWORD=your_pass \
  traffic-system
```

## 📈 Future Roadmap
* **OCR Integration:** Automated license plate recognition from images.
* **Authentication:** JWT-based secure login for traffic officials.
* **SMS Gateway:** Automated fine notification to vehicle owners.

---
**Developed by Keya Chaudhary** 
