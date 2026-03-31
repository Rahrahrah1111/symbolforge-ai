// VaultKey Persistent System
class VaultManager {
    constructor() {
        this.vaults = {
            "ADELAIDE-CAM-001": {
                name: "Adelaide Premium Vault",
                shorts: Array.from({length: 50}, (_, i) => `SHORT_CMD_${i.toString().padStart(3, '0')}`)
            }
        };
    }

    hasKey(key) {
        return !!this.vaults[key];
    }

    getKey(key) {
        return this.vaults[key];
    }

    addKey(key, data) {
        this.vaults[key] = data;
    }
}

window.VaultManager = new VaultManager();
console.log("VaultManager loaded. ADELAIDE-CAM-001 is active.");
