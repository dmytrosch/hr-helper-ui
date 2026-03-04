# HR Helper — Employee & Project Management System

**HR Helper** is a modern, full-stack web application designed for streamlined human resources management. It allows HR departments to track employees, manage project assignments, and visualize organizational statistics through an intuitive, real-time dashboard.



## 🔗 Links

* **Live Demo**: [https://hr-helper-ui.vercel.app/](https://hr-helper-ui.vercel.app/)
* **GraphQL API Endpoint**: [https://hr-helper.onrender.com/graphql](https://hr-helper.onrender.com/graphql)
* **API Repository**: [github.com/dmytrosch/hr_helper_api](https://github.com/dmytrosch/hr_helper_api)

## 🚀 Tech Stack

* **Frontend**: **Next.js 15+** (App Router)
* **UI Components**: **Ant Design (antd)**
* **Data Fetching**: **Apollo Client** (GraphQL)
* **Styling**: **CSS Modules**
* **Icons**: **Lucide React**

## ✨ Key Features

### 📊 Dashboard
* **Real-time Statistics**: Instant overview of the total employee count and the number of currently active projects.
* **Quick Actions**: Streamlined navigation to the most used sections of the app.

### 👥 Employee Management
* **Centralized Directory**: A searchable and filterable list of all staff members.
* **Rich Profiles**: Comprehensive views including contact details, location, join dates, and current project involvement.
* **Interactive Editing**: A robust modal system for updating employee profiles, including dynamic selectors for positions and projects.
* **Safe Deletion**: Integrated `Popconfirm` protection to prevent accidental data loss.

### 📂 Project Management
* **Project Directory**: High-level overview of the organization's portfolio.
* **Detailed Project Pages**: Dedicated views for project status, client/contact information, and team composition with direct cross-links to employee profiles.



## 🏗️ Project Structure

* **`app/`** — Next.js App Router containing pages for the Dashboard, Employee list, and Project details.
* **`components/`** — Reusable UI units including:
    * **`DataSelect`**: A generic, GraphQL-powered component for fetching and selecting dynamic data.
    * **`EditEmployeeModal`**: A complex form management system for profile updates.
    * **`DeleteButtons`**: Action-specific components with built-in confirmation logic.
* **`lib/`** — Apollo Client configuration and GraphQL provider setup.

## 📝 License
This project is licensed under the MIT License.