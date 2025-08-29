# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Spanish-language inspirational image generator web application. The project consists of a single HTML file (`index.html`) that creates a visual template for generating inspirational quote images with customizable text overlays.

## Architecture

**Single-File Application**: The entire application is contained in `index.html` with embedded CSS and JavaScript.

**Key Components**:
- **Template System**: Uses CSS positioning and overlays to create inspirational quote cards
- **Real-time Preview**: JavaScript updates the visual preview as users modify form inputs
- **Image Export**: Uses html2canvas library to convert the DOM element to downloadable PNG
- **Responsive Design**: CSS Grid and Flexbox for mobile-friendly layout

**External Dependencies**:
- `html2canvas` (v1.4.1) - loaded from CDN for image generation

## Development

**Testing**: Open `index.html` directly in a browser - no build process required.

**Key Functions** (in `index.html:266-336`):
- `updatePreview()` - Updates the visual template with form values
- `handleImageUpload()` - Processes custom background images
- `downloadAsImage()` - Generates and downloads PNG using html2canvas

**Styling**: All CSS is embedded in the HTML file using a `<style>` tag.

**Default Content**: The application comes pre-loaded with inspirational content in Spanish focused on spiritual/religious themes.