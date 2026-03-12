# SentiMarket — Version 1.0

## Overview

**SentiMarket** is a browser-based advanced trading dashboard that simulates a modern cryptocurrency trading platform. It combines **interactive financial charts, technical indicators, drawing tools, portfolio management, AI-assisted trading, and customizable UI themes** into a single modular system.

The project is designed to demonstrate **front-end engineering for trading platforms**, including real-time chart rendering, modular state management, and advanced UI interactions.

Version **1.0** represents the first stable release of the platform with core trading simulation features, interactive charting, and AI-based strategy automation.

---

# Features

## Interactive Trading Charts

* Candlestick chart powered by **Lightweight Charts**
* Dynamic timeframes (1D, 5D, 1M, 3M, 6M, 1Y, 5Y)
* Real-time price simulation
* EMA indicators (EMA20, EMA50)
* Volume histogram
* Crosshair price inspection

---

## Advanced Drawing Tools

Users can analyze price movements using several technical drawing tools:

* Trend lines
* Horizontal support / resistance
* Fibonacci retracement
* Rectangle zones
* Freehand brush drawing
* Chart text annotations

Additional capabilities:

* Handle-based editing
* Drawing selection
* Lock drawings
* Magnetic alignment mode
* Persistent storage using LocalStorage

---

## Trading Simulation Engine

The platform includes a simulated trading system allowing users to test strategies without real capital.

Features include:

* Market and limit orders
* Buy / sell order placement
* Position tracking
* Portfolio balance management
* Real-time unrealized PnL
* Order history tracking

Portfolio data is stored locally to maintain persistence between sessions.

---

## AI Auto Trading System

SentiMarket includes a modular **AI trading engine** capable of automatically executing simulated trades.

Supported strategies include:

* EMA crossover strategy
* RSI oversold / overbought strategy
* Sentiment spike detection
* Hype breakout detection

AI trading parameters:

* Risk level configuration
* Daily trade limits
* Strategy selection
* AI trade log

---

## Live Market Simulation

The application simulates real-time market movements through continuous price updates.

Capabilities include:

* Randomized market movement engine
* Dynamic PnL recalculation
* Real-time chart updates
* Live portfolio value changes

---

## Customizable Interface

The platform provides multiple UI customization options:

* Dark theme
* Light theme
* Emerald theme
* Purple theme
* Custom cursor effects
* Animated UI interactions
* Compact layout mode

Themes dynamically update chart styling and UI colors.

---

## Persistent Application State

User settings and data are stored locally using **LocalStorage**, including:

* Portfolio balance
* Open positions
* Order history
* Drawing objects
* User preferences
* AI trading logs

This ensures the application maintains state between browser sessions.

---

# Project Architecture

The project follows a modular store-based structure.

### Core Modules

**ChartStore**

* Handles chart state
* Manages price data
* Controls indicators

**DrawingStore**

* Stores chart drawings
* Handles drawing interactions
* Persists drawing data

**PortfolioStore**

* Manages account balance
* Stores positions and orders
* Maintains trade history

**OrderStore**

* Handles order configuration
* Manages order types and sides

**AIStore**

* Controls AI trading engine
* Maintains strategy settings
* Stores AI trade logs

---

# Technology Stack

| Technology         | Purpose                   |
| ------------------ | ------------------------- |
| HTML5              | Interface structure       |
| CSS3               | Styling and themes        |
| JavaScript (ES6)   | Core application logic    |
| Lightweight Charts | Financial chart rendering |
| LocalStorage API   | Persistent data storage   |

---

# File Structure

```
SentiMarket
│
├──Frontend
  |
  ├── index.html
  ├── analysis.html
  │
  ├── style.css
  │
  ├── app.js
  ├── analysis.js
  ├── cursor.js
  ├── interactions.js
  ├── settings.js
  ├── system.js
  │
  └── README.md
```

---

# Installation

1. Download or clone the repository.

2. Open the project folder.

3. Launch the application by opening:

```
index.html
```

in any modern web browser.

No server or external dependencies are required.

---
