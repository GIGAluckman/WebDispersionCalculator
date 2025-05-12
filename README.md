# Magnon Dispersion Calculator

## Overview

This program is designed for the **numerical calculation of dispersion curves** using the **TetraX package**. It provides an intuitive web-based interface where users can define geometrical, material, and experimental parameters to compute and visualize dispersion curves.

### 🌍 **Access the Program**

The program is available online at:
👉 **[Magnon Dispersion Calculator](https://www.madivie.at/)**

The frontend is deployed using Azure Static Web App, providing a fast and reliable hosting solution.

### 🔑 **TetraX Package and Citation**

This program utilizes the **TetraX** package for numerical calculations. Learn more about it here:
👉 **[TetraX: Finite-Element Micromagnetic-Modeling Package](https://www.tetrax.software/)**

If you use the dispersion calculator for your publication, make sure to cite the following papers:

```
@misc{TetraX,
  author = {Körber, Lukas and
            Quasebarth, Gwendolyn and
            Hempel, Alexander and
            Zahn, Friedrich and
            Otto, Andreas and
            Westphal, Elmar and
            Hertel, Riccardo and
            Kakay, Attila},
     title = {{TetraX: Finite-Element Micromagnetic-Modeling
               Package}},
     month = jan,
     year = 2022,
     doi = {10.14278/rodare.1418},
     url = {https://doi.org/10.14278/rodare.1418}
 }

@article{korberFiniteelementDynamicmatrixApproach2021a,
             title = {Finite-element dynamic-matrix approach for spin-wave dispersions
                      in magnonic waveguides with arbitrary cross section},
             volume = {11},
             doi = {10.1063/5.0054169},
             language = {en},
             journal = {AIP Advances},
             author = {Körber, L and Quasebarth, G and Otto, A and Kákay, A},
             year = {2021},
             pages = {095006},
     }
```

---

## 🛠 Features

-   **Graphical User Interface (GUI)** for easy parameter selection.
-   **Three geometries available**: **waveguide, plain film, and wire**.
-   **Material presets** for quick selection: **YIG, GaYIG, and Py**.
-   **Experiment configuration** panel (currently supports **dispersion curve calculation**).
-   **Backend processing** with Flask, powered by the **TetraX package**.
-   **Comprehensive result visualization** including:
    -   Dispersion relation (f vs k)
    -   Group velocity (v vs k)
    -   Lifetime (t vs k)
    -   Propagation length (L vs k)
-   **Download results** as PNG figures or as CSV for further analysis.

---

## 🎛 **Interface Overview**

### 📌 **Left Panel: Geometry Selection**

-   Choose one of three available geometries:
    -   **Waveguide**
    -   **Plain Film**
    -   **Wire**
-   Each geometry has a set of adjustable parameters.

### 📌 **Middle Panel: Material Selection**

-   Choose from predefined materials:
    -   **YIG** (Yttrium Iron Garnet)
    -   **GaYIG** (Gallium-substituted YIG)
    -   **Py** (Permalloy)
-   Custom materials can also be defined.

### 📌 **Right Panel: Experiment Parameters**

-   Currently, only **dispersion curve calculation** is supported.
-   Future updates may include additional experiment types.

---

## 🔄 **Workflow**

1. **User fills out the form** with desired geometry, material, and experiment parameters.
2. **Form submission sends data to the Flask backend**.
3. **Flask backend starts the TetraX simulation** based on user input.
4. **Simulation results are returned** in the form of a **plot**.
5. **Users can download results as a CSV file**.

---

## 🏗 **Technology Stack**

-   **Frontend**: React (TypeScript, Bootstrap for styling, MUI for plotting)
-   **Backend**: Flask (Gunicorn for deployment, Flask-CORS for cross-origin requests) - [Backend Repository](https://github.com/GIGAluckman/WebDispersionCalculator-backend/tree/mulltiprocessing)
-   **Computation Engine**: TetraX package (Python)
-   **Hosting**: Flask backend hosted on an external machine with Gunicorn, frontend served via Nginx

---

## 📌 **Future Improvements**

-   Adding more geometries.
-   Support for additional experiment types.
-   Eigen modes visualization.
-   User authentication for secure access.

---

## 📬 **Contact**

For support or inquiries, please contact me **andrey.voronov@univie.ac.at**.

---

🚀 **Enjoy using the Magnon Dispersion Calculator!** 🎉
