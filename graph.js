import BinaryHeap from './heap.js'
    
export default function Graph() {
    this.adjList = {}

    this.addEdge = function (lender, borrower, amount) {
        if(lender in this.adjList)
            this.adjList[lender] = [...this.adjList[lender], { borrower, amount: -amount }]
        else
            this.adjList[lender] = [{ borrower, amount: -amount }]
        
        if(borrower in this.adjList)
            this.adjList[borrower] = [...this.adjList[borrower], { lender, amount }]
        else
            this.adjList[borrower] = [{ lender, amount }]
    }

    this.getResult = function () {
        let adjList = this.adjList
        let people = Object.keys(adjList)
        let noOfNodes = people.length;
        let netAmounts = {}

        console.log({ adjList })

        people.forEach((person) => {
            let netAmount = 0;
            for (let { borrower, amount } of adjList[person]) {
                netAmount += amount;
            }
            netAmounts[person] = netAmount;
        })

        console.log({ netAmounts })
    
        const pos_heap = new BinaryHeap();
        const neg_heap = new BinaryHeap();

        people.forEach((person) => {
            const netAmount = netAmounts[person]
            if (netAmount > 0) {
                pos_heap.insert([netAmount,person])
            }
            else {
                neg_heap.insert([-netAmount, person])
                netAmounts[person] *= -1;
            }
        })

        const new_edges = [];
        while (!pos_heap.empty() && !neg_heap.empty()) {
            const mx = pos_heap.extractMax();
            const mn = neg_heap.extractMax();
            const amt = Math.min(mx[0],mn[0]);
            const to = mx[1];
            const from = mn[1];
            new_edges.push({ from: from, to: to, label: String(Math.abs(amt)) });
            netAmounts[to] -= amt;
            netAmounts[from] -= amt;


            if(mx[0] > mn[0]){
                pos_heap.insert([netAmounts[to],to]);
            } else if(mx[0] < mn[0]){
                neg_heap.insert([netAmounts[from],from]);
            }

        }


        return new_edges
    }


}