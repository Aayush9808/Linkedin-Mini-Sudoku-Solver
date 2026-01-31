# 🧩 LinkedIn Mini Sudoku Solver

A beautiful web application to solve LinkedIn's 6×6 Mini Sudoku puzzles instantly! Built with vanilla HTML, CSS, and JavaScript.

![Mini Sudoku Solver](https://img.shields.io/badge/Sudoku-Solver-purple?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## ✨ Features

- 🎯 **6×6 Grid Layout** - Matches LinkedIn's Mini Sudoku format
- 🚀 **Instant Solving** - Uses backtracking algorithm
- 🎨 **Beautiful UI** - Clean, modern interface
- ⌨️ **Keyboard Navigation** - Arrow keys to move between cells
- ✅ **Input Validation** - Only accepts numbers 1-6
- 📱 **Responsive Design** - Works on mobile and desktop
- 🎲 **Example Puzzle** - Try it out with a pre-loaded puzzle

## 🚀 Quick Start

### Local Development

1. Clone or download this repository
2. Open `index.html` in your web browser
3. That's it! No build process required.

```bash
# Open in browser (macOS)
open index.html

# Or just double-click the index.html file
```

## 🌐 Deployment Options

### Option 1: Netlify (Recommended - Easiest)

1. Go to [Netlify](https://www.netlify.com/)
2. Sign up for a free account
3. Drag and drop your project folder onto Netlify Dashboard
4. Your site is live! 🎉

**Or use Netlify CLI:**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Option 2: Vercel

1. Go to [Vercel](https://vercel.com/)
2. Sign up with GitHub
3. Click "New Project"
4. Import your repository
5. Deploy! 🚀

**Or use Vercel CLI:**
```bash
npm install -g vercel
vercel --prod
```

### Option 3: GitHub Pages

1. Create a GitHub repository
2. Push your code:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/mini-sudoku-solver.git
git push -u origin main
```

3. Go to repository Settings → Pages
4. Select `main` branch as source
5. Your site will be live at: `https://yourusername.github.io/mini-sudoku-solver/`

### Option 4: Cloudflare Pages

1. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
2. Sign up and connect your GitHub
3. Select your repository
4. Deploy with one click! ⚡

## 📖 How to Use

1. **Enter Puzzle**: Click on cells and enter numbers 1-6 from your LinkedIn puzzle
2. **Solve**: Click the "Solve Puzzle" button
3. **Clear**: Reset the grid to start over
4. **Example**: Load a sample puzzle to test the solver

### Keyboard Shortcuts

- **Arrow Keys**: Navigate between cells
- **1-6**: Enter numbers
- **Backspace/Delete**: Clear cell

## 🎮 Example Puzzle

The "Load Example" button loads the puzzle shown in the instructions:
```
_ _ 4 _ _ _
_ 3 _ 5 _ _
4 _ _ _ 3 _
2 _ _ _ 5 _
_ 1 _ 4 _ _
_ _ 2 _ _ _
```

## 🧠 Algorithm

The solver uses a **backtracking algorithm**:

1. Find an empty cell
2. Try numbers 1-6
3. Check if the number is valid (row, column, region)
4. If valid, place it and move to next cell
5. If stuck, backtrack and try different number
6. Repeat until solved or proven unsolvable

**Time Complexity**: O(6^n) where n is the number of empty cells
**Space Complexity**: O(36) for the 6×6 grid

## 📁 Project Structure

```
mini-sudoku-solver/
├── index.html      # Main HTML structure
├── style.css       # Styling and animations
├── script.js       # Sudoku solver logic
└── README.md       # This file
```

## 🎨 Customization

### Change Colors

Edit `style.css`:
```css
/* Main gradient background */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Given numbers color */
.cell.given {
    background: #e3f2fd;
    color: #0066cc;
}

/* Solved numbers color */
.cell.solved {
    background: #c8e6c9;
}
```

## 🐛 Troubleshooting

**Puzzle won't solve?**
- Make sure all entered numbers are correct
- Check for duplicate numbers in rows/columns/regions
- Verify the puzzle has a valid solution

**UI looks broken?**
- Clear your browser cache
- Try a different browser
- Check console for errors (F12)

## 📝 License

Free to use for personal and educational purposes. Created for solving LinkedIn Mini Sudoku puzzles.

## 🤝 Contributing

Feel free to fork, modify, and improve! Some ideas:
- Add timer functionality
- Save/load puzzles from localStorage
- Difficulty indicator
- Step-by-step solution visualization
- Multiple puzzle templates

## 🌟 Credits

Created with ❤️ for LinkedIn Mini Sudoku enthusiasts

## 📞 Support

Having issues? Open an issue on GitHub or contact me.

---

**Happy Solving! 🎉**

Remember: Every LinkedIn Mini Sudoku puzzle has a unique solution!
