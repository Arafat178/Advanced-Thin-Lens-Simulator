# Advanced Dual-Medium Thin Lens Simulator

*A JavaScript-powered optical playground where physics breathes and light bends.*
A thin lens standing between two different media — this simulator shows how the rays twist, where the image forms, how focal lengths shift, and how geometry and physics dance together.

---

## Features

*  **Dual-Medium Optics** — Independent control of object-side medium (μA) and image-side medium (μB).
*  **Accurate Thin Lens Physics** — Uses the full generalized lens equation.
*  **Real-Time Ray Diagram** — Object, image, rays, focal points, everything updates instantly.
*  **Interactive Controls** — Modify radii, refractive indices, object distance, height, and lens size live.
*  **Smooth Canvas Rendering** — Lens geometry, principal axis, and rays drawn cleanly and dynamically.

---

##  Physics Behind the Simulator

###  Lens Equation (Dual-Medium Thin Lens)

[
\frac{μ_A}{u} + \frac{μ_B}{v} =
\frac{μ_L - μ_A}{R_1}
---------------------

\frac{μ_L - μ_B}{R_2}
]

###  Surface Powers

[
Φ_1 = \frac{μ_L - μ_A}{R_1}
]
[
Φ_2 = \frac{μ_L - μ_B}{R_2}
]

###  Total Thin Lens Power

[
Φ = Φ_1 - Φ_2
]

###  Generalized Lens Equation

[
\frac{μ_A}{u} + \frac{μ_B}{v} = Φ
]

###  Image Distance

[
v = \frac{μ_B}{Φ - μ_A/u}
]

### 🔹 Focal Lengths

Object-side focal length:
[
f_A = \frac{μ_A}{Φ}
]

Image-side focal length:
[
f_B = \frac{μ_B}{Φ}
]

### 🔹 Magnification

[
m = \left( \frac{μ_A}{μ_B} \right)\left( \frac{v}{u} \right)
]
[
h_{img} = m, h_{obj}
]

---

## 🧩 Project Structure

```
📁 Lens-Simulator
 ├── index.html
 ├── style.css
 ├── script.js
 └── README.md
```

---


## 🎮 Controls

| Parameter   | Meaning                                     |
| ----------- | ------------------------------------------- |
| R₁          | First surface radius (convex +, concave –)  |
| R₂          | Second surface radius (convex –, concave +) |
| μL          | Lens refractive index                       |
| μA          | Object-side medium                          |
| μB          | Image-side medium                           |
| u           | Object distance                             |
| hₒ          | Object height                               |
| Lens Height | Vertical height of the lens                 |

---

## 🌈 What This Simulator Teaches

* How light bends differently in different media
* Why focal lengths depend on which medium you're measuring from
* How the sign convention shapes the entire problem
* How real and virtual images form
* How curvature direction affects lens power
---

## 🧑‍💻 Technologies Used

* **HTML5 Canvas**
* **JavaScript**
* **CSS3**

---

## 🌟 Author

**Arafat**
Mechanical Engineering Student



