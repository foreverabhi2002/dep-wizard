
# **Dep-Wizard** 🧙‍♂️  
### Visualize, Scan, and Resolve Dependency Issues in Your Node.js Projects!

[![npm version](https://img.shields.io/npm/v/dep-wizard.svg)](https://www.npmjs.com/package/dep-wizard)  
[![License](https://img.shields.io/npm/l/dep-wizard.svg)](LICENSE)  
[![Downloads](https://img.shields.io/npm/dw/dep-wizard.svg)](https://www.npmjs.com/package/dep-wizard)  

`Dep-Wizard` is a command-line tool designed to make managing dependencies easier for developers. With just a few commands, you can **scan for conflicts**, **resolve issues**, and **visualize the dependency tree** for any Node.js project.

---

## **Features** ✨

- 🔍 **Scan Dependencies**: Find potential conflicts and outdated packages.  
- 🛠 **Resolve Issues**: Resolve version mismatches effortlessly.  
- 🌳 **Visualize Dependency Tree**: See a complete tree of your project's dependencies.  
- ⚡️ **Easy to Use**: Simple CLI interface with detailed output.  

---

## **Installation** 📦

Install the package globally to access it from anywhere:

```bash
npm install -g dep-wizard
```

Or install it locally to use in a specific project:

```bash
npm install dep-wizard
```

---

## **Usage** 🚀

Once installed, you can use `dep-wizard` via the command line. The syntax is:

```bash
dep-wizard <command>
```

### **Available Commands:**

#### 1. **Scan Dependencies**
Find conflicts and outdated packages in your `node_modules` directory.

```bash
dep-wizard scan
```

Example Output:
```plaintext
Scanning for dependency conflicts...
⚠️ Conflict detected: package-name@1.0.0 vs package-name@2.0.0
✅ All other dependencies are up-to-date!
```

#### 2. **Resolve Conflicts**
Automatically resolve version mismatches for your dependencies.

```bash
dep-wizard resolve
```

Example Output:
```plaintext
Resolving conflicts...
✅ package-name updated to version 2.0.0
```

#### 3. **Visualize Dependency Tree**
Generate a visual representation of your project's dependencies.

```bash
dep-wizard visualize
```

Example Output:
```plaintext
Dependency tree built!
{
  "chalk": {},
  "yargs": {
    "yargs-parser": {},
    "cliui": {
      "wrap": {}
    }
  }
}
```

---

## **Why Dep-Wizard?** 🤔

Managing dependencies in large Node.js projects can become overwhelming. Dependency conflicts, outdated packages, and deeply nested trees are common challenges. `Dep-Wizard` simplifies this process by automating scanning, resolving, and visualizing tasks.

---

## **How It Works** 🛠

1. **Scanning**:  
   Scans your `node_modules` and `package.json` for:
   - Version conflicts
   - Outdated dependencies  
   
2. **Resolving**:  
   Updates conflicting dependencies to the latest compatible versions.

3. **Visualization**:  
   Builds a detailed dependency tree, making it easy to understand the structure of your project.

---

## **Configuration** ⚙️

`Dep-Wizard` works out of the box, but you can customize its behavior by adding a `.dep-wizardrc.json` file in the root of your project:

```json
{
  "ignore": [".bin"],
  "maxDepth": 3
}
```

- **`ignore`**: Directories to skip during scanning or visualization.  
- **`maxDepth`**: Maximum depth for the dependency tree visualization.  

---

## **Contributing** 🤝

We welcome contributions to improve `Dep-Wizard`! Here's how you can get involved:  
1. Fork the repository.  
2. Create a new branch for your feature/bug fix.  
3. Submit a pull request.  

---

## **License** 📜

This project is licensed under the [MIT License](LICENSE).

---

## **Feedback and Support** 🛠

If you encounter any issues or have suggestions, feel free to [open an issue](https://github.com/your-repo/dep-wizard/issues).  

Let `Dep-Wizard` be your guide to dependency management in Node.js! 🧙‍♂️✨  
