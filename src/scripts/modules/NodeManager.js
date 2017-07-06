class NodeManager {
    constructor() {
        this.nodes = {};

        for(var i in rawNodes) {
            var rawNode = rawNodes[i];

            if(rawNode.isCity) {
                this.nodes[rawNode.id] = new City(rawNode)
            } else {
                this.nodes[rawNode.id] = new Node(rawNode)
            }

        }
    }

    getRandomNode() {
        return this.nodes[nodeIDs[floor(random(0, nodeIDs.length - 1))]]
    }

    getRandomTown() {
        return this.nodes[cityIDsWithoutStuttgart[floor(random(0, cityIDsWithoutStuttgart.length - 1))]]
    }

    getRandomCity() {
        return this.nodes[cityIDs[floor(random(0, cityIDs.length - 1))]]
    }

    forAll(func) {
        for(var nodeIndex in this.nodes) {
            func(nodeIndex, this.nodes[nodeIndex])
        }
    }

    getById(id) {
        return this.nodes[id]
    }

    getByName(name) {
        return this.nodes[cityDict[name]]
    }
}

var Nodes = new NodeManager();

console.log(Nodes)
