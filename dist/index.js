"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Block {
    constructor(index, previousHash, data, hash, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
const genesisBlock = new Block(0, '2020202020202', "", "Hello", 123456);
let blockchain = [genesisBlock];
console.log(blockchain);
//# sourceMappingURL=index.js.map