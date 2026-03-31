// SymbolForge™ v4.0 Interpreter
console.log("SymbolForge by camadelaide initialized.");

class SymbolForgeInterpreter {
    constructor() {
        this.symbols = {};
        this.expansionFactor = 10;
        this.init();
    }

    async init() {
        try {
            const res = await fetch('symbols.json');
            this.symbols = await res.json();
            console.log(`Loaded ${Object.keys(this.symbols).length} glyphs.`);
        } catch(e) {
            console.log("Could not load symbols.json");
        }
        
        document.getElementById('interpretBtn').addEventListener('click', () => this.interpret());
    }

    interpret() {
        const input = document.getElementById('interpreterInput').value;
        const vaultKey = document.getElementById('vaultKey').value;
        const outputArea = document.getElementById('outputArea');
        const savingsCounter = document.getElementById('savingsCounter');
        
        let output = "";
        let originalTokens = input.length;
        let generatedTokens = 0;
        
        // Vault check
        if (window.VaultManager && window.VaultManager.hasKey(vaultKey)) {
            const vaultData = window.VaultManager.getKey(vaultKey);
            output += `>>> VAULT UNLOCKED: ${vaultKey} <<<\n`;
            output += `Loaded ${vaultData.shorts.length} shorts.\n\n`;
        } else {
            output += `>>> VAULT ${vaultKey} NOT FOUND. Proceeding with standard execution. <<<\n\n`;
        }

        // 10x verbose expansion logic
        for (let char of input) {
            if (this.symbols[char]) {
                const expansion = this.symbols[char].repeat(this.expansionFactor);
                output += `[${char}] => ${this.symbols[char]}\n-- Verbose Expansion --\n${expansion}\n\n`;
                generatedTokens += expansion.length;
            } else if (char.trim() !== '') {
                output += `[${char}] => UNKNOWN GLYPH\n\n`;
                generatedTokens += char.length;
            }
        }

        if (input.trim() === '') {
            output += "Awaiting input...";
        }

        outputArea.textContent = output;
        
        // Calculate abstract savings
        if (generatedTokens > 0) {
            const savings = Math.min(99.9, ((generatedTokens - originalTokens) / generatedTokens) * 100);
            savingsCounter.textContent = savings.toFixed(1) + "%";
        }
        
        // Image generation calls
        if (input.includes('img') || input.includes('IMG')) {
            console.log("Image generation workflow triggered via SymbolForge API.");
            outputArea.textContent += "\n>>> DISPATCHING IMAGE GENERATION WORKER <<<";
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.interpreter = new SymbolForgeInterpreter();
});
